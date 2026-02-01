import { createAuthClient } from "better-auth/react";
import {
  apiKeyClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8787/",
  plugins: [
    apiKeyClient(),
    inferAdditionalFields({
      user: {
        status: {
          type: "string",
        },
      },
      session: {
        waitlistEnabled: {
          type: "boolean",
        },
      },
    }),
  ],
});
