import { pgTable, text, timestamp, pgEnum, unique } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const aiProviderEnum = pgEnum("ai_provider_enum", [
  "openai",
  "anthropic",
  "groq",
  "openrouter",
  "google",
]);

export const aiProviderKeysTable = pgTable(
  "ai_provider_keys",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    provider: aiProviderEnum("provider").notNull(),
    encryptedKey: text("encrypted_key").notNull(),
    iv: text("iv").notNull(),
    authTag: text("auth_tag").notNull(),
    label: text("label"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      userProviderUnique: unique("user_provider_unique").on(
        table.userId,
        table.provider,
      ),
    };
  },
);
