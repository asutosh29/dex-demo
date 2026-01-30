import { defineConfig } from "tsup";
import { readFileSync } from "fs";
import { builtinModules } from "module";

// Read dependencies from package.json to mark them as external
const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));
const dependencies = Object.keys(pkg.dependencies || {});

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm"],
  target: "node20",
  sourcemap: false,
  clean: true,
  minify: false,
  splitting: false,
  dts: false,
  // Mark all dependencies and Node.js built-ins as external
  external: [
    ...dependencies,
    ...builtinModules,
    ...builtinModules.map((m) => `node:${m}`),
  ],
  noExternal: [],
  esbuildOptions(options) {
    options.platform = "node";
    options.packages = "external"; // Don't bundle any packages
  },
});
