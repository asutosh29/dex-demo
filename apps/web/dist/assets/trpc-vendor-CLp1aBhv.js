import { r as j, b as fr } from "./react-vendor-nYV-xjaT.js";
var Fe = { exports: {} },
  fe = {};
var at;
function hr() {
  if (at) return fe;
  at = 1;
  var e = Symbol.for("react.transitional.element"),
    t = Symbol.for("react.fragment");
  function r(s, n, i) {
    var o = null;
    if (
      (i !== void 0 && (o = "" + i),
      n.key !== void 0 && (o = "" + n.key),
      "key" in n)
    ) {
      i = {};
      for (var a in n) a !== "key" && (i[a] = n[a]);
    } else i = n;
    return (
      (n = i.ref),
      { $$typeof: e, type: s, key: o, ref: n !== void 0 ? n : null, props: i }
    );
  }
  return ((fe.Fragment = t), (fe.jsx = r), (fe.jsxs = r), fe);
}
var ut;
function dr() {
  return (ut || ((ut = 1), (Fe.exports = hr())), Fe.exports);
}
var jt = dr(),
  ae = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(e), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  pr = class extends ae {
    #t;
    #e;
    #r;
    constructor() {
      (super(),
        (this.#r = (e) => {
          if (typeof window < "u" && window.addEventListener) {
            const t = () => e();
            return (
              window.addEventListener("visibilitychange", t, !1),
              () => {
                window.removeEventListener("visibilitychange", t);
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#e || this.setEventListener(this.#r);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#e?.(), (this.#e = void 0));
    }
    setEventListener(e) {
      ((this.#r = e),
        this.#e?.(),
        (this.#e = e((t) => {
          typeof t == "boolean" ? this.setFocused(t) : this.onFocus();
        })));
    }
    setFocused(e) {
      this.#t !== e && ((this.#t = e), this.onFocus());
    }
    onFocus() {
      const e = this.isFocused();
      this.listeners.forEach((t) => {
        t(e);
      });
    }
    isFocused() {
      return typeof this.#t == "boolean"
        ? this.#t
        : globalThis.document?.visibilityState !== "hidden";
    }
  },
  Ze = new pr(),
  yr = {
    setTimeout: (e, t) => setTimeout(e, t),
    clearTimeout: (e) => clearTimeout(e),
    setInterval: (e, t) => setInterval(e, t),
    clearInterval: (e) => clearInterval(e),
  },
  vr = class {
    #t = yr;
    #e = !1;
    setTimeoutProvider(e) {
      this.#t = e;
    }
    setTimeout(e, t) {
      return this.#t.setTimeout(e, t);
    }
    clearTimeout(e) {
      this.#t.clearTimeout(e);
    }
    setInterval(e, t) {
      return this.#t.setInterval(e, t);
    }
    clearInterval(e) {
      this.#t.clearInterval(e);
    }
  },
  ie = new vr();
function mr(e) {
  setTimeout(e, 0);
}
var br = typeof window > "u" || "Deno" in globalThis;
function N() {}
function gr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Le(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function Ct(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function te(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function z(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ct(e, t) {
  const {
    type: r = "all",
    exact: s,
    fetchStatus: n,
    predicate: i,
    queryKey: o,
    stale: a,
  } = e;
  if (o) {
    if (s) {
      if (t.queryHash !== Xe(o, t.options)) return !1;
    } else if (!pe(t.queryKey, o)) return !1;
  }
  if (r !== "all") {
    const u = t.isActive();
    if ((r === "active" && !u) || (r === "inactive" && u)) return !1;
  }
  return !(
    (typeof a == "boolean" && t.isStale() !== a) ||
    (n && n !== t.state.fetchStatus) ||
    (i && !i(t))
  );
}
function lt(e, t) {
  const { exact: r, status: s, predicate: n, mutationKey: i } = e;
  if (i) {
    if (!t.options.mutationKey) return !1;
    if (r) {
      if (re(t.options.mutationKey) !== re(i)) return !1;
    } else if (!pe(t.options.mutationKey, i)) return !1;
  }
  return !((s && t.state.status !== s) || (n && !n(t)));
}
function Xe(e, t) {
  return (t?.queryKeyHashFn || re)(e);
}
function re(e) {
  return JSON.stringify(e, (t, r) =>
    Ke(r)
      ? Object.keys(r)
          .sort()
          .reduce((s, n) => ((s[n] = r[n]), s), {})
      : r,
  );
}
function pe(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
      ? !1
      : e && t && typeof e == "object" && typeof t == "object"
        ? Object.keys(t).every((r) => pe(e[r], t[r]))
        : !1;
}
var Or = Object.prototype.hasOwnProperty;
function et(e, t, r = 0) {
  if (e === t) return e;
  if (r > 500) return t;
  const s = ft(e) && ft(t);
  if (!s && !(Ke(e) && Ke(t))) return t;
  const i = (s ? e : Object.keys(e)).length,
    o = s ? t : Object.keys(t),
    a = o.length,
    u = s ? new Array(a) : {};
  let c = 0;
  for (let l = 0; l < a; l++) {
    const h = s ? l : o[l],
      p = e[h],
      v = t[h];
    if (p === v) {
      ((u[h] = p), (s ? l < i : Or.call(e, h)) && c++);
      continue;
    }
    if (
      p === null ||
      v === null ||
      typeof p != "object" ||
      typeof v != "object"
    ) {
      u[h] = v;
      continue;
    }
    const P = et(p, v, r + 1);
    ((u[h] = P), P === p && c++);
  }
  return i === a && c === i ? e : u;
}
function ye(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const r in e) if (e[r] !== t[r]) return !1;
  return !0;
}
function ft(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Ke(e) {
  if (!ht(e)) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const r = t.prototype;
  return !(
    !ht(r) ||
    !r.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function ht(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Pr(e) {
  return new Promise((t) => {
    ie.setTimeout(t, e);
  });
}
function Ne(e, t, r) {
  return typeof r.structuralSharing == "function"
    ? r.structuralSharing(e, t)
    : r.structuralSharing !== !1
      ? et(e, t)
      : t;
}
function xr(e, t, r = 0) {
  const s = [...e, t];
  return r && s.length > r ? s.slice(1) : s;
}
function wr(e, t, r = 0) {
  const s = [t, ...e];
  return r && s.length > r ? s.slice(0, -1) : s;
}
var W = Symbol();
function Rt(e, t) {
  return !e.queryFn && t?.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === W
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
function tt(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
function Sr(e, t, r) {
  let s = !1,
    n;
  return (
    Object.defineProperty(e, "signal", {
      enumerable: !0,
      get: () => (
        (n ??= t()),
        s ||
          ((s = !0),
          n.aborted ? r() : n.addEventListener("abort", r, { once: !0 })),
        n
      ),
    }),
    e
  );
}
var ve = (() => {
  let e = () => br;
  return {
    isServer() {
      return e();
    },
    setIsServer(t) {
      e = t;
    },
  };
})();
function He() {
  let e, t;
  const r = new Promise((n, i) => {
    ((e = n), (t = i));
  });
  ((r.status = "pending"), r.catch(() => {}));
  function s(n) {
    (Object.assign(r, n), delete r.resolve, delete r.reject);
  }
  return (
    (r.resolve = (n) => {
      (s({ status: "fulfilled", value: n }), e(n));
    }),
    (r.reject = (n) => {
      (s({ status: "rejected", reason: n }), t(n));
    }),
    r
  );
}
var _r = mr;
function jr() {
  let e = [],
    t = 0,
    r = (a) => {
      a();
    },
    s = (a) => {
      a();
    },
    n = _r;
  const i = (a) => {
      t
        ? e.push(a)
        : n(() => {
            r(a);
          });
    },
    o = () => {
      const a = e;
      ((e = []),
        a.length &&
          n(() => {
            s(() => {
              a.forEach((u) => {
                r(u);
              });
            });
          }));
    };
  return {
    batch: (a) => {
      let u;
      t++;
      try {
        u = a();
      } finally {
        (t--, t || o());
      }
      return u;
    },
    batchCalls:
      (a) =>
      (...u) => {
        i(() => {
          a(...u);
        });
      },
    schedule: i,
    setNotifyFunction: (a) => {
      r = a;
    },
    setBatchNotifyFunction: (a) => {
      s = a;
    },
    setScheduler: (a) => {
      n = a;
    },
  };
}
var k = jr(),
  Cr = class extends ae {
    #t = !0;
    #e;
    #r;
    constructor() {
      (super(),
        (this.#r = (e) => {
          if (typeof window < "u" && window.addEventListener) {
            const t = () => e(!0),
              r = () => e(!1);
            return (
              window.addEventListener("online", t, !1),
              window.addEventListener("offline", r, !1),
              () => {
                (window.removeEventListener("online", t),
                  window.removeEventListener("offline", r));
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#e || this.setEventListener(this.#r);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#e?.(), (this.#e = void 0));
    }
    setEventListener(e) {
      ((this.#r = e), this.#e?.(), (this.#e = e(this.setOnline.bind(this))));
    }
    setOnline(e) {
      this.#t !== e &&
        ((this.#t = e),
        this.listeners.forEach((r) => {
          r(e);
        }));
    }
    isOnline() {
      return this.#t;
    }
  },
  Ce = new Cr();
function Rr(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function Et(e) {
  return (e ?? "online") === "online" ? Ce.isOnline() : !0;
}
var We = class extends Error {
  constructor(e) {
    (super("CancelledError"),
      (this.revert = e?.revert),
      (this.silent = e?.silent));
  }
};
function Qt(e) {
  let t = !1,
    r = 0,
    s;
  const n = He(),
    i = () => n.status !== "pending",
    o = (d) => {
      if (!i()) {
        const _ = new We(d);
        (p(_), e.onCancel?.(_));
      }
    },
    a = () => {
      t = !0;
    },
    u = () => {
      t = !1;
    },
    c = () =>
      Ze.isFocused() &&
      (e.networkMode === "always" || Ce.isOnline()) &&
      e.canRun(),
    l = () => Et(e.networkMode) && e.canRun(),
    h = (d) => {
      i() || (s?.(), n.resolve(d));
    },
    p = (d) => {
      i() || (s?.(), n.reject(d));
    },
    v = () =>
      new Promise((d) => {
        ((s = (_) => {
          (i() || c()) && d(_);
        }),
          e.onPause?.());
      }).then(() => {
        ((s = void 0), i() || e.onContinue?.());
      }),
    P = () => {
      if (i()) return;
      let d;
      const _ = r === 0 ? e.initialPromise : void 0;
      try {
        d = _ ?? e.fn();
      } catch (E) {
        d = Promise.reject(E);
      }
      Promise.resolve(d)
        .then(h)
        .catch((E) => {
          if (i()) return;
          const I = e.retry ?? (ve.isServer() ? 0 : 3),
            J = e.retryDelay ?? Rr,
            X = typeof J == "function" ? J(r, E) : J,
            g =
              I === !0 ||
              (typeof I == "number" && r < I) ||
              (typeof I == "function" && I(r, E));
          if (t || !g) {
            p(E);
            return;
          }
          (r++,
            e.onFail?.(r, E),
            Pr(X)
              .then(() => (c() ? void 0 : v()))
              .then(() => {
                t ? p(E) : P();
              }));
        });
    };
  return {
    promise: n,
    status: () => n.status,
    cancel: o,
    continue: () => (s?.(), n),
    cancelRetry: a,
    continueRetry: u,
    canStart: l,
    start: () => (l() ? P() : v().then(P), n),
  };
}
var Mt = class {
    #t;
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      (this.clearGcTimeout(),
        Le(this.gcTime) &&
          (this.#t = ie.setTimeout(() => {
            this.optionalRemove();
          }, this.gcTime)));
    }
    updateGcTime(e) {
      this.gcTime = Math.max(
        this.gcTime || 0,
        e ?? (ve.isServer() ? 1 / 0 : 300 * 1e3),
      );
    }
    clearGcTimeout() {
      this.#t !== void 0 && (ie.clearTimeout(this.#t), (this.#t = void 0));
    }
  },
  Er = class extends Mt {
    #t;
    #e;
    #r;
    #s;
    #n;
    #i;
    #o;
    constructor(e) {
      (super(),
        (this.#o = !1),
        (this.#i = e.defaultOptions),
        this.setOptions(e.options),
        (this.observers = []),
        (this.#s = e.client),
        (this.#r = this.#s.getQueryCache()),
        (this.queryKey = e.queryKey),
        (this.queryHash = e.queryHash),
        (this.#t = pt(this.options)),
        (this.state = e.state ?? this.#t),
        this.scheduleGc());
    }
    get meta() {
      return this.options.meta;
    }
    get promise() {
      return this.#n?.promise;
    }
    setOptions(e) {
      if (
        ((this.options = { ...this.#i, ...e }),
        this.updateGcTime(this.options.gcTime),
        this.state && this.state.data === void 0)
      ) {
        const t = pt(this.options);
        t.data !== void 0 &&
          (this.setState(dt(t.data, t.dataUpdatedAt)), (this.#t = t));
      }
    }
    optionalRemove() {
      !this.observers.length &&
        this.state.fetchStatus === "idle" &&
        this.#r.remove(this);
    }
    setData(e, t) {
      const r = Ne(this.state.data, e, this.options);
      return (
        this.#u({
          data: r,
          type: "success",
          dataUpdatedAt: t?.updatedAt,
          manual: t?.manual,
        }),
        r
      );
    }
    setState(e, t) {
      this.#u({ type: "setState", state: e, setStateOptions: t });
    }
    cancel(e) {
      const t = this.#n?.promise;
      return (this.#n?.cancel(e), t ? t.then(N).catch(N) : Promise.resolve());
    }
    destroy() {
      (super.destroy(), this.cancel({ silent: !0 }));
    }
    get resetState() {
      return this.#t;
    }
    reset() {
      (this.destroy(), this.setState(this.resetState));
    }
    isActive() {
      return this.observers.some((e) => z(e.options.enabled, this) !== !1);
    }
    isDisabled() {
      return this.getObserversCount() > 0
        ? !this.isActive()
        : this.options.queryFn === W || !this.isFetched();
    }
    isFetched() {
      return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
    }
    isStatic() {
      return this.getObserversCount() > 0
        ? this.observers.some((e) => te(e.options.staleTime, this) === "static")
        : !1;
    }
    isStale() {
      return this.getObserversCount() > 0
        ? this.observers.some((e) => e.getCurrentResult().isStale)
        : this.state.data === void 0 || this.state.isInvalidated;
    }
    isStaleByTime(e = 0) {
      return this.state.data === void 0
        ? !0
        : e === "static"
          ? !1
          : this.state.isInvalidated
            ? !0
            : !Ct(this.state.dataUpdatedAt, e);
    }
    onFocus() {
      (this.observers
        .find((t) => t.shouldFetchOnWindowFocus())
        ?.refetch({ cancelRefetch: !1 }),
        this.#n?.continue());
    }
    onOnline() {
      (this.observers
        .find((t) => t.shouldFetchOnReconnect())
        ?.refetch({ cancelRefetch: !1 }),
        this.#n?.continue());
    }
    addObserver(e) {
      this.observers.includes(e) ||
        (this.observers.push(e),
        this.clearGcTimeout(),
        this.#r.notify({ type: "observerAdded", query: this, observer: e }));
    }
    removeObserver(e) {
      this.observers.includes(e) &&
        ((this.observers = this.observers.filter((t) => t !== e)),
        this.observers.length ||
          (this.#n &&
            (this.#o || this.#a()
              ? this.#n.cancel({ revert: !0 })
              : this.#n.cancelRetry()),
          this.scheduleGc()),
        this.#r.notify({ type: "observerRemoved", query: this, observer: e }));
    }
    getObserversCount() {
      return this.observers.length;
    }
    #a() {
      return (
        this.state.fetchStatus === "paused" && this.state.status === "pending"
      );
    }
    invalidate() {
      this.state.isInvalidated || this.#u({ type: "invalidate" });
    }
    async fetch(e, t) {
      if (
        this.state.fetchStatus !== "idle" &&
        this.#n?.status() !== "rejected"
      ) {
        if (this.state.data !== void 0 && t?.cancelRefetch)
          this.cancel({ silent: !0 });
        else if (this.#n) return (this.#n.continueRetry(), this.#n.promise);
      }
      if ((e && this.setOptions(e), !this.options.queryFn)) {
        const a = this.observers.find((u) => u.options.queryFn);
        a && this.setOptions(a.options);
      }
      const r = new AbortController(),
        s = (a) => {
          Object.defineProperty(a, "signal", {
            enumerable: !0,
            get: () => ((this.#o = !0), r.signal),
          });
        },
        n = () => {
          const a = Rt(this.options, t),
            c = (() => {
              const l = {
                client: this.#s,
                queryKey: this.queryKey,
                meta: this.meta,
              };
              return (s(l), l);
            })();
          return (
            (this.#o = !1),
            this.options.persister ? this.options.persister(a, c, this) : a(c)
          );
        },
        o = (() => {
          const a = {
            fetchOptions: t,
            options: this.options,
            queryKey: this.queryKey,
            client: this.#s,
            state: this.state,
            fetchFn: n,
          };
          return (s(a), a);
        })();
      (this.options.behavior?.onFetch(o, this),
        (this.#e = this.state),
        (this.state.fetchStatus === "idle" ||
          this.state.fetchMeta !== o.fetchOptions?.meta) &&
          this.#u({ type: "fetch", meta: o.fetchOptions?.meta }),
        (this.#n = Qt({
          initialPromise: t?.initialPromise,
          fn: o.fetchFn,
          onCancel: (a) => {
            (a instanceof We &&
              a.revert &&
              this.setState({ ...this.#e, fetchStatus: "idle" }),
              r.abort());
          },
          onFail: (a, u) => {
            this.#u({ type: "failed", failureCount: a, error: u });
          },
          onPause: () => {
            this.#u({ type: "pause" });
          },
          onContinue: () => {
            this.#u({ type: "continue" });
          },
          retry: o.options.retry,
          retryDelay: o.options.retryDelay,
          networkMode: o.options.networkMode,
          canRun: () => !0,
        })));
      try {
        const a = await this.#n.start();
        if (a === void 0)
          throw new Error(`${this.queryHash} data is undefined`);
        return (
          this.setData(a),
          this.#r.config.onSuccess?.(a, this),
          this.#r.config.onSettled?.(a, this.state.error, this),
          a
        );
      } catch (a) {
        if (a instanceof We) {
          if (a.silent) return this.#n.promise;
          if (a.revert) {
            if (this.state.data === void 0) throw a;
            return this.state.data;
          }
        }
        throw (
          this.#u({ type: "error", error: a }),
          this.#r.config.onError?.(a, this),
          this.#r.config.onSettled?.(this.state.data, a, this),
          a
        );
      } finally {
        this.scheduleGc();
      }
    }
    #u(e) {
      const t = (r) => {
        switch (e.type) {
          case "failed":
            return {
              ...r,
              fetchFailureCount: e.failureCount,
              fetchFailureReason: e.error,
            };
          case "pause":
            return { ...r, fetchStatus: "paused" };
          case "continue":
            return { ...r, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...r,
              ...It(r.data, this.options),
              fetchMeta: e.meta ?? null,
            };
          case "success":
            const s = {
              ...r,
              ...dt(e.data, e.dataUpdatedAt),
              dataUpdateCount: r.dataUpdateCount + 1,
              ...(!e.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
            return ((this.#e = e.manual ? s : void 0), s);
          case "error":
            const n = e.error;
            return {
              ...r,
              error: n,
              errorUpdateCount: r.errorUpdateCount + 1,
              errorUpdatedAt: Date.now(),
              fetchFailureCount: r.fetchFailureCount + 1,
              fetchFailureReason: n,
              fetchStatus: "idle",
              status: "error",
              isInvalidated: !0,
            };
          case "invalidate":
            return { ...r, isInvalidated: !0 };
          case "setState":
            return { ...r, ...e.state };
        }
      };
      ((this.state = t(this.state)),
        k.batch(() => {
          (this.observers.forEach((r) => {
            r.onQueryUpdate();
          }),
            this.#r.notify({ query: this, type: "updated", action: e }));
        }));
    }
  };
function It(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Et(t.networkMode) ? "fetching" : "paused",
    ...(e === void 0 && { error: null, status: "pending" }),
  };
}
function dt(e, t) {
  return {
    data: e,
    dataUpdatedAt: t ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success",
  };
}
function pt(e) {
  const t =
      typeof e.initialData == "function" ? e.initialData() : e.initialData,
    r = t !== void 0,
    s = r
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: r ? (s ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: r ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var me = class extends ae {
  constructor(e, t) {
    (super(),
      (this.options = t),
      (this.#t = e),
      (this.#a = null),
      (this.#o = He()),
      this.bindMethods(),
      this.setOptions(t));
  }
  #t;
  #e = void 0;
  #r = void 0;
  #s = void 0;
  #n;
  #i;
  #o;
  #a;
  #u;
  #h;
  #d;
  #l;
  #f;
  #c;
  #p = new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 &&
      (this.#e.addObserver(this),
      yt(this.#e, this.options) ? this.#y() : this.updateResult(),
      this.#g());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Ge(this.#e, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return Ge(this.#e, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    ((this.listeners = new Set()),
      this.#O(),
      this.#P(),
      this.#e.removeObserver(this));
  }
  setOptions(e) {
    const t = this.options,
      r = this.#e;
    if (
      ((this.options = this.#t.defaultQueryOptions(e)),
      this.options.enabled !== void 0 &&
        typeof this.options.enabled != "boolean" &&
        typeof this.options.enabled != "function" &&
        typeof z(this.options.enabled, this.#e) != "boolean")
    )
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean",
      );
    (this.#x(),
      this.#e.setOptions(this.options),
      t._defaulted &&
        !ye(this.options, t) &&
        this.#t
          .getQueryCache()
          .notify({
            type: "observerOptionsUpdated",
            query: this.#e,
            observer: this,
          }));
    const s = this.hasListeners();
    (s && vt(this.#e, r, this.options, t) && this.#y(),
      this.updateResult(),
      s &&
        (this.#e !== r ||
          z(this.options.enabled, this.#e) !== z(t.enabled, this.#e) ||
          te(this.options.staleTime, this.#e) !== te(t.staleTime, this.#e)) &&
        this.#v());
    const n = this.#m();
    s &&
      (this.#e !== r ||
        z(this.options.enabled, this.#e) !== z(t.enabled, this.#e) ||
        n !== this.#c) &&
      this.#b(n);
  }
  getOptimisticResult(e) {
    const t = this.#t.getQueryCache().build(this.#t, e),
      r = this.createResult(t, e);
    return (
      Mr(this, r) &&
        ((this.#s = r), (this.#i = this.options), (this.#n = this.#e.state)),
      r
    );
  }
  getCurrentResult() {
    return this.#s;
  }
  trackResult(e, t) {
    return new Proxy(e, {
      get: (r, s) => (
        this.trackProp(s),
        t?.(s),
        s === "promise" &&
          (this.trackProp("data"),
          !this.options.experimental_prefetchInRender &&
            this.#o.status === "pending" &&
            this.#o.reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled",
              ),
            )),
        Reflect.get(r, s)
      ),
    });
  }
  trackProp(e) {
    this.#p.add(e);
  }
  getCurrentQuery() {
    return this.#e;
  }
  refetch({ ...e } = {}) {
    return this.fetch({ ...e });
  }
  fetchOptimistic(e) {
    const t = this.#t.defaultQueryOptions(e),
      r = this.#t.getQueryCache().build(this.#t, t);
    return r.fetch().then(() => this.createResult(r, t));
  }
  fetch(e) {
    return this.#y({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(
      () => (this.updateResult(), this.#s),
    );
  }
  #y(e) {
    this.#x();
    let t = this.#e.fetch(this.options, e);
    return (e?.throwOnError || (t = t.catch(N)), t);
  }
  #v() {
    this.#O();
    const e = te(this.options.staleTime, this.#e);
    if (ve.isServer() || this.#s.isStale || !Le(e)) return;
    const r = Ct(this.#s.dataUpdatedAt, e) + 1;
    this.#l = ie.setTimeout(() => {
      this.#s.isStale || this.updateResult();
    }, r);
  }
  #m() {
    return (
      (typeof this.options.refetchInterval == "function"
        ? this.options.refetchInterval(this.#e)
        : this.options.refetchInterval) ?? !1
    );
  }
  #b(e) {
    (this.#P(),
      (this.#c = e),
      !(
        ve.isServer() ||
        z(this.options.enabled, this.#e) === !1 ||
        !Le(this.#c) ||
        this.#c === 0
      ) &&
        (this.#f = ie.setInterval(() => {
          (this.options.refetchIntervalInBackground || Ze.isFocused()) &&
            this.#y();
        }, this.#c)));
  }
  #g() {
    (this.#v(), this.#b(this.#m()));
  }
  #O() {
    this.#l !== void 0 && (ie.clearTimeout(this.#l), (this.#l = void 0));
  }
  #P() {
    this.#f !== void 0 && (ie.clearInterval(this.#f), (this.#f = void 0));
  }
  createResult(e, t) {
    const r = this.#e,
      s = this.options,
      n = this.#s,
      i = this.#n,
      o = this.#i,
      u = e !== r ? e.state : this.#r,
      { state: c } = e;
    let l = { ...c },
      h = !1,
      p;
    if (t._optimisticResults) {
      const m = this.hasListeners(),
        O = !m && yt(e, t),
        w = m && vt(e, r, t, s);
      ((O || w) && (l = { ...l, ...It(c.data, e.options) }),
        t._optimisticResults === "isRestoring" && (l.fetchStatus = "idle"));
    }
    let { error: v, errorUpdatedAt: P, status: d } = l;
    p = l.data;
    let _ = !1;
    if (t.placeholderData !== void 0 && p === void 0 && d === "pending") {
      let m;
      (n?.isPlaceholderData && t.placeholderData === o?.placeholderData
        ? ((m = n.data), (_ = !0))
        : (m =
            typeof t.placeholderData == "function"
              ? t.placeholderData(this.#d?.state.data, this.#d)
              : t.placeholderData),
        m !== void 0 && ((d = "success"), (p = Ne(n?.data, m, t)), (h = !0)));
    }
    if (t.select && p !== void 0 && !_)
      if (n && p === i?.data && t.select === this.#u) p = this.#h;
      else
        try {
          ((this.#u = t.select),
            (p = t.select(p)),
            (p = Ne(n?.data, p, t)),
            (this.#h = p),
            (this.#a = null));
        } catch (m) {
          this.#a = m;
        }
    this.#a && ((v = this.#a), (p = this.#h), (P = Date.now()), (d = "error"));
    const E = l.fetchStatus === "fetching",
      I = d === "pending",
      J = d === "error",
      X = I && E,
      g = p !== void 0,
      f = {
        status: d,
        fetchStatus: l.fetchStatus,
        isPending: I,
        isSuccess: d === "success",
        isError: J,
        isInitialLoading: X,
        isLoading: X,
        data: p,
        dataUpdatedAt: l.dataUpdatedAt,
        error: v,
        errorUpdatedAt: P,
        failureCount: l.fetchFailureCount,
        failureReason: l.fetchFailureReason,
        errorUpdateCount: l.errorUpdateCount,
        isFetched: e.isFetched(),
        isFetchedAfterMount:
          l.dataUpdateCount > u.dataUpdateCount ||
          l.errorUpdateCount > u.errorUpdateCount,
        isFetching: E,
        isRefetching: E && !I,
        isLoadingError: J && !g,
        isPaused: l.fetchStatus === "paused",
        isPlaceholderData: h,
        isRefetchError: J && g,
        isStale: rt(e, t),
        refetch: this.refetch,
        promise: this.#o,
        isEnabled: z(t.enabled, e) !== !1,
      };
    if (this.options.experimental_prefetchInRender) {
      const m = f.data !== void 0,
        O = f.status === "error" && !m,
        w = (C) => {
          O ? C.reject(f.error) : m && C.resolve(f.data);
        },
        S = () => {
          const C = (this.#o = f.promise = He());
          w(C);
        },
        x = this.#o;
      switch (x.status) {
        case "pending":
          e.queryHash === r.queryHash && w(x);
          break;
        case "fulfilled":
          (O || f.data !== x.value) && S();
          break;
        case "rejected":
          (!O || f.error !== x.reason) && S();
          break;
      }
    }
    return f;
  }
  updateResult() {
    const e = this.#s,
      t = this.createResult(this.#e, this.options);
    if (
      ((this.#n = this.#e.state),
      (this.#i = this.options),
      this.#n.data !== void 0 && (this.#d = this.#e),
      ye(t, e))
    )
      return;
    this.#s = t;
    const r = () => {
      if (!e) return !0;
      const { notifyOnChangeProps: s } = this.options,
        n = typeof s == "function" ? s() : s;
      if (n === "all" || (!n && !this.#p.size)) return !0;
      const i = new Set(n ?? this.#p);
      return (
        this.options.throwOnError && i.add("error"),
        Object.keys(this.#s).some((o) => {
          const a = o;
          return this.#s[a] !== e[a] && i.has(a);
        })
      );
    };
    this.#w({ listeners: r() });
  }
  #x() {
    const e = this.#t.getQueryCache().build(this.#t, this.options);
    if (e === this.#e) return;
    const t = this.#e;
    ((this.#e = e),
      (this.#r = e.state),
      this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)));
  }
  onQueryUpdate() {
    (this.updateResult(), this.hasListeners() && this.#g());
  }
  #w(e) {
    k.batch(() => {
      (e.listeners &&
        this.listeners.forEach((t) => {
          t(this.#s);
        }),
        this.#t
          .getQueryCache()
          .notify({ query: this.#e, type: "observerResultsUpdated" }));
    });
  }
};
function Qr(e, t) {
  return (
    z(t.enabled, e) !== !1 &&
    e.state.data === void 0 &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function yt(e, t) {
  return Qr(e, t) || (e.state.data !== void 0 && Ge(e, t, t.refetchOnMount));
}
function Ge(e, t, r) {
  if (z(t.enabled, e) !== !1 && te(t.staleTime, e) !== "static") {
    const s = typeof r == "function" ? r(e) : r;
    return s === "always" || (s !== !1 && rt(e, t));
  }
  return !1;
}
function vt(e, t, r, s) {
  return (
    (e !== t || z(s.enabled, e) === !1) &&
    (!r.suspense || e.state.status !== "error") &&
    rt(e, r)
  );
}
function rt(e, t) {
  return z(t.enabled, e) !== !1 && e.isStaleByTime(te(t.staleTime, e));
}
function Mr(e, t) {
  return !ye(e.getCurrentResult(), t);
}
function Re(e) {
  return {
    onFetch: (t, r) => {
      const s = t.options,
        n = t.fetchOptions?.meta?.fetchMore?.direction,
        i = t.state.data?.pages || [],
        o = t.state.data?.pageParams || [];
      let a = { pages: [], pageParams: [] },
        u = 0;
      const c = async () => {
        let l = !1;
        const h = (P) => {
            Sr(
              P,
              () => t.signal,
              () => (l = !0),
            );
          },
          p = Rt(t.options, t.fetchOptions),
          v = async (P, d, _) => {
            if (l) return Promise.reject();
            if (d == null && P.pages.length) return Promise.resolve(P);
            const I = (() => {
                const b = {
                  client: t.client,
                  queryKey: t.queryKey,
                  pageParam: d,
                  direction: _ ? "backward" : "forward",
                  meta: t.options.meta,
                };
                return (h(b), b);
              })(),
              J = await p(I),
              { maxPages: X } = t.options,
              g = _ ? wr : xr;
            return {
              pages: g(P.pages, J, X),
              pageParams: g(P.pageParams, d, X),
            };
          };
        if (n && i.length) {
          const P = n === "backward",
            d = P ? qt : ze,
            _ = { pages: i, pageParams: o },
            E = d(s, _);
          a = await v(_, E, P);
        } else {
          const P = e ?? i.length;
          do {
            const d = u === 0 ? (o[0] ?? s.initialPageParam) : ze(s, a);
            if (u > 0 && d == null) break;
            ((a = await v(a, d)), u++);
          } while (u < P);
        }
        return a;
      };
      t.options.persister
        ? (t.fetchFn = () =>
            t.options.persister?.(
              c,
              {
                client: t.client,
                queryKey: t.queryKey,
                meta: t.options.meta,
                signal: t.signal,
              },
              r,
            ))
        : (t.fetchFn = c);
    },
  };
}
function ze(e, { pages: t, pageParams: r }) {
  const s = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[s], t, r[s], r) : void 0;
}
function qt(e, { pages: t, pageParams: r }) {
  return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, r[0], r) : void 0;
}
function Ir(e, t) {
  return t ? ze(e, t) != null : !1;
}
function qr(e, t) {
  return !t || !e.getPreviousPageParam ? !1 : qt(e, t) != null;
}
var Tt = class extends me {
    constructor(e, t) {
      super(e, t);
    }
    bindMethods() {
      (super.bindMethods(),
        (this.fetchNextPage = this.fetchNextPage.bind(this)),
        (this.fetchPreviousPage = this.fetchPreviousPage.bind(this)));
    }
    setOptions(e) {
      super.setOptions({ ...e, behavior: Re() });
    }
    getOptimisticResult(e) {
      return ((e.behavior = Re()), super.getOptimisticResult(e));
    }
    fetchNextPage(e) {
      return this.fetch({
        ...e,
        meta: { fetchMore: { direction: "forward" } },
      });
    }
    fetchPreviousPage(e) {
      return this.fetch({
        ...e,
        meta: { fetchMore: { direction: "backward" } },
      });
    }
    createResult(e, t) {
      const { state: r } = e,
        s = super.createResult(e, t),
        { isFetching: n, isRefetching: i, isError: o, isRefetchError: a } = s,
        u = r.fetchMeta?.fetchMore?.direction,
        c = o && u === "forward",
        l = n && u === "forward",
        h = o && u === "backward",
        p = n && u === "backward";
      return {
        ...s,
        fetchNextPage: this.fetchNextPage,
        fetchPreviousPage: this.fetchPreviousPage,
        hasNextPage: Ir(t, r.data),
        hasPreviousPage: qr(t, r.data),
        isFetchNextPageError: c,
        isFetchingNextPage: l,
        isFetchPreviousPageError: h,
        isFetchingPreviousPage: p,
        isRefetchError: a && !c && !h,
        isRefetching: i && !l && !p,
      };
    }
  },
  Tr = class extends Mt {
    #t;
    #e;
    #r;
    #s;
    constructor(e) {
      (super(),
        (this.#t = e.client),
        (this.mutationId = e.mutationId),
        (this.#r = e.mutationCache),
        (this.#e = []),
        (this.state = e.state || Dt()),
        this.setOptions(e.options),
        this.scheduleGc());
    }
    setOptions(e) {
      ((this.options = e), this.updateGcTime(this.options.gcTime));
    }
    get meta() {
      return this.options.meta;
    }
    addObserver(e) {
      this.#e.includes(e) ||
        (this.#e.push(e),
        this.clearGcTimeout(),
        this.#r.notify({ type: "observerAdded", mutation: this, observer: e }));
    }
    removeObserver(e) {
      ((this.#e = this.#e.filter((t) => t !== e)),
        this.scheduleGc(),
        this.#r.notify({
          type: "observerRemoved",
          mutation: this,
          observer: e,
        }));
    }
    optionalRemove() {
      this.#e.length ||
        (this.state.status === "pending"
          ? this.scheduleGc()
          : this.#r.remove(this));
    }
    continue() {
      return this.#s?.continue() ?? this.execute(this.state.variables);
    }
    async execute(e) {
      const t = () => {
          this.#n({ type: "continue" });
        },
        r = {
          client: this.#t,
          meta: this.options.meta,
          mutationKey: this.options.mutationKey,
        };
      this.#s = Qt({
        fn: () =>
          this.options.mutationFn
            ? this.options.mutationFn(e, r)
            : Promise.reject(new Error("No mutationFn found")),
        onFail: (i, o) => {
          this.#n({ type: "failed", failureCount: i, error: o });
        },
        onPause: () => {
          this.#n({ type: "pause" });
        },
        onContinue: t,
        retry: this.options.retry ?? 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode,
        canRun: () => this.#r.canRun(this),
      });
      const s = this.state.status === "pending",
        n = !this.#s.canStart();
      try {
        if (s) t();
        else {
          (this.#n({ type: "pending", variables: e, isPaused: n }),
            this.#r.config.onMutate &&
              (await this.#r.config.onMutate(e, this, r)));
          const o = await this.options.onMutate?.(e, r);
          o !== this.state.context &&
            this.#n({ type: "pending", context: o, variables: e, isPaused: n });
        }
        const i = await this.#s.start();
        return (
          await this.#r.config.onSuccess?.(i, e, this.state.context, this, r),
          await this.options.onSuccess?.(i, e, this.state.context, r),
          await this.#r.config.onSettled?.(
            i,
            null,
            this.state.variables,
            this.state.context,
            this,
            r,
          ),
          await this.options.onSettled?.(i, null, e, this.state.context, r),
          this.#n({ type: "success", data: i }),
          i
        );
      } catch (i) {
        try {
          await this.#r.config.onError?.(i, e, this.state.context, this, r);
        } catch (o) {
          Promise.reject(o);
        }
        try {
          await this.options.onError?.(i, e, this.state.context, r);
        } catch (o) {
          Promise.reject(o);
        }
        try {
          await this.#r.config.onSettled?.(
            void 0,
            i,
            this.state.variables,
            this.state.context,
            this,
            r,
          );
        } catch (o) {
          Promise.reject(o);
        }
        try {
          await this.options.onSettled?.(void 0, i, e, this.state.context, r);
        } catch (o) {
          Promise.reject(o);
        }
        throw (this.#n({ type: "error", error: i }), i);
      } finally {
        this.#r.runNext(this);
      }
    }
    #n(e) {
      const t = (r) => {
        switch (e.type) {
          case "failed":
            return {
              ...r,
              failureCount: e.failureCount,
              failureReason: e.error,
            };
          case "pause":
            return { ...r, isPaused: !0 };
          case "continue":
            return { ...r, isPaused: !1 };
          case "pending":
            return {
              ...r,
              context: e.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: e.isPaused,
              status: "pending",
              variables: e.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...r,
              data: e.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...r,
              data: void 0,
              error: e.error,
              failureCount: r.failureCount + 1,
              failureReason: e.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      ((this.state = t(this.state)),
        k.batch(() => {
          (this.#e.forEach((r) => {
            r.onMutationUpdate(e);
          }),
            this.#r.notify({ mutation: this, type: "updated", action: e }));
        }));
    }
  };
function Dt() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var Dr = class extends ae {
  constructor(e = {}) {
    (super(),
      (this.config = e),
      (this.#t = new Set()),
      (this.#e = new Map()),
      (this.#r = 0));
  }
  #t;
  #e;
  #r;
  build(e, t, r) {
    const s = new Tr({
      client: e,
      mutationCache: this,
      mutationId: ++this.#r,
      options: e.defaultMutationOptions(t),
      state: r,
    });
    return (this.add(s), s);
  }
  add(e) {
    this.#t.add(e);
    const t = Pe(e);
    if (typeof t == "string") {
      const r = this.#e.get(t);
      r ? r.push(e) : this.#e.set(t, [e]);
    }
    this.notify({ type: "added", mutation: e });
  }
  remove(e) {
    if (this.#t.delete(e)) {
      const t = Pe(e);
      if (typeof t == "string") {
        const r = this.#e.get(t);
        if (r)
          if (r.length > 1) {
            const s = r.indexOf(e);
            s !== -1 && r.splice(s, 1);
          } else r[0] === e && this.#e.delete(t);
      }
    }
    this.notify({ type: "removed", mutation: e });
  }
  canRun(e) {
    const t = Pe(e);
    if (typeof t == "string") {
      const s = this.#e.get(t)?.find((n) => n.state.status === "pending");
      return !s || s === e;
    } else return !0;
  }
  runNext(e) {
    const t = Pe(e);
    return typeof t == "string"
      ? (this.#e
          .get(t)
          ?.find((s) => s !== e && s.state.isPaused)
          ?.continue() ?? Promise.resolve())
      : Promise.resolve();
  }
  clear() {
    k.batch(() => {
      (this.#t.forEach((e) => {
        this.notify({ type: "removed", mutation: e });
      }),
        this.#t.clear(),
        this.#e.clear());
    });
  }
  getAll() {
    return Array.from(this.#t);
  }
  find(e) {
    const t = { exact: !0, ...e };
    return this.getAll().find((r) => lt(t, r));
  }
  findAll(e = {}) {
    return this.getAll().filter((t) => lt(e, t));
  }
  notify(e) {
    k.batch(() => {
      this.listeners.forEach((t) => {
        t(e);
      });
    });
  }
  resumePausedMutations() {
    const e = this.getAll().filter((t) => t.state.isPaused);
    return k.batch(() => Promise.all(e.map((t) => t.continue().catch(N))));
  }
};
function Pe(e) {
  return e.options.scope?.id;
}
var Fr = class extends ae {
  #t;
  #e = void 0;
  #r;
  #s;
  constructor(e, t) {
    (super(), (this.#t = e), this.setOptions(t), this.bindMethods(), this.#n());
  }
  bindMethods() {
    ((this.mutate = this.mutate.bind(this)),
      (this.reset = this.reset.bind(this)));
  }
  setOptions(e) {
    const t = this.options;
    ((this.options = this.#t.defaultMutationOptions(e)),
      ye(this.options, t) ||
        this.#t
          .getMutationCache()
          .notify({
            type: "observerOptionsUpdated",
            mutation: this.#r,
            observer: this,
          }),
      t?.mutationKey &&
      this.options.mutationKey &&
      re(t.mutationKey) !== re(this.options.mutationKey)
        ? this.reset()
        : this.#r?.state.status === "pending" &&
          this.#r.setOptions(this.options));
  }
  onUnsubscribe() {
    this.hasListeners() || this.#r?.removeObserver(this);
  }
  onMutationUpdate(e) {
    (this.#n(), this.#i(e));
  }
  getCurrentResult() {
    return this.#e;
  }
  reset() {
    (this.#r?.removeObserver(this), (this.#r = void 0), this.#n(), this.#i());
  }
  mutate(e, t) {
    return (
      (this.#s = t),
      this.#r?.removeObserver(this),
      (this.#r = this.#t.getMutationCache().build(this.#t, this.options)),
      this.#r.addObserver(this),
      this.#r.execute(e)
    );
  }
  #n() {
    const e = this.#r?.state ?? Dt();
    this.#e = {
      ...e,
      isPending: e.status === "pending",
      isSuccess: e.status === "success",
      isError: e.status === "error",
      isIdle: e.status === "idle",
      mutate: this.mutate,
      reset: this.reset,
    };
  }
  #i(e) {
    k.batch(() => {
      if (this.#s && this.hasListeners()) {
        const t = this.#e.variables,
          r = this.#e.context,
          s = {
            client: this.#t,
            meta: this.options.meta,
            mutationKey: this.options.mutationKey,
          };
        if (e?.type === "success") {
          try {
            this.#s.onSuccess?.(e.data, t, r, s);
          } catch (n) {
            Promise.reject(n);
          }
          try {
            this.#s.onSettled?.(e.data, null, t, r, s);
          } catch (n) {
            Promise.reject(n);
          }
        } else if (e?.type === "error") {
          try {
            this.#s.onError?.(e.error, t, r, s);
          } catch (n) {
            Promise.reject(n);
          }
          try {
            this.#s.onSettled?.(void 0, e.error, t, r, s);
          } catch (n) {
            Promise.reject(n);
          }
        }
      }
      this.listeners.forEach((t) => {
        t(this.#e);
      });
    });
  }
};
function mt(e, t) {
  const r = new Set(t);
  return e.filter((s) => !r.has(s));
}
function Ar(e, t, r) {
  const s = e.slice(0);
  return ((s[t] = r), s);
}
var kr = class extends ae {
    #t;
    #e;
    #r;
    #s;
    #n;
    #i;
    #o;
    #a;
    #u;
    #h = [];
    constructor(e, t, r) {
      (super(),
        (this.#t = e),
        (this.#s = r),
        (this.#r = []),
        (this.#n = []),
        (this.#e = []),
        this.setQueries(t));
    }
    onSubscribe() {
      this.listeners.size === 1 &&
        this.#n.forEach((e) => {
          e.subscribe((t) => {
            this.#c(e, t);
          });
        });
    }
    onUnsubscribe() {
      this.listeners.size || this.destroy();
    }
    destroy() {
      ((this.listeners = new Set()),
        this.#n.forEach((e) => {
          e.destroy();
        }));
    }
    setQueries(e, t) {
      ((this.#r = e),
        (this.#s = t),
        k.batch(() => {
          const r = this.#n,
            s = this.#f(this.#r);
          s.forEach((l) => l.observer.setOptions(l.defaultedQueryOptions));
          const n = s.map((l) => l.observer),
            i = n.map((l) => l.getCurrentResult()),
            o = r.length !== n.length,
            a = n.some((l, h) => l !== r[h]),
            u = o || a,
            c = u
              ? !0
              : i.some((l, h) => {
                  const p = this.#e[h];
                  return !p || !ye(l, p);
                });
          (!u && !c) ||
            (u && ((this.#h = s), (this.#n = n)),
            (this.#e = i),
            this.hasListeners() &&
              (u &&
                (mt(r, n).forEach((l) => {
                  l.destroy();
                }),
                mt(n, r).forEach((l) => {
                  l.subscribe((h) => {
                    this.#c(l, h);
                  });
                })),
              this.#p()));
        }));
    }
    getCurrentResult() {
      return this.#e;
    }
    getQueries() {
      return this.#n.map((e) => e.getCurrentQuery());
    }
    getObservers() {
      return this.#n;
    }
    getOptimisticResult(e, t) {
      const r = this.#f(e),
        s = r.map((i) =>
          i.observer.getOptimisticResult(i.defaultedQueryOptions),
        ),
        n = r.map((i) => i.defaultedQueryOptions.queryHash);
      return [s, (i) => this.#l(i ?? s, t, n), () => this.#d(s, r)];
    }
    #d(e, t) {
      return t.map((r, s) => {
        const n = e[s];
        return r.defaultedQueryOptions.notifyOnChangeProps
          ? n
          : r.observer.trackResult(n, (i) => {
              t.forEach((o) => {
                o.observer.trackProp(i);
              });
            });
      });
    }
    #l(e, t, r) {
      if (t) {
        const s = this.#u,
          n =
            r !== void 0 &&
            s !== void 0 &&
            (s.length !== r.length || r.some((i, o) => i !== s[o]));
        return (
          (!this.#i || this.#e !== this.#a || n || t !== this.#o) &&
            ((this.#o = t),
            (this.#a = this.#e),
            r !== void 0 && (this.#u = r),
            (this.#i = et(this.#i, t(e)))),
          this.#i
        );
      }
      return e;
    }
    #f(e) {
      const t = new Map();
      this.#n.forEach((s) => {
        const n = s.options.queryHash;
        if (!n) return;
        const i = t.get(n);
        i ? i.push(s) : t.set(n, [s]);
      });
      const r = [];
      return (
        e.forEach((s) => {
          const n = this.#t.defaultQueryOptions(s),
            o = t.get(n.queryHash)?.shift() ?? new me(this.#t, n);
          r.push({ defaultedQueryOptions: n, observer: o });
        }),
        r
      );
    }
    #c(e, t) {
      const r = this.#n.indexOf(e);
      r !== -1 && ((this.#e = Ar(this.#e, r, t)), this.#p());
    }
    #p() {
      if (this.hasListeners()) {
        const e = this.#i,
          t = this.#d(this.#e, this.#h),
          r = this.#l(t, this.#s?.combine);
        e !== r &&
          k.batch(() => {
            this.listeners.forEach((s) => {
              s(this.#e);
            });
          });
      }
    }
  },
  Ur = class extends ae {
    constructor(e = {}) {
      (super(), (this.config = e), (this.#t = new Map()));
    }
    #t;
    build(e, t, r) {
      const s = t.queryKey,
        n = t.queryHash ?? Xe(s, t);
      let i = this.get(n);
      return (
        i ||
          ((i = new Er({
            client: e,
            queryKey: s,
            queryHash: n,
            options: e.defaultQueryOptions(t),
            state: r,
            defaultOptions: e.getQueryDefaults(s),
          })),
          this.add(i)),
        i
      );
    }
    add(e) {
      this.#t.has(e.queryHash) ||
        (this.#t.set(e.queryHash, e), this.notify({ type: "added", query: e }));
    }
    remove(e) {
      const t = this.#t.get(e.queryHash);
      t &&
        (e.destroy(),
        t === e && this.#t.delete(e.queryHash),
        this.notify({ type: "removed", query: e }));
    }
    clear() {
      k.batch(() => {
        this.getAll().forEach((e) => {
          this.remove(e);
        });
      });
    }
    get(e) {
      return this.#t.get(e);
    }
    getAll() {
      return [...this.#t.values()];
    }
    find(e) {
      const t = { exact: !0, ...e };
      return this.getAll().find((r) => ct(t, r));
    }
    findAll(e = {}) {
      const t = this.getAll();
      return Object.keys(e).length > 0 ? t.filter((r) => ct(e, r)) : t;
    }
    notify(e) {
      k.batch(() => {
        this.listeners.forEach((t) => {
          t(e);
        });
      });
    }
    onFocus() {
      k.batch(() => {
        this.getAll().forEach((e) => {
          e.onFocus();
        });
      });
    }
    onOnline() {
      k.batch(() => {
        this.getAll().forEach((e) => {
          e.onOnline();
        });
      });
    }
  },
  Os = class {
    #t;
    #e;
    #r;
    #s;
    #n;
    #i;
    #o;
    #a;
    constructor(e = {}) {
      ((this.#t = e.queryCache || new Ur()),
        (this.#e = e.mutationCache || new Dr()),
        (this.#r = e.defaultOptions || {}),
        (this.#s = new Map()),
        (this.#n = new Map()),
        (this.#i = 0));
    }
    mount() {
      (this.#i++,
        this.#i === 1 &&
          ((this.#o = Ze.subscribe(async (e) => {
            e && (await this.resumePausedMutations(), this.#t.onFocus());
          })),
          (this.#a = Ce.subscribe(async (e) => {
            e && (await this.resumePausedMutations(), this.#t.onOnline());
          }))));
    }
    unmount() {
      (this.#i--,
        this.#i === 0 &&
          (this.#o?.(), (this.#o = void 0), this.#a?.(), (this.#a = void 0)));
    }
    isFetching(e) {
      return this.#t.findAll({ ...e, fetchStatus: "fetching" }).length;
    }
    isMutating(e) {
      return this.#e.findAll({ ...e, status: "pending" }).length;
    }
    getQueryData(e) {
      const t = this.defaultQueryOptions({ queryKey: e });
      return this.#t.get(t.queryHash)?.state.data;
    }
    ensureQueryData(e) {
      const t = this.defaultQueryOptions(e),
        r = this.#t.build(this, t),
        s = r.state.data;
      return s === void 0
        ? this.fetchQuery(e)
        : (e.revalidateIfStale &&
            r.isStaleByTime(te(t.staleTime, r)) &&
            this.prefetchQuery(t),
          Promise.resolve(s));
    }
    getQueriesData(e) {
      return this.#t.findAll(e).map(({ queryKey: t, state: r }) => {
        const s = r.data;
        return [t, s];
      });
    }
    setQueryData(e, t, r) {
      const s = this.defaultQueryOptions({ queryKey: e }),
        i = this.#t.get(s.queryHash)?.state.data,
        o = gr(t, i);
      if (o !== void 0)
        return this.#t.build(this, s).setData(o, { ...r, manual: !0 });
    }
    setQueriesData(e, t, r) {
      return k.batch(() =>
        this.#t
          .findAll(e)
          .map(({ queryKey: s }) => [s, this.setQueryData(s, t, r)]),
      );
    }
    getQueryState(e) {
      const t = this.defaultQueryOptions({ queryKey: e });
      return this.#t.get(t.queryHash)?.state;
    }
    removeQueries(e) {
      const t = this.#t;
      k.batch(() => {
        t.findAll(e).forEach((r) => {
          t.remove(r);
        });
      });
    }
    resetQueries(e, t) {
      const r = this.#t;
      return k.batch(
        () => (
          r.findAll(e).forEach((s) => {
            s.reset();
          }),
          this.refetchQueries({ type: "active", ...e }, t)
        ),
      );
    }
    cancelQueries(e, t = {}) {
      const r = { revert: !0, ...t },
        s = k.batch(() => this.#t.findAll(e).map((n) => n.cancel(r)));
      return Promise.all(s).then(N).catch(N);
    }
    invalidateQueries(e, t = {}) {
      return k.batch(
        () => (
          this.#t.findAll(e).forEach((r) => {
            r.invalidate();
          }),
          e?.refetchType === "none"
            ? Promise.resolve()
            : this.refetchQueries(
                { ...e, type: e?.refetchType ?? e?.type ?? "active" },
                t,
              )
        ),
      );
    }
    refetchQueries(e, t = {}) {
      const r = { ...t, cancelRefetch: t.cancelRefetch ?? !0 },
        s = k.batch(() =>
          this.#t
            .findAll(e)
            .filter((n) => !n.isDisabled() && !n.isStatic())
            .map((n) => {
              let i = n.fetch(void 0, r);
              return (
                r.throwOnError || (i = i.catch(N)),
                n.state.fetchStatus === "paused" ? Promise.resolve() : i
              );
            }),
        );
      return Promise.all(s).then(N);
    }
    fetchQuery(e) {
      const t = this.defaultQueryOptions(e);
      t.retry === void 0 && (t.retry = !1);
      const r = this.#t.build(this, t);
      return r.isStaleByTime(te(t.staleTime, r))
        ? r.fetch(t)
        : Promise.resolve(r.state.data);
    }
    prefetchQuery(e) {
      return this.fetchQuery(e).then(N).catch(N);
    }
    fetchInfiniteQuery(e) {
      return ((e.behavior = Re(e.pages)), this.fetchQuery(e));
    }
    prefetchInfiniteQuery(e) {
      return this.fetchInfiniteQuery(e).then(N).catch(N);
    }
    ensureInfiniteQueryData(e) {
      return ((e.behavior = Re(e.pages)), this.ensureQueryData(e));
    }
    resumePausedMutations() {
      return Ce.isOnline()
        ? this.#e.resumePausedMutations()
        : Promise.resolve();
    }
    getQueryCache() {
      return this.#t;
    }
    getMutationCache() {
      return this.#e;
    }
    getDefaultOptions() {
      return this.#r;
    }
    setDefaultOptions(e) {
      this.#r = e;
    }
    setQueryDefaults(e, t) {
      this.#s.set(re(e), { queryKey: e, defaultOptions: t });
    }
    getQueryDefaults(e) {
      const t = [...this.#s.values()],
        r = {};
      return (
        t.forEach((s) => {
          pe(e, s.queryKey) && Object.assign(r, s.defaultOptions);
        }),
        r
      );
    }
    setMutationDefaults(e, t) {
      this.#n.set(re(e), { mutationKey: e, defaultOptions: t });
    }
    getMutationDefaults(e) {
      const t = [...this.#n.values()],
        r = {};
      return (
        t.forEach((s) => {
          pe(e, s.mutationKey) && Object.assign(r, s.defaultOptions);
        }),
        r
      );
    }
    defaultQueryOptions(e) {
      if (e._defaulted) return e;
      const t = {
        ...this.#r.queries,
        ...this.getQueryDefaults(e.queryKey),
        ...e,
        _defaulted: !0,
      };
      return (
        t.queryHash || (t.queryHash = Xe(t.queryKey, t)),
        t.refetchOnReconnect === void 0 &&
          (t.refetchOnReconnect = t.networkMode !== "always"),
        t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
        !t.networkMode && t.persister && (t.networkMode = "offlineFirst"),
        t.queryFn === W && (t.enabled = !1),
        t
      );
    }
    defaultMutationOptions(e) {
      return e?._defaulted
        ? e
        : {
            ...this.#r.mutations,
            ...(e?.mutationKey && this.getMutationDefaults(e.mutationKey)),
            ...e,
            _defaulted: !0,
          };
    }
    clear() {
      (this.#t.clear(), this.#e.clear());
    }
  },
  Ft = j.createContext(void 0),
  be = (e) => {
    const t = j.useContext(Ft);
    if (e) return e;
    if (!t)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return t;
  },
  Ps = ({ client: e, children: t }) => (
    j.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e],
    ),
    jt.jsx(Ft.Provider, { value: e, children: t })
  ),
  At = j.createContext(!1),
  kt = () => j.useContext(At);
At.Provider;
function $r() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var Lr = j.createContext($r()),
  Ut = () => j.useContext(Lr),
  $t = (e, t, r) => {
    const s =
      r?.state.error && typeof e.throwOnError == "function"
        ? tt(e.throwOnError, [r.state.error, r])
        : e.throwOnError;
    (e.suspense || e.experimental_prefetchInRender || s) &&
      (t.isReset() || (e.retryOnMount = !1));
  },
  Lt = (e) => {
    j.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  Kt = ({
    result: e,
    errorResetBoundary: t,
    throwOnError: r,
    query: s,
    suspense: n,
  }) =>
    e.isError &&
    !t.isReset() &&
    !e.isFetching &&
    s &&
    ((n && e.data === void 0) || tt(r, [e.error, s])),
  nt = (e, t) => t.state.data === void 0,
  Nt = (e) => {
    if (e.suspense) {
      const r = (n) => (n === "static" ? n : Math.max(n ?? 1e3, 1e3)),
        s = e.staleTime;
      ((e.staleTime = typeof s == "function" ? (...n) => r(s(...n)) : r(s)),
        typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3)));
    }
  },
  Kr = (e, t) => e.isLoading && e.isFetching && !t,
  Be = (e, t) => e?.suspense && t.isPending,
  Je = (e, t, r) =>
    t.fetchOptimistic(e).catch(() => {
      r.clearReset();
    });
function Ht({ queries: e, ...t }, r) {
  const s = be(r),
    n = kt(),
    i = Ut(),
    o = j.useMemo(
      () =>
        e.map((d) => {
          const _ = s.defaultQueryOptions(d);
          return ((_._optimisticResults = n ? "isRestoring" : "optimistic"), _);
        }),
      [e, s, n],
    );
  (o.forEach((d) => {
    Nt(d);
    const _ = s.getQueryCache().get(d.queryHash);
    $t(d, i, _);
  }),
    Lt(i));
  const [a] = j.useState(() => new kr(s, o, t)),
    [u, c, l] = a.getOptimisticResult(o, t.combine),
    h = !n && t.subscribed !== !1;
  (j.useSyncExternalStore(
    j.useCallback((d) => (h ? a.subscribe(k.batchCalls(d)) : N), [a, h]),
    () => a.getCurrentResult(),
    () => a.getCurrentResult(),
  ),
    j.useEffect(() => {
      a.setQueries(o, t);
    }, [o, t, a]));
  const v = u.some((d, _) => Be(o[_], d))
    ? u.flatMap((d, _) => {
        const E = o[_];
        if (E && Be(E, d)) {
          const I = new me(s, E);
          return Je(E, I, i);
        }
        return [];
      })
    : [];
  if (v.length > 0) throw Promise.all(v);
  const P = u.find((d, _) => {
    const E = o[_];
    return (
      E &&
      Kt({
        result: d,
        errorResetBoundary: i,
        throwOnError: E.throwOnError,
        query: s.getQueryCache().get(E.queryHash),
        suspense: E.suspense,
      })
    );
  });
  if (P?.error) throw P.error;
  return c(l());
}
function Qe(e, t, r) {
  const s = kt(),
    n = Ut(),
    i = be(r),
    o = i.defaultQueryOptions(e);
  i.getDefaultOptions().queries?._experimental_beforeQuery?.(o);
  const a = i.getQueryCache().get(o.queryHash);
  ((o._optimisticResults = s ? "isRestoring" : "optimistic"),
    Nt(o),
    $t(o, n, a),
    Lt(n));
  const u = !i.getQueryCache().get(o.queryHash),
    [c] = j.useState(() => new t(i, o)),
    l = c.getOptimisticResult(o),
    h = !s && e.subscribed !== !1;
  if (
    (j.useSyncExternalStore(
      j.useCallback(
        (p) => {
          const v = h ? c.subscribe(k.batchCalls(p)) : N;
          return (c.updateResult(), v);
        },
        [c, h],
      ),
      () => c.getCurrentResult(),
      () => c.getCurrentResult(),
    ),
    j.useEffect(() => {
      c.setOptions(o);
    }, [o, c]),
    Be(o, l))
  )
    throw Je(o, c, n);
  if (
    Kt({
      result: l,
      errorResetBoundary: n,
      throwOnError: o.throwOnError,
      query: a,
      suspense: o.suspense,
    })
  )
    throw l.error;
  return (
    i.getDefaultOptions().queries?._experimental_afterQuery?.(o, l),
    o.experimental_prefetchInRender &&
      !ve.isServer() &&
      Kr(l, s) &&
      (u ? Je(o, c, n) : a?.promise)?.catch(N).finally(() => {
        c.updateResult();
      }),
    o.notifyOnChangeProps ? l : c.trackResult(l)
  );
}
function Nr(e, t) {
  return Qe(e, me, t);
}
function Hr(e, t) {
  return Qe(
    {
      ...e,
      enabled: !0,
      suspense: !0,
      throwOnError: nt,
      placeholderData: void 0,
    },
    me,
    t,
  );
}
function Wr(e, t) {
  return Qe({ ...e, enabled: !0, suspense: !0, throwOnError: nt }, Tt, t);
}
function Gr(e, t) {
  return Ht(
    {
      ...e,
      queries: e.queries.map((r) => ({
        ...r,
        suspense: !0,
        throwOnError: nt,
        enabled: !0,
        placeholderData: void 0,
      })),
    },
    t,
  );
}
function zr(e, t) {
  const r = be(t);
  r.getQueryState(e.queryKey) || r.prefetchQuery(e);
}
function Br(e, t) {
  const r = be(t);
  r.getQueryState(e.queryKey) || r.prefetchInfiniteQuery(e);
}
function Jr(e, t) {
  const r = be(t),
    [s] = j.useState(() => new Fr(r, e));
  j.useEffect(() => {
    s.setOptions(e);
  }, [s, e]);
  const n = j.useSyncExternalStore(
      j.useCallback((o) => s.subscribe(k.batchCalls(o)), [s]),
      () => s.getCurrentResult(),
      () => s.getCurrentResult(),
    ),
    i = j.useCallback(
      (o, a) => {
        s.mutate(o, a).catch(N);
      },
      [s],
    );
  if (n.error && tt(s.options.throwOnError, [n.error])) throw n.error;
  return { ...n, mutate: i, mutateAsync: n.mutate };
}
function Yr(e, t) {
  return Qe(e, Tt, t);
}
var Vr = Object.create,
  Wt = Object.defineProperty,
  Zr = Object.getOwnPropertyDescriptor,
  Gt = Object.getOwnPropertyNames,
  Xr = Object.getPrototypeOf,
  en = Object.prototype.hasOwnProperty,
  V = (e, t) =>
    function () {
      return (
        t || (0, e[Gt(e)[0]])((t = { exports: {} }).exports, t),
        t.exports
      );
    },
  tn = (e, t, r, s) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (var n = Gt(t), i = 0, o = n.length, a; i < o; i++)
        ((a = n[i]),
          !en.call(e, a) &&
            a !== r &&
            Wt(e, a, {
              get: ((u) => t[u]).bind(null, a),
              enumerable: !(s = Zr(t, a)) || s.enumerable,
            }));
    return e;
  },
  U = (e, t, r) => (
    (r = e != null ? Vr(Xr(e)) : {}),
    tn(
      t || !e || !e.__esModule
        ? Wt(r, "default", { value: e, enumerable: !0 })
        : r,
      e,
    )
  ),
  zt = V({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(
      e,
      t,
    ) {
      function r(s) {
        "@babel/helpers - typeof";
        return (
          (t.exports = r =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (n) {
                  return typeof n;
                }
              : function (n) {
                  return n &&
                    typeof Symbol == "function" &&
                    n.constructor === Symbol &&
                    n !== Symbol.prototype
                    ? "symbol"
                    : typeof n;
                }),
          (t.exports.__esModule = !0),
          (t.exports.default = t.exports),
          r(s)
        );
      }
      ((t.exports = r),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  rn = V({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(
      e,
      t,
    ) {
      var r = zt().default;
      function s(n, i) {
        if (r(n) != "object" || !n) return n;
        var o = n[Symbol.toPrimitive];
        if (o !== void 0) {
          var a = o.call(n, i || "default");
          if (r(a) != "object") return a;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (i === "string" ? String : Number)(n);
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  nn = V({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(
      e,
      t,
    ) {
      var r = zt().default,
        s = rn();
      function n(i) {
        var o = s(i, "string");
        return r(o) == "symbol" ? o : o + "";
      }
      ((t.exports = n),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  ue = V({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(
      e,
      t,
    ) {
      var r = nn();
      function s(n, i, o) {
        return (
          (i = r(i)) in n
            ? Object.defineProperty(n, i, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (n[i] = o),
          n
        );
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  B = V({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(
      e,
      t,
    ) {
      var r = ue();
      function s(i, o) {
        var a = Object.keys(i);
        if (Object.getOwnPropertySymbols) {
          var u = Object.getOwnPropertySymbols(i);
          (o &&
            (u = u.filter(function (c) {
              return Object.getOwnPropertyDescriptor(i, c).enumerable;
            })),
            a.push.apply(a, u));
        }
        return a;
      }
      function n(i) {
        for (var o = 1; o < arguments.length; o++) {
          var a = arguments[o] != null ? arguments[o] : {};
          o % 2
            ? s(Object(a), !0).forEach(function (u) {
                r(i, u, a[u]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(a))
              : s(Object(a)).forEach(function (u) {
                  Object.defineProperty(
                    i,
                    u,
                    Object.getOwnPropertyDescriptor(a, u),
                  );
                });
        }
        return i;
      }
      ((t.exports = n),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  });
function Me(e) {
  const t = {
    subscribe(r) {
      let s = null,
        n = !1,
        i = !1,
        o = !1;
      function a() {
        if (s === null) {
          o = !0;
          return;
        }
        i || ((i = !0), typeof s == "function" ? s() : s && s.unsubscribe());
      }
      return (
        (s = e({
          next(u) {
            var c;
            n || (c = r.next) === null || c === void 0 || c.call(r, u);
          },
          error(u) {
            var c;
            n ||
              ((n = !0),
              (c = r.error) === null || c === void 0 || c.call(r, u),
              a());
          },
          complete() {
            var u;
            n ||
              ((n = !0),
              (u = r.complete) === null || u === void 0 || u.call(r),
              a());
          },
        })),
        o && a(),
        { unsubscribe: a }
      );
    },
    pipe(...r) {
      return r.reduce(sn, t);
    },
  };
  return t;
}
function sn(e, t) {
  return t(e);
}
function on(e) {
  const t = new AbortController();
  return new Promise((s, n) => {
    let i = !1;
    function o() {
      i || ((i = !0), a.unsubscribe());
    }
    t.signal.addEventListener("abort", () => {
      n(t.signal.reason);
    });
    const a = e.subscribe({
      next(u) {
        ((i = !0), s(u), o());
      },
      error(u) {
        n(u);
      },
      complete() {
        (t.abort(), o());
      },
    });
  });
}
function an(e) {
  return (t) => {
    let r = 0,
      s = null;
    const n = [];
    function i() {
      s ||
        (s = t.subscribe({
          next(a) {
            for (const c of n) {
              var u;
              (u = c.next) === null || u === void 0 || u.call(c, a);
            }
          },
          error(a) {
            for (const c of n) {
              var u;
              (u = c.error) === null || u === void 0 || u.call(c, a);
            }
          },
          complete() {
            for (const u of n) {
              var a;
              (a = u.complete) === null || a === void 0 || a.call(u);
            }
          },
        }));
    }
    function o() {
      if (r === 0 && s) {
        const a = s;
        ((s = null), a.unsubscribe());
      }
    }
    return Me(
      (a) => (
        r++,
        n.push(a),
        i(),
        {
          unsubscribe() {
            (r--, o());
            const u = n.findIndex((c) => c === a);
            u > -1 && n.splice(u, 1);
          },
        }
      ),
    );
  };
}
function un(e) {
  let t = e;
  const r = [],
    s = (o) => {
      (t !== void 0 && o.next(t), r.push(o));
    },
    n = (o) => {
      r.splice(r.indexOf(o), 1);
    },
    i = Me(
      (o) => (
        s(o),
        () => {
          n(o);
        }
      ),
    );
  return (
    (i.next = (o) => {
      if (t !== o) {
        t = o;
        for (const a of r) a.next(o);
      }
    }),
    (i.get = () => t),
    i
  );
}
function cn(e) {
  return Me((t) => {
    function r(n = 0, i = e.op) {
      const o = e.links[n];
      if (!o)
        throw new Error(
          "No more links to execute - did you forget to add an ending link?",
        );
      return o({
        op: i,
        next(u) {
          return r(n + 1, u);
        },
      });
    }
    return r().subscribe(t);
  });
}
function oe(e) {
  return !!e && !Array.isArray(e) && typeof e == "object";
}
function ln() {
  return Object.create(null);
}
const fn = typeof Symbol == "function" && !!Symbol.asyncIterator;
function Bt(e) {
  return fn && oe(e) && Symbol.asyncIterator in e;
}
var hn = Object.create,
  Jt = Object.defineProperty,
  dn = Object.getOwnPropertyDescriptor,
  Yt = Object.getOwnPropertyNames,
  pn = Object.getPrototypeOf,
  yn = Object.prototype.hasOwnProperty,
  ge = (e, t) =>
    function () {
      return (
        t || (0, e[Yt(e)[0]])((t = { exports: {} }).exports, t),
        t.exports
      );
    },
  vn = (e, t, r, s) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (var n = Yt(t), i = 0, o = n.length, a; i < o; i++)
        ((a = n[i]),
          !yn.call(e, a) &&
            a !== r &&
            Jt(e, a, {
              get: ((u) => t[u]).bind(null, a),
              enumerable: !(s = dn(t, a)) || s.enumerable,
            }));
    return e;
  },
  Ie = (e, t, r) => (
    (r = e != null ? hn(pn(e)) : {}),
    vn(Jt(r, "default", { value: e, enumerable: !0 }), e)
  );
const Vt = () => {},
  bt = (e) => {
    Object.freeze && Object.freeze(e);
  };
function Zt(e, t, r) {
  var s;
  const n = t.join(".");
  return (
    ((s = r[n]) !== null && s !== void 0) ||
      (r[n] = new Proxy(Vt, {
        get(i, o) {
          if (!(typeof o != "string" || o === "then"))
            return Zt(e, [...t, o], r);
        },
        apply(i, o, a) {
          const u = t[t.length - 1];
          let c = { args: a, path: t };
          return (
            u === "call"
              ? (c = {
                  args: a.length >= 2 ? [a[1]] : [],
                  path: t.slice(0, -1),
                })
              : u === "apply" &&
                (c = { args: a.length >= 2 ? a[1] : [], path: t.slice(0, -1) }),
            bt(c.args),
            bt(c.path),
            e(c)
          );
        },
      })),
    r[n]
  );
}
const qe = (e) => Zt(e, [], ln()),
  st = (e) =>
    new Proxy(Vt, {
      get(t, r) {
        if (r !== "then") return e(r);
      },
    });
var Xt = ge({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(
      e,
      t,
    ) {
      function r(s) {
        "@babel/helpers - typeof";
        return (
          (t.exports = r =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (n) {
                  return typeof n;
                }
              : function (n) {
                  return n &&
                    typeof Symbol == "function" &&
                    n.constructor === Symbol &&
                    n !== Symbol.prototype
                    ? "symbol"
                    : typeof n;
                }),
          (t.exports.__esModule = !0),
          (t.exports.default = t.exports),
          r(s)
        );
      }
      ((t.exports = r),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  mn = ge({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(
      e,
      t,
    ) {
      var r = Xt().default;
      function s(n, i) {
        if (r(n) != "object" || !n) return n;
        var o = n[Symbol.toPrimitive];
        if (o !== void 0) {
          var a = o.call(n, i || "default");
          if (r(a) != "object") return a;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (i === "string" ? String : Number)(n);
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  bn = ge({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(
      e,
      t,
    ) {
      var r = Xt().default,
        s = mn();
      function n(i) {
        var o = s(i, "string");
        return r(o) == "symbol" ? o : o + "";
      }
      ((t.exports = n),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  er = ge({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(
      e,
      t,
    ) {
      var r = bn();
      function s(n, i, o) {
        return (
          (i = r(i)) in n
            ? Object.defineProperty(n, i, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (n[i] = o),
          n
        );
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  it = ge({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(
      e,
      t,
    ) {
      var r = er();
      function s(i, o) {
        var a = Object.keys(i);
        if (Object.getOwnPropertySymbols) {
          var u = Object.getOwnPropertySymbols(i);
          (o &&
            (u = u.filter(function (c) {
              return Object.getOwnPropertyDescriptor(i, c).enumerable;
            })),
            a.push.apply(a, u));
        }
        return a;
      }
      function n(i) {
        for (var o = 1; o < arguments.length; o++) {
          var a = arguments[o] != null ? arguments[o] : {};
          o % 2
            ? s(Object(a), !0).forEach(function (u) {
                r(i, u, a[u]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(a))
              : s(Object(a)).forEach(function (u) {
                  Object.defineProperty(
                    i,
                    u,
                    Object.getOwnPropertyDescriptor(a, u),
                  );
                });
        }
        return i;
      }
      ((t.exports = n),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  });
Ie(it());
Ie(er());
var xe = Ie(it());
function gn(e, t) {
  if ("error" in e) {
    const s = t.deserialize(e.error);
    return {
      ok: !1,
      error: (0, xe.default)((0, xe.default)({}, e), {}, { error: s }),
    };
  }
  return {
    ok: !0,
    result: (0, xe.default)(
      (0, xe.default)({}, e.result),
      (!e.result.type || e.result.type === "data") && {
        type: "data",
        data: t.deserialize(e.result.data),
      },
    ),
  };
}
var Ae = class extends Error {
  constructor() {
    super("Unable to transform response from server");
  }
};
function On(e, t) {
  let r;
  try {
    r = gn(e, t);
  } catch {
    throw new Ae();
  }
  if (!r.ok && (!oe(r.error.error) || typeof r.error.error.code != "number"))
    throw new Ae();
  if (r.ok && !oe(r.result)) throw new Ae();
  return r;
}
Ie(it());
var we = U(ue(), 1),
  le = U(B(), 1);
function Pn(e) {
  return e instanceof Ee;
}
function xn(e) {
  return (
    oe(e) &&
    oe(e.error) &&
    typeof e.error.code == "number" &&
    typeof e.error.message == "string"
  );
}
function wn(e, t) {
  return typeof e == "string"
    ? e
    : oe(e) && typeof e.message == "string"
      ? e.message
      : t;
}
var Ee = class _e extends Error {
  constructor(t, r) {
    var s, n;
    const i = r?.cause;
    (super(t, { cause: i }),
      (0, we.default)(this, "cause", void 0),
      (0, we.default)(this, "shape", void 0),
      (0, we.default)(this, "data", void 0),
      (0, we.default)(this, "meta", void 0),
      (this.meta = r?.meta),
      (this.cause = i),
      (this.shape =
        r == null || (s = r.result) === null || s === void 0
          ? void 0
          : s.error),
      (this.data =
        r == null || (n = r.result) === null || n === void 0
          ? void 0
          : n.error.data),
      (this.name = "TRPCClientError"),
      Object.setPrototypeOf(this, _e.prototype));
  }
  static from(t, r = {}) {
    const s = t;
    return Pn(s)
      ? (r.meta &&
          (s.meta = (0, le.default)((0, le.default)({}, s.meta), r.meta)),
        s)
      : xn(s)
        ? new _e(
            s.error.message,
            (0, le.default)(
              (0, le.default)({}, r),
              {},
              { result: s, cause: r.cause },
            ),
          )
        : new _e(
            wn(s, "Unknown error"),
            (0, le.default)((0, le.default)({}, r), {}, { cause: s }),
          );
  }
};
function Sn(e) {
  const t = e;
  return t
    ? "input" in t
      ? t
      : { input: t, output: t }
    : {
        input: { serialize: (r) => r, deserialize: (r) => r },
        output: { serialize: (r) => r, deserialize: (r) => r },
      };
}
const gt = (e) => typeof e == "function";
function _n(e) {
  if (e) return e;
  if (typeof window < "u" && gt(window.fetch)) return window.fetch;
  if (typeof globalThis < "u" && gt(globalThis.fetch)) return globalThis.fetch;
  throw new Error("No fetch implementation found");
}
var de = U(B());
function jn(e) {
  return {
    url: e.url.toString(),
    fetch: e.fetch,
    transformer: Sn(e.transformer),
    methodOverride: e.methodOverride,
  };
}
function Cn(e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    t[r] = s;
  }
  return t;
}
const Rn = { query: "GET", mutation: "POST", subscription: "PATCH" };
function tr(e) {
  return "input" in e
    ? e.transformer.input.serialize(e.input)
    : Cn(e.inputs.map((t) => e.transformer.input.serialize(t)));
}
const rr = (e) => {
    const t = e.url.split("?");
    let s = t[0].replace(/\/$/, "") + "/" + e.path;
    const n = [];
    if (
      (t[1] && n.push(t[1]),
      "inputs" in e && n.push("batch=1"),
      e.type === "query" || e.type === "subscription")
    ) {
      const i = tr(e);
      i !== void 0 &&
        e.methodOverride !== "POST" &&
        n.push(`input=${encodeURIComponent(JSON.stringify(i))}`);
    }
    return (n.length && (s += "?" + n.join("&")), s);
  },
  En = (e) => {
    if (e.type === "query" && e.methodOverride !== "POST") return;
    const t = tr(e);
    return t !== void 0 ? JSON.stringify(t) : void 0;
  },
  Qn = (e) =>
    Tn(
      (0, de.default)(
        (0, de.default)({}, e),
        {},
        { contentTypeHeader: "application/json", getUrl: rr, getBody: En },
      ),
    );
var Mn = class extends Error {
  constructor() {
    const e = "AbortError";
    (super(e), (this.name = e), (this.message = e));
  }
};
const In = (e) => {
  var t;
  if (e?.aborted)
    throw (
      (t = e.throwIfAborted) === null || t === void 0 || t.call(e),
      typeof DOMException < "u"
        ? new DOMException("AbortError", "AbortError")
        : new Mn()
    );
};
async function qn(e) {
  var t, r;
  In(e.signal);
  const s = e.getUrl(e),
    n = e.getBody(e),
    i = (t = e.methodOverride) !== null && t !== void 0 ? t : Rn[e.type],
    o = await (async () => {
      const u = await e.headers();
      return Symbol.iterator in u ? Object.fromEntries(u) : u;
    })(),
    a = (0, de.default)(
      (0, de.default)(
        (0, de.default)(
          {},
          e.contentTypeHeader && i !== "GET"
            ? { "content-type": e.contentTypeHeader }
            : {},
        ),
        e.trpcAcceptHeader
          ? {
              [(r = e.trpcAcceptHeaderKey) !== null && r !== void 0
                ? r
                : "trpc-accept"]: e.trpcAcceptHeader,
            }
          : void 0,
      ),
      o,
    );
  return _n(e.fetch)(s, { method: i, signal: e.signal, body: n, headers: a });
}
async function Tn(e) {
  const t = {},
    r = await qn(e);
  t.response = r;
  const s = await r.json();
  return ((t.responseJSON = s), { json: s, meta: t });
}
U(B(), 1);
const Ot = () => {
  throw new Error(
    "Something went wrong. Please submit an issue at https://github.com/trpc/trpc/issues/new",
  );
};
function Pt(e) {
  let t = null,
    r = null;
  const s = () => {
    (clearTimeout(r), (r = null), (t = null));
  };
  function n(a) {
    const u = [[]];
    let c = 0;
    for (;;) {
      const p = a[c];
      if (!p) break;
      const v = u[u.length - 1];
      if (p.aborted) {
        var l;
        ((l = p.reject) === null ||
          l === void 0 ||
          l.call(p, new Error("Aborted")),
          c++);
        continue;
      }
      if (e.validate(v.concat(p).map((d) => d.key))) {
        (v.push(p), c++);
        continue;
      }
      if (v.length === 0) {
        var h;
        ((h = p.reject) === null ||
          h === void 0 ||
          h.call(p, new Error("Input is too big for a single dispatch")),
          c++);
        continue;
      }
      u.push([]);
    }
    return u;
  }
  function i() {
    const a = n(t);
    s();
    for (const u of a) {
      if (!u.length) continue;
      const c = { items: u };
      for (const h of u) h.batch = c;
      e.fetch(c.items.map((h) => h.key))
        .then(async (h) => {
          await Promise.all(
            h.map(async (v, P) => {
              const d = c.items[P];
              try {
                var _;
                const I = await Promise.resolve(v);
                (_ = d.resolve) === null || _ === void 0 || _.call(d, I);
              } catch (I) {
                var E;
                (E = d.reject) === null || E === void 0 || E.call(d, I);
              }
              ((d.batch = null), (d.reject = null), (d.resolve = null));
            }),
          );
          for (const v of c.items) {
            var p;
            ((p = v.reject) === null ||
              p === void 0 ||
              p.call(v, new Error("Missing result")),
              (v.batch = null));
          }
        })
        .catch((h) => {
          for (const v of c.items) {
            var p;
            ((p = v.reject) === null || p === void 0 || p.call(v, h),
              (v.batch = null));
          }
        });
    }
  }
  function o(a) {
    var u;
    const c = { aborted: !1, key: a, batch: null, resolve: Ot, reject: Ot },
      l = new Promise((h, p) => {
        var v;
        ((c.reject = p),
          (c.resolve = h),
          ((v = t) !== null && v !== void 0) || (t = []),
          t.push(c));
      });
    return (((u = r) !== null && u !== void 0) || (r = setTimeout(i)), l);
  }
  return { load: o };
}
function Dn(...e) {
  const t = new AbortController(),
    r = e.length;
  let s = 0;
  const n = () => {
    ++s === r && t.abort();
  };
  for (const i of e)
    i?.aborted ? n() : i?.addEventListener("abort", n, { once: !0 });
  return t.signal;
}
var Se = U(B(), 1);
function xs(e) {
  var t, r;
  const s = jn(e),
    n = (t = e.maxURLLength) !== null && t !== void 0 ? t : 1 / 0,
    i = (r = e.maxItems) !== null && r !== void 0 ? r : 1 / 0;
  return () => {
    const o = (l) => ({
        validate(h) {
          if (n === 1 / 0 && i === 1 / 0) return !0;
          if (h.length > i) return !1;
          const p = h.map((d) => d.path).join(","),
            v = h.map((d) => d.input);
          return (
            rr(
              (0, Se.default)(
                (0, Se.default)({}, s),
                {},
                { type: l, path: p, inputs: v, signal: null },
              ),
            ).length <= n
          );
        },
        async fetch(h) {
          const p = h.map((I) => I.path).join(","),
            v = h.map((I) => I.input),
            P = Dn(...h.map((I) => I.signal)),
            d = await Qn(
              (0, Se.default)(
                (0, Se.default)({}, s),
                {},
                {
                  path: p,
                  inputs: v,
                  type: l,
                  headers() {
                    return e.headers
                      ? typeof e.headers == "function"
                        ? e.headers({ opList: h })
                        : e.headers
                      : {};
                  },
                  signal: P,
                },
              ),
            );
          return (Array.isArray(d.json) ? d.json : h.map(() => d.json)).map(
            (I) => ({ meta: d.meta, json: I }),
          );
        },
      }),
      a = Pt(o("query")),
      u = Pt(o("mutation")),
      c = { query: a, mutation: u };
    return ({ op: l }) =>
      Me((h) => {
        if (l.type === "subscription")
          throw new Error(
            "Subscriptions are unsupported by `httpLink` - use `httpSubscriptionLink` or `wsLink`",
          );
        const v = c[l.type].load(l);
        let P;
        return (
          v
            .then((d) => {
              P = d;
              const _ = On(d.json, s.transformer.output);
              if (!_.ok) {
                h.error(Ee.from(_.error, { meta: d.meta }));
                return;
              }
              (h.next({ context: d.meta, result: _.result }), h.complete());
            })
            .catch((d) => {
              h.error(Ee.from(d, { meta: P?.meta }));
            }),
          () => {}
        );
      });
  };
}
U(B(), 1);
const nr = (e, ...t) => (typeof e == "function" ? e(...t) : e);
U(ue(), 1);
function Fn() {
  let e, t;
  return {
    promise: new Promise((s, n) => {
      ((e = s), (t = n));
    }),
    resolve: e,
    reject: t,
  };
}
async function An(e) {
  const t = await nr(e.url);
  if (!e.connectionParams) return t;
  const s = `${t.includes("?") ? "&" : "?"}connectionParams=1`;
  return t + s;
}
async function kn(e, t) {
  const r = { method: "connectionParams", data: await nr(e) };
  return t.encode(r);
}
U(ue(), 1);
var ee = U(ue(), 1);
function Un(e) {
  const { promise: t, resolve: r, reject: s } = Fn();
  return (
    e.addEventListener("open", () => {
      (e.removeEventListener("error", s), r());
    }),
    e.addEventListener("error", s),
    t
  );
}
function $n(e, { intervalMs: t, pongTimeoutMs: r }) {
  let s, n;
  function i() {
    s = setTimeout(() => {
      (e.send("PING"),
        (n = setTimeout(() => {
          e.close();
        }, r)));
    }, t);
  }
  function o() {
    (clearTimeout(s), i());
  }
  function a() {
    (clearTimeout(n), o());
  }
  (e.addEventListener("open", i),
    e.addEventListener("message", ({ data: u }) => {
      (clearTimeout(s), i(), u === "PONG" && a());
    }),
    e.addEventListener("close", () => {
      (clearTimeout(s), clearTimeout(n));
    }));
}
var Ln = class Ye {
  constructor(t) {
    var r;
    if (
      ((0, ee.default)(this, "id", ++Ye.connectCount),
      (0, ee.default)(this, "WebSocketPonyfill", void 0),
      (0, ee.default)(this, "urlOptions", void 0),
      (0, ee.default)(this, "keepAliveOpts", void 0),
      (0, ee.default)(this, "encoder", void 0),
      (0, ee.default)(this, "wsObservable", un(null)),
      (0, ee.default)(this, "openPromise", null),
      (this.WebSocketPonyfill =
        (r = t.WebSocketPonyfill) !== null && r !== void 0 ? r : WebSocket),
      !this.WebSocketPonyfill)
    )
      throw new Error(
        "No WebSocket implementation found - you probably don't want to use this on the server, but if you do you need to pass a `WebSocket`-ponyfill",
      );
    ((this.urlOptions = t.urlOptions),
      (this.keepAliveOpts = t.keepAlive),
      (this.encoder = t.encoder));
  }
  get ws() {
    return this.wsObservable.get();
  }
  set ws(t) {
    this.wsObservable.next(t);
  }
  isOpen() {
    return (
      !!this.ws &&
      this.ws.readyState === this.WebSocketPonyfill.OPEN &&
      !this.openPromise
    );
  }
  isClosed() {
    return (
      !!this.ws &&
      (this.ws.readyState === this.WebSocketPonyfill.CLOSING ||
        this.ws.readyState === this.WebSocketPonyfill.CLOSED)
    );
  }
  async open() {
    var t = this;
    if (t.openPromise) return t.openPromise;
    t.id = ++Ye.connectCount;
    const r = An(t.urlOptions).then((s) => new t.WebSocketPonyfill(s));
    t.openPromise = r.then(async (s) => {
      ((t.ws = s),
        (s.binaryType = "arraybuffer"),
        s.addEventListener("message", function ({ data: n }) {
          n === "PING" && this.send("PONG");
        }),
        t.keepAliveOpts.enabled && $n(s, t.keepAliveOpts),
        s.addEventListener("close", () => {
          t.ws === s && (t.ws = null);
        }),
        await Un(s),
        t.urlOptions.connectionParams &&
          s.send(await kn(t.urlOptions.connectionParams, t.encoder)));
    });
    try {
      await t.openPromise;
    } finally {
      t.openPromise = null;
    }
  }
  async close() {
    var t = this;
    try {
      await t.openPromise;
    } finally {
      var r;
      (r = t.ws) === null || r === void 0 || r.close();
    }
  }
};
(0, ee.default)(Ln, "connectCount", 0);
U(ue(), 1);
U(B(), 1);
var ke = U(ue(), 1),
  xt = U(B(), 1),
  Te = class {
    constructor(e) {
      ((0, ke.default)(this, "links", void 0),
        (0, ke.default)(this, "runtime", void 0),
        (0, ke.default)(this, "requestId", void 0),
        (this.requestId = 0),
        (this.runtime = {}),
        (this.links = e.links.map((t) => t(this.runtime))));
    }
    $request(e) {
      var t;
      return cn({
        links: this.links,
        op: (0, xt.default)(
          (0, xt.default)({}, e),
          {},
          {
            context: (t = e.context) !== null && t !== void 0 ? t : {},
            id: ++this.requestId,
          },
        ),
      }).pipe(an());
    }
    async requestAsPromise(e) {
      var t = this;
      try {
        const r = t.$request(e);
        return (await on(r)).result.data;
      } catch (r) {
        throw Ee.from(r);
      }
    }
    query(e, t, r) {
      return this.requestAsPromise({
        type: "query",
        path: e,
        input: t,
        context: r?.context,
        signal: r?.signal,
      });
    }
    mutation(e, t, r) {
      return this.requestAsPromise({
        type: "mutation",
        path: e,
        input: t,
        context: r?.context,
        signal: r?.signal,
      });
    }
    subscription(e, t, r) {
      return this.$request({
        type: "subscription",
        path: e,
        input: t,
        context: r.context,
        signal: r.signal,
      }).subscribe({
        next(n) {
          switch (n.result.type) {
            case "state": {
              var i;
              (i = r.onConnectionStateChange) === null ||
                i === void 0 ||
                i.call(r, n.result);
              break;
            }
            case "started": {
              var o;
              (o = r.onStarted) === null ||
                o === void 0 ||
                o.call(r, { context: n.context });
              break;
            }
            case "stopped": {
              var a;
              (a = r.onStopped) === null || a === void 0 || a.call(r);
              break;
            }
            case "data":
            case void 0: {
              var u;
              (u = r.onData) === null ||
                u === void 0 ||
                u.call(r, n.result.data);
              break;
            }
          }
        },
        error(n) {
          var i;
          (i = r.onError) === null || i === void 0 || i.call(r, n);
        },
        complete() {
          var n;
          (n = r.onComplete) === null || n === void 0 || n.call(r);
        },
      });
    }
  };
const sr = Symbol.for("trpc_untypedClient"),
  Kn = { query: "query", mutate: "mutation", subscribe: "subscription" },
  Nn = (e) => Kn[e];
function ir(e) {
  const t = qe(({ path: r, args: s }) => {
    const n = [...r],
      i = Nn(n.pop()),
      o = n.join(".");
    return e[i](o, ...s);
  });
  return st((r) => (r === sr ? e : t[r]));
}
function Hn(e) {
  const t = new Te(e);
  return ir(t);
}
function ot(e) {
  return e[sr];
}
U(B(), 1);
U(B(), 1);
var Wn = V({
  "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(
    e,
    t,
  ) {
    function r(n) {
      var i,
        o,
        a,
        u = 2;
      for (
        typeof Symbol < "u" &&
        ((o = Symbol.asyncIterator), (a = Symbol.iterator));
        u--;
      ) {
        if (o && (i = n[o]) != null) return i.call(n);
        if (a && (i = n[a]) != null) return new s(i.call(n));
        ((o = "@@asyncIterator"), (a = "@@iterator"));
      }
      throw new TypeError("Object is not async iterable");
    }
    function s(n) {
      function i(o) {
        if (Object(o) !== o)
          return Promise.reject(new TypeError(o + " is not an object."));
        var a = o.done;
        return Promise.resolve(o.value).then(function (u) {
          return { value: u, done: a };
        });
      }
      return (
        (s = function (a) {
          ((this.s = a), (this.n = a.next));
        }),
        (s.prototype = {
          s: null,
          n: null,
          next: function () {
            return i(this.n.apply(this.s, arguments));
          },
          return: function (a) {
            var u = this.s.return;
            return u === void 0
              ? Promise.resolve({ value: a, done: !0 })
              : i(u.apply(this.s, arguments));
          },
          throw: function (a) {
            var u = this.s.return;
            return u === void 0
              ? Promise.reject(a)
              : i(u.apply(this.s, arguments));
          },
        }),
        new s(n)
      );
    }
    ((t.exports = r),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports));
  },
});
U(Wn(), 1);
U(B(), 1);
var Gn = V({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/usingCtx.js"(
      e,
      t,
    ) {
      function r() {
        var s =
            typeof SuppressedError == "function"
              ? SuppressedError
              : function (a, u) {
                  var c = Error();
                  return (
                    (c.name = "SuppressedError"),
                    (c.error = a),
                    (c.suppressed = u),
                    c
                  );
                },
          n = {},
          i = [];
        function o(a, u) {
          if (u != null) {
            if (Object(u) !== u)
              throw new TypeError(
                "using declarations can only be used with objects, functions, null, or undefined.",
              );
            if (a)
              var c =
                u[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")];
            if (
              c === void 0 &&
              ((c = u[Symbol.dispose || Symbol.for("Symbol.dispose")]), a)
            )
              var l = c;
            if (typeof c != "function")
              throw new TypeError("Object is not disposable.");
            (l &&
              (c = function () {
                try {
                  l.call(u);
                } catch (p) {
                  return Promise.reject(p);
                }
              }),
              i.push({ v: u, d: c, a }));
          } else a && i.push({ d: u, a });
          return u;
        }
        return {
          e: n,
          u: o.bind(null, !1),
          a: o.bind(null, !0),
          d: function () {
            var u,
              c = this.e,
              l = 0;
            function h() {
              for (; (u = i.pop()); )
                try {
                  if (!u.a && l === 1)
                    return ((l = 0), i.push(u), Promise.resolve().then(h));
                  if (u.d) {
                    var v = u.d.call(u.v);
                    if (u.a) return ((l |= 2), Promise.resolve(v).then(h, p));
                  } else l |= 1;
                } catch (P) {
                  return p(P);
                }
              if (l === 1)
                return c !== n ? Promise.reject(c) : Promise.resolve();
              if (c !== n) throw c;
            }
            function p(v) {
              return ((c = c !== n ? new s(v, c) : v), h());
            }
            return h();
          },
        };
      }
      ((t.exports = r),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  or = V({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/OverloadYield.js"(
      e,
      t,
    ) {
      function r(s, n) {
        ((this.v = s), (this.k = n));
      }
      ((t.exports = r),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  zn = V({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/awaitAsyncGenerator.js"(
      e,
      t,
    ) {
      var r = or();
      function s(n) {
        return new r(n, 0);
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  Bn = V({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/wrapAsyncGenerator.js"(
      e,
      t,
    ) {
      var r = or();
      function s(i) {
        return function () {
          return new n(i.apply(this, arguments));
        };
      }
      function n(i) {
        var o, a;
        function u(l, h) {
          try {
            var p = i[l](h),
              v = p.value,
              P = v instanceof r;
            Promise.resolve(P ? v.v : v).then(
              function (d) {
                if (P) {
                  var _ = l === "return" ? "return" : "next";
                  if (!v.k || d.done) return u(_, d);
                  d = i[_](d).value;
                }
                c(p.done ? "return" : "normal", d);
              },
              function (d) {
                u("throw", d);
              },
            );
          } catch (d) {
            c("throw", d);
          }
        }
        function c(l, h) {
          switch (l) {
            case "return":
              o.resolve({ value: h, done: !0 });
              break;
            case "throw":
              o.reject(h);
              break;
            default:
              o.resolve({ value: h, done: !1 });
          }
          (o = o.next) ? u(o.key, o.arg) : (a = null);
        }
        ((this._invoke = function (l, h) {
          return new Promise(function (p, v) {
            var P = { key: l, arg: h, resolve: p, reject: v, next: null };
            a ? (a = a.next = P) : ((o = a = P), u(l, h));
          });
        }),
          typeof i.return != "function" && (this.return = void 0));
      }
      ((n.prototype[
        (typeof Symbol == "function" && Symbol.asyncIterator) ||
          "@@asyncIterator"
      ] = function () {
        return this;
      }),
        (n.prototype.next = function (i) {
          return this._invoke("next", i);
        }),
        (n.prototype.throw = function (i) {
          return this._invoke("throw", i);
        }),
        (n.prototype.return = function (i) {
          return this._invoke("return", i);
        }),
        (t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  });
U(Gn(), 1);
U(zn(), 1);
U(Bn(), 1);
U(B(), 1);
var Jn = Object.create,
  ar = Object.defineProperty,
  Yn = Object.getOwnPropertyDescriptor,
  ur = Object.getOwnPropertyNames,
  Vn = Object.getPrototypeOf,
  Zn = Object.prototype.hasOwnProperty,
  ne = (e, t) =>
    function () {
      return (
        t || (0, e[ur(e)[0]])((t = { exports: {} }).exports, t),
        t.exports
      );
    },
  Xn = (e, t, r, s) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (var n = ur(t), i = 0, o = n.length, a; i < o; i++)
        ((a = n[i]),
          !Zn.call(e, a) &&
            a !== r &&
            ar(e, a, {
              get: ((u) => t[u]).bind(null, a),
              enumerable: !(s = Yn(t, a)) || s.enumerable,
            }));
    return e;
  },
  ce = (e, t, r) => (
    (r = e != null ? Jn(Vn(e)) : {}),
    Xn(
      t || !e || !e.__esModule
        ? ar(r, "default", { value: e, enumerable: !0 })
        : r,
      e,
    )
  ),
  es = ne({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutPropertiesLoose.js"(
      e,
      t,
    ) {
      function r(s, n) {
        if (s == null) return {};
        var i = {};
        for (var o in s)
          if ({}.hasOwnProperty.call(s, o)) {
            if (n.includes(o)) continue;
            i[o] = s[o];
          }
        return i;
      }
      ((t.exports = r),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  ts = ne({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutProperties.js"(
      e,
      t,
    ) {
      var r = es();
      function s(n, i) {
        if (n == null) return {};
        var o,
          a,
          u = r(n, i);
        if (Object.getOwnPropertySymbols) {
          var c = Object.getOwnPropertySymbols(n);
          for (a = 0; a < c.length; a++)
            ((o = c[a]),
              i.includes(o) ||
                ({}.propertyIsEnumerable.call(n, o) && (u[o] = n[o])));
        }
        return u;
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  cr = ne({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(
      e,
      t,
    ) {
      function r(s) {
        "@babel/helpers - typeof";
        return (
          (t.exports = r =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (n) {
                  return typeof n;
                }
              : function (n) {
                  return n &&
                    typeof Symbol == "function" &&
                    n.constructor === Symbol &&
                    n !== Symbol.prototype
                    ? "symbol"
                    : typeof n;
                }),
          (t.exports.__esModule = !0),
          (t.exports.default = t.exports),
          r(s)
        );
      }
      ((t.exports = r),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  rs = ne({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(
      e,
      t,
    ) {
      var r = cr().default;
      function s(n, i) {
        if (r(n) != "object" || !n) return n;
        var o = n[Symbol.toPrimitive];
        if (o !== void 0) {
          var a = o.call(n, i || "default");
          if (r(a) != "object") return a;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (i === "string" ? String : Number)(n);
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  ns = ne({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(
      e,
      t,
    ) {
      var r = cr().default,
        s = rs();
      function n(i) {
        var o = s(i, "string");
        return r(o) == "symbol" ? o : o + "";
      }
      ((t.exports = n),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  ss = ne({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(
      e,
      t,
    ) {
      var r = ns();
      function s(n, i, o) {
        return (
          (i = r(i)) in n
            ? Object.defineProperty(n, i, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (n[i] = o),
          n
        );
      }
      ((t.exports = s),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  Oe = ne({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(
      e,
      t,
    ) {
      var r = ss();
      function s(i, o) {
        var a = Object.keys(i);
        if (Object.getOwnPropertySymbols) {
          var u = Object.getOwnPropertySymbols(i);
          (o &&
            (u = u.filter(function (c) {
              return Object.getOwnPropertyDescriptor(i, c).enumerable;
            })),
            a.push.apply(a, u));
        }
        return a;
      }
      function n(i) {
        for (var o = 1; o < arguments.length; o++) {
          var a = arguments[o] != null ? arguments[o] : {};
          o % 2
            ? s(Object(a), !0).forEach(function (u) {
                r(i, u, a[u]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(a))
              : s(Object(a)).forEach(function (u) {
                  Object.defineProperty(
                    i,
                    u,
                    Object.getOwnPropertyDescriptor(a, u),
                  );
                });
        }
        return i;
      }
      ((t.exports = n),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  is = ce(ts(), 1),
  wt = ce(Oe(), 1);
const os = ["cursor", "direction"];
function Y(e, t, r) {
  const s = e.flatMap((n) => n.split("."));
  if (!t && (!r || r === "any")) return s.length ? [s] : [];
  if (r === "infinite" && oe(t) && ("direction" in t || "cursor" in t)) {
    const { cursor: n, direction: i } = t,
      o = (0, is.default)(t, os);
    return [s, { input: o, type: "infinite" }];
  }
  return [
    s,
    (0, wt.default)(
      (0, wt.default)({}, typeof t < "u" && t !== W && { input: t }),
      r && r !== "any" && { type: r },
    ),
  ];
}
function je(e) {
  return Y(e, void 0, "any");
}
function as(e) {
  return qe(({ path: t, args: r }) => {
    var s;
    const n = [...t],
      i = n.pop();
    if (i === "useMutation") return e[i](n, ...r);
    if (i === "_def") return { path: n };
    const [o, ...a] = r,
      u = (s = a[0]) !== null && s !== void 0 ? s : {};
    return e[i](n, o, u);
  });
}
var Ue;
const us = ["client", "ssrContext", "ssrState", "abortOnUnmount"],
  cs =
    (Ue = j.createContext) === null || Ue === void 0
      ? void 0
      : Ue.call(fr, null),
  ls = (e) => {
    switch (e) {
      case "queryOptions":
      case "fetch":
      case "ensureData":
      case "prefetch":
      case "getData":
      case "setData":
      case "setQueriesData":
        return "query";
      case "infiniteQueryOptions":
      case "fetchInfinite":
      case "prefetchInfinite":
      case "getInfiniteData":
      case "setInfiniteData":
        return "infinite";
      case "setMutationDefaults":
      case "getMutationDefaults":
      case "isMutating":
      case "cancel":
      case "invalidate":
      case "refetch":
      case "reset":
        return "any";
    }
  };
function fs(e) {
  return qe((t) => {
    const r = [...t.path],
      s = r.pop(),
      n = [...t.args],
      i = n.shift(),
      o = ls(s),
      a = Y(r, i, o);
    return {
      infiniteQueryOptions: () => e.infiniteQueryOptions(r, a, n[0]),
      queryOptions: () => e.queryOptions(r, a, ...n),
      fetch: () => e.fetchQuery(a, ...n),
      fetchInfinite: () => e.fetchInfiniteQuery(a, n[0]),
      prefetch: () => e.prefetchQuery(a, ...n),
      prefetchInfinite: () => e.prefetchInfiniteQuery(a, n[0]),
      ensureData: () => e.ensureQueryData(a, ...n),
      invalidate: () => e.invalidateQueries(a, ...n),
      reset: () => e.resetQueries(a, ...n),
      refetch: () => e.refetchQueries(a, ...n),
      cancel: () => e.cancelQuery(a, ...n),
      setData: () => {
        e.setQueryData(a, n[0], n[1]);
      },
      setQueriesData: () => e.setQueriesData(a, n[0], n[1], n[2]),
      setInfiniteData: () => {
        e.setInfiniteQueryData(a, n[0], n[1]);
      },
      getData: () => e.getQueryData(a),
      getInfiniteData: () => e.getInfiniteQueryData(a),
      setMutationDefaults: () => e.setMutationDefaults(je(r), i),
      getMutationDefaults: () => e.getMutationDefaults(je(r)),
      isMutating: () => e.isMutating({ mutationKey: je(r) }),
    }[s]();
  });
}
function hs(e) {
  const t = ir(e.client),
    r = fs(e);
  return st((s) => {
    const n = s;
    return n === "client" ? t : us.includes(n) ? e[n] : r[s];
  });
}
var ds = ce(Oe(), 1);
function St(e) {
  const t = e instanceof Te ? e : ot(e);
  return qe((r) => {
    const s = r.path,
      n = s.join("."),
      [i, o] = r.args;
    return (0, ds.default)(
      { queryKey: Y(s, i, "query"), queryFn: () => t.query(n, i, o?.trpc) },
      o,
    );
  });
}
var $e = ce(Oe(), 1);
function H(e, t, r) {
  var s;
  const n = e[0];
  let i = (s = e[1]) === null || s === void 0 ? void 0 : s.input;
  if (r) {
    var o;
    i = (0, $e.default)(
      (0, $e.default)(
        (0, $e.default)({}, (o = i) !== null && o !== void 0 ? o : {}),
        r.pageParam ? { cursor: r.pageParam } : {},
      ),
      {},
      { direction: r.direction },
    );
  }
  return [n.join("."), i, t?.trpc];
}
var ps = ne({
    "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(
      e,
      t,
    ) {
      function r(n) {
        var i,
          o,
          a,
          u = 2;
        for (
          typeof Symbol < "u" &&
          ((o = Symbol.asyncIterator), (a = Symbol.iterator));
          u--;
        ) {
          if (o && (i = n[o]) != null) return i.call(n);
          if (a && (i = n[a]) != null) return new s(i.call(n));
          ((o = "@@asyncIterator"), (a = "@@iterator"));
        }
        throw new TypeError("Object is not async iterable");
      }
      function s(n) {
        function i(o) {
          if (Object(o) !== o)
            return Promise.reject(new TypeError(o + " is not an object."));
          var a = o.done;
          return Promise.resolve(o.value).then(function (u) {
            return { value: u, done: a };
          });
        }
        return (
          (s = function (a) {
            ((this.s = a), (this.n = a.next));
          }),
          (s.prototype = {
            s: null,
            n: null,
            next: function () {
              return i(this.n.apply(this.s, arguments));
            },
            return: function (a) {
              var u = this.s.return;
              return u === void 0
                ? Promise.resolve({ value: a, done: !0 })
                : i(u.apply(this.s, arguments));
            },
            throw: function (a) {
              var u = this.s.return;
              return u === void 0
                ? Promise.reject(a)
                : i(u.apply(this.s, arguments));
            },
          }),
          new s(n)
        );
      }
      ((t.exports = r),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports));
    },
  }),
  ys = ce(ps(), 1);
function Ve(e) {
  return { path: e.path.join(".") };
}
function he(e) {
  const t = Ve(e);
  return j.useMemo(() => t, [t]);
}
async function lr(e, t, r) {
  const n = t.getQueryCache().build(t, { queryKey: r });
  n.setState({ data: [], status: "success" });
  const i = [];
  var o = !1,
    a = !1,
    u;
  try {
    for (
      var c = (0, ys.default)(e), l;
      (o = !(l = await c.next()).done);
      o = !1
    ) {
      const h = l.value;
      (i.push(h), n.setState({ data: [...i] }));
    }
  } catch (h) {
    ((a = !0), (u = h));
  } finally {
    try {
      o && c.return != null && (await c.return());
    } finally {
      if (a) throw u;
    }
  }
  return i;
}
var R = ce(Oe(), 1);
function vs(e) {
  const { client: t, queryClient: r } = e,
    s = t instanceof Te ? t : ot(t);
  return {
    infiniteQueryOptions: (n, i, o) => {
      var a, u;
      const c = ((a = i[1]) === null || a === void 0 ? void 0 : a.input) === W,
        l = async (h) => {
          var p;
          const v = (0, R.default)(
            (0, R.default)({}, o),
            {},
            {
              trpc: (0, R.default)(
                (0, R.default)({}, o?.trpc),
                !(o == null || (p = o.trpc) === null || p === void 0) &&
                  p.abortOnUnmount
                  ? { signal: h.signal }
                  : { signal: null },
              ),
            },
          );
          return await s.query(
            ...H(i, v, { direction: h.direction, pageParam: h.pageParam }),
          );
        };
      return Object.assign(
        (0, R.default)(
          (0, R.default)({}, o),
          {},
          {
            initialData: o?.initialData,
            queryKey: i,
            queryFn: c ? W : l,
            initialPageParam:
              (u = o?.initialCursor) !== null && u !== void 0 ? u : null,
          },
        ),
        { trpc: Ve({ path: n }) },
      );
    },
    queryOptions: (n, i, o) => {
      var a;
      const u = ((a = i[1]) === null || a === void 0 ? void 0 : a.input) === W,
        c = async (l) => {
          var h;
          const p = (0, R.default)(
              (0, R.default)({}, o),
              {},
              {
                trpc: (0, R.default)(
                  (0, R.default)({}, o?.trpc),
                  !(o == null || (h = o.trpc) === null || h === void 0) &&
                    h.abortOnUnmount
                    ? { signal: l.signal }
                    : { signal: null },
                ),
              },
            ),
            v = await s.query(...H(i, p));
          return Bt(v) ? lr(v, r, i) : v;
        };
      return Object.assign(
        (0, R.default)(
          (0, R.default)({}, o),
          {},
          { initialData: o?.initialData, queryKey: i, queryFn: u ? W : c },
        ),
        { trpc: Ve({ path: n }) },
      );
    },
    fetchQuery: (n, i) =>
      r.fetchQuery(
        (0, R.default)(
          (0, R.default)({}, i),
          {},
          { queryKey: n, queryFn: () => s.query(...H(n, i)) },
        ),
      ),
    fetchInfiniteQuery: (n, i) => {
      var o;
      return r.fetchInfiniteQuery(
        (0, R.default)(
          (0, R.default)({}, i),
          {},
          {
            queryKey: n,
            queryFn: ({ pageParam: a, direction: u }) =>
              s.query(...H(n, i, { pageParam: a, direction: u })),
            initialPageParam:
              (o = i?.initialCursor) !== null && o !== void 0 ? o : null,
          },
        ),
      );
    },
    prefetchQuery: (n, i) =>
      r.prefetchQuery(
        (0, R.default)(
          (0, R.default)({}, i),
          {},
          { queryKey: n, queryFn: () => s.query(...H(n, i)) },
        ),
      ),
    prefetchInfiniteQuery: (n, i) => {
      var o;
      return r.prefetchInfiniteQuery(
        (0, R.default)(
          (0, R.default)({}, i),
          {},
          {
            queryKey: n,
            queryFn: ({ pageParam: a, direction: u }) =>
              s.query(...H(n, i, { pageParam: a, direction: u })),
            initialPageParam:
              (o = i?.initialCursor) !== null && o !== void 0 ? o : null,
          },
        ),
      );
    },
    ensureQueryData: (n, i) =>
      r.ensureQueryData(
        (0, R.default)(
          (0, R.default)({}, i),
          {},
          { queryKey: n, queryFn: () => s.query(...H(n, i)) },
        ),
      ),
    invalidateQueries: (n, i, o) =>
      r.invalidateQueries(
        (0, R.default)((0, R.default)({}, i), {}, { queryKey: n }),
        o,
      ),
    resetQueries: (n, i, o) =>
      r.resetQueries(
        (0, R.default)((0, R.default)({}, i), {}, { queryKey: n }),
        o,
      ),
    refetchQueries: (n, i, o) =>
      r.refetchQueries(
        (0, R.default)((0, R.default)({}, i), {}, { queryKey: n }),
        o,
      ),
    cancelQuery: (n, i) => r.cancelQueries({ queryKey: n }, i),
    setQueryData: (n, i, o) => r.setQueryData(n, i, o),
    setQueriesData: (n, i, o, a) =>
      r.setQueriesData(
        (0, R.default)((0, R.default)({}, i), {}, { queryKey: n }),
        o,
        a,
      ),
    getQueryData: (n) => r.getQueryData(n),
    setInfiniteQueryData: (n, i, o) => r.setQueryData(n, i, o),
    getInfiniteQueryData: (n) => r.getQueryData(n),
    setMutationDefaults: (n, i) => {
      const o = n[0],
        a = (u) => s.mutation(...H([o, { input: u }], e));
      return r.setMutationDefaults(
        n,
        typeof i == "function" ? i({ canonicalMutationFn: a }) : i,
      );
    },
    getMutationDefaults: (n) => r.getMutationDefaults(n),
    isMutating: (n) =>
      r.isMutating((0, R.default)((0, R.default)({}, n), {}, { exact: !0 })),
  };
}
var y = ce(Oe());
const _t = (e, t) =>
  new Proxy(e, {
    get(s, n) {
      return (t(n), s[n]);
    },
  });
function ms(e) {
  var t, r;
  const s = (t = void 0) !== null && t !== void 0 ? t : (g) => g.originalFn(),
    n = (r = void 0) !== null && r !== void 0 ? r : cs,
    i = Hn,
    o = (g) => {
      var b;
      const { abortOnUnmount: f = !1, queryClient: m, ssrContext: O } = g,
        [w, S] = j.useState((b = g.ssrState) !== null && b !== void 0 ? b : !1),
        x = g.client instanceof Te ? g.client : ot(g.client),
        C = j.useMemo(() => vs({ client: x, queryClient: m }), [x, m]),
        Q = j.useMemo(
          () =>
            (0, y.default)(
              {
                abortOnUnmount: f,
                queryClient: m,
                client: x,
                ssrContext: O ?? null,
                ssrState: w,
              },
              C,
            ),
          [f, x, C, m, O, w],
        );
      return (
        j.useEffect(() => {
          S((T) => (T ? "mounted" : !1));
        }, []),
        jt.jsx(n.Provider, { value: Q, children: g.children })
      );
    };
  function a() {
    const g = j.useContext(n);
    if (!g)
      throw new Error(
        "Unable to find tRPC Context. Did you forget to wrap your App inside `withTRPC` HoC?",
      );
    return g;
  }
  function u(g, b) {
    var f;
    const { queryClient: m, ssrState: O } = a();
    return O &&
      O !== "mounted" &&
      ((f = m.getQueryCache().find({ queryKey: g })) === null || f === void 0
        ? void 0
        : f.state.status) === "error"
      ? (0, y.default)({ retryOnMount: !1 }, b)
      : b;
  }
  function c(g, b, f) {
    var m, O, w, S, x;
    const C = a(),
      {
        abortOnUnmount: Q,
        client: T,
        ssrState: M,
        queryClient: F,
        prefetchQuery: A,
      } = C,
      L = Y(g, b, "query"),
      Z = F.getQueryDefaults(L),
      $ = b === W;
    typeof window > "u" &&
      M === "prepass" &&
      (f == null || (m = f.trpc) === null || m === void 0 ? void 0 : m.ssr) !==
        !1 &&
      ((O = f?.enabled) !== null && O !== void 0 ? O : Z?.enabled) !== !1 &&
      !$ &&
      !F.getQueryCache().find({ queryKey: L }) &&
      A(L, f);
    const G = u(L, (0, y.default)((0, y.default)({}, Z), f)),
      D =
        (w =
          (S =
            f == null || (x = f.trpc) === null || x === void 0
              ? void 0
              : x.abortOnUnmount) !== null && S !== void 0
            ? S
            : void 0) !== null && w !== void 0
          ? w
          : Q,
      q = Nr(
        (0, y.default)(
          (0, y.default)({}, G),
          {},
          {
            queryKey: L,
            queryFn: $
              ? b
              : async (K) => {
                  const se = (0, y.default)(
                      (0, y.default)({}, G),
                      {},
                      {
                        trpc: (0, y.default)(
                          (0, y.default)({}, G?.trpc),
                          D ? { signal: K.signal } : { signal: null },
                        ),
                      },
                    ),
                    De = await T.query(...H(L, se));
                  return Bt(De) ? lr(De, F, L) : De;
                },
          },
        ),
        F,
      );
    return ((q.trpc = he({ path: g })), q);
  }
  function l(g, b, f) {
    var m, O, w;
    const S = a(),
      x = Y(g, b, "query"),
      C = b === W,
      Q =
        (m =
          (O =
            f == null || (w = f.trpc) === null || w === void 0
              ? void 0
              : w.abortOnUnmount) !== null && O !== void 0
            ? O
            : void 0) !== null && m !== void 0
          ? m
          : S.abortOnUnmount;
    zr(
      (0, y.default)(
        (0, y.default)({}, f),
        {},
        {
          queryKey: x,
          queryFn: C
            ? b
            : (T) => {
                const M = {
                  trpc: (0, y.default)(
                    (0, y.default)({}, f?.trpc),
                    Q ? { signal: T.signal } : {},
                  ),
                };
                return S.client.query(...H(x, M));
              },
        },
      ),
    );
  }
  function h(g, b, f) {
    var m, O, w;
    const S = a(),
      x = Y(g, b, "query"),
      C =
        (m =
          (O =
            f == null || (w = f.trpc) === null || w === void 0
              ? void 0
              : w.abortOnUnmount) !== null && O !== void 0
            ? O
            : void 0) !== null && m !== void 0
          ? m
          : S.abortOnUnmount,
      Q = Hr(
        (0, y.default)(
          (0, y.default)({}, f),
          {},
          {
            queryKey: x,
            queryFn: (T) => {
              const M = (0, y.default)(
                (0, y.default)({}, f),
                {},
                {
                  trpc: (0, y.default)(
                    (0, y.default)({}, f?.trpc),
                    C ? { signal: T.signal } : { signal: null },
                  ),
                },
              );
              return S.client.query(...H(x, M));
            },
          },
        ),
        S.queryClient,
      );
    return ((Q.trpc = he({ path: g })), [Q.data, Q]);
  }
  function p(g, b) {
    const { client: f, queryClient: m } = a(),
      O = je(g),
      w = m.defaultMutationOptions(m.getMutationDefaults(O)),
      S = Jr(
        (0, y.default)(
          (0, y.default)({}, b),
          {},
          {
            mutationKey: O,
            mutationFn: (x) => f.mutation(...H([g, { input: x }], b)),
            onSuccess(...x) {
              var C, Q;
              return s({
                originalFn: () => {
                  var M, F, A;
                  return (M =
                    b == null || (F = b.onSuccess) === null || F === void 0
                      ? void 0
                      : F.call(b, ...x)) !== null && M !== void 0
                    ? M
                    : w == null || (A = w.onSuccess) === null || A === void 0
                      ? void 0
                      : A.call(w, ...x);
                },
                queryClient: m,
                meta:
                  (C = (Q = b?.meta) !== null && Q !== void 0 ? Q : w?.meta) !==
                    null && C !== void 0
                    ? C
                    : {},
              });
            },
          },
        ),
        m,
      );
    return ((S.trpc = he({ path: g })), S);
  }
  const v = { data: void 0, error: null, status: "idle" },
    P = { data: void 0, error: null, status: "connecting" };
  function d(g, b, f) {
    var m;
    const O = (m = f?.enabled) !== null && m !== void 0 ? m : b !== W,
      w = re(Y(g, b, "any")),
      { client: S } = a(),
      x = j.useRef(f);
    j.useEffect(() => {
      x.current = f;
    });
    const [C] = j.useState(new Set([])),
      Q = j.useCallback(
        ($) => {
          C.add($);
        },
        [C],
      ),
      T = j.useRef(null),
      M = j.useCallback(
        ($) => {
          const G = A.current,
            D = (A.current = $(G));
          let q = !1;
          for (const K of C)
            if (G[K] !== D[K]) {
              q = !0;
              break;
            }
          q && Z(_t(D, Q));
        },
        [Q, C],
      ),
      F = j.useCallback(() => {
        var $;
        if ((($ = T.current) === null || $ === void 0 || $.unsubscribe(), !O)) {
          M(() => (0, y.default)((0, y.default)({}, v), {}, { reset: F }));
          return;
        }
        M(() => (0, y.default)((0, y.default)({}, P), {}, { reset: F }));
        const G = S.subscription(g.join("."), b ?? void 0, {
          onStarted: () => {
            var D, q;
            ((D = (q = x.current).onStarted) === null ||
              D === void 0 ||
              D.call(q),
              M((K) =>
                (0, y.default)(
                  (0, y.default)({}, K),
                  {},
                  { status: "pending", error: null },
                ),
              ));
          },
          onData: (D) => {
            var q, K;
            ((q = (K = x.current).onData) === null ||
              q === void 0 ||
              q.call(K, D),
              M((se) =>
                (0, y.default)(
                  (0, y.default)({}, se),
                  {},
                  { status: "pending", data: D, error: null },
                ),
              ));
          },
          onError: (D) => {
            var q, K;
            ((q = (K = x.current).onError) === null ||
              q === void 0 ||
              q.call(K, D),
              M((se) =>
                (0, y.default)(
                  (0, y.default)({}, se),
                  {},
                  { status: "error", error: D },
                ),
              ));
          },
          onConnectionStateChange: (D) => {
            M((q) => {
              switch (D.state) {
                case "idle":
                  return (0, y.default)(
                    (0, y.default)({}, q),
                    {},
                    { status: D.state, error: null, data: void 0 },
                  );
                case "connecting":
                  return (0, y.default)(
                    (0, y.default)({}, q),
                    {},
                    { error: D.error, status: D.state },
                  );
                case "pending":
                  return q;
              }
            });
          },
          onComplete: () => {
            var D, q;
            ((D = (q = x.current).onComplete) === null ||
              D === void 0 ||
              D.call(q),
              M((K) =>
                (0, y.default)(
                  (0, y.default)({}, K),
                  {},
                  { status: "idle", error: null, data: void 0 },
                ),
              ));
          },
        });
        T.current = G;
      }, [S, w, O, M]);
    j.useEffect(
      () => (
        F(),
        () => {
          var $;
          ($ = T.current) === null || $ === void 0 || $.unsubscribe();
        }
      ),
      [F],
    );
    const A = j.useRef(
        O
          ? (0, y.default)((0, y.default)({}, P), {}, { reset: F })
          : (0, y.default)((0, y.default)({}, v), {}, { reset: F }),
      ),
      [L, Z] = j.useState(_t(A.current, Q));
    return L;
  }
  function _(g, b, f) {
    var m, O, w, S, x;
    const {
        client: C,
        ssrState: Q,
        prefetchInfiniteQuery: T,
        queryClient: M,
        abortOnUnmount: F,
      } = a(),
      A = Y(g, b, "infinite"),
      L = M.getQueryDefaults(A),
      Z = b === W;
    typeof window > "u" &&
      Q === "prepass" &&
      (f == null || (m = f.trpc) === null || m === void 0 ? void 0 : m.ssr) !==
        !1 &&
      ((O = f?.enabled) !== null && O !== void 0 ? O : L?.enabled) !== !1 &&
      !Z &&
      !M.getQueryCache().find({ queryKey: A }) &&
      T(A, (0, y.default)((0, y.default)({}, L), f));
    const $ = u(A, (0, y.default)((0, y.default)({}, L), f)),
      G =
        (w =
          f == null || (S = f.trpc) === null || S === void 0
            ? void 0
            : S.abortOnUnmount) !== null && w !== void 0
          ? w
          : F,
      D = Yr(
        (0, y.default)(
          (0, y.default)({}, $),
          {},
          {
            initialPageParam:
              (x = f.initialCursor) !== null && x !== void 0 ? x : null,
            persister: f.persister,
            queryKey: A,
            queryFn: Z
              ? b
              : (q) => {
                  var K;
                  const se = (0, y.default)(
                    (0, y.default)({}, $),
                    {},
                    {
                      trpc: (0, y.default)(
                        (0, y.default)({}, $?.trpc),
                        G ? { signal: q.signal } : { signal: null },
                      ),
                    },
                  );
                  return C.query(
                    ...H(A, se, {
                      pageParam:
                        (K = q.pageParam) !== null && K !== void 0
                          ? K
                          : f.initialCursor,
                      direction: q.direction,
                    }),
                  );
                },
          },
        ),
        M,
      );
    return ((D.trpc = he({ path: g })), D);
  }
  function E(g, b, f) {
    var m, O, w;
    const S = a(),
      x = Y(g, b, "infinite"),
      C = S.queryClient.getQueryDefaults(x),
      Q = b === W,
      T = u(x, (0, y.default)((0, y.default)({}, C), f)),
      M =
        (m =
          f == null || (O = f.trpc) === null || O === void 0
            ? void 0
            : O.abortOnUnmount) !== null && m !== void 0
          ? m
          : S.abortOnUnmount;
    Br(
      (0, y.default)(
        (0, y.default)({}, f),
        {},
        {
          initialPageParam:
            (w = f.initialCursor) !== null && w !== void 0 ? w : null,
          queryKey: x,
          queryFn: Q
            ? b
            : (F) => {
                var A;
                const L = (0, y.default)(
                  (0, y.default)({}, T),
                  {},
                  {
                    trpc: (0, y.default)(
                      (0, y.default)({}, T?.trpc),
                      M ? { signal: F.signal } : {},
                    ),
                  },
                );
                return S.client.query(
                  ...H(x, L, {
                    pageParam:
                      (A = F.pageParam) !== null && A !== void 0
                        ? A
                        : f.initialCursor,
                    direction: F.direction,
                  }),
                );
              },
        },
      ),
    );
  }
  function I(g, b, f) {
    var m, O, w;
    const S = a(),
      x = Y(g, b, "infinite"),
      C = S.queryClient.getQueryDefaults(x),
      Q = u(x, (0, y.default)((0, y.default)({}, C), f)),
      T =
        (m =
          f == null || (O = f.trpc) === null || O === void 0
            ? void 0
            : O.abortOnUnmount) !== null && m !== void 0
          ? m
          : S.abortOnUnmount,
      M = Wr(
        (0, y.default)(
          (0, y.default)({}, f),
          {},
          {
            initialPageParam:
              (w = f.initialCursor) !== null && w !== void 0 ? w : null,
            queryKey: x,
            queryFn: (F) => {
              var A;
              const L = (0, y.default)(
                (0, y.default)({}, Q),
                {},
                {
                  trpc: (0, y.default)(
                    (0, y.default)({}, Q?.trpc),
                    T ? { signal: F.signal } : {},
                  ),
                },
              );
              return S.client.query(
                ...H(x, L, {
                  pageParam:
                    (A = F.pageParam) !== null && A !== void 0
                      ? A
                      : f.initialCursor,
                  direction: F.direction,
                }),
              );
            },
          },
        ),
        S.queryClient,
      );
    return ((M.trpc = he({ path: g })), [M.data, M]);
  }
  return {
    Provider: o,
    createClient: i,
    useContext: a,
    useUtils: a,
    useQuery: c,
    usePrefetchQuery: l,
    useSuspenseQuery: h,
    useQueries: (g, b) => {
      const { ssrState: f, queryClient: m, prefetchQuery: O, client: w } = a(),
        S = St(w),
        x = g(S);
      if (typeof window > "u" && f === "prepass")
        for (const Q of x) {
          var C;
          const T = Q;
          ((C = T.trpc) === null || C === void 0 ? void 0 : C.ssr) !== !1 &&
            !m.getQueryCache().find({ queryKey: T.queryKey }) &&
            O(T.queryKey, T);
        }
      return Ht(
        {
          queries: x.map((Q) =>
            (0, y.default)((0, y.default)({}, Q), {}, { queryKey: Q.queryKey }),
          ),
          combine: b?.combine,
        },
        m,
      );
    },
    useSuspenseQueries: (g) => {
      const { queryClient: b, client: f } = a(),
        m = St(f),
        O = g(m),
        w = Gr(
          {
            queries: O.map((S) =>
              (0, y.default)(
                (0, y.default)({}, S),
                {},
                { queryFn: S.queryFn, queryKey: S.queryKey },
              ),
            ),
          },
          b,
        );
      return [w.map((S) => S.data), w];
    },
    useMutation: p,
    useSubscription: d,
    useInfiniteQuery: _,
    usePrefetchInfiniteQuery: E,
    useSuspenseInfiniteQuery: I,
  };
}
function bs(e) {
  const t = as(e);
  return st((r) =>
    r === "useContext" || r === "useUtils"
      ? () => {
          const s = e.useUtils();
          return j.useMemo(() => hs(s), [s]);
        }
      : e.hasOwnProperty(r)
        ? e[r]
        : t[r],
  );
}
function ws(e) {
  const t = ms();
  return bs(t);
}
export { Os as Q, Ps as a, ws as c, xs as h, jt as j };
