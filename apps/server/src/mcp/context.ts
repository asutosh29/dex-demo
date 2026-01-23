import { AsyncLocalStorage } from "async_hooks";
import type { Actor } from "~/services/rbac";

export interface McpRequestContext {
  actor: Actor;
}

// AsyncLocalStorage maintains request-scoped context across async calls
// This is the standard Node.js pattern for request context in async applications
const mcpContextStorage = new AsyncLocalStorage<McpRequestContext>();

/**
 * Get the current request's auth context
 * @throws Error if called outside of a request context
 */
export const getMcpContext = (): McpRequestContext => {
  const context = mcpContextStorage.getStore();
  if (!context) {
    throw new Error(
      "MCP context not found - must be called within request scope",
    );
  }
  return context;
};

/**
 * Run a function with MCP request context available
 * Used by the HTTP handler to set context for the request
 */
export const runWithMcpContext = <T>(
  context: McpRequestContext,
  fn: () => Promise<T>,
): Promise<T> => {
  return mcpContextStorage.run(context, fn);
};
