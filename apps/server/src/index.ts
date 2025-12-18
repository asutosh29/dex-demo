import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { auth } from "~/lib/auth";
import { dexAgent } from "~/voltagent";
import { trustedOrigins } from "./lib/constants";
import { appRouter, createContext } from "~/trpc";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: trustedOrigins,
    allowHeaders: ["Content-Type", "Authorization"],
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

// Start the VoltAgent server (mcp)
dexAgent.getServerInstance()?.isRunning() ?? dexAgent.startServer();
console.log("Starting app server on http://localhost:8787");
serve({
  fetch: app.fetch,
  port: 8787,
});
