import { j as X } from "./trpc-vendor-CLp1aBhv.js";
import {
  r as l,
  b as Wr,
  a as Ut,
  d as li,
  e as ai,
  f as fi,
} from "./react-vendor-nYV-xjaT.js";
import {
  aj as zn,
  ak as Je,
  al as fr,
  am as Kr,
  an as di,
  ao as Br,
  ap as xn,
  aq as mi,
  ar as $r,
  as as Ge,
  at as sn,
  au as pi,
  av as gi,
  aw as Ur,
  ax as hi,
  ay as vi,
  az as En,
  aA as bi,
  aB as yi,
  aC as Ri,
  aD as xi,
  aE as Ei,
  aF as Ii,
  aG as wi,
  aH as Ci,
  aI as Ti,
  aJ as Si,
  aK as Ai,
  aL as Pi,
  aM as Mi,
  a as Ze,
  aN as Yr,
  B as dr,
  L as Oi,
  $ as ki,
} from "./index-YxyRed48.js";
import { T as Ni } from "./textarea-CywMa2Jv.js";
var z = {};
var Di = [
    "input:not([inert]):not([inert] *)",
    "select:not([inert]):not([inert] *)",
    "textarea:not([inert]):not([inert] *)",
    "a[href]:not([inert]):not([inert] *)",
    "button:not([inert]):not([inert] *)",
    "[tabindex]:not(slot):not([inert]):not([inert] *)",
    "audio[controls]:not([inert]):not([inert] *)",
    "video[controls]:not([inert]):not([inert] *)",
    '[contenteditable]:not([contenteditable="false"]):not([inert]):not([inert] *)',
    "details>summary:first-of-type:not([inert]):not([inert] *)",
    "details:not([inert]):not([inert] *)",
  ],
  cn = Di.join(","),
  Gr = typeof Element > "u",
  Ht = Gr
    ? function () {}
    : Element.prototype.matches ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector,
  ln =
    !Gr && Element.prototype.getRootNode
      ? function (t) {
          var e;
          return t == null || (e = t.getRootNode) === null || e === void 0
            ? void 0
            : e.call(t);
        }
      : function (t) {
          return t?.ownerDocument;
        },
  an = function (e, r) {
    var o;
    r === void 0 && (r = !0);
    var n =
        e == null || (o = e.getAttribute) === null || o === void 0
          ? void 0
          : o.call(e, "inert"),
      s = n === "" || n === "true",
      i =
        s ||
        (r &&
          e &&
          (typeof e.closest == "function"
            ? e.closest("[inert]")
            : an(e.parentNode)));
    return i;
  },
  Li = function (e) {
    var r,
      o =
        e == null || (r = e.getAttribute) === null || r === void 0
          ? void 0
          : r.call(e, "contenteditable");
    return o === "" || o === "true";
  },
  qr = function (e, r, o) {
    if (an(e)) return [];
    var n = Array.prototype.slice.apply(e.querySelectorAll(cn));
    return (r && Ht.call(e, cn) && n.unshift(e), (n = n.filter(o)), n);
  },
  fn = function (e, r, o) {
    for (var n = [], s = Array.from(e); s.length; ) {
      var i = s.shift();
      if (!an(i, !1))
        if (i.tagName === "SLOT") {
          var u = i.assignedElements(),
            f = u.length ? u : i.children,
            a = fn(f, !0, o);
          o.flatten
            ? n.push.apply(n, a)
            : n.push({ scopeParent: i, candidates: a });
        } else {
          var d = Ht.call(i, cn);
          d && o.filter(i) && (r || !e.includes(i)) && n.push(i);
          var b =
              i.shadowRoot ||
              (typeof o.getShadowRoot == "function" && o.getShadowRoot(i)),
            v = !an(b, !1) && (!o.shadowRootFilter || o.shadowRootFilter(i));
          if (b && v) {
            var h = fn(b === !0 ? i.children : b.children, !0, o);
            o.flatten
              ? n.push.apply(n, h)
              : n.push({ scopeParent: i, candidates: h });
          } else s.unshift.apply(s, i.children);
        }
    }
    return n;
  },
  Xr = function (e) {
    return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
  },
  Zr = function (e) {
    if (!e) throw new Error("No node provided");
    return e.tabIndex < 0 &&
      (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || Li(e)) &&
      !Xr(e)
      ? 0
      : e.tabIndex;
  },
  Fi = function (e, r) {
    var o = Zr(e);
    return o < 0 && r && !Xr(e) ? 0 : o;
  },
  _i = function (e, r) {
    return e.tabIndex === r.tabIndex
      ? e.documentOrder - r.documentOrder
      : e.tabIndex - r.tabIndex;
  },
  Jr = function (e) {
    return e.tagName === "INPUT";
  },
  Hi = function (e) {
    return Jr(e) && e.type === "hidden";
  },
  Vi = function (e) {
    var r =
      e.tagName === "DETAILS" &&
      Array.prototype.slice.apply(e.children).some(function (o) {
        return o.tagName === "SUMMARY";
      });
    return r;
  },
  zi = function (e, r) {
    for (var o = 0; o < e.length; o++)
      if (e[o].checked && e[o].form === r) return e[o];
  },
  ji = function (e) {
    if (!e.name) return !0;
    var r = e.form || ln(e),
      o = function (u) {
        return r.querySelectorAll('input[type="radio"][name="' + u + '"]');
      },
      n;
    if (
      typeof window < "u" &&
      typeof window.CSS < "u" &&
      typeof window.CSS.escape == "function"
    )
      n = o(window.CSS.escape(e.name));
    else
      try {
        n = o(e.name);
      } catch (i) {
        return (
          console.error(
            "Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",
            i.message,
          ),
          !1
        );
      }
    var s = zi(n, e.form);
    return !s || s === e;
  },
  Wi = function (e) {
    return Jr(e) && e.type === "radio";
  },
  Ki = function (e) {
    return Wi(e) && !ji(e);
  },
  Bi = function (e) {
    var r,
      o = e && ln(e),
      n = (r = o) === null || r === void 0 ? void 0 : r.host,
      s = !1;
    if (o && o !== e) {
      var i, u, f;
      for (
        s = !!(
          ((i = n) !== null &&
            i !== void 0 &&
            (u = i.ownerDocument) !== null &&
            u !== void 0 &&
            u.contains(n)) ||
          (e != null &&
            (f = e.ownerDocument) !== null &&
            f !== void 0 &&
            f.contains(e))
        );
        !s && n;
      ) {
        var a, d, b;
        ((o = ln(n)),
          (n = (a = o) === null || a === void 0 ? void 0 : a.host),
          (s = !!(
            (d = n) !== null &&
            d !== void 0 &&
            (b = d.ownerDocument) !== null &&
            b !== void 0 &&
            b.contains(n)
          )));
      }
    }
    return s;
  },
  mr = function (e) {
    var r = e.getBoundingClientRect(),
      o = r.width,
      n = r.height;
    return o === 0 && n === 0;
  },
  $i = function (e, r) {
    var o = r.displayCheck,
      n = r.getShadowRoot;
    if (o === "full-native" && "checkVisibility" in e) {
      var s = e.checkVisibility({
        checkOpacity: !1,
        opacityProperty: !1,
        contentVisibilityAuto: !0,
        visibilityProperty: !0,
        checkVisibilityCSS: !0,
      });
      return !s;
    }
    if (getComputedStyle(e).visibility === "hidden") return !0;
    var i = Ht.call(e, "details>summary:first-of-type"),
      u = i ? e.parentElement : e;
    if (Ht.call(u, "details:not([open]) *")) return !0;
    if (!o || o === "full" || o === "full-native" || o === "legacy-full") {
      if (typeof n == "function") {
        for (var f = e; e; ) {
          var a = e.parentElement,
            d = ln(e);
          if (a && !a.shadowRoot && n(a) === !0) return mr(e);
          e.assignedSlot
            ? (e = e.assignedSlot)
            : !a && d !== e.ownerDocument
              ? (e = d.host)
              : (e = a);
        }
        e = f;
      }
      if (Bi(e)) return !e.getClientRects().length;
      if (o !== "legacy-full") return !0;
    } else if (o === "non-zero-area") return mr(e);
    return !1;
  },
  Ui = function (e) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
      for (var r = e.parentElement; r; ) {
        if (r.tagName === "FIELDSET" && r.disabled) {
          for (var o = 0; o < r.children.length; o++) {
            var n = r.children.item(o);
            if (n.tagName === "LEGEND")
              return Ht.call(r, "fieldset[disabled] *") ? !0 : !n.contains(e);
          }
          return !0;
        }
        r = r.parentElement;
      }
    return !1;
  },
  Nn = function (e, r) {
    return !(r.disabled || Hi(r) || $i(r, e) || Vi(r) || Ui(r));
  },
  Dn = function (e, r) {
    return !(Ki(r) || Zr(r) < 0 || !Nn(e, r));
  },
  Yi = function (e) {
    var r = parseInt(e.getAttribute("tabindex"), 10);
    return !!(isNaN(r) || r >= 0);
  },
  Qr = function (e) {
    var r = [],
      o = [];
    return (
      e.forEach(function (n, s) {
        var i = !!n.scopeParent,
          u = i ? n.scopeParent : n,
          f = Fi(u, i),
          a = i ? Qr(n.candidates) : u;
        f === 0
          ? i
            ? r.push.apply(r, a)
            : r.push(u)
          : o.push({
              documentOrder: s,
              tabIndex: f,
              item: n,
              isScope: i,
              content: a,
            });
      }),
      o
        .sort(_i)
        .reduce(function (n, s) {
          return (
            s.isScope ? n.push.apply(n, s.content) : n.push(s.content),
            n
          );
        }, [])
        .concat(r)
    );
  },
  gn = function (e, r) {
    r = r || {};
    var o;
    return (
      r.getShadowRoot
        ? (o = fn([e], r.includeContainer, {
            filter: Dn.bind(null, r),
            flatten: !1,
            getShadowRoot: r.getShadowRoot,
            shadowRootFilter: Yi,
          }))
        : (o = qr(e, r.includeContainer, Dn.bind(null, r))),
      Qr(o)
    );
  },
  Gi = function (e, r) {
    r = r || {};
    var o;
    return (
      r.getShadowRoot
        ? (o = fn([e], r.includeContainer, {
            filter: Nn.bind(null, r),
            flatten: !0,
            getShadowRoot: r.getShadowRoot,
          }))
        : (o = qr(e, r.includeContainer, Nn.bind(null, r))),
      o
    );
  },
  eo = function (e, r) {
    if (((r = r || {}), !e)) throw new Error("No node provided");
    return Ht.call(e, cn) === !1 ? !1 : Dn(r, e);
  };
function jn() {
  const t = navigator.userAgentData;
  return t != null && t.platform ? t.platform : navigator.platform;
}
function Wn() {
  const t = navigator.userAgentData;
  return t && Array.isArray(t.brands)
    ? t.brands
        .map((e) => {
          let { brand: r, version: o } = e;
          return r + "/" + o;
        })
        .join(" ")
    : navigator.userAgent;
}
function to() {
  return /apple/i.test(navigator.vendor);
}
function Ln() {
  const t = /android/i;
  return t.test(jn()) || t.test(Wn());
}
function qi() {
  return jn().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
}
function no() {
  return Wn().includes("jsdom/");
}
const pr = "data-floating-ui-focusable",
  Xi =
    "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])",
  In = "ArrowLeft",
  wn = "ArrowRight",
  Zi = "ArrowUp",
  Ji = "ArrowDown";
function nt(t) {
  let e = t.activeElement;
  for (
    ;
    ((r = e) == null || (r = r.shadowRoot) == null
      ? void 0
      : r.activeElement) != null;
  ) {
    var r;
    e = e.shadowRoot.activeElement;
  }
  return e;
}
function _e(t, e) {
  if (!t || !e) return !1;
  const r = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e)) return !0;
  if (r && zn(r)) {
    let o = e;
    for (; o; ) {
      if (t === o) return !0;
      o = o.parentNode || o.host;
    }
  }
  return !1;
}
function rt(t) {
  return "composedPath" in t ? t.composedPath()[0] : t.target;
}
function Cn(t, e) {
  if (e == null) return !1;
  if ("composedPath" in t) return t.composedPath().includes(e);
  const r = t;
  return r.target != null && e.contains(r.target);
}
function Qi(t) {
  return t.matches("html,body");
}
function Be(t) {
  return t?.ownerDocument || document;
}
function Kn(t) {
  return Je(t) && t.matches(Xi);
}
function Fn(t) {
  return t ? t.getAttribute("role") === "combobox" && Kn(t) : !1;
}
function es(t) {
  if (!t || no()) return !0;
  try {
    return t.matches(":focus-visible");
  } catch {
    return !0;
  }
}
function dn(t) {
  return t
    ? t.hasAttribute(pr)
      ? t
      : t.querySelector("[" + pr + "]") || t
    : null;
}
function It(t, e, r) {
  return (
    r === void 0 && (r = !0),
    t
      .filter((n) => {
        var s;
        return (
          n.parentId === e &&
          (!r || ((s = n.context) == null ? void 0 : s.open))
        );
      })
      .flatMap((n) => [n, ...It(t, n.id, r)])
  );
}
function ts(t, e) {
  let r,
    o = -1;
  function n(s, i) {
    (i > o && ((r = s), (o = i)),
      It(t, s).forEach((f) => {
        n(f.id, i + 1);
      }));
  }
  return (n(e, 0), t.find((s) => s.id === r));
}
function gr(t, e) {
  var r;
  let o = [],
    n = (r = t.find((s) => s.id === e)) == null ? void 0 : r.parentId;
  for (; n; ) {
    const s = t.find((i) => i.id === n);
    ((n = s?.parentId), s && (o = o.concat(s)));
  }
  return o;
}
function Ke(t) {
  (t.preventDefault(), t.stopPropagation());
}
function ns(t) {
  return "nativeEvent" in t;
}
function ro(t) {
  return t.mozInputSource === 0 && t.isTrusted
    ? !0
    : Ln() && t.pointerType
      ? t.type === "click" && t.buttons === 1
      : t.detail === 0 && !t.pointerType;
}
function oo(t) {
  return no()
    ? !1
    : (!Ln() && t.width === 0 && t.height === 0) ||
        (Ln() &&
          t.width === 1 &&
          t.height === 1 &&
          t.pressure === 0 &&
          t.detail === 0 &&
          t.pointerType === "mouse") ||
        (t.width < 1 &&
          t.height < 1 &&
          t.pressure === 0 &&
          t.detail === 0 &&
          t.pointerType === "touch");
}
function Vt(t, e) {
  const r = ["mouse", "pen"];
  return (e || r.push("", void 0), r.includes(t));
}
var rs = typeof document < "u",
  os = function () {},
  pe = rs ? l.useLayoutEffect : os;
const is = { ...Wr };
function He(t) {
  const e = l.useRef(t);
  return (
    pe(() => {
      e.current = t;
    }),
    e
  );
}
const ss = is.useInsertionEffect,
  us = ss || ((t) => t());
function Te(t) {
  const e = l.useRef(() => {});
  return (
    us(() => {
      e.current = t;
    }),
    l.useCallback(function () {
      for (var r = arguments.length, o = new Array(r), n = 0; n < r; n++)
        o[n] = arguments[n];
      return e.current == null ? void 0 : e.current(...o);
    }, [])
  );
}
function en(t, e, r) {
  return Math.floor(t / e) !== r;
}
function Ft(t, e) {
  return e < 0 || e >= t.current.length;
}
function un(t, e) {
  return We(t, { disabledIndices: e });
}
function _n(t, e) {
  return We(t, {
    decrement: !0,
    startingIndex: t.current.length,
    disabledIndices: e,
  });
}
function We(t, e) {
  let {
      startingIndex: r = -1,
      decrement: o = !1,
      disabledIndices: n,
      amount: s = 1,
    } = e === void 0 ? {} : e,
    i = r;
  do i += o ? -s : s;
  while (i >= 0 && i <= t.current.length - 1 && wt(t, i, n));
  return i;
}
function io(t, e) {
  let {
      event: r,
      orientation: o,
      loop: n,
      rtl: s,
      cols: i,
      disabledIndices: u,
      minIndex: f,
      maxIndex: a,
      prevIndex: d,
      stopEvent: b = !1,
    } = e,
    v = d;
  if (r.key === Zi) {
    if ((b && Ke(r), d === -1)) v = a;
    else if (
      ((v = We(t, {
        startingIndex: v,
        amount: i,
        decrement: !0,
        disabledIndices: u,
      })),
      n && (d - i < f || v < 0))
    ) {
      const h = d % i,
        R = a % i,
        p = a - (R - h);
      R === h ? (v = a) : (v = R > h ? p : p - i);
    }
    Ft(t, v) && (v = d);
  }
  if (
    (r.key === Ji &&
      (b && Ke(r),
      d === -1
        ? (v = f)
        : ((v = We(t, { startingIndex: d, amount: i, disabledIndices: u })),
          n &&
            d + i > a &&
            (v = We(t, {
              startingIndex: (d % i) - i,
              amount: i,
              disabledIndices: u,
            }))),
      Ft(t, v) && (v = d)),
    o === "both")
  ) {
    const h = fr(d / i);
    (r.key === (s ? In : wn) &&
      (b && Ke(r),
      d % i !== i - 1
        ? ((v = We(t, { startingIndex: d, disabledIndices: u })),
          n &&
            en(v, i, h) &&
            (v = We(t, { startingIndex: d - (d % i) - 1, disabledIndices: u })))
        : n &&
          (v = We(t, { startingIndex: d - (d % i) - 1, disabledIndices: u })),
      en(v, i, h) && (v = d)),
      r.key === (s ? wn : In) &&
        (b && Ke(r),
        d % i !== 0
          ? ((v = We(t, {
              startingIndex: d,
              decrement: !0,
              disabledIndices: u,
            })),
            n &&
              en(v, i, h) &&
              (v = We(t, {
                startingIndex: d + (i - (d % i)),
                decrement: !0,
                disabledIndices: u,
              })))
          : n &&
            (v = We(t, {
              startingIndex: d + (i - (d % i)),
              decrement: !0,
              disabledIndices: u,
            })),
        en(v, i, h) && (v = d)));
    const R = fr(a / i) === h;
    Ft(t, v) &&
      (n && R
        ? (v =
            r.key === (s ? wn : In)
              ? a
              : We(t, { startingIndex: d - (d % i) - 1, disabledIndices: u }))
        : (v = d));
  }
  return v;
}
function so(t, e, r) {
  const o = [];
  let n = 0;
  return (
    t.forEach((s, i) => {
      let { width: u, height: f } = s,
        a = !1;
      for (r && (n = 0); !a; ) {
        const d = [];
        for (let b = 0; b < u; b++)
          for (let v = 0; v < f; v++) d.push(n + b + v * e);
        (n % e) + u <= e && d.every((b) => o[b] == null)
          ? (d.forEach((b) => {
              o[b] = i;
            }),
            (a = !0))
          : n++;
      }
    }),
    [...o]
  );
}
function uo(t, e, r, o, n) {
  if (t === -1) return -1;
  const s = r.indexOf(t),
    i = e[t];
  switch (n) {
    case "tl":
      return s;
    case "tr":
      return i ? s + i.width - 1 : s;
    case "bl":
      return i ? s + (i.height - 1) * o : s;
    case "br":
      return r.lastIndexOf(t);
  }
}
function co(t, e) {
  return e.flatMap((r, o) => (t.includes(r) ? [o] : []));
}
function wt(t, e, r) {
  if (typeof r == "function") return r(e);
  if (r) return r.includes(e);
  const o = t.current[e];
  return (
    o == null ||
    o.hasAttribute("disabled") ||
    o.getAttribute("aria-disabled") === "true"
  );
}
const Gt = () => ({
  getShadowRoot: !0,
  displayCheck:
    typeof ResizeObserver == "function" &&
    ResizeObserver.toString().includes("[native code]")
      ? "full"
      : "none",
});
function lo(t, e) {
  const r = gn(t, Gt()),
    o = r.length;
  if (o === 0) return;
  const n = nt(Be(t)),
    s = r.indexOf(n),
    i = s === -1 ? (e === 1 ? 0 : o - 1) : s + e;
  return r[i];
}
function ao(t) {
  return lo(Be(t).body, 1) || t;
}
function fo(t) {
  return lo(Be(t).body, -1) || t;
}
function Bt(t, e) {
  const r = e || t.currentTarget,
    o = t.relatedTarget;
  return !o || !_e(r, o);
}
function cs(t) {
  gn(t, Gt()).forEach((r) => {
    ((r.dataset.tabindex = r.getAttribute("tabindex") || ""),
      r.setAttribute("tabindex", "-1"));
  });
}
function hr(t) {
  t.querySelectorAll("[data-tabindex]").forEach((r) => {
    const o = r.dataset.tabindex;
    (delete r.dataset.tabindex,
      o ? r.setAttribute("tabindex", o) : r.removeAttribute("tabindex"));
  });
}
function mo(t) {
  const e = l.useRef(void 0),
    r = l.useCallback((o) => {
      const n = t.map((s) => {
        if (s != null) {
          if (typeof s == "function") {
            const i = s,
              u = i(o);
            return typeof u == "function"
              ? u
              : () => {
                  i(null);
                };
          }
          return (
            (s.current = o),
            () => {
              s.current = null;
            }
          );
        }
      });
      return () => {
        n.forEach((s) => s?.());
      };
    }, t);
  return l.useMemo(
    () =>
      t.every((o) => o == null)
        ? null
        : (o) => {
            (e.current && (e.current(), (e.current = void 0)),
              o != null && (e.current = r(o)));
          },
    t,
  );
}
function ls(t, e) {
  const r = t.compareDocumentPosition(e);
  return r & Node.DOCUMENT_POSITION_FOLLOWING ||
    r & Node.DOCUMENT_POSITION_CONTAINED_BY
    ? -1
    : r & Node.DOCUMENT_POSITION_PRECEDING ||
        r & Node.DOCUMENT_POSITION_CONTAINS
      ? 1
      : 0;
}
const po = l.createContext({
  register: () => {},
  unregister: () => {},
  map: new Map(),
  elementsRef: { current: [] },
});
function go(t) {
  const { children: e, elementsRef: r, labelsRef: o } = t,
    [n, s] = l.useState(() => new Set()),
    i = l.useCallback((a) => {
      s((d) => new Set(d).add(a));
    }, []),
    u = l.useCallback((a) => {
      s((d) => {
        const b = new Set(d);
        return (b.delete(a), b);
      });
    }, []),
    f = l.useMemo(() => {
      const a = new Map();
      return (
        Array.from(n.keys())
          .sort(ls)
          .forEach((b, v) => {
            a.set(b, v);
          }),
        a
      );
    }, [n]);
  return X.jsx(po.Provider, {
    value: l.useMemo(
      () => ({
        register: i,
        unregister: u,
        map: f,
        elementsRef: r,
        labelsRef: o,
      }),
      [i, u, f, r, o],
    ),
    children: e,
  });
}
function ho(t) {
  t === void 0 && (t = {});
  const { label: e } = t,
    {
      register: r,
      unregister: o,
      map: n,
      elementsRef: s,
      labelsRef: i,
    } = l.useContext(po),
    [u, f] = l.useState(null),
    a = l.useRef(null),
    d = l.useCallback(
      (b) => {
        if (((a.current = b), u !== null && ((s.current[u] = b), i))) {
          var v;
          const h = e !== void 0;
          i.current[u] = h ? e : (v = b?.textContent) != null ? v : null;
        }
      },
      [u, s, i, e],
    );
  return (
    pe(() => {
      const b = a.current;
      if (b)
        return (
          r(b),
          () => {
            o(b);
          }
        );
    }, [r, o]),
    pe(() => {
      const b = a.current ? n.get(a.current) : null;
      b != null && f(b);
    }, [n]),
    l.useMemo(() => ({ ref: d, index: u ?? -1 }), [u, d])
  );
}
const as = "data-floating-ui-focusable",
  vr = "active",
  br = "selected",
  vt = "ArrowLeft",
  bt = "ArrowRight",
  Yt = "ArrowUp",
  ht = "ArrowDown";
