import { j as e } from "./trpc-vendor-CLp1aBhv.js";
import {
  b as y,
  t as u,
  e as w,
  D as N,
  f as D,
  g as E,
  h as k,
  G as C,
  L,
  B as A,
  S as R,
  i as S,
  a as F,
  j as M,
} from "./index-YxyRed48.js";
import { r as b, L as T } from "./react-vendor-nYV-xjaT.js";
import { E as p } from "./editable-field-weub1O0L.js";
import "./dnd-vendor-iOQT1T9p.js";
import "./textarea-CywMa2Jv.js";
const q = ({ html: l, className: m = "" }) => {
  const n = b.useRef(null);
  return (
    b.useEffect(() => {
      if (!n.current || !l) return;
      const s = n.current;
      return (
        (s.innerHTML = l),
        s.querySelectorAll("iframe").forEach((r) => {
          ((r.style.maxWidth = "100%"),
            (r.style.width = "100%"),
            (r.style.height = "auto"),
            (r.style.aspectRatio = "16 / 9"));
        }),
        s.querySelectorAll("script").forEach((r) => {
          const t = document.createElement("script");
          (Array.from(r.attributes).forEach((c) => {
            t.setAttribute(c.name, c.value);
          }),
            r.textContent && (t.textContent = r.textContent),
            r.parentNode?.replaceChild(t, r));
        }),
        () => {
          s.innerHTML = "";
        }
      );
    }, [l]),
    e.jsx("div", {
      ref: n,
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
function U({ open: l, onOpenChange: m, item: n, collectionId: s }) {
  const { data: h } = y.useSession(),
    o = u.useUtils(),
    { data: r } = u.collections.get.useQuery(
      { id: s ?? "" },
      { enabled: l && !!s },
    ),
    t = r?.items.find((a) => a.id === n.id) ?? n,
    { data: c, isLoading: j } = u.ogp.getOembed.useQuery(
      { url: t.url },
      { enabled: l },
    ),
    { data: v } = u.ogp.canIframe.useQuery({ url: t.url }, { enabled: l }),
    f = h?.user?.id === t.creatorId,
    x = u.items.update.useMutation({
      onMutate: async (a) => {
        if (!s) return;
        await o.collections.get.cancel({ id: s });
        const d = o.collections.get.getData({ id: s });
        return (
          o.collections.get.setData(
            { id: s },
            (i) =>
              i && {
                ...i,
                items: i.items.map((g) => (g.id === a.id ? { ...g, ...a } : g)),
              },
          ),
          { previousData: d }
        );
      },
      onError: (a, d, i) => {
        (s &&
          i?.previousData &&
          o.collections.get.setData({ id: s }, i.previousData),
          w.error(a.message || "Failed to update item"));
      },
      onSettled: () => {
        s && o.collections.get.invalidate({ id: s });
      },
    });
  return e.jsx(N, {
    open: l,
    onOpenChange: m,
    children: e.jsxs(D, {
      className: "flex flex-col max-w-none! w-[80vw]",
      onEscapeKeyDown: (a) => {
        a.target.closest('[data-state="editing"]') && a.preventDefault();
      },
      children: [
        e.jsx(E, {
          children: e.jsxs(k, {
            className: "flex items-center gap-2 max-w-full",
            children: [
              t.favicon
                ? e.jsx("img", {
                    src: t.favicon ?? void 0,
                    alt: "favicon",
                    className: "size-5 shrink-0",
                  })
                : e.jsx(C, {
                    className: "size-5 text-muted-foreground shrink-0",
                  }),
              e.jsx(p, {
                type: "text",
                value: t.title || t.url,
                placeholder: "Enter title...",
                disabled: !f,
                className: "w-1/2",
                actions: "none",
                inputClassName: "text-lg",
                onSave: async (a) => {
                  await x.mutateAsync({ id: t.id, title: a });
                },
                children: (a) =>
                  e.jsx("span", { className: "truncate block", children: a }),
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
                j
                  ? e.jsx(L, {
                      className: "size-8 animate-spin text-muted-foreground",
                    })
                  : c?.html
                    ? e.jsx(q, {
                        html: c.html,
                        className: "max-h-full *:my-auto p-4",
                      })
                    : v
                      ? e.jsx("iframe", {
                          src: t.url,
                          title: t.title || "Preview",
                          className: "w-full h-full rounded-lg",
                        })
                      : t.image
                        ? e.jsx("img", {
                            src: t.image,
                            alt: t.title || "Preview Image",
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
                  className: F(
                    "absolute bottom-0 w-full h-12 p-2",
                    "flex items-center gap-2",
                    "rounded-b-lg",
                    v &&
                      "bg-linear-to-t from-background/70 via-background/30 to-background/0 to-99%",
                  ),
                  children: e.jsx(T, {
                    to: t.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: e.jsxs(A, {
                      variant: "outline",
                      className:
                        "bg-background/50! backdrop-blur-2xl shadow-md cursor-pointer",
                      effect: "pop",
                      children: [e.jsx(R, {}), S(t.url), " "],
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
                  value: t.tldr || "",
                  label: "TL;DR",
                  placeholder: "Enter summary...",
                  disabled: !f,
                  onSave: async (a) => {
                    await x.mutateAsync({ id: t.id, tldr: a });
                  },
                  children: (a) =>
                    e.jsx("p", { className: "text-sm", children: a }),
                }),
                e.jsx(p, {
                  type: "tags",
                  value: t.tags || [],
                  label: "Tags",
                  disabled: !f,
                  onSave: async (a) => {
                    await x.mutateAsync({ id: t.id, tags: a });
                  },
                  children: (a) =>
                    e.jsx("div", {
                      className: "flex flex-row gap-2 flex-wrap",
                      children: a.map((d, i) =>
                        e.jsx(M, { variant: "secondary", children: d }, i),
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
export { U as default };
