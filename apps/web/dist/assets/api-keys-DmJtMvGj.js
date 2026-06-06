const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/create-api-key-dialog-Xc1SX7HA.js",
      "assets/trpc-vendor-BRuMgTtf.js",
      "assets/react-vendor-BNYpS37_.js",
      "assets/index-pheiOOBb.js",
      "assets/dnd-vendor-DPteac_0.js",
      "assets/index-C_VagNGU.css",
      "assets/label-45vqbBKw.js",
      "assets/select-Dp9TOn1v.js",
    ]),
) => i.map((i) => d[i]);
import {
  a as O,
  c as B,
  u as dt,
  t as A,
  D as Ae,
  f as Ne,
  g as De,
  h as Ee,
  r as Le,
  aO as Ge,
  j as $,
  l as ct,
  I as ce,
  m as gt,
  T as ft,
  n as pt,
  o as mt,
  p as ht,
  B as P,
  e as L,
  k as xt,
  aP as Y,
  aQ as ke,
  aR as He,
  aS as ze,
  aT as Z,
  aU as Oe,
  q as St,
  aV as vt,
  aW as Ct,
  aX as wt,
  aY as Rt,
  aZ as ne,
  a_ as _e,
  a$ as b,
  b0 as Fe,
  b1 as je,
  aF as Me,
  aG as $e,
  aH as Pe,
  b2 as yt,
  aN as _t,
} from "./index-pheiOOBb.js";
import { j as r } from "./trpc-vendor-BRuMgTtf.js";
import { r as _ } from "./react-vendor-BNYpS37_.js";
import {
  S as Te,
  a as Ke,
  b as Be,
  c as qe,
  d as k,
} from "./select-Dp9TOn1v.js";
import { c as Ft, C as jt, L as oe } from "./label-45vqbBKw.js";
const Mt = [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }],
  ],
  ge = O("arrow-up-down", Mt);
const $t = [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }],
  ],
  Ue = O("ellipsis-vertical", $t);
const Pt = [
    [
      "path",
      {
        d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
        key: "ct8e1f",
      },
    ],
    ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
    [
      "path",
      {
        d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
        key: "13bj9a",
      },
    ],
    ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ],
  It = O("eye-off", Pt);
const Vt = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  At = O("eye", Vt);
const Nt = [
    [
      "rect",
      {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2",
        key: "1w4ew1",
      },
    ],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
  ],
  Dt = O("lock", Nt);
const Et = [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu",
      },
    ],
  ],
  Lt = O("pen", Et);
const Gt = [
    ["path", { d: "M14 17H5", key: "gfn3mx" }],
    ["path", { d: "M19 7h-9", key: "6i9tg" }],
    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }],
  ],
  fe = O("settings-2", Gt);
function H(e, o) {
  return typeof e == "function" ? e(o) : e;
}
function I(e, o) {
  return (t) => {
    o.setState((n) => ({ ...n, [e]: H(t, n[e]) }));
  };
}
function te(e) {
  return e instanceof Function;
}
function kt(e) {
  return Array.isArray(e) && e.every((o) => typeof o == "number");
}
function Ht(e, o) {
  const t = [],
    n = (s) => {
      s.forEach((i) => {
        t.push(i);
        const a = o(i);
        a != null && a.length && n(a);
      });
    };
  return (n(e), t);
}
function v(e, o, t) {
  let n = [],
    s;
  return (i) => {
    let a;
    t.key && t.debug && (a = Date.now());
    const u = e(i);
    if (!(u.length !== n.length || u.some((p, x) => n[x] !== p))) return s;
    n = u;
    let c;
    if (
      (t.key && t.debug && (c = Date.now()),
      (s = o(...u)),
      t == null || t.onChange == null || t.onChange(s),
      t.key && t.debug && t != null && t.debug())
    ) {
      const p = Math.round((Date.now() - a) * 100) / 100,
        x = Math.round((Date.now() - c) * 100) / 100,
        f = x / 16,
        l = (g, h) => {
          for (g = String(g); g.length < h; ) g = " " + g;
          return g;
        };
      console.info(
        `%c⏱ ${l(x, 5)} /${l(p, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * f, 120))}deg 100% 31%);`,
        t?.key,
      );
    }
    return s;
  };
}
function C(e, o, t, n) {
  return {
    debug: () => {
      var s;
      return (s = e?.debugAll) != null ? s : e[o];
    },
    key: !1,
    onChange: n,
  };
}
function zt(e, o, t, n) {
  const s = () => {
      var a;
      return (a = i.getValue()) != null ? a : e.options.renderFallbackValue;
    },
    i = {
      id: `${o.id}_${t.id}`,
      row: o,
      column: t,
      getValue: () => o.getValue(n),
      renderValue: s,
      getContext: v(
        () => [e, t, o, i],
        (a, u, d, c) => ({
          table: a,
          column: u,
          row: d,
          cell: c,
          getValue: c.getValue,
          renderValue: c.renderValue,
        }),
        C(e.options, "debugCells"),
      ),
    };
  return (
    e._features.forEach((a) => {
      a.createCell == null || a.createCell(i, t, o, e);
    }, {}),
    i
  );
}
function Ot(e, o, t, n) {
  var s, i;
  const u = { ...e._getDefaultColumnDef(), ...o },
    d = u.accessorKey;
  let c =
      (s =
        (i = u.id) != null
          ? i
          : d
            ? typeof String.prototype.replaceAll == "function"
              ? d.replaceAll(".", "_")
              : d.replace(/\./g, "_")
            : void 0) != null
        ? s
        : typeof u.header == "string"
          ? u.header
          : void 0,
    p;
  if (
    (u.accessorFn
      ? (p = u.accessorFn)
      : d &&
        (d.includes(".")
          ? (p = (f) => {
              let l = f;
              for (const h of d.split(".")) {
                var g;
                l = (g = l) == null ? void 0 : g[h];
              }
              return l;
            })
          : (p = (f) => f[u.accessorKey])),
    !c)
  )
    throw new Error();
  let x = {
    id: `${String(c)}`,
    accessorFn: p,
    parent: n,
    depth: t,
    columnDef: u,
    columns: [],
    getFlatColumns: v(
      () => [!0],
      () => {
        var f;
        return [
          x,
          ...((f = x.columns) == null
            ? void 0
            : f.flatMap((l) => l.getFlatColumns())),
        ];
      },
      C(e.options, "debugColumns"),
    ),
    getLeafColumns: v(
      () => [e._getOrderColumnsFn()],
      (f) => {
        var l;
        if ((l = x.columns) != null && l.length) {
          let g = x.columns.flatMap((h) => h.getLeafColumns());
          return f(g);
        }
        return [x];
      },
      C(e.options, "debugColumns"),
    ),
  };
  for (const f of e._features) f.createColumn == null || f.createColumn(x, e);
  return x;
}
const j = "debugHeaders";
function Ie(e, o, t) {
  var n;
  let i = {
    id: (n = t.id) != null ? n : o.id,
    column: o,
    index: t.index,
    isPlaceholder: !!t.isPlaceholder,
    placeholderId: t.placeholderId,
    depth: t.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const a = [],
        u = (d) => {
          (d.subHeaders && d.subHeaders.length && d.subHeaders.map(u),
            a.push(d));
        };
      return (u(i), a);
    },
    getContext: () => ({ table: e, header: i, column: o }),
  };
  return (
    e._features.forEach((a) => {
      a.createHeader == null || a.createHeader(i, e);
    }),
    i
  );
}
const Tt = {
  createTable: (e) => {
    ((e.getHeaderGroups = v(
      () => [
        e.getAllColumns(),
        e.getVisibleLeafColumns(),
        e.getState().columnPinning.left,
        e.getState().columnPinning.right,
      ],
      (o, t, n, s) => {
        var i, a;
        const u =
            (i = n?.map((x) => t.find((f) => f.id === x)).filter(Boolean)) !=
            null
              ? i
              : [],
          d =
            (a = s?.map((x) => t.find((f) => f.id === x)).filter(Boolean)) !=
            null
              ? a
              : [],
          c = t.filter(
            (x) =>
              !(n != null && n.includes(x.id)) &&
              !(s != null && s.includes(x.id)),
          );
        return X(o, [...u, ...c, ...d], e);
      },
      C(e.options, j),
    )),
      (e.getCenterHeaderGroups = v(
        () => [
          e.getAllColumns(),
          e.getVisibleLeafColumns(),
          e.getState().columnPinning.left,
          e.getState().columnPinning.right,
        ],
        (o, t, n, s) => (
          (t = t.filter(
            (i) =>
              !(n != null && n.includes(i.id)) &&
              !(s != null && s.includes(i.id)),
          )),
          X(o, t, e, "center")
        ),
        C(e.options, j),
      )),
      (e.getLeftHeaderGroups = v(
        () => [
          e.getAllColumns(),
          e.getVisibleLeafColumns(),
          e.getState().columnPinning.left,
        ],
        (o, t, n) => {
          var s;
          const i =
            (s = n?.map((a) => t.find((u) => u.id === a)).filter(Boolean)) !=
            null
              ? s
              : [];
          return X(o, i, e, "left");
        },
        C(e.options, j),
      )),
      (e.getRightHeaderGroups = v(
        () => [
          e.getAllColumns(),
          e.getVisibleLeafColumns(),
          e.getState().columnPinning.right,
        ],
        (o, t, n) => {
          var s;
          const i =
            (s = n?.map((a) => t.find((u) => u.id === a)).filter(Boolean)) !=
            null
              ? s
              : [];
          return X(o, i, e, "right");
        },
        C(e.options, j),
      )),
      (e.getFooterGroups = v(
        () => [e.getHeaderGroups()],
        (o) => [...o].reverse(),
        C(e.options, j),
      )),
      (e.getLeftFooterGroups = v(
        () => [e.getLeftHeaderGroups()],
        (o) => [...o].reverse(),
        C(e.options, j),
      )),
      (e.getCenterFooterGroups = v(
        () => [e.getCenterHeaderGroups()],
        (o) => [...o].reverse(),
        C(e.options, j),
      )),
      (e.getRightFooterGroups = v(
        () => [e.getRightHeaderGroups()],
        (o) => [...o].reverse(),
        C(e.options, j),
      )),
      (e.getFlatHeaders = v(
        () => [e.getHeaderGroups()],
        (o) => o.map((t) => t.headers).flat(),
        C(e.options, j),
      )),
      (e.getLeftFlatHeaders = v(
        () => [e.getLeftHeaderGroups()],
        (o) => o.map((t) => t.headers).flat(),
        C(e.options, j),
      )),
      (e.getCenterFlatHeaders = v(
        () => [e.getCenterHeaderGroups()],
        (o) => o.map((t) => t.headers).flat(),
        C(e.options, j),
      )),
      (e.getRightFlatHeaders = v(
        () => [e.getRightHeaderGroups()],
        (o) => o.map((t) => t.headers).flat(),
        C(e.options, j),
      )),
      (e.getCenterLeafHeaders = v(
        () => [e.getCenterFlatHeaders()],
        (o) =>
          o.filter((t) => {
            var n;
            return !((n = t.subHeaders) != null && n.length);
          }),
        C(e.options, j),
      )),
      (e.getLeftLeafHeaders = v(
        () => [e.getLeftFlatHeaders()],
        (o) =>
          o.filter((t) => {
            var n;
            return !((n = t.subHeaders) != null && n.length);
          }),
        C(e.options, j),
      )),
      (e.getRightLeafHeaders = v(
        () => [e.getRightFlatHeaders()],
        (o) =>
          o.filter((t) => {
            var n;
            return !((n = t.subHeaders) != null && n.length);
          }),
        C(e.options, j),
      )),
      (e.getLeafHeaders = v(
        () => [
          e.getLeftHeaderGroups(),
          e.getCenterHeaderGroups(),
          e.getRightHeaderGroups(),
        ],
        (o, t, n) => {
          var s, i, a, u, d, c;
          return [
            ...((s = (i = o[0]) == null ? void 0 : i.headers) != null ? s : []),
            ...((a = (u = t[0]) == null ? void 0 : u.headers) != null ? a : []),
            ...((d = (c = n[0]) == null ? void 0 : c.headers) != null ? d : []),
          ]
            .map((p) => p.getLeafHeaders())
            .flat();
        },
        C(e.options, j),
      )));
  },
};
function X(e, o, t, n) {
  var s, i;
  let a = 0;
  const u = function (f, l) {
    (l === void 0 && (l = 1),
      (a = Math.max(a, l)),
      f
        .filter((g) => g.getIsVisible())
        .forEach((g) => {
          var h;
          (h = g.columns) != null && h.length && u(g.columns, l + 1);
        }, 0));
  };
  u(e);
  let d = [];
  const c = (f, l) => {
      const g = {
          depth: l,
          id: [n, `${l}`].filter(Boolean).join("_"),
          headers: [],
        },
        h = [];
      (f.forEach((m) => {
        const S = [...h].reverse()[0],
          R = m.column.depth === g.depth;
        let w,
          V = !1;
        if (
          (R && m.column.parent
            ? (w = m.column.parent)
            : ((w = m.column), (V = !0)),
          S && S?.column === w)
        )
          S.subHeaders.push(m);
        else {
          const y = Ie(t, w, {
            id: [n, l, w.id, m?.id].filter(Boolean).join("_"),
            isPlaceholder: V,
            placeholderId: V
              ? `${h.filter((F) => F.column === w).length}`
              : void 0,
            depth: l,
            index: h.length,
          });
          (y.subHeaders.push(m), h.push(y));
        }
        (g.headers.push(m), (m.headerGroup = g));
      }),
        d.push(g),
        l > 0 && c(h, l - 1));
    },
    p = o.map((f, l) => Ie(t, f, { depth: a, index: l }));
  (c(p, a - 1), d.reverse());
  const x = (f) =>
    f
      .filter((g) => g.column.getIsVisible())
      .map((g) => {
        let h = 0,
          m = 0,
          S = [0];
        g.subHeaders && g.subHeaders.length
          ? ((S = []),
            x(g.subHeaders).forEach((w) => {
              let { colSpan: V, rowSpan: y } = w;
              ((h += V), S.push(y));
            }))
          : (h = 1);
        const R = Math.min(...S);
        return (
          (m = m + R),
          (g.colSpan = h),
          (g.rowSpan = m),
          { colSpan: h, rowSpan: m }
        );
      });
  return (x((s = (i = d[0]) == null ? void 0 : i.headers) != null ? s : []), d);
}
const ve = (e, o, t, n, s, i, a) => {
    let u = {
      id: o,
      index: n,
      original: t,
      depth: s,
      parentId: a,
      _valuesCache: {},
      _uniqueValuesCache: {},
      getValue: (d) => {
        if (u._valuesCache.hasOwnProperty(d)) return u._valuesCache[d];
        const c = e.getColumn(d);
        if (c != null && c.accessorFn)
          return (
            (u._valuesCache[d] = c.accessorFn(u.original, n)),
            u._valuesCache[d]
          );
      },
      getUniqueValues: (d) => {
        if (u._uniqueValuesCache.hasOwnProperty(d))
          return u._uniqueValuesCache[d];
        const c = e.getColumn(d);
        if (c != null && c.accessorFn)
          return c.columnDef.getUniqueValues
            ? ((u._uniqueValuesCache[d] = c.columnDef.getUniqueValues(
                u.original,
                n,
              )),
              u._uniqueValuesCache[d])
            : ((u._uniqueValuesCache[d] = [u.getValue(d)]),
              u._uniqueValuesCache[d]);
      },
      renderValue: (d) => {
        var c;
        return (c = u.getValue(d)) != null ? c : e.options.renderFallbackValue;
      },
      subRows: [],
      getLeafRows: () => Ht(u.subRows, (d) => d.subRows),
      getParentRow: () => (u.parentId ? e.getRow(u.parentId, !0) : void 0),
      getParentRows: () => {
        let d = [],
          c = u;
        for (;;) {
          const p = c.getParentRow();
          if (!p) break;
          (d.push(p), (c = p));
        }
        return d.reverse();
      },
      getAllCells: v(
        () => [e.getAllLeafColumns()],
        (d) => d.map((c) => zt(e, u, c, c.id)),
        C(e.options, "debugRows"),
      ),
      _getAllCellsByColumnId: v(
        () => [u.getAllCells()],
        (d) => d.reduce((c, p) => ((c[p.column.id] = p), c), {}),
        C(e.options, "debugRows"),
      ),
    };
    for (let d = 0; d < e._features.length; d++) {
      const c = e._features[d];
      c == null || c.createRow == null || c.createRow(u, e);
    }
    return u;
  },
  Kt = {
    createColumn: (e, o) => {
      ((e._getFacetedRowModel =
        o.options.getFacetedRowModel && o.options.getFacetedRowModel(o, e.id)),
        (e.getFacetedRowModel = () =>
          e._getFacetedRowModel
            ? e._getFacetedRowModel()
            : o.getPreFilteredRowModel()),
        (e._getFacetedUniqueValues =
          o.options.getFacetedUniqueValues &&
          o.options.getFacetedUniqueValues(o, e.id)),
        (e.getFacetedUniqueValues = () =>
          e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : new Map()),
        (e._getFacetedMinMaxValues =
          o.options.getFacetedMinMaxValues &&
          o.options.getFacetedMinMaxValues(o, e.id)),
        (e.getFacetedMinMaxValues = () => {
          if (e._getFacetedMinMaxValues) return e._getFacetedMinMaxValues();
        }));
    },
  },
  be = (e, o, t) => {
    var n, s;
    const i =
      t == null || (n = t.toString()) == null ? void 0 : n.toLowerCase();
    return !!(
      !(
        (s = e.getValue(o)) == null ||
        (s = s.toString()) == null ||
        (s = s.toLowerCase()) == null
      ) && s.includes(i)
    );
  };
