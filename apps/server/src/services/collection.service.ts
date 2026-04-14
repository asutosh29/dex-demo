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
  inArray,
  notInArray,
  isNull,
  countDistinct,
  getTableColumns,
  desc,
  gte,
  sql,
} from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { getActor, assertCan, Action } from "./rbac";
import { alias } from "drizzle-orm/pg-core";
import { resolveCollection } from "./collection/resolve";

export class CollectionService {
  /**
   * Create a new collection. When `parentId` is provided, the new collection
   * becomes a sub-collection (one level only). Membership is inherited from
   * the parent, so no user_collections row is created for children.
   */
  async createCollection(userId: string, title: string, parentId?: string) {
    if (parentId) {
      const parent = await resolveCollection(parentId);
      if (!parent.isRoot) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot nest sub-collections more than one level deep",
        });
      }

      const actor = await getActor(userId, parent.id);
      assertCan(actor, Action.COLLECTION_UPDATE);

      const result = await db.transaction(async (tx) => {
        const [collection] = await tx
          .insert(collectionsTable)
          .values({ title, parentId: parent.id })
          .returning();

        // Touch parent updatedAt so root-level sorting reflects this change.
        await tx
          .update(collectionsTable)
          .set({ updatedAt: new Date() })
          .where(eq(collectionsTable.id, parent.id));

        return collection;
      });

      return result;
    }

    const result = await db.transaction(async (tx) => {
      const [collection] = await tx
        .insert(collectionsTable)
        .values({ title })
        .returning();

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
   * Return item counts for each top-level collection the user belongs to.
   * Count aggregates items directly attached to the root plus items in any
   * of its sub-collections.
   */
  async getCollectionsAndItemsCount(userId: string) {
    const childCollection = alias(collectionsTable, "child_collection");

    const result = db
      .select({
        id: collectionsTable.id,
        itemCount: countDistinct(collectionItemsTable.itemId),
      })
      .from(userCollectionsTable)
      .innerJoin(
        collectionsTable,
        eq(userCollectionsTable.collectionId, collectionsTable.id),
      )
      .leftJoin(
        childCollection,
        eq(childCollection.parentId, collectionsTable.id),
      )
      .leftJoin(
        collectionItemsTable,
        sql`${collectionItemsTable.collectionId} = ${collectionsTable.id} OR ${collectionItemsTable.collectionId} = ${childCollection.id}`,
      )
      .where(
        and(
          eq(userCollectionsTable.userId, userId),
          isNull(collectionsTable.parentId),
        ),
      )
      .groupBy(collectionsTable.id);

    return result;
  }

  async getUserCollections(
    userId: string,
    sortBy: "createdAt" | "updatedAt" | "title" = "createdAt",
    order: "asc" | "desc" = "desc",
  ) {
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
      .where(
        and(
          eq(userCollectionsTable.userId, userId),
          isNull(collectionsTable.parentId),
        ),
      )
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
   * Get a single collection with its items. Works on roots and sub-collections.
   * Sub-collection callers get `parentId` set; root callers get a `children`
   * list with per-child item counts.
   */
  async getCollection(collectionId: string, userId: string) {
    const resolved = await resolveCollection(collectionId);

    const membership = await db.query.userCollectionsTable.findFirst({
      where: and(
        eq(userCollectionsTable.userId, userId),
        eq(userCollectionsTable.collectionId, resolved.rootId),
      ),
    });

    if (!membership) {
      throw new Error("Collection not found or access denied");
    }

    const collection = await db.query.collectionsTable.findFirst({
      where: eq(collectionsTable.id, collectionId),
    });

    if (!collection) {
      throw new Error("Collection not found or access denied");
    }

    const items = await db
      .select({
        ...getTableColumns(itemsTable),
      })
      .from(itemsTable)
      .innerJoin(
        collectionItemsTable,
        eq(itemsTable.id, collectionItemsTable.itemId),
      )
      .where(eq(collectionItemsTable.collectionId, collectionId))
      .orderBy(desc(itemsTable.createdAt));

    // Children are only meaningful on roots (one-level nesting).
    let children: Array<{
      id: string;
      title: string;
      createdAt: Date;
      updatedAt: Date;
      itemCount: number;
    }> = [];

    if (resolved.isRoot) {
      const childRows = await db
        .select({
          id: collectionsTable.id,
          title: collectionsTable.title,
          createdAt: collectionsTable.createdAt,
          updatedAt: collectionsTable.updatedAt,
          itemCount: countDistinct(collectionItemsTable.itemId),
        })
        .from(collectionsTable)
        .leftJoin(
          collectionItemsTable,
          eq(collectionItemsTable.collectionId, collectionsTable.id),
        )
        .where(eq(collectionsTable.parentId, collectionId))
        .groupBy(collectionsTable.id)
        .orderBy(desc(collectionsTable.createdAt));

      children = childRows.map((c) => ({
        ...c,
        itemCount: Number(c.itemCount),
      }));
    }

    return {
      ...collection,
      role: membership.role,
      items,
      parentId: resolved.parentId,
      children,
    };
  }

  /**
   * List direct sub-collections of a root collection.
   */
  async getSubCollections(parentId: string, userId: string) {
    const actor = await getActor(userId, parentId);
    assertCan(actor, Action.COLLECTION_READ);

    const resolved = await resolveCollection(parentId);
    if (!resolved.isRoot) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Sub-collections cannot contain further sub-collections",
      });
    }

    const children = await db
      .select({
        id: collectionsTable.id,
        title: collectionsTable.title,
        createdAt: collectionsTable.createdAt,
        updatedAt: collectionsTable.updatedAt,
        itemCount: countDistinct(collectionItemsTable.itemId),
      })
      .from(collectionsTable)
      .leftJoin(
        collectionItemsTable,
        eq(collectionItemsTable.collectionId, collectionsTable.id),
      )
      .where(eq(collectionsTable.parentId, parentId))
      .groupBy(collectionsTable.id)
      .orderBy(desc(collectionsTable.createdAt));

    return children.map((c) => ({ ...c, itemCount: Number(c.itemCount) }));
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

    const resolved = await resolveCollection(collectionId);

    await db.transaction(async (tx) => {
      await tx
        .insert(collectionItemsTable)
        .values({ collectionId, itemId })
        .onConflictDoNothing();

      await tx
        .update(collectionsTable)
        .set({ updatedAt: new Date() })
        .where(eq(collectionsTable.id, resolved.rootId));
    });

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

    const item = await db.query.itemsTable.findFirst({
      where: eq(itemsTable.id, itemId),
      with: {
        collections: true,
      },
    });

    if (!item) {
      throw new Error("Item not found");
    }

    const isCreator = item.creatorId === userId;
    if (isCreator) {
      assertCan(actor, Action.ITEM_DELETE_OWN);
    } else {
      assertCan(actor, Action.ITEM_DELETE_ANY);
    }

    const resolved = await resolveCollection(collectionId);

    await db.transaction(async (tx) => {
      await tx
        .delete(collectionItemsTable)
        .where(
          and(
            eq(collectionItemsTable.collectionId, collectionId),
            eq(collectionItemsTable.itemId, itemId),
          ),
        );

      const remaining = item.collections.filter(
        (ci) => ci.collectionId !== collectionId,
      );
      if (remaining.length === 0) {
        await tx.delete(itemsTable).where(eq(itemsTable.id, itemId));
      }

      await tx
        .update(collectionsTable)
        .set({ updatedAt: new Date() })
        .where(eq(collectionsTable.id, resolved.rootId));
    });

    return { success: true };
  }

  /**
   * Delete a collection. For roots, cascades to sub-collections (FK). Items
   * whose only remaining memberships lie inside the deleted tree are hard-
   * deleted in the same transaction so nothing is left orphaned.
   */
  async deleteCollection(collectionId: string, userId: string) {
    const resolved = await resolveCollection(collectionId);
    const actor = await getActor(userId, collectionId);

    if (resolved.isRoot) {
      assertCan(actor, Action.COLLECTION_CHANGE_ROLES);
    } else {
      assertCan(actor, Action.COLLECTION_UPDATE);
    }

    await db.transaction(async (tx) => {
      let idsToRemove: string[] = [collectionId];
      if (resolved.isRoot) {
        const children = await tx
          .select({ id: collectionsTable.id })
          .from(collectionsTable)
          .where(eq(collectionsTable.parentId, collectionId));
        idsToRemove = [collectionId, ...children.map((c) => c.id)];
      }

      // Items whose only memberships lie inside the removed tree get hard-deleted
      // alongside the collection so nothing is orphaned in the items table.
      const candidates = await tx
        .selectDistinct({ itemId: collectionItemsTable.itemId })
        .from(collectionItemsTable)
        .where(inArray(collectionItemsTable.collectionId, idsToRemove));

      let orphanIds: string[] = [];
      if (candidates.length > 0) {
        const candidateIds = candidates.map((r) => r.itemId);
        const survivors = await tx
          .selectDistinct({ itemId: collectionItemsTable.itemId })
          .from(collectionItemsTable)
          .where(
            and(
              inArray(collectionItemsTable.itemId, candidateIds),
              notInArray(collectionItemsTable.collectionId, idsToRemove),
            ),
          );
        const surviving = new Set(survivors.map((r) => r.itemId));
        orphanIds = candidateIds.filter((id) => !surviving.has(id));
      }

      await tx
        .delete(collectionsTable)
        .where(eq(collectionsTable.id, collectionId));

      if (orphanIds.length > 0) {
        await tx.delete(itemsTable).where(inArray(itemsTable.id, orphanIds));
      }

      if (!resolved.isRoot) {
        await tx
          .update(collectionsTable)
          .set({ updatedAt: new Date() })
          .where(eq(collectionsTable.id, resolved.rootId));
      }
    });

    return { success: true };
  }

  /**
   * Update collection title
   */
  async updateCollection(collectionId: string, userId: string, title: string) {
    const actor = await getActor(userId, collectionId);
    assertCan(actor, Action.COLLECTION_UPDATE);

    const resolved = await resolveCollection(collectionId);
    const now = new Date();

    const [updated] = await db.transaction(async (tx) => {
      const [collection] = await tx
        .update(collectionsTable)
        .set({ title, updatedAt: now })
        .where(eq(collectionsTable.id, collectionId))
        .returning();

      if (!resolved.isRoot) {
        await tx
          .update(collectionsTable)
          .set({ updatedAt: now })
          .where(eq(collectionsTable.id, resolved.rootId));
      }

      return [collection];
    });

    return updated;
  }

  /**
   * Move a sub-collection to a different root. v1: only child -> root swaps.
   */
  async moveCollection(
    collectionId: string,
    newParentId: string,
    userId: string,
  ) {
    const source = await resolveCollection(collectionId);
    if (source.isRoot) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Only sub-collections can be moved",
      });
    }

    const target = await resolveCollection(newParentId);
    if (!target.isRoot) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Target must be a root collection",
      });
    }

    if (source.parentId === target.id) {
      return { success: true };
    }

    const oldRootActor = await getActor(userId, source.rootId);
    assertCan(oldRootActor, Action.COLLECTION_UPDATE);

    const newRootActor = await getActor(userId, target.id);
    assertCan(newRootActor, Action.COLLECTION_UPDATE);

    const oldRootId = source.rootId;

    await db.transaction(async (tx) => {
      await tx
        .update(collectionsTable)
        .set({ parentId: target.id })
        .where(eq(collectionsTable.id, collectionId));

      await tx
        .update(collectionsTable)
        .set({ updatedAt: new Date() })
        .where(inArray(collectionsTable.id, [oldRootId, target.id]));
    });

    return { success: true };
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
    const fromActor = await getActor(userId, fromCollectionId);
    const toActor = await getActor(userId, toCollectionId);

    assertCan(fromActor, Action.ITEM_COPY);
    assertCan(toActor, Action.ITEM_ADD);

    const existing = await db.query.collectionItemsTable.findFirst({
      where: and(
        eq(collectionItemsTable.collectionId, toCollectionId),
        eq(collectionItemsTable.itemId, itemId),
      ),
    });

    if (existing) {
      throw new Error("Item already exists in target collection");
    }

    const toRoot = (await resolveCollection(toCollectionId)).rootId;

    await db.transaction(async (tx) => {
      await tx.insert(collectionItemsTable).values({
        collectionId: toCollectionId,
        itemId,
      });

      await tx
        .update(collectionsTable)
        .set({ updatedAt: new Date() })
        .where(eq(collectionsTable.id, toRoot));
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
    const fromActor = await getActor(userId, fromCollectionId);
    const toActor = await getActor(userId, toCollectionId);

    assertCan(fromActor, Action.ITEM_MOVE);
    assertCan(toActor, Action.ITEM_ADD);

    const existing = await db.query.collectionItemsTable.findFirst({
      where: and(
        eq(collectionItemsTable.collectionId, toCollectionId),
        eq(collectionItemsTable.itemId, itemId),
      ),
    });

    if (existing) {
      throw new Error("Item already exists in target collection");
    }

    const fromRoot = (await resolveCollection(fromCollectionId)).rootId;
    const toRoot = (await resolveCollection(toCollectionId)).rootId;

    await db.transaction(async (tx) => {
      await tx
        .update(collectionItemsTable)
        .set({ collectionId: toCollectionId })
        .where(
          and(
            eq(collectionItemsTable.collectionId, fromCollectionId),
            eq(collectionItemsTable.itemId, itemId),
          ),
        );

      const rootIds = Array.from(new Set([fromRoot, toRoot]));
      await tx
        .update(collectionsTable)
        .set({ updatedAt: new Date() })
        .where(inArray(collectionsTable.id, rootIds));
    });

    return { success: true };
  }
}

export const collectionService = new CollectionService();
