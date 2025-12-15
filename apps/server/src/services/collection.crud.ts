import { db } from "~/db/client";
import { collectionsTable } from "~/db/schema/collection-schema";
import { collectionItemsTable } from "~/db/schema/collection-items-schema";
import { eq, and, sql } from "drizzle-orm";

// Create a new collection
export const createCollection = async (title: string) => {
  const [collection] = await db
    .insert(collectionsTable)
    .values({ title })
    .returning();
  return collection;
};

// Get a collection by ID with its items
export const getCollectionById = async (id: string) => {
  const collection = await db.query.collectionsTable.findFirst({
    where: eq(collectionsTable.id, id),
    with: {
      items: {
        with: {
          item: true,
        },
      },
    },
  });
  return collection;
};

// Get all collections (ordered by most recent)
export const getAllCollections = async () => {
  const collections = await db.query.collectionsTable.findMany({
    with: {
      items: {
        with: {
          item: true,
        },
      },
    },
    orderBy: (collections, { desc }) => [desc(collections.createdAt)],
  });
  return collections;
};

// Update a collection's title
export const updateCollection = async (id: string, title: string) => {
  const [collection] = await db
    .update(collectionsTable)
    .set({ title })
    .where(eq(collectionsTable.id, id))
    .returning();
  return collection;
};

// Delete a collection (items relationship will cascade delete)
export const deleteCollection = async (id: string) => {
  const [deleted] = await db
    .delete(collectionsTable)
    .where(eq(collectionsTable.id, id))
    .returning();
  return deleted;
};

// Add an item to a collection (which already exists)
// Useful when sharing your item exists and people can add it to their collections
export const addItemToCollectionByItemId = async (
  collectionId: string,
  itemId: string,
) => {
  const [collectionItem] = await db
    .insert(collectionItemsTable)
    .values({ collectionId, itemId })
    .onConflictDoNothing() // Prevent duplicate entries
    .returning();
  return collectionItem;
};

// Remove an item from a collection
export const removeItemFromCollection = async (
  collectionId: string,
  itemId: string,
) => {
  const [deleted] = await db
    .delete(collectionItemsTable)
    .where(
      and(
        eq(collectionItemsTable.collectionId, collectionId),
        eq(collectionItemsTable.itemId, itemId),
      ),
    )
    .returning();
  return deleted;
};

// Add multiple items to a collection (bulk operation)
export const addItemsToCollectionByItemIds = async (
  collectionId: string,
  itemIds: string[],
) => {
  if (itemIds.length === 0) return [];

  const collectionItems = await db
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

  const deleted = await db
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

// Get all collections that contain a specific item
export const getCollectionsByItemId = async (itemId: string) => {
  const result = await db.query.itemsTable.findFirst({
    where: (items, { eq }) => eq(items.id, itemId),
    with: {
      collections: {
        with: {
          collection: true,
        },
      },
    },
  });
  return result?.collections.map((c) => c.collection) ?? [];
};

// Check if an item exists in a collection
export const itemExistsInCollection = async (
  collectionId: string,
  itemId: string,
) => {
  const result = await db.query.collectionItemsTable.findFirst({
    where: and(
      eq(collectionItemsTable.collectionId, collectionId),
      eq(collectionItemsTable.itemId, itemId),
    ),
  });
  return !!result;
};

// Get count of items in a collection
export const getCollectionItemCount = async (collectionId: string) => {
  const items = await db
    .select()
    .from(collectionItemsTable)
    .where(eq(collectionItemsTable.collectionId, collectionId));
  return items.length;
};

// Get recent collections (by updated date)
export const getRecentCollections = async (limit = 10) => {
  const collections = await db.query.collectionsTable.findMany({
    with: {
      items: {
        with: {
          item: true,
        },
      },
    },
    orderBy: (collections, { desc }) => [desc(collections.updatedAt)],
    limit,
  });
  return collections;
};
