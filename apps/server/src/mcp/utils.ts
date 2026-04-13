import type { ApiKeyActor } from "~/services/rbac";

/**
 * Returns the list of collections the MCP actor has access to.
 * - Extracts `userCollections` for `full_access` API keys
 * - Extracts `grantedCollections` for `collection_specific` API keys
 */
export function getGrantedCollections(actor: ApiKeyActor) {
  return actor.mode === "full_access"
    ? actor.userCollections
    : actor.type === "api_key" && actor.mode === "collection_specific"
      ? actor.grantedCollections
      : [];
}
