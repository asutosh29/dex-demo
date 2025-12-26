import { VoltAgent } from "@voltagent/core";
import { mcpServer } from "./mcp/server";
import { honoServer } from "@voltagent/server-hono";
import type { AuthProvider } from "@voltagent/server-core";
import { auth } from "./lib/auth";

const provider: AuthProvider = {
  type: "better-auth",
  async verifyToken(token, request) {
    const headers = new Headers();
    const authHeader = request?.headers?.get("authorization");
    headers.set("Authorization", authHeader ?? `Bearer ${token}`);

    const result = await auth.api.verifyApiKey({
      body: {
        key: token,
      },
    });

    return result.key;
  },
};

export const dexAgent = new VoltAgent({
  mcpServers: {
    mcpServer,
  },
  server: honoServer({ auth: provider }),
});