be.autoRemove = (e) => D(e);
const Xe = (e, o, t) => {
  var n;
  return !!(
    !((n = e.getValue(o)) == null || (n = n.toString()) == null) &&
    n.includes(t)
  );
};
Xe.autoRemove = (e) => D(e);
const Qe = (e, o, t) => {
  var n;
  return (
    ((n = e.getValue(o)) == null || (n = n.toString()) == null
      ? void 0
      : n.toLowerCase()) === t?.toLowerCase()
  );
};
Qe.autoRemove = (e) => D(e);
const We = (e, o, t) => {
  var n;
  return (n = e.getValue(o)) == null ? void 0 : n.includes(t);
};
We.autoRemove = (e) => D(e);
const Ye = (e, o, t) =>
  !t.some((n) => {
    var s;
    return !((s = e.getValue(o)) != null && s.includes(n));
  });
Ye.autoRemove = (e) => D(e) || !(e != null && e.length);
const Ze = (e, o, t) =>
  t.some((n) => {
    var s;
    return (s = e.getValue(o)) == null ? void 0 : s.includes(n);
  });
Ze.autoRemove = (e) => D(e) || !(e != null && e.length);
const Je = (e, o, t) => e.getValue(o) === t;
Je.autoRemove = (e) => D(e);
const et = (e, o, t) => e.getValue(o) == t;
et.autoRemove = (e) => D(e);
const Ce = (e, o, t) => {
  let [n, s] = t;
  const i = e.getValue(o);
  return i >= n && i <= s;
};
Ce.resolveFilterValue = (e) => {
  let [o, t] = e,
    n = typeof o != "number" ? parseFloat(o) : o,
    s = typeof t != "number" ? parseFloat(t) : t,
    i = o === null || Number.isNaN(n) ? -1 / 0 : n,
    a = t === null || Number.isNaN(s) ? 1 / 0 : s;
  if (i > a) {
    const u = i;
    ((i = a), (a = u));
  }
  return [i, a];
};
Ce.autoRemove = (e) => D(e) || (D(e[0]) && D(e[1]));
const E = {
  includesString: be,
  includesStringSensitive: Xe,
  equalsString: Qe,
  arrIncludes: We,
  arrIncludesAll: Ye,
  arrIncludesSome: Ze,
  equals: Je,
  weakEquals: et,
  inNumberRange: Ce,
};
function D(e) {
  return e == null || e === "";
}
const Bt = {
  getDefaultColumnDef: () => ({ filterFn: "auto" }),
  getInitialState: (e) => ({ columnFilters: [], ...e }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: I("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100,
  }),
  createColumn: (e, o) => {
    ((e.getAutoFilterFn = () => {
      const t = o.getCoreRowModel().flatRows[0],
        n = t?.getValue(e.id);
      return typeof n == "string"
        ? E.includesString
        : typeof n == "number"
          ? E.inNumberRange
          : typeof n == "boolean" || (n !== null && typeof n == "object")
            ? E.equals
            : Array.isArray(n)
              ? E.arrIncludes
              : E.weakEquals;
    }),
      (e.getFilterFn = () => {
        var t, n;
        return te(e.columnDef.filterFn)
          ? e.columnDef.filterFn
          : e.columnDef.filterFn === "auto"
            ? e.getAutoFilterFn()
            : (t =
                  (n = o.options.filterFns) == null
                    ? void 0
                    : n[e.columnDef.filterFn]) != null
              ? t
              : E[e.columnDef.filterFn];
      }),
      (e.getCanFilter = () => {
        var t, n, s;
        return (
          ((t = e.columnDef.enableColumnFilter) != null ? t : !0) &&
          ((n = o.options.enableColumnFilters) != null ? n : !0) &&
          ((s = o.options.enableFilters) != null ? s : !0) &&
          !!e.accessorFn
        );
      }),
      (e.getIsFiltered = () => e.getFilterIndex() > -1),
      (e.getFilterValue = () => {
        var t;
        return (t = o.getState().columnFilters) == null ||
          (t = t.find((n) => n.id === e.id)) == null
          ? void 0
          : t.value;
      }),
      (e.getFilterIndex = () => {
        var t, n;
        return (t =
          (n = o.getState().columnFilters) == null
            ? void 0
            : n.findIndex((s) => s.id === e.id)) != null
          ? t
          : -1;
      }),
      (e.setFilterValue = (t) => {
        o.setColumnFilters((n) => {
          const s = e.getFilterFn(),
            i = n?.find((p) => p.id === e.id),
            a = H(t, i ? i.value : void 0);
          if (Ve(s, a, e)) {
            var u;
            return (u = n?.filter((p) => p.id !== e.id)) != null ? u : [];
          }
          const d = { id: e.id, value: a };
          if (i) {
            var c;
            return (c = n?.map((p) => (p.id === e.id ? d : p))) != null
              ? c
              : [];
          }
          return n != null && n.length ? [...n, d] : [d];
        });
      }));
  },
  createRow: (e, o) => {
    ((e.columnFilters = {}), (e.columnFiltersMeta = {}));
  },
  createTable: (e) => {
    ((e.setColumnFilters = (o) => {
      const t = e.getAllLeafColumns(),
        n = (s) => {
          var i;
          return (i = H(o, s)) == null
            ? void 0
            : i.filter((a) => {
                const u = t.find((d) => d.id === a.id);
                if (u) {
                  const d = u.getFilterFn();
                  if (Ve(d, a.value, u)) return !1;
                }
                return !0;
              });
        };
      e.options.onColumnFiltersChange == null ||
        e.options.onColumnFiltersChange(n);
    }),
      (e.resetColumnFilters = (o) => {
        var t, n;
        e.setColumnFilters(
          o
            ? []
            : (t = (n = e.initialState) == null ? void 0 : n.columnFilters) !=
                null
              ? t
              : [],
        );
      }),
      (e.getPreFilteredRowModel = () => e.getCoreRowModel()),
      (e.getFilteredRowModel = () => (
        !e._getFilteredRowModel &&
          e.options.getFilteredRowModel &&
          (e._getFilteredRowModel = e.options.getFilteredRowModel(e)),
        e.options.manualFiltering || !e._getFilteredRowModel
          ? e.getPreFilteredRowModel()
          : e._getFilteredRowModel()
      )));
  },
};
function Ve(e, o, t) {
  return (
    (e && e.autoRemove ? e.autoRemove(o, t) : !1) ||
    typeof o > "u" ||
    (typeof o == "string" && !o)
  );
}
const qt = (e, o, t) =>
    t.reduce((n, s) => {
      const i = s.getValue(e);
      return n + (typeof i == "number" ? i : 0);
    }, 0),
  Ut = (e, o, t) => {
    let n;
    return (
      t.forEach((s) => {
        const i = s.getValue(e);
        i != null && (n > i || (n === void 0 && i >= i)) && (n = i);
      }),
      n
    );
  },
  bt = (e, o, t) => {
    let n;
    return (
      t.forEach((s) => {
        const i = s.getValue(e);
        i != null && (n < i || (n === void 0 && i >= i)) && (n = i);
      }),
      n
    );
  },
  Xt = (e, o, t) => {
    let n, s;
    return (
      t.forEach((i) => {
        const a = i.getValue(e);
        a != null &&
          (n === void 0
            ? a >= a && (n = s = a)
            : (n > a && (n = a), s < a && (s = a)));
      }),
      [n, s]
    );
  },
  Qt = (e, o) => {
    let t = 0,
      n = 0;
    if (
      (o.forEach((s) => {
        let i = s.getValue(e);
        i != null && (i = +i) >= i && (++t, (n += i));
      }),
      t)
    )
      return n / t;
  },
  Wt = (e, o) => {
    if (!o.length) return;
    const t = o.map((i) => i.getValue(e));
    if (!kt(t)) return;
    if (t.length === 1) return t[0];
    const n = Math.floor(t.length / 2),
      s = t.sort((i, a) => i - a);
    return t.length % 2 !== 0 ? s[n] : (s[n - 1] + s[n]) / 2;
  },
  Yt = (e, o) => Array.from(new Set(o.map((t) => t.getValue(e))).values()),
  Zt = (e, o) => new Set(o.map((t) => t.getValue(e))).size,
  Jt = (e, o) => o.length,
  se = {
    sum: qt,
    min: Ut,
    max: bt,
    extent: Xt,
    mean: Qt,
    median: Wt,
    unique: Yt,
    uniqueCount: Zt,
    count: Jt,
  },
  en = {
    getDefaultColumnDef: () => ({
      aggregatedCell: (e) => {
        var o, t;
        return (o =
          (t = e.getValue()) == null || t.toString == null
            ? void 0
            : t.toString()) != null
          ? o
          : null;
      },
      aggregationFn: "auto",
    }),
    getInitialState: (e) => ({ grouping: [], ...e }),
    getDefaultOptions: (e) => ({
      onGroupingChange: I("grouping", e),
      groupedColumnMode: "reorder",
    }),
    createColumn: (e, o) => {
      ((e.toggleGrouping = () => {
        o.setGrouping((t) =>
          t != null && t.includes(e.id)
            ? t.filter((n) => n !== e.id)
            : [...(t ?? []), e.id],
        );
      }),
        (e.getCanGroup = () => {
          var t, n;
          return (
            ((t = e.columnDef.enableGrouping) != null ? t : !0) &&
            ((n = o.options.enableGrouping) != null ? n : !0) &&
            (!!e.accessorFn || !!e.columnDef.getGroupingValue)
          );
        }),
        (e.getIsGrouped = () => {
          var t;
          return (t = o.getState().grouping) == null
            ? void 0
            : t.includes(e.id);
        }),
        (e.getGroupedIndex = () => {
          var t;
          return (t = o.getState().grouping) == null ? void 0 : t.indexOf(e.id);
        }),
        (e.getToggleGroupingHandler = () => {
          const t = e.getCanGroup();
          return () => {
            t && e.toggleGrouping();
          };
        }),
        (e.getAutoAggregationFn = () => {
          const t = o.getCoreRowModel().flatRows[0],
            n = t?.getValue(e.id);
          if (typeof n == "number") return se.sum;
          if (Object.prototype.toString.call(n) === "[object Date]")
            return se.extent;
        }),
        (e.getAggregationFn = () => {
          var t, n;
          if (!e) throw new Error();
          return te(e.columnDef.aggregationFn)
            ? e.columnDef.aggregationFn
            : e.columnDef.aggregationFn === "auto"
              ? e.getAutoAggregationFn()
              : (t =
                    (n = o.options.aggregationFns) == null
                      ? void 0
                      : n[e.columnDef.aggregationFn]) != null
                ? t
                : se[e.columnDef.aggregationFn];
        }));
    },
    createTable: (e) => {
      ((e.setGrouping = (o) =>
        e.options.onGroupingChange == null
          ? void 0
          : e.options.onGroupingChange(o)),
        (e.resetGrouping = (o) => {
          var t, n;
          e.setGrouping(
            o
              ? []
              : (t = (n = e.initialState) == null ? void 0 : n.grouping) != null
                ? t
                : [],
          );
        }),
        (e.getPreGroupedRowModel = () => e.getFilteredRowModel()),
        (e.getGroupedRowModel = () => (
          !e._getGroupedRowModel &&
            e.options.getGroupedRowModel &&
            (e._getGroupedRowModel = e.options.getGroupedRowModel(e)),
          e.options.manualGrouping || !e._getGroupedRowModel
            ? e.getPreGroupedRowModel()
            : e._getGroupedRowModel()
        )));
    },
    createRow: (e, o) => {
      ((e.getIsGrouped = () => !!e.groupingColumnId),
        (e.getGroupingValue = (t) => {
          if (e._groupingValuesCache.hasOwnProperty(t))
            return e._groupingValuesCache[t];
          const n = o.getColumn(t);
          return n != null && n.columnDef.getGroupingValue
            ? ((e._groupingValuesCache[t] = n.columnDef.getGroupingValue(
                e.original,
              )),
              e._groupingValuesCache[t])
            : e.getValue(t);
        }),
        (e._groupingValuesCache = {}));
    },
    createCell: (e, o, t, n) => {
      ((e.getIsGrouped = () => o.getIsGrouped() && o.id === t.groupingColumnId),
        (e.getIsPlaceholder = () => !e.getIsGrouped() && o.getIsGrouped()),
        (e.getIsAggregated = () => {
          var s;
          return (
            !e.getIsGrouped() &&
            !e.getIsPlaceholder() &&
            !!((s = t.subRows) != null && s.length)
          );
        }));
    },
  };
