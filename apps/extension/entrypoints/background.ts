import { authClient } from "@/lib/auth-client";
import { trpc } from "~/lib/trpc-client";

export default defineBackground(() => {
  browser.commands.onCommand.addListener(async (command) => {
    console.log(`Command: ${command}`);
    if (command === "toggle-ui") {
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs[0]?.id) {
        await browser.tabs.sendMessage(tabs[0].id, { type: "MOUNT_UI" });
      }
      return true;
    }
  });

  (browser.action ?? browser.browserAction).onClicked.addListener(
    async (tab) => {
      console.log("browser action triggered", tab);
      if (tab.id) {
        await browser.tabs.sendMessage(tab.id, { type: "MOUNT_UI" });
      }
    },
  );

  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === "GET_SESSION") {
      console.log("[BG] GET_SESSION received");
      authClient
        .getSession()
        .then((session) => {
          console.log("[BG] GET_SESSION success", session);
          sendResponse({ ok: true, data: session.data, error: null });
        })
        .catch((error) => {
          console.error("[BG] GET_SESSION error", error);
          sendResponse({ ok: false, data: null, error });
        });
      return true;
    }

    if (message.type === "GET_COLLECTIONS") {
      console.log("[BG] GET_COLLECTIONS received");
      trpc.collections.getUserCollections
        .query()
        .then((collections) => {
          console.log("[BG] GET_COLLECTIONS success", collections);
          sendResponse({ ok: true, data: collections, error: null });
        })
        .catch((error) => {
          console.error("[BG] GET_COLLECTIONS error", error);
          sendResponse({
            ok: false,
            data: null,
            error: (error as Error).message,
          });
        });
      return true;
    }

    if (message.type === "ADD_ITEM_TO_COLLECTION") {
      const { url, collectionId } = message;
      console.log("[BG] ADD_ITEM_TO_COLLECTION received", {
        url,
        collectionId,
      });
      trpc.items.create
        .mutate({ url, collectionId })
        .then((item) => {
          console.log("[BG] ADD_ITEM_TO_COLLECTION success", item);
          sendResponse({ ok: true, data: item, error: null });
        })
        .catch((error) => {
          console.error(
            "[BG] ADD_ITEM_TO_COLLECTION error",
            error.message || String(error),
          );
          sendResponse({
            ok: false,
            data: null,
            error: error.message || String(error),
          });
        });
      return true;
    }

    if (message.type === "CREATE_COLLECTION") {
      const { title } = message;
      console.log("[BG] CREATE_COLLECTION received", { title });
      trpc.collections.create
        .mutate({ title })
        .then((collection) => {
          console.log("[BG] CREATE_COLLECTION success", collection);
          sendResponse({ ok: true, data: collection, error: null });
        })
        .catch((error) => {
          console.error("[BG] CREATE_COLLECTION error", error);
          sendResponse({
            ok: false,
            data: null,
            error: (error as Error).message,
          });
        });
      return true;
    }
    if (message.type === "CHECK_ITEM_EXISTS") {
      trpc.items.checkItemExists
        .query({ url: message.url })
        .then((result) => {
          console.log("[BG] CHECK_ITEM_EXISTS result", result);
          sendResponse({ ok: true, data: result, error: null });
        })
        .catch((error) => {
          console.error("[BG] CHECK_ITEM_EXISTS error", error);
          sendResponse({
            ok: false,
            data: null,
            error: (error as Error).message,
          });
        });
      return true;
    }

    if (message.type === "SIGN_IN") {
      console.log("[BG] SIGN_IN received");
      browser.tabs.create({
        url: `${import.meta.env.WXT_FRONTEND_URL}/login`,
      });
    }
  });
});
