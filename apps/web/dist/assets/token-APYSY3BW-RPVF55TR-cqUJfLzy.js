import { r as v } from "./chunk-ZCJMLMGS-jnL6iStt.js";
import { _ as O, r as w } from "./mermaid-GHXKKRXX-C27O7RqQ.js";
import "./trpc-vendor-BRuMgTtf.js";
import "./react-vendor-BNYpS37_.js";
import "./index-pSmjkKS7.js";
import "./dnd-vendor-DPteac_0.js";
import "./textarea-C-LGZX5X.js";
import "./select-Dv83jA36.js";
var y = O({
    "../../../node_modules/.pnpm/@vercel+oidc@3.1.0/node_modules/@vercel/oidc/dist/token.js"(
      h,
      _,
    ) {
      var a = Object.defineProperty,
        k = Object.getOwnPropertyDescriptor,
        l = Object.getOwnPropertyNames,
        s = Object.prototype.hasOwnProperty,
        d = (e, r) => {
          for (var o in r) a(e, o, { get: r[o], enumerable: !0 });
        },
        u = (e, r, o, n) => {
          if ((r && typeof r == "object") || typeof r == "function")
            for (let i of l(r))
              !s.call(e, i) &&
                i !== o &&
                a(e, i, {
                  get: () => r[i],
                  enumerable: !(n = k(r, i)) || n.enumerable,
                });
          return e;
        },
        f = (e) => u(a({}, "__esModule", { value: !0 }), e),
        c = {};
      (d(c, { refreshToken: () => m }), (_.exports = f(c)));
      var p = w(),
        t = v();
      async function m() {
        const { projectId: e, teamId: r } = (0, t.findProjectInfo)();
        let o = (0, t.loadToken)(e);
        if (!o || (0, t.isExpired)((0, t.getTokenPayload)(o.token))) {
          const n = await (0, t.getVercelCliToken)();
          if (!n)
            throw new p.VercelOidcTokenError(
              "Failed to refresh OIDC token: Log in to Vercel CLI and link your project with `vc link`",
            );
          if (!e)
            throw new p.VercelOidcTokenError(
              "Failed to refresh OIDC token: Try re-linking your project with `vc link`",
            );
          if (((o = await (0, t.getVercelOidcToken)(n, e, r)), !o))
            throw new p.VercelOidcTokenError("Failed to refresh OIDC token");
          (0, t.saveToken)(o, e);
        }
        o.token;
      }
    },
  }),
  V = y();
export { V as default };