function vo(t, e) {
  return typeof t == "function"
    ? t(e)
    : t
      ? l.cloneElement(t, e)
      : X.jsx("div", { ...e });
}
const bo = l.createContext({ activeIndex: 0, onNavigate: () => {} }),
  yo = [vt, bt],
  Ro = [Yt, ht],
  Tn = [...yo, ...Ro],
  fs = l.forwardRef(function (e, r) {
    const {
        render: o,
        orientation: n = "both",
        loop: s = !0,
        rtl: i = !1,
        cols: u = 1,
        disabledIndices: f,
        activeIndex: a,
        onNavigate: d,
        itemSizes: b,
        dense: v = !1,
        ...h
      } = e,
      [R, p] = l.useState(0),
      E = a ?? R,
      P = Te(d ?? p),
      C = l.useRef([]),
      A = o && typeof o != "function" ? o.props : {},
      F = l.useMemo(() => ({ activeIndex: E, onNavigate: P }), [E, P]),
      Q = u > 1;
    function K(D) {
      if (!Tn.includes(D.key)) return;
      let B = E;
      const H = un(C, f),
        se = _n(C, f),
        Z = i ? vt : bt,
        J = i ? bt : vt;
      if (Q) {
        const I =
            b ||
            Array.from({ length: C.current.length }, () => ({
              width: 1,
              height: 1,
            })),
          T = so(I, u, v),
          $ = T.findIndex((V) => V != null && !wt(C, V, f)),
          ve = T.reduce(
            (V, he, ae) => (he != null && !wt(C, he, f) ? ae : V),
            -1,
          ),
          ne =
            T[
              io(
                { current: T.map((V) => (V ? C.current[V] : null)) },
                {
                  event: D,
                  orientation: n,
                  loop: s,
                  rtl: i,
                  cols: u,
                  disabledIndices: co(
                    [
                      ...((typeof f != "function" ? f : null) ||
                        C.current.map((V, he) => (wt(C, he, f) ? he : void 0))),
                      void 0,
                    ],
                    T,
                  ),
                  minIndex: $,
                  maxIndex: ve,
                  prevIndex: uo(
                    E > se ? H : E,
                    I,
                    T,
                    u,
                    D.key === ht ? "bl" : D.key === Z ? "tr" : "tl",
                  ),
                },
              )
            ];
        ne != null && (B = ne);
      }
      const y = { horizontal: [Z], vertical: [ht], both: [Z, ht] }[n],
        S = { horizontal: [J], vertical: [Yt], both: [J, Yt] }[n],
        ee = Q ? Tn : { horizontal: yo, vertical: Ro, both: Tn }[n];
      if (
        (B === E &&
          [...y, ...S].includes(D.key) &&
          (s && B === se && y.includes(D.key)
            ? (B = H)
            : s && B === H && S.includes(D.key)
              ? (B = se)
              : (B = We(C, {
                  startingIndex: B,
                  decrement: S.includes(D.key),
                  disabledIndices: f,
                }))),
        B !== E && !Ft(C, B))
      ) {
        var _;
        (D.stopPropagation(),
          ee.includes(D.key) && D.preventDefault(),
          P(B),
          (_ = C.current[B]) == null || _.focus());
      }
    }
    const k = {
      ...h,
      ...A,
      ref: r,
      "aria-orientation": n === "both" ? void 0 : n,
      onKeyDown(D) {
        (h.onKeyDown == null || h.onKeyDown(D),
          A.onKeyDown == null || A.onKeyDown(D),
          K(D));
      },
    };
    return X.jsx(bo.Provider, {
      value: F,
      children: X.jsx(go, { elementsRef: C, children: vo(o, k) }),
    });
  }),
  ds = l.forwardRef(function (e, r) {
    const { render: o, ...n } = e,
      s = o && typeof o != "function" ? o.props : {},
      { activeIndex: i, onNavigate: u } = l.useContext(bo),
      { ref: f, index: a } = ho(),
      d = mo([f, r, s.ref]),
      b = i === a,
      v = {
        ...n,
        ...s,
        ref: d,
        tabIndex: b ? 0 : -1,
        "data-active": b ? "" : void 0,
        onFocus(h) {
          (n.onFocus == null || n.onFocus(h),
            s.onFocus == null || s.onFocus(h),
            u(a));
        },
      };
    return vo(o, v);
  }),
  ms = { ...Wr };
let yr = !1,
  ps = 0;
const Rr = () => "floating-ui-" + Math.random().toString(36).slice(2, 6) + ps++;
function gs() {
  const [t, e] = l.useState(() => (yr ? Rr() : void 0));
  return (
    pe(() => {
      t == null && e(Rr());
    }, []),
    l.useEffect(() => {
      yr = !0;
    }, []),
    t
  );
}
const hs = ms.useId,
  zt = hs || gs,
  vs = l.forwardRef(function (e, r) {
    const {
        context: {
          placement: o,
          elements: { floating: n },
          middlewareData: { arrow: s, shift: i },
        },
        width: u = 14,
        height: f = 7,
        tipRadius: a = 0,
        strokeWidth: d = 0,
        staticOffset: b,
        stroke: v,
        d: h,
        style: { transform: R, ...p } = {},
        ...E
      } = e,
      P = zt(),
      [C, A] = l.useState(!1);
    if (
      (pe(() => {
        if (!n) return;
        Kr(n).direction === "rtl" && A(!0);
      }, [n]),
      !n)
    )
      return null;
    const [F, Q] = o.split("-"),
      K = F === "top" || F === "bottom";
    let k = b;
    ((K && i != null && i.x) || (!K && i != null && i.y)) && (k = null);
    const D = d * 2,
      B = D / 2,
      H = (u / 2) * (a / -8 + 1),
      se = ((f / 2) * a) / 4,
      Z = !!h,
      J = k && Q === "end" ? "bottom" : "top";
    let y = k && Q === "end" ? "right" : "left";
    k && C && (y = Q === "end" ? "left" : "right");
    const S = s?.x != null ? k || s.x : "",
      ee = s?.y != null ? k || s.y : "",
      _ =
        h ||
        "M0,0" +
          (" H" + u) +
          (" L" + (u - H) + "," + (f - se)) +
          (" Q" + u / 2 + "," + f + " " + H + "," + (f - se)) +
          " Z",
      I = {
        top: Z ? "rotate(180deg)" : "",
        left: Z ? "rotate(90deg)" : "rotate(-90deg)",
        bottom: Z ? "" : "rotate(180deg)",
        right: Z ? "rotate(-90deg)" : "rotate(90deg)",
      }[F];
    return X.jsxs("svg", {
      ...E,
      "aria-hidden": !0,
      ref: r,
      width: Z ? u : u + D,
      height: u,
      viewBox: "0 0 " + u + " " + (f > u ? f : u),
      style: {
        position: "absolute",
        pointerEvents: "none",
        [y]: S,
        [J]: ee,
        [F]: K || Z ? "100%" : "calc(100% - " + D / 2 + "px)",
        transform: [I, R].filter((T) => !!T).join(" "),
        ...p,
      },
      children: [
        D > 0 &&
          X.jsx("path", {
            clipPath: "url(#" + P + ")",
            fill: "none",
            stroke: v,
            strokeWidth: D + (h ? 0 : 1),
            d: _,
          }),
        X.jsx("path", { stroke: D && !h ? E.fill : "none", d: _ }),
        X.jsx("clipPath", {
          id: P,
          children: X.jsx("rect", {
            x: -B,
            y: B * (Z ? -1 : 1),
            width: u + D,
            height: u,
          }),
        }),
      ],
    });
  });
function xo() {
  const t = new Map();
  return {
    emit(e, r) {
      var o;
      (o = t.get(e)) == null || o.forEach((n) => n(r));
    },
    on(e, r) {
      (t.has(e) || t.set(e, new Set()), t.get(e).add(r));
    },
    off(e, r) {
      var o;
      (o = t.get(e)) == null || o.delete(r);
    },
  };
}
const Eo = l.createContext(null),
  Io = l.createContext(null),
  Tt = () => {
    var t;
    return ((t = l.useContext(Eo)) == null ? void 0 : t.id) || null;
  },
  St = () => l.useContext(Io);
function bs(t) {
  const e = zt(),
    r = St(),
    o = Tt(),
    n = t || o;
  return (
    pe(() => {
      if (!e) return;
      const s = { id: e, parentId: n };
      return (
        r?.addNode(s),
        () => {
          r?.removeNode(s);
        }
      );
    }, [r, e, n]),
    e
  );
}
function ys(t) {
  const { children: e, id: r } = t,
    o = Tt();
  return X.jsx(Eo.Provider, {
    value: l.useMemo(() => ({ id: r, parentId: o }), [r, o]),
    children: e,
  });
}
function Rs(t) {
  const { children: e } = t,
    r = l.useRef([]),
    o = l.useCallback((i) => {
      r.current = [...r.current, i];
    }, []),
    n = l.useCallback((i) => {
      r.current = r.current.filter((u) => u !== i);
    }, []),
    [s] = l.useState(() => xo());
  return X.jsx(Io.Provider, {
    value: l.useMemo(
      () => ({ nodesRef: r, addNode: o, removeNode: n, events: s }),
      [o, n, s],
    ),
    children: e,
  });
}
function Ct(t) {
  return "data-floating-ui-" + t;
}
function Fe(t) {
  t.current !== -1 && (clearTimeout(t.current), (t.current = -1));
}
const xr = Ct("safe-polygon");
function $t(t, e, r) {
  if (r && !Vt(r)) return 0;
  if (typeof t == "number") return t;
  if (typeof t == "function") {
    const o = t();
    return typeof o == "number" ? o : o?.[e];
  }
  return t?.[e];
}
function Sn(t) {
  return typeof t == "function" ? t() : t;
}
function xs(t, e) {
  e === void 0 && (e = {});
  const { open: r, onOpenChange: o, dataRef: n, events: s, elements: i } = t,
    {
      enabled: u = !0,
      delay: f = 0,
      handleClose: a = null,
      mouseOnly: d = !1,
      restMs: b = 0,
      move: v = !0,
    } = e,
    h = St(),
    R = Tt(),
    p = He(a),
    E = He(f),
    P = He(r),
    C = He(b),
    A = l.useRef(),
    F = l.useRef(-1),
    Q = l.useRef(),
    K = l.useRef(-1),
    k = l.useRef(!0),
    D = l.useRef(!1),
    B = l.useRef(() => {}),
    H = l.useRef(!1),
    se = Te(() => {
      var _;
      const I = (_ = n.current.openEvent) == null ? void 0 : _.type;
      return I?.includes("mouse") && I !== "mousedown";
    });
  (l.useEffect(() => {
    if (!u) return;
    function _(I) {
      let { open: T } = I;
      T || (Fe(F), Fe(K), (k.current = !0), (H.current = !1));
    }
    return (
      s.on("openchange", _),
      () => {
        s.off("openchange", _);
      }
    );
  }, [u, s]),
    l.useEffect(() => {
      if (!u || !p.current || !r) return;
      function _(T) {
        se() && o(!1, T, "hover");
      }
      const I = Be(i.floating).documentElement;
      return (
        I.addEventListener("mouseleave", _),
        () => {
          I.removeEventListener("mouseleave", _);
        }
      );
    }, [i.floating, r, o, u, p, se]));
  const Z = l.useCallback(
      function (_, I, T) {
        (I === void 0 && (I = !0), T === void 0 && (T = "hover"));
        const $ = $t(E.current, "close", A.current);
        $ && !Q.current
          ? (Fe(F), (F.current = window.setTimeout(() => o(!1, _, T), $)))
          : I && (Fe(F), o(!1, _, T));
      },
      [E, o],
    ),
    J = Te(() => {
      (B.current(), (Q.current = void 0));
    }),
    y = Te(() => {
      if (D.current) {
        const _ = Be(i.floating).body;
        ((_.style.pointerEvents = ""), _.removeAttribute(xr), (D.current = !1));
      }
    }),
    S = Te(() =>
      n.current.openEvent
        ? ["click", "mousedown"].includes(n.current.openEvent.type)
        : !1,
    );
  (l.useEffect(() => {
    if (!u) return;
    function _(ne) {
      if (
        (Fe(F),
        (k.current = !1),
        (d && !Vt(A.current)) || (Sn(C.current) > 0 && !$t(E.current, "open")))
      )
        return;
      const V = $t(E.current, "open", A.current);
      V
        ? (F.current = window.setTimeout(() => {
            P.current || o(!0, ne, "hover");
          }, V))
        : r || o(!0, ne, "hover");
    }
    function I(ne) {
      if (S()) {
        y();
        return;
      }
      B.current();
      const V = Be(i.floating);
      if ((Fe(K), (H.current = !1), p.current && n.current.floatingContext)) {
        (r || Fe(F),
          (Q.current = p.current({
            ...n.current.floatingContext,
            tree: h,
            x: ne.clientX,
            y: ne.clientY,
            onClose() {
              (y(), J(), S() || Z(ne, !0, "safe-polygon"));
            },
          })));
        const ae = Q.current;
        (V.addEventListener("mousemove", ae),
          (B.current = () => {
            V.removeEventListener("mousemove", ae);
          }));
        return;
      }
      (A.current !== "touch" || !_e(i.floating, ne.relatedTarget)) && Z(ne);
    }
    function T(ne) {
      S() ||
        (n.current.floatingContext &&
          (p.current == null ||
            p.current({
              ...n.current.floatingContext,
              tree: h,
              x: ne.clientX,
              y: ne.clientY,
              onClose() {
                (y(), J(), S() || Z(ne));
              },
            })(ne)));
    }
    function $() {
      Fe(F);
    }
    function ve(ne) {
      S() || Z(ne, !1);
    }
    if (Ge(i.domReference)) {
      const ne = i.domReference,
        V = i.floating;
      return (
        r && ne.addEventListener("mouseleave", T),
        v && ne.addEventListener("mousemove", _, { once: !0 }),
        ne.addEventListener("mouseenter", _),
        ne.addEventListener("mouseleave", I),
        V &&
          (V.addEventListener("mouseleave", T),
          V.addEventListener("mouseenter", $),
          V.addEventListener("mouseleave", ve)),
        () => {
          (r && ne.removeEventListener("mouseleave", T),
            v && ne.removeEventListener("mousemove", _),
            ne.removeEventListener("mouseenter", _),
            ne.removeEventListener("mouseleave", I),
            V &&
              (V.removeEventListener("mouseleave", T),
              V.removeEventListener("mouseenter", $),
              V.removeEventListener("mouseleave", ve)));
        }
      );
    }
  }, [i, u, t, d, v, Z, J, y, o, r, P, h, E, p, n, S, C]),
    pe(() => {
      var _;
      if (
        u &&
        r &&
        (_ = p.current) != null &&
        (_ = _.__options) != null &&
        _.blockPointerEvents &&
        se()
      ) {
        D.current = !0;
        const T = i.floating;
        if (Ge(i.domReference) && T) {
          var I;
          const $ = Be(i.floating).body;
          $.setAttribute(xr, "");
          const ve = i.domReference,
            ne =
              h == null ||
              (I = h.nodesRef.current.find((V) => V.id === R)) == null ||
              (I = I.context) == null
                ? void 0
                : I.elements.floating;
          return (
            ne && (ne.style.pointerEvents = ""),
            ($.style.pointerEvents = "none"),
            (ve.style.pointerEvents = "auto"),
            (T.style.pointerEvents = "auto"),
            () => {
              (($.style.pointerEvents = ""),
                (ve.style.pointerEvents = ""),
                (T.style.pointerEvents = ""));
            }
          );
        }
      }
    }, [u, r, R, i, h, p, se]),
    pe(() => {
      r || ((A.current = void 0), (H.current = !1), J(), y());
    }, [r, J, y]),
    l.useEffect(
      () => () => {
        (J(), Fe(F), Fe(K), y());
      },
      [u, i.domReference, J, y],
    ));
  const ee = l.useMemo(() => {
    function _(I) {
      A.current = I.pointerType;
    }
    return {
      onPointerDown: _,
      onPointerEnter: _,
      onMouseMove(I) {
        const { nativeEvent: T } = I;
        function $() {
          !k.current && !P.current && o(!0, T, "hover");
        }
        (d && !Vt(A.current)) ||
          r ||
          Sn(C.current) === 0 ||
          (H.current && I.movementX ** 2 + I.movementY ** 2 < 2) ||
          (Fe(K),
          A.current === "touch"
            ? $()
            : ((H.current = !0),
              (K.current = window.setTimeout($, Sn(C.current)))));
      },
    };
  }, [d, o, r, P, C]);
  return l.useMemo(() => (u ? { reference: ee } : {}), [u, ee]);
}
const Hn = () => {},
  wo = l.createContext({
    delay: 0,
    initialDelay: 0,
    timeoutMs: 0,
    currentId: null,
    setCurrentId: Hn,
    setState: Hn,
    isInstantPhase: !1,
  }),
  Co = () => l.useContext(wo);
function Es(t) {
  const { children: e, delay: r, timeoutMs: o = 0 } = t,
    [n, s] = l.useReducer((f, a) => ({ ...f, ...a }), {
      delay: r,
      timeoutMs: o,
      initialDelay: r,
      currentId: null,
      isInstantPhase: !1,
    }),
    i = l.useRef(null),
    u = l.useCallback((f) => {
      s({ currentId: f });
    }, []);
  return (
    pe(() => {
      n.currentId
        ? i.current === null
          ? (i.current = n.currentId)
          : n.isInstantPhase || s({ isInstantPhase: !0 })
        : (n.isInstantPhase && s({ isInstantPhase: !1 }), (i.current = null));
    }, [n.currentId, n.isInstantPhase]),
    X.jsx(wo.Provider, {
      value: l.useMemo(() => ({ ...n, setState: s, setCurrentId: u }), [n, u]),
      children: e,
    })
  );
}
function Is(t, e) {
  e === void 0 && (e = {});
  const { open: r, onOpenChange: o, floatingId: n } = t,
    { id: s, enabled: i = !0 } = e,
    u = s ?? n,
    f = Co(),
    {
      currentId: a,
      setCurrentId: d,
      initialDelay: b,
      setState: v,
      timeoutMs: h,
    } = f;
  return (
    pe(() => {
      i &&
        a &&
        (v({ delay: { open: 1, close: $t(b, "close") } }), a !== u && o(!1));
    }, [i, u, o, v, a, b]),
    pe(() => {
      function R() {
        (o(!1), v({ delay: b, currentId: null }));
      }
      if (i && a && !r && a === u) {
        if (h) {
          const p = window.setTimeout(R, h);
          return () => {
            clearTimeout(p);
          };
        }
        R();
      }
    }, [i, r, v, a, u, o, b, h]),
    pe(() => {
      i && (d === Hn || !r || d(u));
    }, [i, r, d, u]),
    f
  );
}
const To = l.createContext({
  hasProvider: !1,
  timeoutMs: 0,
  delayRef: { current: 0 },
  initialDelayRef: { current: 0 },
  timeoutIdRef: { current: -1 },
  currentIdRef: { current: null },
  currentContextRef: { current: null },
});
function ws(t) {
  const { children: e, delay: r, timeoutMs: o = 0 } = t,
    n = l.useRef(r),
    s = l.useRef(r),
    i = l.useRef(null),
    u = l.useRef(null),
    f = l.useRef(-1);
  return X.jsx(To.Provider, {
    value: l.useMemo(
      () => ({
        hasProvider: !0,
        delayRef: n,
        initialDelayRef: s,
        currentIdRef: i,
        timeoutMs: o,
        currentContextRef: u,
        timeoutIdRef: f,
      }),
      [o],
    ),
    children: e,
  });
}
function Cs(t, e) {
  e === void 0 && (e = {});
  const { open: r, onOpenChange: o, floatingId: n } = t,
    { enabled: s = !0 } = e,
    i = l.useContext(To),
    {
      currentIdRef: u,
      delayRef: f,
      timeoutMs: a,
      initialDelayRef: d,
      currentContextRef: b,
      hasProvider: v,
      timeoutIdRef: h,
    } = i,
    [R, p] = l.useState(!1);
  return (
    pe(() => {
      function E() {
        var P;
        (p(!1),
          (P = b.current) == null || P.setIsInstantPhase(!1),
          (u.current = null),
          (b.current = null),
          (f.current = d.current));
      }
      if (s && u.current && !r && u.current === n) {
        if ((p(!1), a))
          return (
            (h.current = window.setTimeout(E, a)),
            () => {
              clearTimeout(h.current);
            }
          );
        E();
      }
    }, [s, r, n, u, f, a, d, b, h]),
    pe(() => {
      if (!s || !r) return;
      const E = b.current,
        P = u.current;
      ((b.current = { onOpenChange: o, setIsInstantPhase: p }),
        (u.current = n),
        (f.current = { open: 0, close: $t(d.current, "close") }),
        P !== null && P !== n
          ? (Fe(h), p(!0), E?.setIsInstantPhase(!0), E?.onOpenChange(!1))
          : (p(!1), E?.setIsInstantPhase(!1)));
    }, [s, r, n, o, u, f, a, d, b, h]),
    pe(
      () => () => {
        b.current = null;
      },
      [b],
    ),
    l.useMemo(
      () => ({ hasProvider: v, delayRef: f, isInstantPhase: R }),
      [v, f, R],
    )
  );
}
let Er = 0;
function Et(t, e) {
  e === void 0 && (e = {});
  const { preventScroll: r = !1, cancelPrevious: o = !0, sync: n = !1 } = e;
  o && cancelAnimationFrame(Er);
  const s = () => t?.focus({ preventScroll: r });
  n ? s() : (Er = requestAnimationFrame(s));
}
function An(t, e) {
  if (!t || !e) return !1;
  const r = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e)) return !0;
  if (r && zn(r)) {
    let o = e;
    for (; o; ) {
      if (t === o) return !0;
      o = o.parentNode || o.host;
    }
  }
  return !1;
}
function Ts(t) {
  return "composedPath" in t ? t.composedPath()[0] : t.target;
}
function Ss(t) {
  return t?.ownerDocument || document;
}
const _t = {
  inert: new WeakMap(),
  "aria-hidden": new WeakMap(),
  none: new WeakMap(),
};
function Ir(t) {
  return t === "inert"
    ? _t.inert
    : t === "aria-hidden"
      ? _t["aria-hidden"]
      : _t.none;
}
let tn = new WeakSet(),
  nn = {},
  Pn = 0;
const As = () => typeof HTMLElement < "u" && "inert" in HTMLElement.prototype;
function So(t) {
  return t ? (zn(t) ? t.host : So(t.parentNode)) : null;
}
const Ps = (t, e) =>
  e
    .map((r) => {
      if (t.contains(r)) return r;
      const o = So(r);
      return t.contains(o) ? o : null;
    })
    .filter((r) => r != null);
function Ms(t, e, r, o) {
  const n = "data-floating-ui-inert",
    s = o ? "inert" : r ? "aria-hidden" : null,
    i = Ps(e, t),
    u = new Set(),
    f = new Set(i),
    a = [];
  nn[n] || (nn[n] = new WeakMap());
  const d = nn[n];
  (i.forEach(b), v(e), u.clear());
  function b(h) {
    !h || u.has(h) || (u.add(h), h.parentNode && b(h.parentNode));
  }
  function v(h) {
    !h ||
      f.has(h) ||
      [].forEach.call(h.children, (R) => {
        if (Ur(R) !== "script")
          if (u.has(R)) v(R);
          else {
            const p = s ? R.getAttribute(s) : null,
              E = p !== null && p !== "false",
              P = Ir(s),
              C = (P.get(R) || 0) + 1,
              A = (d.get(R) || 0) + 1;
            (P.set(R, C),
              d.set(R, A),
              a.push(R),
              C === 1 && E && tn.add(R),
              A === 1 && R.setAttribute(n, ""),
              !E && s && R.setAttribute(s, s === "inert" ? "" : "true"));
          }
      });
  }
  return (
    Pn++,
    () => {
      (a.forEach((h) => {
        const R = Ir(s),
          E = (R.get(h) || 0) - 1,
          P = (d.get(h) || 0) - 1;
        (R.set(h, E),
          d.set(h, P),
          E || (!tn.has(h) && s && h.removeAttribute(s), tn.delete(h)),
          P || h.removeAttribute(n));
      }),
        Pn--,
        Pn ||
          ((_t.inert = new WeakMap()),
          (_t["aria-hidden"] = new WeakMap()),
          (_t.none = new WeakMap()),
          (tn = new WeakSet()),
          (nn = {})));
    }
  );
}
function wr(t, e, r) {
  (e === void 0 && (e = !1), r === void 0 && (r = !1));
  const o = Ss(t[0]).body;
  return Ms(
    t.concat(
      Array.from(o.querySelectorAll('[aria-live],[role="status"],output')),
    ),
    o,
    e,
    r,
  );
}
const Bn = {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "fixed",
    whiteSpace: "nowrap",
    width: "1px",
    top: 0,
    left: 0,
  },
  mn = l.forwardRef(function (e, r) {
    const [o, n] = l.useState();
    pe(() => {
      to() && n("button");
    }, []);
    const s = {
      ref: r,
      tabIndex: 0,
      role: o,
      "aria-hidden": o ? void 0 : !0,
      [Ct("focus-guard")]: "",
      style: Bn,
    };
    return X.jsx("span", { ...e, ...s });
  }),
  Os = { clipPath: "inset(50%)", position: "fixed", top: 0, left: 0 },
  Ao = l.createContext(null),
  Cr = Ct("portal");
