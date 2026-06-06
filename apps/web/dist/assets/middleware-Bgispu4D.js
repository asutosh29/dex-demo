import { j } from "./trpc-vendor-CLp1aBhv.js";
import { r as l, R as P } from "./react-vendor-nYV-xjaT.js";
import {
  a3 as J,
  a4 as M,
  a5 as A,
  a6 as N,
  a7 as U,
  a8 as B,
  a9 as K,
} from "./index-YxyRed48.js";
function F(e, r) {
  if (typeof e == "function") return e(r);
  e != null && (e.current = r);
}
function W(...e) {
  return (r) => {
    let t = !1;
    const s = e.map((a) => {
      const n = F(a, r);
      return (!t && typeof n == "function" && (t = !0), n);
    });
    if (t)
      return () => {
        for (let a = 0; a < s.length; a++) {
          const n = s[a];
          typeof n == "function" ? n() : F(e[a], null);
        }
      };
  };
}
function G(...e) {
  return l.useCallback(W(...e), e);
}
class X extends l.Component {
  getSnapshotBeforeUpdate(r) {
    const t = this.props.childRef.current;
    if (M(t) && r.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = t.offsetParent,
        a = (M(s) && s.offsetWidth) || 0,
        n = (M(s) && s.offsetHeight) || 0,
        f = getComputedStyle(t),
        i = this.props.sizeRef.current;
      ((i.height = parseFloat(f.height)),
        (i.width = parseFloat(f.width)),
        (i.top = t.offsetTop),
        (i.left = t.offsetLeft),
        (i.right = a - i.width - i.left),
        (i.bottom = n - i.height - i.top));
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function Y({
  children: e,
  isPresent: r,
  anchorX: t,
  anchorY: s,
  root: a,
  pop: n,
}) {
  const f = l.useId(),
    i = l.useRef(null),
    v = l.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 }),
    { nonce: p } = l.useContext(J),
    u = e.props?.ref ?? e?.ref,
    C = G(i, u);
  return (
    l.useInsertionEffect(() => {
      const {
        width: h,
        height: d,
        top: g,
        left: b,
        right: o,
        bottom: S,
      } = v.current;
      if (r || n === !1 || !i.current || !h || !d) return;
      const I = t === "left" ? `left: ${b}` : `right: ${o}`,
        R = s === "bottom" ? `bottom: ${S}` : `top: ${g}`;
      i.current.dataset.motionPopId = f;
      const c = document.createElement("style");
      p && (c.nonce = p);
      const y = a ?? document.head;
      return (
        y.appendChild(c),
        c.sheet &&
          c.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${h}px !important;
            height: ${d}px !important;
            ${I}px !important;
            ${R}px !important;
          }
        `),
        () => {
          (i.current?.removeAttribute("data-motion-pop-id"),
            y.contains(c) && y.removeChild(c));
        }
      );
    }, [r]),
    j.jsx(X, {
      isPresent: r,
      childRef: i,
      sizeRef: v,
      pop: n,
      children: n === !1 ? e : l.cloneElement(e, { ref: C }),
    })
  );
}
const q = ({
  children: e,
  initial: r,
  isPresent: t,
  onExitComplete: s,
  custom: a,
  presenceAffectsLayout: n,
  mode: f,
  anchorX: i,
  anchorY: v,
  root: p,
}) => {
  const u = A(Q),
    C = l.useId();
  let h = !0,
    d = l.useMemo(
      () => (
        (h = !1),
        {
          id: C,
          initial: r,
          isPresent: t,
          custom: a,
          onExitComplete: (g) => {
            u.set(g, !0);
            for (const b of u.values()) if (!b) return;
            s && s();
          },
          register: (g) => (u.set(g, !1), () => u.delete(g)),
        }
      ),
      [t, u, s],
    );
  return (
    n && h && (d = { ...d }),
    l.useMemo(() => {
      u.forEach((g, b) => u.set(b, !1));
    }, [t]),
    l.useEffect(() => {
      !t && !u.size && s && s();
    }, [t]),
    (e = j.jsx(Y, {
      pop: f === "popLayout",
      isPresent: t,
      anchorX: i,
      anchorY: v,
      root: p,
      children: e,
    })),
    j.jsx(N.Provider, { value: d, children: e })
  );
};
function Q() {
  return new Map();
}
const $ = (e) => e.key || "";
function O(e) {
  const r = [];
  return (
    l.Children.forEach(e, (t) => {
      l.isValidElement(t) && r.push(t);
    }),
    r
  );
}
const ie = ({
    children: e,
    custom: r,
    initial: t = !0,
    onExitComplete: s,
    presenceAffectsLayout: a = !0,
    mode: n = "sync",
    propagate: f = !1,
    anchorX: i = "left",
    anchorY: v = "top",
    root: p,
  }) => {
    const [u, C] = U(f),
      h = l.useMemo(() => O(e), [e]),
      d = f && !u ? [] : h.map($),
      g = l.useRef(!0),
      b = l.useRef(h),
      o = A(() => new Map()),
      S = l.useRef(new Set()),
      [I, R] = l.useState(h),
      [c, y] = l.useState(h);
    B(() => {
      ((g.current = !1), (b.current = h));
      for (let x = 0; x < c.length; x++) {
        const m = $(c[x]);
        d.includes(m)
          ? (o.delete(m), S.current.delete(m))
          : o.get(m) !== !0 && o.set(m, !1);
      }
    }, [c, d.length, d.join("-")]);
    const w = [];
    if (h !== I) {
      let x = [...h];
      for (let m = 0; m < c.length; m++) {
        const E = c[m],
          H = $(E);
        d.includes(H) || (x.splice(m, 0, E), w.push(E));
      }
      return (n === "wait" && w.length && (x = w), y(O(x)), R(h), null);
    }
    const { forceRender: k } = l.useContext(K);
    return j.jsx(j.Fragment, {
      children: c.map((x) => {
        const m = $(x),
          E = f && !u ? !1 : h === c || d.includes(m),
          H = () => {
            if (S.current.has(m)) return;
            if (o.has(m)) (S.current.add(m), o.set(m, !0));
            else return;
            let L = !0;
            (o.forEach((D) => {
              D || (L = !1);
            }),
              L && (k?.(), y(b.current), f && C?.(), s && s()));
          };
        return j.jsx(
          q,
          {
            isPresent: E,
            initial: !g.current || t ? void 0 : !1,
            custom: r,
            presenceAffectsLayout: a,
            mode: n,
            root: p,
            onExitComplete: E ? void 0 : H,
            anchorX: i,
            anchorY: v,
            children: x,
          },
          m,
        );
      }),
    });
  },
  T = (e) => {
    let r;
    const t = new Set(),
      s = (p, u) => {
        const C = typeof p == "function" ? p(r) : p;
        if (!Object.is(C, r)) {
          const h = r;
          ((r =
            (u ?? (typeof C != "object" || C === null))
              ? C
              : Object.assign({}, r, C)),
            t.forEach((d) => d(r, h)));
        }
      },
      a = () => r,
      i = {
        setState: s,
        getState: a,
        getInitialState: () => v,
        subscribe: (p) => (t.add(p), () => t.delete(p)),
      },
      v = (r = e(s, a, i));
    return i;
  },
  Z = (e) => (e ? T(e) : T),
  V = (e) => e;
function ee(e, r = V) {
  const t = P.useSyncExternalStore(
    e.subscribe,
    P.useCallback(() => r(e.getState()), [e, r]),
    P.useCallback(() => r(e.getInitialState()), [e, r]),
  );
  return (P.useDebugValue(t), t);
}
const z = (e) => {
    const r = Z(e),
      t = (s) => ee(r, s);
    return (Object.assign(t, r), t);
  },
  ae = (e) => (e ? z(e) : z);
function te(e, r) {
  let t;
  try {
    t = e();
  } catch {
    return;
  }
  return {
    getItem: (a) => {
      var n;
      const f = (v) => (v === null ? null : JSON.parse(v, void 0)),
        i = (n = t.getItem(a)) != null ? n : null;
      return i instanceof Promise ? i.then(f) : f(i);
    },
    setItem: (a, n) => t.setItem(a, JSON.stringify(n, void 0)),
    removeItem: (a) => t.removeItem(a),
  };
}
const _ = (e) => (r) => {
    try {
      const t = e(r);
      return t instanceof Promise
        ? t
        : {
            then(s) {
              return _(s)(t);
            },
            catch(s) {
              return this;
            },
          };
    } catch (t) {
      return {
        then(s) {
          return this;
        },
        catch(s) {
          return _(s)(t);
        },
      };
    }
  },
  ne = (e, r) => (t, s, a) => {
    let n = {
        storage: te(() => window.localStorage),
        partialize: (o) => o,
        version: 0,
        merge: (o, S) => ({ ...S, ...o }),
        ...r,
      },
      f = !1,
      i = 0;
    const v = new Set(),
      p = new Set();
    let u = n.storage;
    if (!u)
      return e(
        (...o) => {
          (console.warn(
            `[zustand persist middleware] Unable to update item '${n.name}', the given storage is currently unavailable.`,
          ),
            t(...o));
        },
        s,
        a,
      );
    const C = () => {
        const o = n.partialize({ ...s() });
        return u.setItem(n.name, { state: o, version: n.version });
      },
      h = a.setState;
    a.setState = (o, S) => (h(o, S), C());
    const d = e((...o) => (t(...o), C()), s, a);
    a.getInitialState = () => d;
    let g;
    const b = () => {
      var o, S;
      if (!u) return;
      const I = ++i;
      ((f = !1),
        v.forEach((c) => {
          var y;
          return c((y = s()) != null ? y : d);
        }));
      const R =
        ((S = n.onRehydrateStorage) == null
          ? void 0
          : S.call(n, (o = s()) != null ? o : d)) || void 0;
      return _(u.getItem.bind(u))(n.name)
        .then((c) => {
          if (c)
            if (typeof c.version == "number" && c.version !== n.version) {
              if (n.migrate) {
                const y = n.migrate(c.state, c.version);
                return y instanceof Promise ? y.then((w) => [!0, w]) : [!0, y];
              }
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided",
              );
            } else return [!1, c.state];
          return [!1, void 0];
        })
        .then((c) => {
          var y;
          if (I !== i) return;
          const [w, k] = c;
          if (((g = n.merge(k, (y = s()) != null ? y : d)), t(g, !0), w))
            return C();
        })
        .then(() => {
          I === i &&
            (R?.(s(), void 0), (g = s()), (f = !0), p.forEach((c) => c(g)));
        })
        .catch((c) => {
          I === i && R?.(void 0, c);
        });
    };
    return (
      (a.persist = {
        setOptions: (o) => {
          ((n = { ...n, ...o }), o.storage && (u = o.storage));
        },
        clearStorage: () => {
          u?.removeItem(n.name);
        },
        getOptions: () => n,
        rehydrate: () => b(),
        hasHydrated: () => f,
        onHydrate: (o) => (
          v.add(o),
          () => {
            v.delete(o);
          }
        ),
        onFinishHydration: (o) => (
          p.add(o),
          () => {
            p.delete(o);
          }
        ),
      }),
      n.skipHydration || b(),
      g || d
    );
  },
  ce = ne;
export { ie as A, ae as c, ce as p };
