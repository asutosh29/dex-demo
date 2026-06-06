import { R as c, L as f, A as x } from "./mermaid-GHXKKRXX-DbhF4r8w.js";
import { r as s } from "./react-vendor-BNYpS37_.js";
import { j as d } from "./trpc-vendor-BRuMgTtf.js";
import "./index-pheiOOBb.js";
import "./dnd-vendor-DPteac_0.js";
import "./textarea-_adpzycP.js";
import "./select-Dp9TOn1v.js";
var A = ({
  code: i,
  language: e,
  raw: t,
  className: l,
  startLine: u,
  lineNumbers: n,
  ...g
}) => {
  let { shikiTheme: o } = s.useContext(c),
    r = f(),
    [p, a] = s.useState(t);
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
      result: p,
      startLine: u,
      ...g,
    })
  );
};
export { A as HighlightedCodeBlockBody };
