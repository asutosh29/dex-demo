import { userCollectionsTable } from "~/db/schema";
import { db } from "~/db/client";
import { and, eq } from "drizzle-orm";
import { RolePermissions, ApiKeyPermissions } from "./permissions";
import type { Actor, ApiKeyActor, Action, Role, ApiKeyMode } from "./types";
import { resolveCollection } from "~/services/collection/resolve";

/** Build API key actor with appropriate permissions */
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

/**
 * Get actor for a collection. Sub-collections inherit their root's membership —
 * resolution is transparent to callers.
 */
export async function getActor(
  userId: string,
  collectionId: string,
): Promise<Actor> {
  const { rootId } = await resolveCollection(collectionId);

  const userCollection = await db.query.userCollectionsTable.findFirst({
    where: and(
      eq(userCollectionsTable.userId, userId),
      eq(userCollectionsTable.collectionId, rootId),
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

/**
 * Synchronous permission check. When passing `collectionId`, the caller must
 * already have resolved it to its root id. Use `canAsync` otherwise.
 */
export function can(
  actor: Actor,
  action: Action,
  collectionId?: string,
): boolean {
  if (actor.type === "api_key") {
    if (actor.mode === "full_access") {
      if (collectionId && actor.userCollections) {
        const userCollection = actor.userCollections.find(
          (uc) => uc.id === collectionId,
        );
        if (userCollection) {
          return RolePermissions[userCollection.role].includes(action);
        }
        return false;
      }
      return action === "collection:create" || action === "item:search";
    }
    return actor.allowedActions?.includes(action) ?? false;
  }

  return RolePermissions[actor.role].includes(action);
}

/**
 * Async variant that resolves a (possibly nested) collection id to its root
 * before comparing against actor-scoped collection lists.
 */
export async function canAsync(
  actor: Actor,
  action: Action,
  collectionId?: string,
): Promise<boolean> {
  const rootId = collectionId
    ? (await resolveCollection(collectionId)).rootId
    : undefined;
  return can(actor, action, rootId);
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

export async function assertCanAsync(
  actor: Actor,
  action: Action,
  collectionId?: string,
): Promise<void> {
  if (!(await canAsync(actor, action, collectionId))) {
    throw new Error(`Forbidden: missing permission ${action}`);
  }
}
