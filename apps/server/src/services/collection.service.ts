import { db } from "~/db/client";
import {
  collectionsTable,
  collectionItemsTable,
  userCollectionsTable,
} from "~/db/schema";
import { eq, and } from "drizzle-orm";

export class CollectionService {
  /**
   * Create a new collection for a user
   */
  async createCollection(userId: string, title: string) {
    const result = await db.transaction(async (tx) => {
      // Create collection
      const [collection] = await tx
        .insert(collectionsTable)
        .values({ title })
        .returning();

      // Add user as owner
      await tx.insert(userCollectionsTable).values({
        userId,
        collectionId: collection.id,
        role: "owner",
      });

      return collection;
    });

    return result;
  }

  /**
   * Get all collections for a user
   */
  async getUserCollections(userId: string) {
    const userCollections = await db.query.userCollectionsTable.findMany({
      where: eq(userCollectionsTable.userId, userId),
      with: {
        collection: {
          with: {
            items: true,
          },
        },
      },
    });

    return userCollections.map((uc) => ({
      ...uc.collection,
      role: uc.role,
      itemCount: uc.collection.items.length,
    }));
  }

  /**
   * Get a single collection with items
   */
  async getCollection(collectionId: string, userId: string) {
    const userCollection = await db.query.userCollectionsTable.findFirst({
      where: and(
        eq(userCollectionsTable.collectionId, collectionId),
        eq(userCollectionsTable.userId, userId),
      ),
      with: {
        collection: {
          with: {
            items: {
              with: {
                item: true,
              },
            },
          },
        },
      },
    });

    if (!userCollection) {
      throw new Error("Collection not found or access denied");
    }

    return {
      ...userCollection.collection,
      role: userCollection.role,
      items: userCollection.collection.items.map((ci) => ci.item),
    };
  }

  /**
   * Add item to collection
   */
  async addItemToCollection(
    collectionId: string,
    itemId: string,
    userId: string,
  ) {
    // Check user has access
    const userCollection = await db.query.userCollectionsTable.findFirst({
      where: and(
        eq(userCollectionsTable.collectionId, collectionId),
        eq(userCollectionsTable.userId, userId),
      ),
    });

    if (!userCollection || userCollection.role === "member") {
      throw new Error("Insufficient permissions");
    }

    // Add item to collection
    await db
      .insert(collectionItemsTable)
      .values({
        collectionId,
        itemId,
      })
      .onConflictDoNothing();

    return { success: true };
  }

  /**
   * Remove item from collection
   */
  async removeItemFromCollection(
    collectionId: string,
    itemId: string,
    userId: string,
  ) {
    // Check user has access
    const userCollection = await db.query.userCollectionsTable.findFirst({
      where: and(
        eq(userCollectionsTable.collectionId, collectionId),
        eq(userCollectionsTable.userId, userId),
      ),
    });

    if (!userCollection || userCollection.role === "member") {
      throw new Error("Insufficient permissions");
    }

    await db
      .delete(collectionItemsTable)
      .where(
        and(
          eq(collectionItemsTable.collectionId, collectionId),
          eq(collectionItemsTable.itemId, itemId),
        ),
      );

    return { success: true };
  }

  /**
   * Delete a collection
   */
  async deleteCollection(collectionId: string, userId: string) {
    // Check user is owner
    const userCollection = await db.query.userCollectionsTable.findFirst({
      where: and(
        eq(userCollectionsTable.collectionId, collectionId),
        eq(userCollectionsTable.userId, userId),
      ),
    });

    if (!userCollection || userCollection.role !== "owner") {
      throw new Error("Only owners can delete collections");
    }

    await db
      .delete(collectionsTable)
      .where(eq(collectionsTable.id, collectionId));

    return { success: true };
  }

  /**
   * Update collection title
   */
  async updateCollection(collectionId: string, userId: string, title: string) {
    // Check user has access
    const userCollection = await db.query.userCollectionsTable.findFirst({
      where: and(
        eq(userCollectionsTable.collectionId, collectionId),
        eq(userCollectionsTable.userId, userId),
      ),
    });

    if (!userCollection || userCollection.role === "member") {
      throw new Error("Insufficient permissions");
    }

    const [updated] = await db
      .update(collectionsTable)
      .set({ title })
      .where(eq(collectionsTable.id, collectionId))
      .returning();

    return updated;
  }

  /**
   * Move item from one collection to another
   */
  async moveItemBetweenCollections(
    itemId: string,
    fromCollectionId: string,
    toCollectionId: string,
    userId: string,
  ) {
    // Perform the move in a transaction
    await db.transaction(async (tx) => {
      // Update the collection ID for the item
      await tx
        .update(collectionItemsTable)
        .set({ collectionId: toCollectionId })
        .where(
          and(
            eq(collectionItemsTable.collectionId, fromCollectionId),
            eq(collectionItemsTable.itemId, itemId),
          ),
        );
    });

    return { success: true };
  }
}

export const collectionService = new CollectionService();
