import { j as e } from "./trpc-vendor-CLp1aBhv.js";
import { r as n } from "./react-vendor-nYV-xjaT.js";
import {
  c as T,
  t as S,
  u as M,
  e as g,
  I as A,
  k as E,
  j as t,
  l as $,
  m as q,
  T as B,
  n as Q,
  o as R,
  p as U,
  B as i,
  q as Y,
  C as z,
  D as G,
  f as H,
  g as I,
  h as P,
  r as D,
} from "./index-5ght4WFU.js";
import { L as p, c as O, C as J } from "./label-CUapH9Ip.js";
import { L as V } from "./api-keys-DL9zT8Yx.js";
import "./dnd-vendor-iOQT1T9p.js";
import "./select-BKmwFfg7.js";
const W = [
    ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
    ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }],
  ],
  X = T("check-check", W);
function Z({ onSuccess: o, onCancel: d }) {
  const [a, x] = n.useState(""),
    [l, r] = n.useState("collection_specific"),
    [c, m] = n.useState("never"),
    [h, b] = n.useState([]),
    [j, _] = n.useState(""),
    L = S.useUtils(),
    { data: f, isLoading: F } = M(),
    v = S.apiKeys.create.useMutation({
      onSuccess: (s) => {
        (o(s.key, l, h.length),
          L.apiKeys.list.invalidate(),
          g.success("API key created successfully!"));
      },
      onError: (s) => {
        g.error(s.message || "Failed to create API key");
      },
    }),
    C = n.useMemo(
      () =>
        f
          ? f.filter((s) => s.title.toLowerCase().includes(j.toLowerCase()))
          : [],
      [f, j],
    ),
    k = () => {
      if (!a.trim()) {
        g.error("Please enter a name for your API key");
        return;
      }
      const s =
        c === "never"
          ? void 0
          : c === "30d"
            ? 720 * 60 * 60
            : c === "90d"
              ? 2160 * 60 * 60
              : 365 * 24 * 60 * 60;
      v.mutate({
        name: a.trim(),
        mode: l,
        expiresIn: s,
        collectionIds: l === "collection_specific" ? h : void 0,
      });
    },
    w = (s) => {
      b((u) => (u.includes(s) ? u.filter((N) => N !== s) : [...u, s]));
    };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsxs("div", {
        className: "space-y-4 py-4",
        children: [
          e.jsxs("div", {
            className: "space-y-2",
            children: [
              e.jsx(p, { htmlFor: "name", children: "Name" }),
              e.jsx(A, {
                id: "name",
                placeholder: "e.g., Claude Desktop, Production Server",
                value: a,
                onChange: (s) => x(s.target.value),
                onKeyDown: (s) => s.key === "Enter" && k(),
              }),
              e.jsx("p", {
                className: "text-xs text-muted-foreground",
                children: "A descriptive name to identify this API key",
              }),
            ],
          }),
          e.jsxs("div", {
            className: "space-y-4",
            children: [
              e.jsx(p, { children: "Access Mode" }),
              e.jsxs("div", {
                className: "flex flex-col gap-4",
                children: [
                  e.jsxs("button", {
                    type: "button",
                    onClick: () => {
                      (r("full_access"), b([]));
                    },
                    className: `relative flex flex-col items-start gap-2 p-4 rounded-lg transition-colors text-left ${l === "full_access" && "border-b-3 border bg-primary/5"}`,
                    children: [
                      e.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          e.jsx(E, { className: "h-5 w-5" }),
                          e.jsx("p", {
                            className: "font-semibold",
                            children: "Full Access",
                          }),
                        ],
                      }),
                      e.jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children:
                          "Inherits all your collection permissions and can create new collections",
                      }),
                      e.jsxs("div", {
                        className: "flex flex-wrap gap-1 mt-1",
                        children: [
                          e.jsx(t, {
                            variant: "secondary",
                            className: "text-xs",
                            children: "All collections",
                          }),
                          e.jsx(t, {
                            variant: "secondary",
                            className: "text-xs",
                            children: "collection:create",
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs("button", {
                    type: "button",
                    onClick: () => r("collection_specific"),
                    className: `relative flex flex-col items-start gap-2 p-4 rounded-lg border transition-colors text-left ${l === "collection_specific" && "border-b-3 border bg-primary/5"}`,
                    children: [
                      e.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          e.jsx(V, { className: "h-5 w-5" }),
                          e.jsx("p", {
                            className: "font-semibold",
                            children: "Collection-Specific",
                          }),
                        ],
                      }),
                      e.jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children:
                          "Limited to collections you explicitly grant access to",
                      }),
                      e.jsxs("div", {
                        className: "flex flex-wrap gap-1 mt-1",
                        children: [
                          e.jsx(t, {
                            variant: "secondary",
                            className: "text-xs",
                            children: "collection:read",
                          }),
                          e.jsx(t, {
                            variant: "secondary",
                            className: "text-xs",
                            children: "item:add",
                          }),
                          e.jsx(t, {
                            variant: "secondary",
                            className: "text-xs",
                            children: "collection:view_members",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          l === "collection_specific" &&
            e.jsxs("div", {
              className: "space-y-4",
              children: [
                e.jsxs(p, {
                  children: [
                    "Select Collections",
                    " ",
                    e.jsxs("span", {
                      className: "text-muted-foreground",
                      children: ["(", h.length, ")"],
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className: "border rounded-lg",
                  children: [
                    e.jsxs("div", {
                      className: "relative border-b",
                      children: [
                        e.jsx($, {
                          className:
                            "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                        }),
                        e.jsx(A, {
                          placeholder: "Search collections...",
                          value: j,
                          onChange: (s) => _(s.target.value),
                          className: "border-0 pl-9",
                        }),
                      ],
                    }),
                    e.jsx(q, {
                      className: "h-60",
                      children: e.jsx("div", {
                        className: "p-2",
                        children: F
                          ? e.jsx("div", {
                              className:
                                "flex items-center justify-center py-8 text-sm text-muted-foreground",
                              children: "Loading collections...",
                            })
                          : C.length > 0
                            ? e.jsx("div", {
                                className: "space-y-1",
                                children: C.map((s) => {
                                  const u = s.isShared,
                                    N = s.role,
                                    K = O(N),
                                    y = u && !K;
                                  return e.jsx(
                                    B,
                                    {
                                      children: e.jsxs(Q, {
                                        children: [
                                          e.jsx(R, {
                                            asChild: !0,
                                            children: e.jsxs("div", {
                                              className: `flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors ${y ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`,
                                              onClick: () => !y && w(s.id),
                                              children: [
                                                e.jsx(J, {
                                                  checked: h.includes(s.id),
                                                  disabled: y,
                                                  onCheckedChange: () =>
                                                    w(s.id),
                                                }),
                                                e.jsx("div", {
                                                  className: "flex-1",
                                                  children: e.jsxs("div", {
                                                    className:
                                                      "flex items-center gap-2",
                                                    children: [
                                                      e.jsx("p", {
                                                        className:
                                                          "font-medium text-sm",
                                                        children: s.title,
                                                      }),
                                                      u &&
                                                        e.jsx(t, {
                                                          variant: "outline",
                                                          className: "text-xs",
                                                          children: "Shared",
                                                        }),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            }),
                                          }),
                                          y &&
                                            e.jsx(U, {
                                              children: e.jsx("p", {
                                                className: "text-xs",
                                                children:
                                                  "You need admin or owner role to grant API key access to this shared collection",
                                              }),
                                            }),
                                        ],
                                      }),
                                    },
                                    s.id,
                                  );
                                }),
                              })
                            : e.jsx("div", {
                                className:
                                  "text-center py-8 text-sm text-muted-foreground",
                                children: j
                                  ? "No collections found"
                                  : "No collections available",
                              }),
                      }),
                    }),
                  ],
                }),
              ],
            }),
          e.jsxs("div", {
            className: "space-y-2",
            children: [
              e.jsx(p, { children: "Expiration" }),
              e.jsxs("div", {
                className: "grid grid-cols-4 gap-2",
                children: [
                  e.jsx(i, {
                    type: "button",
                    variant: c === "30d" ? "secondary" : "outline",
                    onClick: () => m("30d"),
                    children: "30 days",
                  }),
                  e.jsx(i, {
                    type: "button",
                    variant: c === "90d" ? "secondary" : "outline",
                    onClick: () => m("90d"),
                    children: "90 days",
                  }),
                  e.jsx(i, {
                    type: "button",
                    variant: c === "1y" ? "secondary" : "outline",
                    onClick: () => m("1y"),
                    children: "1 year",
                  }),
                  e.jsx(i, {
                    type: "button",
                    variant: c === "never" ? "secondary" : "outline",
                    onClick: () => m("never"),
                    children: "Never",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "flex justify-end gap-2",
        children: [
          e.jsx(i, { variant: "outline", onClick: d, children: "Cancel" }),
          e.jsx(i, {
            onClick: k,
            disabled: v.isPending,
            children: v.isPending ? "Creating..." : "Create API Key",
          }),
        ],
      }),
    ],
  });
}
function ee({ apiKey: o, mode: d, collectionCount: a, onDone: x }) {
  const [l, r] = n.useState(!1),
    c = async () => {
      (await navigator.clipboard.writeText(o),
        r(!0),
        g.success("API key copied to clipboard!"),
        setTimeout(() => r(!1), 2e3));
    };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsxs("div", {
        className: "space-y-4 py-4",
        children: [
          e.jsxs("div", {
            className:
              "flex items-start gap-3 p-3 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20",
            children: [
              e.jsx(Y, {
                className:
                  "h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0",
              }),
              e.jsxs("p", {
                className: "text-sm text-amber-900 dark:text-amber-100",
                children: [
                  e.jsx("strong", { children: "Important:" }),
                  " Copy this key now and store it securely. For security reasons, you won't be able to view it again.",
                ],
              }),
            ],
          }),
          e.jsxs("div", {
            className: "space-y-2",
            children: [
              e.jsx(p, { children: "Your API Key" }),
              e.jsxs("div", {
                className:
                  "font-mono text-sm bg-muted p-4 rounded-lg border flex items-center justify-between gap-3",
                children: [
                  e.jsx("code", { className: "flex-1 break-all", children: o }),
                  e.jsx(i, {
                    size: "sm",
                    variant: "ghost",
                    onClick: c,
                    className: "flex-shrink-0",
                    children: l
                      ? e.jsx(X, { className: "h-4 w-4 text-green-600" })
                      : e.jsx(z, { className: "h-4 w-4" }),
                  }),
                ],
              }),
            ],
          }),
          e.jsxs("div", {
            className: "space-y-2",
            children: [
              e.jsx(p, { children: "Permissions" }),
              e.jsx("div", {
                className: "flex flex-wrap gap-2",
                children:
                  d === "full_access"
                    ? e.jsxs(e.Fragment, {
                        children: [
                          e.jsx(t, {
                            variant: "secondary",
                            children: "All your collections",
                          }),
                          e.jsx(t, {
                            variant: "secondary",
                            children: "collection:create",
                          }),
                          e.jsx(t, {
                            variant: "secondary",
                            children: "item:search",
                          }),
                        ],
                      })
                    : e.jsxs(e.Fragment, {
                        children: [
                          e.jsx(t, {
                            variant: "secondary",
                            children: "collection:read",
                          }),
                          e.jsx(t, {
                            variant: "secondary",
                            children: "item:add",
                          }),
                          e.jsx(t, {
                            variant: "secondary",
                            children: "collection:view_members",
                          }),
                        ],
                      }),
              }),
              e.jsx("p", {
                className: "text-xs text-muted-foreground",
                children:
                  d === "full_access"
                    ? "This key has access to all collections you can access"
                    : a > 0
                      ? `Granted access to ${a} collection${a === 1 ? "" : "s"}`
                      : "No collections selected - you can grant access later",
              }),
            ],
          }),
        ],
      }),
      e.jsx("div", {
        className: "flex justify-end",
        children: e.jsx(i, { onClick: x, children: "Done" }),
      }),
    ],
  });
}
function ie({ open: o, onOpenChange: d }) {
  const [a, x] = n.useState(null),
    l = (c, m, h) => {
      x({ key: c, mode: m, collectionCount: h });
    },
    r = () => {
      (x(null), d(!1));
    };
  return e.jsx(G, {
    open: o,
    onOpenChange: r,
    children: e.jsx(H, {
      className: "max-h-[90vh] overflow-y-auto",
      children: a
        ? e.jsxs(e.Fragment, {
            children: [
              e.jsxs(I, {
                children: [
                  e.jsx(P, { children: "API Key Created!" }),
                  e.jsx(D, {
                    children:
                      "Save this key now - you won't be able to see it again",
                  }),
                ],
              }),
              e.jsx(ee, {
                apiKey: a.key,
                mode: a.mode,
                collectionCount: a.collectionCount,
                onDone: r,
              }),
            ],
          })
        : e.jsxs(e.Fragment, {
            children: [
              e.jsxs(I, {
                children: [
                  e.jsx(P, { children: "Create API Key" }),
                  e.jsx(D, {
                    children:
                      "Create a new API key for accessing your collections via MCP and other integrations",
                  }),
                ],
              }),
              e.jsx(Z, { onSuccess: l, onCancel: r }),
            ],
          }),
    }),
  });
}
export { ie as CreateApiKeyDialog };
