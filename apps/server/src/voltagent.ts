import { VoltAgent } from "@voltagent/core";
import { mcpServer } from "./mcp/server";
import { honoServer } from "@voltagent/server-hono";

export const dexAgent = new VoltAgent({
  mcpServers: {
    mcpServer,
  },
  server: honoServer({ port: 3141 }),
});
