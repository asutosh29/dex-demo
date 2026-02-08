import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { db } from "~/db/client";
import { user } from "~/db/schema";
import { or, ilike, and, eq } from "drizzle-orm";
import { env } from "~/lib/env";

export const userRouter = router({
  search: protectedProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ input }) => {
      // TODO: abstract this into a service
      const users = await db
        .select({
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        })
        .from(user)
        .where(
          and(
            or(
              ilike(user.name, `%${input.query}%`),
              ilike(user.email, `%${input.query}%`),
            ),
            env.WAITLIST_ENABLED ? eq(user.status, "active") : undefined,
          ),
        )
        .orderBy(user.name)
        .limit(10);

      return users;
    }),
});
