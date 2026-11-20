import { cors } from "hono/cors";
import { trustedOrigins } from "./constants";

export const appCors = cors({
  origin: trustedOrigins,
  allowHeaders: [
    "Content-Type",
    "Authorization",
    "X-API-Key",
    "x-mastra-client-type",
    "x-mastra-dev-playground",
  ],
  credentials: true,
});
