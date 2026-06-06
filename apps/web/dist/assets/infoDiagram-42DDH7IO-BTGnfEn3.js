import { h as a, l as o, V as s, k as p } from "./mermaid-GHXKKRXX-CpT3H1DD.js";
import { p as n } from "./wardley-RL74JXVD-CPj1DfL2.js";
import "./trpc-vendor-CLp1aBhv.js";
import "./react-vendor-nYV-xjaT.js";
import "./index-5ght4WFU.js";
import "./dnd-vendor-iOQT1T9p.js";
import "./textarea-Dz78-NwY.js";
import "./select-BKmwFfg7.js";
import "./loader-N2m6ocFw.js";
import "./min-Ds1JRRbp.js";
import "./_baseUniq-DjtYDfgm.js";
var m = {
    parse: a(async (r) => {
      const t = await n("info", r);
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
    (p(e, 100, 400, !0),
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
  E = { parser: m, db: d, renderer: l };
export { E as diagram };
