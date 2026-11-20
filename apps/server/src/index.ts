import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { auth } from "~/lib/auth";
import { appCors } from "./lib/cors";
import { appRouter, createContext } from "~/trpc";
import { mcpServer } from "~/mcp/server";
import { env } from "./lib/env";
import { waitlistService } from "~/services/waitlist.service";
import { HonoBindings, HonoVariables, MastraServer } from "@mastra/hono";
import { mastra } from "~/mastra";

const app = new Hono<{ Bindings: HonoBindings; Variables: HonoVariables }>();
const mastraServer = new MastraServer({ app, mastra, prefix: "/mastra" });
mastraServer.registerContextMiddleware();
app.use("*", appCors);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

// tRPC endpoint
app.use(
  "/api/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  }),
);

app.use("/chat/*", async (c, next) => {
  const requestContext = c.get("requestContext");
  const body = await c.req.json();
  requestContext.set("model", body.data.model);
  requestContext.set("provider", body.data.provider);

  // Uses better auth to get the userId and makes it available in the context
  const authContext = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  requestContext.set("userContext", authContext?.user);
  requestContext.set("userName", authContext?.user?.name);
  requestContext.set("userId", authContext?.user?.id);

  await next();
});

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
