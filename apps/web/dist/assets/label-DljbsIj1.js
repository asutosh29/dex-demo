import { j as s } from "./trpc-vendor-CLp1aBhv.js";
import { r as E } from "./react-vendor-nYV-xjaT.js";
import {
  a0 as H,
  P as N,
  v as F,
  x as y,
  z as P,
  a1 as q,
  W as z,
  $,
  a as D,
  a2 as U,
} from "./index-YxyRed48.js";
import { u as X } from "./select-3yEQBxpb.js";
var A = "Checkbox",
  [J] = z(A),
  [Q, k] = J(A);
function Z(e) {
  const {
      __scopeCheckbox: o,
      checked: n,
      children: r,
      defaultChecked: i,
      disabled: a,
      form: _,
      name: p,
      onCheckedChange: l,
      required: f,
      value: b = "on",
      internal_do_not_use_render: u,
    } = e,
    [C, I] = F({ prop: n, defaultProp: i ?? !1, onChange: l, caller: A }),
    [O, L] = E.useState(null),
    [h, c] = E.useState(null),
    d = E.useRef(!1),
    T = O ? !!_ || !!O.closest("form") : !0,
    v = {
      checked: C,
      disabled: a,
      setChecked: I,
      control: O,
      setControl: L,
      name: p,
      form: _,
      value: b,
      hasConsumerStoppedPropagationRef: d,
      required: f,
      defaultChecked: m(i) ? !1 : i,
      isFormControl: T,
      bubbleInput: h,
      setBubbleInput: c,
    };
  return s.jsx(Q, { scope: o, ...v, children: ee(u) ? u(v) : r });
}
var S = "CheckboxTrigger",
  g = E.forwardRef(
    ({ __scopeCheckbox: e, onKeyDown: o, onClick: n, ...r }, i) => {
      const {
          control: a,
          value: _,
          disabled: p,
          checked: l,
          required: f,
          setControl: b,
          setChecked: u,
          hasConsumerStoppedPropagationRef: C,
          isFormControl: I,
          bubbleInput: O,
        } = k(S, e),
        L = y(i, b),
        h = E.useRef(l);
      return (
        E.useEffect(() => {
          const c = a?.form;
          if (c) {
            const d = () => u(h.current);
            return (
              c.addEventListener("reset", d),
              () => c.removeEventListener("reset", d)
            );
          }
        }, [a, u]),
        s.jsx(N.button, {
          type: "button",
          role: "checkbox",
          "aria-checked": m(l) ? "mixed" : l,
          "aria-required": f,
          "data-state": V(l),
          "data-disabled": p ? "" : void 0,
          disabled: p,
          value: _,
          ...r,
          ref: L,
          onKeyDown: P(o, (c) => {
            c.key === "Enter" && c.preventDefault();
          }),
          onClick: P(n, (c) => {
            (u((d) => (m(d) ? !0 : !d)),
              O &&
                I &&
                ((C.current = c.isPropagationStopped()),
                C.current || c.stopPropagation()));
          }),
        })
      );
    },
  );
