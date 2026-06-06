import {
  B as f,
  f as x,
  s as C,
  C as B,
  g as T,
  e as y,
  h as s,
  Q as b,
  l as k,
  V,
  k as S,
  O as N,
  S as _,
  H as D,
} from "./mermaid-GHXKKRXX-CpT3H1DD.js";
import { p as $ } from "./chunk-4BX2VUAB-BUkSZ28Z.js";
import { I as A } from "./chunk-QZHKN3VN-5Si0rc1p.js";
import { p as H } from "./wardley-RL74JXVD-CPj1DfL2.js";
import "./trpc-vendor-CLp1aBhv.js";
import "./react-vendor-nYV-xjaT.js";
import "./index-5ght4WFU.js";
import "./dnd-vendor-iOQT1T9p.js";
import "./textarea-Dz78-NwY.js";
import "./select-BKmwFfg7.js";
import "./loader-N2m6ocFw.js";
import "./min-Ds1JRRbp.js";
import "./_baseUniq-DjtYDfgm.js";
var d = new A(() => ({
    cnt: 1,
    stack: [{ id: 0, level: -1, name: "/", children: [] }],
  })),
  I = s(() => {
    (d.reset(), D());
  }, "clear"),
  X = s(() => d.records.stack[0], "getRoot"),
  z = s(() => d.records.cnt, "getCount"),
  L = _.treeView,
  R = s(() => b(L, N().treeView), "getConfig"),
  W = s((e, t) => {
    for (; e <= d.records.stack[d.records.stack.length - 1].level; )
      d.records.stack.pop();
    const r = { id: d.records.cnt++, level: e, name: t, children: [] };
    (d.records.stack[d.records.stack.length - 1].children.push(r),
      d.records.stack.push(r));
  }, "addNode"),
  E = {
    clear: I,
    addNode: W,
    getRoot: X,
    getCount: z,
    getConfig: R,
    getAccTitle: y,
    getAccDescription: T,
    getDiagramTitle: B,
    setAccDescription: C,
    setAccTitle: x,
    setDiagramTitle: f,
  },
  w = E,
  M = s((e) => {
    ($(e, w),
      e.nodes.map((t) => w.addNode(t.indent ? parseInt(t.indent) : 0, t.name)));
  }, "populate"),
  F = {
    parse: s(async (e) => {
      const t = await H("treeView", e);
      (k.debug(t), M(t));
    }, "parse"),
  },
  Y = s((e, t, r, i, n) => {
    const c = i
        .append("text")
        .text(r.name)
        .attr("dominant-baseline", "middle")
        .attr("class", "treeView-node-label"),
      { height: p, width: a } = c.node().getBBox(),
      l = p + n.paddingY * 2,
      o = a + n.paddingX * 2;
    (c.attr("x", e + n.paddingX),
      c.attr("y", t + l / 2),
      (r.BBox = { x: e, y: t, width: o, height: l }));
  }, "positionLabel"),
  u = s(
    (e, t, r, i, n, c) =>
      e
        .append("line")
        .attr("x1", t)
        .attr("y1", r)
        .attr("x2", i)
        .attr("y2", n)
        .attr("stroke-width", c)
        .attr("class", "treeView-node-line"),
    "positionLine",
  ),
  O = s((e, t, r) => {
    let i = 0,
      n = 0;
    const c = s((a, l, o, h) => {
        const m = h * (o.rowIndent + o.paddingX);
        Y(m, i, l, a, o);
        const { height: g, width: v } = l.BBox;
        (u(a, m - o.rowIndent, i + g / 2, m, i + g / 2, o.lineThickness),
          (n = Math.max(n, m + v)),
          (i += g));
      }, "drawNode"),
      p = s((a, l = 0) => {
        (c(e, a, r, l),
          a.children.forEach((g) => {
            p(g, l + 1);
          }));
        const { x: o, y: h, height: m } = a.BBox;
        if (a.children.length) {
          const { y: g, height: v } = a.children[a.children.length - 1].BBox;
          u(
            e,
            o + r.paddingX,
            h + m,
            o + r.paddingX,
            g + v / 2 + r.lineThickness / 2,
            r.lineThickness,
          );
        }
      }, "processNode");
    return (p(t), { totalHeight: i, totalWidth: n });
  }, "drawTree"),
  Q = s((e, t, r, i) => {
    k.debug(
      `Rendering treeView diagram
` + e,
    );
    const n = i.db,
      c = n.getRoot(),
      p = n.getConfig(),
      a = V(t),
      l = a.append("g");
    l.attr("class", "tree-view");
    const { totalHeight: o, totalWidth: h } = O(l, c, p);
    (a.attr("viewBox", `-${p.lineThickness / 2} 0 ${h} ${o}`),
      S(a, o, h, p.useMaxWidth));
  }, "draw"),
  j = { draw: Q },
  q = j,
  G = { labelFontSize: "16px", labelColor: "black", lineColor: "black" },
  J = s(({ treeView: e }) => {
    const { labelFontSize: t, labelColor: r, lineColor: i } = b(G, e);
    return `
    .treeView-node-label {
        font-size: ${t};
        fill: ${r};
    }
    .treeView-node-line {
        stroke: ${i};
    }
    `;
  }, "styles"),
  K = J,
  ce = { db: w, renderer: q, parser: F, styles: K };
export { ce as diagram };
