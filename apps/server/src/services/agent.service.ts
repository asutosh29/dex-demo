import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { itemService } from "./item.service";
import { collectionService } from "./collection.service";
function getUserId(context: any): string {
  const userId =
    context?.requestContext?.get("userId") ??
    context?.mcp?.extra?.authInfo?.userId;
  if (!userId) throw new Error("No user context — authentication required");
  return userId;
}

const testEcho = createTool({
  id: "test_echo",
  description: "A simple test tool that echoes back your message",
  inputSchema: z.object({
    message: z.string().describe("Message to echo back"),
  }),
  execute: async ({ message }) => {
    return {
      echoedMessage: message,
      timestamp: new Date().toISOString(),
      serverName: "dex-agent-server",
    };
  },
});

const viewCollections = createTool({
  id: "view_collections",
  description: "View the list of collections you have access to",
  inputSchema: z.object({}),
  execute: async (_input, context) => {
    const userId = getUserId(context);
    // TODO: Add Pagination
    const result = await collectionService.getUserCollections(userId);
    return { collections: result };
  },
});

const addItemToCollection = createTool({
  id: "add_item_to_collection",
  description:
    "Add a single item to a specified collection if you have permission",
  inputSchema: z.object({
    collectionId: z
      .string()
      .describe("ID of the collection to add the item to"),
    url: z.string().describe("URL of the item to add"),
  }),
  execute: async ({ collectionId, url }, context) => {
    const userId = getUserId(context);

    // Add item to collection
    const item = await itemService.createItem(userId, {
      url,
      collectionId,
    });

    if (!item) {
      return {
        error: "Failed to add item to collection",
        url,
      };
    }

    return {
      success: true,
      item: {
        id: item.id,
        title: item.title,
        url: item.url,
        tldr: item.tldr,
        tags: item.tags,
      },
    };
  },
});

const searchItems = createTool({
  id: "search_items",
  description:
    "Search through all your saved items using full-text search. Returns matching items with title, URL, and other metadata.",
  inputSchema: z.object({
    query: z.string().min(1).describe("Search query to find items"),
  }),
  execute: async ({ query }, context) => {
    const userId = getUserId(context);

    // Search items for this user
    const results = await itemService.searchItems(userId, query);

    return {
      query,
      resultCount: results.length,
      items: results.map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        tldr: item.tldr,
      })),
    };
  },
});

const createCollection = createTool({
  id: "create_collection",
  description:
    "Create a new collection. You can also create a sub-collection by providing an optional parentId.",
  inputSchema: z.object({
    title: z.string().min(1).describe("Title of the new collection"),
    parentId: z
      .string()
      .optional()
      .describe(
        "Optional parent collection id. When provided, creates a sub-collection exactly one level deep under the specified parent collection.",
      ),
  }),
  execute: async ({ title, parentId }, context) => {
    const userId = getUserId(context);
    const collection = await collectionService.createCollection(
      userId,
      title,
      parentId,
    );

    return {
      success: true,
      collection: {
        id: collection.id,
        title: collection.title,
        parentId: collection.parentId,
      },
    };
  },
});

const getCollectionItems = createTool({
  id: "get_collection_items",
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
      .uuid()
      .optional()
      .describe(
        "Pagination cursor returned from a previous call's nextCursor field. Do not provide on the first call.",
      ),
  }),
  execute: async ({ collectionId, limit, cursor }, context) => {
    const userId = getUserId(context);

    try {
      const fetchLimit = limit || 25; // Default safe limit
      const collection = await collectionService.getCollection(
        collectionId,
        userId,
        fetchLimit,
        cursor,
      );

      return {
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
      };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch collection items",
      };
    }
  },
});

const getItemsById = createTool({
  id: "get_items_by_id",
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
  execute: async ({ itemIds }, context) => {
    const userId = getUserId(context);

    try {
      const items = await itemService.getItemsByIds(userId, itemIds);
      return {
        success: true,
        resultCount: items.length,
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          url: item.url,
          tldr: item.tldr,
          tags: item.tags,
        })),
      };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch items by ID",
      };
    }
  },
});

export class AgentService {
  getTools() {
    return {
      testEcho,
      viewCollections,
      addItemToCollection,
      searchItems,
      createCollection,
      getCollectionItems,
      getItemsById,
    };
  }
}

export const agentService = new AgentService();
