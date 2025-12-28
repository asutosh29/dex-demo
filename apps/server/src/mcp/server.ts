import { Server } from "@modelcontextprotocol/sdk/server";
import { collectionService } from "../services/collection.service";
import { itemService } from "../services/item.service";
import { validateMcpApiKey } from "../lib/mcp-auth";
import { assertCan, Action } from "../services/rbac";

type ToolHandler<T> = (input: T) => Promise<Record<string, unknown>>;

let requestApiKey: string | undefined;

const withActor = async () => {
  const apiKey = requestApiKey;
  if (!apiKey) {
    throw new Error(
      "API key not provided (Authorization bearer) and DEX_API_KEY not configured",
    );
  }

  const actor = await validateMcpApiKey(apiKey);
  if (!actor) throw new Error("Invalid API key");

  const userId = actor.type === "api_key" ? actor.userId : "";

  return { actor, userId };
};

const testingTool = {
  name: "testing_tool",
  description: "A simple testing tool to verify MCP server is working",
  inputSchema: {
    type: "object",
    properties: {
      message: { type: "string", description: "Message to echo back" },
    },
    required: ["message"],
    additionalProperties: false,
  },
  async execute({ message }: { message: string }) {
    return {
      echoedMessage: message,
      timestamp: new Date().toISOString(),
    };
  },
};

const viewCollectionsTool = {
  name: "view_collections",
  description: "Get all collections accessible to this API key",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  async execute() {
    const { actor, userId } = await withActor();
    const allCollections = await collectionService.getUserCollections(userId);

    if (actor.type !== "api_key") {
      return { collections: allCollections };
    }

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
  },
};

const addItemToCollectionTool = {
  name: "add_item_to_collection",
  description: "Add a single URL to a collection",
  inputSchema: {
    type: "object",
    properties: {
      collectionId: { type: "string", description: "ID of the collection" },
      url: {
        type: "string",
        format: "uri",
        description: "URL of the item to add",
      },
    },
    required: ["collectionId", "url"],
    additionalProperties: false,
  },
  async execute({ collectionId, url }: { collectionId: string; url: string }) {
    const { actor, userId } = await withActor();

    if (actor.type === "api_key") {
      if (actor.mode === "collection_specific") {
        if (!actor.grantedCollectionIds?.includes(collectionId)) {
          throw new Error("API key does not have access to this collection");
        }
      }
      assertCan(actor, Action.ITEM_ADD, collectionId);
    }

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
};

const addItemsToCollectionTool = {
  name: "add_items_to_collection",
  description: "Add multiple URLs to a collection at once",
  inputSchema: {
    type: "object",
    properties: {
      collectionId: { type: "string", description: "ID of the collection" },
      urls: {
        type: "array",
        items: { type: "string", format: "uri" },
        description: "JSON Array of URLs to add",
      },
    },
    required: ["collectionId", "urls"],
    additionalProperties: false,
  },
  async execute({
    collectionId,
    urls,
  }: {
    collectionId: string;
    urls: string[];
  }) {
    const { actor, userId } = await withActor();

    if (actor.type === "api_key") {
      if (actor.mode === "collection_specific") {
        if (!actor.grantedCollectionIds?.includes(collectionId)) {
          throw new Error("API key does not have access to this collection");
        }
      }
      assertCan(actor, Action.ITEM_ADD, collectionId);
    }

    const results = await Promise.allSettled(
      urls.map((url) => itemService.createItem(userId, { url, collectionId })),
    );

    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    const items = results
      .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
      .map((r) => r.value);

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
};

const searchItemsTool = {
  name: "search_items",
  description: "Search through all items accessible to this API key",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", minLength: 1, description: "Search query" },
    },
    required: ["query"],
    additionalProperties: false,
  },
  async execute({ query }: { query: string }) {
    const { actor, userId } = await withActor();

    assertCan(actor, Action.ITEM_SEARCH);

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
};

const registerTool = <T extends Record<string, unknown>>(
  server: Server,
  tool: {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    execute: ToolHandler<T>;
  },
) => {
  server.tool(
    tool.name,
    {
      description: tool.description,
      inputSchema: tool.inputSchema,
    },
    async (args: T) => tool.execute(args),
  );
};

export const createMcpServer = (apiKeyFromRequest?: string) => {
  requestApiKey = apiKeyFromRequest;
  const server = new Server(
    {
      name: "cms-mcp-server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    },
  );

  registerTool(server, testingTool);
  registerTool(server, viewCollectionsTool);
  registerTool(server, addItemToCollectionTool);
  registerTool(server, addItemsToCollectionTool);
  registerTool(server, searchItemsTool);

  return server;
};
