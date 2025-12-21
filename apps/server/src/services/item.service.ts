import { db } from "~/db/client";
import { collectionItemsTable, itemsTable, userItemsTable } from "~/db/schema";
import { eq, and, sql, getTableColumns } from "drizzle-orm";
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

      // Give creator owner access
      await tx.insert(userItemsTable).values({
        userId,
        itemId: item.id,
        role: "owner",
      });

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
   * Get all items for a user
   */
  async getUserItems(userId: string) {
    const items = await db.query.userItemsTable.findMany({
      where: eq(userItemsTable.userId, userId),
      with: {
        item: {
          with: {
            creator: {
              columns: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return items.map((ui) => ({
      ...ui.item,
      role: ui.role,
    }));
  }

  /**
   * Get a single item
   */
  async getItem(itemId: string, userId: string) {
    const userItem = await db.query.userItemsTable.findFirst({
      where: and(
        eq(userItemsTable.itemId, itemId),
        eq(userItemsTable.userId, userId),
      ),
      with: {
        item: {
          with: {
            creator: {
              columns: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
            collections: {
              with: {
                collection: true,
              },
            },
          },
        },
      },
    });

    if (!userItem) {
      throw new Error("Item not found or access denied");
    }

    return {
      ...userItem.item,
      role: userItem.role,
      collections: userItem.item.collections.map((ci) => ci.collection),
    };
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
      .select(getTableColumns(itemsTable))
      .from(itemsTable)
      .innerJoin(userItemsTable, eq(itemsTable.id, userItemsTable.itemId))
      .where(
        and(
          eq(userItemsTable.userId, userId),
          sql`${itemsTable.searchVector} @@ to_tsquery('english', ${formattedQuery})`,
        ),
      )
      .orderBy(
        sql`ts_rank(${itemsTable.searchVector}, to_tsquery('english', ${formattedQuery})) DESC`,
      );

    return results;
  }

  /**
   * Update an item
   */
  async updateItem(
    itemId: string,
    userId: string,
    data: {
      title?: string;
      tldr?: string;
      tags?: string[];
      favicon?: string;
      image?: string;
    },
  ) {
    // Check user is owner
    const userItem = await db.query.userItemsTable.findFirst({
      where: and(
        eq(userItemsTable.itemId, itemId),
        eq(userItemsTable.userId, userId),
      ),
    });

    if (!userItem || userItem.role !== "owner") {
      throw new Error("Only owners can edit items");
    }

    const [updated] = await db
      .update(itemsTable)
      .set(data)
      .where(eq(itemsTable.id, itemId))
      .returning();

    return updated;
  }

  /**
   * Delete an item
   */
  async deleteItem(itemId: string, userId: string) {
    // Check user is owner
    const userItem = await db.query.userItemsTable.findFirst({
      where: and(
        eq(userItemsTable.itemId, itemId),
        eq(userItemsTable.userId, userId),
      ),
    });

    if (!userItem || userItem.role !== "owner") {
      throw new Error("Only owners can delete items");
    }

    await db.delete(itemsTable).where(eq(itemsTable.id, itemId));

    return { success: true };
  }

  /**
   * Share item with another user
   */
  async shareItem(
    itemId: string,
    ownerId: string,
    targetUserId: string,
    role: "owner" | "viewer" = "viewer",
  ) {
    // Check current user is owner
    const userItem = await db.query.userItemsTable.findFirst({
      where: and(
        eq(userItemsTable.itemId, itemId),
        eq(userItemsTable.userId, ownerId),
      ),
    });

    if (!userItem || userItem.role !== "owner") {
      throw new Error("Only owners can share items");
    }

    await db
      .insert(userItemsTable)
      .values({
        userId: targetUserId,
        itemId,
        role,
      })
      .onConflictDoNothing();

    return { success: true };
  }
}

export const itemService = new ItemService();