function Po(t) {
  t === void 0 && (t = {});
  const { id: e, root: r } = t,
    o = zt(),
    n = Mo(),
    [s, i] = l.useState(null),
    u = l.useRef(null);
  return (
    pe(
      () => () => {
        (s?.remove(),
          queueMicrotask(() => {
            u.current = null;
          }));
      },
      [s],
    ),
    pe(() => {
      if (!o || u.current) return;
      const f = e ? document.getElementById(e) : null;
      if (!f) return;
      const a = document.createElement("div");
      ((a.id = o),
        a.setAttribute(Cr, ""),
        f.appendChild(a),
        (u.current = a),
        i(a));
    }, [e, o]),
    pe(() => {
      if (r === null || !o || u.current) return;
      let f = r || n?.portalNode;
      (f && !gi(f) && (f = f.current), (f = f || document.body));
      let a = null;
      e && ((a = document.createElement("div")), (a.id = e), f.appendChild(a));
      const d = document.createElement("div");
      ((d.id = o),
        d.setAttribute(Cr, ""),
        (f = a || f),
        f.appendChild(d),
        (u.current = d),
        i(d));
    }, [e, r, o, n]),
    s
  );
}
function ks(t) {
  const { children: e, id: r, root: o, preserveTabOrder: n = !0 } = t,
    s = Po({ id: r, root: o }),
    [i, u] = l.useState(null),
    f = l.useRef(null),
    a = l.useRef(null),
    d = l.useRef(null),
    b = l.useRef(null),
    v = i?.modal,
    h = i?.open,
    R = !!i && !i.modal && i.open && n && !!(o || s);
  return (
    l.useEffect(() => {
      if (!s || !n || v) return;
      function p(E) {
        s && Bt(E) && (E.type === "focusin" ? hr : cs)(s);
      }
      return (
        s.addEventListener("focusin", p, !0),
        s.addEventListener("focusout", p, !0),
        () => {
          (s.removeEventListener("focusin", p, !0),
            s.removeEventListener("focusout", p, !0));
        }
      );
    }, [s, n, v]),
    l.useEffect(() => {
      s && (h || hr(s));
    }, [h, s]),
    X.jsxs(Ao.Provider, {
      value: l.useMemo(
        () => ({
          preserveTabOrder: n,
          beforeOutsideRef: f,
          afterOutsideRef: a,
          beforeInsideRef: d,
          afterInsideRef: b,
          portalNode: s,
          setFocusManagerState: u,
        }),
        [n, s],
      ),
      children: [
        R &&
          s &&
          X.jsx(mn, {
            "data-type": "outside",
            ref: f,
            onFocus: (p) => {
              if (Bt(p, s)) {
                var E;
                (E = d.current) == null || E.focus();
              } else {
                const P = i ? i.domReference : null,
                  C = fo(P);
                C?.focus();
              }
            },
          }),
        R && s && X.jsx("span", { "aria-owns": s.id, style: Os }),
        s && Ut.createPortal(e, s),
        R &&
          s &&
          X.jsx(mn, {
            "data-type": "outside",
            ref: a,
            onFocus: (p) => {
              if (Bt(p, s)) {
                var E;
                (E = b.current) == null || E.focus();
              } else {
                const P = i ? i.domReference : null,
                  C = ao(P);
                (C?.focus(),
                  i?.closeOnFocusOut &&
                    i?.onOpenChange(!1, p.nativeEvent, "focus-out"));
              }
            },
          }),
      ],
    })
  );
}
const Mo = () => l.useContext(Ao);
function Tr(t) {
  return l.useMemo(
    () => (e) => {
      t.forEach((r) => {
        r && (r.current = e);
      });
    },
    t,
  );
}
const Sr = 20;
let gt = [];
function $n() {
  gt = gt.filter((t) => {
    var e;
    return (e = t.deref()) == null ? void 0 : e.isConnected;
  });
}
function Ns(t) {
  ($n(),
    t &&
      Ur(t) !== "body" &&
      (gt.push(new WeakRef(t)), gt.length > Sr && (gt = gt.slice(-Sr))));
}
function Ar() {
  $n();
  const t = gt[gt.length - 1];
  return t?.deref();
}
function Ds(t) {
  const e = Gt();
  return eo(t, e) ? t : gn(t, e)[0] || t;
}
function Pr(t, e) {
  var r;
  if (
    !e.current.includes("floating") &&
    !((r = t.getAttribute("role")) != null && r.includes("dialog"))
  )
    return;
  const o = Gt(),
    s = Gi(t, o).filter((u) => {
      const f = u.getAttribute("data-tabindex") || "";
      return (
        eo(u, o) || (u.hasAttribute("data-tabindex") && !f.startsWith("-"))
      );
    }),
    i = t.getAttribute("tabindex");
  e.current.includes("floating") || s.length === 0
    ? i !== "0" && t.setAttribute("tabindex", "0")
    : (i !== "-1" ||
        (t.hasAttribute("data-tabindex") &&
          t.getAttribute("data-tabindex") !== "-1")) &&
      (t.setAttribute("tabindex", "-1"), t.setAttribute("data-tabindex", "-1"));
}
const Ls = l.forwardRef(function (e, r) {
  return X.jsx("button", {
    ...e,
    type: "button",
    ref: r,
    tabIndex: -1,
    style: Bn,
  });
});
function Fs(t) {
  const {
      context: e,
      children: r,
      disabled: o = !1,
      order: n = ["content"],
      guards: s = !0,
      initialFocus: i = 0,
      returnFocus: u = !0,
      restoreFocus: f = !1,
      modal: a = !0,
      visuallyHiddenDismiss: d = !1,
      closeOnFocusOut: b = !0,
      outsideElementsInert: v = !1,
      getInsideElements: h = () => [],
    } = t,
    {
      open: R,
      onOpenChange: p,
      events: E,
      dataRef: P,
      elements: { domReference: C, floating: A },
    } = e,
    F = Te(() => {
      var W;
      return (W = P.current.floatingContext) == null ? void 0 : W.nodeId;
    }),
    Q = Te(h),
    K = typeof i == "number" && i < 0,
    k = Fn(C) && K,
    D = As(),
    B = D ? s : !0,
    H = !B || (D && v),
    se = He(n),
    Z = He(i),
    J = He(u),
    y = St(),
    S = Mo(),
    ee = l.useRef(null),
    _ = l.useRef(null),
    I = l.useRef(!1),
    T = l.useRef(!1),
    $ = l.useRef(-1),
    ve = l.useRef(-1),
    ne = S != null,
    V = dn(A),
    he = Te(function (W) {
      return (W === void 0 && (W = V), W ? gn(W, Gt()) : []);
    }),
    ae = Te((W) => {
      const re = he(W);
      return se.current
        .map((ue) =>
          C && ue === "reference" ? C : V && ue === "floating" ? V : re,
        )
        .filter(Boolean)
        .flat();
    });
  (l.useEffect(() => {
    if (o || !a) return;
    function W(ue) {
      if (ue.key === "Tab") {
        _e(V, nt(Be(V))) && he().length === 0 && !k && Ke(ue);
        const me = ae(),
          ie = rt(ue);
        (se.current[0] === "reference" &&
          ie === C &&
          (Ke(ue), ue.shiftKey ? Et(me[me.length - 1]) : Et(me[1])),
          se.current[1] === "floating" &&
            ie === V &&
            ue.shiftKey &&
            (Ke(ue), Et(me[0])));
      }
    }
    const re = Be(V);
    return (
      re.addEventListener("keydown", W),
      () => {
        re.removeEventListener("keydown", W);
      }
    );
  }, [o, C, V, a, se, k, he, ae]),
    l.useEffect(() => {
      if (o || !A) return;
      function W(re) {
        const ue = rt(re),
          ie = he().indexOf(ue);
        ie !== -1 && ($.current = ie);
      }
      return (
        A.addEventListener("focusin", W),
        () => {
          A.removeEventListener("focusin", W);
        }
      );
    }, [o, A, he]),
    l.useEffect(() => {
      if (o || !b) return;
      function W() {
        ((T.current = !0),
          setTimeout(() => {
            T.current = !1;
          }));
      }
      function re(ie) {
        const oe = ie.relatedTarget,
          Pe = ie.currentTarget,
          Me = rt(ie);
        queueMicrotask(() => {
          const fe = F(),
            Ve = !(
              _e(C, oe) ||
              _e(A, oe) ||
              _e(oe, A) ||
              _e(S?.portalNode, oe) ||
              (oe != null && oe.hasAttribute(Ct("focus-guard"))) ||
              (y &&
                (It(y.nodesRef.current, fe).find((G) => {
                  var ce, q;
                  return (
                    _e(
                      (ce = G.context) == null ? void 0 : ce.elements.floating,
                      oe,
                    ) ||
                    _e(
                      (q = G.context) == null
                        ? void 0
                        : q.elements.domReference,
                      oe,
                    )
                  );
                }) ||
                  gr(y.nodesRef.current, fe).find((G) => {
                    var ce, q, xe;
                    return (
                      [
                        (ce = G.context) == null
                          ? void 0
                          : ce.elements.floating,
                        dn(
                          (q = G.context) == null
                            ? void 0
                            : q.elements.floating,
                        ),
                      ].includes(oe) ||
                      ((xe = G.context) == null
                        ? void 0
                        : xe.elements.domReference) === oe
                    );
                  })))
            );
          if (
            (Pe === C && V && Pr(V, se),
            f &&
              Pe !== C &&
              !(Me != null && Me.isConnected) &&
              nt(Be(V)) === Be(V).body)
          ) {
            Je(V) && V.focus();
            const G = $.current,
              ce = he(),
              q = ce[G] || ce[ce.length - 1] || V;
            Je(q) && q.focus();
          }
          if (P.current.insideReactTree) {
            P.current.insideReactTree = !1;
            return;
          }
          (k || !a) &&
            oe &&
            Ve &&
            !T.current &&
            oe !== Ar() &&
            ((I.current = !0), p(!1, ie, "focus-out"));
        });
      }
      const ue = !!(!y && S);
      function me() {
        (Fe(ve),
          (P.current.insideReactTree = !0),
          (ve.current = window.setTimeout(() => {
            P.current.insideReactTree = !1;
          })));
      }
      if (A && Je(C))
        return (
          C.addEventListener("focusout", re),
          C.addEventListener("pointerdown", W),
          A.addEventListener("focusout", re),
          ue && A.addEventListener("focusout", me, !0),
          () => {
            (C.removeEventListener("focusout", re),
              C.removeEventListener("pointerdown", W),
              A.removeEventListener("focusout", re),
              ue && A.removeEventListener("focusout", me, !0));
          }
        );
    }, [o, C, A, V, a, y, S, p, b, f, he, k, F, se, P]));
  const Se = l.useRef(null),
    Ae = l.useRef(null),
    be = Tr([Se, S?.beforeInsideRef]),
    Ie = Tr([Ae, S?.afterInsideRef]);
  (l.useEffect(() => {
    var W, re;
    if (o || !A) return;
    const ue = Array.from(
        (S == null || (W = S.portalNode) == null
          ? void 0
          : W.querySelectorAll("[" + Ct("portal") + "]")) || [],
      ),
      ie =
        (re = (y ? gr(y.nodesRef.current, F()) : []).find((Me) => {
          var fe;
          return Fn(
            ((fe = Me.context) == null ? void 0 : fe.elements.domReference) ||
              null,
          );
        })) == null || (re = re.context) == null
          ? void 0
          : re.elements.domReference,
      oe = [
        A,
        ie,
        ...ue,
        ...Q(),
        ee.current,
        _.current,
        Se.current,
        Ae.current,
        S?.beforeOutsideRef.current,
        S?.afterOutsideRef.current,
        se.current.includes("reference") || k ? C : null,
      ].filter((Me) => Me != null),
      Pe = a || k ? wr(oe, !H, H) : wr(oe);
    return () => {
      Pe();
    };
  }, [o, C, A, a, se, S, k, B, H, y, F, Q]),
    pe(() => {
      if (o || !Je(V)) return;
      const W = Be(V),
        re = nt(W);
      queueMicrotask(() => {
        const ue = ae(V),
          me = Z.current,
          ie = (typeof me == "number" ? ue[me] : me.current) || V,
          oe = _e(V, re);
        !K && !oe && R && Et(ie, { preventScroll: ie === V });
      });
    }, [o, R, V, K, ae, Z]),
    pe(() => {
      if (o || !V) return;
      const W = Be(V),
        re = nt(W);
      Ns(re);
      function ue(oe) {
        let { reason: Pe, event: Me, nested: fe } = oe;
        if (
          (["hover", "safe-polygon"].includes(Pe) &&
            Me.type === "mouseleave" &&
            (I.current = !0),
          Pe === "outside-press")
        )
          if (fe) I.current = !1;
          else if (ro(Me) || oo(Me)) I.current = !1;
          else {
            let Ve = !1;
            (document.createElement("div").focus({
              get preventScroll() {
                return ((Ve = !0), !1);
              },
            }),
              Ve ? (I.current = !1) : (I.current = !0));
          }
      }
      E.on("openchange", ue);
      const me = W.createElement("span");
      (me.setAttribute("tabindex", "-1"),
        me.setAttribute("aria-hidden", "true"),
        Object.assign(me.style, Bn),
        ne && C && C.insertAdjacentElement("afterend", me));
      function ie() {
        if (typeof J.current == "boolean") {
          const oe = C || Ar();
          return oe && oe.isConnected ? oe : me;
        }
        return J.current.current || me;
      }
      return () => {
        E.off("openchange", ue);
        const oe = nt(W),
          Pe =
            _e(A, oe) ||
            (y &&
              It(y.nodesRef.current, F(), !1).some((fe) => {
                var Ve;
                return _e(
                  (Ve = fe.context) == null ? void 0 : Ve.elements.floating,
                  oe,
                );
              })),
          Me = ie();
        queueMicrotask(() => {
          const fe = Ds(Me);
          (J.current &&
            !I.current &&
            Je(fe) &&
            (!(fe !== oe && oe !== W.body) || Pe) &&
            fe.focus({ preventScroll: !0 }),
            me.remove());
        });
      };
    }, [o, A, V, J, P, E, y, ne, C, F]),
    l.useEffect(
      () => (
        queueMicrotask(() => {
          I.current = !1;
        }),
        () => {
          queueMicrotask($n);
        }
      ),
      [o],
    ),
    pe(() => {
      if (!o && S)
        return (
          S.setFocusManagerState({
            modal: a,
            closeOnFocusOut: b,
            open: R,
            onOpenChange: p,
            domReference: C,
          }),
          () => {
            S.setFocusManagerState(null);
          }
        );
    }, [o, S, a, R, p, b, C]),
    pe(() => {
      o || (V && Pr(V, se));
    }, [o, V, se]));
  function Ne(W) {
    return o || !d || !a
      ? null
      : X.jsx(Ls, {
          ref: W === "start" ? ee : _,
          onClick: (re) => p(!1, re.nativeEvent),
          children: typeof d == "string" ? d : "Dismiss",
        });
  }
  const U = !o && B && (a ? !k : !0) && (ne || a);
  return X.jsxs(X.Fragment, {
    children: [
      U &&
        X.jsx(mn, {
          "data-type": "inside",
          ref: be,
          onFocus: (W) => {
            if (a) {
              const ue = ae();
              Et(n[0] === "reference" ? ue[0] : ue[ue.length - 1]);
            } else if (S != null && S.preserveTabOrder && S.portalNode)
              if (((I.current = !1), Bt(W, S.portalNode))) {
                const ue = ao(C);
                ue?.focus();
              } else {
                var re;
                (re = S.beforeOutsideRef.current) == null || re.focus();
              }
          },
        }),
      !k && Ne("start"),
      r,
      Ne("end"),
      U &&
        X.jsx(mn, {
          "data-type": "inside",
          ref: Ie,
          onFocus: (W) => {
            if (a) Et(ae()[0]);
            else if (S != null && S.preserveTabOrder && S.portalNode)
              if ((b && (I.current = !0), Bt(W, S.portalNode))) {
                const ue = fo(C);
                ue?.focus();
              } else {
                var re;
                (re = S.afterOutsideRef.current) == null || re.focus();
              }
          },
        }),
    ],
  });
}
let rn = 0;
const Mr = "--floating-ui-scrollbar-width";
function _s() {
  const t = jn(),
    e =
      /iP(hone|ad|od)|iOS/.test(t) ||
      (t === "MacIntel" && navigator.maxTouchPoints > 1),
    r = document.body.style,
    n =
      Math.round(document.documentElement.getBoundingClientRect().left) +
      document.documentElement.scrollLeft
        ? "paddingLeft"
        : "paddingRight",
    s = window.innerWidth - document.documentElement.clientWidth,
    i = r.left ? parseFloat(r.left) : window.scrollX,
    u = r.top ? parseFloat(r.top) : window.scrollY;
  if (
    ((r.overflow = "hidden"),
    r.setProperty(Mr, s + "px"),
    s && (r[n] = s + "px"),
    e)
  ) {
    var f, a;
    const d =
        ((f = window.visualViewport) == null ? void 0 : f.offsetLeft) || 0,
      b = ((a = window.visualViewport) == null ? void 0 : a.offsetTop) || 0;
    Object.assign(r, {
      position: "fixed",
      top: -(u - Math.floor(b)) + "px",
      left: -(i - Math.floor(d)) + "px",
      right: "0",
    });
  }
  return () => {
    (Object.assign(r, { overflow: "", [n]: "" }),
      r.removeProperty(Mr),
      e &&
        (Object.assign(r, { position: "", top: "", left: "", right: "" }),
        window.scrollTo(i, u)));
  };
}
let Or = () => {};
const Hs = l.forwardRef(function (e, r) {
  const { lockScroll: o = !1, ...n } = e;
  return (
    pe(() => {
      if (o)
        return (
          rn++,
          rn === 1 && (Or = _s()),
          () => {
            (rn--, rn === 0 && Or());
          }
        );
    }, [o]),
    X.jsx("div", {
      ref: r,
      ...n,
      style: {
        position: "fixed",
        overflow: "auto",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...n.style,
      },
    })
  );
});
function kr(t) {
  return Je(t.target) && t.target.tagName === "BUTTON";
}
function Vs(t) {
  return Je(t.target) && t.target.tagName === "A";
}
function Nr(t) {
  return Kn(t);
}
function zs(t, e) {
  e === void 0 && (e = {});
  const {
      open: r,
      onOpenChange: o,
      dataRef: n,
      elements: { domReference: s },
    } = t,
    {
      enabled: i = !0,
      event: u = "click",
      toggle: f = !0,
      ignoreMouse: a = !1,
      keyboardHandlers: d = !0,
      stickIfOpen: b = !0,
    } = e,
    v = l.useRef(),
    h = l.useRef(!1),
    R = l.useMemo(
      () => ({
        onPointerDown(p) {
          v.current = p.pointerType;
        },
        onMouseDown(p) {
          const E = v.current;
          p.button === 0 &&
            u !== "click" &&
            ((Vt(E, !0) && a) ||
              (r &&
              f &&
              (!(n.current.openEvent && b) ||
                n.current.openEvent.type === "mousedown")
                ? o(!1, p.nativeEvent, "click")
                : (p.preventDefault(), o(!0, p.nativeEvent, "click"))));
        },
        onClick(p) {
          const E = v.current;
          if (u === "mousedown" && v.current) {
            v.current = void 0;
            return;
          }
          (Vt(E, !0) && a) ||
            (r &&
            f &&
            (!(n.current.openEvent && b) ||
              n.current.openEvent.type === "click")
              ? o(!1, p.nativeEvent, "click")
              : o(!0, p.nativeEvent, "click"));
        },
        onKeyDown(p) {
          ((v.current = void 0),
            !(p.defaultPrevented || !d || kr(p)) &&
              (p.key === " " &&
                !Nr(s) &&
                (p.preventDefault(), (h.current = !0)),
              !Vs(p) &&
                p.key === "Enter" &&
                o(!(r && f), p.nativeEvent, "click")));
        },
        onKeyUp(p) {
          p.defaultPrevented ||
            !d ||
            kr(p) ||
            Nr(s) ||
            (p.key === " " &&
              h.current &&
              ((h.current = !1), o(!(r && f), p.nativeEvent, "click")));
        },
      }),
      [n, s, u, a, d, o, r, b, f],
    );
  return l.useMemo(() => (i ? { reference: R } : {}), [i, R]);
}
function js(t, e) {
  let r = null,
    o = null,
    n = !1;
  return {
    contextElement: t || void 0,
    getBoundingClientRect() {
      var s;
      const i = t?.getBoundingClientRect() || {
          width: 0,
          height: 0,
          x: 0,
          y: 0,
        },
        u = e.axis === "x" || e.axis === "both",
        f = e.axis === "y" || e.axis === "both",
        a =
          ["mouseenter", "mousemove"].includes(
            ((s = e.dataRef.current.openEvent) == null ? void 0 : s.type) || "",
          ) && e.pointerType !== "touch";
      let d = i.width,
        b = i.height,
        v = i.x,
        h = i.y;
      return (
        r == null && e.x && u && (r = i.x - e.x),
        o == null && e.y && f && (o = i.y - e.y),
        (v -= r || 0),
        (h -= o || 0),
        (d = 0),
        (b = 0),
        !n || a
          ? ((d = e.axis === "y" ? i.width : 0),
            (b = e.axis === "x" ? i.height : 0),
            (v = u && e.x != null ? e.x : v),
            (h = f && e.y != null ? e.y : h))
          : n &&
            !a &&
            ((b = e.axis === "x" ? i.height : b),
            (d = e.axis === "y" ? i.width : d)),
        (n = !0),
        {
          width: d,
          height: b,
          x: v,
          y: h,
          top: h,
          right: v + d,
          bottom: h + b,
          left: v,
        }
      );
    },
  };
}
function Dr(t) {
  return t != null && t.clientX != null;
}
function Ws(t, e) {
  e === void 0 && (e = {});
  const {
      open: r,
      dataRef: o,
      elements: { floating: n, domReference: s },
      refs: i,
    } = t,
    { enabled: u = !0, axis: f = "both", x: a = null, y: d = null } = e,
    b = l.useRef(!1),
    v = l.useRef(null),
    [h, R] = l.useState(),
    [p, E] = l.useState([]),
    P = Te((K, k) => {
      b.current ||
        (o.current.openEvent && !Dr(o.current.openEvent)) ||
        i.setPositionReference(
          js(s, { x: K, y: k, axis: f, dataRef: o, pointerType: h }),
        );
    }),
    C = Te((K) => {
      a != null ||
        d != null ||
        (r ? v.current || E([]) : P(K.clientX, K.clientY));
    }),
    A = Vt(h) ? n : r,
    F = l.useCallback(() => {
      if (!A || !u || a != null || d != null) return;
      const K = $r(n);
      function k(D) {
        const B = rt(D);
        _e(n, B)
          ? (K.removeEventListener("mousemove", k), (v.current = null))
          : P(D.clientX, D.clientY);
      }
      if (!o.current.openEvent || Dr(o.current.openEvent)) {
        K.addEventListener("mousemove", k);
        const D = () => {
          (K.removeEventListener("mousemove", k), (v.current = null));
        };
        return ((v.current = D), D);
      }
      i.setPositionReference(s);
    }, [A, u, a, d, n, o, i, s, P]);
  (l.useEffect(() => F(), [F, p]),
    l.useEffect(() => {
      u && !n && (b.current = !1);
    }, [u, n]),
    l.useEffect(() => {
      !u && r && (b.current = !0);
    }, [u, r]),
    pe(() => {
      u && (a != null || d != null) && ((b.current = !1), P(a, d));
    }, [u, a, d, P]));
  const Q = l.useMemo(() => {
    function K(k) {
      let { pointerType: D } = k;
      R(D);
    }
    return {
      onPointerDown: K,
      onPointerEnter: K,
      onMouseMove: C,
      onMouseEnter: C,
    };
  }, [C]);
  return l.useMemo(() => (u ? { reference: Q } : {}), [u, Q]);
}
const Ks = {
    pointerdown: "onPointerDown",
    mousedown: "onMouseDown",
    click: "onClick",
  },
  Bs = {
    pointerdown: "onPointerDownCapture",
    mousedown: "onMouseDownCapture",
    click: "onClickCapture",
  },
  Lr = (t) => {
    var e, r;
    return {
      escapeKey:
        typeof t == "boolean" ? t : (e = t?.escapeKey) != null ? e : !1,
      outsidePress:
        typeof t == "boolean" ? t : (r = t?.outsidePress) != null ? r : !0,
    };
  };
