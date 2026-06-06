const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/preview-dialog-BrI2BajL.js",
      "assets/trpc-vendor-CLp1aBhv.js",
      "assets/react-vendor-nYV-xjaT.js",
      "assets/index-YxyRed48.js",
      "assets/dnd-vendor-iOQT1T9p.js",
      "assets/index-yjYlD64w.css",
      "assets/editable-field-weub1O0L.js",
      "assets/textarea-CywMa2Jv.js",
    ]),
) => i.map((i) => d[i]);
import {
  c as y,
  aa as U,
  ab as z,
  j,
  ac as L,
  ad as f,
  A as _,
  t as x,
  e as p,
  I as S,
  B as N,
  ae as D,
  b as w,
  d as C,
  l as E,
  af as F,
  G as I,
  ag as T,
  ah as G,
  ai as M,
} from "./index-YxyRed48.js";
import { j as e } from "./trpc-vendor-CLp1aBhv.js";
import { r as l } from "./react-vendor-nYV-xjaT.js";
import { c as B, p as q, A as H } from "./middleware-Bgispu4D.js";
import { L as A } from "./loader-BXCJJTH_.js";
import "./dnd-vendor-iOQT1T9p.js";
const $ = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
  ],
  W = y("arrow-right", $);
const Q = [
    ["path", { d: "M12 10v6", key: "1bos4e" }],
    ["path", { d: "M9 13h6", key: "1uhe8q" }],
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
        key: "1kt360",
      },
    ],
  ],
  V = y("folder-plus", Q);
const Z = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db",
      },
    ],
  ],
  K = y("zap", Z),
  k = B()(
    q(
      (t) => ({
        currentStep: "create-collection",
        hasCompletedOnboarding: !1,
        firstCollectionId: null,
        setCurrentStep: (s) => t({ currentStep: s }),
        setFirstCollectionId: (s) => t({ firstCollectionId: s }),
        completeOnboarding: () =>
          t({ hasCompletedOnboarding: !0, currentStep: "completed" }),
        resetOnboarding: () =>
          t({
            currentStep: "create-collection",
            hasCompletedOnboarding: !1,
            firstCollectionId: null,
          }),
      }),
      { name: "onboarding-state" },
    ),
  );
