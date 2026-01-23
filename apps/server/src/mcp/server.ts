import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getMcpContext, runWithMcpContext } from "./context";
import { Hono } from "hono";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { mcpAuthMiddleware, type McpContext } from "./middleware";

export const createMcpServer = () => {
  const server = new McpServer(
    {
      name: "dex-mcp-server",
      version: "1.0.0",
    },
    {
      capabilities: {
        logging: {},
        tools: {},
      },
    },
  );

  // Register test echo tool
  server.registerTool(
    "test_echo",
    {
      description: "A simple test tool that echoes back your message",
      inputSchema: {
        message: z.string().describe("Message to echo back"),
      },
    },
    async ({ message }) => {
      // Access the auth context for this request
      const { actor } = getMcpContext();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              echoedMessage: message,
              timestamp: new Date().toISOString(),
              serverName: "dex-mcp-server",
              actorType: actor.type,
              actorMode: actor.type === "api_key" ? actor.mode : undefined,
            }),
          },
        ],
      };
    },
  );

  return server;
};

// 3 tools -
// - view_collections
// - add_items_to_collection
// - search_items

const mcpServer = new Hono<McpContext>();

mcpServer.use("*", mcpAuthMiddleware);

mcpServer.all("/", async (c) => {
  try {
    // Get actor from context (set by middleware)
    const actor = c.get("actor");

    // Create fresh server and transport for this request (stateless pattern)
    const server = createMcpServer();
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    // Connect server to transport (only once per request)
    await server.connect(transport);

    // Handle request with auth context available via AsyncLocalStorage
    const response = await runWithMcpContext({ actor }, async () => {
      return await transport.handleRequest(c.req.raw);
    });

    return response;
  } catch (e) {
    console.error("MCP Error:", e);
    return c.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      },
      { status: 500 },
    );
  }
});

export { mcpServer };
