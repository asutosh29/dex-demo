import { db } from "~/db/client";
import { collectionsTable } from "~/db/schema/collection-schema";
import { collectionItemsTable } from "~/db/schema/collection-items-schema";
import { eq, and, sql } from "drizzle-orm";

// Create a new collection
export const createCollection = async (title: string) => {
  const [collection] = await db()
    .insert(collectionsTable)
    .values({ title })
    .returning();
  return collection;
};

// Get a collection by ID with its items
// TODO: shift to item.crud.ts with infinite querying in mind
// export const getCollectionById = async (id: string) => {
//   const collection = await db.query.collectionsTable.findFirst({
//     where: eq(collectionsTable.id, id),
//     with: {
//       items: {
//         with: {
//           item: true,
//         },
//       },
//     },
//   });
//   return collection;
// };

// Get all collections (ordered by most recent)
export const getAllCollections = async () => {
  const collections = await db().query.collectionsTable.findMany({
    orderBy: (collections, { desc }) => [desc(collections.createdAt)],
  });
  return collections;
};

// Update a collection's title
export const updateCollection = async (id: string, title: string) => {
  const [collection] = await db()
    .update(collectionsTable)
    .set({ title })
    .where(eq(collectionsTable.id, id))
    .returning();
  return collection;
};

// Delete a collection (items relationship will cascade delete)
export const deleteCollection = async (id: string) => {
  const [deleted] = await db()
    .delete(collectionsTable)
    .where(eq(collectionsTable.id, id))
    .returning();
  return deleted;
};

// Add an item to a collection (which already exists)
// Useful when sharing your item exists and people can add it to their collections
// TODO: Later implementation
// export const addItemToCollectionByItemId = async (
//   collectionId: string,
//   itemId: string,
// ) => {
//   const [collectionItem] = await db
//     .insert(collectionItemsTable)
//     .values({ collectionId, itemId })
//     .onConflictDoNothing() // Prevent duplicate entries
//     .returning();
//   return collectionItem;
// };

// Remove an item from a collection
export const removeItemFromCollection = async (
  collectionId: string,
  itemId: string,
) => {
  const [deleted] = await db()
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

// Get all collections that contain a specific item
export const getCollectionsByItemId = async (itemId: string) => {
  const result = await db().query.itemsTable.findFirst({
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

// Get recent collections (by updated date)
export const getRecentCollections = async (limit = 10) => {
  const collections = await db().query.collectionsTable.findMany({
    orderBy: (collections, { desc }) => [desc(collections.updatedAt)],
    limit,
  });
  return collections;
};