function tn(e, o, t) {
  if (!(o != null && o.length) || !t) return e;
  const n = e.filter((i) => !o.includes(i.id));
  return t === "remove"
    ? n
    : [...o.map((i) => e.find((a) => a.id === i)).filter(Boolean), ...n];
}
const nn = {
    getInitialState: (e) => ({ columnOrder: [], ...e }),
    getDefaultOptions: (e) => ({ onColumnOrderChange: I("columnOrder", e) }),
    createColumn: (e, o) => {
      ((e.getIndex = v(
        (t) => [U(o, t)],
        (t) => t.findIndex((n) => n.id === e.id),
        C(o.options, "debugColumns"),
      )),
        (e.getIsFirstColumn = (t) => {
          var n;
          return ((n = U(o, t)[0]) == null ? void 0 : n.id) === e.id;
        }),
        (e.getIsLastColumn = (t) => {
          var n;
          const s = U(o, t);
          return ((n = s[s.length - 1]) == null ? void 0 : n.id) === e.id;
        }));
    },
    createTable: (e) => {
      ((e.setColumnOrder = (o) =>
        e.options.onColumnOrderChange == null
          ? void 0
          : e.options.onColumnOrderChange(o)),
        (e.resetColumnOrder = (o) => {
          var t;
          e.setColumnOrder(
            o ? [] : (t = e.initialState.columnOrder) != null ? t : [],
          );
        }),
        (e._getOrderColumnsFn = v(
          () => [
            e.getState().columnOrder,
            e.getState().grouping,
            e.options.groupedColumnMode,
          ],
          (o, t, n) => (s) => {
            let i = [];
            if (!(o != null && o.length)) i = s;
            else {
              const a = [...o],
                u = [...s];
              for (; u.length && a.length; ) {
                const d = a.shift(),
                  c = u.findIndex((p) => p.id === d);
                c > -1 && i.push(u.splice(c, 1)[0]);
              }
              i = [...i, ...u];
            }
            return tn(i, t, n);
          },
          C(e.options, "debugTable"),
        )));
    },
  },
  ie = () => ({ left: [], right: [] }),
  on = {
    getInitialState: (e) => ({ columnPinning: ie(), ...e }),
    getDefaultOptions: (e) => ({
      onColumnPinningChange: I("columnPinning", e),
    }),
    createColumn: (e, o) => {
      ((e.pin = (t) => {
        const n = e
          .getLeafColumns()
          .map((s) => s.id)
          .filter(Boolean);
        o.setColumnPinning((s) => {
          var i, a;
          if (t === "right") {
            var u, d;
            return {
              left: ((u = s?.left) != null ? u : []).filter(
                (x) => !(n != null && n.includes(x)),
              ),
              right: [
                ...((d = s?.right) != null ? d : []).filter(
                  (x) => !(n != null && n.includes(x)),
                ),
                ...n,
              ],
            };
          }
          if (t === "left") {
            var c, p;
            return {
              left: [
                ...((c = s?.left) != null ? c : []).filter(
                  (x) => !(n != null && n.includes(x)),
                ),
                ...n,
              ],
              right: ((p = s?.right) != null ? p : []).filter(
                (x) => !(n != null && n.includes(x)),
              ),
            };
          }
          return {
            left: ((i = s?.left) != null ? i : []).filter(
              (x) => !(n != null && n.includes(x)),
            ),
            right: ((a = s?.right) != null ? a : []).filter(
              (x) => !(n != null && n.includes(x)),
            ),
          };
        });
      }),
        (e.getCanPin = () =>
          e.getLeafColumns().some((n) => {
            var s, i, a;
            return (
              ((s = n.columnDef.enablePinning) != null ? s : !0) &&
              ((i =
                (a = o.options.enableColumnPinning) != null
                  ? a
                  : o.options.enablePinning) != null
                ? i
                : !0)
            );
          })),
        (e.getIsPinned = () => {
          const t = e.getLeafColumns().map((u) => u.id),
            { left: n, right: s } = o.getState().columnPinning,
            i = t.some((u) => n?.includes(u)),
            a = t.some((u) => s?.includes(u));
          return i ? "left" : a ? "right" : !1;
        }),
        (e.getPinnedIndex = () => {
          var t, n;
          const s = e.getIsPinned();
          return s
            ? (t =
                (n = o.getState().columnPinning) == null || (n = n[s]) == null
                  ? void 0
                  : n.indexOf(e.id)) != null
              ? t
              : -1
            : 0;
        }));
    },
    createRow: (e, o) => {
      ((e.getCenterVisibleCells = v(
        () => [
          e._getAllVisibleCells(),
          o.getState().columnPinning.left,
          o.getState().columnPinning.right,
        ],
        (t, n, s) => {
          const i = [...(n ?? []), ...(s ?? [])];
          return t.filter((a) => !i.includes(a.column.id));
        },
        C(o.options, "debugRows"),
      )),
        (e.getLeftVisibleCells = v(
          () => [e._getAllVisibleCells(), o.getState().columnPinning.left],
          (t, n) =>
            (n ?? [])
              .map((i) => t.find((a) => a.column.id === i))
              .filter(Boolean)
              .map((i) => ({ ...i, position: "left" })),
          C(o.options, "debugRows"),
        )),
        (e.getRightVisibleCells = v(
          () => [e._getAllVisibleCells(), o.getState().columnPinning.right],
          (t, n) =>
            (n ?? [])
              .map((i) => t.find((a) => a.column.id === i))
              .filter(Boolean)
              .map((i) => ({ ...i, position: "right" })),
          C(o.options, "debugRows"),
        )));
    },
    createTable: (e) => {
      ((e.setColumnPinning = (o) =>
        e.options.onColumnPinningChange == null
          ? void 0
          : e.options.onColumnPinningChange(o)),
        (e.resetColumnPinning = (o) => {
          var t, n;
          return e.setColumnPinning(
            o
              ? ie()
              : (t = (n = e.initialState) == null ? void 0 : n.columnPinning) !=
                  null
                ? t
                : ie(),
          );
        }),
        (e.getIsSomeColumnsPinned = (o) => {
          var t;
          const n = e.getState().columnPinning;
          if (!o) {
            var s, i;
            return !!(
              ((s = n.left) != null && s.length) ||
              ((i = n.right) != null && i.length)
            );
          }
          return !!((t = n[o]) != null && t.length);
        }),
        (e.getLeftLeafColumns = v(
          () => [e.getAllLeafColumns(), e.getState().columnPinning.left],
          (o, t) =>
            (t ?? []).map((n) => o.find((s) => s.id === n)).filter(Boolean),
          C(e.options, "debugColumns"),
        )),
        (e.getRightLeafColumns = v(
          () => [e.getAllLeafColumns(), e.getState().columnPinning.right],
          (o, t) =>
            (t ?? []).map((n) => o.find((s) => s.id === n)).filter(Boolean),
          C(e.options, "debugColumns"),
        )),
        (e.getCenterLeafColumns = v(
          () => [
            e.getAllLeafColumns(),
            e.getState().columnPinning.left,
            e.getState().columnPinning.right,
          ],
          (o, t, n) => {
            const s = [...(t ?? []), ...(n ?? [])];
            return o.filter((i) => !s.includes(i.id));
          },
          C(e.options, "debugColumns"),
        )));
    },
  };
function sn(e) {
  return e || (typeof document < "u" ? document : null);
}
const Q = { size: 150, minSize: 20, maxSize: Number.MAX_SAFE_INTEGER },
  re = () => ({
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: [],
  }),
  rn = {
    getDefaultColumnDef: () => Q,
    getInitialState: (e) => ({
      columnSizing: {},
      columnSizingInfo: re(),
      ...e,
    }),
    getDefaultOptions: (e) => ({
      columnResizeMode: "onEnd",
      columnResizeDirection: "ltr",
      onColumnSizingChange: I("columnSizing", e),
      onColumnSizingInfoChange: I("columnSizingInfo", e),
    }),
    createColumn: (e, o) => {
      ((e.getSize = () => {
        var t, n, s;
        const i = o.getState().columnSizing[e.id];
        return Math.min(
          Math.max(
            (t = e.columnDef.minSize) != null ? t : Q.minSize,
            (n = i ?? e.columnDef.size) != null ? n : Q.size,
          ),
          (s = e.columnDef.maxSize) != null ? s : Q.maxSize,
        );
      }),
        (e.getStart = v(
          (t) => [t, U(o, t), o.getState().columnSizing],
          (t, n) =>
            n.slice(0, e.getIndex(t)).reduce((s, i) => s + i.getSize(), 0),
          C(o.options, "debugColumns"),
        )),
        (e.getAfter = v(
          (t) => [t, U(o, t), o.getState().columnSizing],
          (t, n) =>
            n.slice(e.getIndex(t) + 1).reduce((s, i) => s + i.getSize(), 0),
          C(o.options, "debugColumns"),
        )),
        (e.resetSize = () => {
          o.setColumnSizing((t) => {
            let { [e.id]: n, ...s } = t;
            return s;
          });
        }),
        (e.getCanResize = () => {
          var t, n;
          return (
            ((t = e.columnDef.enableResizing) != null ? t : !0) &&
            ((n = o.options.enableColumnResizing) != null ? n : !0)
          );
        }),
        (e.getIsResizing = () =>
          o.getState().columnSizingInfo.isResizingColumn === e.id));
    },
    createHeader: (e, o) => {
      ((e.getSize = () => {
        let t = 0;
        const n = (s) => {
          if (s.subHeaders.length) s.subHeaders.forEach(n);
          else {
            var i;
            t += (i = s.column.getSize()) != null ? i : 0;
          }
        };
        return (n(e), t);
      }),
        (e.getStart = () => {
          if (e.index > 0) {
            const t = e.headerGroup.headers[e.index - 1];
            return t.getStart() + t.getSize();
          }
          return 0;
        }),
        (e.getResizeHandler = (t) => {
          const n = o.getColumn(e.column.id),
            s = n?.getCanResize();
          return (i) => {
            if (
              !n ||
              !s ||
              (i.persist == null || i.persist(),
              le(i) && i.touches && i.touches.length > 1)
            )
              return;
            const a = e.getSize(),
              u = e
                ? e
                    .getLeafHeaders()
                    .map((S) => [S.column.id, S.column.getSize()])
                : [[n.id, n.getSize()]],
              d = le(i) ? Math.round(i.touches[0].clientX) : i.clientX,
              c = {},
              p = (S, R) => {
                typeof R == "number" &&
                  (o.setColumnSizingInfo((w) => {
                    var V, y;
                    const F =
                        o.options.columnResizeDirection === "rtl" ? -1 : 1,
                      N = (R - ((V = w?.startOffset) != null ? V : 0)) * F,
                      T = Math.max(
                        N / ((y = w?.startSize) != null ? y : 0),
                        -0.999999,
                      );
                    return (
                      w.columnSizingStart.forEach((M) => {
                        let [G, ye] = M;
                        c[G] = Math.round(Math.max(ye + ye * T, 0) * 100) / 100;
                      }),
                      { ...w, deltaOffset: N, deltaPercentage: T }
                    );
                  }),
                  (o.options.columnResizeMode === "onChange" || S === "end") &&
                    o.setColumnSizing((w) => ({ ...w, ...c })));
              },
              x = (S) => p("move", S),
              f = (S) => {
                (p("end", S),
                  o.setColumnSizingInfo((R) => ({
                    ...R,
                    isResizingColumn: !1,
                    startOffset: null,
                    startSize: null,
                    deltaOffset: null,
                    deltaPercentage: null,
                    columnSizingStart: [],
                  })));
              },
              l = sn(t),
              g = {
                moveHandler: (S) => x(S.clientX),
                upHandler: (S) => {
                  (l?.removeEventListener("mousemove", g.moveHandler),
                    l?.removeEventListener("mouseup", g.upHandler),
                    f(S.clientX));
                },
              },
              h = {
                moveHandler: (S) => (
                  S.cancelable && (S.preventDefault(), S.stopPropagation()),
                  x(S.touches[0].clientX),
                  !1
                ),
                upHandler: (S) => {
                  var R;
                  (l?.removeEventListener("touchmove", h.moveHandler),
                    l?.removeEventListener("touchend", h.upHandler),
                    S.cancelable && (S.preventDefault(), S.stopPropagation()),
                    f((R = S.touches[0]) == null ? void 0 : R.clientX));
                },
              },
              m = ln() ? { passive: !1 } : !1;
            (le(i)
              ? (l?.addEventListener("touchmove", h.moveHandler, m),
                l?.addEventListener("touchend", h.upHandler, m))
              : (l?.addEventListener("mousemove", g.moveHandler, m),
                l?.addEventListener("mouseup", g.upHandler, m)),
              o.setColumnSizingInfo((S) => ({
                ...S,
                startOffset: d,
                startSize: a,
                deltaOffset: 0,
                deltaPercentage: 0,
                columnSizingStart: u,
                isResizingColumn: n.id,
              })));
          };
        }));
    },
    createTable: (e) => {
      ((e.setColumnSizing = (o) =>
        e.options.onColumnSizingChange == null
          ? void 0
          : e.options.onColumnSizingChange(o)),
        (e.setColumnSizingInfo = (o) =>
          e.options.onColumnSizingInfoChange == null
            ? void 0
            : e.options.onColumnSizingInfoChange(o)),
        (e.resetColumnSizing = (o) => {
          var t;
          e.setColumnSizing(
            o ? {} : (t = e.initialState.columnSizing) != null ? t : {},
          );
        }),
        (e.resetHeaderSizeInfo = (o) => {
          var t;
          e.setColumnSizingInfo(
            o ? re() : (t = e.initialState.columnSizingInfo) != null ? t : re(),
          );
        }),
        (e.getTotalSize = () => {
          var o, t;
          return (o =
            (t = e.getHeaderGroups()[0]) == null
              ? void 0
              : t.headers.reduce((n, s) => n + s.getSize(), 0)) != null
            ? o
            : 0;
        }),
        (e.getLeftTotalSize = () => {
          var o, t;
          return (o =
            (t = e.getLeftHeaderGroups()[0]) == null
              ? void 0
              : t.headers.reduce((n, s) => n + s.getSize(), 0)) != null
            ? o
            : 0;
        }),
        (e.getCenterTotalSize = () => {
          var o, t;
          return (o =
            (t = e.getCenterHeaderGroups()[0]) == null
              ? void 0
              : t.headers.reduce((n, s) => n + s.getSize(), 0)) != null
            ? o
            : 0;
        }),
        (e.getRightTotalSize = () => {
          var o, t;
          return (o =
            (t = e.getRightHeaderGroups()[0]) == null
              ? void 0
              : t.headers.reduce((n, s) => n + s.getSize(), 0)) != null
            ? o
            : 0;
        }));
    },
  };
