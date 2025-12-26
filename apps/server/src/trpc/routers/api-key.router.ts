import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { apiKeyService } from "~/services/api-key.service";

export const apiKeyRouter = router({
  // Create new API key
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        mode: z.enum(["full_access", "collection_specific"]),
        expiresIn: z.number().optional(), // seconds
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await apiKeyService.createApiKey(
        ctx.user.id,
        input.name,
        input.mode,
        input.expiresIn,
      );
    }),

  // List user's API keys
  list: protectedProcedure.query(async ({ ctx }) => {
    return await apiKeyService.listUserApiKeys(ctx.user.id, ctx.headers);
  }),

  // Grant collection access to an API key
  grantCollectionAccess: protectedProcedure
    .input(
      z.object({
        apiKeyId: z.string(),
        collectionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await apiKeyService.grantCollectionAccess(
        ctx.user.id,
        input.apiKeyId,
        input.collectionId,
      );
    }),

  // Revoke collection access
  revokeCollectionAccess: protectedProcedure
    .input(
      z.object({
        apiKeyId: z.string(),
        collectionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await apiKeyService.revokeCollectionAccess(
        ctx.user.id,
        input.apiKeyId,
        input.collectionId,
      );
    }),

  // Delete API key
  delete: protectedProcedure
    .input(z.object({ keyId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await apiKeyService.deleteApiKey(ctx.user.id, input.keyId);
    }),
});
