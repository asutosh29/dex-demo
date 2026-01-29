import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/db/client";
import * as schema from "~/db/schema";
import { trustedOrigins } from "~/lib/constants";
import { apiKey, createAuthMiddleware } from "better-auth/plugins";
import { addUserToGristWaitlist } from "~/services/waitlist/grist";
import { sendWaitlistConfirmationEmail } from "~/services/waitlist/mailer";
import { env } from "./env";

export const auth = betterAuth({
  baseURL: env.BACKEND_URL || "http://localhost:8787",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  trustedOrigins,
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    apiKey({
      rateLimit: {
        enabled: true,
        timeWindow: 60,
        maxRequests: 100,
      },
    }),
  ],

  user: {
    additionalFields: {
      status: {
        type: "string",
        required: true,
        defaultValue: "waitlist",
        input: false, // Users can't set their own status
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          console.log("New user created:", user.email);
          console.log("User status:", user.status); // Should be "waitlist" by default

          // Add user to Grist waitlist
          if (env.WAITLIST_ENABLED) {
            await addUserToGristWaitlist(user);
            await sendWaitlistConfirmationEmail(user.name, user.email);
          }
        },
      },
    },
  },

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (!env.WAITLIST_ENABLED) return;

      if (ctx.path.startsWith("/callback/")) {
        const newSession = ctx.context.newSession;
        if (newSession?.user) {
          const status = newSession.user.status;
          console.log(`User ${newSession.user.email} has status: ${status}`);
          const firstName = newSession.user.name.split(" ")[0];
          // Redirect based on user status using enum values
          switch (status) {
            case "active":
              throw ctx.redirect(`${env.FRONTEND_URL}/dashboard`);
            case "waitlist":
              throw ctx.redirect(
                `${env.FRONTEND_URL}/?status=waitlist&name=${encodeURIComponent(firstName)}&email=${encodeURIComponent(newSession.user.email)}`,
              );
            case "suspended":
              throw ctx.redirect(`${env.FRONTEND_URL}/?status=${status}`);
          }
        }
      }
    }),
  },
});