let W = null;
function ln() {
  if (typeof W == "boolean") return W;
  let e = !1;
  try {
    const o = {
        get passive() {
          return ((e = !0), !1);
        },
      },
      t = () => {};
    (window.addEventListener("test", t, o),
      window.removeEventListener("test", t));
  } catch {
    e = !1;
  }
  return ((W = e), W);
}
function le(e) {
  return e.type === "touchstart";
}
const an = {
  getInitialState: (e) => ({ columnVisibility: {}, ...e }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: I("columnVisibility", e),
  }),
  createColumn: (e, o) => {
    ((e.toggleVisibility = (t) => {
      e.getCanHide() &&
        o.setColumnVisibility((n) => ({
          ...n,
          [e.id]: t ?? !e.getIsVisible(),
        }));
    }),
      (e.getIsVisible = () => {
        var t, n;
        const s = e.columns;
        return (t = s.length
          ? s.some((i) => i.getIsVisible())
          : (n = o.getState().columnVisibility) == null
            ? void 0
            : n[e.id]) != null
          ? t
          : !0;
      }),
      (e.getCanHide = () => {
        var t, n;
        return (
          ((t = e.columnDef.enableHiding) != null ? t : !0) &&
          ((n = o.options.enableHiding) != null ? n : !0)
        );
      }),
      (e.getToggleVisibilityHandler = () => (t) => {
        e.toggleVisibility == null || e.toggleVisibility(t.target.checked);
      }));
  },
  createRow: (e, o) => {
    ((e._getAllVisibleCells = v(
      () => [e.getAllCells(), o.getState().columnVisibility],
      (t) => t.filter((n) => n.column.getIsVisible()),
      C(o.options, "debugRows"),
    )),
      (e.getVisibleCells = v(
        () => [
          e.getLeftVisibleCells(),
          e.getCenterVisibleCells(),
          e.getRightVisibleCells(),
        ],
        (t, n, s) => [...t, ...n, ...s],
        C(o.options, "debugRows"),
      )));
  },
  createTable: (e) => {
    const o = (t, n) =>
      v(
        () => [
          n(),
          n()
            .filter((s) => s.getIsVisible())
            .map((s) => s.id)
            .join("_"),
        ],
        (s) =>
          s.filter((i) => (i.getIsVisible == null ? void 0 : i.getIsVisible())),
        C(e.options, "debugColumns"),
      );
    ((e.getVisibleFlatColumns = o("getVisibleFlatColumns", () =>
      e.getAllFlatColumns(),
    )),
      (e.getVisibleLeafColumns = o("getVisibleLeafColumns", () =>
        e.getAllLeafColumns(),
      )),
      (e.getLeftVisibleLeafColumns = o("getLeftVisibleLeafColumns", () =>
        e.getLeftLeafColumns(),
      )),
      (e.getRightVisibleLeafColumns = o("getRightVisibleLeafColumns", () =>
        e.getRightLeafColumns(),
      )),
      (e.getCenterVisibleLeafColumns = o("getCenterVisibleLeafColumns", () =>
        e.getCenterLeafColumns(),
      )),
      (e.setColumnVisibility = (t) =>
        e.options.onColumnVisibilityChange == null
          ? void 0
          : e.options.onColumnVisibilityChange(t)),
      (e.resetColumnVisibility = (t) => {
        var n;
        e.setColumnVisibility(
          t ? {} : (n = e.initialState.columnVisibility) != null ? n : {},
        );
      }),
      (e.toggleAllColumnsVisible = (t) => {
        var n;
        ((t = (n = t) != null ? n : !e.getIsAllColumnsVisible()),
          e.setColumnVisibility(
            e
              .getAllLeafColumns()
              .reduce(
                (s, i) => ({
                  ...s,
                  [i.id]: t || !(i.getCanHide != null && i.getCanHide()),
                }),
                {},
              ),
          ));
      }),
      (e.getIsAllColumnsVisible = () =>
        !e
          .getAllLeafColumns()
          .some((t) => !(t.getIsVisible != null && t.getIsVisible()))),
      (e.getIsSomeColumnsVisible = () =>
        e
          .getAllLeafColumns()
          .some((t) => (t.getIsVisible == null ? void 0 : t.getIsVisible()))),
      (e.getToggleAllColumnsVisibilityHandler = () => (t) => {
        var n;
        e.toggleAllColumnsVisible((n = t.target) == null ? void 0 : n.checked);
      }));
  },
};
function U(e, o) {
  return o
    ? o === "center"
      ? e.getCenterVisibleLeafColumns()
      : o === "left"
        ? e.getLeftVisibleLeafColumns()
        : e.getRightVisibleLeafColumns()
    : e.getVisibleLeafColumns();
}
const un = {
    createTable: (e) => {
      ((e._getGlobalFacetedRowModel =
        e.options.getFacetedRowModel &&
        e.options.getFacetedRowModel(e, "__global__")),
        (e.getGlobalFacetedRowModel = () =>
          e.options.manualFiltering || !e._getGlobalFacetedRowModel
            ? e.getPreFilteredRowModel()
            : e._getGlobalFacetedRowModel()),
        (e._getGlobalFacetedUniqueValues =
          e.options.getFacetedUniqueValues &&
          e.options.getFacetedUniqueValues(e, "__global__")),
        (e.getGlobalFacetedUniqueValues = () =>
          e._getGlobalFacetedUniqueValues
            ? e._getGlobalFacetedUniqueValues()
            : new Map()),
        (e._getGlobalFacetedMinMaxValues =
          e.options.getFacetedMinMaxValues &&
          e.options.getFacetedMinMaxValues(e, "__global__")),
        (e.getGlobalFacetedMinMaxValues = () => {
          if (e._getGlobalFacetedMinMaxValues)
            return e._getGlobalFacetedMinMaxValues();
        }));
    },
  },
  dn = {
    getInitialState: (e) => ({ globalFilter: void 0, ...e }),
    getDefaultOptions: (e) => ({
      onGlobalFilterChange: I("globalFilter", e),
      globalFilterFn: "auto",
      getColumnCanGlobalFilter: (o) => {
        var t;
        const n =
          (t = e.getCoreRowModel().flatRows[0]) == null ||
          (t = t._getAllCellsByColumnId()[o.id]) == null
            ? void 0
            : t.getValue();
        return typeof n == "string" || typeof n == "number";
      },
    }),
    createColumn: (e, o) => {
      e.getCanGlobalFilter = () => {
        var t, n, s, i;
        return (
          ((t = e.columnDef.enableGlobalFilter) != null ? t : !0) &&
          ((n = o.options.enableGlobalFilter) != null ? n : !0) &&
          ((s = o.options.enableFilters) != null ? s : !0) &&
          ((i =
            o.options.getColumnCanGlobalFilter == null
              ? void 0
              : o.options.getColumnCanGlobalFilter(e)) != null
            ? i
            : !0) &&
          !!e.accessorFn
        );
      };
    },
    createTable: (e) => {
      ((e.getGlobalAutoFilterFn = () => E.includesString),
        (e.getGlobalFilterFn = () => {
          var o, t;
          const { globalFilterFn: n } = e.options;
          return te(n)
            ? n
            : n === "auto"
              ? e.getGlobalAutoFilterFn()
              : (o = (t = e.options.filterFns) == null ? void 0 : t[n]) != null
                ? o
                : E[n];
        }),
        (e.setGlobalFilter = (o) => {
          e.options.onGlobalFilterChange == null ||
            e.options.onGlobalFilterChange(o);
        }),
        (e.resetGlobalFilter = (o) => {
          e.setGlobalFilter(o ? void 0 : e.initialState.globalFilter);
        }));
    },
  },
  cn = {
    getInitialState: (e) => ({ expanded: {}, ...e }),
    getDefaultOptions: (e) => ({
      onExpandedChange: I("expanded", e),
      paginateExpandedRows: !0,
    }),
    createTable: (e) => {
      let o = !1,
        t = !1;
      ((e._autoResetExpanded = () => {
        var n, s;
        if (!o) {
          e._queue(() => {
            o = !0;
          });
          return;
        }
        if (
          (n =
            (s = e.options.autoResetAll) != null
              ? s
              : e.options.autoResetExpanded) != null
            ? n
            : !e.options.manualExpanding
        ) {
          if (t) return;
          ((t = !0),
            e._queue(() => {
              (e.resetExpanded(), (t = !1));
            }));
        }
      }),
        (e.setExpanded = (n) =>
          e.options.onExpandedChange == null
            ? void 0
            : e.options.onExpandedChange(n)),
        (e.toggleAllRowsExpanded = (n) => {
          (n ?? !e.getIsAllRowsExpanded())
            ? e.setExpanded(!0)
            : e.setExpanded({});
        }),
        (e.resetExpanded = (n) => {
          var s, i;
          e.setExpanded(
            n
              ? {}
              : (s = (i = e.initialState) == null ? void 0 : i.expanded) != null
                ? s
                : {},
          );
        }),
        (e.getCanSomeRowsExpand = () =>
          e.getPrePaginationRowModel().flatRows.some((n) => n.getCanExpand())),
        (e.getToggleAllRowsExpandedHandler = () => (n) => {
          (n.persist == null || n.persist(), e.toggleAllRowsExpanded());
        }),
        (e.getIsSomeRowsExpanded = () => {
          const n = e.getState().expanded;
          return n === !0 || Object.values(n).some(Boolean);
        }),
        (e.getIsAllRowsExpanded = () => {
          const n = e.getState().expanded;
          return typeof n == "boolean"
            ? n === !0
            : !(
                !Object.keys(n).length ||
                e.getRowModel().flatRows.some((s) => !s.getIsExpanded())
              );
        }),
        (e.getExpandedDepth = () => {
          let n = 0;
          return (
            (e.getState().expanded === !0
              ? Object.keys(e.getRowModel().rowsById)
              : Object.keys(e.getState().expanded)
            ).forEach((i) => {
              const a = i.split(".");
              n = Math.max(n, a.length);
            }),
            n
          );
        }),
        (e.getPreExpandedRowModel = () => e.getSortedRowModel()),
        (e.getExpandedRowModel = () => (
          !e._getExpandedRowModel &&
            e.options.getExpandedRowModel &&
            (e._getExpandedRowModel = e.options.getExpandedRowModel(e)),
          e.options.manualExpanding || !e._getExpandedRowModel
            ? e.getPreExpandedRowModel()
            : e._getExpandedRowModel()
        )));
    },
    createRow: (e, o) => {
      ((e.toggleExpanded = (t) => {
        o.setExpanded((n) => {
          var s;
          const i = n === !0 ? !0 : !!(n != null && n[e.id]);
          let a = {};
          if (
            (n === !0
              ? Object.keys(o.getRowModel().rowsById).forEach((u) => {
                  a[u] = !0;
                })
              : (a = n),
            (t = (s = t) != null ? s : !i),
            !i && t)
          )
            return { ...a, [e.id]: !0 };
          if (i && !t) {
            const { [e.id]: u, ...d } = a;
            return d;
          }
          return n;
        });
      }),
        (e.getIsExpanded = () => {
          var t;
          const n = o.getState().expanded;
          return !!((t =
            o.options.getIsRowExpanded == null
              ? void 0
              : o.options.getIsRowExpanded(e)) != null
            ? t
            : n === !0 || n?.[e.id]);
        }),
        (e.getCanExpand = () => {
          var t, n, s;
          return (t =
            o.options.getRowCanExpand == null
              ? void 0
              : o.options.getRowCanExpand(e)) != null
            ? t
            : ((n = o.options.enableExpanding) != null ? n : !0) &&
                !!((s = e.subRows) != null && s.length);
        }),
        (e.getIsAllParentsExpanded = () => {
          let t = !0,
            n = e;
          for (; t && n.parentId; )
            ((n = o.getRow(n.parentId, !0)), (t = n.getIsExpanded()));
          return t;
        }),
        (e.getToggleExpandedHandler = () => {
          const t = e.getCanExpand();
          return () => {
            t && e.toggleExpanded();
          };
        }));
    },
  },
  pe = 0,
  me = 10,
  ae = () => ({ pageIndex: pe, pageSize: me }),
  gn = {
    getInitialState: (e) => ({
      ...e,
      pagination: { ...ae(), ...e?.pagination },
    }),
    getDefaultOptions: (e) => ({ onPaginationChange: I("pagination", e) }),
    createTable: (e) => {
      let o = !1,
        t = !1;
      ((e._autoResetPageIndex = () => {
        var n, s;
        if (!o) {
          e._queue(() => {
            o = !0;
          });
          return;
        }
        if (
          (n =
            (s = e.options.autoResetAll) != null
              ? s
              : e.options.autoResetPageIndex) != null
            ? n
            : !e.options.manualPagination
        ) {
          if (t) return;
          ((t = !0),
            e._queue(() => {
              (e.resetPageIndex(), (t = !1));
            }));
        }
      }),
        (e.setPagination = (n) => {
          const s = (i) => H(n, i);
          return e.options.onPaginationChange == null
            ? void 0
            : e.options.onPaginationChange(s);
        }),
        (e.resetPagination = (n) => {
          var s;
          e.setPagination(
            n ? ae() : (s = e.initialState.pagination) != null ? s : ae(),
          );
        }),
        (e.setPageIndex = (n) => {
          e.setPagination((s) => {
            let i = H(n, s.pageIndex);
            const a =
              typeof e.options.pageCount > "u" || e.options.pageCount === -1
                ? Number.MAX_SAFE_INTEGER
                : e.options.pageCount - 1;
            return ((i = Math.max(0, Math.min(i, a))), { ...s, pageIndex: i });
          });
        }),
        (e.resetPageIndex = (n) => {
          var s, i;
          e.setPageIndex(
            n
              ? pe
              : (s =
                    (i = e.initialState) == null || (i = i.pagination) == null
                      ? void 0
                      : i.pageIndex) != null
                ? s
                : pe,
          );
        }),
        (e.resetPageSize = (n) => {
          var s, i;
          e.setPageSize(
            n
              ? me
              : (s =
                    (i = e.initialState) == null || (i = i.pagination) == null
                      ? void 0
                      : i.pageSize) != null
                ? s
                : me,
          );
        }),
        (e.setPageSize = (n) => {
          e.setPagination((s) => {
            const i = Math.max(1, H(n, s.pageSize)),
              a = s.pageSize * s.pageIndex,
              u = Math.floor(a / i);
            return { ...s, pageIndex: u, pageSize: i };
          });
        }),
        (e.setPageCount = (n) =>
          e.setPagination((s) => {
            var i;
            let a = H(n, (i = e.options.pageCount) != null ? i : -1);
            return (
              typeof a == "number" && (a = Math.max(-1, a)),
              { ...s, pageCount: a }
            );
          })),
        (e.getPageOptions = v(
          () => [e.getPageCount()],
          (n) => {
            let s = [];
            return (
              n && n > 0 && (s = [...new Array(n)].fill(null).map((i, a) => a)),
              s
            );
          },
          C(e.options, "debugTable"),
        )),
        (e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0),
        (e.getCanNextPage = () => {
          const { pageIndex: n } = e.getState().pagination,
            s = e.getPageCount();
          return s === -1 ? !0 : s === 0 ? !1 : n < s - 1;
        }),
        (e.previousPage = () => e.setPageIndex((n) => n - 1)),
        (e.nextPage = () => e.setPageIndex((n) => n + 1)),
        (e.firstPage = () => e.setPageIndex(0)),
        (e.lastPage = () => e.setPageIndex(e.getPageCount() - 1)),
        (e.getPrePaginationRowModel = () => e.getExpandedRowModel()),
        (e.getPaginationRowModel = () => (
          !e._getPaginationRowModel &&
            e.options.getPaginationRowModel &&
            (e._getPaginationRowModel = e.options.getPaginationRowModel(e)),
          e.options.manualPagination || !e._getPaginationRowModel
            ? e.getPrePaginationRowModel()
            : e._getPaginationRowModel()
        )),
        (e.getPageCount = () => {
          var n;
          return (n = e.options.pageCount) != null
            ? n
            : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
        }),
        (e.getRowCount = () => {
          var n;
          return (n = e.options.rowCount) != null
            ? n
            : e.getPrePaginationRowModel().rows.length;
        }));
    },
  },
  ue = () => ({ top: [], bottom: [] }),
  fn = {
    getInitialState: (e) => ({ rowPinning: ue(), ...e }),
    getDefaultOptions: (e) => ({ onRowPinningChange: I("rowPinning", e) }),
    createRow: (e, o) => {
      ((e.pin = (t, n, s) => {
        const i = n
            ? e.getLeafRows().map((d) => {
                let { id: c } = d;
                return c;
              })
            : [],
          a = s
            ? e.getParentRows().map((d) => {
                let { id: c } = d;
                return c;
              })
            : [],
          u = new Set([...a, e.id, ...i]);
        o.setRowPinning((d) => {
          var c, p;
          if (t === "bottom") {
            var x, f;
            return {
              top: ((x = d?.top) != null ? x : []).filter(
                (h) => !(u != null && u.has(h)),
              ),
              bottom: [
                ...((f = d?.bottom) != null ? f : []).filter(
                  (h) => !(u != null && u.has(h)),
                ),
                ...Array.from(u),
              ],
            };
          }
          if (t === "top") {
            var l, g;
            return {
              top: [
                ...((l = d?.top) != null ? l : []).filter(
                  (h) => !(u != null && u.has(h)),
                ),
                ...Array.from(u),
              ],
              bottom: ((g = d?.bottom) != null ? g : []).filter(
                (h) => !(u != null && u.has(h)),
              ),
            };
          }
          return {
            top: ((c = d?.top) != null ? c : []).filter(
              (h) => !(u != null && u.has(h)),
            ),
            bottom: ((p = d?.bottom) != null ? p : []).filter(
              (h) => !(u != null && u.has(h)),
            ),
          };
        });
      }),
        (e.getCanPin = () => {
          var t;
          const { enableRowPinning: n, enablePinning: s } = o.options;
          return typeof n == "function" ? n(e) : (t = n ?? s) != null ? t : !0;
        }),
        (e.getIsPinned = () => {
          const t = [e.id],
            { top: n, bottom: s } = o.getState().rowPinning,
            i = t.some((u) => n?.includes(u)),
            a = t.some((u) => s?.includes(u));
          return i ? "top" : a ? "bottom" : !1;
        }),
        (e.getPinnedIndex = () => {
          var t, n;
          const s = e.getIsPinned();
          if (!s) return -1;
          const i =
            (t = s === "top" ? o.getTopRows() : o.getBottomRows()) == null
              ? void 0
              : t.map((a) => {
                  let { id: u } = a;
                  return u;
                });
          return (n = i?.indexOf(e.id)) != null ? n : -1;
        }));
    },
    createTable: (e) => {
      ((e.setRowPinning = (o) =>
        e.options.onRowPinningChange == null
          ? void 0
          : e.options.onRowPinningChange(o)),
        (e.resetRowPinning = (o) => {
          var t, n;
          return e.setRowPinning(
            o
              ? ue()
              : (t = (n = e.initialState) == null ? void 0 : n.rowPinning) !=
                  null
                ? t
                : ue(),
          );
        }),
        (e.getIsSomeRowsPinned = (o) => {
          var t;
          const n = e.getState().rowPinning;
          if (!o) {
            var s, i;
            return !!(
              ((s = n.top) != null && s.length) ||
              ((i = n.bottom) != null && i.length)
            );
          }
          return !!((t = n[o]) != null && t.length);
        }),
        (e._getPinnedRows = (o, t, n) => {
          var s;
          return (
            (s = e.options.keepPinnedRows) == null || s
              ? (t ?? []).map((a) => {
                  const u = e.getRow(a, !0);
                  return u.getIsAllParentsExpanded() ? u : null;
                })
              : (t ?? []).map((a) => o.find((u) => u.id === a))
          )
            .filter(Boolean)
            .map((a) => ({ ...a, position: n }));
        }),
        (e.getTopRows = v(
          () => [e.getRowModel().rows, e.getState().rowPinning.top],
          (o, t) => e._getPinnedRows(o, t, "top"),
          C(e.options, "debugRows"),
        )),
        (e.getBottomRows = v(
          () => [e.getRowModel().rows, e.getState().rowPinning.bottom],
          (o, t) => e._getPinnedRows(o, t, "bottom"),
          C(e.options, "debugRows"),
        )),
        (e.getCenterRows = v(
          () => [
            e.getRowModel().rows,
            e.getState().rowPinning.top,
            e.getState().rowPinning.bottom,
          ],
          (o, t, n) => {
            const s = new Set([...(t ?? []), ...(n ?? [])]);
            return o.filter((i) => !s.has(i.id));
          },
          C(e.options, "debugRows"),
        )));
    },
  },
  pn = {
    getInitialState: (e) => ({ rowSelection: {}, ...e }),
    getDefaultOptions: (e) => ({
      onRowSelectionChange: I("rowSelection", e),
      enableRowSelection: !0,
      enableMultiRowSelection: !0,
      enableSubRowSelection: !0,
    }),
    createTable: (e) => {
      ((e.setRowSelection = (o) =>
        e.options.onRowSelectionChange == null
          ? void 0
          : e.options.onRowSelectionChange(o)),
        (e.resetRowSelection = (o) => {
          var t;
          return e.setRowSelection(
            o ? {} : (t = e.initialState.rowSelection) != null ? t : {},
          );
        }),
        (e.toggleAllRowsSelected = (o) => {
          e.setRowSelection((t) => {
            o = typeof o < "u" ? o : !e.getIsAllRowsSelected();
            const n = { ...t },
              s = e.getPreGroupedRowModel().flatRows;
            return (
              o
                ? s.forEach((i) => {
                    i.getCanSelect() && (n[i.id] = !0);
                  })
                : s.forEach((i) => {
                    delete n[i.id];
                  }),
              n
            );
          });
        }),
        (e.toggleAllPageRowsSelected = (o) =>
          e.setRowSelection((t) => {
            const n = typeof o < "u" ? o : !e.getIsAllPageRowsSelected(),
              s = { ...t };
            return (
              e.getRowModel().rows.forEach((i) => {
                he(s, i.id, n, !0, e);
              }),
              s
            );
          })),
        (e.getPreSelectedRowModel = () => e.getCoreRowModel()),
        (e.getSelectedRowModel = v(
          () => [e.getState().rowSelection, e.getCoreRowModel()],
          (o, t) =>
            Object.keys(o).length
              ? de(e, t)
              : { rows: [], flatRows: [], rowsById: {} },
          C(e.options, "debugTable"),
        )),
        (e.getFilteredSelectedRowModel = v(
          () => [e.getState().rowSelection, e.getFilteredRowModel()],
          (o, t) =>
            Object.keys(o).length
              ? de(e, t)
              : { rows: [], flatRows: [], rowsById: {} },
          C(e.options, "debugTable"),
        )),
        (e.getGroupedSelectedRowModel = v(
          () => [e.getState().rowSelection, e.getSortedRowModel()],
          (o, t) =>
            Object.keys(o).length
              ? de(e, t)
              : { rows: [], flatRows: [], rowsById: {} },
          C(e.options, "debugTable"),
        )),
        (e.getIsAllRowsSelected = () => {
          const o = e.getFilteredRowModel().flatRows,
            { rowSelection: t } = e.getState();
          let n = !!(o.length && Object.keys(t).length);
          return (
            n && o.some((s) => s.getCanSelect() && !t[s.id]) && (n = !1),
            n
          );
        }),
        (e.getIsAllPageRowsSelected = () => {
          const o = e
              .getPaginationRowModel()
              .flatRows.filter((s) => s.getCanSelect()),
            { rowSelection: t } = e.getState();
          let n = !!o.length;
          return (n && o.some((s) => !t[s.id]) && (n = !1), n);
        }),
        (e.getIsSomeRowsSelected = () => {
          var o;
          const t = Object.keys(
            (o = e.getState().rowSelection) != null ? o : {},
          ).length;
          return t > 0 && t < e.getFilteredRowModel().flatRows.length;
        }),
        (e.getIsSomePageRowsSelected = () => {
          const o = e.getPaginationRowModel().flatRows;
          return e.getIsAllPageRowsSelected()
            ? !1
            : o
                .filter((t) => t.getCanSelect())
                .some((t) => t.getIsSelected() || t.getIsSomeSelected());
        }),
        (e.getToggleAllRowsSelectedHandler = () => (o) => {
          e.toggleAllRowsSelected(o.target.checked);
        }),
        (e.getToggleAllPageRowsSelectedHandler = () => (o) => {
          e.toggleAllPageRowsSelected(o.target.checked);
        }));
    },
    createRow: (e, o) => {
      ((e.toggleSelected = (t, n) => {
        const s = e.getIsSelected();
        o.setRowSelection((i) => {
          var a;
          if (((t = typeof t < "u" ? t : !s), e.getCanSelect() && s === t))
            return i;
          const u = { ...i };
          return (
            he(u, e.id, t, (a = n?.selectChildren) != null ? a : !0, o),
            u
          );
        });
      }),
        (e.getIsSelected = () => {
          const { rowSelection: t } = o.getState();
          return we(e, t);
        }),
        (e.getIsSomeSelected = () => {
          const { rowSelection: t } = o.getState();
          return xe(e, t) === "some";
        }),
        (e.getIsAllSubRowsSelected = () => {
          const { rowSelection: t } = o.getState();
          return xe(e, t) === "all";
        }),
        (e.getCanSelect = () => {
          var t;
          return typeof o.options.enableRowSelection == "function"
            ? o.options.enableRowSelection(e)
            : (t = o.options.enableRowSelection) != null
              ? t
              : !0;
        }),
        (e.getCanSelectSubRows = () => {
          var t;
          return typeof o.options.enableSubRowSelection == "function"
            ? o.options.enableSubRowSelection(e)
            : (t = o.options.enableSubRowSelection) != null
              ? t
              : !0;
        }),
        (e.getCanMultiSelect = () => {
          var t;
          return typeof o.options.enableMultiRowSelection == "function"
            ? o.options.enableMultiRowSelection(e)
            : (t = o.options.enableMultiRowSelection) != null
              ? t
              : !0;
        }),
        (e.getToggleSelectedHandler = () => {
          const t = e.getCanSelect();
          return (n) => {
            var s;
            t && e.toggleSelected((s = n.target) == null ? void 0 : s.checked);
          };
        }));
    },
  },
  he = (e, o, t, n, s) => {
    var i;
    const a = s.getRow(o, !0);
    (t
      ? (a.getCanMultiSelect() || Object.keys(e).forEach((u) => delete e[u]),
        a.getCanSelect() && (e[o] = !0))
      : delete e[o],
      n &&
        (i = a.subRows) != null &&
        i.length &&
        a.getCanSelectSubRows() &&
        a.subRows.forEach((u) => he(e, u.id, t, n, s)));
  };
