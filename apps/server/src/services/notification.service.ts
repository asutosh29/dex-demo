import { db } from "~/db/client";
import { notificationsTable } from "~/db/schema";
import { and, eq, desc, sql, inArray, ne } from "drizzle-orm";
import { activityTable } from "~/db/schema/activity-schema";

export class NotificationService {
  /**
   * Create a single notification linked to an activity
   */
  async createNotification(userId: string, activityId: string) {
    const [notification] = await db
      .insert(notificationsTable)
      .values({ userId, activityId })
      .returning();
    return notification;
  }

  /**
   * Create notifications for multiple users linked to an activity
   */
  async createBulkNotifications(userIds: string[], activityId: string) {
    if (userIds.length === 0) return;
    await db
      .insert(notificationsTable)
      .values(userIds.map((userId) => ({ userId, activityId })));
  }

  /**
   * Get unified feed: unread first, then limited read notifications
   * Returns notifications with activity, actor, and collection details
   */
  async getUnifiedFeed(userId: string, readLimit: number = 10) {
    // Get all unread notifications
    const unreadNotifications = await db.query.notificationsTable.findMany({
      where: and(
        eq(notificationsTable.userId, userId),
        eq(notificationsTable.isRead, false),
      ),
      with: {
        activity: {
          with: {
            actor: { columns: { id: true, name: true, image: true } },
            collection: { columns: { id: true, title: true } },
          },
        },
      },
      orderBy: [desc(notificationsTable.createdAt)],
    });

    // Get limited read notifications
    const readNotifications = await db.query.notificationsTable.findMany({
      where: and(
        eq(notificationsTable.userId, userId),
        eq(notificationsTable.isRead, true),
      ),
      with: {
        activity: {
          with: {
            actor: { columns: { id: true, name: true, image: true } },
            collection: { columns: { id: true, title: true } },
          },
        },
      },
      orderBy: [desc(notificationsTable.createdAt)],
      limit: readLimit,
    });

    return {
      unread: unreadNotifications,
      read: readNotifications,
      unreadCount: unreadNotifications.length,
    };
  }

  /**
   * Get unread count only (for badge)
   */
  async getUnreadCount(userId: string): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(notificationsTable)
      .where(
        and(
          eq(notificationsTable.userId, userId),
          eq(notificationsTable.isRead, false),
        ),
      );

    return result[0]?.count ?? 0;
  }

  /**
   * Mark single notification as read
   */
  async markAsRead(userId: string, notificationId: string) {
    await db
      .update(notificationsTable)
      .set({ isRead: true, readAt: new Date() })
      .where(
        and(
          eq(notificationsTable.id, notificationId),
          eq(notificationsTable.userId, userId),
        ),
      );

    return { success: true };
  }

  /**
   * Mark all unread notifications as read (except invitations which require user action)
   * Uses a transaction to ensure atomicity
   */
  async markAllAsRead(userId: string) {
    return await db.transaction(async (tx) => {
      const notificationsToMark = await tx
        .select({ id: notificationsTable.id })
        .from(notificationsTable)
        .leftJoin(
          activityTable,
          eq(notificationsTable.activityId, activityTable.id),
        )
        .where(
          and(
            eq(notificationsTable.userId, userId),
            eq(notificationsTable.isRead, false),
            ne(activityTable.type, "invitation_sent"),
          ),
        );

      if (notificationsToMark.length === 0) {
        return { success: true };
      }

      const notificationIds = notificationsToMark.map((n) => n.id);

      await tx
        .update(notificationsTable)
        .set({ isRead: true, readAt: new Date() })
        .where(inArray(notificationsTable.id, notificationIds));

      return { success: true };
    });
  }
}

export const notificationService = new NotificationService();
