import { db } from "~/db/client";
import {
  collectionItemsTable,
  collectionsTable,
  itemsTable,
  userCollectionsTable,
} from "~/db/schema";
import { eq, and, sql, desc, getTableColumns, inArray } from "drizzle-orm";
import { extractOpenGraphData, getOembedData } from "./utils/ogp";
import { parseHtmlContent } from "./utils/html-parser";
import { WebpageTaggerAgent, WebpageTaggerAgentWithTitle } from "./agent/tag";
import { AgentResponse } from "~/lib/types";
import { Action, assertCan, getActor } from "./rbac";

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
    const [ogp, oembed] = await Promise.all([
      extractOpenGraphData(data.url),
      getOembedData(data.url),
    ]);

    const parsedData = await parseHtmlContent(data.url, oembed);

    let result;
    if (!ogp.title) {
      result = await WebpageTaggerAgentWithTitle.generateText(
        parsedData.content,
      );
    } else {
      result = await WebpageTaggerAgent.generateText(parsedData.content);
    }

    let agentData;
    try {
      agentData = JSON.parse(result.text);
    } catch (error) {
      console.log("Failed to parse agent data JSON:", error);
      return null;
    }

    const { title: agentTitle, tldr, tags } = agentData as AgentResponse;
    const title = ogp.title || agentTitle;

    const res = await db.transaction(async (tx) => {
      // Create item
      const [item] = await tx
        .insert(itemsTable)
        .values({
          title: title!,
          image: ogp.image,
          favicon: ogp.favicon,
          url: data.url,
          tldr,
          tags,
          creatorId: userId,
        })
        .returning();

      // If collectionId is provided, add item to collection
      if (data.collectionId) {
        await tx.insert(collectionItemsTable).values({
          collectionId: data.collectionId,
          itemId: item.id,
        });

        await tx
          .update(collectionsTable)
          .set({
            updatedAt: new Date(),
          })
          .where(eq(collectionsTable.id, data.collectionId));
      }

      return item;
    });

    return res;
  }

  /**
   * Search items by title, tldr, or tags
   */
  async searchItems(userId: string, query: string) {
    // Format query for prefix matching - add :* to each word
    const formattedQuery = query
      .trim()
      .split(/\s+/)
      .map((word) => `${word}:*`)
      .join(" & ");

    const results = await db
      .select()
      .from(itemsTable)
      .where(
        and(
          eq(itemsTable.creatorId, userId),
          sql`${itemsTable.searchVector} @@ to_tsquery('english', ${formattedQuery})`,
        ),
      )
      .orderBy(
        sql`ts_rank(${itemsTable.searchVector}, to_tsquery('english', ${formattedQuery})) DESC`,
      );

    return results;
  }

  async getRecents(userId: string, limit: number = 5) {
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
          eq(userCollectionsTable.collectionId, collectionsTable.id),
          eq(userCollectionsTable.userId, userId),
        ),
      )
      .where(eq(itemsTable.creatorId, userId))
      .orderBy(desc(itemsTable.createdAt))
      .limit(limit);

    return results;
  }

  async checkItemExists(url: string, userId: string) {
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
        userCollectionsTable,
        eq(
          collectionItemsTable.collectionId,
          userCollectionsTable.collectionId,
        ),
      )
      .where(
        and(
          eq(itemsTable.url, url),
          eq(userCollectionsTable.userId, userId),
          // If specific collection IDs are provided, filter to only those
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
