import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { notificationService } from "~/services/notification.service";

export const notificationRouter = router({
  /**
   * Get unified feed: unread notifications + limited read notifications
   */
  getUnifiedFeed: protectedProcedure
    .input(
      z
        .object({
          readLimit: z.number().min(1).max(50).default(10),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      return notificationService.getUnifiedFeed(
        ctx.user.id,
        input?.readLimit ?? 10,
      );
    }),

  /**
   * Get unread count only (for badge)
   */
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    return notificationService.getUnreadCount(ctx.user.id);
  }),

  /**
   * Mark single notification as read
   */
  markAsRead: protectedProcedure
    .input(z.object({ notificationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return notificationService.markAsRead(ctx.user.id, input.notificationId);
    }),

  /**
   * Mark all notifications as read
   */
  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    return notificationService.markAllAsRead(ctx.user.id);
  }),
});
