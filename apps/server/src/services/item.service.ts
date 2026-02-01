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
    const startTime = Date.now();
    console.log("=== [createItem] START ===");
    console.log("[createItem] Input:", {
      userId,
      url: data.url,
      collectionId: data.collectionId,
    });

    // Normalize URL: ensure it starts with https:// or http://
    console.log("[createItem] Step 1: URL normalization");
    console.log("[createItem] Original URL:", data.url);
    let normalizedUrl = data.url.trim();
    if (
      !normalizedUrl.startsWith("http://") &&
      !normalizedUrl.startsWith("https://")
    ) {
      normalizedUrl = `https://${normalizedUrl}`;
      console.log("[createItem] URL normalized with https:// prefix");
    }
    console.log("[createItem] Normalized URL:", normalizedUrl);

    // Extract OGP and oEmbed data
    console.log(
      "[createItem] Step 2: Fetching OGP and oEmbed data in parallel",
    );
    const ogpStart = Date.now();
    let ogp, oembed;
    try {
      [ogp, oembed] = await Promise.all([
        extractOpenGraphData(normalizedUrl).then((data) => {
          console.log(
            "[extractOpenGraphData] Completed in",
            Date.now() - ogpStart,
            "ms",
          );
          console.log("[extractOpenGraphData] Result:", data);
          return data;
        }),
        getOembedData(normalizedUrl).then((data) => {
          console.log(
            "[getOembedData] Completed in",
            Date.now() - ogpStart,
            "ms",
          );
          console.log("[getOembedData] Result:", data);
          return data;
        }),
      ]);
      console.log("[createItem] OGP and oEmbed data fetched successfully");
    } catch (error) {
      console.error("[createItem] Error fetching OGP/oEmbed data:", error);
      throw error;
    }

    // Parse HTML content
    console.log("[createItem] Step 3: Parsing HTML content");
    const parseStart = Date.now();
    let parsedData;
    try {
      parsedData = await parseHtmlContent(normalizedUrl, oembed);
      console.log(
        "[parseHtmlContent] Completed in",
        Date.now() - parseStart,
        "ms",
      );
      console.log(
        "[parseHtmlContent] Content length:",
        parsedData.content?.length || 0,
      );
      console.log("[parseHtmlContent] Result:", parsedData);
    } catch (error) {
      console.error("[createItem] Error parsing HTML content:", error);
      throw error;
    }

    // Generate AI tags/tldr
    console.log("[createItem] Step 4: Generating AI tags and TLDR");
    console.log("[createItem] OGP title exists:", !!ogp.title);
    const aiStart = Date.now();
    let result;
    try {
      if (!ogp.title) {
        console.log(
          "[createItem] Using WebpageTaggerAgentWithTitle (no OGP title found)",
        );
        result = await WebpageTaggerAgentWithTitle.generateText(
          parsedData.content,
        );
        console.log(
          "[WebpageTaggerAgentWithTitle] Completed in",
          Date.now() - aiStart,
          "ms",
        );
      } else {
        console.log("[createItem] Using WebpageTaggerAgent (OGP title found)");
        result = await WebpageTaggerAgent.generateText(parsedData.content);
        console.log(
          "[WebpageTaggerAgent] Completed in",
          Date.now() - aiStart,
          "ms",
        );
      }
      console.log("[createItem] AI result text:", result.text);
    } catch (error) {
      console.error("[createItem] Error generating AI tags/tldr:", error);
      throw error;
    }

    // Parse agent response
    console.log("[createItem] Step 5: Parsing AI agent response JSON");
    let agentData;
    try {
      agentData = JSON.parse(result.text);
      console.log("[createItem] Agent data parsed successfully:", agentData);
    } catch (error) {
      console.error("[createItem] Failed to parse agent data JSON:", error);
      console.error("[createItem] Raw agent text:", result.text);
      return null;
    }

    const { title: agentTitle, tldr, tags } = agentData as AgentResponse;
    const title = ogp.title || agentTitle;
    console.log("[createItem] Final item data:", {
      title,
      tldr,
      tags: tags?.length || 0,
      image: ogp.image,
      favicon: ogp.favicon,
    });

    // Database transaction
    console.log("[createItem] Step 6: Database transaction");
    const dbStart = Date.now();
    let res;
    try {
      res = await db.transaction(async (tx) => {
        console.log("[createItem:tx] Starting transaction");

        // Create item
        console.log("[createItem:tx] Inserting item into itemsTable");
        const itemValues = {
          title: title!,
          image: ogp.image,
          favicon: ogp.favicon,
          url: normalizedUrl,
          tldr,
          tags,
          creatorId: userId,
        };
        console.log("[createItem:tx] Item values:", itemValues);

        const [item] = await tx
          .insert(itemsTable)
          .values(itemValues)
          .returning();

        console.log("[createItem:tx] Item created with ID:", item.id);

        // If collectionId is provided, add item to collection
        if (data.collectionId) {
          console.log(
            "[createItem:tx] Adding item to collection:",
            data.collectionId,
          );

          await tx.insert(collectionItemsTable).values({
            collectionId: data.collectionId,
            itemId: item.id,
          });
          console.log("[createItem:tx] Item added to collectionItemsTable");

          console.log(
            "[createItem:tx] Updating collection updatedAt timestamp",
          );
          await tx
            .update(collectionsTable)
            .set({
              updatedAt: new Date(),
            })
            .where(eq(collectionsTable.id, data.collectionId));
          console.log("[createItem:tx] Collection updated successfully");
        } else {
          console.log(
            "[createItem:tx] No collectionId provided, skipping collection association",
          );
        }

        console.log("[createItem:tx] Transaction completed successfully");
        return item;
      });
      console.log(
        "[createItem] Database transaction completed in",
        Date.now() - dbStart,
        "ms",
      );
    } catch (error) {
      console.error("[createItem] Database transaction error:", error);
      throw error;
    }

    const totalTime = Date.now() - startTime;
    console.log("[createItem] Returning item:", res);
    console.log("=== [createItem] COMPLETE in", totalTime, "ms ===");
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
        userCollectionsTable,
        eq(
          collectionItemsTable.collectionId,
          userCollectionsTable.collectionId,
        ),
      )
      .where(
        and(
          eq(itemsTable.url, normalizedUrl),
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