function $s(t, e) {
  e === void 0 && (e = {});
  const { open: r, onOpenChange: o, elements: n, dataRef: s } = t,
    {
      enabled: i = !0,
      escapeKey: u = !0,
      outsidePress: f = !0,
      outsidePressEvent: a = "pointerdown",
      referencePress: d = !1,
      referencePressEvent: b = "pointerdown",
      ancestorScroll: v = !1,
      bubbles: h,
      capture: R,
    } = e,
    p = St(),
    E = Te(typeof f == "function" ? f : () => !1),
    P = typeof f == "function" ? E : f,
    C = l.useRef(!1),
    { escapeKey: A, outsidePress: F } = Lr(h),
    { escapeKey: Q, outsidePress: K } = Lr(R),
    k = l.useRef(!1),
    D = Te((y) => {
      var S;
      if (!r || !i || !u || y.key !== "Escape" || k.current) return;
      const ee = (S = s.current.floatingContext) == null ? void 0 : S.nodeId,
        _ = p ? It(p.nodesRef.current, ee) : [];
      if (!A && (y.stopPropagation(), _.length > 0)) {
        let I = !0;
        if (
          (_.forEach((T) => {
            var $;
            if (
              ($ = T.context) != null &&
              $.open &&
              !T.context.dataRef.current.__escapeKeyBubbles
            ) {
              I = !1;
              return;
            }
          }),
          !I)
        )
          return;
      }
      o(!1, ns(y) ? y.nativeEvent : y, "escape-key");
    }),
    B = Te((y) => {
      var S;
      const ee = () => {
        var _;
        (D(y), (_ = rt(y)) == null || _.removeEventListener("keydown", ee));
      };
      (S = rt(y)) == null || S.addEventListener("keydown", ee);
    }),
    H = Te((y) => {
      var S;
      const ee = s.current.insideReactTree;
      s.current.insideReactTree = !1;
      const _ = C.current;
      if (
        ((C.current = !1),
        (a === "click" && _) || ee || (typeof P == "function" && !P(y)))
      )
        return;
      const I = rt(y),
        T = "[" + Ct("inert") + "]",
        $ = Be(n.floating).querySelectorAll(T);
      let ve = Ge(I) ? I : null;
      for (; ve && !En(ve); ) {
        const ae = bi(ve);
        if (En(ae) || !Ge(ae)) break;
        ve = ae;
      }
      if (
        $.length &&
        Ge(I) &&
        !Qi(I) &&
        !_e(I, n.floating) &&
        Array.from($).every((ae) => !_e(ve, ae))
      )
        return;
      if (Je(I) && J) {
        const ae = En(I),
          Se = Kr(I),
          Ae = /auto|scroll/,
          be = ae || Ae.test(Se.overflowX),
          Ie = ae || Ae.test(Se.overflowY),
          Ne = be && I.clientWidth > 0 && I.scrollWidth > I.clientWidth,
          U = Ie && I.clientHeight > 0 && I.scrollHeight > I.clientHeight,
          W = Se.direction === "rtl",
          re =
            U &&
            (W
              ? y.offsetX <= I.offsetWidth - I.clientWidth
              : y.offsetX > I.clientWidth),
          ue = Ne && y.offsetY > I.clientHeight;
        if (re || ue) return;
      }
      const ne = (S = s.current.floatingContext) == null ? void 0 : S.nodeId,
        V =
          p &&
          It(p.nodesRef.current, ne).some((ae) => {
            var Se;
            return Cn(
              y,
              (Se = ae.context) == null ? void 0 : Se.elements.floating,
            );
          });
      if (Cn(y, n.floating) || Cn(y, n.domReference) || V) return;
      const he = p ? It(p.nodesRef.current, ne) : [];
      if (he.length > 0) {
        let ae = !0;
        if (
          (he.forEach((Se) => {
            var Ae;
            if (
              (Ae = Se.context) != null &&
              Ae.open &&
              !Se.context.dataRef.current.__outsidePressBubbles
            ) {
              ae = !1;
              return;
            }
          }),
          !ae)
        )
          return;
      }
      o(!1, y, "outside-press");
    }),
    se = Te((y) => {
      var S;
      const ee = () => {
        var _;
        (H(y), (_ = rt(y)) == null || _.removeEventListener(a, ee));
      };
      (S = rt(y)) == null || S.addEventListener(a, ee);
    });
  (l.useEffect(() => {
    if (!r || !i) return;
    ((s.current.__escapeKeyBubbles = A), (s.current.__outsidePressBubbles = F));
    let y = -1;
    function S($) {
      o(!1, $, "ancestor-scroll");
    }
    function ee() {
      (window.clearTimeout(y), (k.current = !0));
    }
    function _() {
      y = window.setTimeout(
        () => {
          k.current = !1;
        },
        vi() ? 5 : 0,
      );
    }
    const I = Be(n.floating);
    (u &&
      (I.addEventListener("keydown", Q ? B : D, Q),
      I.addEventListener("compositionstart", ee),
      I.addEventListener("compositionend", _)),
      P && I.addEventListener(a, K ? se : H, K));
    let T = [];
    return (
      v &&
        (Ge(n.domReference) && (T = sn(n.domReference)),
        Ge(n.floating) && (T = T.concat(sn(n.floating))),
        !Ge(n.reference) &&
          n.reference &&
          n.reference.contextElement &&
          (T = T.concat(sn(n.reference.contextElement)))),
      (T = T.filter(($) => {
        var ve;
        return (
          $ !== ((ve = I.defaultView) == null ? void 0 : ve.visualViewport)
        );
      })),
      T.forEach(($) => {
        $.addEventListener("scroll", S, { passive: !0 });
      }),
      () => {
        (u &&
          (I.removeEventListener("keydown", Q ? B : D, Q),
          I.removeEventListener("compositionstart", ee),
          I.removeEventListener("compositionend", _)),
          P && I.removeEventListener(a, K ? se : H, K),
          T.forEach(($) => {
            $.removeEventListener("scroll", S);
          }),
          window.clearTimeout(y));
      }
    );
  }, [s, n, u, P, a, r, o, v, i, A, F, D, Q, B, H, K, se]),
    l.useEffect(() => {
      s.current.insideReactTree = !1;
    }, [s, P, a]));
  const Z = l.useMemo(
      () => ({
        onKeyDown: D,
        ...(d && {
          [Ks[b]]: (y) => {
            o(!1, y.nativeEvent, "reference-press");
          },
          ...(b !== "click" && {
            onClick(y) {
              o(!1, y.nativeEvent, "reference-press");
            },
          }),
        }),
      }),
      [D, o, d, b],
    ),
    J = l.useMemo(() => {
      function y(S) {
        S.button === 0 && (C.current = !0);
      }
      return {
        onKeyDown: D,
        onMouseDown: y,
        onMouseUp: y,
        [Bs[a]]: () => {
          s.current.insideReactTree = !0;
        },
      };
    }, [D, a, s]);
  return l.useMemo(() => (i ? { reference: Z, floating: J } : {}), [i, Z, J]);
}
function Oo(t) {
  const { open: e = !1, onOpenChange: r, elements: o } = t,
    n = zt(),
    s = l.useRef({}),
    [i] = l.useState(() => xo()),
    u = Tt() != null,
    [f, a] = l.useState(o.reference),
    d = Te((h, R, p) => {
      ((s.current.openEvent = h ? R : void 0),
        i.emit("openchange", { open: h, event: R, reason: p, nested: u }),
        r?.(h, R, p));
    }),
    b = l.useMemo(() => ({ setPositionReference: a }), []),
    v = l.useMemo(
      () => ({
        reference: f || o.reference || null,
        floating: o.floating || null,
        domReference: o.reference,
      }),
      [f, o.reference, o.floating],
    );
  return l.useMemo(
    () => ({
      dataRef: s,
      open: e,
      onOpenChange: d,
      elements: v,
      events: i,
      floatingId: n,
      refs: b,
    }),
    [e, d, v, i, n, b],
  );
}
function Us(t) {
  t === void 0 && (t = {});
  const { nodeId: e } = t,
    r = Oo({
      ...t,
      elements: { reference: null, floating: null, ...t.elements },
    }),
    o = t.rootContext || r,
    n = o.elements,
    [s, i] = l.useState(null),
    [u, f] = l.useState(null),
    d = n?.domReference || s,
    b = l.useRef(null),
    v = St();
  pe(() => {
    d && (b.current = d);
  }, [d]);
  const h = pi({ ...t, elements: { ...n, ...(u && { reference: u }) } }),
    R = l.useCallback(
      (A) => {
        const F = Ge(A)
          ? {
              getBoundingClientRect: () => A.getBoundingClientRect(),
              getClientRects: () => A.getClientRects(),
              contextElement: A,
            }
          : A;
        (f(F), h.refs.setReference(F));
      },
      [h.refs],
    ),
    p = l.useCallback(
      (A) => {
        ((Ge(A) || A === null) && ((b.current = A), i(A)),
          (Ge(h.refs.reference.current) ||
            h.refs.reference.current === null ||
            (A !== null && !Ge(A))) &&
            h.refs.setReference(A));
      },
      [h.refs],
    ),
    E = l.useMemo(
      () => ({
        ...h.refs,
        setReference: p,
        setPositionReference: R,
        domReference: b,
      }),
      [h.refs, p, R],
    ),
    P = l.useMemo(() => ({ ...h.elements, domReference: d }), [h.elements, d]),
    C = l.useMemo(
      () => ({ ...h, ...o, refs: E, elements: P, nodeId: e }),
      [h, E, P, e, o],
    );
  return (
    pe(() => {
      o.dataRef.current.floatingContext = C;
      const A = v?.nodesRef.current.find((F) => F.id === e);
      A && (A.context = C);
    }),
    l.useMemo(() => ({ ...h, context: C, refs: E, elements: P }), [h, E, P, C])
  );
}
function Mn() {
  return qi() && to();
}
function Ys(t, e) {
  e === void 0 && (e = {});
  const { open: r, onOpenChange: o, events: n, dataRef: s, elements: i } = t,
    { enabled: u = !0, visibleOnly: f = !0 } = e,
    a = l.useRef(!1),
    d = l.useRef(-1),
    b = l.useRef(!0);
  (l.useEffect(() => {
    if (!u) return;
    const h = $r(i.domReference);
    function R() {
      !r &&
        Je(i.domReference) &&
        i.domReference === nt(Be(i.domReference)) &&
        (a.current = !0);
    }
    function p() {
      b.current = !0;
    }
    function E() {
      b.current = !1;
    }
    return (
      h.addEventListener("blur", R),
      Mn() &&
        (h.addEventListener("keydown", p, !0),
        h.addEventListener("pointerdown", E, !0)),
      () => {
        (h.removeEventListener("blur", R),
          Mn() &&
            (h.removeEventListener("keydown", p, !0),
            h.removeEventListener("pointerdown", E, !0)));
      }
    );
  }, [i.domReference, r, u]),
    l.useEffect(() => {
      if (!u) return;
      function h(R) {
        let { reason: p } = R;
        (p === "reference-press" || p === "escape-key") && (a.current = !0);
      }
      return (
        n.on("openchange", h),
        () => {
          n.off("openchange", h);
        }
      );
    }, [n, u]),
    l.useEffect(
      () => () => {
        Fe(d);
      },
      [],
    ));
  const v = l.useMemo(
    () => ({
      onMouseLeave() {
        a.current = !1;
      },
      onFocus(h) {
        if (a.current) return;
        const R = rt(h.nativeEvent);
        if (f && Ge(R)) {
          if (Mn() && !h.relatedTarget) {
            if (!b.current && !Kn(R)) return;
          } else if (!es(R)) return;
        }
        o(!0, h.nativeEvent, "focus");
      },
      onBlur(h) {
        a.current = !1;
        const R = h.relatedTarget,
          p = h.nativeEvent,
          E =
            Ge(R) &&
            R.hasAttribute(Ct("focus-guard")) &&
            R.getAttribute("data-type") === "outside";
        d.current = window.setTimeout(() => {
          var P;
          const C = nt(
            i.domReference ? i.domReference.ownerDocument : document,
          );
          (!R && C === i.domReference) ||
            _e(
              (P = s.current.floatingContext) == null
                ? void 0
                : P.refs.floating.current,
              C,
            ) ||
            _e(i.domReference, C) ||
            E ||
            o(!1, p, "focus");
        });
      },
    }),
    [s, i.domReference, o, f],
  );
  return l.useMemo(() => (u ? { reference: v } : {}), [u, v]);
}
function On(t, e, r) {
  const o = new Map(),
    n = r === "item";
  let s = t;
  if (n && t) {
    const { [vr]: i, [br]: u, ...f } = t;
    s = f;
  }
  return {
    ...(r === "floating" && { tabIndex: -1, [as]: "" }),
    ...s,
    ...e
      .map((i) => {
        const u = i ? i[r] : null;
        return typeof u == "function" ? (t ? u(t) : null) : u;
      })
      .concat(t)
      .reduce(
        (i, u) => (
          u &&
            Object.entries(u).forEach((f) => {
              let [a, d] = f;
              if (!(n && [vr, br].includes(a)))
                if (a.indexOf("on") === 0) {
                  if ((o.has(a) || o.set(a, []), typeof d == "function")) {
                    var b;
                    ((b = o.get(a)) == null || b.push(d),
                      (i[a] = function () {
                        for (
                          var v, h = arguments.length, R = new Array(h), p = 0;
                          p < h;
                          p++
                        )
                          R[p] = arguments[p];
                        return (v = o.get(a)) == null
                          ? void 0
                          : v.map((E) => E(...R)).find((E) => E !== void 0);
                      }));
                  }
                } else i[a] = d;
            }),
          i
        ),
        {},
      ),
  };
}
function Gs(t) {
  t === void 0 && (t = []);
  const e = t.map((u) => u?.reference),
    r = t.map((u) => u?.floating),
    o = t.map((u) => u?.item),
    n = l.useCallback((u) => On(u, t, "reference"), e),
    s = l.useCallback((u) => On(u, t, "floating"), r),
    i = l.useCallback((u) => On(u, t, "item"), o);
  return l.useMemo(
    () => ({ getReferenceProps: n, getFloatingProps: s, getItemProps: i }),
    [n, s, i],
  );
}
const qs = "Escape";
function hn(t, e, r) {
  switch (t) {
    case "vertical":
      return e;
    case "horizontal":
      return r;
    default:
      return e || r;
  }
}
function on(t, e) {
  return hn(e, t === Yt || t === ht, t === vt || t === bt);
}
function kn(t, e, r) {
  return (
    hn(e, t === ht, r ? t === vt : t === bt) ||
    t === "Enter" ||
    t === " " ||
    t === ""
  );
}
function Fr(t, e, r) {
  return hn(e, r ? t === vt : t === bt, t === ht);
}
function _r(t, e, r, o) {
  const n = r ? t === bt : t === vt,
    s = t === Yt;
  return e === "both" || (e === "horizontal" && o && o > 1)
    ? t === qs
    : hn(e, n, s);
}
function Xs(t, e) {
  const { open: r, onOpenChange: o, elements: n, floatingId: s } = t,
    {
      listRef: i,
      activeIndex: u,
      onNavigate: f = () => {},
      enabled: a = !0,
      selectedIndex: d = null,
      allowEscape: b = !1,
      loop: v = !1,
      nested: h = !1,
      rtl: R = !1,
      virtual: p = !1,
      focusItemOnOpen: E = "auto",
      focusItemOnHover: P = !0,
      openOnArrowKeyDown: C = !0,
      disabledIndices: A = void 0,
      orientation: F = "vertical",
      parentOrientation: Q,
      cols: K = 1,
      scrollItemIntoView: k = !0,
      virtualItemRef: D,
      itemSizes: B,
      dense: H = !1,
    } = e,
    se = dn(n.floating),
    Z = He(se),
    J = Tt(),
    y = St();
  pe(() => {
    t.dataRef.current.orientation = F;
  }, [t, F]);
  const S = Te(() => {
      f(I.current === -1 ? null : I.current);
    }),
    ee = Fn(n.domReference),
    _ = l.useRef(E),
    I = l.useRef(d ?? -1),
    T = l.useRef(null),
    $ = l.useRef(!0),
    ve = l.useRef(S),
    ne = l.useRef(!!n.floating),
    V = l.useRef(r),
    he = l.useRef(!1),
    ae = l.useRef(!1),
    Se = He(A),
    Ae = He(r),
    be = He(k),
    Ie = He(d),
    [Ne, U] = l.useState(),
    [W, re] = l.useState(),
    ue = Te(() => {
      function G(we) {
        if (p) {
          var ke;
          ((ke = we.id) != null &&
            ke.endsWith("-fui-option") &&
            (we.id = s + "-" + Math.random().toString(16).slice(2, 10)),
            U(we.id),
            y?.events.emit("virtualfocus", we),
            D && (D.current = we));
        } else Et(we, { sync: he.current, preventScroll: !0 });
      }
      const ce = i.current[I.current],
        q = ae.current;
      (ce && G(ce),
        (he.current ? (we) => we() : requestAnimationFrame)(() => {
          const we = i.current[I.current] || ce;
          if (!we) return;
          ce || G(we);
          const ke = be.current;
          ke &&
            ie &&
            (q || !$.current) &&
            (we.scrollIntoView == null ||
              we.scrollIntoView(
                typeof ke == "boolean"
                  ? { block: "nearest", inline: "nearest" }
                  : ke,
              ));
        }));
    });
  (pe(() => {
    a &&
      (r && n.floating
        ? _.current && d != null && ((ae.current = !0), (I.current = d), S())
        : ne.current && ((I.current = -1), ve.current()));
  }, [a, r, n.floating, d, S]),
    pe(() => {
      if (a && r && n.floating)
        if (u == null) {
          if (((he.current = !1), Ie.current != null)) return;
          if (
            (ne.current && ((I.current = -1), ue()),
            (!V.current || !ne.current) &&
              _.current &&
              (T.current != null || (_.current === !0 && T.current == null)))
          ) {
            let G = 0;
            const ce = () => {
              i.current[0] == null
                ? (G < 2 && (G ? requestAnimationFrame : queueMicrotask)(ce),
                  G++)
                : ((I.current =
                    T.current == null || kn(T.current, F, R) || h
                      ? un(i, Se.current)
                      : _n(i, Se.current)),
                  (T.current = null),
                  S());
            };
            ce();
          }
        } else Ft(i, u) || ((I.current = u), ue(), (ae.current = !1));
    }, [a, r, n.floating, u, Ie, h, i, F, R, S, ue, Se]),
    pe(() => {
      var G;
      if (!a || n.floating || !y || p || !ne.current) return;
      const ce = y.nodesRef.current,
        q =
          (G = ce.find((ke) => ke.id === J)) == null || (G = G.context) == null
            ? void 0
            : G.elements.floating,
        xe = nt(Be(n.floating)),
        we = ce.some(
          (ke) => ke.context && _e(ke.context.elements.floating, xe),
        );
      q && !we && $.current && q.focus({ preventScroll: !0 });
    }, [a, n.floating, y, J, p]),
    pe(() => {
      if (!a || !y || !p || J) return;
      function G(ce) {
        (re(ce.id), D && (D.current = ce));
      }
      return (
        y.events.on("virtualfocus", G),
        () => {
          y.events.off("virtualfocus", G);
        }
      );
    }, [a, y, p, J, D]),
    pe(() => {
      ((ve.current = S), (V.current = r), (ne.current = !!n.floating));
    }),
    pe(() => {
      r || ((T.current = null), (_.current = E));
    }, [r, E]));
  const me = u != null,
    ie = l.useMemo(() => {
      function G(q) {
        if (!Ae.current) return;
        const xe = i.current.indexOf(q);
        xe !== -1 && I.current !== xe && ((I.current = xe), S());
      }
      return {
        onFocus(q) {
          let { currentTarget: xe } = q;
          ((he.current = !0), G(xe));
        },
        onClick: (q) => {
          let { currentTarget: xe } = q;
          return xe.focus({ preventScroll: !0 });
        },
        onMouseMove(q) {
          let { currentTarget: xe } = q;
          ((he.current = !0), (ae.current = !1), P && G(xe));
        },
        onPointerLeave(q) {
          let { pointerType: xe } = q;
          if (
            !(!$.current || xe === "touch") &&
            ((he.current = !0), !!P && ((I.current = -1), S(), !p))
          ) {
            var we;
            (we = Z.current) == null || we.focus({ preventScroll: !0 });
          }
        },
      };
    }, [Ae, Z, P, i, S, p]),
    oe = l.useCallback(() => {
      var G;
      return (
        Q ??
        (y == null ||
        (G = y.nodesRef.current.find((ce) => ce.id === J)) == null ||
        (G = G.context) == null ||
        (G = G.dataRef) == null
          ? void 0
          : G.current.orientation)
      );
    }, [J, y, Q]),
    Pe = Te((G) => {
      if (
        (($.current = !1),
        (he.current = !0),
        G.which === 229 || (!Ae.current && G.currentTarget === Z.current))
      )
        return;
      if (h && _r(G.key, F, R, K)) {
        (on(G.key, oe()) || Ke(G),
          o(!1, G.nativeEvent, "list-navigation"),
          Je(n.domReference) &&
            (p
              ? y?.events.emit("virtualfocus", n.domReference)
              : n.domReference.focus()));
        return;
      }
      const ce = I.current,
        q = un(i, A),
        xe = _n(i, A);
      if (
        (ee ||
          (G.key === "Home" && (Ke(G), (I.current = q), S()),
          G.key === "End" && (Ke(G), (I.current = xe), S())),
        K > 1)
      ) {
        const we =
            B ||
            Array.from({ length: i.current.length }, () => ({
              width: 1,
              height: 1,
            })),
          ke = so(we, K, H),
          Qe = ke.findIndex((ze) => ze != null && !wt(i, ze, A)),
          Pt = ke.reduce(
            (ze, ot, Mt) => (ot != null && !wt(i, ot, A) ? Mt : ze),
            -1,
          ),
          yt =
            ke[
              io(
                {
                  current: ke.map((ze) => (ze != null ? i.current[ze] : null)),
                },
                {
                  event: G,
                  orientation: F,
                  loop: v,
                  rtl: R,
                  cols: K,
                  disabledIndices: co(
                    [
                      ...((typeof A != "function" ? A : null) ||
                        i.current.map((ze, ot) =>
                          wt(i, ot, A) ? ot : void 0,
                        )),
                      void 0,
                    ],
                    ke,
                  ),
                  minIndex: Qe,
                  maxIndex: Pt,
                  prevIndex: uo(
                    I.current > xe ? q : I.current,
                    we,
                    ke,
                    K,
                    G.key === ht ? "bl" : G.key === (R ? vt : bt) ? "tr" : "tl",
                  ),
                  stopEvent: !0,
                },
              )
            ];
        if ((yt != null && ((I.current = yt), S()), F === "both")) return;
      }
      if (on(G.key, F)) {
        if (
          (Ke(G),
          r && !p && nt(G.currentTarget.ownerDocument) === G.currentTarget)
        ) {
          ((I.current = kn(G.key, F, R) ? q : xe), S());
          return;
        }
        (kn(G.key, F, R)
          ? v
            ? (I.current =
                ce >= xe
                  ? b && ce !== i.current.length
                    ? -1
                    : q
                  : We(i, { startingIndex: ce, disabledIndices: A }))
            : (I.current = Math.min(
                xe,
                We(i, { startingIndex: ce, disabledIndices: A }),
              ))
          : v
            ? (I.current =
                ce <= q
                  ? b && ce !== -1
                    ? i.current.length
                    : xe
                  : We(i, {
                      startingIndex: ce,
                      decrement: !0,
                      disabledIndices: A,
                    }))
            : (I.current = Math.max(
                q,
                We(i, { startingIndex: ce, decrement: !0, disabledIndices: A }),
              )),
          Ft(i, I.current) && (I.current = -1),
          S());
      }
    }),
    Me = l.useMemo(
      () => p && r && me && { "aria-activedescendant": W || Ne },
      [p, r, me, W, Ne],
    ),
    fe = l.useMemo(
      () => ({
        "aria-orientation": F === "both" ? void 0 : F,
        ...(ee ? {} : Me),
        onKeyDown: Pe,
        onPointerMove() {
          $.current = !0;
        },
      }),
      [Me, Pe, F, ee],
    ),
    Ve = l.useMemo(() => {
      function G(q) {
        E === "auto" && ro(q.nativeEvent) && (_.current = !0);
      }
      function ce(q) {
        ((_.current = E),
          E === "auto" && oo(q.nativeEvent) && (_.current = !0));
      }
      return {
        ...Me,
        onKeyDown(q) {
          $.current = !1;
          const xe = q.key.startsWith("Arrow"),
            we = ["Home", "End"].includes(q.key),
            ke = xe || we,
            Qe = Fr(q.key, F, R),
            Pt = _r(q.key, F, R, K),
            yt = Fr(q.key, oe(), R),
            ze = on(q.key, F),
            ot = (h ? yt : ze) || q.key === "Enter" || q.key.trim() === "";
          if (p && r) {
            const Ot = y?.nodesRef.current.find((it) => it.parentId == null),
              et = y && Ot ? ts(y.nodesRef.current, Ot.id) : null;
            if (ke && et && D) {
              const it = new KeyboardEvent("keydown", {
                key: q.key,
                bubbles: !0,
              });
              if (Qe || Pt) {
                var Mt, jt;
                const tt =
                    ((Mt = et.context) == null
                      ? void 0
                      : Mt.elements.domReference) === q.currentTarget,
                  qt =
                    Pt && !tt
                      ? (jt = et.context) == null
                        ? void 0
                        : jt.elements.domReference
                      : Qe
                        ? i.current.find((Kt) => Kt?.id === Ne)
                        : null;
                qt && (Ke(q), qt.dispatchEvent(it), re(void 0));
              }
              if (
                (ze || we) &&
                et.context &&
                et.context.open &&
                et.parentId &&
                q.currentTarget !== et.context.elements.domReference
              ) {
                var Wt;
                (Ke(q),
                  (Wt = et.context.elements.domReference) == null ||
                    Wt.dispatchEvent(it));
                return;
              }
            }
            return Pe(q);
          }
          if (!(!r && !C && xe)) {
            if (ot) {
              const Ot = on(q.key, oe());
              T.current = h && Ot ? null : q.key;
            }
            if (h) {
              yt &&
                (Ke(q),
                r
                  ? ((I.current = un(i, Se.current)), S())
                  : o(!0, q.nativeEvent, "list-navigation"));
              return;
            }
            ze &&
              (d != null && (I.current = d),
              Ke(q),
              !r && C ? o(!0, q.nativeEvent, "list-navigation") : Pe(q),
              r && S());
          }
        },
        onFocus() {
          r && !p && ((I.current = -1), S());
        },
        onPointerDown: ce,
        onPointerEnter: ce,
        onMouseDown: G,
        onClick: G,
      };
    }, [Ne, Me, K, Pe, Se, E, i, h, S, o, r, C, F, oe, R, d, y, p, D]);
  return l.useMemo(
    () => (a ? { reference: Ve, floating: fe, item: ie } : {}),
    [a, Ve, fe, ie],
  );
}
const Zs = new Map([
  ["select", "listbox"],
  ["combobox", "listbox"],
  ["label", !1],
]);
function Js(t, e) {
  var r, o;
  e === void 0 && (e = {});
  const { open: n, elements: s, floatingId: i } = t,
    { enabled: u = !0, role: f = "dialog" } = e,
    a = zt(),
    d = ((r = s.domReference) == null ? void 0 : r.id) || a,
    b = l.useMemo(() => {
      var C;
      return ((C = dn(s.floating)) == null ? void 0 : C.id) || i;
    }, [s.floating, i]),
    v = (o = Zs.get(f)) != null ? o : f,
    R = Tt() != null,
    p = l.useMemo(
      () =>
        v === "tooltip" || f === "label"
          ? {
              ["aria-" + (f === "label" ? "labelledby" : "describedby")]: n
                ? b
                : void 0,
            }
          : {
              "aria-expanded": n ? "true" : "false",
              "aria-haspopup": v === "alertdialog" ? "dialog" : v,
              "aria-controls": n ? b : void 0,
              ...(v === "listbox" && { role: "combobox" }),
              ...(v === "menu" && { id: d }),
              ...(v === "menu" && R && { role: "menuitem" }),
              ...(f === "select" && { "aria-autocomplete": "none" }),
              ...(f === "combobox" && { "aria-autocomplete": "list" }),
            },
      [v, b, R, n, d, f],
    ),
    E = l.useMemo(() => {
      const C = { id: b, ...(v && { role: v }) };
      return v === "tooltip" || f === "label"
        ? C
        : { ...C, ...(v === "menu" && { "aria-labelledby": d }) };
    }, [v, b, d, f]),
    P = l.useCallback(
      (C) => {
        let { active: A, selected: F } = C;
        const Q = { role: "option", ...(A && { id: b + "-fui-option" }) };
        switch (f) {
          case "select":
          case "combobox":
            return { ...Q, "aria-selected": F };
        }
        return {};
      },
      [b, f],
    );
  return l.useMemo(
    () => (u ? { reference: p, floating: E, item: P } : {}),
    [u, p, E, P],
  );
}
const Hr = (t) =>
  t.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (e, r) => (r ? "-" : "") + e.toLowerCase(),
  );
