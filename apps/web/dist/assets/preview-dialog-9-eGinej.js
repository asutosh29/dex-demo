import { j as e } from "./trpc-vendor-BRuMgTtf.js";
import {
  b,
  t as u,
  e as j,
  D as w,
  f as y,
  g as N,
  h as D,
  G as E,
  L as k,
  B as C,
  S as L,
  i as A,
  c as R,
  j as S,
} from "./index-pSmjkKS7.js";
import { r as v, L as F } from "./react-vendor-BNYpS37_.js";
import { E as p } from "./editable-field-BYIbmHje.js";
import "./dnd-vendor-DPteac_0.js";
import "./textarea-C-LGZX5X.js";
const M = ({ html: n, className: m = "" }) => {
  const a = v.useRef(null);
  return (
    v.useEffect(() => {
      if (!a.current || !n) return;
      const s = a.current;
      return (
        (s.innerHTML = n),
        s.querySelectorAll("iframe").forEach((r) => {
          ((r.style.maxWidth = "100%"),
            (r.style.width = "100%"),
            (r.style.height = "auto"),
            (r.style.aspectRatio = "16 / 9"));
        }),
        s.querySelectorAll("script").forEach((r) => {
          const o = document.createElement("script");
          (Array.from(r.attributes).forEach((c) => {
            o.setAttribute(c.name, c.value);
          }),
            r.textContent && (o.textContent = r.textContent),
            r.parentNode?.replaceChild(o, r));
        }),
        () => {
          s.innerHTML = "";
        }
      );
    }, [n]),
    e.jsx("div", {
      ref: a,
      className: `oembed-viewer ${m}`,
      style: {
        width: "100%",
        height: "100%",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      },
    })
  );
};
function P({ open: n, onOpenChange: m, item: a, collectionId: s }) {
  const { data: h } = b.useSession(),
    i = u.useUtils(),
    { data: r, isLoading: o } = u.ogp.getOembed.useQuery(
      { url: a.url },
      { enabled: n },
    ),
    { data: c } = u.ogp.canIframe.useQuery({ url: a.url }, { enabled: n }),
    f = h?.user?.id === a.creatorId,
    x = u.items.update.useMutation({
      onMutate: async (t) => {
        if (!s) return;
        await i.collections.get.cancel({ id: s });
        const d = i.collections.get.getData({ id: s });
        return (
          i.collections.get.setData(
            { id: s },
            (l) =>
              l && {
                ...l,
                items: l.items.map((g) => (g.id === a.id ? { ...g, ...t } : g)),
              },
          ),
          { previousData: d }
        );
      },
      onError: (t, d, l) => {
        (s &&
          l?.previousData &&
          i.collections.get.setData({ id: s }, l.previousData),
          j.error(t.message || "Failed to update item"));
      },
      onSettled: () => {
        s && i.collections.get.invalidate({ id: s });
      },
    });
  return e.jsx(w, {
    open: n,
    onOpenChange: m,
    children: e.jsxs(y, {
      className: "flex flex-col max-w-none! w-[80vw]",
      onEscapeKeyDown: (t) => {
        t.target.closest('[data-state="editing"]') && t.preventDefault();
      },
      children: [
        e.jsx(N, {
          children: e.jsxs(D, {
            className: "flex items-center gap-2 max-w-full",
            children: [
              a.favicon
                ? e.jsx("img", {
                    src: a.favicon,
                    alt: "favicon",
                    className: "size-5 shrink-0",
                  })
                : e.jsx(E, {
                    className: "size-5 text-muted-foreground shrink-0",
                  }),
              e.jsx(p, {
                type: "text",
                value: a.title || a.url,
                placeholder: "Enter title...",
                disabled: !f,
                className: "w-1/2",
                actions: "none",
                inputClassName: "text-lg",
                onSave: async (t) => {
                  await x.mutateAsync({ id: a.id, title: t });
                },
                children: (t) =>
                  e.jsx("span", { className: "truncate block", children: t }),
              }),
            ],
          }),
        }),
        e.jsxs("div", {
          className: "flex flex-col md:flex-row gap-4 h-[80vh]",
          children: [
            e.jsxs("div", {
              className:
                "basis-5/7 flex items-center justify-center overflow-auto bg-muted rounded-md relative",
              children: [
                o
                  ? e.jsx(k, {
                      className: "size-8 animate-spin text-muted-foreground",
                    })
                  : r?.html
                    ? e.jsx(M, {
                        html: r.html,
                        className: "max-h-full *:my-auto p-4",
                      })
                    : c
                      ? e.jsx("iframe", {
                          src: a.url,
                          title: a.title || "Preview",
                          className: "w-full h-full rounded-lg",
                        })
                      : a.image
                        ? e.jsx("img", {
                            src: a.image,
                            alt: a.title || "Preview Image",
                            className:
                              "max-w-full max-h-full object-contain rounded-lg p-4",
                          })
                        : e.jsx("div", {
                            className:
                              "flex items-center justify-center h-64 aspect-square border rounded-lg bg-muted",
                            children: e.jsx("p", {
                              className: "text-sm text-muted-foreground",
                              children: "No preview available",
                            }),
                          }),
                e.jsx("div", {
                  className: R(
                    "absolute bottom-0 w-full h-12 p-2",
                    "flex items-center gap-2",
                    "rounded-b-lg",
                    c &&
                      "bg-linear-to-t from-background/70 via-background/30 to-background/0 to-99%",
                  ),
                  children: e.jsx(F, {
                    to: a.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: e.jsxs(C, {
                      variant: "outline",
                      className:
                        "bg-background/50! backdrop-blur-2xl shadow-md cursor-pointer",
                      effect: "pop",
                      children: [e.jsx(L, {}), A(a.url), " "],
                    }),
                  }),
                }),
              ],
            }),
            e.jsxs("div", {
              className:
                "basis-2/7 overflow-y-auto overflow-x-hidden space-y-4 pr-2",
              children: [
                e.jsx(p, {
                  type: "multiline",
                  value: a.tldr || "",
                  label: "TL;DR",
                  placeholder: "Enter summary...",
                  disabled: !f,
                  onSave: async (t) => {
                    await x.mutateAsync({ id: a.id, tldr: t });
                  },
                  children: (t) =>
                    e.jsx("p", { className: "text-sm", children: t }),
                }),
                e.jsx(p, {
                  type: "tags",
                  value: a.tags || [],
                  label: "Tags",
                  disabled: !f,
                  onSave: async (t) => {
                    await x.mutateAsync({ id: a.id, tags: t });
                  },
                  children: (t) =>
                    e.jsx("div", {
                      className: "flex flex-row gap-2 flex-wrap",
                      children: t.map((d, l) =>
                        e.jsx(S, { variant: "secondary", children: d }, l),
                      ),
                    }),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
export { P as default };
