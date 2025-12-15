import { customType, index, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { relations, sql, SQL } from "drizzle-orm";
import { uuidv7 } from "uuidv7";
import { collectionItemsTable } from "./collection-items-schema";
import { timestamps } from "./helpers/timestamp-schema";

export const itemTypeEnum = pgEnum("item_type", ["link"]); // for now, just links, later on images and documents

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
          setweight(to_tsvector('english', coalesce(tldr, '')), 'B')`,
    ),
    ...timestamps,
  },
  (table) => ({
    searchIdx: index("items_search_idx").using("gin", table.searchVector),
  }),
);

export const itemsRelations = relations(itemsTable, ({ many }) => ({
  collections: many(collectionItemsTable),
}));
