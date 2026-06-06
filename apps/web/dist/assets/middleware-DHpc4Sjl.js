import { a as R } from "./index-pheiOOBb.js";
import { R as p } from "./react-vendor-BNYpS37_.js";
const x = [
    ["path", { d: "M12 2v4", key: "3427ic" }],
    ["path", { d: "m16.2 7.8 2.9-2.9", key: "r700ao" }],
    ["path", { d: "M18 12h4", key: "wj9ykh" }],
    ["path", { d: "m16.2 16.2 2.9 2.9", key: "1bxg5t" }],
    ["path", { d: "M12 18v4", key: "jadmvz" }],
    ["path", { d: "m4.9 19.1 2.9-2.9", key: "bwix9q" }],
    ["path", { d: "M2 12h4", key: "j09sii" }],
    ["path", { d: "m4.9 4.9 2.9 2.9", key: "giyufr" }],
  ],
  P = R("loader", x),
  w = (t) => {
    let o;
    const e = new Set(),
      s = (l, u) => {
        const d = typeof l == "function" ? l(o) : l;
        if (!Object.is(d, o)) {
          const b = o;
          ((o =
            (u ?? (typeof d != "object" || d === null))
              ? d
              : Object.assign({}, o, d)),
            e.forEach((v) => v(o, b)));
        }
      },
      a = () => o,
      c = {
        setState: s,
        getState: a,
        getInitialState: () => f,
        subscribe: (l) => (e.add(l), () => e.delete(l)),
      },
      f = (o = t(s, a, c));
    return c;
  },
  L = (t) => (t ? w(t) : w),
  E = (t) => t;
function M(t, o = E) {
  const e = p.useSyncExternalStore(
    t.subscribe,
    p.useCallback(() => o(t.getState()), [t, o]),
    p.useCallback(() => o(t.getInitialState()), [t, o]),
  );
  return (p.useDebugValue(e), e);
}
const H = (t) => {
    const o = L(t),
      e = (s) => M(o, s);
    return (Object.assign(e, o), e);
  },
  q = (t) => (t ? H(t) : H);
function N(t, o) {
  let e;
  try {
    e = t();
  } catch {
    return;
  }
  return {
    getItem: (a) => {
      var n;
      const h = (f) => (f === null ? null : JSON.parse(f, void 0)),
        c = (n = e.getItem(a)) != null ? n : null;
      return c instanceof Promise ? c.then(h) : h(c);
    },
    setItem: (a, n) => e.setItem(a, JSON.stringify(n, void 0)),
    removeItem: (a) => e.removeItem(a),
  };
}
const _ = (t) => (o) => {
    try {
      const e = t(o);
      return e instanceof Promise
        ? e
        : {
            then(s) {
              return _(s)(e);
            },
            catch(s) {
              return this;
            },
          };
    } catch (e) {
      return {
        then(s) {
          return this;
        },
        catch(s) {
          return _(s)(e);
        },
      };
    }
  },
  C = (t, o) => (e, s, a) => {
    let n = {
        storage: N(() => window.localStorage),
        partialize: (r) => r,
        version: 0,
        merge: (r, y) => ({ ...y, ...r }),
        ...o,
      },
      h = !1,
      c = 0;
    const f = new Set(),
      l = new Set();
    let u = n.storage;
    if (!u)
      return t(
        (...r) => {
          (console.warn(
            `[zustand persist middleware] Unable to update item '${n.name}', the given storage is currently unavailable.`,
          ),
            e(...r));
        },
        s,
        a,
      );
    const d = () => {
        const r = n.partialize({ ...s() });
        return u.setItem(n.name, { state: r, version: n.version });
      },
      b = a.setState;
    a.setState = (r, y) => (b(r, y), d());
    const v = t((...r) => (e(...r), d()), s, a);
    a.getInitialState = () => v;
    let g;
    const j = () => {
      var r, y;
      if (!u) return;
      const I = ++c;
      ((h = !1),
        f.forEach((i) => {
          var m;
          return i((m = s()) != null ? m : v);
        }));
      const S =
        ((y = n.onRehydrateStorage) == null
          ? void 0
          : y.call(n, (r = s()) != null ? r : v)) || void 0;
      return _(u.getItem.bind(u))(n.name)
        .then((i) => {
          if (i)
            if (typeof i.version == "number" && i.version !== n.version) {
              if (n.migrate) {
                const m = n.migrate(i.state, i.version);
                return m instanceof Promise ? m.then((k) => [!0, k]) : [!0, m];
              }
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided",
              );
            } else return [!1, i.state];
          return [!1, void 0];
        })
        .then((i) => {
          var m;
          if (I !== c) return;
          const [k, O] = i;
          if (((g = n.merge(O, (m = s()) != null ? m : v)), e(g, !0), k))
            return d();
        })
        .then(() => {
          I === c &&
            (S?.(s(), void 0), (g = s()), (h = !0), l.forEach((i) => i(g)));
        })
        .catch((i) => {
          I === c && S?.(void 0, i);
        });
    };
    return (
      (a.persist = {
        setOptions: (r) => {
          ((n = { ...n, ...r }), r.storage && (u = r.storage));
        },
        clearStorage: () => {
          u?.removeItem(n.name);
        },
        getOptions: () => n,
        rehydrate: () => j(),
        hasHydrated: () => h,
        onHydrate: (r) => (
          f.add(r),
          () => {
            f.delete(r);
          }
        ),
        onFinishHydration: (r) => (
          l.add(r),
          () => {
            l.delete(r);
          }
        ),
      }),
      n.skipHydration || j(),
      g || v
    );
  },
  B = C;
export { P as L, q as c, B as p };
