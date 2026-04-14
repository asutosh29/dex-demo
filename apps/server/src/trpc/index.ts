import { router } from "./trpc";
import { itemRouter } from "./routers/item.router";
import { collectionRouter } from "./routers/collection.router";
import { collectionAccessRouter } from "./routers/collection-access.router";
import { userRouter } from "./routers/user.router";
import { ogpRouter } from "./routers/ogp.router";
import { apiKeyRouter } from "./routers/api-key.router";
import { notificationRouter } from "./routers/notification.router";
import { invitationRouter } from "./routers/invitation.router";
import { aiKeyRouter } from "./routers/ai-key.router";

export const appRouter = router({
  items: itemRouter,
  collections: collectionRouter,
  collectionAccess: collectionAccessRouter,
  users: userRouter,
  ogp: ogpRouter,
  apiKeys: apiKeyRouter,
  notifications: notificationRouter,
  invitations: invitationRouter,
  aiKeys: aiKeyRouter,
});

export { createContext } from "./trpc";
export type AppRouter = typeof appRouter;
