import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { collectionService } from "~/services/collection.service";

export const collectionRouter = router({
  // Get all user's collections
  getUserCollections: protectedProcedure.query(async ({ ctx }) => {
    const collections = await collectionService.getUserCollections(ctx.user.id);
    return collections;
  }),

  // Get single collection with items
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await collectionService.getCollection(input.id, ctx.user.id);
    }),

  // Create collection
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await collectionService.createCollection(ctx.user.id, input.title);
    }),

  // Update collection
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await collectionService.updateCollection(
        input.id,
        ctx.user.id,
        input.title,
      );
    }),

  // Delete collection
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await collectionService.deleteCollection(input.id, ctx.user.id);
    }),

  // Add item to collection
  addItem: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        itemId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await collectionService.addItemToCollection(
        input.collectionId,
        input.itemId,
        ctx.user.id,
      );
    }),

  // Remove item from collection
  removeItem: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        itemId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await collectionService.removeItemFromCollection(
        input.collectionId,
        input.itemId,
        ctx.user.id,
      );
    }),

  // Copy item to another collection
  copyItem: protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
        fromCollectionId: z.string(),
        toCollectionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await collectionService.copyItemToCollection(
        input.itemId,
        input.fromCollectionId,
        input.toCollectionId,
        ctx.user.id,
      );
    }),

  // Move item between collections
  moveItem: protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
        fromCollectionId: z.string(),
        toCollectionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await collectionService.moveItemBetweenCollections(
        input.itemId,
        input.fromCollectionId,
        input.toCollectionId,
        ctx.user.id,
      );
    }),
});
