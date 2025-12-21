import { router } from "./trpc";
import { itemRouter } from "./routers/item.router";
import { collectionRouter } from "./routers/collection.router";
import { collectionAccessRouter } from "./routers/collection-access.router";
import { userRouter } from "./routers/user.router";
import { ogpRouter } from "./routers/ogp.router";

export const appRouter = router({
  items: itemRouter,
  collections: collectionRouter,
  collectionAccess: collectionAccessRouter,
  users: userRouter,
  ogp: ogpRouter,
});

export { createContext } from "./trpc";
export type AppRouter = typeof appRouter;
