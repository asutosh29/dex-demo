import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { db } from "~/db/client";
import { user } from "~/db/schema";
import { or, ilike } from "drizzle-orm";

export const userRouter = router({
  search: protectedProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ input }) => {
      const users = await db
        .select({
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        })
        .from(user)
        .where(
          or(
            ilike(user.name, `%${input.query}%`),
            ilike(user.email, `%${input.query}%`),
          ),
        )
        .limit(10);

      return users;
    }),
});
