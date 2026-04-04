import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { apiKeyClient } from "@better-auth/api-key/client";

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
    }),
  ],
});
