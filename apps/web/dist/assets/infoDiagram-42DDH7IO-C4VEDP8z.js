import { h as a, l as o, V as s, k as n } from "./mermaid-GHXKKRXX-C27O7RqQ.js";
import { p } from "./wardley-RL74JXVD-CKQuThhO.js";
import "./trpc-vendor-BRuMgTtf.js";
import "./react-vendor-BNYpS37_.js";
import "./index-pSmjkKS7.js";
import "./dnd-vendor-DPteac_0.js";
import "./textarea-C-LGZX5X.js";
import "./select-Dv83jA36.js";
import "./min-B8-GNJlF.js";
import "./_baseUniq-DKJWF2Me.js";
var m = {
    parse: a(async (r) => {
      const t = await p("info", r);
      o.debug(t);
    }, "parse"),
  },
  g = { version: "11.14.0" },
  v = a(() => g.version, "getVersion"),
  d = { getVersion: v },
  c = a((r, t, i) => {
    o.debug(
      `rendering info diagram
` + r,
    );
    const e = s(t);
    (n(e, 100, 400, !0),
      e
        .append("g")
        .append("text")
        .attr("x", 100)
        .attr("y", 40)
        .attr("class", "version")
        .attr("font-size", 32)
        .style("text-anchor", "middle")
        .text(`v${i}`));
  }, "draw"),
  l = { draw: c },
  D = { parser: m, db: d, renderer: l };
export { D as diagram };
