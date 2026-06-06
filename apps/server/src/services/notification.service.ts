import { db } from "~/db/client";
import { notificationsTable } from "~/db/schema";
import { and, eq, desc, sql, inArray, ne } from "drizzle-orm";
import { activityTable, type ActivityData } from "~/db/schema/activity-schema";
import { invitationsTable } from "~/db/schema/invitations-schema";

async function getFeedNotifications(
  userId: string,
  isRead: boolean,
  readLimit?: number,
) {
  return db.query.notificationsTable.findMany({
    where: and(
      eq(notificationsTable.userId, userId),
      eq(notificationsTable.isRead, isRead),
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
    ...(readLimit ? { limit: readLimit } : {}),
  });
}

type NotificationWithRelations = Awaited<
  ReturnType<typeof getFeedNotifications>
>[number];

type EnrichedNotification = NotificationWithRelations & {
  invitation: {
    status: "pending" | "accepted" | "rejected" | "expired" | "cancelled";
    expiresAt: Date;
    isExpired: boolean;
  } | null;
};

export class NotificationService {
  private async enrichInvitationNotifications(
    notifications: NotificationWithRelations[],
  ): Promise<EnrichedNotification[]> {
    const invitationIds = notifications
      .map((notification) => {
        if (notification.activity?.type !== "invitation_sent") return null;
        return (notification.activity.data as ActivityData<"invitation_sent">)
          .invitationId;
      })
      .filter((invitationId): invitationId is string => Boolean(invitationId));

    if (invitationIds.length === 0) {
      return notifications.map((notification) => ({
        ...notification,
        invitation: null,
      }));
    }

    const invitations = await db.query.invitationsTable.findMany({
      where: inArray(invitationsTable.id, invitationIds),
      columns: {
        id: true,
        status: true,
        expiresAt: true,
      },
    });

    const invitationsById = new Map(
      invitations.map((invitation) => [invitation.id, invitation]),
    );

    return notifications.map((notification) => {
      if (notification.activity?.type !== "invitation_sent") {
        return { ...notification, invitation: null };
      }

      const invitationData = notification.activity
        .data as ActivityData<"invitation_sent">;
      const invitation = invitationsById.get(invitationData.invitationId);

      if (!invitation) {
        return { ...notification, invitation: null };
      }

      const isExpired =
        invitation.status === "expired" ||
        (invitation.status === "pending" && invitation.expiresAt < new Date());

      return {
        ...notification,
        invitation: {
          status: invitation.status,
          expiresAt: invitation.expiresAt,
          isExpired,
        },
      };
    });
  }

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
    const unreadNotifications = await getFeedNotifications(userId, false);

    // Get limited read notifications
    const readNotifications = await getFeedNotifications(
      userId,
      true,
      readLimit,
    );

    const [enrichedUnreadNotifications, enrichedReadNotifications] =
      await Promise.all([
        this.enrichInvitationNotifications(unreadNotifications),
        this.enrichInvitationNotifications(readNotifications),
      ]);

    return {
      unread: enrichedUnreadNotifications,
      read: enrichedReadNotifications,
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
