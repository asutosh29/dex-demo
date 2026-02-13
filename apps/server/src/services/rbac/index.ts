// Main RBAC module - re-exports everything from submodules

// Types
export {
  Action,
  type Role,
  type ApiKeyMode,
  type Actor,
  type ApiKeyActor,
  type UserActor,
} from "./types";

// Permissions
export { RolePermissions, ApiKeyPermissions } from "./permissions";

// Actor management (DB-dependent)
export { createApiKeyActor, getActor, can, assertCan } from "./actor";

// Pure helper functions (no DB dependencies, safe for frontend)
export {
  hasPermission,
  canManageMembers,
  canUpdateCollection,
  canManageApiKeyAccess,
  canPurgeCollection,
  canEditMember,
  getAvailableRoleActions,
  type RoleAction,
} from "./helpers";
