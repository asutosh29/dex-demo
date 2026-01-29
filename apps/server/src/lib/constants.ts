import { env } from "./env";

export const trustedOrigins = [
  env.FRONTEND_URL,
  "chrome://*", // TODO: tighten this up later, after deploying the extension to the store
  "moz-extension://*",
];
