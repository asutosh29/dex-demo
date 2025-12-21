import { collectionAccessRoleEnum, userCollectionsTable } from "~/db/schema";
import { db } from "~/db/client";
import { and, eq } from "drizzle-orm";

export type Role = (typeof collectionAccessRoleEnum.enumValues)[number];

export enum Action {
  // Collection
  COLLECTION_READ = "collection:read",
  COLLECTION_UPDATE = "collection:update",
  COLLECTION_VIEW_MEMBERS = "collection:view_members",
  COLLECTION_LEAVE = "collection:leave",
  COLLECTION_MANAGE_MEMBERS = "collection:manage_members", // add/remove members (not admins)
  COLLECTION_CHANGE_ROLES = "collection:change_roles", // promote/demote (owner-only)

  // Items
  ITEM_ADD = "item:add",
  ITEM_MOVE = "item:move",
  ITEM_DELETE_OWN = "item:delete_own",
  ITEM_DELETE_ANY = "item:delete_any",
  ITEM_SHARE = "item:share",

  // API keys (collection-scoped)
  // TODO: implement these after shared collections
  //   API_KEY_ADD_COLLECTION_ACCESS = "api_key:add_collection_access",
  //   API_KEY_REMOVE_COLLECTION_ACCESS = "api_key:remove_collection_access",
  //   API_KEY_CONFIGURE_ACCESS_SCOPE = "api_key:configure_access_scope",
}

export const RolePermissions: Record<Role, readonly Action[]> = {
  member: [
    Action.COLLECTION_READ,
    Action.COLLECTION_VIEW_MEMBERS,
    Action.COLLECTION_LEAVE,

    Action.ITEM_ADD,
    Action.ITEM_DELETE_OWN,
  ],

  admin: [
    // inherits member
    Action.COLLECTION_READ,
    Action.COLLECTION_VIEW_MEMBERS,
    Action.COLLECTION_LEAVE,

    Action.ITEM_ADD,
    Action.ITEM_DELETE_OWN,

    // admin-specific
    Action.COLLECTION_UPDATE,
    Action.ITEM_MOVE,
    Action.ITEM_DELETE_ANY,
    Action.COLLECTION_MANAGE_MEMBERS,

    Action.COLLECTION_CHANGE_ROLES,

    // Action.API_KEY_ADD_COLLECTION_ACCESS,
    // Action.API_KEY_REMOVE_COLLECTION_ACCESS,
  ],

  owner: [
    // inherits admin
    Action.COLLECTION_READ,
    Action.COLLECTION_VIEW_MEMBERS,
    Action.COLLECTION_LEAVE,

    Action.ITEM_ADD,
    Action.ITEM_DELETE_OWN,
    Action.ITEM_DELETE_ANY,
    Action.ITEM_SHARE,

    Action.COLLECTION_UPDATE,
    Action.ITEM_MOVE,
    Action.COLLECTION_MANAGE_MEMBERS,

    // Action.API_KEY_ADD_COLLECTION_ACCESS,
    // Action.API_KEY_REMOVE_COLLECTION_ACCESS,

    // owner-only
    Action.COLLECTION_CHANGE_ROLES,
    // Action.API_KEY_CONFIGURE_ACCESS_SCOPE,
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
      allowedActions: Action[];
    };

/* ─────────────────────────────────────────────
 * Actor resolution
 * ───────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────
 * Authorization helper
 * (NO business logic here)
 * ───────────────────────────────────────────── */

export function can(actor: Actor, action: Action): boolean {
  if (actor.type === "api_key") {
    return actor.allowedActions.includes(action);
  }

  return RolePermissions[actor.role].includes(action);
}

/* ─────────────────────────────────────────────
 * Authorization guard (preferred)
 * ───────────────────────────────────────────── */

export function assertCan(actor: Actor, action: Action): void {
  if (!can(actor, action)) {
    throw new Error(`Forbidden: missing permission ${action}`);
  }
}

/* ─────────────────────────────────────────────
 * IMPORTANT NOTES
 * ─────────────────────────────────────────────
 *
 * - This file intentionally does NOT encode:
 *   - role transitions
 *   - ownership invariants
 *   - target role validation
 *
 * - Role transitions MUST live in domain services:
 *   - promoteMemberToAdmin()
 *   - demoteAdminToMember()
 *   - transferOwnership()
 *
 * - RBAC answers: "may this actor attempt?"
 * - Services answer: "is this transition valid?"
 *
 * This separation is deliberate and non-negotiable.
 */
