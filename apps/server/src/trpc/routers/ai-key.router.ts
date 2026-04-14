import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { aiKeyService } from "~/services/ai-key.service";

const providerEnum = z.enum([
  "openai",
  "anthropic",
  "groq",
  "openrouter",
  "google",
]);

export const aiKeyRouter = router({
  list: protectedProcedure
    .output(
      z.array(
        z.object({
          id: z.string(),
          provider: providerEnum,
          label: z.string().nullable().optional(),
          createdAt: z.date().nullable().optional(),
          updatedAt: z.date().nullable().optional(),
        }),
      ),
    )
    .query(async ({ ctx }) => {
      return await aiKeyService.listKeys(ctx.user.id);
    }),

  store: protectedProcedure
    .input(
      z.object({
        provider: providerEnum,
        key: z.string().min(1),
        label: z.string().optional(),
      }),
    )
    .output(
      z.object({
        id: z.string(),
        provider: providerEnum,
        label: z.string().nullable().optional(),
        createdAt: z.date().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await aiKeyService.storeKey(
        ctx.user.id,
        input.provider,
        input.key,
        input.label,
      );
      return result;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        provider: providerEnum,
      }),
    )
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await aiKeyService.deleteKey(ctx.user.id, input.provider);
    }),

  check: protectedProcedure
    .input(
      z.object({
        provider: providerEnum,
      }),
    )
    .output(z.object({ hasKey: z.boolean() }))
    .query(async ({ ctx, input }) => {
      const hasKey = await aiKeyService.hasKey(ctx.user.id, input.provider);
      return { hasKey };
    }),
});