function u({ icon: t, title: s, description: n, badge: a }) {
  return e.jsxs("div", {
    className:
      "flex flex-col h-full items-center text-center p-4 bg-card rounded-lg border-t",
    children: [
      e.jsx(U, { variant: "icon", children: t }),
      e.jsxs("div", {
        className: "space-y-2",
        children: [
          e.jsxs("div", {
            className: "flex items-center justify-center gap-2",
            children: [
              e.jsx(z, { className: "text-base", children: s }),
              a &&
                e.jsx(j, {
                  variant: "secondary",
                  className: "text-xs",
                  children: a,
                }),
            ],
          }),
          e.jsx(L, { className: "text-sm", children: n }),
        ],
      }),
    ],
  });
}
function b({ step: t, title: s, description: n, children: a, showSuccess: c }) {
  return e.jsxs(f.div, {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
    className: "space-y-4",
    children: [
      e.jsxs("div", {
        className: "flex items-start gap-4",
        children: [
          e.jsx("div", {
            className:
              "size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm shrink-0",
            "aria-label": `Step ${t} of 2`,
            children: t,
          }),
          e.jsxs("div", {
            className: "flex-1 space-y-1",
            children: [
              e.jsx("h3", { className: "text-lg font-medium", children: s }),
              e.jsx("p", {
                className: "text-sm text-muted-foreground",
                children: n,
              }),
            ],
          }),
        ],
      }),
      e.jsx(H, {
        mode: "wait",
        children: c
          ? e.jsx(
              f.div,
              {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.8 },
                transition: { duration: 0.3 },
                className: "flex justify-center py-8",
                children: e.jsx(_, {}),
              },
              "success",
            )
          : e.jsx(
              f.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.2 },
                className: "pl-12",
                children: a,
              },
              "form",
            ),
      }),
    ],
  });
}
function Y({ onSuccess: t }) {
  const [s, n] = l.useState(""),
    a = l.useRef(null),
    c = x.useUtils(),
    i = x.collections.create.useMutation({
      onSuccess: async (r) => {
        (await c.collections.getUserCollections.invalidate(),
          await c.collections.getCollectionsAndItemsCount.invalidate(),
          p.success("Collection created!"),
          n(""),
          t(r.id));
      },
      onError: (r) => {
        (console.error(r),
          p.error("Failed to create collection. Please try again."));
      },
    });
  l.useEffect(() => {
    a.current?.focus();
  }, []);
  const o = (r) => {
    (r.preventDefault(), s.trim() && i.mutate({ title: s.trim() }));
  };
  return e.jsxs("form", {
    onSubmit: o,
    className: "space-y-4",
    children: [
      e.jsxs("div", {
        className: "relative",
        children: [
          i.isPending &&
            e.jsx(A, {
              className:
                "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin",
            }),
          e.jsx(S, {
            ref: a,
            value: s,
            onChange: (r) => n(r.target.value),
            placeholder: "e.g., Reading List, Work Resources, Inspiration",
            disabled: i.isPending,
            className: i.isPending ? "pl-10" : "",
            "aria-label": "Collection name",
          }),
        ],
      }),
      e.jsx(N, {
        type: "submit",
        disabled: !s.trim() || i.isPending,
        className: "w-full",
        children: i.isPending ? "Creating..." : "Create Collection",
      }),
    ],
  });
}
function J({ collectionId: t, onSuccess: s }) {
  const [n, a] = l.useState(""),
    c = l.useRef(null),
    i = x.useUtils(),
    o = x.items.create.useMutation({
      onSuccess: async () => {
        (await i.collections.get.invalidate({ id: t }),
          await i.collections.getUserCollections.invalidate(),
          await i.collections.getCollectionsAndItemsCount.invalidate(),
          p.success("Item added successfully!"),
          a(""),
          s());
      },
      onError: (d) => {
        (console.error(d),
          p.error("Failed to add item. Please check the URL and try again."));
      },
    });
  l.useEffect(() => {
    c.current?.focus();
  }, []);
  const r = (d) => {
    (d.preventDefault(),
      n.trim() && o.mutate({ url: n.trim(), collectionId: t }));
  };
  return e.jsxs("form", {
    onSubmit: r,
    className: "space-y-4",
    children: [
      e.jsxs("div", {
        className: "relative",
        children: [
          o.isPending &&
            e.jsx(A, {
              className:
                "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin",
            }),
          e.jsx(S, {
            ref: c,
            value: n,
            onChange: (d) => a(d.target.value),
            placeholder: "Paste a URL",
            disabled: o.isPending,
            className: o.isPending ? "pl-10" : "",
            "aria-label": "Item URL",
          }),
        ],
      }),
      e.jsx("div", {
        className: "flex items-center gap-3",
        children: e.jsx(N, {
          type: "submit",
          disabled: !n.trim() || o.isPending,
          className: "flex-1",
          children: o.isPending ? "Adding..." : "Add Item",
        }),
      }),
      e.jsxs("p", {
        className: "text-xs text-muted-foreground text-center",
        children: [
          "Tip: Press ",
          e.jsx(D, { children: "A" }),
          " anywhere to quickly add items",
        ],
      }),
    ],
  });
}
const X = () => {
  const t = new Date().getHours();
  return t < 12 && t >= 5
    ? "Good morning"
    : t >= 12 && t < 17
      ? "Good afternoon"
      : t >= 17 && t < 21
        ? "Good evening"
        : "Good night";
};
function ee() {
  const t = X(),
    { data: s } = w.useSession(),
    n = s?.user.name?.split(" ")[0],
    {
      currentStep: a,
      firstCollectionId: c,
      setCurrentStep: i,
      setFirstCollectionId: o,
      completeOnboarding: r,
    } = k(),
    [d, h] = l.useState(!1),
    [v, m] = l.useState(!1),
    g = (O) => {
      (o(O),
        h(!0),
        setTimeout(() => {
          (h(!1), i("add-item"));
        }, 800));
    },
    P = () => {
      (m(!0),
        setTimeout(() => {
          r();
        }, 800));
    },
    R = () => {
      r();
    };
  return e.jsxs("main", {
    className: "max-w-3xl mx-auto p-4 md:p-6 space-y-8 md:space-y-12",
    children: [
      e.jsxs("div", {
        className: "text-center space-y-4 mt-8 md:mt-12",
        children: [
          e.jsxs("h1", {
            className:
              "text-3xl md:text-4xl 2xl:text-5xl font-display font-light",
            children: [
              t,
              ",",
              " ",
              e.jsxs("span", {
                className: "italic text-muted-foreground",
                children: [n, "."],
              }),
            ],
          }),
          e.jsx("div", {
            className: "space-y-2",
            children: e.jsx("p", {
              className: "text-lg md:text-xl text-muted-foreground",
              children: "Welcome to your pokedex for the web.",
            }),
          }),
        ],
      }),
      e.jsxs(C, {
        preset: "blur-slide",
        className:
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
        children: [
          e.jsx(u, {
            icon: e.jsx(V, {}),
            title: "Organize with Collections",
            description: "Group related items by topic or project",
          }),
          e.jsx(u, {
            icon: e.jsx(K, {}),
            title: "Capture Instantly",
            description: "Press 'A' anywhere to save",
          }),
          e.jsx(u, {
            icon: e.jsx(E, {}),
            title: "Find Anything",
            description: "Search across your brain",
          }),
          e.jsx(u, {
            icon: e.jsx(F, {}),
            title: "Tag & Filter",
            description: "Categorize with tags",
          }),
          e.jsx(u, {
            icon: e.jsx(I, {}),
            title: "Save from Anywhere",
            description: "Use the browser extension",
          }),
          e.jsx(u, {
            icon: e.jsx(T, {}),
            title: "Share & Collaborate",
            description: "Invite team members",
          }),
        ],
      }),
      e.jsxs("div", {
        className: "space-y-8 max-w-2xl mx-auto",
        children: [
          a === "create-collection" &&
            e.jsx(b, {
              step: 1,
              title: "Create your first collection",
              description:
                "Collections help you organize items by topic or project.",
              showSuccess: d,
              children: e.jsx(Y, { onSuccess: g }),
            }),
          a === "add-item" &&
            c &&
            e.jsx(b, {
              step: 2,
              title: "Add your first item",
              description: "Save a link to your new collection.",
              showSuccess: v,
              children: e.jsx(J, { collectionId: c, onSuccess: P }),
            }),
          e.jsx("div", {
            className: "flex justify-center",
            children: e.jsx(N, {
              variant: "ghost",
              size: "sm",
              onClick: R,
              children: "Skip for now",
            }),
          }),
        ],
      }),
    ],
  });
}
const te = l.lazy(() =>
    M(
      () => import("./preview-dialog-BrI2BajL.js"),
      __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7]),
    ),
  ),
  se = (t) =>
    new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  ae = (t) => {
    try {
      return new URL(t).hostname.replace("www.", "");
    } catch {
      return t;
    }
  };