function de(e, o) {
  const t = e.getState().rowSelection,
    n = [],
    s = {},
    i = function (a, u) {
      return a
        .map((d) => {
          var c;
          const p = we(d, t);
          if (
            (p && (n.push(d), (s[d.id] = d)),
            (c = d.subRows) != null &&
              c.length &&
              (d = { ...d, subRows: i(d.subRows) }),
            p)
          )
            return d;
        })
        .filter(Boolean);
    };
  return { rows: i(o.rows), flatRows: n, rowsById: s };
}
function we(e, o) {
  var t;
  return (t = o[e.id]) != null ? t : !1;
}
function xe(e, o, t) {
  var n;
  if (!((n = e.subRows) != null && n.length)) return !1;
  let s = !0,
    i = !1;
  return (
    e.subRows.forEach((a) => {
      if (
        !(i && !s) &&
        (a.getCanSelect() && (we(a, o) ? (i = !0) : (s = !1)),
        a.subRows && a.subRows.length)
      ) {
        const u = xe(a, o);
        u === "all" ? (i = !0) : (u === "some" && (i = !0), (s = !1));
      }
    }),
    s ? "all" : i ? "some" : !1
  );
}
const Se = /([0-9]+)/gm,
  mn = (e, o, t) =>
    tt(z(e.getValue(t)).toLowerCase(), z(o.getValue(t)).toLowerCase()),
  hn = (e, o, t) => tt(z(e.getValue(t)), z(o.getValue(t))),
  xn = (e, o, t) =>
    Re(z(e.getValue(t)).toLowerCase(), z(o.getValue(t)).toLowerCase()),
  Sn = (e, o, t) => Re(z(e.getValue(t)), z(o.getValue(t))),
  vn = (e, o, t) => {
    const n = e.getValue(t),
      s = o.getValue(t);
    return n > s ? 1 : n < s ? -1 : 0;
  },
  Cn = (e, o, t) => Re(e.getValue(t), o.getValue(t));
function Re(e, o) {
  return e === o ? 0 : e > o ? 1 : -1;
}
function z(e) {
  return typeof e == "number"
    ? isNaN(e) || e === 1 / 0 || e === -1 / 0
      ? ""
      : String(e)
    : typeof e == "string"
      ? e
      : "";
}
function tt(e, o) {
  const t = e.split(Se).filter(Boolean),
    n = o.split(Se).filter(Boolean);
  for (; t.length && n.length; ) {
    const s = t.shift(),
      i = n.shift(),
      a = parseInt(s, 10),
      u = parseInt(i, 10),
      d = [a, u].sort();
    if (isNaN(d[0])) {
      if (s > i) return 1;
      if (i > s) return -1;
      continue;
    }
    if (isNaN(d[1])) return isNaN(a) ? -1 : 1;
    if (a > u) return 1;
    if (u > a) return -1;
  }
  return t.length - n.length;
}
const q = {
    alphanumeric: mn,
    alphanumericCaseSensitive: hn,
    text: xn,
    textCaseSensitive: Sn,
    datetime: vn,
    basic: Cn,
  },
  wn = {
    getInitialState: (e) => ({ sorting: [], ...e }),
    getDefaultColumnDef: () => ({ sortingFn: "auto", sortUndefined: 1 }),
    getDefaultOptions: (e) => ({
      onSortingChange: I("sorting", e),
      isMultiSortEvent: (o) => o.shiftKey,
    }),
    createColumn: (e, o) => {
      ((e.getAutoSortingFn = () => {
        const t = o.getFilteredRowModel().flatRows.slice(10);
        let n = !1;
        for (const s of t) {
          const i = s?.getValue(e.id);
          if (Object.prototype.toString.call(i) === "[object Date]")
            return q.datetime;
          if (typeof i == "string" && ((n = !0), i.split(Se).length > 1))
            return q.alphanumeric;
        }
        return n ? q.text : q.basic;
      }),
        (e.getAutoSortDir = () => {
          const t = o.getFilteredRowModel().flatRows[0];
          return typeof t?.getValue(e.id) == "string" ? "asc" : "desc";
        }),
        (e.getSortingFn = () => {
          var t, n;
          if (!e) throw new Error();
          return te(e.columnDef.sortingFn)
            ? e.columnDef.sortingFn
            : e.columnDef.sortingFn === "auto"
              ? e.getAutoSortingFn()
              : (t =
                    (n = o.options.sortingFns) == null
                      ? void 0
                      : n[e.columnDef.sortingFn]) != null
                ? t
                : q[e.columnDef.sortingFn];
        }),
        (e.toggleSorting = (t, n) => {
          const s = e.getNextSortingOrder(),
            i = typeof t < "u" && t !== null;
          o.setSorting((a) => {
            const u = a?.find((l) => l.id === e.id),
              d = a?.findIndex((l) => l.id === e.id);
            let c = [],
              p,
              x = i ? t : s === "desc";
            if (
              (a != null && a.length && e.getCanMultiSort() && n
                ? u
                  ? (p = "toggle")
                  : (p = "add")
                : a != null && a.length && d !== a.length - 1
                  ? (p = "replace")
                  : u
                    ? (p = "toggle")
                    : (p = "replace"),
              p === "toggle" && (i || s || (p = "remove")),
              p === "add")
            ) {
              var f;
              ((c = [...a, { id: e.id, desc: x }]),
                c.splice(
                  0,
                  c.length -
                    ((f = o.options.maxMultiSortColCount) != null
                      ? f
                      : Number.MAX_SAFE_INTEGER),
                ));
            } else
              p === "toggle"
                ? (c = a.map((l) => (l.id === e.id ? { ...l, desc: x } : l)))
                : p === "remove"
                  ? (c = a.filter((l) => l.id !== e.id))
                  : (c = [{ id: e.id, desc: x }]);
            return c;
          });
        }),
        (e.getFirstSortDir = () => {
          var t, n;
          return (
            (t =
              (n = e.columnDef.sortDescFirst) != null
                ? n
                : o.options.sortDescFirst) != null
              ? t
              : e.getAutoSortDir() === "desc"
          )
            ? "desc"
            : "asc";
        }),
        (e.getNextSortingOrder = (t) => {
          var n, s;
          const i = e.getFirstSortDir(),
            a = e.getIsSorted();
          return a
            ? a !== i &&
              ((n = o.options.enableSortingRemoval) == null || n) &&
              (!(t && (s = o.options.enableMultiRemove) != null) || s)
              ? !1
              : a === "desc"
                ? "asc"
                : "desc"
            : i;
        }),
        (e.getCanSort = () => {
          var t, n;
          return (
            ((t = e.columnDef.enableSorting) != null ? t : !0) &&
            ((n = o.options.enableSorting) != null ? n : !0) &&
            !!e.accessorFn
          );
        }),
        (e.getCanMultiSort = () => {
          var t, n;
          return (t =
            (n = e.columnDef.enableMultiSort) != null
              ? n
              : o.options.enableMultiSort) != null
            ? t
            : !!e.accessorFn;
        }),
        (e.getIsSorted = () => {
          var t;
          const n =
            (t = o.getState().sorting) == null
              ? void 0
              : t.find((s) => s.id === e.id);
          return n ? (n.desc ? "desc" : "asc") : !1;
        }),
        (e.getSortIndex = () => {
          var t, n;
          return (t =
            (n = o.getState().sorting) == null
              ? void 0
              : n.findIndex((s) => s.id === e.id)) != null
            ? t
            : -1;
        }),
        (e.clearSorting = () => {
          o.setSorting((t) =>
            t != null && t.length ? t.filter((n) => n.id !== e.id) : [],
          );
        }),
        (e.getToggleSortingHandler = () => {
          const t = e.getCanSort();
          return (n) => {
            t &&
              (n.persist == null || n.persist(),
              e.toggleSorting == null ||
                e.toggleSorting(
                  void 0,
                  e.getCanMultiSort()
                    ? o.options.isMultiSortEvent == null
                      ? void 0
                      : o.options.isMultiSortEvent(n)
                    : !1,
                ));
          };
        }));
    },
    createTable: (e) => {
      ((e.setSorting = (o) =>
        e.options.onSortingChange == null
          ? void 0
          : e.options.onSortingChange(o)),
        (e.resetSorting = (o) => {
          var t, n;
          e.setSorting(
            o
              ? []
              : (t = (n = e.initialState) == null ? void 0 : n.sorting) != null
                ? t
                : [],
          );
        }),
        (e.getPreSortedRowModel = () => e.getGroupedRowModel()),
        (e.getSortedRowModel = () => (
          !e._getSortedRowModel &&
            e.options.getSortedRowModel &&
            (e._getSortedRowModel = e.options.getSortedRowModel(e)),
          e.options.manualSorting || !e._getSortedRowModel
            ? e.getPreSortedRowModel()
            : e._getSortedRowModel()
        )));
    },
  },
  Rn = [Tt, an, nn, on, Kt, Bt, un, dn, wn, en, cn, gn, fn, pn, rn];
