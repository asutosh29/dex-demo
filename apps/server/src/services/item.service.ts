import { db } from "~/db/client";
import { collectionItemsTable, itemsTable } from "~/db/schema";
import { eq, and, sql, desc } from "drizzle-orm";
import { extractOpenGraphData, getOembedData } from "./utils/ogp";
import { parseHtmlContent } from "./utils/html-parser";
import { WebpageTaggerAgent, WebpageTaggerAgentWithTitle } from "./agent/tag";
import { AgentResponse } from "~/lib/types";

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
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.creatorId, userId))
      .orderBy(desc(itemsTable.createdAt))
      .limit(limit);

    return results;
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
