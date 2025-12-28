/** @type {import('postcss-load-config').Config} */
/**
 * PostCSS configuration object.
 *
 * @type {Object}
 * @property {Object} plugins - An object specifying PostCSS plugins to use.
 * @property {Object} plugins["@tailwindcss/postcss"] - Tailwind CSS PostCSS plugin configuration.
 * @property {Object} plugins["@repo/ui/postcss-rem-to-px"] - Plugin to convert rem units to px based on the `--base-font-size` CSS variable.
 *
 * @remarks
 * The `@repo/ui/postcss-rem-to-px` plugin is necessary for working with Shadow DOM in the extension UI,
 * where the base font size is inherited from the parent page.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "@repo/ui/postcss-rem-to-px": {},
  },
};

export default config;
