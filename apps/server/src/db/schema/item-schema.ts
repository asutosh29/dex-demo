import { index, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { SQL, sql } from "drizzle-orm";
import { uuidv7 } from "uuidv7";
import { collectionItemsTable } from "./collection-items-schema";

export const itemTypeEnum = pgEnum("item_type", ["link", "image", "document"]);

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
  },
  (table) => ({
    searchIdx: index("items_search_idx").using(
      "gin",
      sql`(
          setweight(to_tsvector('english', coalesce(${table.title}, '')), 'A') ||
          setweight(to_tsvector('english', coalesce(array_to_string(${table.tags}, ' ', ''), '')), 'B') ||
          setweight(to_tsvector('english', coalesce(${table.tldr}, '')), 'C')
      )`,
    ),
  }),
);

export const itemsRelations = relations(itemsTable, ({ many }) => ({
  collections: many(collectionItemsTable),
}));
