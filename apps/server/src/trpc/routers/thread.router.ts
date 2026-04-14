import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../trpc";
import { mastra } from "~/mastra/index";

async function getMastraMemory() {
  const agent = mastra.getAgent("dexAgent");
  if (!agent) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Dex Agent not found instance",
    });
  }
  const memory = await agent.getMemory();
  if (!memory) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Memory configuration not found on Dex Agent",
    });
  }
  return memory;
}

export const threadRouter = router({
  create: protectedProcedure
    .input(
      z
        .object({
          // TODO: Shift to auto title generation using a smaller model on the server
          // instead of relying on the client to provide the title.
          title: z.string().optional(),
        })
        .optional(),
    )
    .mutation(async ({ ctx, input }) => {
      const memory = await getMastraMemory();

      // We explicitly let mastra auto-generate the threadId since we don't pass one
      const thread = await memory.createThread({
        resourceId: ctx.user.id,
        title: input?.title,
      });

      return {
        threadId: thread.id,
        title: thread.title,
        createdAt: thread.createdAt,
      };
    }),

  list: protectedProcedure
    .input(
      z.object({
        page: z.number().default(0),
        perPage: z.number().default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const memory = await getMastraMemory();

      const result = await memory.listThreads({
        filter: { resourceId: ctx.user.id },
        page: input.page,
        perPage: input.perPage,
        orderBy: { field: "createdAt", direction: "DESC" },
      });

      // result contains { threads, total, page, perPage, hasMore }
      return result;
    }),

  rename: protectedProcedure
    .input(
      z.object({
        threadId: z.string(),
        title: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const memory = await getMastraMemory();

      const thread = await memory.getThreadById({ threadId: input.threadId });

      if (!thread) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Thread not found" });
      }

      // Authorization Check
      if (thread.resourceId !== ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to modify this thread",
        });
      }

      // Mastra's Memory API does not expose native updateThread.
      // We must clone the thread under a new UUID with the updated title, and delete the old one.
      const { thread: clonedThread } = await memory.cloneThread({
        sourceThreadId: input.threadId,
        title: input.title,
        resourceId: ctx.user.id,
      });

      // Cleanup the old thread
      await memory.deleteThread(input.threadId);

      return clonedThread;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        threadId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const memory = await getMastraMemory();

      const thread = await memory.getThreadById({ threadId: input.threadId });

      if (!thread) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Thread not found" });
      }

      // Authorization Check
      if (thread.resourceId !== ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to delete this thread",
        });
      }

      await memory.deleteThread(input.threadId);

      return { success: true };
    }),
});
