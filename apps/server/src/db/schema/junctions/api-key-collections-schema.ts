import { pgTable, text, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { collectionsTable } from "../collection-schema";
import { apikey } from "../auth-schema";
import { timestamps } from "../helpers/timestamp-schema";

export const apiKeyCollectionsTable = pgTable(
  "api_key_collections",
  {
    apiKeyId: text("api_key_id")
      .notNull()
      .references(() => apikey.id, { onDelete: "cascade" }),
    collectionId: text("collection_id")
      .notNull()
      .references(() => collectionsTable.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [primaryKey({ columns: [table.apiKeyId, table.collectionId] })],
);

export const apiKeyCollectionsRelations = relations(
  apiKeyCollectionsTable,
  ({ one }) => ({
    collection: one(collectionsTable, {
      fields: [apiKeyCollectionsTable.collectionId],
      references: [collectionsTable.id],
    }),
    apiKey: one(apikey, {
      fields: [apiKeyCollectionsTable.apiKeyId],
      references: [apikey.id],
    }),
  }),
);
