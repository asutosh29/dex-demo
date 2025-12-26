import { pgTable, text, pgEnum, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { collectionsTable } from "../collection-schema";
import { user } from "../auth-schema";
import { timestamps } from "../helpers/timestamp-schema";
import { collectionAccessRoleEnum } from "../helpers/access-enums-schema";

export const userCollectionsTable = pgTable(
  "user_collections",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    collectionId: text("collection_id")
      .notNull()
      .references(() => collectionsTable.id, { onDelete: "cascade" }),
    role: collectionAccessRoleEnum().default("member").notNull(),
    ...timestamps,
  },
  (table) => [primaryKey({ columns: [table.userId, table.collectionId] })],
);

export const userCollectionsRelations = relations(
  userCollectionsTable,
  ({ one }) => ({
    user: one(user, {
      fields: [userCollectionsTable.userId],
      references: [user.id],
    }),
    collection: one(collectionsTable, {
      fields: [userCollectionsTable.collectionId],
      references: [collectionsTable.id],
    }),
  }),
);
