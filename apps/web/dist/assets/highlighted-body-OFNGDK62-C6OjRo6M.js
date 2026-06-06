import { R as c, L as f, A as x } from "./mermaid-GHXKKRXX-CpT3H1DD.js";
import { r as s } from "./react-vendor-nYV-xjaT.js";
import { j as d } from "./trpc-vendor-CLp1aBhv.js";
import "./index-5ght4WFU.js";
import "./dnd-vendor-iOQT1T9p.js";
import "./textarea-Dz78-NwY.js";
import "./select-BKmwFfg7.js";
import "./loader-N2m6ocFw.js";
var B = ({
  code: i,
  language: e,
  raw: t,
  className: l,
  startLine: u,
  lineNumbers: n,
  ...p
}) => {
  let { shikiTheme: o } = s.useContext(c),
    r = f(),
    [g, a] = s.useState(t);
  return (
    s.useEffect(() => {
      if (!r) {
        a(t);
        return;
      }
      let m = r.highlight({ code: i, language: e, themes: o }, (h) => {
        a(h);
      });
      m && a(m);
    }, [i, e, o, r, t]),
    d.jsx(x, {
      className: l,
      language: e,
      lineNumbers: n,
      result: g,
      startLine: u,
      ...p,
    })
  );
};
export { B as HighlightedCodeBlockBody };
