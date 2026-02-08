import {
  pgTable,
  text,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { collectionsTable } from "../collection-schema";
import { itemsTable } from "../item-schema";

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
  (table) => [
    primaryKey({ columns: [table.collectionId, table.itemId] }),
    // its 2 in one index kinda, indexes by collectionId and also gives a unique pair contraint,
    // i.e. no duplicate items in a collection
    uniqueIndex("uq_collection_item").on(table.collectionId, table.itemId),
  ],
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
