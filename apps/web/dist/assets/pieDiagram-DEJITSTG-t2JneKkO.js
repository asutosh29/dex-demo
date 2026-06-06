import {
  $ as S,
  a2 as R,
  aN as J,
  g as K,
  s as Y,
  e as tt,
  f as et,
  C as at,
  B as rt,
  h as u,
  l as W,
  i as nt,
  Q as it,
  V as ot,
  ad as st,
  k as lt,
  H as ct,
  S as pt,
} from "./mermaid-GHXKKRXX-CpT3H1DD.js";
import { p as ut } from "./chunk-4BX2VUAB-BUkSZ28Z.js";
import { p as dt } from "./wardley-RL74JXVD-CPj1DfL2.js";
import { d as I } from "./arc-1BzMZkPz.js";
import { o as gt } from "./ordinal-Cboi1Yqb.js";
import "./trpc-vendor-CLp1aBhv.js";
import "./react-vendor-nYV-xjaT.js";
import "./index-5ght4WFU.js";
import "./dnd-vendor-iOQT1T9p.js";
import "./textarea-Dz78-NwY.js";
import "./select-BKmwFfg7.js";
import "./loader-N2m6ocFw.js";
import "./min-Ds1JRRbp.js";
import "./_baseUniq-DjtYDfgm.js";
import "./init-Gi6I4Gst.js";
function ft(t, a) {
  return a < t ? -1 : a > t ? 1 : a >= t ? 0 : NaN;
}
function ht(t) {
  return t;
}
function mt() {
  var t = ht,
    a = ft,
    f = null,
    y = S(0),
    o = S(R),
    d = S(0);
  function s(e) {
    var n,
      l = (e = J(e)).length,
      g,
      h,
      v = 0,
      c = new Array(l),
      i = new Array(l),
      x = +y.apply(this, arguments),
      w = Math.min(R, Math.max(-R, o.apply(this, arguments) - x)),
      m,
      D = Math.min(Math.abs(w) / l, d.apply(this, arguments)),
      $ = D * (w < 0 ? -1 : 1),
      p;
    for (n = 0; n < l; ++n)
      (p = i[(c[n] = n)] = +t(e[n], n, e)) > 0 && (v += p);
    for (
      a != null
        ? c.sort(function (A, C) {
            return a(i[A], i[C]);
          })
        : f != null &&
          c.sort(function (A, C) {
            return f(e[A], e[C]);
          }),
        n = 0,
        h = v ? (w - l * $) / v : 0;
      n < l;
      ++n, x = m
    )
      ((g = c[n]),
        (p = i[g]),
        (m = x + (p > 0 ? p * h : 0) + $),
        (i[g] = {
          data: e[g],
          index: n,
          value: p,
          startAngle: x,
          endAngle: m,
          padAngle: D,
        }));
    return i;
  }
  return (
    (s.value = function (e) {
      return arguments.length
        ? ((t = typeof e == "function" ? e : S(+e)), s)
        : t;
    }),
    (s.sortValues = function (e) {
      return arguments.length ? ((a = e), (f = null), s) : a;
    }),
    (s.sort = function (e) {
      return arguments.length ? ((f = e), (a = null), s) : f;
    }),
    (s.startAngle = function (e) {
      return arguments.length
        ? ((y = typeof e == "function" ? e : S(+e)), s)
        : y;
    }),
    (s.endAngle = function (e) {
      return arguments.length
        ? ((o = typeof e == "function" ? e : S(+e)), s)
        : o;
    }),
    (s.padAngle = function (e) {
      return arguments.length
        ? ((d = typeof e == "function" ? e : S(+e)), s)
        : d;
    }),
    s
  );
}
var vt = pt.pie,
  z = { sections: new Map(), showData: !1 },
  T = z.sections,
  F = z.showData,
  xt = structuredClone(vt),
  St = u(() => structuredClone(xt), "getConfig"),
  yt = u(() => {
    ((T = new Map()), (F = z.showData), ct());
  }, "clear"),
  wt = u(({ label: t, value: a }) => {
    if (a < 0)
      throw new Error(
        `"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`,
      );
    T.has(t) ||
      (T.set(t, a), W.debug(`added new section: ${t}, with value: ${a}`));
  }, "addSection"),
  At = u(() => T, "getSections"),
  Ct = u((t) => {
    F = t;
  }, "setShowData"),
  Dt = u(() => F, "getShowData"),
  _ = {
    getConfig: St,
    clear: yt,
    setDiagramTitle: rt,
    getDiagramTitle: at,
    setAccTitle: et,
    getAccTitle: tt,
    setAccDescription: Y,
    getAccDescription: K,
    addSection: wt,
    getSections: At,
    setShowData: Ct,
    getShowData: Dt,
  },
  $t = u((t, a) => {
    (ut(t, a), a.setShowData(t.showData), t.sections.map(a.addSection));
  }, "populateDb"),
  Tt = {
    parse: u(async (t) => {
      const a = await dt("pie", t);
      (W.debug(a), $t(a, _));
    }, "parse"),
  },
  kt = u(
    (t) => `
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,
    "getStyles",
  ),
  Et = kt,
  Mt = u((t) => {
    const a = [...t.values()].reduce((o, d) => o + d, 0),
      f = [...t.entries()]
        .map(([o, d]) => ({ label: o, value: d }))
        .filter((o) => (o.value / a) * 100 >= 1);
    return mt()
      .value((o) => o.value)
      .sort(null)(f);
  }, "createPieArcs"),
  bt = u((t, a, f, y) => {
    W.debug(
      `rendering pie chart
` + t,
    );
    const o = y.db,
      d = nt(),
      s = it(o.getConfig(), d.pie),
      e = 40,
      n = 18,
      l = 4,
      g = 450,
      h = g,
      v = ot(a),
      c = v.append("g");
    c.attr("transform", "translate(" + h / 2 + "," + g / 2 + ")");
    const { themeVariables: i } = d;
    let [x] = st(i.pieOuterStrokeWidth);
    x ??= 2;
    const w = s.textPosition,
      m = Math.min(h, g) / 2 - e,
      D = I().innerRadius(0).outerRadius(m),
      $ = I()
        .innerRadius(m * w)
        .outerRadius(m * w);
    c.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", m + x / 2)
      .attr("class", "pieOuterCircle");
    const p = o.getSections(),
      A = Mt(p),
      C = [
        i.pie1,
        i.pie2,
        i.pie3,
        i.pie4,
        i.pie5,
        i.pie6,
        i.pie7,
        i.pie8,
        i.pie9,
        i.pie10,
        i.pie11,
        i.pie12,
      ];
    let k = 0;
    p.forEach((r) => {
      k += r;
    });
    const N = A.filter((r) => ((r.data.value / k) * 100).toFixed(0) !== "0"),
      E = gt(C).domain([...p.keys()]);
    (c
      .selectAll("mySlices")
      .data(N)
      .enter()
      .append("path")
      .attr("d", D)
      .attr("fill", (r) => E(r.data.label))
      .attr("class", "pieCircle"),
      c
        .selectAll("mySlices")
        .data(N)
        .enter()
        .append("text")
        .text((r) => ((r.data.value / k) * 100).toFixed(0) + "%")
        .attr("transform", (r) => "translate(" + $.centroid(r) + ")")
        .style("text-anchor", "middle")
        .attr("class", "slice"));
    const V = c
        .append("text")
        .text(o.getDiagramTitle())
        .attr("x", 0)
        .attr("y", -400 / 2)
        .attr("class", "pieTitleText"),
      B = [...p.entries()].map(([r, b]) => ({ label: r, value: b })),
      M = c
        .selectAll(".legend")
        .data(B)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (r, b) => {
          const P = n + l,
            X = (P * B.length) / 2,
            Z = 12 * n,
            q = b * P - X;
          return "translate(" + Z + "," + q + ")";
        });
    (M.append("rect")
      .attr("width", n)
      .attr("height", n)
      .style("fill", (r) => E(r.label))
      .style("stroke", (r) => E(r.label)),
      M.append("text")
        .attr("x", n + l)
        .attr("y", n - l)
        .text((r) => (o.getShowData() ? `${r.label} [${r.value}]` : r.label)));
    const U = Math.max(
        ...M.selectAll("text")
          .nodes()
          .map((r) => r?.getBoundingClientRect().width ?? 0),
      ),
      j = h + e + n + l + U,
      G = V.node()?.getBoundingClientRect().width ?? 0,
      H = h / 2 - G / 2,
      Q = h / 2 + G / 2,
      L = Math.min(0, H),
      O = Math.max(j, Q) - L;
    (v.attr("viewBox", `${L} 0 ${O} ${g}`), lt(v, g, O, s.useMaxWidth));
  }, "draw"),
  Rt = { draw: bt },
  Xt = { parser: Tt, db: _, renderer: Rt, styles: Et };
export { Xt as diagram };
