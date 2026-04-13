import { db } from "~/db/client";
import {
  collectionsTable,
  collectionItemsTable,
  userCollectionsTable,
  itemsTable,
  user,
} from "~/db/schema";
import {
  eq,
  and,
  countDistinct,
  getTableColumns,
  desc,
  gte,
  lt,
} from "drizzle-orm";
import { getActor, assertCan, Action } from "./rbac";
import { alias } from "drizzle-orm/pg-core";

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

  async getCollectionsAndItemsCount(userId: string) {
    const result = db
      .select({
        id: collectionsTable.id,
        itemCount: countDistinct(itemsTable.id),
      })
      .from(userCollectionsTable)
      .innerJoin(
        collectionsTable,
        eq(userCollectionsTable.collectionId, collectionsTable.id),
      )
      .leftJoin(
        collectionItemsTable,
        eq(collectionsTable.id, collectionItemsTable.collectionId),
      )
      .leftJoin(itemsTable, eq(collectionItemsTable.itemId, itemsTable.id))
      .where(eq(userCollectionsTable.userId, userId))
      .groupBy(collectionsTable.id);

    return result;
  }

  async getUserCollections(
    userId: string,
    sortBy: "createdAt" | "updatedAt" | "title" = "createdAt",
    order: "asc" | "desc" = "desc",
  ) {
    // self-join to count members
    const ucMembers = alias(userCollectionsTable, "uc_members");

    const userCollections = await db
      .select({
        id: collectionsTable.id,
        title: collectionsTable.title,
        createdAt: collectionsTable.createdAt,
        isShared: gte(countDistinct(ucMembers.userId), 2),
        role: userCollectionsTable.role,
      })
      .from(userCollectionsTable)
      .where(eq(userCollectionsTable.userId, userId))
      .innerJoin(
        collectionsTable,
        eq(userCollectionsTable.collectionId, collectionsTable.id),
      )
      .leftJoin(ucMembers, eq(ucMembers.collectionId, collectionsTable.id))
      .leftJoin(user, eq(user.id, ucMembers.userId))
      .groupBy(collectionsTable.id, userCollectionsTable.role)
      .orderBy(
        order === "asc"
          ? collectionsTable[sortBy]
          : desc(collectionsTable[sortBy]),
      );

    return userCollections;
  }

  /**
   * Get a single collection with items
   */
  // TODO: optimize queries for infinite scroll
  async getCollection(
    collectionId: string,
    userId: string,
    limit?: number,
    cursor?: string,
  ) {
    // First check user has access to this collection
    const userCollection = await db.query.userCollectionsTable.findFirst({
      where: and(
        eq(userCollectionsTable.collectionId, collectionId),
        eq(userCollectionsTable.userId, userId),
      ),
      with: {
        collection: true,
      },
    });

    if (!userCollection) {
      throw new Error("Collection not found or access denied");
    }

    // Build base query conditions
    const queryConditions = [
      eq(collectionItemsTable.collectionId, collectionId),
    ];

    // UUIDv7 IDs are time-sorted and unique — using id as cursor
    // gives stable, gap-free keyset pagination with no duplicates
    if (cursor) {
      queryConditions.push(lt(itemsTable.id, cursor));
    }

    const baseQuery = db
      .select({
        ...getTableColumns(itemsTable),
      })
      .from(itemsTable)
      .innerJoin(
        collectionItemsTable,
        eq(itemsTable.id, collectionItemsTable.itemId),
      )
      .where(and(...queryConditions))
      .orderBy(desc(itemsTable.id));

    // Fetch +1 to detect next page
    const items = limit ? await baseQuery.limit(limit + 1) : await baseQuery;

    let hasMore = false;
    let nextCursor: string | null = null;

    if (limit && items.length > limit) {
      hasMore = true;
      items.pop();
      const lastItem = items[items.length - 1];
      nextCursor = lastItem?.id ?? null;
    }

    return {
      ...userCollection.collection,
      role: userCollection.role,
      items,
      pagination: {
        hasMore,
        nextCursor,
      },
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
    const actor = await getActor(userId, collectionId);
    assertCan(actor, Action.ITEM_ADD);

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
    const actor = await getActor(userId, collectionId);

    // Get item details to check creator
    const item = await db.query.itemsTable.findFirst({
      where: eq(itemsTable.id, itemId),
      with: {
        collections: true, // All collections this item is in
      },
    });

    if (!item) {
      throw new Error("Item not found");
    }

    // Check permissions: creator can delete own, admins can delete any
    const isCreator = item.creatorId === userId;

    if (isCreator) {
      assertCan(actor, Action.ITEM_DELETE_OWN);
    } else {
      assertCan(actor, Action.ITEM_DELETE_ANY); // Admin+ only
    }

    // Remove from collection
    await db
      .delete(collectionItemsTable)
      .where(
        and(
          eq(collectionItemsTable.collectionId, collectionId),
          eq(collectionItemsTable.itemId, itemId),
        ),
      );

    // If item no longer in any collection, delete completely
    const remainingCollections = item.collections.filter(
      (ci) => ci.collectionId !== collectionId,
    );

    if (remainingCollections.length === 0) {
      await db.delete(itemsTable).where(eq(itemsTable.id, itemId));
    }

    return { success: true };
  }

  /**
   * Delete a collection
   */
  async deleteCollection(collectionId: string, userId: string) {
    const actor = await getActor(userId, collectionId);
    assertCan(actor, Action.COLLECTION_CHANGE_ROLES); // Owner-only

    await db.transaction(async (tx) => {
      await tx
        .delete(collectionsTable)
        .where(eq(collectionsTable.id, collectionId));
    });

    return { success: true };
  }

  /**
   * Update collection title
   */
  async updateCollection(collectionId: string, userId: string, title: string) {
    const actor = await getActor(userId, collectionId);
    assertCan(actor, Action.COLLECTION_UPDATE);

    const [updated] = await db
      .update(collectionsTable)
      .set({ title })
      .where(eq(collectionsTable.id, collectionId))
      .returning();

    return updated;
  }

  /**
   * Copy item to another collection
   */
  async copyItemToCollection(
    itemId: string,
    fromCollectionId: string,
    toCollectionId: string,
    userId: string,
  ) {
    // Check permissions: need ITEM_COPY on source and ITEM_ADD on target
    const fromActor = await getActor(userId, fromCollectionId);
    const toActor = await getActor(userId, toCollectionId);

    assertCan(fromActor, Action.ITEM_COPY);
    assertCan(toActor, Action.ITEM_ADD);

    // Check if item already exists in target collection
    const existing = await db.query.collectionItemsTable.findFirst({
      where: and(
        eq(collectionItemsTable.collectionId, toCollectionId),
        eq(collectionItemsTable.itemId, itemId),
      ),
    });

    if (existing) {
      throw new Error("Item already exists in target collection");
    }

    // Add item to target collection (creates new relationship)
    await db.insert(collectionItemsTable).values({
      collectionId: toCollectionId,
      itemId,
    });

    return { success: true };
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
    // Check permissions on BOTH collections
    const fromActor = await getActor(userId, fromCollectionId);
    const toActor = await getActor(userId, toCollectionId);

    assertCan(fromActor, Action.ITEM_MOVE);
    assertCan(toActor, Action.ITEM_ADD);

    // Check if item already exists in target collection
    const existing = await db.query.collectionItemsTable.findFirst({
      where: and(
        eq(collectionItemsTable.collectionId, toCollectionId),
        eq(collectionItemsTable.itemId, itemId),
      ),
    });

    if (existing) {
      throw new Error("Item already exists in target collection");
    }

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
