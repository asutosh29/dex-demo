import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { uuidv7 } from "uuidv7";
import { collectionItemsTable } from "./collection-items-schema";
import { timestamps } from "./helpers/timestamp-schema";

export const collectionsTable = pgTable("collections", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  title: text("title").notNull(),
  ...timestamps,
});

export const collectionsRelations = relations(collectionsTable, ({ many }) => ({
  items: many(collectionItemsTable),
}));
