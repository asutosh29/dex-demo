import { db } from "~/db/client";
import {
  collectionItemsTable,
  collectionsTable,
  itemsTable,
  userCollectionsTable,
} from "~/db/schema";
import { eq, and, sql, desc, getTableColumns } from "drizzle-orm";
import { extractOpenGraphData, getOembedData } from "./utils/ogp";
import { parseHtmlContent } from "./utils/html-parser";
import { WebpageTaggerAgent, WebpageTaggerAgentWithTitle } from "./agent/tag";
import { AgentResponse } from "~/lib/types";
import z from "zod";
import { getActor, assertCan, Action } from "./rbac";
import { resolveCollection } from "./collection/resolve";

export class ItemService {
  /**
   * Create a new item
   */
  async createItem(
    userId: string,
    data: {
      url: string;
      collectionId?: string;
    },
  ) {
    // Normalize URL: ensure it starts with https:// or http://
    let normalizedUrl = data.url.trim();
    if (
      !normalizedUrl.startsWith("http://") &&
      !normalizedUrl.startsWith("https://")
    ) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    // Access check must precede side effects (OGP fetch, agent calls).
    if (data.collectionId) {
      const actor = await getActor(userId, data.collectionId);
      assertCan(actor, Action.ITEM_ADD);
    }

    console.log("Normalized URL:", normalizedUrl);

    const [ogp, oembed] = await Promise.all([
      extractOpenGraphData(normalizedUrl),
      getOembedData(normalizedUrl),
    ]);

    const parsedData = await parseHtmlContent(
      normalizedUrl,
      oembed,
      ogp.description,
    );

    let result;
    if (!oembed?.title && !ogp.title) {
      result = await WebpageTaggerAgentWithTitle.generate(parsedData.content, {
        structuredOutput: {
          schema: z.object({
            title: z.string(),
            tldr: z.string(),
            tags: z.array(z.string()),
          }),
        },
      });
    } else {
      result = await WebpageTaggerAgent.generate(parsedData.content, {
        structuredOutput: {
          schema: z.object({
            tldr: z.string(),
            tags: z.array(z.string()),
          }),
        },
      });
    }

    let agentData;
    try {
      agentData = result.object;
    } catch (error) {
      console.log("Failed to parse agent data JSON:", error);
    }

    const { title: agentTitle, tldr, tags } = agentData as AgentResponse;
    const title = oembed?.title || ogp.title || agentTitle;
    const image = ((oembed?.thumbnail_url || ogp.image) as string) || null;
    const favicon = ogp.favicon;

    const res = await db.transaction(async (tx) => {
      // Create item
      const [item] = await tx
        .insert(itemsTable)
        .values({
          title: title!,
          image,
          favicon,
          url: normalizedUrl,
          tldr,
          tags,
          creatorId: userId,
        })
        .returning();

      // If collectionId is provided, add item to collection and touch the
      // root's updatedAt so top-level sorting reflects activity in children.
      if (data.collectionId) {
        const rootId = (await resolveCollection(data.collectionId)).rootId;

        await tx.insert(collectionItemsTable).values({
          collectionId: data.collectionId,
          itemId: item.id,
        });

        await tx
          .update(collectionsTable)
          .set({
            updatedAt: new Date(),
          })
          .where(eq(collectionsTable.id, rootId));
      }

      return item;
    });

    return res;
  }

  /**
   * Search items by title, tldr, or tags using PostgreSQL full-text search
   * Supports web search syntax: "exact phrase", word1 OR word2, -excludeword
   */
  async searchItems(userId: string, query: string) {
    const results = await db
      .select()
      .from(itemsTable)
      .where(
        and(
          eq(itemsTable.creatorId, userId),
          sql`${itemsTable.searchVector} @@ websearch_to_tsquery('english', ${query})`,
        ),
      )
      .orderBy(
        sql`ts_rank(${itemsTable.searchVector}, websearch_to_tsquery('english', ${query})) DESC`,
      );

    return results;
  }

