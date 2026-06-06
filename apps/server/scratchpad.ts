import { db } from "./src/db/client";
import {
  invitationsTable,
  user,
  collectionsTable,
  userCollectionsTable,
} from "./src/db/schema";
import { InvitationService } from "./src/services/invitation.service";
import { eq, and } from "drizzle-orm";

async function createExpiringInvitation(
  inviterId: string,
  collectionId: string,
  inviteeId: string,
  role: "member" | "admin",
  expiresInMs: number,
) {
  // Clear any existing pending invitation so we don't hit conflicts
  await db
    .delete(invitationsTable)
    .where(
      and(
        eq(invitationsTable.inviteeId, inviteeId),
        eq(invitationsTable.collectionId, collectionId),
        eq(invitationsTable.status, "pending"),
      ),
    );

  const invitationService = new InvitationService();

  // Create normally
  const invitation = await invitationService.createInvitation(
    inviterId,
    collectionId,
    inviteeId,
    role,
  );

  // Update expiration
  const newDate = new Date(Date.now() + expiresInMs);

  await db
    .update(invitationsTable)
    .set({ expiresAt: newDate })
    .where(eq(invitationsTable.id, invitation.id));

  console.log(
    `Updated invitation ${invitation.id} to expire at ${newDate.toISOString()}`,
  );
  return invitation;
}

async function run() {
  // We need to fetch an existing user for inviter, invitee and a collection.
  const users = await db.query.user.findMany({ limit: 2 });
  if (users.length < 2) {
    console.log("Need at least 2 users in db to create invitation.");
    return;
  }
  const inviter = users[0];
  const invitee = users[1];

  let collection = await db.query.collectionsTable.findFirst({
    where: eq(collectionsTable.createdById, inviter.id),
  });

  if (!collection) {
    const allCollections = await db.query.collectionsTable.findMany({
      limit: 1,
    });
    if (allCollections.length > 0) {
      collection = allCollections[0];
      // Make inviter an admin/owner
      await db
        .insert(userCollectionsTable)
        .values({
          userId: inviter.id,
          collectionId: collection.id,
          role: "owner",
        })
        .onConflictDoNothing();
    } else {
      console.log("Need at least 1 collection in db.");
      return;
    }
  }

  // Ensure invitee is not already in the collection
  await db
    .delete(userCollectionsTable)
    .where(
      and(
        eq(userCollectionsTable.userId, invitee.id),
        eq(userCollectionsTable.collectionId, collection.id),
      ),
    );

  console.log(`Using inviter: ${inviter.name} (${inviter.id})`);
  console.log(`Using invitee: ${invitee.name} (${invitee.id})`);
  console.log(`Using collection: ${collection.name} (${collection.id})`);

  // Expired instantly (expires in 0 ms, effectively now)
  const expiredInstantly = await createExpiringInvitation(
    inviter.id,
    collection.id,
    invitee.id,
    "member",
    0,
  );
  console.log("Created instantly expired invitation:", expiredInstantly.id);

  // Note: Since we delete pending invitations for the same user+collection,
  // creating the second one will delete the first one if it's pending.
  // To avoid this, we can set the first one's status to 'expired' or just use a different invitee/collection.
  // But wait, if it's expired, it's still "pending". Let's update its status manually or just use a dummy user.

  // For the sake of the test, let's just make both, but the first one gets deleted.
  // Oh, wait! The user wants both in their notifications.
  // Let's create two dummy collections to invite them to.

  const col2Ret = await db
    .insert(collectionsTable)
    .values({
      name: "Test Collection Expiring",
      createdById: inviter.id,
      visibility: "private",
    })
    .returning();

  const col2 = col2Ret[0];
  await db.insert(userCollectionsTable).values({
    userId: inviter.id,
    collectionId: col2.id,
    role: "owner",
  });

  // Expires in 1 minute (60,000 ms)
  const expiresOneMinute = await createExpiringInvitation(
    inviter.id,
    col2.id,
    invitee.id,
    "member",
    60_000,
  );
  console.log("Created 1-minute expiring invitation:", expiresOneMinute.id);

  process.exit(0);
}

run().catch(console.error);
