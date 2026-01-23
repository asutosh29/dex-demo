import { db } from "~/db/client";
import { eq } from "drizzle-orm";
import {
  apikey,
  apiKeyCollectionsTable,
  userCollectionsTable,
} from "~/db/schema";
import { createApiKeyActor, type Actor } from "~/services/rbac";
import { auth } from "./auth";

/**
 * Validate API key and return Actor for MCP server
 * Returns Actor if valid, null if invalid/expired/revoked
 */

export async function validateMcpApiKey(
  apiKeyString: string,
): Promise<Actor | null> {
  if (!apiKeyString) {
    console.log("[MCP Auth] No API key provided");
    return null;
  }

  console.log(
    "[MCP Auth] Verifying API key:",
    apiKeyString.substring(0, 20) + "...",
  );

  const { valid, error, key } = await auth.api.verifyApiKey({
    body: {
      key: apiKeyString,
    },
  });

  console.log("[MCP Auth] Verification result:", { valid, error });

  if (!valid || !key) {
    console.log("[MCP Auth] API key validation failed");
    return null;
  }

  // Get the API key record to check the mode
  const apiKeyRecord = await db.query.apikey.findFirst({
    where: eq(apikey.id, key.id),
    columns: {
      mode: true,
    },
  });

  const mode = apiKeyRecord?.mode ?? "collection_specific";

  if (mode === "full_access") {
    // For full_access mode, get all user collections with their roles
    const userCollections = await db.query.userCollectionsTable.findMany({
      where: eq(userCollectionsTable.userId, key.userId),
      columns: {
        collectionId: true,
        role: true,
      },
    });

    return createApiKeyActor(
      key.id,
      key.userId,
      mode,
      [],
      userCollections.map((uc) => ({
        collectionId: uc.collectionId,
        role: uc.role,
      })),
    );
  }

  // For collection_specific mode, get granted collections
  const grantedCollections = await db.query.apiKeyCollectionsTable.findMany({
    where: eq(apiKeyCollectionsTable.apiKeyId, key.id),
  });

  const grantedCollectionIds = grantedCollections.map((gc) => gc.collectionId);

  // Build API key actor with appropriate permissions
  return createApiKeyActor(key.id, key.userId, mode, grantedCollectionIds);
}
