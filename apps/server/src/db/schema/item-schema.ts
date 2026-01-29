import { customType, index, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { relations, sql, SQL } from "drizzle-orm";
import { uuidv7 } from "uuidv7";
import { collectionItemsTable } from "./junctions/collection-items-schema";
import { timestamps } from "./helpers/timestamp-schema";
import { user } from "./auth-schema";
import { itemTypeEnum } from "./helpers/enums-schema";

// Custom tsvector type for Drizzle
export const tsvector = customType<{
  data: string;
}>({
  dataType() {
    return "tsvector";
  },
});

export const itemsTable = pgTable(
  "items",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    type: itemTypeEnum().default("link").notNull(),
    url: text().notNull(),
    title: text().notNull(),
    tldr: text().notNull(),
    tags: text().array().default([]).notNull(),
    favicon: text(),
    image: text(),
    searchVector: tsvector("search_vector").generatedAlwaysAs(
      sql`setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
          setweight(to_tsvector('english', coalesce(tldr, '')), 'B') ||
          setweight(to_tsvector('english', coalesce(array_to_string(tags, ' '), '')), 'C')`,
    ),
    creatorId: text().references(() => user.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [
    index("items_search_idx").using("gin", table.searchVector),
    index("idx_items_creator_id").on(table.creatorId),
  ],
);

export const itemsRelations = relations(itemsTable, ({ many, one }) => ({
  collections: many(collectionItemsTable),
  creator: one(user, {
    fields: [itemsTable.creatorId],
    references: [user.id],
  }),
}));