g.displayName = S;
var R = E.forwardRef((e, o) => {
  const {
    __scopeCheckbox: n,
    name: r,
    checked: i,
    defaultChecked: a,
    required: _,
    disabled: p,
    value: l,
    onCheckedChange: f,
    form: b,
    ...u
  } = e;
  return s.jsx(Z, {
    __scopeCheckbox: n,
    checked: i,
    defaultChecked: a,
    disabled: p,
    required: _,
    onCheckedChange: f,
    name: r,
    form: b,
    value: l,
    internal_do_not_use_render: ({ isFormControl: C }) =>
      s.jsxs(s.Fragment, {
        children: [
          s.jsx(g, { ...u, ref: o, __scopeCheckbox: n }),
          C && s.jsx(Y, { __scopeCheckbox: n }),
        ],
      }),
  });
});
R.displayName = A;
var w = "CheckboxIndicator",
  j = E.forwardRef((e, o) => {
    const { __scopeCheckbox: n, forceMount: r, ...i } = e,
      a = k(w, n);
    return s.jsx(H, {
      present: r || m(a.checked) || a.checked === !0,
      children: s.jsx(N.span, {
        "data-state": V(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...i,
        ref: o,
        style: { pointerEvents: "none", ...e.style },
      }),
    });
  });
j.displayName = w;
var B = "CheckboxBubbleInput",
  Y = E.forwardRef(({ __scopeCheckbox: e, ...o }, n) => {
    const {
        control: r,
        hasConsumerStoppedPropagationRef: i,
        checked: a,
        defaultChecked: _,
        required: p,
        disabled: l,
        name: f,
        value: b,
        form: u,
        bubbleInput: C,
        setBubbleInput: I,
      } = k(B, e),
      O = y(n, I),
      L = X(a),
      h = q(r);
    E.useEffect(() => {
      const d = C;
      if (!d) return;
      const T = window.HTMLInputElement.prototype,
        M = Object.getOwnPropertyDescriptor(T, "checked").set,
        G = !i.current;
      if (L !== a && M) {
        const W = new Event("click", { bubbles: G });
        ((d.indeterminate = m(a)),
          M.call(d, m(a) ? !1 : a),
          d.dispatchEvent(W));
      }
    }, [C, L, a, i]);
    const c = E.useRef(m(a) ? !1 : a);
    return s.jsx(N.input, {
      type: "checkbox",
      "aria-hidden": !0,
      defaultChecked: _ ?? c.current,
      required: p,
      disabled: l,
      name: f,
      value: b,
      form: u,
      ...o,
      tabIndex: -1,
      ref: O,
      style: {
        ...o.style,
        ...h,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0,
        transform: "translateX(-100%)",
      },
    });
  });
Y.displayName = B;
function ee(e) {
  return typeof e == "function";
}
function m(e) {
  return e === "indeterminate";
}
function V(e) {
  return m(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const t = {
    COLLECTION_READ: "collection:read",
    COLLECTION_UPDATE: "collection:update",
    COLLECTION_VIEW_MEMBERS: "collection:view_members",
    COLLECTION_LEAVE: "collection:leave",
    COLLECTION_MANAGE_MEMBERS: "collection:manage_members",
    COLLECTION_CHANGE_ROLES: "collection:change_roles",
    ITEM_ADD: "item:add",
    ITEM_COPY: "item:copy",
    ITEM_MOVE: "item:move",
    ITEM_DELETE_OWN: "item:delete_own",
    ITEM_DELETE_ANY: "item:delete_any",
    ITEM_SHARE: "item:share",
    API_KEY_ADD_COLLECTION_ACCESS: "api_key:add_collection_access",
    API_KEY_REMOVE_COLLECTION_ACCESS: "api_key:remove_collection_access",
    API_KEY_CONFIGURE_ACCESS_SCOPE: "api_key:configure_access_scope",
  },
  te = {
    member: [
      t.COLLECTION_READ,
      t.COLLECTION_VIEW_MEMBERS,
      t.COLLECTION_LEAVE,
      t.ITEM_ADD,
      t.ITEM_COPY,
      t.ITEM_DELETE_OWN,
    ],
    admin: [
      t.COLLECTION_READ,
      t.COLLECTION_VIEW_MEMBERS,
      t.COLLECTION_LEAVE,
      t.ITEM_ADD,
      t.ITEM_COPY,
      t.ITEM_DELETE_OWN,
      t.COLLECTION_UPDATE,
      t.ITEM_MOVE,
      t.ITEM_DELETE_ANY,
      t.COLLECTION_MANAGE_MEMBERS,
      t.COLLECTION_CHANGE_ROLES,
      t.API_KEY_ADD_COLLECTION_ACCESS,
      t.API_KEY_REMOVE_COLLECTION_ACCESS,
    ],
    owner: [
      t.COLLECTION_READ,
      t.COLLECTION_VIEW_MEMBERS,
      t.COLLECTION_LEAVE,
      t.ITEM_ADD,
      t.ITEM_COPY,
      t.ITEM_DELETE_OWN,
      t.ITEM_DELETE_ANY,
      t.ITEM_SHARE,
      t.COLLECTION_UPDATE,
      t.ITEM_MOVE,
      t.COLLECTION_MANAGE_MEMBERS,
      t.API_KEY_ADD_COLLECTION_ACCESS,
      t.API_KEY_REMOVE_COLLECTION_ACCESS,
      t.COLLECTION_CHANGE_ROLES,
      t.API_KEY_CONFIGURE_ACCESS_SCOPE,
    ],
  };
function x(e, o) {
  return te[e].includes(o);
}
function ie(e) {
  return x(e, t.COLLECTION_MANAGE_MEMBERS);
}
function de(e) {
  return x(e, t.COLLECTION_UPDATE);
}
function Ee(e) {
  return x(e, t.API_KEY_ADD_COLLECTION_ACCESS);
}
function le(e) {
  return e === "owner";
}
function ue(e, o, n) {
  return e === "owner"
    ? o !== "owner" || n
    : e === "admin"
      ? (o === "member" && !n) || (n && o === "admin")
      : !1;
}
function Ce(e, o, n) {
  const r = [];
  return (
    e === "admin" &&
      o === "member" &&
      !n &&
      (r.push({
        type: "promote_admin",
        label: "Promote to Admin",
        destructive: !1,
      }),
      r.push({
        type: "remove",
        label: "Remove from Collection",
        destructive: !0,
      })),
    e === "admin" &&
      n &&
      o === "admin" &&
      (r.push({
        type: "step_down",
        label: "Step Down to Member",
        destructive: !1,
      }),
      r.push({ type: "leave", label: "Leave Collection", destructive: !0 })),
    e === "owner" &&
      o === "member" &&
      (r.push({
        type: "promote_admin",
        label: "Promote to Admin",
        destructive: !1,
      }),
      r.push({
        type: "remove",
        label: "Remove from Collection",
        destructive: !0,
      })),
    e === "owner" &&
      o === "admin" &&
      !n &&
      (r.push({
        type: "promote_owner",
        label: "Promote to Owner",
        destructive: !1,
      }),
      r.push({
        type: "demote_member",
        label: "Demote to Member",
        destructive: !1,
      })),
    e === "owner" &&
      n &&
      o === "owner" &&
      r.push({ type: "leave", label: "Leave Collection", destructive: !0 }),
    e === "member" &&
      n &&
      r.push({ type: "leave", label: "Leave Collection", destructive: !0 }),
    r
  );
}
function _e({ className: e, ...o }) {
  return s.jsx(R, {
    "data-slot": "checkbox",
    className: D(
      "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
      e,
    ),
    ...o,
    children: s.jsx(j, {
      "data-slot": "checkbox-indicator",
      className: "grid place-content-center text-current transition-none",
      children: s.jsx($, { className: "size-3.5" }),
    }),
  });
}
var oe = "Label",
  K = E.forwardRef((e, o) =>
    s.jsx(U.label, {
      ...e,
      ref: o,
      onMouseDown: (n) => {
        n.target.closest("button, input, select, textarea") ||
          (e.onMouseDown?.(n),
          !n.defaultPrevented && n.detail > 1 && n.preventDefault());
      },
    }),
  );
K.displayName = oe;
var ne = K;
function pe({ className: e, ...o }) {
  return s.jsx(ne, {
    "data-slot": "label",
    className: D(
      "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      e,
    ),
    ...o,
  });
}
export {
  _e as C,
  pe as L,
  ie as a,
  ue as b,
  Ee as c,
  le as d,
  de as e,
  Ce as g,
};
