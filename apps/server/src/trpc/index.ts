import { router } from "./trpc";
import { itemRouter } from "./routers/item.router";
import { collectionRouter } from "./routers/collection.router";
import { ogpRouter } from "./routers/ogp.router";

export const appRouter = router({
  items: itemRouter,
  collections: collectionRouter,
  ogp: ogpRouter,
});

export { createContext } from "./trpc";
export type AppRouter = typeof appRouter;
