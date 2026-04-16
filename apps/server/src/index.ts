import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { auth } from "~/lib/auth";
import { trustedOrigins } from "./lib/constants";
import { appRouter, createContext } from "~/trpc";
import { mcpServer } from "~/mcp/server";
import { env } from "./lib/env";
import { waitlistService } from "~/services/waitlist.service";
import { HonoBindings, HonoVariables, MastraServer } from "@mastra/hono";
import { mastra } from "~/mastra";

const app = new Hono<{ Bindings: HonoBindings; Variables: HonoVariables }>();
const mastraServer = new MastraServer({ app, mastra, prefix: "/mastra" });
mastraServer.registerContextMiddleware();
/*
 ** Headers
 * x-mastra-dev-playground: Sent by Mastra Studio to enable dev playground
 */
app.use(
  "*",
  cors({
    origin: trustedOrigins,
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "X-API-Key",
      "x-mastra-dev-playground",
    ],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.use("*", async (c, next) => {
  // Logs the request body and other incoming data
  console.log("Request URL:", c.req.url);
  // clones if json type and logs it
  if (c.req.header("Content-Type")?.includes("application/json")) {
    const body = await c.req.json();
    console.log("Request Body:", body);
  }
  await next();
});

app.use("/chat/*", async (c, next) => {
  console.log("== Injecting requestContext ==");
  const requestContext = c.get("requestContext");
  const body = await c.req.json();
  requestContext.set("model", body.data.model);
  requestContext.set("provider", body.data.provider);
  console.log("requestContext", requestContext);
  await next();
});
// tRPC endpoint
app.use(
  "/api/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  }),
);
mastraServer.registerCustomApiRoutes();
await mastraServer.registerRoutes();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ping", (c) => {
  return c.text("pong");
});

// MCP endpoint
app.route("/mcp", mcpServer);

// waitlist approval endpoint
app.post("/waitlist/approve", async (c) => {
  const authorizationHeader = c.req.header("Authorization");
  if (authorizationHeader !== env.GRIST_AUTH_TOKEN)
    return c.json({ error: "Unauthorized" }, 401);

  try {
    const approveEvents = await c.req.json();
    const result = await waitlistService.processApprovals(approveEvents);
    return c.json(result);
  } catch (error) {
    console.error("Error processing waitlist approvals:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    if (message.includes("not found")) {
      return c.json({ error: message }, 404);
    }
    if (message.includes("required")) {
      return c.json({ error: message }, 400);
    }

    return c.json({ error: message }, 500);
  }
});

const port = Number(env.PORT || 8787);

console.log(`Starting app server on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});
