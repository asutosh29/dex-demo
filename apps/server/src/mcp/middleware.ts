import { Context, Next } from "hono";
import { validateMcpApiKey } from "~/lib/mcp-auth";
import type { ApiKeyActor } from "~/services/rbac";

export type McpContext = {
  Variables: {
    actor: ApiKeyActor;
  };
};

/**
 * Middleware to validate MCP API key and attach actor to context
 */
export const mcpAuthMiddleware = async (c: Context, next: Next) => {
  const apiKey = c.req.header("X-API-Key");

  if (!apiKey) {
    return c.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32600,
          message: "Invalid request: Missing X-API-Key header",
        },
        id: null,
      },
      { status: 401 },
    );
  }

  // Validate API key and get actor
  const actor = await validateMcpApiKey(apiKey);

  if (!actor) {
    return c.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32600,
          message: "Invalid request: Invalid or expired API key",
        },
        id: null,
      },
      { status: 401 },
    );
  }

  // Attach actor to context
  c.set("actor", actor);

  await next();
};
