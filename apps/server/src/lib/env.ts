import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// DO NOT use this flag in development/prod, had to use it for migrating db schema automatically to supabase in github workflow.
const skipValidation = process.env.SKIP_ENV_VALIDATION === "true";

export const env = createEnv({
  skipValidation,
  server: {
    // db
    DB_URL: z.url(),

    BACKEND_URL: z.url(),
    FRONTEND_URL: z.url(),
    MASTRA_STUDIO_URL: z.url(), /// mastra studio for testing agents.

    // for digesting items
    YOUTUBE_API_KEY: z.string(),
    GROQ_API_KEY: z.string(),

    // auth
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    // waitlist, only required if waitlist is enabled
    // NOTE: Zod's default primitives coercion should not be used for booleans, since every string gets coerced to true.
    WAITLIST_ENABLED: z.string().transform((s) => s !== "false" && s !== "0"),

    GMAIL_USER: z.string().optional(),
    GOOGLE_APP_PASSWORD: z.string().optional(),
    GRIST_API_KEY: z.string().optional(),
    GRIST_DOC_ID: z.string().optional(),
    GRIST_TABLE_ID: z.string().optional(),
    GRIST_AUTH_TOKEN: z.string().optional(),

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
