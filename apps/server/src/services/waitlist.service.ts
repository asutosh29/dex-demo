import { db } from "~/db/client";
import { user as userTable } from "~/db/schema";
import { eq } from "drizzle-orm";
import { sendWaitlistApprovedEmail } from "~/services/utils/waitlist/mailer";

interface WaitlistApprovalEvent {
  name: string;
  email: string;
  approve: boolean;
}

export class WaitlistService {
  /**
   * Process multiple waitlist approval events in a batch
   */
  async processApprovals(events: WaitlistApprovalEvent[]) {
    // Validate all events first
    for (const event of events) {
      const { name, email } = event;
      if (!name || !email) {
        throw new Error("Name and email are required for all events");
      }
    }

    // Fetch all users in parallel
    const userQueries = events.map((event) =>
      db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, event.email),
      }),
    );
    const users = await Promise.all(userQueries);

    // Check if all users exist
    const missingUsers = events.filter((event, index) => !users[index]);
    if (missingUsers.length > 0) {
      throw new Error(
        `Some users not found: ${missingUsers.map((e) => e.email).join(", ")}`,
      );
    }

    // Perform all updates in a transaction
    await db.transaction(async (tx) => {
      const updatePromises = events.map((event, index) => {
        const user = users[index];
        if (!user) return Promise.resolve();

        return tx
          .update(userTable)
          .set({ status: event.approve ? "active" : "waitlist" })
          .where(eq(userTable.id, user.id));
      });

      await Promise.all(updatePromises);
    });

    // Send all approval emails in parallel
    const emailPromises = events
      .filter((event) => event.approve)
      .map((event) => sendWaitlistApprovedEmail(event.name, event.email));

    await Promise.all(emailPromises);

    return {
      processed: events.length,
      approved: events.filter((e) => e.approve).length,
      rejected: events.filter((e) => !e.approve).length,
    };
  }

  /**
   * Approve a single user from the waitlist
   */
  async approveUser(email: string, name: string) {
    return this.processApprovals([{ email, name, approve: true }]);
  }

  /**
   * Reject a single user from the waitlist
   */
  async rejectUser(email: string, name: string) {
    return this.processApprovals([{ email, name, approve: false }]);
  }
}

export const waitlistService = new WaitlistService();
