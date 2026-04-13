import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getMcpContext, runWithMcpContext } from "./context";
import { Hono } from "hono";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { mcpAuthMiddleware, type McpContext } from "./middleware";
import { itemService } from "~/services/item.service";
import { collectionService } from "~/services/collection.service";
import { getGrantedCollections } from "./utils";
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
              collections: getGrantedCollections(actor) || [],
            }),
          },
        ],
      };
    },
  );

  server.registerTool(
    "add_item_to_collection",
    {
      description:
        "Add a single item to a specified collection if you have permission",
      inputSchema: z.object({
        collectionId: z
          .string()
          .describe("ID of the collection to add the item to"),
        url: z.string().describe("URL of the item to add"),
      }),
    },
    async ({ collectionId, url }) => {
      const { actor } = getMcpContext();

      // Check for permissions
      const granted = getGrantedCollections(actor);
      const hasAccess = granted?.some((c) => c.id === collectionId);

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

      // Add item to collection
      const item = await itemService.createItem(actor.userId, {
        url,
        collectionId,
      });

      if (!item) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: "Failed to add item to collection",
                url,
              }),
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              item: {
                id: item.id,
                title: item.title,
                url: item.url,
                tldr: item.tldr,
                tags: item.tags,
              },
            }),
          },
        ],
      };
    },
  );

  // Commented out bulk addition tool - use add_item_to_collection instead
  // server.registerTool(
  //   "add_items_to_collection",
  //   {
  //     description: "Add items to a specified collection if you have permission",
  //     inputSchema: z.object({
  //       collectionId: z
  //         .string()
  //         .describe("ID of the collection to add items to"),
  //       items: z
  //         .array(z.url().describe("Item URL"))
  //         .describe("List of item URLs to add to the collection"),
  //     }),
  //   },
  //   async ({ collectionId, items }) => {
  //     const { actor } = getMcpContext();

  //     // Check for permissions
  //     const granted = getGrantedCollections(actor);
  //     const hasAccess = granted?.some((c) => c.id === collectionId);

  //     if (!hasAccess) {
  //       return {
  //         content: [
  //           {
  //             type: "text",
  //             text: JSON.stringify({
  //               error:
  //                 "Permission denied: You don't have access to this collection",
  //               collectionId,
  //             }),
  //           },
  //         ],
  //         isError: true,
  //       };
  //     }

  //     // Add items to collection
  //     const results = await Promise.all(
  //       items.map((itemUrl) =>
  //         itemService.createItem(actor.userId, {
  //           url: itemUrl,
  //           collectionId: collectionId,
  //         }),
  //       ),
  //     );

  //     // Filter out null results (failed items)
  //     const successfulItems = results.filter(
  //       (item): item is NonNullable<typeof item> => item !== null,
  //     );
  //     const failedCount = results.length - successfulItems.length;

  //     return {
  //       content: [
  //         {
  //           type: "text",
  //           text: JSON.stringify({
  //             success: true,
  //             addedItems: successfulItems.length,
  //             failedItems: failedCount,
  //             items: successfulItems.map((item) => ({
  //               id: item.id,
  //               title: item.title,
  //               url: item.url,
  //             })),
  //           }),
  //         },
  //       ],
  //     };
  //   },
  // );

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
      const collections = getGrantedCollections(actor);
      const scope = collections?.map((c) => c.id);

      // Search items for this user, scoped to allowed collections
      const results = await itemService.searchItems(actor.userId, query, scope);

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

  server.registerTool(
    "create_collection",
    {
      description: "Create a new collection",
      inputSchema: z.object({
        title: z.string().min(1).describe("Title of the new collection"),
      }),
    },
    async ({ title }) => {
      const { actor } = getMcpContext();

      if (actor.mode !== "full_access") {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error:
                  "Permission denied: You don't have permission to create collections",
              }),
            },
          ],
          isError: true,
        };
      }

      // Create collection
      // Note: Implement collectionService.createCollection accordingly
      const collection = await collectionService.createCollection(
        actor.userId,
        title,
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              collection: {
                id: collection.id,
                title: collection.title,
              },
            }),
          },
        ],
      };
    },
  );

  server.registerTool(
    "get_collection_items",
    {
      description:
        "Get items present within a specific collection using safe pagination",
      inputSchema: z.object({
        collectionId: z
          .string()
          .describe("ID of the collection to fetch items from"),
        limit: z
          .number()
          .min(1)
          .max(50)
          .optional()
          .describe(
            "Number of items to fetch. Min: 1, Max: 50. Recommended: 10-25.",
          ),
        cursor: z
          .string()
          .uuid()
          .optional()
          .describe(
            "Pagination cursor returned from a previous call's nextCursor field. Do not provide on the first call.",
          ),
      }),
    },
    async ({ collectionId, limit, cursor }) => {
      const { actor } = getMcpContext();

      // Check collection-specific key scope before delegating to service
      const collections = getGrantedCollections(actor);
      const scope = collections?.map((c) => c.id);

      if (scope && !scope.includes(collectionId)) {
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

      try {
        const fetchLimit = limit || 25; // Default safe limit
        const collection = await collectionService.getCollection(
          collectionId,
          actor.userId,
          fetchLimit,
          cursor,
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                pagination: collection.pagination,
                collection: {
                  id: collection.id,
                  title: collection.title,
                  role: collection.role,
                  resultCount: collection.items.length,
                  items: collection.items.map((item) => ({
                    id: item.id,
                    title: item.title,
                    url: item.url,
                    tldr: item.tldr,
                    tags: item.tags,
                  })),
                },
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error:
                  error instanceof Error
                    ? error.message
                    : "Failed to fetch collection items",
              }),
            },
          ],
          isError: true,
        };
      }
    },
  );

  server.registerTool(
    "get_items_by_id",
    {
      description:
        "Retrieve specific items by their IDs. Only specify IDs you are absolutely sure of. If you need to find IDs, use other available tools.",
      inputSchema: z.object({
        itemIds: z
          .array(z.string())
          .min(1)
          .max(5)
          .describe(
            "List of item IDs to retrieve. Only provide valid IDs that you have obtained from other tools. Minimum 1 and Maximum 5",
          ),
      }),
    },
    async ({ itemIds }) => {
      const { actor } = getMcpContext();
      const collections = getGrantedCollections(actor);
      const scope = collections?.map((c) => c.id);

      try {
        const items = await itemService.getItemsByIds(
          actor.userId,
          itemIds,
          scope,
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                resultCount: items.length,
                items: items.map((item) => ({
                  id: item.id,
                  title: item.title,
                  url: item.url,
                  tldr: item.tldr,
                  tags: item.tags,
                })),
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error:
                  error instanceof Error
                    ? error.message
                    : "Failed to fetch items by ID",
              }),
            },
          ],
          isError: true,
        };
      }
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
