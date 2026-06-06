const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/preview-dialog-9-eGinej.js",
      "assets/trpc-vendor-BRuMgTtf.js",
      "assets/react-vendor-BNYpS37_.js",
      "assets/index-pSmjkKS7.js",
      "assets/dnd-vendor-DPteac_0.js",
      "assets/index-CqTm8-rh.css",
      "assets/editable-field-BYIbmHje.js",
      "assets/textarea-C-LGZX5X.js",
    ]),
) => i.map((i) => d[i]);
import {
  a as U,
  ay as Z,
  az as L,
  aA as G,
  aB as J,
  aC as X,
  aD as ee,
  aE as te,
  aF as se,
  aG as ne,
  j as O,
  aH as ae,
  aI as M,
  A as ie,
  t as S,
  e as P,
  I as H,
  B as D,
  aJ as oe,
  b as B,
  d as W,
  l as re,
  aK as ce,
  G as q,
  aL as le,
  aM as de,
  aN as ue,
} from "./index-pSmjkKS7.js";
import { j as e } from "./trpc-vendor-BRuMgTtf.js";
import { r } from "./react-vendor-BNYpS37_.js";
import { c as me, p as pe, L as K } from "./middleware-2xfD1H3l.js";
import "./dnd-vendor-DPteac_0.js";
const he = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
  ],
  xe = U("arrow-right", he);
const fe = [
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
  ge = U("folder-plus", fe);
const je = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db",
      },
    ],
  ],
  ye = U("zap", je);
