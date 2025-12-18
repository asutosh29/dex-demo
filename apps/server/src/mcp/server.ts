import { createTool } from "@voltagent/core";
import { MCPServer } from "@voltagent/mcp-server";
import { z } from "zod";
// TODO: Update MCP server to work with new service classes that require userId
// import { collectionService } from "../services/collection.service";
// import { itemService } from "../services/item.service";

// Temporarily disabled until we add auth context to MCP
export const mcpServer = new MCPServer({
  name: "dex-mcp-server",
  version: "0.1.0",
  description: "MCP server for dex - temporarily disabled",
  tools: {},
});

/*
// Old implementation - needs userId context
const createCollectionTool = createTool({
  name: "create collection",
  description: "Create a new collection with a given a title",
  parameters: z.object({
    title: z.string().min(1).max(20),
  }),
  async execute({ title }) {
    const collection = await createCollection(title);
    return `Collection created with ID: ${collection.id} and Title: ${collection.title}`;
  },
});

const addItemToCollectionTool = createTool({
  name: "add item to collection",
  description:
    "Add an item to a collection by providing the collection ID and item URL",
  parameters: z.object({
    collectionId: z.string().min(1),
    url: z.string().url(),
  }),
  async execute({ collectionId, url }) {
    const item = await addItemToCollection(collectionId, url);
    return `Item with URL: ${url} added to Collection ID: ${collectionId}`;
  },
});
*/
