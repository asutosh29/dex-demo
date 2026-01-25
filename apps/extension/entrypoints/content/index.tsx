import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@repo/ui/globals.css";
import { useAuthStore } from "@/lib/stores/auth-store.ts";
import { useCollectionStore } from "@/lib/stores/collection-store.ts";
import { ThemeProvider } from "@/components/providers/theme-provider.tsx";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    if (!document.getElementById("wxt-google-fonts")) {
      // loading the fonts in the main document to ensure they are available in the shadow DOM
      const link = document.createElement("link");
      link.id = "wxt-google-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap";
      document.head.appendChild(link);
    }

    const ui = await createShadowRootUi(ctx, {
      name: "wxt-dex-content-script",
      position: "overlay",
      mode: "open",
      anchor: "body",
      append: "first",
      onMount: (container) => {
        // Don't mount react app directly on <body>
        const wrapper = document.createElement("div");
        wrapper.id = "shadow-root-wrapper";
        wrapper.style.fontFamily =
          '"DM Sans", -apple-system, "system-ui", sans-serif';
        container.append(wrapper);

        const root = ReactDOM.createRoot(wrapper);
        root.render(
          <ThemeProvider
            defaultTheme="dark"
            rootElement={container as HTMLElement}
          >
            <App />
          </ThemeProvider>,
        );
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
      } else {
        // Clear auth state if session is invalid
        useAuthStore.getState().setUser(null);
        // Also clear any collection errors since they're expected when not logged in
        useCollectionStore.getState().setError(null);
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
