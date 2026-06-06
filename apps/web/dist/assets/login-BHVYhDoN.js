import { j as e } from "./trpc-vendor-CLp1aBhv.js";
import { c as o, b as i, B as r, A as d, d as x } from "./index-YxyRed48.js";
import { c as m, u as l } from "./react-vendor-nYV-xjaT.js";
import "./dnd-vendor-iOQT1T9p.js";
const u = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]],
  g = o("chevron-left", u);
function v() {
  const [s] = m(),
    t = s.get("status") === "waitlist",
    { data: a, isPending: n } = i.useSession(),
    c = l();
  return (
    a && !n && a.user.status === "active" && c("/dashboard"),
    e.jsxs("main", {
      className: "flex flex-col h-screen w-full items-center justify-center",
      children: [
        e.jsx("div", {
          className:
            "absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),rgba(255,255,255,0))]",
        }),
        e.jsxs("div", {
          className: "absolute top-6 left-4 inline-flex items-center gap-2",
          children: [
            e.jsx("img", { src: "/logo.svg", className: "size-6" }),
            e.jsx("span", { className: "text-lg", children: "Dex" }),
          ],
        }),
        t
          ? e.jsx(f, {
              name: s.get("name") || "User",
              email: s.get("email") || "user@example.com",
            })
          : e.jsx(h, { isPending: n }),
        e.jsx("footer", {
          className:
            "fixed bottom-2 p-2 text-muted-foreground brightness-50 text-center",
          children: "© 2026 Dex. Building the future of personal knowledge.",
        }),
      ],
    })
  );
}
function h({ isPending: s }) {
  const t = async () => {
    await i.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/dashboard`,
    });
  };
  return e.jsxs(x, {
    preset: "blur-slide",
    className:
      "flex flex-col items-center justify-center gap-4 max-w-3xl px-4 sm:px-0",
    children: [
      e.jsx("p", {
        className:
          "text-sm md:text-base uppercase tracking-widest text-muted-foreground text-center",
        children: "Your digital collections, reimagined",
      }),
      e.jsxs("h1", {
        className:
          "text-5xl sm:text-6xl md:text-8xl items-center text-balance text-center font-display",
        children: [
          "Capture it. Tag it.",
          e.jsx("br", {}),
          e.jsx("span", {
            className: "text-muted-foreground italic",
            children: "Find it forever",
          }),
        ],
      }),
      e.jsx("p", {
        className:
          "text-base md:text-xl text-center max-w-[46ch] text-muted-foreground mt-4",
        children:
          "Save anything. Find everything. Your links, notes, and files — indexed and searchable in one place.",
      }),
      e.jsxs("div", {
        className: "space-y-2 text-center",
        children: [
          e.jsx(r, {
            onClick: t,
            className: "mt-8 font-medium text-base p-6",
            size: "lg",
            disabled: s,
            children: s
              ? "Checking for existing session..."
              : "Sign in with Google",
          }),
          e.jsx("p", {
            className:
              "text-sm font-medium text-muted-foreground brightness-50",
            children: "Join the waitlist for early access",
          }),
        ],
      }),
    ],
  });
}
function f({ name: s, email: t }) {
  const a = l();
  return e.jsx("div", {
    className: "max-w-xl w-full mx-auto p-8",
    children: e.jsxs("div", {
      className:
        "bg-card border-t rounded-2xl p-12 flex flex-col items-center text-center space-y-6 relative",
      children: [
        e.jsx(r, {
          size: "icon",
          variant: "ghost",
          className: "absolute top-2 left-2 text-muted-foreground",
          onClick: () => {
            a("/");
          },
          children: e.jsx(g, {}),
        }),
        e.jsx(d, { className: "size-24 *:w-12 *:h-12" }),
        e.jsxs("h1", {
          className: "text-4xl font-semibold",
          children: ["You're on the list, ", s, "!"],
        }),
        e.jsxs("div", {
          className: "text-muted-foreground space-y-1",
          children: [
            e.jsxs("p", {
              children: [
                "We'll notify you at ",
                e.jsx("span", { className: "text-foreground", children: t }),
              ],
            }),
            e.jsx("p", { children: "when it's your turn." }),
          ],
        }),
      ],
    }),
  });
}
export { v as default };