function yn(e) {
  var o, t;
  const n = [...Rn, ...((o = e._features) != null ? o : [])];
  let s = { _features: n };
  const i = s._features.reduce(
      (f, l) =>
        Object.assign(
          f,
          l.getDefaultOptions == null ? void 0 : l.getDefaultOptions(s),
        ),
      {},
    ),
    a = (f) =>
      s.options.mergeOptions ? s.options.mergeOptions(i, f) : { ...i, ...f };
  let d = { ...{}, ...((t = e.initialState) != null ? t : {}) };
  s._features.forEach((f) => {
    var l;
    d =
      (l = f.getInitialState == null ? void 0 : f.getInitialState(d)) != null
        ? l
        : d;
  });
  const c = [];
  let p = !1;
  const x = {
    _features: n,
    options: { ...i, ...e },
    initialState: d,
    _queue: (f) => {
      (c.push(f),
        p ||
          ((p = !0),
          Promise.resolve()
            .then(() => {
              for (; c.length; ) c.shift()();
              p = !1;
            })
            .catch((l) =>
              setTimeout(() => {
                throw l;
              }),
            )));
    },
    reset: () => {
      s.setState(s.initialState);
    },
    setOptions: (f) => {
      const l = H(f, s.options);
      s.options = a(l);
    },
    getState: () => s.options.state,
    setState: (f) => {
      s.options.onStateChange == null || s.options.onStateChange(f);
    },
    _getRowId: (f, l, g) => {
      var h;
      return (h =
        s.options.getRowId == null ? void 0 : s.options.getRowId(f, l, g)) !=
        null
        ? h
        : `${g ? [g.id, l].join(".") : l}`;
    },
    getCoreRowModel: () => (
      s._getCoreRowModel || (s._getCoreRowModel = s.options.getCoreRowModel(s)),
      s._getCoreRowModel()
    ),
    getRowModel: () => s.getPaginationRowModel(),
    getRow: (f, l) => {
      let g = (l ? s.getPrePaginationRowModel() : s.getRowModel()).rowsById[f];
      if (!g && ((g = s.getCoreRowModel().rowsById[f]), !g)) throw new Error();
      return g;
    },
    _getDefaultColumnDef: v(
      () => [s.options.defaultColumn],
      (f) => {
        var l;
        return (
          (f = (l = f) != null ? l : {}),
          {
            header: (g) => {
              const h = g.header.column.columnDef;
              return h.accessorKey ? h.accessorKey : h.accessorFn ? h.id : null;
            },
            cell: (g) => {
              var h, m;
              return (h =
                (m = g.renderValue()) == null || m.toString == null
                  ? void 0
                  : m.toString()) != null
                ? h
                : null;
            },
            ...s._features.reduce(
              (g, h) =>
                Object.assign(
                  g,
                  h.getDefaultColumnDef == null
                    ? void 0
                    : h.getDefaultColumnDef(),
                ),
              {},
            ),
            ...f,
          }
        );
      },
      C(e, "debugColumns"),
    ),
    _getColumnDefs: () => s.options.columns,
    getAllColumns: v(
      () => [s._getColumnDefs()],
      (f) => {
        const l = function (g, h, m) {
          return (
            m === void 0 && (m = 0),
            g.map((S) => {
              const R = Ot(s, S, m, h),
                w = S;
              return ((R.columns = w.columns ? l(w.columns, R, m + 1) : []), R);
            })
          );
        };
        return l(f);
      },
      C(e, "debugColumns"),
    ),
    getAllFlatColumns: v(
      () => [s.getAllColumns()],
      (f) => f.flatMap((l) => l.getFlatColumns()),
      C(e, "debugColumns"),
    ),
    _getAllFlatColumnsById: v(
      () => [s.getAllFlatColumns()],
      (f) => f.reduce((l, g) => ((l[g.id] = g), l), {}),
      C(e, "debugColumns"),
    ),
    getAllLeafColumns: v(
      () => [s.getAllColumns(), s._getOrderColumnsFn()],
      (f, l) => {
        let g = f.flatMap((h) => h.getLeafColumns());
        return l(g);
      },
      C(e, "debugColumns"),
    ),
    getColumn: (f) => s._getAllFlatColumnsById()[f],
  };
  Object.assign(s, x);
  for (let f = 0; f < s._features.length; f++) {
    const l = s._features[f];
    l == null || l.createTable == null || l.createTable(s);
  }
  return s;
}
function nt() {
  return (e) =>
    v(
      () => [e.options.data],
      (o) => {
        const t = { rows: [], flatRows: [], rowsById: {} },
          n = function (s, i, a) {
            i === void 0 && (i = 0);
            const u = [];
            for (let c = 0; c < s.length; c++) {
              const p = ve(
                e,
                e._getRowId(s[c], c, a),
                s[c],
                c,
                i,
                void 0,
                a?.id,
              );
              if (
                (t.flatRows.push(p),
                (t.rowsById[p.id] = p),
                u.push(p),
                e.options.getSubRows)
              ) {
                var d;
                ((p.originalSubRows = e.options.getSubRows(s[c], c)),
                  (d = p.originalSubRows) != null &&
                    d.length &&
                    (p.subRows = n(p.originalSubRows, i + 1, p)));
              }
            }
            return u;
          };
        return ((t.rows = n(o)), t);
      },
      C(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()),
    );
}
function _n(e, o, t) {
  return t.options.filterFromLeafRows ? Fn(e, o, t) : jn(e, o, t);
}
function Fn(e, o, t) {
  var n;
  const s = [],
    i = {},
    a = (n = t.options.maxLeafRowFilterDepth) != null ? n : 100,
    u = function (d, c) {
      c === void 0 && (c = 0);
      const p = [];
      for (let f = 0; f < d.length; f++) {
        var x;
        let l = d[f];
        const g = ve(t, l.id, l.original, l.index, l.depth, void 0, l.parentId);
        if (
          ((g.columnFilters = l.columnFilters),
          (x = l.subRows) != null && x.length && c < a)
        ) {
          if (
            ((g.subRows = u(l.subRows, c + 1)),
            (l = g),
            o(l) && !g.subRows.length)
          ) {
            (p.push(l), (i[l.id] = l), s.push(l));
            continue;
          }
          if (o(l) || g.subRows.length) {
            (p.push(l), (i[l.id] = l), s.push(l));
            continue;
          }
        } else ((l = g), o(l) && (p.push(l), (i[l.id] = l), s.push(l)));
      }
      return p;
    };
  return { rows: u(e), flatRows: s, rowsById: i };
}
function jn(e, o, t) {
  var n;
  const s = [],
    i = {},
    a = (n = t.options.maxLeafRowFilterDepth) != null ? n : 100,
    u = function (d, c) {
      c === void 0 && (c = 0);
      const p = [];
      for (let f = 0; f < d.length; f++) {
        let l = d[f];
        if (o(l)) {
          var x;
          if ((x = l.subRows) != null && x.length && c < a) {
            const h = ve(
              t,
              l.id,
              l.original,
              l.index,
              l.depth,
              void 0,
              l.parentId,
            );
            ((h.subRows = u(l.subRows, c + 1)), (l = h));
          }
          (p.push(l), s.push(l), (i[l.id] = l));
        }
      }
      return p;
    };
  return { rows: u(e), flatRows: s, rowsById: i };
}
function Mn() {
  return (e) =>
    v(
      () => [
        e.getPreFilteredRowModel(),
        e.getState().columnFilters,
        e.getState().globalFilter,
      ],
      (o, t, n) => {
        if (!o.rows.length || (!(t != null && t.length) && !n)) {
          for (let f = 0; f < o.flatRows.length; f++)
            ((o.flatRows[f].columnFilters = {}),
              (o.flatRows[f].columnFiltersMeta = {}));
          return o;
        }
        const s = [],
          i = [];
        (t ?? []).forEach((f) => {
          var l;
          const g = e.getColumn(f.id);
          if (!g) return;
          const h = g.getFilterFn();
          h &&
            s.push({
              id: f.id,
              filterFn: h,
              resolvedValue:
                (l =
                  h.resolveFilterValue == null
                    ? void 0
                    : h.resolveFilterValue(f.value)) != null
                  ? l
                  : f.value,
            });
        });
        const a = (t ?? []).map((f) => f.id),
          u = e.getGlobalFilterFn(),
          d = e.getAllLeafColumns().filter((f) => f.getCanGlobalFilter());
        n &&
          u &&
          d.length &&
          (a.push("__global__"),
          d.forEach((f) => {
            var l;
            i.push({
              id: f.id,
              filterFn: u,
              resolvedValue:
                (l =
                  u.resolveFilterValue == null
                    ? void 0
                    : u.resolveFilterValue(n)) != null
                  ? l
                  : n,
            });
          }));
        let c, p;
        for (let f = 0; f < o.flatRows.length; f++) {
          const l = o.flatRows[f];
          if (((l.columnFilters = {}), s.length))
            for (let g = 0; g < s.length; g++) {
              c = s[g];
              const h = c.id;
              l.columnFilters[h] = c.filterFn(l, h, c.resolvedValue, (m) => {
                l.columnFiltersMeta[h] = m;
              });
            }
          if (i.length) {
            for (let g = 0; g < i.length; g++) {
              p = i[g];
              const h = p.id;
              if (
                p.filterFn(l, h, p.resolvedValue, (m) => {
                  l.columnFiltersMeta[h] = m;
                })
              ) {
                l.columnFilters.__global__ = !0;
                break;
              }
            }
            l.columnFilters.__global__ !== !0 &&
              (l.columnFilters.__global__ = !1);
          }
        }
        const x = (f) => {
          for (let l = 0; l < a.length; l++)
            if (f.columnFilters[a[l]] === !1) return !1;
          return !0;
        };
        return _n(o.rows, x, e);
      },
      C(e.options, "debugTable", "getFilteredRowModel", () =>
        e._autoResetPageIndex(),
      ),
    );
}
function ot() {
  return (e) =>
    v(
      () => [e.getState().sorting, e.getPreSortedRowModel()],
      (o, t) => {
        if (!t.rows.length || !(o != null && o.length)) return t;
        const n = e.getState().sorting,
          s = [],
          i = n.filter((d) => {
            var c;
            return (c = e.getColumn(d.id)) == null ? void 0 : c.getCanSort();
          }),
          a = {};
        i.forEach((d) => {
          const c = e.getColumn(d.id);
          c &&
            (a[d.id] = {
              sortUndefined: c.columnDef.sortUndefined,
              invertSorting: c.columnDef.invertSorting,
              sortingFn: c.getSortingFn(),
            });
        });
        const u = (d) => {
          const c = d.map((p) => ({ ...p }));
          return (
            c.sort((p, x) => {
              for (let l = 0; l < i.length; l += 1) {
                var f;
                const g = i[l],
                  h = a[g.id],
                  m = h.sortUndefined,
                  S = (f = g?.desc) != null ? f : !1;
                let R = 0;
                if (m) {
                  const w = p.getValue(g.id),
                    V = x.getValue(g.id),
                    y = w === void 0,
                    F = V === void 0;
                  if (y || F) {
                    if (m === "first") return y ? -1 : 1;
                    if (m === "last") return y ? 1 : -1;
                    R = y && F ? 0 : y ? m : -m;
                  }
                }
                if ((R === 0 && (R = h.sortingFn(p, x, g.id)), R !== 0))
                  return (S && (R *= -1), h.invertSorting && (R *= -1), R);
              }
              return p.index - x.index;
            }),
            c.forEach((p) => {
              var x;
              (s.push(p),
                (x = p.subRows) != null &&
                  x.length &&
                  (p.subRows = u(p.subRows)));
            }),
            c
          );
        };
        return { rows: u(t.rows), flatRows: s, rowsById: t.rowsById };
      },
      C(e.options, "debugTable", "getSortedRowModel", () =>
        e._autoResetPageIndex(),
      ),
    );
}
function J(e, o) {
  return e ? ($n(e) ? _.createElement(e, o) : e) : null;
}
function $n(e) {
  return Pn(e) || typeof e == "function" || In(e);
}
function Pn(e) {
  return (
    typeof e == "function" &&
    (() => {
      const o = Object.getPrototypeOf(e);
      return o.prototype && o.prototype.isReactComponent;
    })()
  );
}
function In(e) {
  return (
    typeof e == "object" &&
    typeof e.$$typeof == "symbol" &&
    ["react.memo", "react.forward_ref"].includes(e.$$typeof.description)
  );
}
function st(e) {
  const o = {
      state: {},
      onStateChange: () => {},
      renderFallbackValue: null,
      ...e,
    },
    [t] = _.useState(() => ({ current: yn(o) })),
    [n, s] = _.useState(() => t.current.initialState);
  return (
    t.current.setOptions((i) => ({
      ...i,
      ...e,
      state: { ...n, ...e.state },
      onStateChange: (a) => {
        (s(a), e.onStateChange == null || e.onStateChange(a));
      },
    })),
    t.current
  );
}
function it({ className: e, ...o }) {
  return r.jsx("div", {
    "data-slot": "table-container",
    className: "relative w-full overflow-x-auto",
    children: r.jsx("table", {
      "data-slot": "table",
      className: B("w-full caption-bottom text-sm", e),
      ...o,
    }),
  });
}
function rt({ className: e, ...o }) {
  return r.jsx("thead", {
    "data-slot": "table-header",
    className: B("[&_tr]:border-b", e),
    ...o,
  });
}
function lt({ className: e, ...o }) {
  return r.jsx("tbody", {
    "data-slot": "table-body",
    className: B("[&_tr:last-child]:border-0", e),
    ...o,
  });
}
function K({ className: e, ...o }) {
  return r.jsx("tr", {
    "data-slot": "table-row",
    className: B(
      "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
      e,
    ),
    ...o,
  });
}
function at({ className: e, ...o }) {
  return r.jsx("th", {
    "data-slot": "table-head",
    className: B(
      "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e,
    ),
    ...o,
  });
}
function ee({ className: e, ...o }) {
  return r.jsx("td", {
    "data-slot": "table-cell",
    className: B(
      "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e,
    ),
    ...o,
  });
}
function Vn({
  apiKeyId: e,
  apiKeyName: o,
  grantedCollections: t,
  open: n,
  onOpenChange: s,
}) {
  const { data: i, isLoading: a } = dt(),
    u = A.useUtils(),
    [d, c] = _.useState(""),
    p = _.useMemo(() => t.map((y) => y.id), [t]),
    [x, f] = _.useState(p),
    [l, g] = _.useState(!1),
    h = _.useMemo(() => {
      const y = new Set(x),
        F = new Set(p);
      if (y.size !== F.size) return !0;
      for (const N of y) if (!F.has(N)) return !0;
      return !1;
    }, [x, p]),
    m = A.apiKeys.grantCollectionAccess.useMutation(),
    S = A.apiKeys.revokeCollectionAccess.useMutation(),
    R = _.useMemo(
      () =>
        i
          ? i.filter((y) => y.title.toLowerCase().includes(d.toLowerCase()))
          : [],
      [i, d],
    ),
    w = (y) => {
      f((F) => (F.includes(y) ? F.filter((N) => N !== y) : [...F, y]));
    },
    V = async () => {
      g(!0);
      const y = new Set(p),
        F = new Set(x),
        N = x.filter((M) => !y.has(M)),
        T = p.filter((M) => !F.has(M));
      try {
        for (const M of N)
          await m.mutateAsync({ apiKeyId: e, collectionId: M });
        for (const M of T)
          await S.mutateAsync({ apiKeyId: e, collectionId: M });
        (u.apiKeys.list.invalidate(),
          L.success("Collection access updated successfully"),
          s(!1));
      } catch (M) {
        const G =
          M instanceof Error ? M.message : "Failed to update collection access";
        L.error(G);
      } finally {
        g(!1);
      }
    };
  return r.jsx(Ae, {
    open: n,
    onOpenChange: s,
    children: r.jsxs(Ne, {
      className: "max-w-2xl max-h-[80vh] overflow-y-auto",
      children: [
        r.jsxs(De, {
          children: [
            r.jsx(Ee, { children: "Manage Collection Access" }),
            r.jsxs(Le, {
              children: ['Grant "', o, '" access to specific collections'],
            }),
          ],
        }),
        r.jsxs("div", {
          className: "space-y-4 py-4",
          children: [
            r.jsxs("div", {
              className:
                "flex items-start gap-3 p-3 rounded-lg border bg-muted/50",
              children: [
                r.jsx(Ge, {
                  className: "h-5 w-5 text-muted-foreground mt-0.5 shrink-0",
                }),
                r.jsxs("div", {
                  className: "space-y-1",
                  children: [
                    r.jsx("p", {
                      className: "text-sm font-medium",
                      children:
                        "Granted collections receive these permissions:",
                    }),
                    r.jsxs("div", {
                      className: "flex flex-wrap gap-1",
                      children: [
                        r.jsx($, {
                          variant: "outline",
                          className: "text-xs",
                          children: "collection:read",
                        }),
                        r.jsx($, {
                          variant: "outline",
                          className: "text-xs",
                          children: "item:add",
                        }),
                        r.jsx($, {
                          variant: "outline",
                          className: "text-xs",
                          children: "collection:view_members",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            r.jsx("div", {
              className: "space-y-2",
              children: r.jsxs("div", {
                className: "border rounded-lg",
                children: [
                  r.jsxs("div", {
                    className: "relative border-b",
                    children: [
                      r.jsx(ct, {
                        className:
                          "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                      }),
                      r.jsx(ce, {
                        placeholder: "Search collections...",
                        value: d,
                        onChange: (y) => c(y.target.value),
                        className: "border-0 pl-9",
                      }),
                    ],
                  }),
                  r.jsx(gt, {
                    className: "max-h-60 min-h-30",
                    children: r.jsx("div", {
                      className: "p-2",
                      children: a
                        ? r.jsx("div", {
                            className:
                              "flex items-center justify-center py-8 text-sm text-muted-foreground",
                            children: "Loading collections...",
                          })
                        : R.length > 0
                          ? r.jsx("div", {
                              className: "space-y-1",
                              children: R.map((y) => {
                                const F = x.includes(y.id),
                                  N = y.isShared,
                                  T = y.role,
                                  M = Ft(T),
                                  G = N && !M;
                                return r.jsx(
                                  ft,
                                  {
                                    children: r.jsxs(pt, {
                                      children: [
                                        r.jsx(mt, {
                                          asChild: !0,
                                          children: r.jsx("div", {
                                            className: `flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors ${G ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`,
                                            onClick: () => !G && w(y.id),
                                            children: r.jsxs("div", {
                                              className:
                                                "flex items-center gap-3 flex-1",
                                              children: [
                                                r.jsx(jt, {
                                                  checked: F,
                                                  disabled: G,
                                                  onCheckedChange: () =>
                                                    w(y.id),
                                                }),
                                                r.jsx("div", {
                                                  className: "flex-1",
                                                  children: r.jsxs("div", {
                                                    className:
                                                      "flex items-center gap-2",
                                                    children: [
                                                      r.jsx("p", {
                                                        className:
                                                          "font-medium text-sm",
                                                        children: y.title,
                                                      }),
                                                      N &&
                                                        r.jsx($, {
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
                                        }),
                                        G &&
                                          r.jsx(ht, {
                                            children: r.jsx("p", {
                                              className: "text-xs",
                                              children:
                                                "You need admin or owner role to manage API key access to this shared collection",
                                            }),
                                          }),
                                      ],
                                    }),
                                  },
                                  y.id,
                                );
                              }),
                            })
                          : r.jsx("div", {
                              className:
                                "text-center py-8 text-sm text-muted-foreground",
                              children: d
                                ? "No collections found"
                                : "No collections available",
                            }),
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
        r.jsx("div", {
          className: "flex justify-end gap-2",
          children: r.jsxs(r.Fragment, {
            children: [
              r.jsx(P, {
                variant: "outline",
                onClick: () => s(!1),
                children: "Cancel",
              }),
              r.jsx(P, {
                onClick: V,
                disabled: l || !h,
                children: l ? "Applying..." : "Apply Changes",
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
function An({ data: e }) {
  const [o, t] = _.useState([]),
    [n, s] = _.useState([]),
    [i, a] = _.useState(!1),
    [u, d] = _.useState(null),
    c = A.useUtils(),
    p = A.apiKeys.delete.useMutation({
      onSuccess: () => {
        (c.apiKeys.list.invalidate(),
          L.success("API key deleted successfully"));
      },
      onError: (m) => {
        L.error(m.message || "Failed to delete API key");
      },
    }),
    x = (m) => {
      confirm(
        `Are you sure you want to delete "${m.name}"? This action cannot be undone.`,
      ) && p.mutate({ keyId: m.id });
    },
    f = (m) => {
      (d(m), a(!0));
    },
    l = [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row: m }) =>
          r.jsx("div", {
            children: r.jsx("p", {
              className: "font-medium",
              children: m.original.name,
            }),
          }),
      },
      {
        accessorKey: "mode",
        header: "Access",
        cell: ({ row: m }) => {
          const S = m.original.mode;
          return r.jsx($, {
            variant: S === "full_access" ? "default" : "secondary",
            className: "gap-1",
            children:
              S === "full_access"
                ? r.jsxs(r.Fragment, {
                    children: [
                      r.jsx(xt, { className: "h-3 w-3" }),
                      "Full Access",
                    ],
                  })
                : r.jsxs(r.Fragment, {
                    children: [
                      r.jsx(Dt, { className: "h-3 w-3" }),
                      "Collection-Specific",
                    ],
                  }),
          });
        },
        filterFn: (m, S, R) => R === "all" || m.getValue(S) === R,
      },
      {
        accessorKey: "lastRequest",
        header: ({ column: m }) =>
          r.jsxs(P, {
            variant: "ghost",
            onClick: () => m.toggleSorting(m.getIsSorted() === "asc"),
            className: "h-8 px-2",
            children: ["Last Used", r.jsx(ge, { className: "ml-2 h-4 w-4" })],
          }),
        cell: ({ row: m }) => {
          const S = m.original.lastRequest;
          return r.jsx("div", {
            className: "text-sm",
            children: S ? Y(new Date(S), { addSuffix: !0 }) : "-",
          });
        },
        sortingFn: (m, S) => {
          const R = m.original.lastRequest,
            w = S.original.lastRequest;
          return !R && !w
            ? 0
            : R
              ? w
                ? new Date(R).getTime() - new Date(w).getTime()
                : -1
              : 1;
        },
      },
      {
        accessorKey: "expiresAt",
        header: ({ column: m }) =>
          r.jsxs(P, {
            variant: "ghost",
            onClick: () => m.toggleSorting(m.getIsSorted() === "asc"),
            className: "h-8 px-2",
            children: ["Expires", r.jsx(ge, { className: "ml-2 h-4 w-4" })],
          }),
        cell: ({ row: m }) => {
          const S = m.original.expiresAt;
          if (!S)
            return r.jsx("div", {
              className: "text-sm text-muted-foreground",
              children: "Never",
            });
          const R = new Date(S) < new Date(),
            w = new Date(S).getTime() - new Date().getTime() < 10080 * 60 * 1e3;
          return r.jsx("div", {
            className: "text-sm",
            children: R
              ? r.jsx($, {
                  variant: "destructive",
                  className: "text-xs",
                  children: "Expired",
                })
              : w
                ? r.jsx($, {
                    variant: "outline",
                    className: "text-xs text-amber-600",
                    children: Y(new Date(S), { addSuffix: !0 }),
                  })
                : r.jsx("span", {
                    className: "text-muted-foreground",
                    children: Y(new Date(S), { addSuffix: !0 }),
                  }),
          });
        },
        sortingFn: (m, S) => {
          const R = m.original.expiresAt,
            w = S.original.expiresAt;
          return !R && !w
            ? 0
            : R
              ? w
                ? new Date(R).getTime() - new Date(w).getTime()
                : -1
              : 1;
        },
      },
      {
        id: "actions",
        cell: ({ row: m }) => {
          const S = m.original;
          return r.jsxs(ke, {
            children: [
              r.jsx(He, {
                asChild: !0,
                children: r.jsx(P, {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  children: r.jsx(Ue, { className: "h-4 w-4" }),
                }),
              }),
              r.jsxs(ze, {
                align: "end",
                children: [
                  S.mode === "collection_specific" &&
                    r.jsxs(Z, {
                      onClick: () => f(S),
                      children: [
                        r.jsx(fe, { className: "mr-2 h-4 w-4" }),
                        "Manage Collections",
                      ],
                    }),
                  r.jsxs(Z, {
                    onClick: () => x(S),
                    className: "text-destructive focus:text-destructive",
                    children: [
                      r.jsx(Oe, { className: "mr-2 h-4 w-4" }),
                      "Delete",
                    ],
                  }),
                ],
              }),
            ],
          });
        },
      },
    ],
    g = st({
      data: e,
      columns: l,
      getCoreRowModel: nt(),
      getSortedRowModel: ot(),
      getFilteredRowModel: Mn(),
      onSortingChange: t,
      onColumnFiltersChange: s,
      state: { sorting: o, columnFilters: n },
    }),
    h = g.getColumn("mode");
  return r.jsxs("div", {
    className: "space-y-4",
    children: [
      r.jsx("div", {
        className: "flex items-center gap-4",
        children: r.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            r.jsx("span", {
              className: "text-sm text-muted-foreground",
              children: "Access:",
            }),
            r.jsxs(Te, {
              value: h?.getFilterValue() ?? "all",
              onValueChange: (m) => h?.setFilterValue(m === "all" ? void 0 : m),
              children: [
                r.jsx(Ke, {
                  className: "w-[200px]",
                  children: r.jsx(Be, { placeholder: "Filter by access" }),
                }),
                r.jsxs(qe, {
                  children: [
                    r.jsx(k, { value: "all", children: "All" }),
                    r.jsx(k, { value: "full_access", children: "Full Access" }),
                    r.jsx(k, {
                      value: "collection_specific",
                      children: "Collection-Specific",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      r.jsx("div", {
        className: "rounded-md border",
        children: r.jsxs(it, {
          children: [
            r.jsx(rt, {
              children: g
                .getHeaderGroups()
                .map((m) =>
                  r.jsx(
                    K,
                    {
                      children: m.headers.map((S) =>
                        r.jsx(
                          at,
                          {
                            children: S.isPlaceholder
                              ? null
                              : J(S.column.columnDef.header, S.getContext()),
                          },
                          S.id,
                        ),
                      ),
                    },
                    m.id,
                  ),
                ),
            }),
            r.jsx(lt, {
              children: g.getRowModel().rows?.length
                ? g
                    .getRowModel()
                    .rows.map((m) =>
                      r.jsx(
                        K,
                        {
                          "data-state": m.getIsSelected() && "selected",
                          children: m
                            .getVisibleCells()
                            .map((S) =>
                              r.jsx(
                                ee,
                                {
                                  children: J(
                                    S.column.columnDef.cell,
                                    S.getContext(),
                                  ),
                                },
                                S.id,
                              ),
                            ),
                        },
                        m.id,
                      ),
                    )
                : r.jsx(K, {
                    children: r.jsx(ee, {
                      colSpan: l.length,
                      className: "h-24 text-center",
                      children: "No API keys found.",
                    }),
                  }),
            }),
          ],
        }),
      }),
      u &&
        r.jsx(Vn, {
          apiKeyId: u.id,
          apiKeyName: u.name,
          grantedCollections: u.grantedCollections,
          open: i,
          onOpenChange: a,
        }),
    ],
  });
}
function ut({ open: e, onOpenChange: o, editingKey: t }) {
  const n = !!t,
    [s, i] = _.useState("openai"),
    [a, u] = _.useState(""),
    [d, c] = _.useState(""),
    [p, x] = _.useState(!1),
    { data: f } = A.aiKeys.list.useQuery(void 0, { enabled: e }),
    l = f?.some((w) => w.provider === s),
    g = !n && l,
    h = A.useUtils(),
    m = A.aiKeys.store.useMutation({
      onSuccess: () => {
        (h.aiKeys.list.invalidate(),
          L.success(
            n
              ? "Model key updated successfully"
              : "Model key saved successfully",
          ),
          S());
      },
      onError: (w) => {
        L.error(w.message || "Failed to save model key");
      },
    });
  _.useEffect(() => {
    e &&
      (t
        ? (i(t.provider), u(t.label || ""), c(""))
        : (i("openai"), u(""), c("")),
      x(!1));
  }, [e, t]);
  const S = () => {
      (i("openai"), u(""), c(""), x(!1), o(!1));
    },
    R = (w) => {
      if ((w.preventDefault(), !d.trim())) {
        L.error("Please enter an API Key");
        return;
      }
      m.mutate({ provider: s, label: a.trim(), key: d.trim() });
    };
  return r.jsx(Ae, {
    open: e,
    onOpenChange: S,
    children: r.jsxs(Ne, {
      className: "sm:max-w-[425px]",
      children: [
        r.jsxs(De, {
          children: [
            r.jsx(Ee, { children: n ? "Update Model Key" : "Add Model Key" }),
            r.jsx(Le, {
              children: n
                ? "Update your existing AI provider API Key."
                : "Store a new API key to use with native LLM features. Keys are encrypted.",
            }),
          ],
        }),
        r.jsxs("form", {
          onSubmit: R,
          className: "space-y-4 py-4",
          children: [
            r.jsxs("div", {
              className: "space-y-2",
              children: [
                r.jsx(oe, { htmlFor: "provider", children: "Provider" }),
                r.jsxs(Te, {
                  disabled: n || m.isPending,
                  onValueChange: (w) => i(w),
                  value: s,
                  children: [
                    r.jsx(Ke, {
                      id: "provider",
                      children: r.jsx(Be, { placeholder: "Select a provider" }),
                    }),
                    r.jsxs(qe, {
                      children: [
                        r.jsx(k, { value: "openai", children: "OpenAI" }),
                        r.jsx(k, { value: "anthropic", children: "Anthropic" }),
                        r.jsx(k, { value: "groq", children: "Groq" }),
                        r.jsx(k, {
                          value: "openrouter",
                          children: "OpenRouter",
                        }),
                        r.jsx(k, {
                          value: "google",
                          children: "Google Gemini",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            g &&
              r.jsxs("div", {
                className:
                  "flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive",
                children: [
                  r.jsx(St, { className: "h-4 w-4 shrink-0 mt-0.5" }),
                  r.jsx("p", {
                    children:
                      "A key for this provider already exists. Proceeding will overwrite it.",
                  }),
                ],
              }),
            r.jsxs("div", {
              className: "space-y-2",
              children: [
                r.jsx(oe, { htmlFor: "label", children: "Key Name" }),
                r.jsx(ce, {
                  id: "label",
                  placeholder: "e.g. My Personal OpenAI Key",
                  disabled: m.isPending,
                  value: a,
                  onChange: (w) => u(w.target.value),
                }),
                r.jsx("p", {
                  className: "text-xs text-muted-foreground",
                  children: "Optional identifier for this key.",
                }),
              ],
            }),
            r.jsxs("div", {
              className: "space-y-2",
              children: [
                r.jsx(oe, { htmlFor: "key", children: "API Key" }),
                r.jsxs("div", {
                  className: "relative",
                  children: [
                    r.jsx(ce, {
                      id: "key",
                      type: p ? "text" : "password",
                      placeholder: n ? "Enter new API key..." : "sk-...",
                      disabled: m.isPending,
                      value: d,
                      onChange: (w) => c(w.target.value),
                      className: "pr-10",
                    }),
                    r.jsxs(P, {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      className:
                        "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
                      onClick: () => x(!p),
                      children: [
                        p
                          ? r.jsx(It, {
                              className: "h-4 w-4 text-muted-foreground",
                            })
                          : r.jsx(At, {
                              className: "h-4 w-4 text-muted-foreground",
                            }),
                        r.jsx("span", {
                          className: "sr-only",
                          children: p ? "Hide key" : "Show key",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            r.jsxs(vt, {
              className: "mt-6",
              children: [
                r.jsx(P, {
                  type: "button",
                  variant: "outline",
                  onClick: S,
                  disabled: m.isPending,
                  children: "Cancel",
                }),
                r.jsx(P, {
                  type: "submit",
                  disabled: m.isPending,
                  children: m.isPending ? "Saving..." : "Save Key",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function Nn({ data: e }) {
  const [o, t] = _.useState([]),
    [n, s] = _.useState(!1),
    [i, a] = _.useState(null),
    u = A.useUtils(),
    d = A.aiKeys.delete.useMutation({
      onSuccess: () => {
        (u.aiKeys.list.invalidate(),
          L.success("Model key deleted successfully"));
      },
      onError: (l) => {
        L.error(l.message || "Failed to delete model key");
      },
    }),
    c = (l) => {
      confirm(
        `Are you sure you want to delete the key for ${l.provider}? This action cannot be undone.`,
      ) && d.mutate({ provider: l.provider });
    },
    p = (l) => {
      (a(l), s(!0));
    },
    x = [
      {
        accessorKey: "label",
        header: "Name",
        cell: ({ row: l }) =>
          r.jsx("div", {
            children: r.jsx("p", {
              className: "font-medium",
              children: l.original.label || "Unnamed Key",
            }),
          }),
      },
      {
        accessorKey: "provider",
        header: "Provider",
        cell: ({ row: l }) => {
          const g = l.original.provider,
            h = g.charAt(0).toUpperCase() + g.slice(1);
          return r.jsx("div", {
            className: "font-medium text-muted-foreground",
            children: h,
          });
        },
      },
      {
        accessorKey: "updatedAt",
        header: ({ column: l }) =>
          r.jsxs(P, {
            variant: "ghost",
            onClick: () => l.toggleSorting(l.getIsSorted() === "asc"),
            className: "h-8 px-2",
            children: [
              "Last Updated",
              r.jsx(ge, { className: "ml-2 h-4 w-4" }),
            ],
          }),
        cell: ({ row: l }) => {
          const g = l.original.updatedAt || l.original.createdAt;
          return r.jsx("div", {
            className: "text-sm",
            children: g ? Y(new Date(g), { addSuffix: !0 }) : "-",
          });
        },
        sortingFn: (l, g) => {
          const h = l.original.updatedAt || l.original.createdAt,
            m = g.original.updatedAt || g.original.createdAt;
          return !h && !m
            ? 0
            : h
              ? m
                ? new Date(h).getTime() - new Date(m).getTime()
                : -1
              : 1;
        },
      },
      {
        id: "actions",
        cell: ({ row: l }) => {
          const g = l.original;
          return r.jsxs(ke, {
            children: [
              r.jsx(He, {
                asChild: !0,
                children: r.jsx(P, {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  children: r.jsx(Ue, { className: "h-4 w-4" }),
                }),
              }),
              r.jsxs(ze, {
                align: "end",
                children: [
                  r.jsxs(Z, {
                    onClick: () => p(g),
                    children: [
                      r.jsx(Lt, { className: "mr-2 h-4 w-4" }),
                      "Update Key",
                    ],
                  }),
                  r.jsxs(Z, {
                    onClick: () => c(g),
                    className: "text-destructive focus:text-destructive",
                    children: [
                      r.jsx(Oe, { className: "mr-2 h-4 w-4" }),
                      "Delete",
                    ],
                  }),
                ],
              }),
            ],
          });
        },
      },
    ],
    f = st({
      data: e,
      columns: x,
      getCoreRowModel: nt(),
      getSortedRowModel: ot(),
      onSortingChange: t,
      state: { sorting: o },
    });
  return r.jsxs("div", {
    className: "space-y-4",
    children: [
      r.jsx("div", {
        className: "rounded-md border",
        children: r.jsxs(it, {
          children: [
            r.jsx(rt, {
              children: f
                .getHeaderGroups()
                .map((l) =>
                  r.jsx(
                    K,
                    {
                      children: l.headers.map((g) =>
                        r.jsx(
                          at,
                          {
                            children: g.isPlaceholder
                              ? null
                              : J(g.column.columnDef.header, g.getContext()),
                          },
                          g.id,
                        ),
                      ),
                    },
                    l.id,
                  ),
                ),
            }),
            r.jsx(lt, {
              children: f.getRowModel().rows?.length
                ? f
                    .getRowModel()
                    .rows.map((l) =>
                      r.jsx(
                        K,
                        {
                          "data-state": l.getIsSelected() && "selected",
                          children: l
                            .getVisibleCells()
                            .map((g) =>
                              r.jsx(
                                ee,
                                {
                                  children: J(
                                    g.column.columnDef.cell,
                                    g.getContext(),
                                  ),
                                },
                                g.id,
                              ),
                            ),
                        },
                        l.id,
                      ),
                    )
                : r.jsx(K, {
                    children: r.jsx(ee, {
                      colSpan: x.length,
                      className: "h-24 text-center",
                      children: "No model keys found.",
                    }),
                  }),
            }),
          ],
        }),
      }),
      r.jsx(ut, { open: n, onOpenChange: s, editingKey: i }),
    ],
  });
}
function Dn() {
  return r.jsxs(Ct, {
    children: [
      r.jsx(wt, {
        asChild: !0,
        children: r.jsx(P, {
          variant: "ghost",
          size: "icon",
          className: "h-8 w-8",
          children: r.jsx(Ge, { className: "h-4 w-4" }),
        }),
      }),
      r.jsx(Rt, {
        className: "w-96",
        align: "start",
        children: r.jsxs("div", {
          className: "space-y-4",
          children: [
            r.jsxs("div", {
              children: [
                r.jsx("h4", {
                  className: "font-semibold text-sm mb-1",
                  children: "API Key Modes",
                }),
                r.jsx("p", {
                  className: "text-xs text-muted-foreground",
                  children: "Choose the access level for your API keys",
                }),
              ],
            }),
            r.jsxs("div", {
              className: "space-y-3",
              children: [
                r.jsxs("div", {
                  children: [
                    r.jsx("p", {
                      className: "font-semibold text-sm mb-1",
                      children: "Full Access",
                    }),
                    r.jsx("p", {
                      className: "text-xs text-muted-foreground mb-2",
                      children:
                        "Inherits all your collection permissions and can create new collections",
                    }),
                    r.jsxs("div", {
                      className: "flex flex-wrap gap-1",
                      children: [
                        r.jsx($, {
                          variant: "secondary",
                          className: "text-xs",
                          children: "All collections",
                        }),
                        r.jsx($, {
                          variant: "secondary",
                          className: "text-xs",
                          children: "collection:create",
                        }),
                        r.jsx($, {
                          variant: "secondary",
                          className: "text-xs",
                          children: "item:search",
                        }),
                      ],
                    }),
                  ],
                }),
                r.jsxs("div", {
                  className: "pt-3 border-t",
                  children: [
                    r.jsx("p", {
                      className: "font-semibold text-sm mb-1",
                      children: "Collection-Specific",
                    }),
                    r.jsx("p", {
                      className: "text-xs text-muted-foreground mb-2",
                      children:
                        "Limited to collections you explicitly grant access to",
                    }),
                    r.jsxs("div", {
                      className: "flex flex-wrap gap-1",
                      children: [
                        r.jsx($, {
                          variant: "outline",
                          className: "text-xs",
                          children: "collection:read",
                        }),
                        r.jsx($, {
                          variant: "outline",
                          className: "text-xs",
                          children: "item:add",
                        }),
                        r.jsx($, {
                          variant: "outline",
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
      }),
    ],
  });
}
const En = _.lazy(() =>
  _t(
    () => import("./create-api-key-dialog-Xc1SX7HA.js"),
    __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7]),
  ).then((e) => ({ default: e.CreateApiKeyDialog })),
);
function Ln() {
  const [e, o] = _.useState(!1),
    [t, n] = _.useState(!1),
    { data: s, isLoading: i } = A.apiKeys.list.useQuery(),
    { data: a, isLoading: u } = A.aiKeys.list.useQuery();
  return r.jsxs("div", {
    className: "container max-w-6xl mx-auto py-8 space-y-10",
    children: [
      r.jsxs("div", {
        className: "space-y-2",
        children: [
          r.jsx("div", {
            className: "flex items-center justify-between",
            children: r.jsxs("div", {
              className: "flex items-baseline gap-2",
              children: [
                r.jsx(ne, { className: "h-6 w-6" }),
                r.jsx("h1", {
                  className: "text-3xl font-display",
                  children: "Keys & Access",
                }),
                r.jsx(Dn, {}),
              ],
            }),
          }),
          r.jsx("p", {
            className: "text-muted-foreground",
            children:
              "Manage your Dex MCP server keys and external AI Model API keys.",
          }),
        ],
      }),
      r.jsxs("section", {
        className: "space-y-4",
        children: [
          r.jsxs("div", {
            className: "flex items-center justify-between",
            children: [
              r.jsxs("div", {
                className: "space-y-1",
                children: [
                  r.jsxs("h2", {
                    className: "text-xl font-semibold flex items-center gap-2",
                    children: [
                      r.jsx(ne, { className: "h-5 w-5 text-muted-foreground" }),
                      "Dex API Keys",
                    ],
                  }),
                  r.jsx("p", {
                    className: "text-sm text-muted-foreground",
                    children:
                      "Keys used to access your collections via MCP and other integrations.",
                  }),
                ],
              }),
              r.jsxs(P, {
                onClick: () => o(!0),
                children: [r.jsx(_e, {}), "Create Key"],
              }),
            ],
          }),
          i
            ? r.jsxs("div", {
                className: "space-y-4",
                children: [
                  r.jsx(b, { className: "h-12" }),
                  r.jsx(b, { className: "h-48" }),
                ],
              })
            : s && s.length > 0
              ? r.jsx(An, { data: s })
              : r.jsx(Fe, {
                  children: r.jsxs(je, {
                    children: [
                      r.jsx(Me, { variant: "icon", children: r.jsx(ne, {}) }),
                      r.jsx($e, { children: "No API keys yet" }),
                      r.jsx(Pe, {
                        children:
                          "Create your first API key to access your collections via MCP",
                      }),
                    ],
                  }),
                }),
        ],
      }),
      r.jsx(yt, {}),
      r.jsxs("section", {
        className: "space-y-4",
        children: [
          r.jsxs("div", {
            className: "flex items-center justify-between",
            children: [
              r.jsxs("div", {
                className: "space-y-1",
                children: [
                  r.jsxs("h2", {
                    className: "text-xl font-semibold flex items-center gap-2",
                    children: [
                      r.jsx(fe, { className: "h-5 w-5 text-muted-foreground" }),
                      "Model Keys",
                    ],
                  }),
                  r.jsx("p", {
                    className: "text-sm text-muted-foreground",
                    children:
                      "Bring your own API keys for AI models (OpenAI, Anthropic, Groq, OpenRouter).",
                  }),
                ],
              }),
              r.jsxs(P, {
                onClick: () => n(!0),
                variant: "secondary",
                children: [r.jsx(_e, {}), "Add Provider Key"],
              }),
            ],
          }),
          u
            ? r.jsxs("div", {
                className: "space-y-4",
                children: [
                  r.jsx(b, { className: "h-12" }),
                  r.jsx(b, { className: "h-48" }),
                ],
              })
            : a && a.length > 0
              ? r.jsx(Nn, { data: a })
              : r.jsx(Fe, {
                  children: r.jsxs(je, {
                    children: [
                      r.jsx(Me, { variant: "icon", children: r.jsx(fe, {}) }),
                      r.jsx($e, { children: "No model keys yet" }),
                      r.jsx(Pe, {
                        children:
                          "Add a provider API key to use native LLM features.",
                      }),
                    ],
                  }),
                }),
        ],
      }),
      r.jsx(_.Suspense, {
        fallback: null,
        children: r.jsx(En, { open: e, onOpenChange: o }),
      }),
      r.jsx(ut, { open: t, onOpenChange: n }),
    ],
  });
}
const Tn = Object.freeze(
  Object.defineProperty({ __proto__: null, default: Ln }, Symbol.toStringTag, {
    value: "Module",
  }),
);
export { Dt as L, Tn as a };
