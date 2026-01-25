import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
// @ts-expect-error - No type declarations for custom PostCSS plugin
import remToPx from "@repo/ui/postcss-rem-to-px";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  vite: () => ({
    plugins: [tailwindcss()],
    css: {
      postcss: {
        plugins: [remToPx()], // can't use rems in extensions, so convert to px, cause of no root font-size control
      },
    },
  }),
  manifest: {
    // Required, don't open popup, only action
    action: {},
    commands: {
      "toggle-ui": {
        description: "Toggle the extension UI",
        suggested_key: {
          default: "Ctrl+Shift+X",
          mac: "Command+Shift+X",
        },
      },
    },
  },
});
