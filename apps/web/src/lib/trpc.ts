import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import {
  createTRPCReact,
  type inferReactQueryProcedureOptions,
} from "@trpc/react-query";
import type { AppRouter } from "@repo/server/trpc";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const queryClient = new QueryClient();

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({ url: import.meta.env.VITE_BACKEND_URL + "api/trpc" }),
  ],
});
