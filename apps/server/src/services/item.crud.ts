import { and, eq, sql } from "drizzle-orm";
import { db } from "~/db/client";
import { collectionItemsTable, itemsTable } from "~/db/schema";
import { extractOpenGraphData, getOembedData } from "./utils/ogp";
import { parseHtmlContent } from "./utils/html-parser";
import { WebpageTaggerAgent, WebpageTaggerAgentWithTitle } from "./agent/tag";
import { AgentResponse } from "~/lib/types";

export const addItemToCollection = async (
  collectionId: string,
  url: string,
) => {
  const [ogp, oembed] = await Promise.all([
    extractOpenGraphData(url),
    getOembedData(url),
  ]);

  const parsedData = await parseHtmlContent(url, oembed);

  let result;
  if (!ogp.title) {
    result = await WebpageTaggerAgentWithTitle.generateText(parsedData.content);
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

  // Use transaction to ensure both inserts succeed or fail together
  const item = await db().transaction(async (tx) => {
    const [newItem] = await tx
      .insert(itemsTable)
      .values({
        title: title!,
        image: ogp.image,
        favicon: ogp.favicon,
        url,
        tldr,
        tags,
      })
      .returning();

    // Create relationship in collectionItemsTable
    await tx
      .insert(collectionItemsTable)
      .values({
        collectionId,
        itemId: newItem.id,
      })
      .onConflictDoNothing();

    return newItem;
  });

  return item;
};

// utility functions for now
export const addItemsToCollectionByItemIds = async (
  collectionId: string,
  itemIds: string[],
) => {
  if (itemIds.length === 0) return [];

  const collectionItems = await db()
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

  const deleted = await db()
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

// Check if an item exists in a collection
export const itemExistsInCollection = async (
  collectionId: string,
  itemId: string,
) => {
  const result = await db().query.collectionItemsTable.findFirst({
    where: and(
      eq(collectionItemsTable.collectionId, collectionId),
      eq(collectionItemsTable.itemId, itemId),
    ),
  });
  return !!result;
};
