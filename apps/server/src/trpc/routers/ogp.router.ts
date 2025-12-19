import { getOembedData } from "~/services/utils/ogp";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const ogpRouter = router({
  getOembed: publicProcedure
    .input(z.object({ url: z.url() }))
    .query(async ({ input, ctx }) => {
      const data = await getOembedData(input.url);
      return data;
    }),
});
