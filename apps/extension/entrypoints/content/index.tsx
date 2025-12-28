import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@repo/ui/globals.css";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "wxt-dex-content-script",
      position: "inline",
      anchor: "body",
      append: "first",
      onMount: (container) => {
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
