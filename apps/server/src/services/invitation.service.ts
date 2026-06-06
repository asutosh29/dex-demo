import { db } from "~/db/client";
import {
  invitationsTable,
  notificationsTable,
  userCollectionsTable,
  collectionsTable,
  user,
  activityTable,
} from "~/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { getActor, assertCan, Action } from "./rbac";
import { TRPCError } from "@trpc/server";
import { env } from "~/lib/env";
import { activityService } from "./activity.service";
import { resolveCollection, assertRoot } from "./collection/resolve";

const INVITATION_EXPIRY_DAYS = 7;

export class InvitationService {
  async createInvitation(
    inviterId: string,
    collectionId: string,
    inviteeId: string,
    role: "member" | "admin",
  ) {
    assertRoot(await resolveCollection(collectionId));
    const actor = await getActor(inviterId, collectionId);
    assertCan(actor, Action.COLLECTION_MANAGE_MEMBERS);

    const invitee = await db.query.user.findFirst({
      where: eq(user.id, inviteeId),
    });

    if (!invitee) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    if (env.WAITLIST_ENABLED && invitee.status !== "active") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User must have an active status to be invited",
      });
    }

    const existingMembership = await db.query.userCollectionsTable.findFirst({
      where: and(
        eq(userCollectionsTable.userId, inviteeId),
        eq(userCollectionsTable.collectionId, collectionId),
      ),
    });

    if (existingMembership) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User is already a member of this collection",
      });
    }

    const existingInvitation = await db.query.invitationsTable.findFirst({
      where: and(
        eq(invitationsTable.inviteeId, inviteeId),
        eq(invitationsTable.collectionId, collectionId),
        eq(invitationsTable.status, "pending"),
      ),
    });

    if (existingInvitation) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "A pending invitation already exists for this user",
      });
    }

    const _collection = await db.query.collectionsTable.findFirst({
      where: eq(collectionsTable.id, collectionId),
    });

    const _inviter = await db.query.user.findFirst({
      where: eq(user.id, inviterId),
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + INVITATION_EXPIRY_DAYS);

    const result = await db.transaction(async (tx) => {
      // 1. Create invitation
      const [invitation] = await tx
        .insert(invitationsTable)
        .values({
          inviteeId,
          inviterId,
          collectionId,
          role,
          expiresAt,
        })
        .returning();

      // 2. Create activity for invitation_sent
      const [activity] = await tx
        .insert(activityTable)
        .values({
          collectionId,
          actorId: inviterId,
          type: "invitation_sent",
          data: {
            type: "invitation_sent",
            invitationId: invitation.id,
            inviteeId,
            inviteeName: invitee!.name,
            role,
          },
        })
        .returning();

      // 3. Create notification for invitee linked to activity
      await tx.insert(notificationsTable).values({
        userId: inviteeId,
        activityId: activity.id,
      });

      return invitation;
    });

    return result;
  }

  async acceptInvitation(userId: string, invitationId: string) {
    const invitation = await db.query.invitationsTable.findFirst({
      where: and(
        eq(invitationsTable.id, invitationId),
        eq(invitationsTable.inviteeId, userId),
      ),
      with: { collection: true },
    });

    if (!invitation) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Invitation not found",
      });
    }

    if (invitation.status !== "pending" && invitation.status !== "expired") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Invitation is ${invitation.status}`,
      });
    }

    if (invitation.expiresAt < new Date()) {
      await db
        .update(invitationsTable)
        .set({ status: "expired" })
        .where(eq(invitationsTable.id, invitationId));

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invitation has expired",
      });
    }

    // Defensive: reject invitations whose target is no longer a root collection.
    assertRoot(await resolveCollection(invitation.collectionId));

    const invitee = await db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    await db.transaction(async (tx) => {
      // 1. Update invitation status
      await tx
        .update(invitationsTable)
        .set({
          status: "accepted",
          respondedAt: new Date(),
        })
        .where(eq(invitationsTable.id, invitationId));

      // 2. Add user to collection
      await tx.insert(userCollectionsTable).values({
        userId,
        collectionId: invitation.collectionId,
        role: invitation.role,
      });

      // 3. Mark original invitation notification as read
      await tx
        .update(notificationsTable)
        .set({ isRead: true, readAt: new Date() })
        .where(
          and(
            eq(notificationsTable.userId, userId),
            sql`activity_id IN (
              SELECT id FROM activity
              WHERE type = 'invitation_sent'
              AND data->>'invitationId' = ${invitationId}
            )`,
          ),
        );

      // 4. Create activity for invitation_accepted
      const [acceptActivity] = await tx
        .insert(activityTable)
        .values({
          collectionId: invitation.collectionId,
          actorId: userId,
          type: "invitation_accepted",
          data: {
            type: "invitation_accepted",
            invitationId,
            inviteeId: userId,
            inviteeName: invitee!.name,
            role: invitation.role,
          },
        })
        .returning();

      // 5. Notify admins and owners that user joined
      const adminOwnerIds = await activityService.getCollectionMembersByRoles(
        invitation.collectionId,
        ["owner", "admin"],
        [userId], // Exclude the user who just joined
      );

      if (adminOwnerIds.length > 0) {
        await tx.insert(notificationsTable).values(
          adminOwnerIds.map((uid) => ({
            userId: uid,
            activityId: acceptActivity.id,
          })),
        );
      }
    });

    return { success: true, collectionId: invitation.collectionId };
  }

  async rejectInvitation(userId: string, invitationId: string) {
    const invitation = await db.query.invitationsTable.findFirst({
      where: and(
        eq(invitationsTable.id, invitationId),
        eq(invitationsTable.inviteeId, userId),
        eq(invitationsTable.status, "pending"),
      ),
    });

    if (!invitation) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Invitation not found or already responded",
      });
    }

    const invitee = await db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    await db.transaction(async (tx) => {
      // 1. Update invitation status
      await tx
        .update(invitationsTable)
        .set({
          status: "rejected",
          respondedAt: new Date(),
        })
        .where(eq(invitationsTable.id, invitationId));

      // 2. Mark original invitation notification as read
      await tx
        .update(notificationsTable)
        .set({ isRead: true, readAt: new Date() })
        .where(
          and(
            eq(notificationsTable.userId, userId),
            sql`activity_id IN (
              SELECT id FROM activity
              WHERE type = 'invitation_sent'
              AND data->>'invitationId' = ${invitationId}
            )`,
          ),
        );

      // 3. Create activity for invitation_rejected (for audit trail, no notifications sent)
      await tx.insert(activityTable).values({
        collectionId: invitation.collectionId,
        actorId: userId,
        type: "invitation_rejected",
        data: {
          type: "invitation_rejected",
          invitationId,
          inviteeId: userId,
          inviteeName: invitee!.name,
        },
      });
    });

    return { success: true };
  }

  async cancelInvitation(inviterId: string, invitationId: string) {
    const invitation = await db.query.invitationsTable.findFirst({
      where: and(
        eq(invitationsTable.id, invitationId),
        eq(invitationsTable.inviterId, inviterId),
        eq(invitationsTable.status, "pending"),
      ),
    });

    if (!invitation) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Invitation not found or cannot be cancelled",
      });
    }

    await db.transaction(async (tx) => {
      // 1. Update invitation status
      await tx
        .update(invitationsTable)
        .set({ status: "cancelled" })
        .where(eq(invitationsTable.id, invitationId));

      // 2. Delete the notification (instead of archiving)
      await tx.delete(notificationsTable).where(
        and(
          eq(notificationsTable.userId, invitation.inviteeId),
          sql`activity_id IN (
              SELECT id FROM activity
              WHERE type = 'invitation_sent'
              AND data->>'invitationId' = ${invitationId}
            )`,
        ),
      );
    });

    return { success: true };
  }

  async bulkCreateInvitations(
    inviterId: string,
    collectionId: string,
    invitees: { userId: string; role: "member" | "admin" }[],
  ) {
    const results = await Promise.allSettled(
      invitees.map((inv) =>
        this.createInvitation(inviterId, collectionId, inv.userId, inv.role),
      ),
    );

    const succeeded = results
      .filter(
        (
          r,
        ): r is PromiseFulfilledResult<
          Awaited<ReturnType<typeof this.createInvitation>>
        > => r.status === "fulfilled",
      )
      .map((r) => r.value);

    const failed = results
      .map((r, i) =>
        r.status === "rejected"
          ? { userId: invitees[i].userId, error: (r.reason as Error).message }
          : null,
      )
      .filter((r): r is { userId: string; error: string } => r !== null);

    return { succeeded, failed };
  }

  async getPendingInvitations(userId: string) {
    return db.query.invitationsTable.findMany({
      where: and(
        eq(invitationsTable.inviteeId, userId),
        eq(invitationsTable.status, "pending"),
      ),
      with: {
        collection: true,
        inviter: {
          columns: { id: true, name: true, image: true },
        },
      },
      orderBy: (table, { desc }) => [desc(table.createdAt)],
    });
  }

  async getPendingInvitationsCount(userId: string): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(invitationsTable)
      .where(
        and(
          eq(invitationsTable.inviteeId, userId),
          eq(invitationsTable.status, "pending"),
          sql`expires_at > now()`,
        ),
      );

    return result[0]?.count ?? 0;
  }
}

export const invitationService = new InvitationService();
