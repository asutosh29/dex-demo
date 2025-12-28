import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { auth } from "~/lib/auth";
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

// TODO: Re-enable MCP endpoint once mcp server package is enabled again after new year
// @see https://github.com/modelcontextprotocol/typescript-sdk/issues/1338

// app.post("/api/mcp", async (c) => {
//   const authHeader = c.req.header("authorization") || "";
//   const apiKey = authHeader.toLowerCase().startsWith("bearer ")
//     ? authHeader.slice(7).trim()
//     : undefined;

//   const server = createMcpServer(apiKey);

//   try {
//     const transport = new StreamableHTTPServerTransport();
//     transport.onerror = console.error.bind(console);

//     await server.connect(transport);

//     const response = await transport.handleRequest(c.req.raw, await c.req.json());

//     // handleRequest may return a Fetch Response; ensure server closes after stream ends
//     (response as any)?.body?.addEventListener?.("close", () => {
//       transport.close();
//       server.close();
//     });

//     return response as Response;
//   } catch (e) {
//     console.error(e);
//     return c.json(
//       {
//         jsonrpc: "2.0",
//         error: {
//           code: -32603,
//           message: "Internal server error",
//         },
//         id: null,
//       },
//       { status: 500 },
//     );
//   }
// });

const port = Number(process.env.PORT || 8787);

console.log(`Starting app server on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});

export default app;