  async getRecents(userId: string, limit: number = 5) {
    // Inherited access: membership lives on the root. For items in a sub-
    // collection, we join user_collections on the parent id.
    const results = await db
      .select({
        ...getTableColumns(itemsTable),
        collectionTitle: collectionsTable.title,
      })
      .from(itemsTable)
      .innerJoin(
        collectionItemsTable,
        eq(itemsTable.id, collectionItemsTable.itemId),
      )
      .innerJoin(
        collectionsTable,
        eq(collectionItemsTable.collectionId, collectionsTable.id),
      )
      .innerJoin(
        userCollectionsTable,
        and(
          sql`${userCollectionsTable.collectionId} = COALESCE(${collectionsTable.parentId}, ${collectionsTable.id})`,
          eq(userCollectionsTable.userId, userId),
        ),
      )
      .where(eq(itemsTable.creatorId, userId))
      .orderBy(desc(itemsTable.createdAt))
      .limit(limit);

    return results;
  }

  async checkItemExists(url: string, userId: string) {
    // Normalize URL: ensure it starts with https:// or http://
    let normalizedUrl = url.trim();
    if (
      !normalizedUrl.startsWith("http://") &&
      !normalizedUrl.startsWith("https://")
    ) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const result = await db
      .select({
        itemId: itemsTable.id,
        collectionId: collectionItemsTable.collectionId,
      })
      .from(itemsTable)
      .innerJoin(
        collectionItemsTable,
        eq(itemsTable.id, collectionItemsTable.itemId),
      )
      .innerJoin(
        collectionsTable,
        eq(collectionItemsTable.collectionId, collectionsTable.id),
      )
      .innerJoin(
        userCollectionsTable,
        sql`${userCollectionsTable.collectionId} = COALESCE(${collectionsTable.parentId}, ${collectionsTable.id})`,
      )
      .where(
        and(
          eq(itemsTable.url, normalizedUrl),
          eq(userCollectionsTable.userId, userId),
        ),
      );

    if (result.length === 0) {
      return {
        itemExists: false,
        itemId: null,
        collectionIds: [],
      };
    }

    const itemId = result[0].itemId;
    const itemCollectionIds = result
      .map((row) => row.collectionId)
      .filter((id): id is string => id !== null);

    return {
      itemExists: true,
      itemId,
      collectionIds: itemCollectionIds,
    };
  }

  /**
   * Update item fields (title, tldr, tags)
   * Only the creator can update their items
   */
  async updateItem(
    itemId: string,
    userId: string,
    data: {
      title?: string;
      tldr?: string;
      tags?: string[];
    },
  ) {
    // Verify the user is the creator
    const item = await db.query.itemsTable.findFirst({
      where: eq(itemsTable.id, itemId),
    });

    if (!item) {
      throw new Error("Item not found");
    }

    if (item.creatorId !== userId) {
      throw new Error("Only the creator can edit this item");
    }

    // Build update object with only provided fields
    const updateData: Partial<typeof itemsTable.$inferInsert> = {};

    if (data.title !== undefined) {
      updateData.title = data.title;
    }
    if (data.tldr !== undefined) {
      updateData.tldr = data.tldr;
    }
    if (data.tags !== undefined) {
      updateData.tags = data.tags;
    }

    // Return early if nothing to update
    if (Object.keys(updateData).length === 0) {
      return item;
    }

    // Perform update
    const [updated] = await db
      .update(itemsTable)
      .set(updateData)
      .where(eq(itemsTable.id, itemId))
      .returning();

    return updated;
  }

  /**
   * Delete an item
   */
  // async deleteItem(itemId: string, userId: string) {
  //   // Check user is owner
  //   const userItem = await db.query.itemsTable.findFirst({
  //     where: and(
  //       eq(userItemsTable.itemId, itemId),
  //       eq(userItemsTable.userId, userId),
  //     ),
  //   });

  //   if (!userItem || userItem.role !== "owner") {
  //     throw new Error("Only owners can delete items");
  //   }

  //   await db.delete(itemsTable).where(eq(itemsTable.id, itemId));

  //   return { success: true };
  // }
}

export const itemService = new ItemService();
