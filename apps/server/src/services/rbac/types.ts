import { collectionAccessRoleEnum, apiKeyModeEnum } from "~/db/schema";

export type Role = (typeof collectionAccessRoleEnum.enumValues)[number];
export type ApiKeyMode = (typeof apiKeyModeEnum.enumValues)[number];

// Use const object instead of enum for compatibility with frontend erasableSyntaxOnly
export const Action = {
  // Collection
  COLLECTION_CREATE: "collection:create",
  COLLECTION_READ: "collection:read",
  COLLECTION_UPDATE: "collection:update",
  COLLECTION_VIEW_MEMBERS: "collection:view_members",
  COLLECTION_LEAVE: "collection:leave",
  COLLECTION_MANAGE_MEMBERS: "collection:manage_members",
  COLLECTION_CHANGE_ROLES: "collection:change_roles",

  // Items
  ITEM_ADD: "item:add",
  ITEM_COPY: "item:copy",
  ITEM_MOVE: "item:move",
  ITEM_DELETE_OWN: "item:delete_own",
  ITEM_DELETE_ANY: "item:delete_any",
  ITEM_SHARE: "item:share",
  ITEM_SEARCH: "item:search",

  // API keys
  API_KEY_ADD_COLLECTION_ACCESS: "api_key:add_collection_access",
  API_KEY_REMOVE_COLLECTION_ACCESS: "api_key:remove_collection_access",
  API_KEY_CONFIGURE_ACCESS_SCOPE: "api_key:configure_access_scope",
} as const;

export type Action = (typeof Action)[keyof typeof Action];

export type Actor =
  | {
      type: "user";
      userId: string;
      role: Role;
    }
  | {
      type: "api_key";
      apiKeyId: string;
      userId: string;
      mode: ApiKeyMode;
      allowedActions?: Action[];
      grantedCollections?: Array<{ id: string; title: string }>;
      userCollections?: Array<{ id: string; title: string; role: Role }>;
    };

export type ApiKeyActor = Extract<Actor, { type: "api_key" }>;
export type UserActor = Extract<Actor, { type: "user" }>;