function Lt(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Qs(t, e) {
  const [r, o] = l.useState(t);
  return (
    t && !r && o(!0),
    l.useEffect(() => {
      if (!t && r) {
        const n = setTimeout(() => o(!1), e);
        return () => clearTimeout(n);
      }
    }, [t, r, e]),
    r
  );
}
function ko(t, e) {
  e === void 0 && (e = {});
  const {
      open: r,
      elements: { floating: o },
    } = t,
    { duration: n = 250 } = e,
    i = (typeof n == "number" ? n : n.close) || 0,
    [u, f] = l.useState("unmounted"),
    a = Qs(r, i);
  return (
    !a && u === "close" && f("unmounted"),
    pe(() => {
      if (o) {
        if (r) {
          f("initial");
          const d = requestAnimationFrame(() => {
            Ut.flushSync(() => {
              f("open");
            });
          });
          return () => {
            cancelAnimationFrame(d);
          };
        }
        f("close");
      }
    }, [r, o]),
    { isMounted: a, status: u }
  );
}
function eu(t, e) {
  e === void 0 && (e = {});
  const {
      initial: r = { opacity: 0 },
      open: o,
      close: n,
      common: s,
      duration: i = 250,
    } = e,
    u = t.placement,
    f = u.split("-")[0],
    a = l.useMemo(() => ({ side: f, placement: u }), [f, u]),
    d = typeof i == "number",
    b = (d ? i : i.open) || 0,
    v = (d ? i : i.close) || 0,
    [h, R] = l.useState(() => ({ ...Lt(s, a), ...Lt(r, a) })),
    { isMounted: p, status: E } = ko(t, { duration: i }),
    P = He(r),
    C = He(o),
    A = He(n),
    F = He(s);
  return (
    pe(() => {
      const Q = Lt(P.current, a),
        K = Lt(A.current, a),
        k = Lt(F.current, a),
        D =
          Lt(C.current, a) ||
          Object.keys(Q).reduce((B, H) => ((B[H] = ""), B), {});
      if (
        (E === "initial" &&
          R((B) => ({ transitionProperty: B.transitionProperty, ...k, ...Q })),
        E === "open" &&
          R({
            transitionProperty: Object.keys(D).map(Hr).join(","),
            transitionDuration: b + "ms",
            ...k,
            ...D,
          }),
        E === "close")
      ) {
        const B = K || Q;
        R({
          transitionProperty: Object.keys(B).map(Hr).join(","),
          transitionDuration: v + "ms",
          ...k,
          ...B,
        });
      }
    }, [v, A, P, C, F, b, E, a]),
    { isMounted: p, styles: h }
  );
}
function tu(t, e) {
  var r;
  const { open: o, dataRef: n } = t,
    {
      listRef: s,
      activeIndex: i,
      onMatch: u,
      onTypingChange: f,
      enabled: a = !0,
      findMatch: d = null,
      resetMs: b = 750,
      ignoreKeys: v = [],
      selectedIndex: h = null,
    } = e,
    R = l.useRef(-1),
    p = l.useRef(""),
    E = l.useRef((r = h ?? i) != null ? r : -1),
    P = l.useRef(null),
    C = Te(u),
    A = Te(f),
    F = He(d),
    Q = He(v);
  (pe(() => {
    o && (Fe(R), (P.current = null), (p.current = ""));
  }, [o]),
    pe(() => {
      if (o && p.current === "") {
        var H;
        E.current = (H = h ?? i) != null ? H : -1;
      }
    }, [o, h, i]));
  const K = Te((H) => {
      H
        ? n.current.typing || ((n.current.typing = H), A(H))
        : n.current.typing && ((n.current.typing = H), A(H));
    }),
    k = Te((H) => {
      function se(ee, _, I) {
        const T = F.current
          ? F.current(_, I)
          : _.find(
              ($) =>
                $?.toLocaleLowerCase().indexOf(I.toLocaleLowerCase()) === 0,
            );
        return T ? ee.indexOf(T) : -1;
      }
      const Z = s.current;
      if (
        (p.current.length > 0 &&
          p.current[0] !== " " &&
          (se(Z, Z, p.current) === -1 ? K(!1) : H.key === " " && Ke(H)),
        Z == null ||
          Q.current.includes(H.key) ||
          H.key.length !== 1 ||
          H.ctrlKey ||
          H.metaKey ||
          H.altKey)
      )
        return;
      (o && H.key !== " " && (Ke(H), K(!0)),
        Z.every((ee) => {
          var _, I;
          return ee
            ? ((_ = ee[0]) == null ? void 0 : _.toLocaleLowerCase()) !==
                ((I = ee[1]) == null ? void 0 : I.toLocaleLowerCase())
            : !0;
        }) &&
          p.current === H.key &&
          ((p.current = ""), (E.current = P.current)),
        (p.current += H.key),
        Fe(R),
        (R.current = window.setTimeout(() => {
          ((p.current = ""), (E.current = P.current), K(!1));
        }, b)));
      const y = E.current,
        S = se(
          Z,
          [...Z.slice((y || 0) + 1), ...Z.slice(0, (y || 0) + 1)],
          p.current,
        );
      S !== -1
        ? (C(S), (P.current = S))
        : H.key !== " " && ((p.current = ""), K(!1));
    }),
    D = l.useMemo(() => ({ onKeyDown: k }), [k]),
    B = l.useMemo(
      () => ({
        onKeyDown: k,
        onKeyUp(H) {
          H.key === " " && K(!1);
        },
      }),
      [k, K],
    );
  return l.useMemo(() => (a ? { reference: D, floating: B } : {}), [a, D, B]);
}
function Vr(t, e) {
  return {
    ...t,
    rects: { ...t.rects, floating: { ...t.rects.floating, height: e } },
  };
}
const nu = (t) => ({
  name: "inner",
  options: t,
  async fn(e) {
    const {
        listRef: r,
        overflowRef: o,
        onFallbackChange: n,
        offset: s = 0,
        index: i = 0,
        minItemsVisible: u = 4,
        referenceOverflowThreshold: f = 0,
        scrollRef: a,
        ...d
      } = di(t, e),
      {
        rects: b,
        platform: v,
        elements: { floating: h },
      } = e,
      R = r.current[i],
      p = a?.current || h,
      E = h.clientTop || p.clientTop,
      P = h.clientTop !== 0,
      C = p.clientTop !== 0,
      A = h === p;
    if (!R) return {};
    const F = {
        ...e,
        ...(await Br(
          -R.offsetTop -
            h.clientTop -
            b.reference.height / 2 -
            R.offsetHeight / 2 -
            s,
        ).fn(e)),
      },
      Q = await v.detectOverflow(Vr(F, p.scrollHeight + E + h.clientTop), d),
      K = await v.detectOverflow(F, { ...d, elementContext: "reference" }),
      k = xn(0, Q.top),
      D = F.y + k,
      se = (p.scrollHeight > p.clientHeight ? (Z) => Z : hi)(
        xn(
          0,
          p.scrollHeight + ((P && A) || C ? E * 2 : 0) - k - xn(0, Q.bottom),
        ),
      );
    if (((p.style.maxHeight = se + "px"), (p.scrollTop = k), n)) {
      const Z =
        p.offsetHeight < R.offsetHeight * mi(u, r.current.length) - 1 ||
        K.top >= -f ||
        K.bottom >= -f;
      Ut.flushSync(() => n(Z));
    }
    return (
      o &&
        (o.current = await v.detectOverflow(
          Vr({ ...F, y: D }, p.offsetHeight + E + h.clientTop),
          d,
        )),
      { y: D }
    );
  },
});
function ru(t, e) {
  const { open: r, elements: o } = t,
    { enabled: n = !0, overflowRef: s, scrollRef: i, onChange: u } = e,
    f = Te(u),
    a = l.useRef(!1),
    d = l.useRef(null),
    b = l.useRef(null);
  l.useEffect(() => {
    if (!n) return;
    function h(p) {
      if (p.ctrlKey || !R || s.current == null) return;
      const E = p.deltaY,
        P = s.current.top >= -0.5,
        C = s.current.bottom >= -0.5,
        A = R.scrollHeight - R.clientHeight,
        F = E < 0 ? -1 : 1,
        Q = E < 0 ? "max" : "min";
      R.scrollHeight <= R.clientHeight ||
        ((!P && E > 0) || (!C && E < 0)
          ? (p.preventDefault(),
            Ut.flushSync(() => {
              f((K) => K + Math[Q](E, A * F));
            }))
          : /firefox/i.test(Wn()) && (R.scrollTop += E));
    }
    const R = i?.current || o.floating;
    if (r && R)
      return (
        R.addEventListener("wheel", h),
        requestAnimationFrame(() => {
          ((d.current = R.scrollTop),
            s.current != null && (b.current = { ...s.current }));
        }),
        () => {
          ((d.current = null),
            (b.current = null),
            R.removeEventListener("wheel", h));
        }
      );
  }, [n, r, o.floating, s, i, f]);
  const v = l.useMemo(
    () => ({
      onKeyDown() {
        a.current = !0;
      },
      onWheel() {
        a.current = !1;
      },
      onPointerMove() {
        a.current = !1;
      },
      onScroll() {
        const h = i?.current || o.floating;
        if (!(!s.current || !h || !a.current)) {
          if (d.current !== null) {
            const R = h.scrollTop - d.current;
            ((s.current.bottom < -0.5 && R < -1) ||
              (s.current.top < -0.5 && R > 1)) &&
              Ut.flushSync(() => f((p) => p + R));
          }
          requestAnimationFrame(() => {
            d.current = h.scrollTop;
          });
        }
      },
    }),
    [o.floating, f, s, i],
  );
  return l.useMemo(() => (n ? { floating: v } : {}), [n, v]);
}
function No(t, e, r) {
  return (
    r === void 0 && (r = !0),
    t
      .filter((n) => {
        var s;
        return (
          n.parentId === e &&
          (!r || ((s = n.context) == null ? void 0 : s.open))
        );
      })
      .flatMap((n) => [n, ...No(t, n.id, r)])
  );
}
function zr(t, e) {
  const [r, o] = t;
  let n = !1;
  const s = e.length;
  for (let i = 0, u = s - 1; i < s; u = i++) {
    const [f, a] = e[i] || [0, 0],
      [d, b] = e[u] || [0, 0];
    a >= o != b >= o && r <= ((d - f) * (o - a)) / (b - a) + f && (n = !n);
  }
  return n;
}
function ou(t, e) {
  return (
    t[0] >= e.x &&
    t[0] <= e.x + e.width &&
    t[1] >= e.y &&
    t[1] <= e.y + e.height
  );
}
function iu(t) {
  t === void 0 && (t = {});
  const {
      buffer: e = 0.5,
      blockPointerEvents: r = !1,
      requireIntent: o = !0,
    } = t,
    n = { current: -1 };
  let s = !1,
    i = null,
    u = null,
    f = typeof performance < "u" ? performance.now() : 0;
  function a(b, v) {
    const h = performance.now(),
      R = h - f;
    if (i === null || u === null || R === 0)
      return ((i = b), (u = v), (f = h), null);
    const p = b - i,
      E = v - u,
      C = Math.sqrt(p * p + E * E) / R;
    return ((i = b), (u = v), (f = h), C);
  }
  const d = (b) => {
    let {
      x: v,
      y: h,
      placement: R,
      elements: p,
      onClose: E,
      nodeId: P,
      tree: C,
    } = b;
    return function (F) {
      function Q() {
        (Fe(n), E());
      }
      if (
        (Fe(n),
        !p.domReference || !p.floating || R == null || v == null || h == null)
      )
        return;
      const { clientX: K, clientY: k } = F,
        D = [K, k],
        B = Ts(F),
        H = F.type === "mouseleave",
        se = An(p.floating, B),
        Z = An(p.domReference, B),
        J = p.domReference.getBoundingClientRect(),
        y = p.floating.getBoundingClientRect(),
        S = R.split("-")[0],
        ee = v > y.right - y.width / 2,
        _ = h > y.bottom - y.height / 2,
        I = ou(D, J),
        T = y.width > J.width,
        $ = y.height > J.height,
        ve = (T ? J : y).left,
        ne = (T ? J : y).right,
        V = ($ ? J : y).top,
        he = ($ ? J : y).bottom;
      if (se && ((s = !0), !H)) return;
      if ((Z && (s = !1), Z && !H)) {
        s = !0;
        return;
      }
      if (
        (H && Ge(F.relatedTarget) && An(p.floating, F.relatedTarget)) ||
        (C && No(C.nodesRef.current, P).length)
      )
        return;
      if (
        (S === "top" && h >= J.bottom - 1) ||
        (S === "bottom" && h <= J.top + 1) ||
        (S === "left" && v >= J.right - 1) ||
        (S === "right" && v <= J.left + 1)
      )
        return Q();
      let ae = [];
      switch (S) {
        case "top":
          ae = [
            [ve, J.top + 1],
            [ve, y.bottom - 1],
            [ne, y.bottom - 1],
            [ne, J.top + 1],
          ];
          break;
        case "bottom":
          ae = [
            [ve, y.top + 1],
            [ve, J.bottom - 1],
            [ne, J.bottom - 1],
            [ne, y.top + 1],
          ];
          break;
        case "left":
          ae = [
            [y.right - 1, he],
            [y.right - 1, V],
            [J.left + 1, V],
            [J.left + 1, he],
          ];
          break;
        case "right":
          ae = [
            [J.right - 1, he],
            [J.right - 1, V],
            [y.left + 1, V],
            [y.left + 1, he],
          ];
          break;
      }
      function Se(Ae) {
        let [be, Ie] = Ae;
        switch (S) {
          case "top": {
            const Ne = [
                T ? be + e / 2 : ee ? be + e * 4 : be - e * 4,
                Ie + e + 1,
              ],
              U = [T ? be - e / 2 : ee ? be + e * 4 : be - e * 4, Ie + e + 1],
              W = [
                [y.left, ee || T ? y.bottom - e : y.top],
                [y.right, ee ? (T ? y.bottom - e : y.top) : y.bottom - e],
              ];
            return [Ne, U, ...W];
          }
          case "bottom": {
            const Ne = [T ? be + e / 2 : ee ? be + e * 4 : be - e * 4, Ie - e],
              U = [T ? be - e / 2 : ee ? be + e * 4 : be - e * 4, Ie - e],
              W = [
                [y.left, ee || T ? y.top + e : y.bottom],
                [y.right, ee ? (T ? y.top + e : y.bottom) : y.top + e],
              ];
            return [Ne, U, ...W];
          }
          case "left": {
            const Ne = [
                be + e + 1,
                $ ? Ie + e / 2 : _ ? Ie + e * 4 : Ie - e * 4,
              ],
              U = [be + e + 1, $ ? Ie - e / 2 : _ ? Ie + e * 4 : Ie - e * 4];
            return [
              ...[
                [_ || $ ? y.right - e : y.left, y.top],
                [_ ? ($ ? y.right - e : y.left) : y.right - e, y.bottom],
              ],
              Ne,
              U,
            ];
          }
          case "right": {
            const Ne = [be - e, $ ? Ie + e / 2 : _ ? Ie + e * 4 : Ie - e * 4],
              U = [be - e, $ ? Ie - e / 2 : _ ? Ie + e * 4 : Ie - e * 4],
              W = [
                [_ || $ ? y.left + e : y.right, y.top],
                [_ ? ($ ? y.left + e : y.right) : y.left + e, y.bottom],
              ];
            return [Ne, U, ...W];
          }
        }
      }
      if (!zr([K, k], ae)) {
        if (s && !I) return Q();
        if (!H && o) {
          const Ae = a(F.clientX, F.clientY);
          if (Ae !== null && Ae < 0.1) return Q();
        }
        zr([K, k], Se([v, h]))
          ? !s && o && (n.current = window.setTimeout(Q, 40))
          : Q();
      }
    };
  };
  return ((d.__options = { blockPointerEvents: r }), d);
}
const su = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        Composite: fs,
        CompositeItem: ds,
        FloatingArrow: vs,
        FloatingDelayGroup: Es,
        FloatingFocusManager: Fs,
        FloatingList: go,
        FloatingNode: ys,
        FloatingOverlay: Hs,
        FloatingPortal: ks,
        FloatingTree: Rs,
        NextFloatingDelayGroup: ws,
        arrow: yi,
        autoPlacement: Ri,
        autoUpdate: xi,
        computePosition: Ei,
        detectOverflow: Ii,
        flip: wi,
        getOverflowAncestors: sn,
        hide: Ci,
        inline: Ti,
        inner: nu,
        limitShift: Si,
        offset: Br,
        platform: Ai,
        safePolygon: iu,
        shift: Pi,
        size: Mi,
        useClick: zs,
        useClientPoint: Ws,
        useDelayGroup: Is,
        useDelayGroupContext: Co,
        useDismiss: $s,
        useFloating: Us,
        useFloatingNodeId: bs,
        useFloatingParentNodeId: Tt,
        useFloatingPortalNode: Po,
        useFloatingRootContext: Oo,
        useFloatingTree: St,
        useFocus: Ys,
        useHover: xs,
        useId: zt,
        useInnerOffset: ru,
        useInteractions: Gs,
        useListItem: ho,
        useListNavigation: Xs,
        useMergeRefs: mo,
        useNextDelayGroup: Cs,
        useRole: Js,
        useTransitionStatus: ko,
        useTransitionStyles: eu,
        useTypeahead: tu,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  uu = li(su);
var jr;
function cu() {
  if (jr) return z;
  jr = 1;
  var t = ai(),
    e = uu,
    r = fi();
  function o(c) {
    if (c && c.__esModule) return c;
    var g = Object.create(null);
    return (
      c &&
        Object.keys(c).forEach(function (m) {
          if (m !== "default") {
            var x = Object.getOwnPropertyDescriptor(c, m);
            Object.defineProperty(
              g,
              m,
              x.get
                ? x
                : {
                    enumerable: !0,
                    get: function () {
                      return c[m];
                    },
                  },
            );
          }
        }),
      (g.default = c),
      Object.freeze(g)
    );
  }
  var n = o(t),
    s = o(r);
  function i() {
    const c = n.useRef(null),
      [g, m] = n.useState(!1),
      x = n.useCallback((N) => {
        c.current = N;
      }, []),
      w = n.useCallback((N) => {
        m(N);
      }, []),
      M = n.useCallback(() => {
        m(!0);
      }, []),
      j = n.useCallback(() => {
        m(!1);
      }, []);
    return {
      anchorRef: c,
      onAnchorChange: x,
      hasAnchor: g,
      onHasAnchorChange: w,
      onAnchorAdd: M,
      onAnchorRemove: j,
    };
  }
  var u = "data-dice-collection-item",
    f = "data-dice-dismissable-layer",
    a = "data-dice-dismissable-layer-style",
    d = "data-value",
    b = "--dice-transform-origin",
    v = "--dice-anchor-width",
    h = "--dice-anchor-height",
    R = "--dice-available-width",
    p = "--dice-available-height",
    E = n.createContext(void 0);
  function P(c) {
    const g = n.useContext(E);
    return c ?? g ?? "ltr";
  }
  var C = typeof window < "u" ? n.useLayoutEffect : n.useEffect,
    A = { top: "bottom", right: "left", bottom: "top", left: "right" },
    F = {
      top: "translateY(100%)",
      right: "translateY(50%) rotate(90deg) translateX(-50%)",
      bottom: "rotate(180deg)",
      left: "translateY(50%) rotate(-90deg) translateX(50%)",
    };
  function Q(c) {
    return typeof c == "number" && !Number.isNaN(c) && Number.isFinite(c);
  }
  function K({
    open: c,
    onOpenChange: g,
    anchorRef: m,
    side: x = "bottom",
    sideOffset: w = 4,
    align: M = "start",
    alignOffset: j = 0,
    collisionBoundary: N,
    collisionPadding: L = 0,
    arrowPadding: O = 0,
    sticky: te = "partial",
    strategy: le = "absolute",
    avoidCollisions: ye = !1,
    disableArrow: Y = !1,
    fitViewport: ge = !1,
    forceMount: Ce = !1,
    hideWhenDetached: De = !1,
    trackAnchor: $e = !0,
  }) {
    const Re = P(),
      [Le, Ue] = n.useState(null),
      Ee = n.useMemo(
        () =>
          Re !== "rtl"
            ? M
            : M === "start"
              ? "end"
              : M === "end"
                ? "start"
                : "center",
        [M, Re],
      ),
      Oe = n.useMemo(() => `${x}-${Ee}`, [x, Ee]),
      Xe = n.useMemo(
        () => [e.offset({ mainAxis: w, alignmentAxis: j }), e.inline()],
        [w, j],
      ),
      st = n.useMemo(
        () =>
          ye
            ? [
                e.flip({
                  boundary: N,
                  padding: L,
                  fallbackStrategy:
                    te === "partial" ? "bestFit" : "initialPlacement",
                }),
                e.shift({
                  boundary: N,
                  padding: L,
                  limiter: te === "partial" ? e.limitShift() : void 0,
                }),
              ]
            : [],
        [ye, N, L, te],
      ),
      at = n.useMemo(
        () => [
          e.size({
            padding: L,
            apply({
              elements: { floating: qe },
              rects: { reference: lt },
              availableWidth: lr,
              availableHeight: ar,
            }) {
              const si = {
                [R]: `${lr}px`,
                [p]: `${ar}px`,
                [v]: `${lt.width}px`,
                [h]: `${lt.height}px`,
              };
              for (const [ui, ci] of Object.entries(si))
                qe.style.setProperty(ui, ci);
              ge &&
                Object.assign(qe.style, {
                  maxHeight: `${ar}px`,
                  maxWidth: `${lr}px`,
                });
            },
          }),
        ],
        [L, ge],
      ),
      Jt = n.useMemo(
        () => (!Y && Le ? [e.arrow({ element: Le, padding: O })] : []),
        [Y, Le, O],
      ),
      ft = n.useMemo(
        () => [...Xe, ...st, ...at, ...(De ? [e.hide()] : []), ...Jt],
        [Xe, st, at, De, Jt],
      ),
      dt = n.useMemo(
        () => ({
          ancestorScroll: $e,
          ancestorResize: !0,
          elementResize: $e && typeof ResizeObserver < "u",
          layoutShift: $e && typeof IntersectionObserver < "u",
        }),
        [$e],
      ),
      {
        x: kt,
        y: Nt,
        refs: mt,
        strategy: ut,
        context: je,
        placement: Ye,
        middlewareData: pt,
        isPositioned: rr,
        update: Dt,
        elements: Rt,
      } = e.useFloating({
        open: c,
        onOpenChange: g,
        placement: Oe,
        middleware: ft,
        whileElementsMounted: Ce ? void 0 : (...qe) => e.autoUpdate(...qe, dt),
        strategy: le,
      });
    (C(() => {
      if (!c) return;
      const qe = m && "getBoundingClientRect" in m,
        lt = qe ? m : m?.current;
      lt && (qe ? mt.setPositionReference(lt) : mt.setReference(lt), Dt());
    }, [c, m, mt, Dt]),
      n.useEffect(() => {
        if (Ce && c && Rt.reference && Rt.floating)
          return e.autoUpdate(Rt.reference, Rt.floating, Dt, dt);
      }, [Ce, c, Rt, Dt, dt]));
    const [ct = "bottom", xt = "start"] = Ye.split("-"),
      Qt = n.useMemo(() => {
        const qe = A[ct];
        return `${xt === "end" ? "start" : xt === "start" ? "end" : "center"} ${qe}`;
      }, [ct, xt]),
      or = n.useCallback(
        (qe = {}) => ({ ...qe, "data-side": ct, "data-align": xt }),
        [ct, xt],
      ),
      ir = n.useMemo(() => {
        const qe = Q(Nt) ? Nt : 0,
          lt = Q(kt) ? kt : 0;
        return { position: ut, top: qe, left: lt, [b]: Qt };
      }, [ut, kt, Nt, Qt]),
      sr = !!pt.hide?.referenceHidden,
      ur = Y ? !1 : pt.arrow?.centerOffset !== 0,
      cr = n.useMemo(
        () =>
          Y
            ? {}
            : {
                position: "absolute",
                top: pt.arrow?.y,
                left: pt.arrow?.x,
                [ct]: 0,
                transformOrigin: Qt,
                transform: F[ct],
              },
        [pt.arrow, ct, Qt, Y],
      );
    return n.useMemo(
      () => ({
        refs: mt,
        floatingStyles: ir,
        placement: Ye,
        isPositioned: rr,
        middlewareData: pt,
        elements: Rt,
        update: Dt,
        context: je,
        getFloatingProps: or,
        arrowStyles: cr,
        onArrowChange: Y ? () => {} : Ue,
        side: ct,
        align: xt,
        arrowDisplaced: ur,
        anchorHidden: sr,
      }),
      [mt, ir, Ye, rr, pt, Rt, Dt, je, or, cr, ct, xt, ur, sr, Y],
    );
  }
  function k(c) {
    const g = n.useRef(c);
    return (
      n.useEffect(() => {
        g.current = c;
      }),
      n.useMemo(
        () =>
          (...m) =>
            g.current?.(...m),
        [],
      )
    );
  }
  function D(c, g) {
    const m = c.compareDocumentPosition(g);
    return m & Node.DOCUMENT_POSITION_FOLLOWING ||
      m & Node.DOCUMENT_POSITION_CONTAINED_BY
      ? -1
      : m & Node.DOCUMENT_POSITION_PRECEDING ||
          m & Node.DOCUMENT_POSITION_CONTAINS
        ? 1
        : 0;
  }
  function B({ grouped: c = !1 } = {}) {
    const g = n.useRef(null),
      m = n.useRef(new Map()).current,
      x = c ? n.useRef(new Map()).current : null,
      w = n.useCallback(() => {
        if (!g.current) return [];
        const N = Array.from(m.values());
        return N.length === 0
          ? []
          : N.sort((L, O) =>
              !L?.ref.current || !O?.ref.current
                ? 0
                : D(L.ref.current, O.ref.current),
            );
      }, [m]),
      M = n.useCallback(
        (j, N) => (
          m.set(j.ref, j),
          c &&
            N &&
            x &&
            (x.has(N) || x.set(N, new Set()), x.get(N)?.add(j.ref)),
          () => {
            if ((m.delete(j.ref), c && N && x)) {
              const L = x.get(N);
              (L?.delete(j.ref), L?.size === 0 && x.delete(N));
            }
          }
        ),
        [m, x, c],
      );
    return {
      collectionRef: g,
      itemMap: m,
      groupMap: x,
      getItems: w,
      onItemRegister: M,
    };
  }
  function H({ prop: c, defaultProp: g, onChange: m = () => {} }) {
    const [x, w] = se({ defaultProp: g, onChange: m }),
      M = c !== void 0,
      j = M ? c : x,
      N = k(m),
      L = n.useCallback(
        (O) => {
          if (M) {
            const le = typeof O == "function" ? O(c) : O;
            le !== c && N(le);
          } else w(O);
        },
        [M, c, w, N],
      );
    return [j, L];
  }
  function se({ defaultProp: c, onChange: g }) {
    const m = n.useState(c),
      [x] = m,
      w = n.useRef(x),
      M = k(g);
    return (
      n.useEffect(() => {
        w.current !== x && (M(x), (w.current = x));
      }, [x, M]),
      m
    );
  }
  function Z(c) {
    return c?.ownerDocument ?? globalThis.document;
  }
  function J(c) {
    return Z(c)?.defaultView ?? globalThis.window;
  }
  function y({ document: c, onEscapeKeyDown: g, enabled: m }) {
    const x = k(g);
    n.useEffect(() => {
      if (!m) return;
      function w(M) {
        M.key === "Escape" && x?.(M);
      }
      return (
        c.addEventListener("keydown", w, { capture: !0 }),
        () => c.removeEventListener("keydown", w, { capture: !0 })
      );
    }, [m, x, c]);
  }
  function S(c) {
    const {
        enabled: g,
        onDismiss: m,
        refs: x,
        onEscapeKeyDown: w,
        onPointerDownOutside: M,
        onFocusOutside: j,
        onInteractOutside: N,
        disableOutsidePointerEvents: L = !1,
        preventScrollDismiss: O = !1,
        delayMs: te = 0,
        layerAttr: le = f,
        layerStyleAttr: ye = a,
      } = c,
      Y = Z(x[0]?.current),
      ge = n.useRef(!1),
      Ce = n.useRef(() => {});
    y({
      document: Y,
      onEscapeKeyDown: (Re) => {
        w && !Re.defaultPrevented && (w(Re), Re.defaultPrevented || m(Re));
      },
      enabled: g && !!m && !!w,
    });
    const De = k((Re) => {
        (M?.(Re), N?.(Re), Re.defaultPrevented || m(Re));
      }),
      $e = k((Re) => {
        (j?.(Re), N?.(Re), Re.defaultPrevented || m(Re));
      });
    return (
      n.useEffect(() => {
        if (!g) return;
        function Re(Ee) {
          const Oe = Ee.target;
          if (!Oe || ge.current || x.some((at) => at.current?.contains(Oe)))
            return;
          const st = {
            currentTarget: Ee.currentTarget,
            target: Oe,
            preventDefault: () => Ee.preventDefault(),
            defaultPrevented: Ee.defaultPrevented,
            detail: Ee.detail,
          };
          if (Ee.pointerType === "touch" && O) {
            if (!Y) return;
            (Y.removeEventListener("click", Ce.current),
              (Ce.current = () => De(st)),
              Y.addEventListener("click", Ce.current, { once: !0 }));
          } else De(st);
        }
        function Le(Ee) {
          const Oe = Ee.target;
          if (!Oe || x.some((at) => at.current?.contains(Oe))) return;
          const st = {
            currentTarget: Ee.currentTarget,
            target: Oe,
            preventDefault: () => Ee.preventDefault(),
            defaultPrevented: Ee.defaultPrevented,
          };
          $e(st);
        }
        if (L) {
          const Ee = x.map((Xe) => Xe.current).filter(Boolean);
          for (const Xe of Ee) Xe && Xe.setAttribute(le, "");
          const Oe = Y.createElement("style");
          (Oe.setAttribute(ye, ""),
            (Oe.textContent = `[${le}] ~ *:not([${le}]) { pointer-events: none !important; }`),
            Y.head.appendChild(Oe));
        }
        const Ue = window.setTimeout(() => {
          (Y.addEventListener("pointerdown", Re),
            Y.addEventListener("focusin", Le));
        }, te);
        return () => {
          if (
            (window.clearTimeout(Ue),
            Y.removeEventListener("pointerdown", Re),
            Y.removeEventListener("focusin", Le),
            Y.removeEventListener("click", Ce.current),
            L)
          ) {
            for (const Ee of x) Ee.current && Ee.current.removeAttribute(le);
            Y.querySelector(`[${ye}]`)?.remove();
          }
        };
      }, [g, x, De, $e, L, O, te, le, ye, Y]),
      {
        onPointerDownCapture: () => {
          ge.current = !0;
        },
        onPointerUpCapture: () => {
          window.setTimeout(() => {
            ge.current = !1;
          }, 0);
        },
      }
    );
  }
  function ee(c) {
    const g = n.useRef(c);
    return (
      n.useLayoutEffect(() => {
        g.current = c;
      }),
      n.useCallback((m, ...x) => {
        const w = g.current;
        return w(m, ...x);
      }, [])
    );
  }
  function _(c) {
    const g = n.useRef(c);
    return (
      n.useLayoutEffect(() => {
        g.current = c;
      }),
      n.useCallback((...m) => {
        const x = g.current;
        return x(...m);
      }, [])
    );
  }
  var I = class {
      cache;
      maxSize;
      keyOrder;
      constructor(c) {
        ((this.cache = new Map()), (this.maxSize = c), (this.keyOrder = []));
      }
      get(c) {
        const g = this.cache.get(c);
        if (g !== void 0) {
          const m = this.keyOrder.indexOf(c);
          m > -1 && (this.keyOrder.splice(m, 1), this.keyOrder.push(c));
        }
        return g;
      }
      set(c, g) {
        if (this.cache.has(c)) {
          this.cache.set(c, g);
          const m = this.keyOrder.indexOf(c);
          m > -1 && this.keyOrder.splice(m, 1);
        } else {
          if (this.keyOrder.length >= this.maxSize) {
            const m = this.keyOrder.shift();
            m !== void 0 && this.cache.delete(m);
          }
          this.cache.set(c, g);
        }
        this.keyOrder.push(c);
      }
      clear() {
        (this.cache.clear(), (this.keyOrder.length = 0));
      }
      get size() {
        return this.cache.size;
      }
    },
    T = new I(10),
    $ = new I(1e3),
    ve = /[-_\s./\\|:;,]+/g,
    ne = /[^\p{L}\p{N}\s]/gu;
  function V(c) {
    if (!c || typeof c != "string") return "";
    const g = $.get(c);
    if (g !== void 0) return g;
    let m;
    try {
      m = c
        .toLowerCase()
        .normalize("NFC")
        .replace(ne, " ")
        .replace(ve, " ")
        .trim()
        .replace(/\s+/g, "");
    } catch {
      m = c
        .toLowerCase()
        .normalize("NFC")
        .replace(/[^a-z0-9\s]/g, " ")
        .trim()
        .replace(/\s+/g, "");
    }
    return (m === "" && c.length > 0 && (m = "\0"), $.set(c, m), m);
  }
  function he(c) {
    const g = c
      ? Object.entries(c)
          .sort((N, L) => (N[0] < L[0] ? -1 : 1))
          .join()
      : "";
    let m = T.get(g);
    m ||
      ((m = new Intl.Collator("en", { ...c, sensitivity: "base" })),
      T.set(g, m));
    const x = n.useCallback(
        (N, L) => {
          if (L.length === 0) return !0;
          if (c?.gapMatch) {
            const le = V(N),
              ye = V(L);
            return le.startsWith(ye);
          }
          const O = N.normalize("NFC"),
            te = L.normalize("NFC");
          return m.compare(O.slice(0, te.length), te) === 0;
        },
        [m, c?.gapMatch],
      ),
      w = n.useCallback(
        (N, L) => {
          if (L.length === 0) return !0;
          if (c?.gapMatch) {
            const le = V(N),
              ye = V(L);
            return le.endsWith(ye);
          }
          const O = N.normalize("NFC"),
            te = L.normalize("NFC");
          return m.compare(O.slice(-te.length), te) === 0;
        },
        [m, c?.gapMatch],
      ),
      M = n.useCallback(
        (N, L) => {
          if (L.length === 0) return !0;
          if (c?.gapMatch) {
            const Y = V(N),
              ge = V(L);
            return Y.includes(ge);
          }
          const O = N.normalize("NFC"),
            te = L.normalize("NFC");
          let le = 0;
          const ye = te.length;
          for (; le + ye <= O.length; le++) {
            const Y = O.slice(le, le + ye);
            if (m.compare(te, Y) === 0) return !0;
          }
          return !1;
        },
        [m, c?.gapMatch],
      ),
      j = n.useCallback(
        (N, L) => {
          if (L.length === 0) return !0;
          if (N.length === 0) return !1;
          if (c?.gapMatch) {
            const Y = V(N),
              ge = V(L);
            let Ce = 0,
              De = 0;
            for (; De < Y.length && Ce < ge.length; )
              (Y[De] === ge[Ce] && Ce++, De++);
            return Ce === ge.length;
          }
          const O = N.normalize("NFC"),
            te = L.normalize("NFC");
          let le = 0,
            ye = 0;
          for (; ye < O.length && le < te.length; )
            (m.compare(O[ye] ?? "", te[le] ?? "") === 0 && le++, ye++);
          return le === te.length;
        },
        [m, c?.gapMatch],
      );
    return n.useMemo(
      () => ({ startsWith: x, endsWith: w, contains: M, fuzzy: j }),
      [x, w, M, j],
    );
  }
  function ae({
    itemMap: c,
    groupMap: g,
    onFilter: m,
    exactMatch: x,
    manualFiltering: w,
    onCallback: M,
  }) {
    const j = n.useRef({
        search: "",
        itemCount: 0,
        items: new Map(),
        groups: g ? new Map() : void 0,
      }).current,
      N = he({ sensitivity: "base", gapMatch: !0 }),
      L = n.useMemo(() => (x ? N.contains : N.fuzzy), [N.fuzzy, N.contains, x]),
      O = n.useCallback(
        (Y, ge) =>
          ge
            ? Y
              ? ge === ""
                ? 1
                : Y === ge
                  ? 2
                  : Y.startsWith(ge)
                    ? 1.5
                    : m
                      ? +(m([Y], ge).length > 0)
                      : Number(L(Y, ge))
              : 0
            : 1,
        [L, m],
      ),
      te = n.useCallback(() => {
        if (!j.search || w) {
          j.itemCount = c.size;
          return;
        }
        (j.items.clear(), g && j.groups && j.groups.clear());
        const Y = j.search;
        let ge = 0,
          Ce = [];
        const De = 250;
        function $e() {
          if (!Ce.length) return;
          const Re = new Map();
          for (const [Ue, Ee] of Ce) {
            const Oe = O(Ee.value, Y);
            Oe > 0 && (Re.set(Ee.value, Oe), ge++);
          }
          const Le = Array.from(Re.entries()).sort(([, Ue], [, Ee]) => Ee - Ue);
          for (const [Ue, Ee] of Le) j.items.set(Ue, Ee);
          Ce = [];
        }
        for (const [Re, Le] of c) (Ce.push([Re, Le]), Ce.length >= De && $e());
        if (
          (Ce.length > 0 && $e(),
          (j.itemCount = ge),
          g && j.groups && g.size && ge > 0)
        ) {
          const Re = new Set(j.items.keys());
          for (const [Le, Ue] of g)
            Array.from(Ue).some((Oe) => Re.has(Oe.current?.id ?? "")) &&
              j.groups.set(Le, new Set());
        }
        M?.(ge);
      }, [w, j, c, g, O, M]),
      le = n.useCallback(
        (Y) => (w || !j.search ? !0 : (j.items.get(Y) ?? 0) > 0),
        [j, w],
      ),
      ye = n.useCallback(
        (Y = !1) => Y || (j.itemCount === 0 && j.search.trim() !== ""),
        [j],
      );
    return {
      filterStore: j,
      onItemsFilter: te,
      getIsItemVisible: le,
      getIsListEmpty: ye,
    };
  }
  function Se(c) {
    const [g, m] = n.useState(null);
    return {
      isFormControl: g ? c || !!g.closest("form") : !0,
      trigger: g,
      onTriggerChange: m,
    };
  }
  function Ae({ form: c, defaultValue: g, onReset: m }) {
    const x = k(m);
    n.useEffect(() => {
      if (!c) return;
      function w() {
        g !== void 0 && x?.(g);
      }
      return (
        c.addEventListener("reset", w),
        () => c.removeEventListener("reset", w)
      );
    }, [c, g, x]);
  }
  var be = globalThis?.document ? n.useLayoutEffect : () => {},
    Ie = n[" useId ".trim().toString()] || (() => {}),
    Ne = 0;
  function U(c) {
    const [g, m] = n.useState(typeof Ie == "function" ? Ie() : void 0);
    return (
      be(() => {
        c || m((x) => x ?? String(Ne++));
      }, [c]),
      c || (g ? `dice-${g}` : "")
    );
  }
  function W({ ref: c, attr: g = u }) {
    const m = n.useCallback(() => {
        const w = c.current;
        if (!w) return [];
        const M = Array.from(w.querySelectorAll(`[${g}]`));
        return M.length === 0 ? [] : M.sort(D);
      }, [c, g]),
      x = n.useCallback(
        () => m().filter((M) => M.getAttribute("aria-disabled") !== "true"),
        [m],
      );
    return { getItems: m, getEnabledItems: x };
  }
  function re({ defaultValue: c }) {
    const [g, m] = n.useState(c ?? ""),
      x = n.useCallback((w) => {
        m((w?.textContent ?? "").trim());
      }, []);
    return { label: c ?? g, onLabelChange: x };
  }
  function ue({
    highlightedItem: c,
    onHighlightedItemChange: g,
    getItems: m,
    getIsItemSelected: x,
    loop: w = !1,
  }) {
    return {
      onHighlightMove: n.useCallback(
        (j) => {
          const N = m();
          if (N.length === 0) return;
          const L = N.findIndex((ye) => ye.ref.current === c?.ref.current);
          let O;
          const te = N.length - 1;
          switch (j) {
            case "next": {
              ((O = L + 1), (O = O > te ? (w ? 0 : te) : O));
              break;
            }
            case "prev": {
              ((O = L - 1), (O = O < 0 ? (w ? te : 0) : O));
              break;
            }
            case "first":
              O = 0;
              break;
            case "last":
              O = te;
              break;
            case "selected": {
              ((O = N.findIndex(x)), (O = O === -1 ? 0 : O));
              break;
            }
          }
          const le = N[O];
          le?.ref.current &&
            (le.ref.current.scrollIntoView({ block: "nearest" }), g(le));
        },
        [m, x, c, g, w],
      ),
    };
  }
  function me() {
    const [c, g] = n.useState(!1);
    return (
      be(() => {
        g(!0);
      }, []),
      c
    );
  }
  function ie(c) {
    const g = n.useRef({ value: c, previous: c });
    return n.useMemo(
      () => (
        g.current.value !== c &&
          ((g.current.previous = g.current.value), (g.current.value = c)),
        g.current.previous
      ),
      [c],
    );
  }
  function oe(c) {
    return typeof c == "number";
  }
  function Pe(c) {
    return oe(c) && !Number.isNaN(c) && c > 0;
  }
  function Me(c, g) {
    return oe(c) && !Number.isNaN(c) && c <= g && c >= 0;
  }
  function fe(c, g) {
    return c == null ? "indeterminate" : c === g ? "complete" : "loading";
  }
  function Ve({ value: c = null, max: g }) {
    const m = n.useMemo(() => (Pe(g) ? g : 100), [g]),
      x = n.useMemo(() => (Me(c, m) ? c : null), [c, m]),
      w = n.useMemo(() => fe(x, m), [x, m]),
      M = n.useMemo(
        () => ({
          role: "progressbar",
          "aria-valuemin": 0,
          "aria-valuemax": m,
          ...(oe(x) && { "aria-valuenow": x }),
          "data-state": w,
          "data-value": x ?? void 0,
          "data-max": m,
        }),
        [m, x, w],
      );
    return { value: x, max: m, state: w, progressProps: M };
  }
  function G() {
    return typeof window < "u" && /Firefox/.test(navigator.userAgent);
  }
  function ce() {
    const c = navigator.userAgent;
    return (
      typeof window < "u" &&
      ((/Firefox/.test(c) && /Mobile/.test(c)) || /FxiOS/.test(c))
    );
  }
  function q() {
    return ze(/^Mac/);
  }
  function xe() {
    return ze(/^iPhone/);
  }
  function we() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  function ke() {
    return ze(/^iPad/) || (q() && navigator.maxTouchPoints > 1);
  }
  function Qe() {
    return xe() || ke();
  }
  function Pt(c = globalThis.window) {
    return (c.visualViewport?.scale ?? 1) !== 1;
  }
  function yt() {
    return typeof window < "u" && window.navigator != null
      ? window.navigator.platform
      : void 0;
  }
  function ze(c) {
    return typeof window < "u" && window.navigator != null
      ? c.test(window.navigator.platform)
      : void 0;
  }
  var ot = new Set([
    "checkbox",
    "radio",
    "range",
    "color",
    "file",
    "image",
    "button",
    "submit",
    "reset",
  ]);
  function Mt(c) {
    return (
      (c instanceof HTMLInputElement && !ot.has(c.type)) ||
      c instanceof HTMLTextAreaElement ||
      (c instanceof HTMLElement && c.isContentEditable)
    );
  }
  function jt(c) {
    if (!c) return !1;
    const g = window.getComputedStyle(c);
    return (
      /(auto|scroll)/.test(g.overflow + g.overflowX + g.overflowY) &&
      (c.scrollHeight !== c.clientHeight || c.scrollWidth !== c.clientWidth)
    );
  }
  function Wt(c) {
    const g = document.scrollingElement || document.documentElement;
    let m = c;
    for (; m && m !== g; ) {
      for (; m && !jt(m); ) m = m.parentElement;
      if (!m || m === g) break;
      const { top: x } = m.getBoundingClientRect(),
        { top: w } = c.getBoundingClientRect();
      (w > x + c.clientHeight && (m.scrollTop += w - x), (m = m.parentElement));
    }
  }
  function Ot() {
    return (
      typeof CSS < "u" &&
      typeof CSS.supports == "function" &&
      CSS.supports("height", "1dvh")
    );
  }
  function et(c) {
    if (typeof document > "u") return !1;
    const g = c?.ownerDocument ?? document;
    return (
      (g.defaultView ?? window).innerWidth - g.documentElement.clientWidth > 0
    );
  }
  var it = 0,
    tt = {};
  function qt({
    referenceElement: c,
    enabled: g = !1,
    allowPinchZoom: m = !1,
  } = {}) {
    const x = n.useRef({ top: 0, left: 0 }),
      w = n.useRef(-1),
      M = n.useRef(null),
      j = n.useRef(null);
    C(() => {
      if (!g) return;
      const N = c?.ownerDocument ?? globalThis.document,
        L = N.defaultView ?? globalThis.window,
        O = N.documentElement,
        te = N.body,
        le = m ?? L.visualViewport?.scale !== 1;
      if ((we() && !le) || (it++, it !== 1)) return;
      x.current = { top: L.scrollY, left: L.scrollX };
      const ye = L.getComputedStyle(O),
        Y = L.getComputedStyle(te);
      tt = {
        htmlOverflowY: O.style.overflowY,
        htmlOverflowX: O.style.overflowX,
        bodyPosition: te.style.position,
        bodyWidth: te.style.width,
        bodyHeight: te.style.height,
        bodyOverflow: te.style.overflow,
        bodyBoxSizing: te.style.boxSizing,
      };
      const ge = Math.max(0, L.innerWidth - N.documentElement.clientWidth),
        Ce = Math.max(0, L.innerHeight - N.documentElement.clientHeight),
        De = Ot(),
        $e = et(c);
      function Re() {
        const Oe = ye.scrollbarGutter?.includes("stable"),
          Xe = O.scrollHeight > O.clientHeight,
          st = O.scrollWidth > O.clientWidth,
          at = ye.overflowY === "scroll" || Y.overflowY === "scroll",
          Jt = ye.overflowX === "scroll" || Y.overflowX === "scroll",
          ft =
            Number.parseFloat(Y.marginTop) + Number.parseFloat(Y.marginBottom),
          dt =
            Number.parseFloat(Y.marginLeft) + Number.parseFloat(Y.marginRight);
        if (Qe()) {
          let kt = function (ut) {
              let Ye = ut.target;
              for (; Ye && Ye !== O; ) {
                if (jt(Ye) && Ye instanceof HTMLElement) {
                  ((M.current = Ye),
                    L.getComputedStyle(Ye).overscrollBehavior === "auto" &&
                      (Ye.style.overscrollBehavior = "contain"));
                  break;
                }
                Ye = Ye.parentElement;
              }
              (!Ye || Ye === O) && (M.current = null);
            },
            Nt = function (ut) {
              const je = M.current;
              if (!je || je === O || je === te) {
                ut.preventDefault();
                return;
              }
              je.scrollHeight === je.clientHeight &&
                je.scrollWidth === je.clientWidth &&
                ut.preventDefault();
            },
            mt = function (ut) {
              const je = ut.target;
              Mt(je) &&
                ((je.style.transform = "translateY(-2000px)"),
                requestAnimationFrame(() => {
                  if (((je.style.transform = ""), !!L.visualViewport)) {
                    if (L.visualViewport.height < L.innerHeight) {
                      requestAnimationFrame(() => Wt(je));
                      return;
                    }
                    L.visualViewport.addEventListener("resize", () => Wt(je), {
                      once: !0,
                    });
                  }
                }));
            };
          (Object.assign(te.style, {
            position: "fixed",
            width: dt || ge ? `calc(100vw - ${dt + ge}px)` : "100vw",
            height: ft || Ce ? `calc(100vh - ${ft + Ce}px)` : "100vh",
            top: `-${x.current.top}px`,
            left: `-${x.current.left}px`,
            overflow: "hidden",
            boxSizing: "border-box",
          }),
            N.addEventListener("touchstart", kt, { passive: !1, capture: !0 }),
            N.addEventListener("touchmove", Nt, { passive: !1, capture: !0 }),
            N.addEventListener("focus", mt, !0),
            (j.current = () => {
              (N.removeEventListener("touchstart", kt, { capture: !0 }),
                N.removeEventListener("touchmove", Nt, { capture: !0 }),
                N.removeEventListener("focus", mt, !0));
            }));
        } else
          (Object.assign(O.style, {
            overflowY: !Oe && (Xe || at) ? "scroll" : "hidden",
            overflowX: !Oe && (st || Jt) ? "scroll" : "hidden",
            paddingRight: ge > 0 ? `${ge}px` : "",
          }),
            Object.assign(te.style, {
              position: "relative",
              width: dt || ge ? `calc(100vw - ${dt + ge}px)` : "100vw",
              height: De
                ? ft
                  ? `calc(100dvh - ${ft}px)`
                  : "100dvh"
                : ft
                  ? `calc(100vh - ${ft}px)`
                  : "100vh",
              boxSizing: "border-box",
              overflow: "hidden",
            }),
            G() && !$e && (te.style.marginRight = `${ge}px`),
            (te.scrollTop = x.current.top),
            (te.scrollLeft = x.current.left),
            O.setAttribute("data-scroll-locked", ""));
      }
      function Le() {
        (Object.assign(O.style, {
          overflowY: tt.htmlOverflowY,
          overflowX: tt.htmlOverflowX,
          paddingRight: "",
        }),
          Object.assign(te.style, {
            overflow: tt.bodyOverflow,
            position: tt.bodyPosition,
            width: tt.bodyWidth,
            height: tt.bodyHeight,
            boxSizing: tt.bodyBoxSizing,
            marginRight: "",
            top: "",
            left: "",
          }),
          O.removeAttribute("data-scroll-locked"),
          L.scrollTo(x.current.left, x.current.top));
      }
      function Ue() {
        (cancelAnimationFrame(w.current),
          (w.current = requestAnimationFrame(() => {
            (Le(), Re());
          })));
      }
      function Ee(Oe) {
        Oe.touches.length > 1 || Oe.preventDefault();
      }
      return (
        Re(),
        L.addEventListener("resize", Ue),
        Qe() && N.addEventListener("touchmove", Ee, { passive: !1 }),
        () => {
          (it--,
            it === 0 &&
              (cancelAnimationFrame(w.current),
              Le(),
              L.removeEventListener("resize", Ue),
              Qe() && (N.removeEventListener("touchmove", Ee), j.current?.())));
        }
      );
    }, [g, c, m]);
  }
  function Kt(c) {
    const [g, m] = n.useState(void 0);
    return (
      be(() => {
        if (c) {
          m({ width: c.offsetWidth, height: c.offsetHeight });
          const x = new ResizeObserver((w) => {
            if (!Array.isArray(w) || !w.length) return;
            const M = w[0];
            let j, N;
            if (M && "borderBoxSize" in M) {
              const L = M.borderBoxSize,
                O = Array.isArray(L) ? L[0] : L;
              ((j = O.inlineSize), (N = O.blockSize));
            } else ((j = c.offsetWidth), (N = c.offsetHeight));
            m({ width: j, height: N });
          });
          return (x.observe(c, { box: "border-box" }), () => x.unobserve(c));
        }
        m(void 0);
      }, [c]),
      g
    );
  }
  function Gn(c) {
    const [g, m] = n.useState(c.initial),
      x = n.useCallback(
        (w) => {
          m((M) => c.states[M]?.[w] ?? M);
        },
        [c.states],
      );
    return [g, x];
  }
  function qn(c, g) {
    return c.map((m, x) => c[(g + x) % c.length]);
  }
  function Wo(c, g, m) {
    if (!g) return;
    const w =
        g.length > 1 && Array.from(g).every((O) => O === g[0])
          ? (g[0] ?? "")
          : g,
      M = m ? c.indexOf(m) : -1;
    let j = qn(c, Math.max(M, 0));
    w.length === 1 && (j = j.filter((O) => O !== m));
    const L = j.find((O) =>
      O?.textValue ? O.textValue.toLowerCase().startsWith(w.toLowerCase()) : !1,
    );
    return L !== m ? L : void 0;
  }
  function Ko({ onSearchChange: c, enabled: g = !0, immediate: m = !1 }) {
    const x = k(c),
      w = n.useRef(""),
      M = n.useRef(0),
      j = n.useCallback(
        (L) => {
          if (!g) return;
          const O = w.current + L;
          (m && x(O),
            (function te(le) {
              ((w.current = le),
                window.clearTimeout(M.current),
                le !== "" &&
                  (M.current = window.setTimeout(() => {
                    (m || x(""), te(""));
                  }, 1e3)));
            })(O));
        },
        [x, g, m],
      ),
      N = n.useCallback(() => {
        ((w.current = ""), window.clearTimeout(M.current));
      }, []);
    return (
      n.useEffect(() => () => window.clearTimeout(M.current), []),
      {
        searchRef: w,
        onTypeaheadSearch: j,
        onResetTypeahead: N,
        getCurrentSearch: () => w.current,
      }
    );
  }
  function Bo(c, g, { checkForDefaultPrevented: m = !0 } = {}) {
    return function (w) {
      if ((c?.(w), m === !1 || !w.defaultPrevented)) return g?.(w);
    };
  }
  function Xn(c, g) {
    if (typeof c == "function") return c(g);
    c != null && (c.current = g);
  }
  function Xt(...c) {
    return (g) => {
      let m = !1;
      const x = c.map((w) => {
        const M = Xn(w, g);
        return (!m && typeof M == "function" && (m = !0), M);
      });
      if (m)
        return () => {
          for (let w = 0; w < x.length; w++) {
            const M = x[w];
            typeof M == "function" ? M() : Xn(c[w], null);
          }
        };
    };
  }
  function Zn(...c) {
    return n.useCallback(Xt(...c), c);
  }
  function $o(c) {
    return Object.assign(n.forwardRef(c), {
      displayName: c.displayName ?? c.name,
    });
  }
  var Jn = {
      border: 0,
      clip: "rect(0 0 0 0)",
      clipPath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    },
    Uo = {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(2px)",
      zIndex: 50,
    },
    Yo = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
    Go = {
      outline: "none",
      boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.6)",
      borderRadius: "0.25rem",
    },
    qo = { overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none" },
    Xo = { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 },
    Zo = { display: "flex", alignItems: "center", justifyContent: "center" },
    Jo = { userSelect: "none", WebkitUserSelect: "none", msUserSelect: "none" };
  function Qo(c) {
    const {
        control: g,
        value: m,
        checked: x,
        bubbles: w = !0,
        type: M = "hidden",
        onReset: j,
        style: N,
        ...L
      } = c,
      O = M === "checkbox" || M === "radio" || M === "switch",
      te = n.useRef(null),
      le = ie(M === "hidden" ? m : x),
      ye = Kt(g);
    return (
      n.useEffect(() => {
        const Y = te.current;
        if (!Y) return;
        const ge = window.HTMLInputElement.prototype,
          Ce = O ? "checked" : "value",
          De = O ? "click" : "input",
          $e = O ? x : JSON.stringify(m),
          Le = Object.getOwnPropertyDescriptor(ge, Ce).set;
        if (le !== $e && Le) {
          const Ue = new Event(De, { bubbles: w });
          (Le.call(Y, $e), Y.dispatchEvent(Ue));
        }
      }, [le, m, x, w, O]),
      Ae({
        form: te.current?.form ?? null,
        defaultValue: O ? x : m,
        onReset: (Y) => {
          j?.(Y);
        },
      }),
      n.createElement("input", {
        type: M,
        ...L,
        ref: te,
        "aria-hidden": O,
        tabIndex: -1,
        defaultChecked: O ? x : void 0,
        style: { ...c.style, ...ye, ...Jn },
      })
    );
  }
  function ei(c, g) {
    const m = n.createContext(g);
    m.displayName = c;
    function x(M) {
      const { children: j, ...N } = M,
        L = n.useMemo(() => N, Object.values(N));
      return n.createElement(m.Provider, { value: L }, j);
    }
    x.displayName = `${c}Provider`;
    function w(M, j) {
      const N = n.useContext(m);
      if (!N && !j) throw new Error(`\`${M}\` must be used within \`${c}\``);
      if (N) return N;
      if (g !== void 0) return g;
    }
    return [x, w];
  }
  function Qn(c) {
    if (!n.isValidElement(c)) return;
    let g = Object.getOwnPropertyDescriptor(c.props, "ref")?.get,
      m = g && "isReactWarning" in g && g.isReactWarning;
    return m
      ? c.ref
      : ((g = Object.getOwnPropertyDescriptor(c, "ref")?.get),
        (m = g && "isReactWarning" in g && g.isReactWarning),
        m ? c.props.ref : c.props.ref || c.ref);
  }
  var ti = function (g) {
    return n.isValidElement(g) && g.type === yn;
  };
  function ni(c, g) {
    const m = { ...g };
    for (const x in g) {
      const w = c[x],
        M = g[x];
      /^on[A-Z]/.test(x)
        ? typeof w == "function" && typeof M == "function"
          ? (m[x] = (...j) => {
              (M(...j), w(...j));
            })
          : typeof w == "function" && (m[x] = w)
        : x === "style" && w && M
          ? (m[x] = { ...w, ...M })
          : x === "className" && (m[x] = [w, M].filter(Boolean).join(" "));
    }
    return { ...c, ...m };
  }
  var vn = n.forwardRef((c, g) => {
    const { children: m, ...x } = c;
    if (!n.isValidElement(m))
      return n.Children.count(m) > 1 ? n.Children.only(null) : null;
    const w = Qn(m),
      M = ni(x, m.props);
    return typeof m.type == "string"
      ? n.cloneElement(m, { ...M, ref: g ? Xt(g, w) : w })
      : n.cloneElement(m, { ...M, ref: g ? Xt(g, w) : w });
  });
  vn.displayName = "SlotClone";
  var bn = n.forwardRef((c, g) => {
    const { children: m, ...x } = c,
      w = n.Children.toArray(m),
      M = w.find(ti);
    if (!M) return n.createElement(vn, { ...x, ref: g }, m);
    if (!n.isValidElement(M)) return null;
    const j = M.props.children,
      N = w.map((L) =>
        L === M
          ? n.Children.count(j) > 1
            ? n.Children.only(null)
            : n.isValidElement(j)
              ? j.props.children
              : null
          : L,
      );
    return n.createElement(
      vn,
      { ...x, ref: g },
      n.isValidElement(j) ? n.cloneElement(j, void 0, N) : null,
    );
  });
  bn.displayName = "Slot";
  var yn = n.memo(function ({ children: g }) {
    return n.createElement(n.Fragment, null, g);
  });
  yn.displayName = "Slottable";
  function ri(c) {
    const g = n.forwardRef((m, x) => {
      const { asChild: w, ...M } = m;
      return w
        ? n.createElement(bn, { ...M, ref: x })
        : n.createElement(c, { ...M, ref: x });
    });
    return ((g.displayName = `Primitive.${String(c)}`), g);
  }
  var Rn = new Map(),
    er = new Proxy(
      {},
      {
        get: (c, g) => {
          const m = g;
          return (Rn.has(m) || Rn.set(m, ri(m)), Rn.get(m));
        },
      },
    );
  function oi(c, g) {
    c && s.flushSync(() => c.dispatchEvent(g));
  }
  var tr = n.forwardRef((c, g) => {
    const { container: m, ...x } = c,
      w = me(),
      M = m ?? (w ? globalThis.document?.body : null);
    return M
      ? s.createPortal(n.createElement(er.div, { ...x, ref: g }), M)
      : null;
  });
  tr.displayName = "Portal";
  var nr = (c) => {
    const { present: g, children: m } = c,
      x = ii(g),
      w =
        typeof m == "function"
          ? m({ present: x.isPresent })
          : n.Children.only(m),
      M = Zn(x.ref, Qn(w));
    return typeof m == "function" || x.isPresent
      ? n.cloneElement(w, { ref: M })
      : null;
  };
  nr.displayName = "Presence";
  function ii(c) {
    const [g, m] = n.useState(),
      x = n.useRef({}),
      w = n.useRef(c),
      M = n.useRef("none"),
      j = c ? "mounted" : "unmounted",
      [N, L] = Gn({
        initial: j,
        states: {
          mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
          unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
          unmounted: { MOUNT: "mounted" },
        },
      });
    return (
      n.useEffect(() => {
        const O = Zt(x.current);
        M.current = N === "mounted" ? O : "none";
      }, [N]),
      be(() => {
        const O = x.current,
          te = w.current;
        if (te !== c) {
          const ye = M.current,
            Y = Zt(O);
          (c
            ? L("MOUNT")
            : Y === "none" || O?.display === "none"
              ? L("UNMOUNT")
              : L(te && ye !== Y ? "ANIMATION_OUT" : "UNMOUNT"),
            (w.current = c));
        }
      }, [c, L]),
      be(() => {
        if (g) {
          let O = function (Y) {
              const Ce = Zt(x.current).includes(Y.animationName);
              if (Y.target === g && Ce && (L("ANIMATION_END"), !w.current)) {
                const De = g.style.animationFillMode;
                ((g.style.animationFillMode = "forwards"),
                  (le = ye.setTimeout(() => {
                    g.style.animationFillMode === "forwards" &&
                      (g.style.animationFillMode = De);
                  })));
              }
            },
            te = function (Y) {
              Y.target === g && (M.current = Zt(x.current));
            },
            le;
          const ye = g.ownerDocument.defaultView ?? window;
          return (
            g.addEventListener("animationstart", te),
            g.addEventListener("animationcancel", O),
            g.addEventListener("animationend", O),
            () => {
              (ye.clearTimeout(le),
                g.removeEventListener("animationstart", te),
                g.removeEventListener("animationcancel", O),
                g.removeEventListener("animationend", O));
            }
          );
        }
        L("ANIMATION_END");
      }, [g, L]),
      {
        isPresent: ["mounted", "unmountSuspended"].includes(N),
        ref: n.useCallback((O) => {
          (O && (x.current = getComputedStyle(O)), m(O));
        }, []),
      }
    );
  }
  function Zt(c) {
    return c?.animationName || "none";
  }
  return (
    (z.DATA_DISMISSABLE_LAYER_ATTR = f),
    (z.DATA_DISMISSABLE_LAYER_STYLE_ATTR = a),
    (z.DATA_ITEM_ATTR = u),
    (z.DATA_VALUE_ATTR = d),
    (z.Portal = tr),
    (z.Presence = nr),
    (z.Primitive = er),
    (z.Slot = bn),
    (z.Slottable = yn),
    (z.VAR_ANCHOR_HEIGHT = h),
    (z.VAR_ANCHOR_WIDTH = v),
    (z.VAR_AVAILABLE_HEIGHT = p),
    (z.VAR_AVAILABLE_WIDTH = R),
    (z.VAR_TRANSFORM_ORIGIN = b),
    (z.VisuallyHiddenInput = Qo),
    (z.center = Zo),
    (z.compareNodePosition = D),
    (z.composeEventHandlers = Bo),
    (z.composeRefs = Xt),
    (z.createContext = ei),
    (z.dispatchDiscreteCustomEvent = oi),
    (z.findNextItem = Wo),
    (z.focusRing = Go),
    (z.forwardRef = $o),
    (z.fullSize = Xo),
    (z.getOwnerDocument = Z),
    (z.getOwnerWindow = J),
    (z.getPlatform = yt),
    (z.getProgressState = fe),
    (z.isFirefox = G),
    (z.isIOS = Qe),
    (z.isIPad = ke),
    (z.isIPhone = xe),
    (z.isMac = q),
    (z.isMobileFirefox = ce),
    (z.isPinchZoomActive = Pt),
    (z.isSafari = we),
    (z.noSelect = Jo),
    (z.overlay = Uo),
    (z.scrollableHidden = qo),
    (z.testPlatform = ze),
    (z.truncate = Yo),
    (z.useAnchor = i),
    (z.useAnchorPositioner = K),
    (z.useCallbackRef = k),
    (z.useCollection = B),
    (z.useComposedRefs = Zn),
    (z.useControllableState = H),
    (z.useDirection = P),
    (z.useDismiss = S),
    (z.useEscapeKeydown = y),
    (z.useEvent = _),
    (z.useEventCallback = ee),
    (z.useFilter = he),
    (z.useFilterStore = ae),
    (z.useFormControl = Se),
    (z.useFormReset = Ae),
    (z.useId = U),
    (z.useIsomorphicLayoutEffect = C),
    (z.useItemCollection = W),
    (z.useLabel = re),
    (z.useLayoutEffect = be),
    (z.useListHighlighting = ue),
    (z.useMounted = me),
    (z.usePrevious = ie),
    (z.useProgress = Ve),
    (z.useScrollLock = qt),
    (z.useSize = Kt),
    (z.useStateMachine = Gn),
    (z.useTypeahead = Ko),
    (z.visuallyHidden = Jn),
    (z.wrapArray = qn),
    z
  );
}
var de = cu(),
  Do = "TagsInputRoot",
  [lu, At] = de.createContext(Do),
  Lo = l.forwardRef((t, e) => {
    const {
        value: r,
        defaultValue: o,
        onValueChange: n,
        onValidate: s,
        onInvalid: i,
        displayValue: u = (U) => U.toString(),
        addOnPaste: f = !1,
        addOnTab: a = !1,
        disabled: d = !1,
        editable: b = !1,
        loop: v = !1,
        blurBehavior: h,
        delimiter: R = ",",
        max: p = Number.POSITIVE_INFINITY,
        readOnly: E = !1,
        required: P = !1,
        name: C,
        children: A,
        dir: F,
        id: Q,
        ...K
      } = t,
      [k = [], D] = de.useControllableState({
        prop: r,
        defaultProp: o,
        onChange: n,
      }),
      [B, H] = l.useState(null),
      [se, Z] = l.useState(null),
      [J, y] = l.useState(!1),
      S = l.useRef(null),
      ee = l.useRef(null),
      _ = de.useId(),
      I = de.useId(),
      T = de.useId(),
      $ = de.useDirection(F),
      { getEnabledItems: ve } = de.useItemCollection({ ref: S }),
      { isFormControl: ne, onTriggerChange: V } = de.useFormControl(),
      he = de.useComposedRefs(e, S, (U) => V(U)),
      ae = l.useCallback(
        (U, W) => {
          if (d || E) return !1;
          if (f && W?.viaPaste) {
            const oe = U.split(R)
              .map((fe) => fe.trim())
              .filter(Boolean);
            if (k.length + oe.length > p && p > 0) return (i?.(U), !1);
            let Pe = [];
            for (const fe of oe) k.includes(fe) && i?.(fe);
            Pe = [...new Set(oe.filter((fe) => !k.includes(fe)))];
            const Me = Pe.filter((fe) => !s || s(fe));
            return Me.length === 0 ? !1 : (D([...k, ...Me]), !0);
          }
          if (k.length >= p && p > 0) return (i?.(U), !1);
          const re = U.trim();
          if (s && !s(re)) return (y(!0), i?.(re), !1);
          if (k.some((oe) => oe === re)) return (y(!0), i?.(re), !0);
          const me = re,
            ie = [...k, me];
          return (D(ie), H(null), Z(null), y(!1), !0);
        },
        [k, p, f, R, D, i, s, d, E],
      ),
      Se = l.useCallback(
        (U, W) => {
          if (!(d || E) && U !== -1) {
            const re = W.trim();
            if (k.some((oe, Pe) => (Pe === U ? !1 : oe === re))) {
              (y(!0), i?.(re));
              return;
            }
            if (s && !s(re)) {
              (y(!0), i?.(re));
              return;
            }
            const me = u(re),
              ie = [...k];
            ((ie[U] = me),
              D(ie),
              H(U),
              Z(null),
              y(!1),
              requestAnimationFrame(() => ee.current?.focus()));
          }
        },
        [k, D, u, i, s, d, E],
      ),
      Ae = l.useCallback(
        (U) => {
          if (!(d || E) && U !== -1) {
            const W = [...k];
            (W.splice(U, 1), D(W), H(null), Z(null), ee.current?.focus());
          }
        },
        [k, D, d, E],
      ),
      be = l.useCallback(() => {
        (H(null), Z(null), ee.current?.focus());
      }, []),
      Ie = l.useCallback(
        (U) => {
          const W = U.target;
          if (!(W instanceof HTMLInputElement)) return;
          const re =
              (U.key === "ArrowLeft" && $ === "ltr") ||
              (U.key === "ArrowRight" && $ === "rtl"),
            ue =
              (U.key === "ArrowRight" && $ === "ltr") ||
              (U.key === "ArrowLeft" && $ === "rtl");
          if (W.value && W.selectionStart !== 0) {
            (H(null), Z(null));
            return;
          }
          function me(ie, oe) {
            if (!S.current) return null;
            const fe = ve().map((G, ce) => ce);
            if (fe.length === 0) return null;
            if (ie === null)
              return oe === "prev"
                ? (fe[fe.length - 1] ?? null)
                : (fe[0] ?? null);
            const Ve = fe.indexOf(ie);
            return oe === "next"
              ? Ve >= fe.length - 1
                ? v
                  ? (fe[0] ?? null)
                  : null
                : (fe[Ve + 1] ?? null)
              : Ve <= 0
                ? v
                  ? (fe[fe.length - 1] ?? null)
                  : null
                : (fe[Ve - 1] ?? null);
          }
          switch (U.key) {
            case "Delete":
            case "Backspace": {
              if (W.selectionStart !== 0 || W.selectionEnd !== 0) break;
              if (B !== null) {
                const ie = me(B, "prev");
                (Ae(B), H(ie), U.preventDefault());
              } else if (U.key === "Backspace" && k.length > 0) {
                const ie = me(null, "prev");
                (H(ie), U.preventDefault());
              }
              break;
            }
            case "Enter": {
              if (B !== null && b && !d) {
                (Z(B), U.preventDefault());
                return;
              }
              break;
            }
            case "ArrowLeft":
            case "ArrowRight": {
              if (W.selectionStart === 0 && re && B === null && k.length > 0) {
                const ie = me(null, "prev");
                (H(ie), U.preventDefault());
              } else if (B !== null) {
                const ie = me(B, re ? "prev" : "next");
                ie !== null
                  ? (H(ie), U.preventDefault())
                  : ue &&
                    (H(null),
                    requestAnimationFrame(() => W.setSelectionRange(0, 0)));
              }
              break;
            }
            case "Home": {
              if (B !== null) {
                const ie = me(null, "next");
                (H(ie), U.preventDefault());
              }
              break;
            }
            case "End": {
              if (B !== null) {
                const ie = me(null, "prev");
                (H(ie), U.preventDefault());
              }
              break;
            }
            case "Escape": {
              (B !== null && H(null),
                se !== null && Z(null),
                requestAnimationFrame(() => W.setSelectionRange(0, 0)));
              break;
            }
          }
        },
        [$, se, B, k, Ae, ve, b, d, v],
      ),
      Ne = l.useCallback(
        (U) =>
          S.current?.contains(U) &&
          !U.hasAttribute(de.DATA_ITEM_ATTR) &&
          U.tagName !== "INPUT",
        [],
      );
    return l.createElement(
      lu,
      {
        value: k,
        onValueChange: D,
        onItemAdd: ae,
        onItemRemove: Ae,
        onItemUpdate: Se,
        onInputKeydown: Ie,
        highlightedIndex: B,
        setHighlightedIndex: H,
        editingIndex: se,
        setEditingIndex: Z,
        displayValue: u,
        onItemLeave: be,
        inputRef: ee,
        isInvalidInput: J,
        addOnPaste: f,
        addOnTab: a,
        disabled: d,
        editable: b,
        loop: v,
        readOnly: E,
        blurBehavior: h,
        delimiter: R,
        max: p,
        dir: $,
        id: _,
        inputId: I,
        labelId: T,
      },
      l.createElement(
        de.Primitive.div,
        {
          id: _,
          "data-disabled": d ? "" : void 0,
          "data-invalid": J ? "" : void 0,
          "data-readonly": E ? "" : void 0,
          dir: $,
          ...K,
          ref: he,
          onClick: de.composeEventHandlers(K.onClick, (U) => {
            const W = U.target;
            W instanceof HTMLElement &&
              Ne(W) &&
              document.activeElement !== ee.current &&
              (U.currentTarget.focus(), ee.current?.focus());
          }),
          onMouseDown: de.composeEventHandlers(K.onMouseDown, (U) => {
            const W = U.target;
            W instanceof HTMLElement && Ne(W) && U.preventDefault();
          }),
          onBlur: de.composeEventHandlers(K.onBlur, (U) => {
            U.relatedTarget !== ee.current &&
              !S.current?.contains(U.relatedTarget) &&
              requestAnimationFrame(() => H(null));
          }),
        },
        typeof A == "function"
          ? l.createElement(l.Fragment, null, A({ value: k }))
          : A,
        ne &&
          C &&
          l.createElement(de.VisuallyHiddenInput, {
            type: "hidden",
            control: S.current,
            name: C,
            value: k,
            disabled: d,
            required: P,
          }),
      ),
    );
  });
Lo.displayName = Do;
var au = Lo,
  Fo = "TagsInputLabel",
  fu = l.forwardRef((t, e) => {
    const r = At(Fo);
    return l.createElement(de.Primitive.label, {
      id: r.labelId,
      htmlFor: r.inputId,
      ...t,
      ref: e,
    });
  });
fu.displayName = Fo;
var Un = "TagsInputItem",
  [du, Yn] = de.createContext(Un),
  _o = l.forwardRef((t, e) => {
    const { value: r, disabled: o, ...n } = t,
      s = l.useRef("touch"),
      i = At(Un),
      u = de.useId(),
      f = `${u}text`,
      a = i.value.indexOf(r),
      d = a === i.highlightedIndex,
      b = a === i.editingIndex,
      v = o || i.disabled,
      h = i.displayValue(r),
      R = l.useCallback(() => {
        (i.setHighlightedIndex(a), i.inputRef.current?.focus());
      }, [i.setHighlightedIndex, i.inputRef, a]);
    return l.createElement(
      du,
      {
        id: u,
        value: r,
        index: a,
        isHighlighted: d,
        isEditing: b,
        disabled: v,
        textId: f,
        displayValue: h,
      },
      l.createElement(de.Primitive.div, {
        id: u,
        "aria-labelledby": f,
        "aria-current": d,
        "aria-disabled": v,
        [de.DATA_ITEM_ATTR]: "",
        "data-state": d ? "active" : "inactive",
        "data-highlighted": d ? "" : void 0,
        "data-editing": b ? "" : void 0,
        "data-editable": i.editable ? "" : void 0,
        "data-disabled": v ? "" : void 0,
        ...n,
        ref: e,
        onClick: de.composeEventHandlers(n.onClick, (p) => {
          (p.stopPropagation(), !b && s.current !== "mouse" && R());
        }),
        onDoubleClick: de.composeEventHandlers(n.onDoubleClick, () => {
          i.editable && !v && requestAnimationFrame(() => i.setEditingIndex(a));
        }),
        onPointerUp: de.composeEventHandlers(n.onPointerUp, () => {
          s.current === "mouse" && R();
        }),
        onPointerDown: de.composeEventHandlers(
          n.onPointerDown,
          (p) => (s.current = p.pointerType),
        ),
        onPointerMove: de.composeEventHandlers(n.onPointerMove, (p) => {
          ((s.current = p.pointerType),
            o
              ? i.onItemLeave()
              : s.current === "mouse" &&
                p.currentTarget.focus({ preventScroll: !0 }));
        }),
        onPointerLeave: de.composeEventHandlers(n.onPointerLeave, (p) => {
          p.currentTarget === document.activeElement && i.onItemLeave();
        }),
      }),
    );
  });
_o.displayName = Un;
var mu = _o,
  Ho = "TagsInputInput",
  Vo = l.forwardRef((t, e) => {
    const { autoFocus: r, ...o } = t,
      n = At(Ho),
      s = l.useCallback(
        (u) => {
          n.addOnTab && i(u);
        },
        [n.addOnTab],
      ),
      i = l.useCallback(
        (u) => {
          if (u.defaultPrevented) return;
          const f = u.currentTarget.value;
          if (!f) return;
          (n.onItemAdd(f) &&
            ((u.currentTarget.value = ""), n.setHighlightedIndex(null)),
            u.preventDefault());
        },
        [n.onItemAdd, n.setHighlightedIndex],
      );
    return (
      l.useEffect(() => {
        if (!r) return;
        const u = requestAnimationFrame(() => n.inputRef.current?.focus());
        return () => cancelAnimationFrame(u);
      }, [r, n.inputRef]),
      l.createElement(de.Primitive.input, {
        type: "text",
        id: n.inputId,
        autoCapitalize: "off",
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: "false",
        autoFocus: r,
        "aria-labelledby": n.labelId,
        "aria-readonly": n.readOnly,
        "data-invalid": n.isInvalidInput ? "" : void 0,
        dir: n.dir,
        disabled: n.disabled,
        readOnly: n.readOnly,
        ...o,
        ref: de.composeRefs(n.inputRef, e),
        onBlur: de.composeEventHandlers(o.onBlur, (u) => {
          if (!n.readOnly) {
            if (n.blurBehavior === "add") {
              const f = u.target.value;
              f && n.onItemAdd(f) && (u.target.value = "");
            }
            n.blurBehavior === "clear" && (u.target.value = "");
          }
        }),
        onChange: de.composeEventHandlers(o.onChange, (u) => {
          if (n.readOnly) return;
          const f = u.target;
          if (!(f instanceof HTMLInputElement)) return;
          if (n.delimiter === f.value.slice(-1)) {
            const d = f.value.slice(0, -1);
            ((f.value = ""),
              d && (n.onItemAdd(d), n.setHighlightedIndex(null)));
          }
        }),
        onKeyDown: de.composeEventHandlers(o.onKeyDown, (u) => {
          n.readOnly ||
            (u.key === "Enter" && i(u),
            u.key === "Tab" && s(u),
            n.onInputKeydown(u),
            u.key.length === 1 && n.setHighlightedIndex(null));
        }),
        onPaste: de.composeEventHandlers(o.onPaste, (u) => {
          if (!n.readOnly && n.addOnPaste) {
            u.preventDefault();
            const f = u.clipboardData.getData("text");
            (n.onItemAdd(f, { viaPaste: !0 }), n.setHighlightedIndex(null));
          }
        }),
      })
    );
  });
Vo.displayName = Ho;
var pu = Vo,
  Vn = "TagsInputItemDelete",
  zo = l.forwardRef((t, e) => {
    const r = At(Vn),
      o = Yn(Vn),
      n = o.disabled || r.disabled;
    return o.isEditing
      ? null
      : l.createElement(de.Primitive.button, {
          type: "button",
          tabIndex: n ? void 0 : -1,
          "aria-labelledby": o.textId,
          "aria-controls": o.id,
          "aria-current": o.isHighlighted,
          "data-state": o.isHighlighted ? "active" : "inactive",
          "data-disabled": n ? "" : void 0,
          ...t,
          ref: e,
          onClick: de.composeEventHandlers(t.onClick, () => {
            if (n) return;
            const s = r.value.findIndex((i) => i === o.value);
            r.onItemRemove(s);
          }),
        });
  });
zo.displayName = Vn;
var gu = zo,
  pn = "TagsInputItemText",
  hu = l.forwardRef((t, e) => {
    const { children: r, ...o } = t,
      n = At(pn),
      s = Yn(pn);
    return s.isEditing && n.editable && !s.disabled
      ? l.createElement(bu, null)
      : l.createElement(
          de.Primitive.span,
          { id: s.textId, ...o, ref: e },
          r ?? s.displayValue,
        );
  }),
  vu = hu;
function bu() {
  const t = At(pn),
    e = Yn(pn),
    [r, o] = l.useState(e.displayValue),
    n = l.useCallback(() => {
      (o(e.displayValue), t.setEditingIndex(null));
    }, [t.setEditingIndex, e.displayValue]),
    s = l.useCallback((f) => {
      const a = f.target;
      ((a.style.width = "0"),
        (a.style.width = `${a.scrollWidth + 4}px`),
        o(f.target.value));
    }, []),
    i = l.useCallback((f) => {
      (f.target.select(),
        (f.target.style.width = "0"),
        (f.target.style.width = `${f.target.scrollWidth + 4}px`));
    }, []),
    u = l.useCallback(
      (f) => {
        if (f.key === "Enter") {
          const a = t.value.findIndex((d) => d === e.value);
          t.onItemUpdate(a, r);
        } else
          f.key === "Escape" &&
            (o(e.displayValue),
            t.setEditingIndex(null),
            t.setHighlightedIndex(e.index),
            t.inputRef.current?.focus());
        f.stopPropagation();
      },
      [
        t.value,
        t.onItemUpdate,
        t.setEditingIndex,
        e.displayValue,
        t.inputRef.current?.focus,
        r,
        e.value,
        t.setHighlightedIndex,
        e.index,
      ],
    );
  return l.createElement(de.Primitive.input, {
    type: "text",
    autoCapitalize: "off",
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: "false",
    autoFocus: !0,
    "aria-describedby": e.textId,
    value: r,
    onChange: s,
    onKeyDown: u,
    onFocus: i,
    onBlur: n,
    style: {
      outline: "none",
      background: "inherit",
      border: "none",
      font: "inherit",
      color: "inherit",
      padding: 0,
      minWidth: "1ch",
    },
  });
}
var jo = "TagsInputClear",
  yu = l.forwardRef((t, e) => {
    const { forceMount: r, ...o } = t,
      n = At(jo);
    return l.createElement(
      de.Presence,
      { present: r || n.value.length > 0 },
      l.createElement(de.Primitive.button, {
        type: "button",
        "aria-disabled": n.disabled,
        "data-state": n.value.length > 0 ? "visible" : "invisible",
        "data-disabled": n.disabled ? "" : void 0,
        ...o,
        ref: e,
        onClick: de.composeEventHandlers(t.onClick, () => {
          n.disabled || (n.onValueChange([]), n.inputRef.current?.focus());
        }),
      }),
    );
  });
yu.displayName = jo;
function Ru({ className: t, ...e }) {
  return X.jsx(au, {
    "data-slot": "tags-input",
    className: Ze("flex w-[380px] flex-col gap-2", t),
    ...e,
  });
}
function xu({ className: t, ...e }) {
  return X.jsx("div", {
    "data-slot": "tags-input-list",
    className: Ze(
      "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      t,
    ),
    ...e,
  });
}
function Eu({ className: t, ...e }) {
  return X.jsx(pu, {
    "data-slot": "tags-input-input",
    className: Ze(
      "flex-1 bg-transparent outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      t,
    ),
    ...e,
  });
}
function Iu({ className: t, children: e, ...r }) {
  return X.jsxs(mu, {
    "data-slot": "tags-input-item",
    className: Ze(
      "inline-flex max-w-[calc(100%-8px)] items-center gap-1.5 rounded border bg-transparent px-2.5 py-1 text-sm focus:outline-hidden data-disabled:cursor-not-allowed data-editable:select-none data-editing:bg-transparent data-disabled:opacity-50 data-editing:ring-1 data-editing:ring-ring [&:not([data-editing])]:pr-1.5 [&[data-highlighted]:not([data-editing])]:bg-accent [&[data-highlighted]:not([data-editing])]:text-accent-foreground",
      t,
    ),
    ...r,
    children: [
      X.jsx(vu, { className: "truncate", children: e }),
      X.jsx(gu, {
        className:
          "size-4 shrink-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100",
        children: X.jsx(Yr, { className: "size-3.5" }),
      }),
    ],
  });
}
function Pu({
  type: t,
  value: e,
  label: r,
  placeholder: o,
  className: n,
  onSave: s,
  onEditStart: i,
  disabled: u = !1,
  actions: f = "below",
  inputClassName: a,
  inputPrefix: d,
  inputSuffix: b,
  children: v,
}) {
  const [h, R] = l.useState(!1),
    [p, E] = l.useState(e),
    [P, C] = l.useState(!1),
    A = l.useRef(null),
    F = l.useRef(null),
    Q = l.useId(),
    K = l.useId();
  l.useEffect(() => {
    h || E(e);
  }, [e, h]);
  const k = l.useCallback(
    (T) => {
      ((F.current = T),
        T &&
          h &&
          (T.focus(),
          "select" in T && typeof T.select == "function" && T.select()));
    },
    [h],
  );
  l.useEffect(() => {
    if (!h) return;
    const T = ($) => {
      A.current && !A.current.contains($.target) && D();
    };
    return (
      document.addEventListener("mousedown", T),
      () => document.removeEventListener("mousedown", T)
    );
  }, [h, p]);
  const D = async () => {
      if (P) return;
      if (
        !(Array.isArray(e) ? JSON.stringify(e) !== JSON.stringify(p) : e !== p)
      ) {
        R(!1);
        return;
      }
      C(!0);
      try {
        (await s(p), R(!1));
      } catch {
        E(e);
      } finally {
        C(!1);
      }
    },
    B = () => {
      (E(e), R(!1));
    },
    H = () => {
      u || (R(!0), i?.());
    },
    se = (T) => {
      if (T.key === "Escape") {
        (T.preventDefault(), T.stopPropagation(), B());
        return;
      }
      T.key === "Enter" &&
        (t === "text" || T.metaKey || T.ctrlKey) &&
        (T.preventDefault(), D());
    },
    Z = (T) => {
      (T.key === "Enter" || T.key === " ") && !u && (T.preventDefault(), H());
    },
    J = {
      "data-state": h ? "editing" : "viewing",
      "data-disabled": u || void 0,
      "data-saving": P || void 0,
    },
    y = d || b,
    S =
      f !== "none"
        ? X.jsxs("div", {
            className: Ze(
              "flex gap-1",
              f === "below" && "mt-2",
              f === "inline" && "shrink-0",
            ),
            role: "group",
            "aria-label": "Edit actions",
            children: [
              X.jsx(dr, {
                variant: "ghost",
                size: "icon-sm",
                onClick: D,
                disabled: P,
                "aria-label": "Save changes",
                children: P
                  ? X.jsx(Oi, {
                      className: "size-4 animate-spin",
                      "aria-hidden": "true",
                    })
                  : X.jsx(ki, { className: "size-4", "aria-hidden": "true" }),
              }),
              X.jsx(dr, {
                variant: "ghost",
                size: "icon-sm",
                onClick: B,
                disabled: P,
                "aria-label": "Cancel editing",
                children: X.jsx(Yr, {
                  className: "size-4",
                  "aria-hidden": "true",
                }),
              }),
            ],
          })
        : null;
  if (!h)
    return X.jsxs("div", {
      ref: A,
      className: Ze("group/editable", n),
      ...J,
      children: [
        r &&
          X.jsx("label", {
            id: Q,
            className: "font-semibold mb-2 block",
            children: r,
          }),
        X.jsx("div", {
          role: "button",
          tabIndex: u ? -1 : 0,
          "aria-label": u
            ? `${r || "Field"}: ${Array.isArray(e) ? e.join(", ") : e}`
            : `${r || "Field"}: ${Array.isArray(e) ? e.join(", ") : e}. Double-click or press Enter to edit`,
          "aria-labelledby": r ? Q : void 0,
          "aria-disabled": u,
          className: Ze(
            "rounded-md transition-colors p-1 group/field",
            !u &&
              "cursor-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            u && "cursor-default",
          ),
          onDoubleClick: H,
          onKeyDown: Z,
          children: v
            ? X.jsx("span", {
                className: Ze(
                  "inline-block rounded-md p-2 -mx-1 -my-2 transition-colors",
                  !u && "group-hover/field:bg-muted/60",
                ),
                children: v(e),
              })
            : X.jsx("span", {
                className: "text-sm",
                children: Array.isArray(e) ? e.join(", ") : e,
              }),
        }),
      ],
    });
  const ee = {
      id: K,
      onKeyDown: se,
      placeholder: o,
      disabled: P,
      "aria-describedby": P ? "saving-status" : void 0,
    },
    _ = X.jsxs(X.Fragment, {
      children: [
        t === "text" &&
          X.jsx("input", {
            ...ee,
            ref: k,
            value: p,
            onChange: (T) => E(T.target.value),
            className: Ze(
              "bg-transparent border-none outline-none focus:ring-0 w-full",
              a,
            ),
          }),
        t === "multiline" &&
          X.jsx(Ni, {
            ...ee,
            ref: k,
            value: p,
            onChange: (T) => E(T.target.value),
            className: a,
          }),
        t === "tags" &&
          X.jsx("div", {
            onKeyDown: se,
            children: X.jsx(Ru, {
              value: p,
              onValueChange: (T) => E(T),
              disabled: P,
              className: Ze("w-full", a),
              children: X.jsxs(xu, {
                children: [
                  p.map((T) => X.jsx(Iu, { value: T, children: T }, T)),
                  X.jsx(Eu, { ref: k, placeholder: o || "Add tag..." }),
                ],
              }),
            }),
          }),
      ],
    }),
    I = y
      ? X.jsxs("div", {
          className: "inline-flex items-baseline gap-2 w-full",
          children: [d, _, b],
        })
      : _;
  return X.jsxs("div", {
    ref: A,
    className: Ze("group/editable", n),
    ...J,
    role: "group",
    "aria-labelledby": r ? Q : void 0,
    "aria-busy": P,
    children: [
      r &&
        X.jsx("label", {
          id: Q,
          htmlFor: K,
          className: "font-semibold mb-2 block",
          children: r,
        }),
      f === "inline"
        ? X.jsxs("div", {
            className: "flex items-center gap-1",
            children: [
              X.jsx("div", { className: "rounded-md p-1 flex-1", children: I }),
              S,
            ],
          })
        : X.jsxs("div", { className: "p-1.5", children: [I, S] }),
      P &&
        X.jsx("span", {
          id: "saving-status",
          className: "sr-only",
          "aria-live": "polite",
          children: "Saving changes...",
        }),
    ],
  });
}
export { Pu as E };
