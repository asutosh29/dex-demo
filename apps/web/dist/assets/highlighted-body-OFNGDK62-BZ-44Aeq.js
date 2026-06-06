import { R as c, L as f, A as x } from "./mermaid-GHXKKRXX-Dh5WDz4l.js";
import { r as s } from "./react-vendor-nYV-xjaT.js";
import { j as d } from "./trpc-vendor-CLp1aBhv.js";
import "./index-YxyRed48.js";
import "./dnd-vendor-iOQT1T9p.js";
import "./textarea-CywMa2Jv.js";
import "./select-3yEQBxpb.js";
import "./loader-BXCJJTH_.js";
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
