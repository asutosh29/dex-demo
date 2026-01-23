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

  canIframe: publicProcedure
    .input(z.object({ url: z.url() }))
    .query(async ({ input }) => {
      try {
        const response = await fetch(input.url, { method: "HEAD" });
        const xFrameOptions = response.headers.get("x-frame-options");
        const contentSecurityPolicy = response.headers.get(
          "content-security-policy",
        );

        // Check X-Frame-Options
        if (
          xFrameOptions &&
          (xFrameOptions.toLowerCase() === "sameorigin" ||
            xFrameOptions.toLowerCase() === "deny")
        ) {
          return false;
        }

        // Check Content-Security-Policy for frame-ancestors
        if (contentSecurityPolicy) {
          const frameAncestors =
            contentSecurityPolicy.includes("frame-ancestors");
          if (frameAncestors) {
            return false;
          }
        }

        // If none of the restrictive headers are present
        return true;
      } catch (error) {
        console.error("Error checking embed permissions:", error);
        // Assume cannot embed if there's an error fetching headers
        return false;
      }
    }),
});
