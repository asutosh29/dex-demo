import { router } from "./trpc";
import { itemRouter } from "./routers/item.router";
import { collectionRouter } from "./routers/collection.router";

export const appRouter = router({
  items: itemRouter,
  collections: collectionRouter,
});

export type AppRouter = typeof appRouter;
export { createContext } from "./trpc";
