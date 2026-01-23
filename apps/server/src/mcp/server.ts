import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getMcpContext, runWithMcpContext } from "./context";
import { Hono } from "hono";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { mcpAuthMiddleware, type McpContext } from "./middleware";
import { itemService } from "~/services/item.service";

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

  server.registerTool(
    "view_collections",
    {
      description: "View the list of collections you have access to",
      inputSchema: z.object({}),
    },
    async () => {
      const { actor } = getMcpContext();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              collections:
                actor.mode === "full_access"
                  ? actor.userCollections
                  : actor.type === "api_key" &&
                      actor.mode === "collection_specific"
                    ? actor.grantedCollections
                    : [],
            }),
          },
        ],
      };
    },
  );

  server.registerTool(
    "add_items_to_collection",
    {
      description: "Add items to a specified collection if you have permission",
      inputSchema: z.object({
        collectionId: z
          .string()
          .describe("ID of the collection to add items to"),
        items: z
          .array(z.url().describe("Item URL"))
          .describe("List of item URLs to add to the collection"),
      }),
    },
    async ({ collectionId, items }) => {
      const { actor } = getMcpContext();

      // Check for permissions
      const hasAccess =
        (actor.mode === "full_access" &&
          actor.userCollections?.some((uc) => uc.id === collectionId)) ||
        (actor.mode === "collection_specific" &&
          actor.grantedCollections?.some((gc) => gc.id === collectionId));

      if (!hasAccess) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error:
                  "Permission denied: You don't have access to this collection",
                collectionId,
              }),
            },
          ],
          isError: true,
        };
      }

      // Add items to collection
      const results = await Promise.all(
        items.map((itemUrl) =>
          itemService.createItem(actor.userId, {
            url: itemUrl,
            collectionId: collectionId,
          }),
        ),
      );

      // Filter out null results (failed items)
      const successfulItems = results.filter(
        (item): item is NonNullable<typeof item> => item !== null,
      );
      const failedCount = results.length - successfulItems.length;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              addedItems: successfulItems.length,
              failedItems: failedCount,
              items: successfulItems.map((item) => ({
                id: item.id,
                title: item.title,
                url: item.url,
              })),
            }),
          },
        ],
      };
    },
  );

  server.registerTool(
    "search_items",
    {
      description:
        "Search through all your saved items using full-text search. Returns matching items with title, URL, and other metadata.",
      inputSchema: z.object({
        query: z.string().min(1).describe("Search query to find items"),
      }),
    },
    async ({ query }) => {
      const { actor } = getMcpContext();

      // Search items for this user
      const results = await itemService.searchItems(actor.userId, query);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              query,
              resultCount: results.length,
              items: results.map((item) => ({
                id: item.id,
                title: item.title,
                url: item.url,
                tldr: item.tldr,
              })),
            }),
          },
        ],
      };
    },
  );

  return server;
};

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
