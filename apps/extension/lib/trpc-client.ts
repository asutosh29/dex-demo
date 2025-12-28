import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@repo/server/trpc";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${import.meta.env.WXT_BACKEND_URL}/api/trpc/`,
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          credentials: "include",
        }),
    }),
  ],
});

export { trpc };
