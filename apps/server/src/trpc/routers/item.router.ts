import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { itemService } from "~/services/item.service";

export const itemRouter = router({
  // Get all user's items
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await itemService.getUserItems(ctx.user.id);
  }),

  // Get single item
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await itemService.getItem(input.id, ctx.user.id);
    }),

  // Create item
  create: protectedProcedure
    .input(
      z.object({
        url: z.url(),
        collectionId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await itemService.createItem(ctx.user.id, input);
    }),

  // Update item
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        tldr: z.string().optional(),
        tags: z.array(z.string()).optional(),
        favicon: z.string().optional(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await itemService.updateItem(id, ctx.user.id, data);
    }),

  // Delete item
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await itemService.deleteItem(input.id, ctx.user.id);
    }),

  // Search items
  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      return await itemService.searchItems(ctx.user.id, input.query);
    }),

  // Share item
  share: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
        role: z.enum(["owner", "viewer"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await itemService.shareItem(
        input.id,
        ctx.user.id,
        input.userId,
        input.role,
      );
    }),
});
