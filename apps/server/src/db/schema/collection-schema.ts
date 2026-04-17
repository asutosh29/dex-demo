import {
  pgTable,
  text,
  index,
  check,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { uuidv7 } from "uuidv7";
import { collectionItemsTable } from "./junctions/collection-items-schema";
import { userCollectionsTable } from "./junctions/user-collections-schema";
import { timestamps } from "./helpers/timestamp-schema";

export const collectionsTable = pgTable(
  "collections",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    title: text("title").notNull(),
    parentId: text("parent_id").references(
      (): AnyPgColumn => collectionsTable.id,
      { onDelete: "cascade" },
    ),
    ...timestamps,
  },
  (table) => [
    index("idx_collections_parent_id").on(table.parentId),
    check(
      "collections_no_self_parent",
      sql`${table.parentId} IS NULL OR ${table.parentId} <> ${table.id}`,
    ),
  ],
);

export const collectionsRelations = relations(
  collectionsTable,
  ({ one, many }) => ({
    items: many(collectionItemsTable),
    users: many(userCollectionsTable),
    parent: one(collectionsTable, {
      fields: [collectionsTable.parentId],
      references: [collectionsTable.id],
      relationName: "collection_hierarchy",
    }),
    children: many(collectionsTable, {
      relationName: "collection_hierarchy",
    }),
  }),
);
