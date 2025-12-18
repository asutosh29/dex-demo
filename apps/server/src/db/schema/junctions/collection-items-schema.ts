import { pgTable, text, primaryKey, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { collectionsTable } from "../collection-schema";
import { itemsTable } from "../item-schema";

// Junction table for many-to-many relationship between collections and items
export const collectionItemsTable = pgTable(
  "collection_items",
  {
    collectionId: text()
      .notNull()
      .references(() => collectionsTable.id, { onDelete: "cascade" }),
    itemId: text()
      .notNull()
      .references(() => itemsTable.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.collectionId, table.itemId] })],
);

export const collectionItemsRelations = relations(
  collectionItemsTable,
  ({ one }) => ({
    collection: one(collectionsTable, {
      fields: [collectionItemsTable.collectionId],
      references: [collectionsTable.id],
    }),
    item: one(itemsTable, {
      fields: [collectionItemsTable.itemId],
      references: [itemsTable.id],
    }),
  }),
);
