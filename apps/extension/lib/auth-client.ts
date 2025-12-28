import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.WXT_BACKEND_URL || "http://localhost:8787/",
  plugins: [],
});
