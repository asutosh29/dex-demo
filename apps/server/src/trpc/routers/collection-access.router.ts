import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { collectionAccessService } from "~/services/collection-access.service";

export const collectionAccessRouter = router({
  // Get all members of a collection
  getMembers: protectedProcedure
    .input(z.object({ collectionId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await collectionAccessService.getMembers(
        ctx.user.id,
        input.collectionId,
      );
    }),

  // Add a new member to collection
  addMember: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        userId: z.string(),
        role: z.enum(["member", "admin"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await collectionAccessService.addMember(
        ctx.user.id,
        input.collectionId,
        input.userId,
        input.role,
      );
    }),

  // Remove a member from collection
  removeMember: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await collectionAccessService.removeMember(
        ctx.user.id,
        input.collectionId,
        input.userId,
      );
    }),

  // Promote member to admin
  promoteMemberToAdmin: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await collectionAccessService.promoteMemberToAdmin(
        ctx.user.id,
        input.collectionId,
        input.userId,
      );
    }),

  // Demote admin to member
  demoteAdminToMember: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await collectionAccessService.demoteAdminToMember(
        ctx.user.id,
        input.collectionId,
        input.userId,
      );
    }),

  // Transfer ownership
  transferOwnership: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        newOwnerId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await collectionAccessService.transferOwnership(
        ctx.user.id,
        input.collectionId,
        input.newOwnerId,
      );
    }),

  // Leave collection
  leaveCollection: protectedProcedure
    .input(z.object({ collectionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await collectionAccessService.leaveCollection(
        ctx.user.id,
        input.collectionId,
      );
    }),

  // Step down from admin to member
  stepDownFromAdmin: protectedProcedure
    .input(z.object({ collectionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await collectionAccessService.stepDownFromAdmin(
        ctx.user.id,
        input.collectionId,
      );
    }),
});
