import { createTool } from "@voltagent/core";
import { MCPServer } from "@voltagent/mcp-server";
import { z } from "zod";
import { collectionService } from "../services/collection.service";
import { itemService } from "../services/item.service";
import { validateMcpApiKey } from "../lib/mcp-auth";
import { assertCan, Action } from "../services/rbac";

const testingTool = createTool({
  name: "testing_tool",
  description: "A simple testing tool to verify MCP server is working",
  parameters: z.object({
    message: z.string().describe("Message to echo back"),
  }),
  async execute({ message }, options) {
    console.log(options);
    return {
      echoedMessage: message,
      options,
      timestamp: new Date().toISOString(),
    };
  },
});
// Tool 1: View Collections
const viewCollectionsTool = createTool({
  name: "view_collections",
  description: "Get all collections accessible to this API key",
  parameters: z.object({}),
  async execute() {
    const apiKey = process.env.DEX_API_KEY;
    if (!apiKey) throw new Error("DEX_API_KEY not configured");

    const actor = await validateMcpApiKey(apiKey);
    if (!actor) throw new Error("Invalid API key");

    // API key actor has userId
    const userId = actor.type === "api_key" ? actor.userId : "";

    const allCollections = await collectionService.getUserCollections(userId);

    // Filter based on API key mode
    if (actor.type === "api_key") {
      // full_access mode: return all user collections
      if (actor.mode === "full_access") {
        return {
          collections: allCollections.map((c) => ({
            id: c.id,
            title: c.title,
            itemCount: c.itemCount,
            memberCount: c.memberCount,
          })),
        };
      }

      // collection_specific mode: filter by granted collections
      const accessibleCollections = allCollections.filter((c) =>
        actor.grantedCollectionIds?.includes(c.id),
      );

      return {
        collections: accessibleCollections.map((c) => ({
          id: c.id,
          title: c.title,
          itemCount: c.itemCount,
          memberCount: c.memberCount,
        })),
      };
    }

    return { collections: allCollections };
  },
});

const addItemToCollectionTool = createTool({
  name: "add_item_to_collection",
  description: "Add a single URL to a collection",
  parameters: z.object({
    collectionId: z.string().describe("ID of the collection"),
    url: z.string().url().describe("URL of the item to add"),
  }),
  async execute({ collectionId, url }) {
    const apiKey = process.env.DEX_API_KEY;
    if (!apiKey) throw new Error("DEX_API_KEY not configured");

    const actor = await validateMcpApiKey(apiKey);
    if (!actor) throw new Error("Invalid API key");

    // Check if API key has access to this collection
    if (actor.type === "api_key") {
      if (actor.mode === "collection_specific") {
        // For collection_specific mode, check granted collections
        if (!actor.grantedCollectionIds?.includes(collectionId)) {
          throw new Error("API key does not have access to this collection");
        }
      }
      // For full_access mode, access is checked via can() with collectionId
      assertCan(actor, Action.ITEM_ADD, collectionId);
    }

    const userId = actor.type === "api_key" ? actor.userId : "";
    const item = await itemService.createItem(userId, { url, collectionId });
    if (!item) {
      throw new Error("Failed to add item to collection");
    }
    return {
      message: `Item added successfully to collection ${collectionId}`,
      item: {
        id: item.id,
        title: item.title,
        url: item.url,
      },
    };
  },
});

// Tool 2: Add Items to Collection (Bulk)
const addItemsToCollectionTool = createTool({
  name: "add_items_to_collection",
  description: "Add multiple URLs to a collection at once",
  parameters: z.object({
    collectionId: z.string().describe("ID of the collection"),
    urls: z.array(z.string()).describe("JSON Array of URLs to add"),
  }),
  async execute({ collectionId, urls }) {
    const apiKey = process.env.DEX_API_KEY;
    if (!apiKey) throw new Error("DEX_API_KEY not configured");

    const actor = await validateMcpApiKey(apiKey);
    if (!actor) throw new Error("Invalid API key");

    // Check if API key has access to this collection
    if (actor.type === "api_key") {
      if (actor.mode === "collection_specific") {
        // For collection_specific mode, check granted collections
        if (!actor.grantedCollectionIds?.includes(collectionId)) {
          throw new Error("API key does not have access to this collection");
        }
      }
      // For full_access mode, access is checked via can() with collectionId
      assertCan(actor, Action.ITEM_ADD, collectionId);
    }

    const userId = actor.type === "api_key" ? actor.userId : "";

    // Add items in bulk
    const results = await Promise.allSettled(
      urls.map((url) => itemService.createItem(userId, { url, collectionId })),
    );

    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    const items = results
      .filter((r) => r.status === "fulfilled")
      .map((r: any) => r.value);

    return {
      message: `Added ${successful} items successfully. ${failed} failed.`,
      successful,
      failed,
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
      })),
    };
  },
});

// Tool 3: Search Items
const searchItemsTool = createTool({
  name: "search_items",
  description: "Search through all items accessible to this API key",
  parameters: z.object({
    query: z.string().min(1).describe("Search query"),
  }),
  async execute({ query }) {
    const apiKey = process.env.DEX_API_KEY;
    if (!apiKey) throw new Error("DEX_API_KEY not configured");

    const actor = await validateMcpApiKey(apiKey);
    if (!actor) throw new Error("Invalid API key");

    assertCan(actor, Action.ITEM_SEARCH);

    const userId = actor.type === "api_key" ? actor.userId : "";
    const results = await itemService.searchItems(userId, query);

    return {
      query,
      count: results.length,
      items: results.map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        tldr: item.tldr,
        tags: item.tags,
      })),
    };
  },
});

// Tool 4: Create Collection
const createCollectionTool = createTool({
  name: "create_collection",
  description: "Create a new private collection",
  parameters: z.object({
    title: z.string().min(1).max(50).describe("Collection title"),
  }),
  async execute({ title }) {
    const apiKey = process.env.DEX_API_KEY;
    if (!apiKey) throw new Error("DEX_API_KEY not configured");

    const actor = await validateMcpApiKey(apiKey);
    if (!actor) throw new Error("Invalid API key");

    assertCan(actor, Action.COLLECTION_CREATE);

    const userId = actor.type === "api_key" ? actor.userId : "";
    const collection = await collectionService.createCollection(userId, title);

    return {
      message: `Collection "${collection.title}" created successfully`,
      collectionId: collection.id,
      title: collection.title,
    };
  },
});

export const mcpServer = new MCPServer({
  name: "dex-mcp-server",
  version: "1.0.0",
  description:
    "MCP server for Dex CMS with API key authentication and collection access control",
  tools: {
    testingTool,
    viewCollectionsTool,
    addItemsToCollectionTool,
    addItemToCollectionTool,
    searchItemsTool,
    createCollectionTool,
  },
});
