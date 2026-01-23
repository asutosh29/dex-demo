import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { auth } from "~/lib/auth";
import { trustedOrigins } from "./lib/constants";
import { appRouter, createContext } from "~/trpc";
import { mcpServer } from "~/mcp/server";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: trustedOrigins,
    allowHeaders: ["Content-Type", "Authorization", "X-API-Key"],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

// tRPC endpoint
app.use(
  "/api/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ping", (c) => {
  return c.text("pong");
});

// MCP endpoint
app.route("/mcp", mcpServer);

const port = Number(process.env.PORT || 8787);

console.log(`Starting app server on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});

export default app;
