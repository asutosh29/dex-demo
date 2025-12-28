import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@repo/ui/globals.css";
import { useAuthStore } from "@/lib/stores/auth-store.ts";
import { useCollectionStore } from "@/lib/stores/collection-store.ts";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "wxt-dex-content-script",
      position: "overlay",
      mode: "closed",
      anchor: "body",
      append: "last",
      onMount: (container) => {
        // Inject base styles to isolate from host page
        const baseStyle = document.createElement("style");
        baseStyle.textContent = `
          :host, html {
            font-size: 16px !important;
          }
        `;
        container.append(baseStyle);

        // Don't mount react app directly on <body>
        const wrapper = document.createElement("div");
        container.append(wrapper);

        const root = ReactDOM.createRoot(wrapper);
        root.render(<App />);
        return { root, wrapper };
      },
      onRemove: (elements) => {
        elements?.root.unmount();
        elements?.wrapper.remove();
      },
    });

    // Initialize auth state from background script
    browser.runtime.sendMessage({ type: "GET_SESSION" }, (response) => {
      if (response.ok) {
        useAuthStore.getState().setUser(response.data.user);
      }
    });

    // Fetch collections after auth is loaded
    browser.runtime.sendMessage({ type: "GET_COLLECTIONS" }, (response) => {
      if (response.ok) {
        useCollectionStore.getState().setCollections(response.data);
      } else {
        useCollectionStore.getState().setError(response.error);
      }
    });

    let mounted = false;

    const mountUI = () => {
      if (mounted) return;
      ui.mount();
      mounted = true;
    };

    const unmountUI = () => {
      if (!mounted) return;
      ui.remove();
      mounted = false;
    };

    browser.runtime.onMessage.addListener((event) => {
      if (event.type === "MOUNT_UI") {
        mounted ? unmountUI() : mountUI();
      }
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        unmountUI();
      }
    });
  },
});
