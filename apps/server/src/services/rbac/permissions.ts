import { Action, type Role } from "./types";

export const RolePermissions: Record<Role, readonly Action[]> = {
  member: [
    Action.COLLECTION_READ,
    Action.COLLECTION_VIEW_MEMBERS,
    Action.COLLECTION_LEAVE,
    Action.ITEM_ADD,
    Action.ITEM_COPY,
    Action.ITEM_DELETE_OWN,
  ],

  admin: [
    // inherits member
    Action.COLLECTION_READ,
    Action.COLLECTION_VIEW_MEMBERS,
    Action.COLLECTION_LEAVE,
    Action.ITEM_ADD,
    Action.ITEM_COPY,
    Action.ITEM_DELETE_OWN,
    // admin-specific
    Action.COLLECTION_UPDATE,
    Action.ITEM_MOVE,
    Action.ITEM_DELETE_ANY,
    Action.COLLECTION_MANAGE_MEMBERS,
    Action.COLLECTION_CHANGE_ROLES,
    Action.API_KEY_ADD_COLLECTION_ACCESS,
    Action.API_KEY_REMOVE_COLLECTION_ACCESS,
  ],

  owner: [
    // inherits admin
    Action.COLLECTION_READ,
    Action.COLLECTION_VIEW_MEMBERS,
    Action.COLLECTION_LEAVE,
    Action.ITEM_ADD,
    Action.ITEM_COPY,
    Action.ITEM_DELETE_OWN,
    Action.ITEM_DELETE_ANY,
    Action.ITEM_SHARE,
    Action.COLLECTION_UPDATE,
    Action.ITEM_MOVE,
    Action.COLLECTION_MANAGE_MEMBERS,
    Action.API_KEY_ADD_COLLECTION_ACCESS,
    Action.API_KEY_REMOVE_COLLECTION_ACCESS,
    Action.COLLECTION_CHANGE_ROLES,
    // owner-only
    Action.API_KEY_CONFIGURE_ACCESS_SCOPE,
  ],
} as const;

export const ApiKeyPermissions = {
  COLLECTION_SPECIFIC: [
    Action.COLLECTION_READ,
    Action.ITEM_ADD,
    Action.COLLECTION_VIEW_MEMBERS,
  ] as const,
  FULL_ACCESS: [Action.COLLECTION_CREATE, Action.ITEM_SEARCH] as const,
} as const;
