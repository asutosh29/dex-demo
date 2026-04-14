import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { itemService } from "./item.service";
import { collectionService } from "./collection.service";
import type { ApiKeyActor } from "~/services/rbac";

// TODO: Unify ToolActor type for both web UI (UserActor) and MCP (ApiKeyActor)
// contexts. Currently we just extract userId from whichever is available.
// Future: add collection-level access scoping for MCP keys here.

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
  execute: async ({ message }, context) => {
    return {
      echoedMessage: message,
      timestamp: new Date().toISOString(),
      serverName: "dex-mcp-server",
    };
  },
});

const viewCollections = createTool({
  id: "view_collections",
  description: "View the list of collections you have access to",
  inputSchema: z.object({}),
  execute: async (_input, context) => {
    // In Phase 1, we handle both MCP Key actor context and web request context
    // If it's MCP context, we can replicate previous logic
    const actor = context?.mcp?.extra?.authInfo as ApiKeyActor | undefined;

    if (actor) {
      if (actor.type === "api_key") {
        return {
          collections:
            actor.mode === "full_access"
              ? actor.userCollections
              : actor.mode === "collection_specific"
                ? actor.grantedCollections
                : [],
        };
      }
    }

    // Fallback to general user ID processing (for regular web ui request)
    const userId = getUserId(context);
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
    const actor = context?.mcp?.extra?.authInfo as ApiKeyActor | undefined;

    // Check for permissions
    if (actor && actor.type === "api_key") {
      const hasAccess =
        (actor.mode === "full_access" &&
          actor.userCollections?.some((uc: any) => uc.id === collectionId)) ||
        (actor.mode === "collection_specific" &&
          actor.grantedCollections?.some((gc: any) => gc.id === collectionId));

      if (!hasAccess) {
        return {
          error: "Permission denied: You don't have access to this collection",
          collectionId,
        };
      }
    }

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
  description: "Create a new collection",
  inputSchema: z.object({
    title: z.string().min(1).describe("Title of the new collection"),
  }),
  execute: async ({ title }, context) => {
    const actor = context?.mcp?.extra?.authInfo as ApiKeyActor | undefined;

    if (actor && actor.type === "api_key" && actor.mode !== "full_access") {
      return {
        error:
          "Permission denied: You don't have permission to create collections",
      };
    }

    const userId = getUserId(context);
    const collection = await collectionService.createCollection(userId, title);

    return {
      success: true,
      collection: {
        id: collection.id,
        title: collection.title,
      },
    };
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
    };
  }
}

export const agentService = new AgentService();
