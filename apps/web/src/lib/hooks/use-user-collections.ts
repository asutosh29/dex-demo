import { trpc } from "~/lib/trpc";

// Made it a hook fFor convenience, cause used in multiple places.
export function useUserCollections() {
  return trpc.collections.getUserCollections.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