function ne({ item: t }) {
  const [s, n] = l.useState(!1);
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx("div", {
        onClick: () => n(!0),
        className:
          "group py-4 rounded-md cursor-pointer hover:bg-muted/30 transition-colors -mx-4 px-4",
        children: e.jsx("div", {
          className: "flex items-start gap-3",
          children: e.jsxs("div", {
            className: "flex-1 min-w-0 space-y-2",
            children: [
              e.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  t.favicon
                    ? e.jsx("img", {
                        src: t.favicon,
                        alt: "Favicon",
                        width: 16,
                        height: 16,
                        className: "w-4 h-4",
                      })
                    : e.jsx(I, { className: "size-4 text-muted-foreground" }),
                  e.jsx("h3", {
                    className: "truncate max-w-[44ch]",
                    children: t.title,
                  }),
                  e.jsx("span", {
                    className: "text-xs text-muted-foreground",
                    children: ae(t.url),
                  }),
                  t.collectionTitle &&
                    e.jsxs(e.Fragment, {
                      children: [
                        e.jsx("span", {
                          className: "text-xs text-muted-foreground",
                          children: "•",
                        }),
                        e.jsxs("span", {
                          className: "text-xs text-foreground",
                          children: ["# ", t.collectionTitle],
                        }),
                      ],
                    }),
                ],
              }),
              e.jsx("p", {
                className: "text-sm text-muted-foreground line-clamp-2",
                children: t.tldr,
              }),
              e.jsxs("div", {
                className: "flex items-center gap-2 flex-wrap",
                children: [
                  t.tags
                    ?.slice(0, 3)
                    .map((a) =>
                      e.jsxs(
                        j,
                        {
                          variant: "secondary",
                          className: "text-xs",
                          children: ["#", a],
                        },
                        a,
                      ),
                    ),
                  t.tags &&
                    t.tags.length > 3 &&
                    e.jsxs(j, {
                      variant: "secondary",
                      className: "text-xs",
                      children: ["+", t.tags.length - 3],
                    }),
                  e.jsx("span", {
                    className: "text-xs text-muted-foreground ml-auto",
                    children: se(t.createdAt),
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      e.jsx(l.Suspense, {
        fallback: null,
        children: e.jsx(te, { open: s, onOpenChange: n, item: t }),
      }),
    ],
  });
}
function me() {
  const t = G(),
    { data: s } = w.useSession(),
    n = s?.user.name?.split(" ")[0],
    { data: a, isLoading: c } = x.items.getRecents.useQuery({ limit: 3 }),
    { data: i } = x.collections.getCollectionsAndItemsCount.useQuery(),
    o = i?.reduce((m) => m + 1, 0),
    r = i?.reduce((m, g) => m + g.itemCount, 0);
  console.log({ counts: i });
  const { hasCompletedOnboarding: d } = k();
  return o === 0 && r === 0 && !d
    ? e.jsx(ee, {})
    : e.jsxs("main", {
        className: "max-w-4xl mx-auto p-6 space-y-12",
        children: [
          e.jsxs("div", {
            className: "text-center space-y-4 mt-12",
            children: [
              e.jsxs("h1", {
                className: "text-4xl 2xl:text-5xl font-display font-light",
                children: [
                  t,
                  ",",
                  " ",
                  e.jsxs("span", {
                    className: "italic text-muted-foreground",
                    children: [n, "."],
                  }),
                ],
              }),
              e.jsxs("p", {
                className: "text-muted-foreground 2xl:text-lg",
                children: [
                  "Your second brain holds",
                  " ",
                  e.jsxs("span", {
                    className: "text-foreground",
                    children: [r, " items"],
                  }),
                  " across",
                  " ",
                  e.jsxs("span", {
                    className: "text-foreground",
                    children: [o, " collections"],
                  }),
                  ".",
                ],
              }),
            ],
          }),
          a &&
            a.length > 0 &&
            e.jsxs("div", {
              className: "space-y-4",
              children: [
                e.jsx("div", {
                  className: "flex items-center justify-between",
                  children: e.jsxs("h2", {
                    className:
                      "text-sm font-medium text-muted-foreground uppercase tracking-widest inline-flex items-center",
                    children: [
                      "Recent Captures ",
                      e.jsx(W, { className: "size-4 ml-1" }),
                    ],
                  }),
                }),
                e.jsx(C, {
                  preset: "slide-down",
                  className: "space-y-2",
                  children: c
                    ? e.jsx("div", {
                        className: "text-center py-8 text-muted-foreground",
                        children: "Loading...",
                      })
                    : a.map((m) => e.jsx(ne, { item: m }, m.id)),
                }),
              ],
            }),
        ],
      });
}
export { me as default };
