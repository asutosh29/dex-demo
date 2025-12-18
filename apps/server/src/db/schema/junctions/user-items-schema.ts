import { pgTable, text, pgEnum, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { itemsTable } from "../item-schema";
import { user } from "../auth-schema";
import { timestamps } from "../helpers/timestamp-schema";

export const itemAccessRoleEnum = pgEnum("item_access_role", [
  "owner",
  "viewer",
]);
// INFO: we won't need editor permissions cause whats the point if a shared item can be edited

export const userItemsTable = pgTable(
  "user_items",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    itemId: text("item_id")
      .notNull()
      .references(() => itemsTable.id, { onDelete: "cascade" }),
    role: itemAccessRoleEnum().default("viewer").notNull(),
    ...timestamps,
  },
  (table) => [primaryKey({ columns: [table.userId, table.itemId] })],
);

export const userItemsRelations = relations(userItemsTable, ({ one }) => ({
  user: one(user, {
    fields: [userItemsTable.userId],
    references: [user.id],
  }),
  item: one(itemsTable, {
    fields: [userItemsTable.itemId],
    references: [itemsTable.id],
  }),
}));
