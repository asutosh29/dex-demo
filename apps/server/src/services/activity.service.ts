import { db } from "~/db/client";
import { activityTable, userCollectionsTable } from "~/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import type { ActivityData } from "~/db/schema/activity-schema";

export class ActivityService {
  /**
   * Create an activity record
   */
  async createActivity(
    collectionId: string,
    actorId: string,
    data: ActivityData,
  ) {
    const [activity] = await db
      .insert(activityTable)
      .values({
        collectionId,
        actorId,
        type: data.type,
        data,
      })
      .returning();
    return activity;
  }

  // TODO: transfer them to collection access service

  /**
   * Get collection members by roles (for determining notification recipients)
   */
  async getCollectionMembersByRoles(
    collectionId: string,
    roles: Array<"owner" | "admin" | "member">,
    excludeUserIds: string[] = [],
  ): Promise<string[]> {
    const members = await db.query.userCollectionsTable.findMany({
      where: and(
        eq(userCollectionsTable.collectionId, collectionId),
        inArray(userCollectionsTable.role, roles),
      ),
      columns: { userId: true },
    });

    return members
      .map((m) => m.userId)
      .filter((id) => !excludeUserIds.includes(id));
  }

  /**
   * Get all collection members (for ownership transfer notifications)
   */
  async getAllCollectionMembers(
    collectionId: string,
    excludeUserIds: string[] = [],
  ): Promise<string[]> {
    const members = await db.query.userCollectionsTable.findMany({
      where: eq(userCollectionsTable.collectionId, collectionId),
      columns: { userId: true },
    });

    return members
      .map((m) => m.userId)
      .filter((id) => !excludeUserIds.includes(id));
  }
}

export const activityService = new ActivityService();
