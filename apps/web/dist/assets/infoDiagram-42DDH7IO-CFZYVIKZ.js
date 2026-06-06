import { h as a, l as o, V as s, k as n } from "./mermaid-GHXKKRXX-DbhF4r8w.js";
import { p } from "./wardley-RL74JXVD-MgP0OKME.js";
import "./trpc-vendor-BRuMgTtf.js";
import "./react-vendor-BNYpS37_.js";
import "./index-pheiOOBb.js";
import "./dnd-vendor-DPteac_0.js";
import "./textarea-_adpzycP.js";
import "./select-Dp9TOn1v.js";
import "./min-zg1WETvq.js";
import "./_baseUniq-o2_CVhJE.js";
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
