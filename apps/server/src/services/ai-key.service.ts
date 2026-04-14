import { db } from "~/db/client";
import { aiProviderKeysTable } from "~/db/schema";
import { encrypt, decrypt } from "~/lib/crypto";
import { eq, and } from "drizzle-orm";

export class AiKeyService {
  /**
   * Store (or update) an encrypted API key for a user+provider pair.
   * Uses upsert — if the user already has a key for this provider, it's replaced.
   */
  async storeKey(
    userId: string,
    provider: "openai" | "anthropic" | "groq" | "openrouter" | "google",
    rawKey: string,
    label?: string,
  ) {
    const { encrypted, iv, authTag } = encrypt(rawKey, userId);

    const results = await db
      .insert(aiProviderKeysTable)
      .values({
        id: crypto.randomUUID(),
        userId,
        provider,
        encryptedKey: encrypted,
        iv,
        authTag,
        label,
      })
      .onConflictDoUpdate({
        target: [aiProviderKeysTable.userId, aiProviderKeysTable.provider],
        set: {
          encryptedKey: encrypted,
          iv,
          authTag,
          label,
          updatedAt: new Date(),
        },
      })
      .returning();

    if (!results.length) {
      throw new Error(`Failed to store API key for provider: ${provider}`);
    }

    return {
      id: results[0].id,
      provider: results[0].provider,
      label: results[0].label,
      createdAt: results[0].createdAt,
    };
  }

  /**
   * Decrypt and return a stored key. Throws if key not found or decryption fails.
   */
  async getDecryptedKey(
    userId: string,
    provider: "openai" | "anthropic" | "groq" | "openrouter" | "google",
  ): Promise<string> {
    const record = await db.query.aiProviderKeysTable.findFirst({
      where: and(
        eq(aiProviderKeysTable.userId, userId),
        eq(aiProviderKeysTable.provider, provider),
      ),
    });

    if (!record) {
      throw new Error(`No API key found for provider: ${provider}`);
    }

    try {
      return decrypt(record.encryptedKey, record.iv, record.authTag, userId);
    } catch (error) {
      throw new Error(
        `Failed to decrypt API key for provider: ${provider}. The key may be corrupted.`,
      );
    }
  }

  /**
   * List all stored keys for a user (never returns the raw key).
   */
  async listKeys(userId: string) {
    const records = await db.query.aiProviderKeysTable.findMany({
      where: eq(aiProviderKeysTable.userId, userId),
      columns: {
        id: true,
        provider: true,
        label: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return records;
  }

  /**
   * Delete a stored key. Throws if the key doesn't exist.
   */
  async deleteKey(
    userId: string,
    provider: "openai" | "anthropic" | "groq" | "openrouter" | "google",
  ) {
    const exists = await this.hasKey(userId, provider);
    if (!exists) {
      throw new Error(`No API key found for provider: ${provider}`);
    }

    await db
      .delete(aiProviderKeysTable)
      .where(
        and(
          eq(aiProviderKeysTable.userId, userId),
          eq(aiProviderKeysTable.provider, provider),
        ),
      );
    return { success: true };
  }

  /**
   * Check if a key exists for a user+provider pair.
   */
  async hasKey(
    userId: string,
    provider: "openai" | "anthropic" | "groq" | "openrouter" | "google",
  ): Promise<boolean> {
    const result = await db
      .select({ id: aiProviderKeysTable.id })
      .from(aiProviderKeysTable)
      .where(
        and(
          eq(aiProviderKeysTable.userId, userId),
          eq(aiProviderKeysTable.provider, provider),
        ),
      )
      .limit(1);

    return result.length > 0;
  }
}

export const aiKeyService = new AiKeyService();
