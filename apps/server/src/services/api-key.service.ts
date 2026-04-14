import { db } from "~/db/client";
import { apikey, apiKeyCollectionsTable } from "~/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "~/lib/auth";
import { getActor, assertCan, Action, type ApiKeyMode } from "./rbac";
import { resolveCollection, assertRoot } from "./collection/resolve";

export class ApiKeyService {
  /**
   * Create a new API key for a user
   */
  async createApiKey(
    userId: string,
    name: string,
    mode: ApiKeyMode,
    expiresIn?: number,
    collectionIds?: string[],
  ) {
    const apiKey = await auth.api.createApiKey({
      body: {
        userId,
        name,
        expiresIn,
      },
    });

    // Update the mode in the database
    await db.update(apikey).set({ mode }).where(eq(apikey.id, apiKey.id));

    // Grant collection access if provided for collection_specific mode
    if (
      mode === "collection_specific" &&
      collectionIds &&
      collectionIds.length > 0
    ) {
      for (const collectionId of collectionIds) {
        // Grants apply to roots only — children inherit.
        assertRoot(await resolveCollection(collectionId));

        // Verify user has access to the collection
        const actor = await getActor(userId, collectionId);
        assertCan(actor, Action.COLLECTION_READ);

        // Grant access
        await db
          .insert(apiKeyCollectionsTable)
          .values({
            apiKeyId: apiKey.id,
            collectionId,
          })
          .onConflictDoNothing();
      }
    }

    return {
      id: apiKey.id,
      key: apiKey.key, // Only returned once
      name: apiKey.name,
      mode,
      createdAt: apiKey.createdAt,
    };
  }

  /**
   * List all API keys for a user with their granted collections
   */
  async listUserApiKeys(userId: string, headers: Headers) {
    const { apiKeys } = await auth.api.listApiKeys({ headers });

    // For each key, get the mode and granted collections
    const keysWithAccess = await Promise.all(
      apiKeys.map(async (key) => {
        const apiKeyRecord = await db.query.apikey.findFirst({
          where: eq(apikey.id, key.id),
          columns: {
            mode: true,
          },
        });

        const mode = apiKeyRecord?.mode ?? "collection_specific";

        const grantedCollections =
          await db.query.apiKeyCollectionsTable.findMany({
            where: eq(apiKeyCollectionsTable.apiKeyId, key.id),
            with: {
              collection: {
                columns: {
                  id: true,
                  title: true,
                },
              },
            },
          });

        return {
          ...key,
          mode,
          grantedCollections: grantedCollections.map((gc) => gc.collection),
        };
      }),
    );

    return keysWithAccess;
  }

  /**
   * Grant a collection access to an API key
   */
  async grantCollectionAccess(
    userId: string,
    apiKeyId: string,
    collectionId: string,
  ) {
    // Verify user owns the API key
    const apiKeyRecord = await db.query.apikey.findFirst({
      where: eq(apikey.id, apiKeyId),
    });

    if (!apiKeyRecord || apiKeyRecord.referenceId !== userId) {
      throw new Error("API key not found or access denied");
    }

    // Only collection_specific mode keys can have collection access granted
    if (apiKeyRecord.mode === "full_access") {
      throw new Error(
        "Cannot grant collection access to full access mode API keys",
      );
    }

    // Grants apply to roots only — children inherit from their parent.
    assertRoot(await resolveCollection(collectionId));

    // Verify user has access to the collection (member or above)
    const actor = await getActor(userId, collectionId);
    assertCan(actor, Action.COLLECTION_READ);

    // Grant access
    await db
      .insert(apiKeyCollectionsTable)
      .values({
        apiKeyId,
        collectionId,
      })
      .onConflictDoNothing();

    return { success: true };
  }

  /**
   * Revoke a collection access from an API key
   */
  async revokeCollectionAccess(
    userId: string,
    apiKeyId: string,
    collectionId: string,
  ) {
    // Verify user owns the API key
    const apiKeyRecord = await db.query.apikey.findFirst({
      where: eq(apikey.id, apiKeyId),
    });

    if (!apiKeyRecord || apiKeyRecord.referenceId !== userId) {
      throw new Error("API key not found or access denied");
    }

    // Only collection_specific mode keys can have collection access revoked
    if (apiKeyRecord.mode === "full_access") {
      throw new Error(
        "Cannot revoke collection access from full access mode API keys",
      );
    }

    await db
      .delete(apiKeyCollectionsTable)
      .where(
        and(
          eq(apiKeyCollectionsTable.apiKeyId, apiKeyId),
          eq(apiKeyCollectionsTable.collectionId, collectionId),
        ),
      );

    return { success: true };
  }

  /**
   * Delete an API key
   */
  async deleteApiKey(apiKeyId: string) {
    const { success } = await auth.api.deleteApiKey({
      body: {
        keyId: apiKeyId,
      },
    });

    // CASCADE will automatically delete from apiKeyCollectionsTable
    return { success };
  }
}

export const apiKeyService = new ApiKeyService();
