import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    // db
    DB_URL: z.url(),

    BACKEND_URL: z.url(),
    FRONTEND_URL: z.url(),

    // for digesting items
    YOUTUBE_API_KEY: z.string(),
    GROQ_API_KEY: z.string(),

    // auth
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    // waitlist, only required if waitlist is enabled
    WAITLIST_ENABLED: z.coerce.boolean().default(false),

    GMAIL_USER: z.string(),
    GOOGLE_APP_PASSWORD: z.string(),
    GRIST_API_KEY: z.string(),
    GRIST_DOC_ID: z.string(),
    GRIST_TABLE_ID: z.string(),
    GRIST_AUTH_TOKEN: z.string(),

    // Port, which defaults to 8787
    PORT: z.coerce.number().default(8787),
  },

  createFinalSchema: (shape) => {
    return z.object(shape).transform((env, ctx) => {
      if (env.WAITLIST_ENABLED) {
        const requiredVars = [
          "GMAIL_USER",
          "GOOGLE_APP_PASSWORD",
          "GRIST_API_KEY",
          "GRIST_DOC_ID",
          "GRIST_TABLE_ID",
          "GRIST_AUTH_TOKEN",
        ] as const;
        if (!requiredVars.every((varName) => env[varName])) {
          ctx.addIssue({
            code: "custom",
            message: `WAITLIST_ENABLED is true, but one or more required environment variables are missing: ${requiredVars.join(", ")}`,
          });
          return z.NEVER;
        }
      }
      return env;
    });
  },

  runtimeEnv: process.env,
});
