import { and, eq, sql } from "drizzle-orm";
import { db } from "~/db/client";
import { collectionItemsTable } from "~/db/schema";

// utility functions
export const addItemsToCollectionByItemIds = async (
  collectionId: string,
  itemIds: string[],
) => {
  if (itemIds.length === 0) return [];

  const collectionItems = await db()
    .insert(collectionItemsTable)
    .values(itemIds.map((itemId) => ({ collectionId, itemId })))
    .onConflictDoNothing()
    .returning();
  return collectionItems;
};

// Remove multiple items from a collection (bulk operation)
export const removeItemsFromCollection = async (
  collectionId: string,
  itemIds: string[],
) => {
  if (itemIds.length === 0) return [];

  const deleted = await db()
    .delete(collectionItemsTable)
    .where(
      and(
        eq(collectionItemsTable.collectionId, collectionId),
        // Use SQL IN clause for multiple items
        sql`${collectionItemsTable.itemId} = ANY(${itemIds})`,
      ),
    )
    .returning();
  return deleted;
};

// Check if an item exists in a collection
export const itemExistsInCollection = async (
  collectionId: string,
  itemId: string,
) => {
  const result = await db().query.collectionItemsTable.findFirst({
    where: and(
      eq(collectionItemsTable.collectionId, collectionId),
      eq(collectionItemsTable.itemId, itemId),
    ),
  });
  return !!result;
};
