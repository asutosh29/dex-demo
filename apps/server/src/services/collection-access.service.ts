import { db } from "~/db/client";
import { userCollectionsTable, user } from "~/db/schema";
import { and, eq, count, ne } from "drizzle-orm";
import { getActor, assertCan, Action, Role } from "./rbac";

export class CollectionAccessService {
  /* ─────────────────────────────────────────────
   * Helper: Get owner count
   * ───────────────────────────────────────────── */

  private async getOwnerCount(collectionId: string): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(userCollectionsTable)
      .where(
        and(
          eq(userCollectionsTable.collectionId, collectionId),
          eq(userCollectionsTable.role, "owner"),
        ),
      );

    return result[0]?.count ?? 0;
  }

  /* ─────────────────────────────────────────────
   * Query: Get members
   * ───────────────────────────────────────────── */

  async getMembers(userId: string, collectionId: string) {
    const actor = await getActor(userId, collectionId);
    assertCan(actor, Action.COLLECTION_VIEW_MEMBERS);

    const members = await db.query.userCollectionsTable.findMany({
      where: eq(userCollectionsTable.collectionId, collectionId),
      with: {
        user: {
          columns: {
            id: true,
            email: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return members.map((m) => ({
      userId: m.userId,
      role: m.role,
      user: m.user,
      joinedAt: m.createdAt,
    }));
  }

  /* ─────────────────────────────────────────────
   * Member management: Add member
   * Admin+ can add members or promote to admin
   * ───────────────────────────────────────────── */

  async addMember(
    actorId: string,
    collectionId: string,
    targetUserId: string,
    role: "member" | "admin",
  ) {
    const actor = await getActor(actorId, collectionId);
    assertCan(actor, Action.COLLECTION_MANAGE_MEMBERS);

    // Check user status and existing membership
    const [result] = await db
      .select({
        status: user.status,
        membershipExists: userCollectionsTable.userId,
      })
      .from(user)
      .leftJoin(
        userCollectionsTable,
        and(
          eq(userCollectionsTable.userId, user.id),
          eq(userCollectionsTable.collectionId, collectionId),
        ),
      )
      .where(eq(user.id, targetUserId))
      .limit(1);

    if (!result) {
      throw new Error("User not found");
    }

    if (result.status !== "active") {
      throw new Error(
        "User must have an active status to be added to a collection",
      );
    }

    if (result.membershipExists) {
      throw new Error("User is already a member of this collection");
    }

    // Insert new member
    await db.insert(userCollectionsTable).values({
      userId: targetUserId,
      collectionId,
      role,
    });

    return { success: true };
  }

  /* ─────────────────────────────────────────────
   * Member management: Remove member
   * Admin+ can remove members (not admins/owners)
   * ───────────────────────────────────────────── */

  async removeMember(
    actorId: string,
    collectionId: string,
    targetUserId: string,
  ) {
    const actor = await getActor(actorId, collectionId);
    assertCan(actor, Action.COLLECTION_MANAGE_MEMBERS);

    // Get target user's role
    const targetMembership = await db.query.userCollectionsTable.findFirst({
      where: and(
        eq(userCollectionsTable.userId, targetUserId),
        eq(userCollectionsTable.collectionId, collectionId),
      ),
    });

    if (!targetMembership) {
      throw new Error("User is not a member of this collection");
    }

    // Only members can be removed, not admins or owners
    if (targetMembership.role !== "member") {
      throw new Error(
        "Cannot remove admin or owner. Please demote them first.",
      );
    }

    // Remove member
    await db
      .delete(userCollectionsTable)
      .where(
        and(
          eq(userCollectionsTable.userId, targetUserId),
          eq(userCollectionsTable.collectionId, collectionId),
        ),
      );

    return { success: true };
  }

  /* ─────────────────────────────────────────────
   * Role changes: Promote member to admin
   * Admin+ can promote members to admin
   * ───────────────────────────────────────────── */

  async promoteMemberToAdmin(
    actorId: string,
    collectionId: string,
    targetUserId: string,
  ) {
    const actor = await getActor(actorId, collectionId);
    assertCan(actor, Action.COLLECTION_MANAGE_MEMBERS);

    // Get target user's current role
    const targetMembership = await db.query.userCollectionsTable.findFirst({
      where: and(
        eq(userCollectionsTable.userId, targetUserId),
        eq(userCollectionsTable.collectionId, collectionId),
      ),
    });

    if (!targetMembership) {
      throw new Error("User is not a member of this collection");
    }

    if (targetMembership.role !== "member") {
      throw new Error("User is not a member (already admin or owner)");
    }

    // Promote to admin
    await db
      .update(userCollectionsTable)
      .set({ role: "admin" })
      .where(
        and(
          eq(userCollectionsTable.userId, targetUserId),
          eq(userCollectionsTable.collectionId, collectionId),
        ),
      );

    return { success: true };
  }

  /* ─────────────────────────────────────────────
   * Role changes: Demote admin to member
   * Admin can demote self (stepping down)
   * Owner can demote any admin
   * ───────────────────────────────────────────── */

  async demoteAdminToMember(
    actorId: string,
    collectionId: string,
    targetUserId: string,
  ) {
    const actor = await getActor(actorId, collectionId);

    // Get target user's current role
    const targetMembership = await db.query.userCollectionsTable.findFirst({
      where: and(
        eq(userCollectionsTable.userId, targetUserId),
        eq(userCollectionsTable.collectionId, collectionId),
      ),
    });

    if (!targetMembership) {
      throw new Error("User is not a member of this collection");
    }

    if (targetMembership.role !== "admin") {
      throw new Error("User is not an admin");
    }

    // Allow if actor is demoting themselves (stepping down)
    if (actorId === targetUserId) {
      assertCan(actor, Action.COLLECTION_MANAGE_MEMBERS); // Admin can step down
    } else {
      // Only owner can demote other admins
      assertCan(actor, Action.COLLECTION_CHANGE_ROLES);
    }

    // Demote to member
    await db
      .update(userCollectionsTable)
      .set({ role: "member" })
      .where(
        and(
          eq(userCollectionsTable.userId, targetUserId),
          eq(userCollectionsTable.collectionId, collectionId),
        ),
      );

    return { success: true };
  }

  /* ─────────────────────────────────────────────
   * Role changes: Transfer ownership
   * Owner-only operation
   * Actor becomes admin after transfer
   * ───────────────────────────────────────────── */

  async transferOwnership(
    actorId: string,
    collectionId: string,
    newOwnerId: string,
  ) {
    const actor = await getActor(actorId, collectionId);
    assertCan(actor, Action.COLLECTION_CHANGE_ROLES);

    if (actor.type !== "user" || actor.role !== "owner") {
      throw new Error("Only owners can transfer ownership");
    }

    // Check if new owner is already a member
    const targetMembership = await db.query.userCollectionsTable.findFirst({
      where: and(
        eq(userCollectionsTable.userId, newOwnerId),
        eq(userCollectionsTable.collectionId, collectionId),
      ),
    });

    if (!targetMembership) {
      throw new Error(
        "Target user must be a member of the collection before becoming owner",
      );
    }

    // Perform transfer: demote actor to admin, promote target to owner
    await db.transaction(async (tx) => {
      // Demote current owner to admin
      await tx
        .update(userCollectionsTable)
        .set({ role: "admin" })
        .where(
          and(
            eq(userCollectionsTable.userId, actorId),
            eq(userCollectionsTable.collectionId, collectionId),
          ),
        );

      // Promote new owner
      await tx
        .update(userCollectionsTable)
        .set({ role: "owner" })
        .where(
          and(
            eq(userCollectionsTable.userId, newOwnerId),
            eq(userCollectionsTable.collectionId, collectionId),
          ),
        );
    });

    return { success: true };
  }

  /* ─────────────────────────────────────────────
   * Self-service: Leave collection
   * Last owner cannot leave without transferring
   * ───────────────────────────────────────────── */

  async leaveCollection(userId: string, collectionId: string) {
    const actor = await getActor(userId, collectionId);
    assertCan(actor, Action.COLLECTION_LEAVE);

    // If user is owner, check if they're the last owner
    if (actor.type === "user" && actor.role === "owner") {
      const ownerCount = await this.getOwnerCount(collectionId);

      if (ownerCount <= 1) {
        throw new Error(
          "Cannot leave collection as the last owner. Please transfer ownership first.",
        );
      }
    }

    // Remove user from collection
    await db
      .delete(userCollectionsTable)
      .where(
        and(
          eq(userCollectionsTable.userId, userId),
          eq(userCollectionsTable.collectionId, collectionId),
        ),
      );

    return { success: true };
  }

  /* ─────────────────────────────────────────────
   * Self-service: Step down from admin
   * Admin can demote themselves to member
   * ───────────────────────────────────────────── */

  async stepDownFromAdmin(userId: string, collectionId: string) {
    return this.demoteAdminToMember(userId, collectionId, userId);
  }
}

export const collectionAccessService = new CollectionAccessService();
