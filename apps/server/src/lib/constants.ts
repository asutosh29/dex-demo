import { env } from "./env";

export const trustedOrigins = [
  env.FRONTEND_URL,
  env.MASTRA_STUDIO_URL, // TODO: discuss weather to keep it on prod or not
  "chrome://*", // TODO: tighten this up later, after deploying the extension to the store
  "moz-extension://*",
];
