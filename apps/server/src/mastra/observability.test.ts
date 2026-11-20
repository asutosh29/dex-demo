import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import test from "node:test";
import { Mastra } from "@mastra/core";
import { Agent } from "@mastra/core/agent";
import { SpanType } from "@mastra/core/observability";
import { RequestContext } from "@mastra/core/request-context";
import { MastraLanguageModelV2Mock } from "@mastra/core/test-utils/llm-mock";
import { chatRoute } from "@mastra/ai-sdk";
import { MastraServer } from "@mastra/hono";
import { PostgresStoreVNext } from "@mastra/pg";
import { Hono } from "hono";
import { Pool } from "pg";
import { createObservability } from "./observability";
import { env } from "~/lib/env";
import { appCors } from "~/lib/cors";

test(
  "observability persists redacted spans and traces AI SDK chat",
  { timeout: 60_000 },
  async (t) => {
    // Each run uses an isolated schema and a mock model; no provider key is needed.
    const schemaName = `dt_${randomBytes(3).toString("hex")}`;
    const pool = new Pool({ connectionString: env.DB_URL });
    const storage = new PostgresStoreVNext({
      id: "observability-test",
      pool,
      schemaName,
      observability: { pool, schemaName: `${schemaName}_o` },
    });
    const observability = createObservability();
    const model = new MastraLanguageModelV2Mock({
      modelId: "observability-test",
      doStream: async () => ({
        stream: new ReadableStream({
          start(controller) {
            const chunks: Parameters<typeof controller.enqueue>[0][] = [
              { type: "stream-start", warnings: [] },
              { type: "text-start", id: "text-1" },
              {
                type: "text-delta",
                id: "text-1",
                delta: "Observability works.",
              },
              { type: "text-end", id: "text-1" },
              {
                type: "finish",
                finishReason: "stop",
                usage: { inputTokens: 5, outputTokens: 3, totalTokens: 8 },
              },
            ];
            for (const chunk of chunks) controller.enqueue(chunk);
            controller.close();
          },
        }),
      }),
      doGenerate: {
        content: [{ type: "text", text: "Observability works." }],
        finishReason: "stop",
        usage: { inputTokens: 5, outputTokens: 3, totalTokens: 8 },
        warnings: [],
      },
    });
    const agent = new Agent({
      id: "dex-agent",
      name: "Test agent",
      instructions: "Reply briefly.",
      model,
    });
    const mastra = new Mastra({
      agents: { dexAgent: agent },
      storage,
      observability,
      server: {
        apiRoutes: [
          chatRoute({ version: "v6", path: "/chat", agent: "dex-agent" }),
        ],
      },
    });
    try {
      await storage.init();
      const traces = await storage.getStore("observability");
      assert.ok(traces);
      const instance = observability.getDefaultInstance();
      assert.ok(instance);

      await t.test(
        "redacts credentials and preserves parent-child spans and request metadata",
        async () => {
          const requestContext = new RequestContext();
          requestContext.set("userId", "observability-test-user");
          requestContext.set("apiKey", "must-not-be-exported");
          const parent = instance.startSpan({
            name: "observability-smoke-test",
            type: SpanType.GENERIC,
            requestContext,
            input: { apiKey: "must-not-be-exported", query: "test" },
          });
          const child = parent.createChildSpan({
            name: "child",
            type: SpanType.GENERIC,
          });
          const logger = instance.getLoggerContext?.(child);
          assert.ok(logger);
          logger.info("observability integration test", { ok: true });
          child.end({ output: { ok: true } });
          parent.end({
            output: { token: "must-not-be-exported", result: "ok" },
          });
          await observability.flush();
          const trace = await traces.getTrace({ traceId: parent.traceId });
          assert.ok(trace);
          assert.equal(trace.spans.length, 2);
          const root = trace.spans.find((span) => span.spanId === parent.id);
          const persistedChild = trace.spans.find(
            (span) => span.spanId === child.id,
          );
          assert.ok(root);
          assert.equal(persistedChild?.parentSpanId, parent.id);
          assert.equal(root.metadata?.userId, "observability-test-user");
          assert.equal(
            JSON.stringify(trace).includes("must-not-be-exported"),
            false,
          );
          assert.match(JSON.stringify(root.input), /REDACTED/);
          assert.ok(root.endedAt);
          const logs = await traces.listLogs({
            filters: { traceId: parent.traceId },
          });
          assert.ok(
            logs.logs.some(
              (log) =>
                log.message === "observability integration test" &&
                log.spanId === child.id,
            ),
          );
        },
      );

      await t.test(
        "records actual agent and model execution spans",
        async () => {
          const result = await agent.generate("Say hello.");
          assert.equal(result.text, "Observability works.");
          await observability.flush();
          assert.ok(result.traceId);
          const trace = await traces.getTrace({ traceId: result.traceId });
          assert.ok(trace);
          assert.ok(
            trace.spans.some((span) => span.spanType === SpanType.AGENT_RUN),
          );
          assert.ok(
            trace.spans.some(
              (span) => span.spanType === SpanType.MODEL_GENERATION,
            ),
          );
          const metrics = await traces.listMetrics({
            filters: { traceId: result.traceId },
          });
          assert.ok(
            metrics.metrics.length > 0,
            "model execution should persist usage and timing metrics",
          );
        },
      );

      await t.test(
        "allows Studio client headers in browser preflight",
        async () => {
          const app = new Hono();
          app.use("*", appCors);
          app.get("/mastra/agents", (c) => c.json({}));
          const headers = [
            "content-type",
            "x-mastra-client-type",
            "x-mastra-dev-playground",
          ];
          const response = await app.request("/mastra/agents", {
            method: "OPTIONS",
            headers: {
              Origin: env.MASTRA_STUDIO_URL,
              "Access-Control-Request-Method": "GET",
              "Access-Control-Request-Headers": headers.join(","),
            },
          });
          assert.equal(response.status, 204);
          assert.equal(
            response.headers.get("Access-Control-Allow-Origin"),
            env.MASTRA_STUDIO_URL,
          );
          const allowed = response.headers
            .get("Access-Control-Allow-Headers")
            ?.toLowerCase()
            .split(",")
            .map((header) => header.trim());
          for (const header of headers)
            assert.ok(allowed?.includes(header), `${header} must be allowed`);
        },
      );

      await t.test(
        "streams a complete AI SDK v6 response through the Hono adapter",
        async () => {
          const app = new Hono();
          const server = new MastraServer({ app, mastra, prefix: "/mastra" });
          server.registerContextMiddleware();
          server.registerCustomApiRoutes();
          await server.registerRoutes();
          const response = await app.request("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: [
                {
                  id: "test-message",
                  role: "user",
                  parts: [{ type: "text", text: "Say hello." }],
                },
              ],
            }),
          });
          assert.equal(response.status, 200);
          const body = await response.text();
          assert.match(body, /Observability works/);
          assert.match(body, /\[DONE\]/);
          assert.doesNotMatch(body, /"type":"error"/);
          await observability.flush();
        },
      );
    } finally {
      await mastra.shutdown();
      await pool.query(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
      await pool.query(`DROP SCHEMA IF EXISTS "${schemaName}_o" CASCADE`);
      await pool.end();
    }
  },
);
