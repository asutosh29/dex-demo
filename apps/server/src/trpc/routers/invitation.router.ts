import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { invitationService } from "~/services/invitation.service";

export const invitationRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        userId: z.string(),
        role: z.enum(["member", "admin"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return invitationService.createInvitation(
        ctx.user.id,
        input.collectionId,
        input.userId,
        input.role,
      );
    }),

  getPending: protectedProcedure.query(async ({ ctx }) => {
    return invitationService.getPendingInvitations(ctx.user.id);
  }),

  accept: protectedProcedure
    .input(z.object({ invitationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return invitationService.acceptInvitation(
        ctx.user.id,
        input.invitationId,
      );
    }),

  reject: protectedProcedure
    .input(z.object({ invitationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return invitationService.rejectInvitation(
        ctx.user.id,
        input.invitationId,
      );
    }),

  cancel: protectedProcedure
    .input(z.object({ invitationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return invitationService.cancelInvitation(
        ctx.user.id,
        input.invitationId,
      );
    }),

  getPendingCount: protectedProcedure.query(async ({ ctx }) => {
    return invitationService.getPendingInvitationsCount(ctx.user.id);
  }),
});
