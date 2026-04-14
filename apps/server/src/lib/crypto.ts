import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { env } from "./env";

const ALGORITHM = "aes-256-gcm";
const getSecret = () => {
  const secret = env.AI_KEY_ENCRYPTION_SECRET;
  if (!secret || secret.length !== 64) {
    throw new Error("AI_KEY_ENCRYPTION_SECRET must be 64 hex chars");
  }
  return Buffer.from(secret, "hex");
};

/**
 * Encrypt a plaintext string using AES-256-GCM with AAD.
 * The userId is bound as Additional Authenticated Data so the ciphertext
 * cannot be decrypted under a different user — prevents row-swap attacks.
 */
export function encrypt(
  plaintext: string,
  userId: string,
): { encrypted: string; iv: string; authTag: string } {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, getSecret(), iv);
  cipher.setAAD(Buffer.from(userId, "utf8"));
  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    encrypted,
    iv: iv.toString("hex"),
    authTag: cipher.getAuthTag().toString("hex"),
  };
}

/**
 * Decrypt a ciphertext string using AES-256-GCM with AAD.
 * The same userId that was used during encryption must be provided,
 * otherwise the auth tag verification will fail.
 */
export function decrypt(
  encrypted: string,
  iv: string,
  authTag: string,
  userId: string,
): string {
  const decipher = createDecipheriv(
    ALGORITHM,
    getSecret(),
    Buffer.from(iv, "hex"),
  );
  decipher.setAAD(Buffer.from(userId, "utf8"));
  decipher.setAuthTag(Buffer.from(authTag, "hex"));
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