function T(t, n) {
  if (typeof t == "function") return t(n);
  t != null && (t.current = n);
}
function Ce(...t) {
  return (n) => {
    let s = !1;
    const a = t.map((c) => {
      const o = T(c, n);
      return (!s && typeof o == "function" && (s = !0), o);
    });
    if (s)
      return () => {
        for (let c = 0; c < a.length; c++) {
          const o = a[c];
          typeof o == "function" ? o() : T(t[c], null);
        }
      };
  };
}
function Ne(...t) {
  return r.useCallback(Ce(...t), t);
}
class ve extends r.Component {
  getSnapshotBeforeUpdate(n) {
    const s = this.props.childRef.current;
    if (L(s) && n.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const a = s.offsetParent,
        c = (L(a) && a.offsetWidth) || 0,
        o = (L(a) && a.offsetHeight) || 0,
        l = getComputedStyle(s),
        i = this.props.sizeRef.current;
      ((i.height = parseFloat(l.height)),
        (i.width = parseFloat(l.width)),
        (i.top = s.offsetTop),
        (i.left = s.offsetLeft),
        (i.right = c - i.width - i.left),
        (i.bottom = o - i.height - i.top));
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function we({
  children: t,
  isPresent: n,
  anchorX: s,
  anchorY: a,
  root: c,
  pop: o,
}) {
  const l = r.useId(),
    i = r.useRef(null),
    m = r.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 }),
    { nonce: j } = r.useContext(Z),
    p = t.props?.ref ?? t?.ref,
    h = Ne(i, p);
  return (
    r.useInsertionEffect(() => {
      const {
        width: d,
        height: x,
        top: g,
        left: y,
        right: N,
        bottom: R,
      } = m.current;
      if (n || o === !1 || !i.current || !d || !x) return;
      const k = s === "left" ? `left: ${y}` : `right: ${N}`,
        A = a === "bottom" ? `bottom: ${R}` : `top: ${g}`;
      i.current.dataset.motionPopId = l;
      const f = document.createElement("style");
      j && (f.nonce = j);
      const v = c ?? document.head;
      return (
        v.appendChild(f),
        f.sheet &&
          f.sheet.insertRule(`
          [data-motion-pop-id="${l}"] {
            position: absolute !important;
            width: ${d}px !important;
            height: ${x}px !important;
            ${k}px !important;
            ${A}px !important;
          }
        `),
        () => {
          (i.current?.removeAttribute("data-motion-pop-id"),
            v.contains(f) && v.removeChild(f));
        }
      );
    }, [n]),
    e.jsx(ve, {
      isPresent: n,
      childRef: i,
      sizeRef: m,
      pop: o,
      children: o === !1 ? t : r.cloneElement(t, { ref: h }),
    })
  );
}
const be = ({
  children: t,
  initial: n,
  isPresent: s,
  onExitComplete: a,
  custom: c,
  presenceAffectsLayout: o,
  mode: l,
  anchorX: i,
  anchorY: m,
  root: j,
}) => {
  const p = G(Se),
    h = r.useId();
  let d = !0,
    x = r.useMemo(
      () => (
        (d = !1),
        {
          id: h,
          initial: n,
          isPresent: s,
          custom: c,
          onExitComplete: (g) => {
            p.set(g, !0);
            for (const y of p.values()) if (!y) return;
            a && a();
          },
          register: (g) => (p.set(g, !1), () => p.delete(g)),
        }
      ),
      [s, p, a],
    );
  return (
    o && d && (x = { ...x }),
    r.useMemo(() => {
      p.forEach((g, y) => p.set(y, !1));
    }, [s]),
    r.useEffect(() => {
      !s && !p.size && a && a();
    }, [s]),
    (t = e.jsx(we, {
      pop: l === "popLayout",
      isPresent: s,
      anchorX: i,
      anchorY: m,
      root: j,
      children: t,
    })),
    e.jsx(J.Provider, { value: x, children: t })
  );
};
function Se() {
  return new Map();
}
const I = (t) => t.key || "";
function _(t) {
  const n = [];
  return (
    r.Children.forEach(t, (s) => {
      r.isValidElement(s) && n.push(s);
    }),
    n
  );
}
const Re = ({
    children: t,
    custom: n,
    initial: s = !0,
    onExitComplete: a,
    presenceAffectsLayout: c = !0,
    mode: o = "sync",
    propagate: l = !1,
    anchorX: i = "left",
    anchorY: m = "top",
    root: j,
  }) => {
    const [p, h] = X(l),
      d = r.useMemo(() => _(t), [t]),
      x = l && !p ? [] : d.map(I),
      g = r.useRef(!0),
      y = r.useRef(d),
      N = G(() => new Map()),
      R = r.useRef(new Set()),
      [k, A] = r.useState(d),
      [f, v] = r.useState(d);
    ee(() => {
      ((g.current = !1), (y.current = d));
      for (let C = 0; C < f.length; C++) {
        const u = I(f[C]);
        x.includes(u)
          ? (N.delete(u), R.current.delete(u))
          : N.get(u) !== !0 && N.set(u, !1);
      }
    }, [f, x.length, x.join("-")]);
    const E = [];
    if (d !== k) {
      let C = [...d];
      for (let u = 0; u < f.length; u++) {
        const w = f[u],
          z = I(w);
        x.includes(z) || (C.splice(u, 0, w), E.push(w));
      }
      return (o === "wait" && E.length && (C = E), v(_(C)), A(d), null);
    }
    const { forceRender: Q } = r.useContext(te);
    return e.jsx(e.Fragment, {
      children: f.map((C) => {
        const u = I(C),
          w = l && !p ? !1 : d === f || x.includes(u),
          z = () => {
            if (R.current.has(u)) return;
            if (N.has(u)) (R.current.add(u), N.set(u, !0));
            else return;
            let F = !0;
            (N.forEach((Y) => {
              Y || (F = !1);
            }),
              F && (Q?.(), v(y.current), l && h?.(), a && a()));
          };
        return e.jsx(
          be,
          {
            isPresent: w,
            initial: !g.current || s ? void 0 : !1,
            custom: n,
            presenceAffectsLayout: c,
            mode: o,
            root: j,
            onExitComplete: w ? void 0 : z,
            anchorX: i,
            anchorY: m,
            children: C,
          },
          u,
        );
      }),
    });
  },
  V = me()(
    pe(
      (t) => ({
        currentStep: "create-collection",
        hasCompletedOnboarding: !1,
        firstCollectionId: null,
        setCurrentStep: (n) => t({ currentStep: n }),
        setFirstCollectionId: (n) => t({ firstCollectionId: n }),
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
function b({ icon: t, title: n, description: s, badge: a }) {
  return e.jsxs("div", {
    className:
      "flex flex-col h-full items-center text-center p-4 bg-card rounded-lg border-t",
    children: [
      e.jsx(se, { variant: "icon", children: t }),
      e.jsxs("div", {
        className: "space-y-2",
        children: [
          e.jsxs("div", {
            className: "flex items-center justify-center gap-2",
            children: [
              e.jsx(ne, { className: "text-base", children: n }),
              a &&
                e.jsx(O, {
                  variant: "secondary",
                  className: "text-xs",
                  children: a,
                }),
            ],
          }),
          e.jsx(ae, { className: "text-sm", children: s }),
        ],
      }),
    ],
  });
}
function $({ step: t, title: n, description: s, children: a, showSuccess: c }) {
  return e.jsxs(M.div, {
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
              e.jsx("h3", { className: "text-lg font-medium", children: n }),
              e.jsx("p", {
                className: "text-sm text-muted-foreground",
                children: s,
              }),
            ],
          }),
        ],
      }),
      e.jsx(Re, {
        mode: "wait",
        children: c
          ? e.jsx(
              M.div,
              {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.8 },
                transition: { duration: 0.3 },
                className: "flex justify-center py-8",
                children: e.jsx(ie, {}),
              },
              "success",
            )
          : e.jsx(
              M.div,
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
function Ie({ onSuccess: t }) {
  const [n, s] = r.useState(""),
    a = r.useRef(null),
    c = S.useUtils(),
    o = S.collections.create.useMutation({
      onSuccess: async (i) => {
        (await c.collections.getUserCollections.invalidate(),
          await c.collections.getCollectionsAndItemsCount.invalidate(),
          P.success("Collection created!"),
          s(""),
          t(i.id));
      },
      onError: (i) => {
        (console.error(i),
          P.error("Failed to create collection. Please try again."));
      },
    });
  r.useEffect(() => {
    a.current?.focus();
  }, []);
  const l = (i) => {
    (i.preventDefault(), n.trim() && o.mutate({ title: n.trim() }));
  };
  return e.jsxs("form", {
    onSubmit: l,
    className: "space-y-4",
    children: [
      e.jsxs("div", {
        className: "relative",
        children: [
          o.isPending &&
            e.jsx(K, {
              className:
                "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin",
            }),
          e.jsx(H, {
            ref: a,
            value: n,
            onChange: (i) => s(i.target.value),
            placeholder: "e.g., Reading List, Work Resources, Inspiration",
            disabled: o.isPending,
            className: o.isPending ? "pl-10" : "",
            "aria-label": "Collection name",
          }),
        ],
      }),
      e.jsx(D, {
        type: "submit",
        disabled: !n.trim() || o.isPending,
        className: "w-full",
        children: o.isPending ? "Creating..." : "Create Collection",
      }),
    ],
  });
}
function Pe({ collectionId: t, onSuccess: n }) {
  const [s, a] = r.useState(""),
    c = r.useRef(null),
    o = S.useUtils(),
    l = S.items.create.useMutation({
      onSuccess: async () => {
        (await o.collections.get.invalidate({ id: t }),
          await o.collections.getUserCollections.invalidate(),
          await o.collections.getCollectionsAndItemsCount.invalidate(),
          P.success("Item added successfully!"),
          a(""),
          n());
      },
      onError: (m) => {
        (console.error(m),
          P.error("Failed to add item. Please check the URL and try again."));
      },
    });
  r.useEffect(() => {
    c.current?.focus();
  }, []);
  const i = (m) => {
    (m.preventDefault(),
      s.trim() && l.mutate({ url: s.trim(), collectionId: t }));
  };
  return e.jsxs("form", {
    onSubmit: i,
    className: "space-y-4",
    children: [
      e.jsxs("div", {
        className: "relative",
        children: [
          l.isPending &&
            e.jsx(K, {
              className:
                "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin",
            }),
          e.jsx(H, {
            ref: c,
            value: s,
            onChange: (m) => a(m.target.value),
            placeholder: "Paste a URL",
            disabled: l.isPending,
            className: l.isPending ? "pl-10" : "",
            "aria-label": "Item URL",
          }),
        ],
      }),
      e.jsx("div", {
        className: "flex items-center gap-3",
        children: e.jsx(D, {
          type: "submit",
          disabled: !s.trim() || l.isPending,
          className: "flex-1",
          children: l.isPending ? "Adding..." : "Add Item",
        }),
      }),
      e.jsxs("p", {
        className: "text-xs text-muted-foreground text-center",
        children: [
          "Tip: Press ",
          e.jsx(oe, { children: "A" }),
          " anywhere to quickly add items",
        ],
      }),
    ],
  });
}
const ke = () => {
  const t = new Date().getHours();
  return t < 12 && t >= 5
    ? "Good morning"
    : t >= 12 && t < 17
      ? "Good afternoon"
      : t >= 17 && t < 21
        ? "Good evening"
        : "Good night";
};
function Ae() {
  const t = ke(),
    { data: n } = B.useSession(),
    s = n?.user.name?.split(" ")[0],
    {
      currentStep: a,
      firstCollectionId: c,
      setCurrentStep: o,
      setFirstCollectionId: l,
      completeOnboarding: i,
    } = V(),
    [m, j] = r.useState(!1),
    [p, h] = r.useState(!1),
    d = (y) => {
      (l(y),
        j(!0),
        setTimeout(() => {
          (j(!1), o("add-item"));
        }, 800));
    },
    x = () => {
      (h(!0),
        setTimeout(() => {
          i();
        }, 800));
    },
    g = () => {
      i();
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
                children: [s, "."],
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
      e.jsxs(W, {
        preset: "blur-slide",
        className:
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
        children: [
          e.jsx(b, {
            icon: e.jsx(ge, {}),
            title: "Organize with Collections",
            description: "Group related items by topic or project",
          }),
          e.jsx(b, {
            icon: e.jsx(ye, {}),
            title: "Capture Instantly",
            description: "Press 'A' anywhere to save",
          }),
          e.jsx(b, {
            icon: e.jsx(re, {}),
            title: "Find Anything",
            description: "Search across your brain",
          }),
          e.jsx(b, {
            icon: e.jsx(ce, {}),
            title: "Tag & Filter",
            description: "Categorize with tags",
          }),
          e.jsx(b, {
            icon: e.jsx(q, {}),
            title: "Save from Anywhere",
            description: "Use the browser extension",
          }),
          e.jsx(b, {
            icon: e.jsx(le, {}),
            title: "Share & Collaborate",
            description: "Invite team members",
          }),
        ],
      }),
      e.jsxs("div", {
        className: "space-y-8 max-w-2xl mx-auto",
        children: [
          a === "create-collection" &&
            e.jsx($, {
              step: 1,
              title: "Create your first collection",
              description:
                "Collections help you organize items by topic or project.",
              showSuccess: m,
              children: e.jsx(Ie, { onSuccess: d }),
            }),
          a === "add-item" &&
            c &&
            e.jsx($, {
              step: 2,
              title: "Add your first item",
              description: "Save a link to your new collection.",
              showSuccess: p,
              children: e.jsx(Pe, { collectionId: c, onSuccess: x }),
            }),
          e.jsx("div", {
            className: "flex justify-center",
            children: e.jsx(D, {
              variant: "ghost",
              size: "sm",
              onClick: g,
              children: "Skip for now",
            }),
          }),
        ],
      }),
    ],
  });
}
const Ee = r.lazy(() =>
    ue(
      () => import("./preview-dialog-9-eGinej.js"),
      __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7]),
    ),
  ),
  ze = (t) =>
    new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  Le = (t) => {
    try {
      return new URL(t).hostname.replace("www.", "");
    } catch {
      return t;
    }
  };
