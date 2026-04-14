import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { aiKeyService } from "~/services/ai-key.service";

export const aiKeyRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await aiKeyService.listKeys(ctx.user.id);
  }),

  store: protectedProcedure
    .input(
      z.object({
        provider: z.enum([
          "openai",
          "anthropic",
          "groq",
          "openrouter",
          "google",
        ]),
        key: z.string().min(1),
        label: z.string().optional(),
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
        provider: z.enum([
          "openai",
          "anthropic",
          "groq",
          "openrouter",
          "google",
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await aiKeyService.deleteKey(ctx.user.id, input.provider);
    }),

  check: protectedProcedure
    .input(
      z.object({
        provider: z.enum([
          "openai",
          "anthropic",
          "groq",
          "openrouter",
          "google",
        ]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const hasKey = await aiKeyService.hasKey(ctx.user.id, input.provider);
      return { hasKey };
    }),
});
