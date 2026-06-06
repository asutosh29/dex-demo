import { AsyncLocalStorage } from "node:async_hooks";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { db } from "~/db/client";
import { collectionsTable } from "~/db/schema";

export type ResolvedCollection = {
  id: string;
  parentId: string | null;
  rootId: string;
  isRoot: boolean;
};

type Cache = Map<string, ResolvedCollection>;

const cacheStorage = new AsyncLocalStorage<Cache>();

export function withCollectionResolverCache<T>(
  fn: () => Promise<T>,
): Promise<T> {
  return cacheStorage.run(new Map(), fn);
}

export async function resolveCollection(
  id: string,
): Promise<ResolvedCollection> {
  const cache = cacheStorage.getStore();
  const cached = cache?.get(id);
  if (cached) return cached;

  const row = await db
    .select({
      id: collectionsTable.id,
      parentId: collectionsTable.parentId,
    })
    .from(collectionsTable)
    .where(eq(collectionsTable.id, id))
    .limit(1);

  if (row.length === 0) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Collection not found" });
  }

  const resolved: ResolvedCollection = {
    id: row[0].id,
    parentId: row[0].parentId,
    rootId: row[0].parentId ?? row[0].id,
    isRoot: row[0].parentId === null,
  };
  cache?.set(id, resolved);
  if (resolved.isRoot) cache?.set(resolved.rootId, resolved);
  return resolved;
}

export async function resolveRootId(id: string): Promise<string> {
  const { rootId } = await resolveCollection(id);
  return rootId;
}

export function assertRoot(resolved: ResolvedCollection): void {
  if (!resolved.isRoot) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Operation not valid on sub-collections",
    });
  }
}