function Me({ item: t }) {
  const [n, s] = r.useState(!1);
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx("div", {
        onClick: () => s(!0),
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
                    : e.jsx(q, { className: "size-4 text-muted-foreground" }),
                  e.jsx("h3", {
                    className: "truncate max-w-[44ch]",
                    children: t.title,
                  }),
                  e.jsx("span", {
                    className: "text-xs text-muted-foreground",
                    children: Le(t.url),
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
                        O,
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
                    e.jsxs(O, {
                      variant: "secondary",
                      className: "text-xs",
                      children: ["+", t.tags.length - 3],
                    }),
                  e.jsx("span", {
                    className: "text-xs text-muted-foreground ml-auto",
                    children: ze(t.createdAt),
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      e.jsx(r.Suspense, {
        fallback: null,
        children: e.jsx(Ee, { open: n, onOpenChange: s, item: t }),
      }),
    ],
  });
}
function _e() {
  const t = de(),
    { data: n } = B.useSession(),
    s = n?.user.name?.split(" ")[0],
    { data: a, isLoading: c } = S.items.getRecents.useQuery({ limit: 3 }),
    { data: o } = S.collections.getCollectionsAndItemsCount.useQuery(),
    l = o?.reduce((h) => h + 1, 0),
    i = o?.reduce((h, d) => h + d.itemCount, 0);
  console.log({ counts: o });
  const { hasCompletedOnboarding: m } = V();
  return l === 0 && i === 0 && !m
    ? e.jsx(Ae, {})
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
                    children: [s, "."],
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
                    children: [i, " items"],
                  }),
                  " across",
                  " ",
                  e.jsxs("span", {
                    className: "text-foreground",
                    children: [l, " collections"],
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
                      e.jsx(xe, { className: "size-4 ml-1" }),
                    ],
                  }),
                }),
                e.jsx(W, {
                  preset: "slide-down",
                  className: "space-y-2",
                  children: c
                    ? e.jsx("div", {
                        className: "text-center py-8 text-muted-foreground",
                        children: "Loading...",
                      })
                    : a.map((h) => e.jsx(Me, { item: h }, h.id)),
                }),
              ],
            }),
        ],
      });
}
export { _e as default };
