import { h as a, l as o, V as s, k as p } from "./mermaid-GHXKKRXX-Dh5WDz4l.js";
import { p as n } from "./wardley-RL74JXVD-Dxhqc7qG.js";
import "./trpc-vendor-CLp1aBhv.js";
import "./react-vendor-nYV-xjaT.js";
import "./index-YxyRed48.js";
import "./dnd-vendor-iOQT1T9p.js";
import "./textarea-CywMa2Jv.js";
import "./select-3yEQBxpb.js";
import "./loader-BXCJJTH_.js";
import "./min-D3Usjkal.js";
import "./_baseUniq-BdQn9YS5.js";
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
