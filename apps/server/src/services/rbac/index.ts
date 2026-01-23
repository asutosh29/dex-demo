import {
  collectionAccessRoleEnum,
  userCollectionsTable,
  apiKeyModeEnum,
} from "~/db/schema";
import { db } from "~/db/client";
import { and, eq } from "drizzle-orm";

export type Role = (typeof collectionAccessRoleEnum.enumValues)[number];
export type ApiKeyMode = (typeof apiKeyModeEnum.enumValues)[number];

export enum Action {
  // Collection
  COLLECTION_CREATE = "collection:create",
  COLLECTION_READ = "collection:read",
  COLLECTION_UPDATE = "collection:update",
  COLLECTION_VIEW_MEMBERS = "collection:view_members",
  COLLECTION_LEAVE = "collection:leave",
  COLLECTION_MANAGE_MEMBERS = "collection:manage_members", // add/remove members (not admins)
  COLLECTION_CHANGE_ROLES = "collection:change_roles", // promote/demote (owner-only)

  // Items
  ITEM_ADD = "item:add",
  ITEM_COPY = "item:copy",
  ITEM_MOVE = "item:move",
  ITEM_DELETE_OWN = "item:delete_own",
  ITEM_DELETE_ANY = "item:delete_any",
  ITEM_SHARE = "item:share",
  ITEM_SEARCH = "item:search",

  // API keys (collection-scoped)
  // TODO: implement these after shared collections
  API_KEY_ADD_COLLECTION_ACCESS = "api_key:add_collection_access",
  API_KEY_REMOVE_COLLECTION_ACCESS = "api_key:remove_collection_access",
  API_KEY_CONFIGURE_ACCESS_SCOPE = "api_key:configure_access_scope",
}

// API Key specific permissions
export const ApiKeyPermissions = {
  // Permissions for collection_specific mode when granted access to a collection
  COLLECTION_SPECIFIC: [
    Action.COLLECTION_READ,
    Action.ITEM_ADD,
    Action.COLLECTION_VIEW_MEMBERS,
  ] as const,

  // Permissions for full_access mode (inherits all collections + create)
  FULL_ACCESS: [Action.COLLECTION_CREATE, Action.ITEM_SEARCH] as const,
} as const;

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
      // For collection_specific mode
      allowedActions?: Action[];
      grantedCollections?: Array<{ id: string; title: string }>;
      // For full_access mode
      userCollections?: Array<{ id: string; title: string; role: Role }>;
    };

export type ApiKeyActor = Extract<Actor, { type: "api_key" }>;
export type UserActor = Extract<Actor, { type: "user" }>;

// Helper to build API key actor with appropriate permissions
export function createApiKeyActor(
  apiKeyId: string,
  userId: string,
  mode: ApiKeyMode,
  grantedCollections: Array<{ id: string; title: string }> = [],
  userCollections: Array<{ id: string; title: string; role: Role }> = [],
): ApiKeyActor {
  if (mode === "full_access") {
    return {
      type: "api_key",
      apiKeyId,
      userId,
      mode,
      allowedActions: [
        ...ApiKeyPermissions.COLLECTION_SPECIFIC,
        ...ApiKeyPermissions.FULL_ACCESS,
      ],
      userCollections,
    };
  }

  // collection_specific mode
  const allowedActions: Action[] = [];

  // If granted collection access, add collection-specific permissions
  if (grantedCollections.length > 0) {
    allowedActions.push(...ApiKeyPermissions.COLLECTION_SPECIFIC);
  }

  return {
    type: "api_key",
    apiKeyId,
    userId,
    mode,
    allowedActions,
    grantedCollections,
  };
}

// actor represents the user or api key performing an action within a collection
export async function getActor(
  userId: string,
  collectionId: string,
): Promise<Actor> {
  const userCollection = await db.query.userCollectionsTable.findFirst({
    where: and(
      eq(userCollectionsTable.userId, userId),
      eq(userCollectionsTable.collectionId, collectionId),
    ),
  });

  if (!userCollection) {
    throw new Error("Collection not found or access denied");
  }

  return {
    type: "user",
    userId,
    role: userCollection.role,
  };
}

export function can(
  actor: Actor,
  action: Action,
  collectionId?: string,
): boolean {
  if (actor.type === "api_key") {
    if (actor.mode === "full_access") {
      // Full access mode: check if user has access to the collection
      if (collectionId && actor.userCollections) {
        const userCollection = actor.userCollections.find(
          (uc) => uc.id === collectionId,
        );
        if (userCollection) {
          return RolePermissions[userCollection.role].includes(action);
        }
        return false;
      }
      // For non-collection-specific actions (like COLLECTION_CREATE, ITEM_SEARCH)
      return (
        action === Action.COLLECTION_CREATE || action === Action.ITEM_SEARCH
      );
    }

    // collection_specific mode
    return actor.allowedActions?.includes(action) ?? false;
  }

  return RolePermissions[actor.role].includes(action);
}

export function assertCan(
  actor: Actor,
  action: Action,
  collectionId?: string,
): void {
  if (!can(actor, action, collectionId)) {
    throw new Error(`Forbidden: missing permission ${action}`);
  }
}
