import { j as e } from "./trpc-vendor-BRuMgTtf.js";
import { B as s } from "./index-pSmjkKS7.js";
import { u as o } from "./react-vendor-BNYpS37_.js";
import "./dnd-vendor-DPteac_0.js";
function l() {
  const t = o();
  return e.jsx("div", {
    className: "w-full h-screen flex items-center justify-center bg-background",
    children: e.jsxs("div", {
      className: "max-w-md w-full mx-auto p-8 text-center space-y-6",
      children: [
        e.jsxs("div", {
          className: "space-y-4",
          children: [
            e.jsx("h1", {
              className: "text-8xl font-bold text-muted-foreground",
              children: "404",
            }),
            e.jsx("h2", {
              className: "text-2xl font-semibold",
              children: "Page not found",
            }),
            e.jsx("p", {
              className: "text-muted-foreground",
              children:
                "The page you're looking for doesn't exist or has been moved.",
            }),
          ],
        }),
        e.jsx("div", {
          className: "flex gap-3 justify-center",
          children: e.jsx(s, {
            variant: "outline",
            onClick: () => t(-1),
            children: "Go back",
          }),
        }),
      ],
    }),
  });
}
export { l as default };
