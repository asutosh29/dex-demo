import { authClient } from "@/lib/auth-client";

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
      authClient
        .getSession()
        .then((session) => {
          sendResponse({ ok: true, data: session.data, error: null });
        })
        .catch((error) => {
          sendResponse({ ok: false, data: null, error });
        });
      return true;
    }
  });

  browser.runtime.onMessage.addListener(async (message) => {
    if (message.type === "SIGN_IN") {
      browser.tabs.create({
        url: `${import.meta.env.WXT_FRONTEND_URL}/login`,
      });
    }
  });
});
