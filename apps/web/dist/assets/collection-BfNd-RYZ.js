const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/preview-dialog-9-eGinej.js",
      "assets/trpc-vendor-BRuMgTtf.js",
      "assets/react-vendor-BNYpS37_.js",
      "assets/index-pSmjkKS7.js",
      "assets/dnd-vendor-DPteac_0.js",
      "assets/index-CqTm8-rh.css",
      "assets/editable-field-BYIbmHje.js",
      "assets/textarea-C-LGZX5X.js",
    ]),
) => i.map((i) => d[i]);
import { j as e } from "./trpc-vendor-BRuMgTtf.js";
import { r as u, h as ne, u as Se } from "./react-vendor-BNYpS37_.js";
import {
  a as _,
  t as j,
  b as ke,
  b3 as Me,
  e as x,
  l as Ie,
  I as V,
  ax as ae,
  aQ as H,
  aR as Q,
  B as v,
  aS as G,
  aT as O,
  b4 as D,
  b5 as T,
  b6 as A,
  j as F,
  L as q,
  b2 as ze,
  b7 as De,
  aW as Ae,
  aX as Le,
  b8 as ie,
  aY as Ue,
  b9 as Ee,
  ba as Pe,
  bb as Re,
  bc as Oe,
  a_ as Te,
  bd as _e,
  be as Fe,
  bf as $e,
  bg as Ve,
  bh as He,
  bi as le,
  bj as Qe,
  aU as re,
  D as K,
  f as Y,
  g as X,
  h as J,
  r as W,
  aV as Z,
  aK as Ge,
  aJ as qe,
  c as $,
  bk as Be,
  G as Ke,
  d as ee,
  aN as Ye,
  bl as Xe,
  b0 as Je,
  b1 as We,
  aF as Ze,
  aG as es,
  aH as ss,
  bm as ts,
  a$ as w,
} from "./index-pSmjkKS7.js";
import { E as ns } from "./editable-field-BYIbmHje.js";
import {
  a as as,
  g as is,
  b as ls,
  C as rs,
  d as os,
  L as cs,
  e as ds,
} from "./label-DYgFIhDc.js";
import {
  C as oe,
  e as us,
  S as ms,
  a as xs,
  b as hs,
  c as gs,
  d as se,
} from "./select-Dv83jA36.js";
import { L as ps, c as fs, p as js } from "./middleware-2xfD1H3l.js";
import "./dnd-vendor-DPteac_0.js";
import "./textarea-C-LGZX5X.js";
const vs = [
    [
      "path",
      {
        d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",
        key: "1fy3hk",
      },
    ],
    ["line", { x1: "12", x2: "12", y1: "7", y2: "13", key: "1cppfj" }],
    ["line", { x1: "15", x2: "9", y1: "10", y2: "10", key: "1gty7f" }],
  ],
  ce = _("bookmark-plus", vs);
const Ns = [
    [
      "rect",
      { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" },
    ],
    [
      "rect",
      { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" },
    ],
    [
      "rect",
      { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" },
    ],
    [
      "rect",
      { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" },
    ],
  ],
  bs = _("layout-grid", Ns);
const ys = [
    ["path", { d: "M3 5h.01", key: "18ugdj" }],
    ["path", { d: "M3 12h.01", key: "nlz23k" }],
    ["path", { d: "M3 19h.01", key: "noohij" }],
    ["path", { d: "M8 5h13", key: "1pao27" }],
    ["path", { d: "M8 12h13", key: "1za7za" }],
    ["path", { d: "M8 19h13", key: "m83p4d" }],
  ],
  ws = _("list", ys);
const Cs = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3",
      },
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }],
  ],
  Ss = _("send", Cs),
  de = u.createContext(null);
function L() {
  const s = u.use(de);
  if (!s)
    throw new Error("useCollection must be used within CollectionProvider");
  return s;
}
function ue({ collectionId: s, filter: t, onFilterChange: n, children: i }) {
  const { data: a, isLoading: d } = j.collections.get.useQuery(
      { id: s },
      { enabled: !!s },
    ),
    r = j.useUtils(),
    c = u.useMemo(() => a?.items ?? [], [a]),
    o = u.useMemo(
      () => (t === "all" ? c : c.filter((g) => g.type === t)),
      [c, t],
    ),
    h = {
      state: {
        collection: a,
        isLoading: d,
        filter: t,
        items: c,
        filteredItems: o,
      },
      actions: {
        setFilter: n,
        refetch: async () => {
          await r.collections.get.invalidate({ id: s });
        },
      },
      meta: { collectionId: s },
    };
  return e.jsx(de, { value: h, children: i });
}
const me = u.createContext(null);
function ks({ collectionId: s, currentUserRole: t, children: n }) {
  const { data: i } = ke.useSession(),
    a = j.useUtils(),
    { data: d, isLoading: r } = j.collectionAccess.getMembers.useQuery({
      collectionId: s,
    });
  return e.jsx(me, {
    value: {
      state: {
        members: d ?? [],
        isLoading: r,
        currentUserRole: t,
        currentUserId: i?.user?.id,
      },
      actions: {
        invalidateMembers: () =>
          a.collectionAccess.getMembers.invalidate({ collectionId: s }),
      },
      meta: { collectionId: s, canManage: as(t) },
    },
    children: n,
  });
}
function U() {
  const s = u.use(me);
  if (!s)
    throw new Error(
      "useMemberManagement must be used within MemberManagementProvider",
    );
  return s;
}
function Ms() {
  const { state: s, meta: t } = U(),
    [n, i] = u.useState(""),
    [a, d] = u.useState("member"),
    [r, c] = u.useState([]),
    [o, l] = u.useState(!1),
    [h, g] = u.useState(!1),
    N = Me(n, 300),
    { data: C, isLoading: S } = j.users.search.useQuery(
      { query: N },
      { enabled: N.length > 0 },
    ),
    p = j.invitations.bulkCreate.useMutation(),
    E = new Set(s.members?.map((m) => m.userId) || []),
    P = new Set(r.map((m) => m.id)),
    b = n
      ? s.members.filter((m) => {
          const f = n.toLowerCase();
          return (
            m.user?.name?.toLowerCase().includes(f) ||
            m.user?.email?.toLowerCase().includes(f)
          );
        })
      : s.members,
    M = C?.filter((m) => !E.has(m.id)) ?? [],
    B = M.length > 0 && M.every((m) => P.has(m.id));
  function ve(m) {
    c((f) =>
      f.some((y) => y.id === m.id) ? f.filter((y) => y.id !== m.id) : [...f, m],
    );
  }
  function Ne(m) {
    c((f) => f.filter((y) => y.id !== m));
  }
  function be() {
    if (B) {
      const m = new Set(M.map((f) => f.id));
      c((f) => f.filter((y) => !m.has(y.id)));
    } else
      c((m) => {
        const f = new Set(m.map((I) => I.id)),
          y = M.filter((I) => !f.has(I.id));
        return [...m, ...y];
      });
  }
  async function ye() {
    if (!(r.length === 0 || o)) {
      l(!0);
      try {
        const m = await p.mutateAsync({
          collectionId: t.collectionId,
          invitees: r.map((f) => ({ userId: f.id, role: a })),
        });
        if (m.failed.length === 0)
          (x.success(`Invited ${r.length} user${r.length > 1 ? "s" : ""}`),
            c([]),
            i(""));
        else {
          const f = m.succeeded.length;
          f > 0 && x.success(`Invited ${f} user${f > 1 ? "s" : ""}`);
          const y = m.failed.map((z) => {
            const R = r.find((Ce) => Ce.id === z.userId);
            return R?.name || R?.email;
          });
          x.error(`Failed to invite: ${y.join(", ")}`);
          const I = new Set(m.failed.map((z) => z.userId));
          c((z) => z.filter((R) => I.has(R.id)));
        }
      } catch {
        x.error("Something went wrong. Please try again.");
      }
      l(!1);
    }
  }
  function we() {
    (c([]), i(""), d("member"), g(!1));
  }
  return {
    query: n,
    setQuery: i,
    debouncedQuery: N,
    isSearching: S,
    filteredMembers: b,
    nonMemberResults: M,
    allNonMembersSelected: B,
    selectedUsers: r,
    selectedIds: P,
    toggleUser: ve,
    removeUser: Ne,
    toggleSelectAll: be,
    role: a,
    setRole: d,
    isSending: o,
    sendInvites: ye,
    reviewOpen: h,
    setReviewOpen: g,
    reset: we,
  };
}
function Is({ value: s, onChange: t }) {
  return e.jsxs("div", {
    className: "relative flex items-center pt-2",
    children: [
      e.jsx(Ie, { className: "absolute left-3 size-4 text-muted-foreground" }),
      e.jsx(V, {
        placeholder: "Search members or find people to invite...",
        value: s,
        onChange: (n) => t(n.target.value),
        className: "pl-9 pr-9",
      }),
      s &&
        e.jsx("button", {
          type: "button",
          onClick: () => t(""),
          className:
            "absolute right-3 text-muted-foreground hover:text-foreground",
          children: e.jsx(ae, { className: "size-4" }),
        }),
    ],
  });
}
function zs() {
  const { actions: s, meta: t } = U(),
    { collectionId: n } = t,
    i = j.useUtils(),
    a = j.collectionAccess.promoteMemberToAdmin.useMutation({
      onSuccess: () => {
        (s.invalidateMembers(), x.success("Promoted member to admin"));
      },
      onError: (l) => {
        x.error(l.message);
      },
    }),
    d = j.collectionAccess.demoteAdminToMember.useMutation({
      onSuccess: () => {
        (s.invalidateMembers(), x.success("Demoted member"));
      },
      onError: (l) => {
        x.error(l.message);
      },
    }),
    r = j.collectionAccess.removeMember.useMutation({
      onSuccess: () => {
        (s.invalidateMembers(), x.success("Removed member from collection"));
      },
      onError: (l) => {
        x.error(l.message);
      },
    }),
    c = j.collectionAccess.transferOwnership.useMutation({
      onSuccess: () => {
        (s.invalidateMembers(),
          i.collections.get.invalidate({ id: n }),
          x.success("Transferred ownership"));
      },
      onError: (l) => {
        x.error(l.message);
      },
    }),
    o = j.collectionAccess.leaveCollection.useMutation({
      onSuccess: () => {
        (i.collections.getUserCollections.invalidate(),
          x.success("Left collection"));
      },
      onError: (l) => {
        x.error(l.message);
      },
    });
  return {
    promote: (l) => a.mutate({ collectionId: n, userId: l }),
    demote: (l) => d.mutate({ collectionId: n, userId: l }),
    remove: (l) => r.mutate({ collectionId: n, userId: l }),
    transferOwnership: (l, h) => {
      confirm(
        `Transfer ownership to ${h.user?.name || "this member"}? You will become an admin.`,
      ) && c.mutate({ collectionId: n, newOwnerId: l });
    },
    leave: () => o.mutate({ collectionId: n }),
  };
}
function Ds({ member: s, isSelf: t }) {
  const { state: n } = U(),
    i = zs(),
    a = is(n.currentUserRole, s.role, t),
    d = {
      promote_admin: () => i.promote(s.userId),
      promote_owner: () => i.transferOwnership(s.userId, s),
      demote_member: () => i.demote(s.userId),
      step_down: () => i.demote(s.userId),
      remove: () => i.remove(s.userId),
      leave: () => i.leave(),
    },
    r = a.map((c) => ({
      label: c.label,
      onClick: d[c.type],
      variant: c.destructive ? "destructive" : "default",
    }));
  return r.length === 0
    ? null
    : e.jsxs(H, {
        children: [
          e.jsx(Q, {
            asChild: !0,
            children: e.jsxs(v, {
              variant: "ghost",
              size: "sm",
              className: "capitalize",
              children: [s.role, " ", e.jsx(oe, { className: "ml-1 h-3 w-3" })],
            }),
          }),
          e.jsx(G, {
            align: "end",
            children: r.map((c, o) =>
              e.jsx(
                O,
                {
                  onClick: c.onClick,
                  className:
                    c.variant === "destructive" ? "text-destructive" : "",
                  children: c.label,
                },
                o,
              ),
            ),
          }),
        ],
      });
}
function xe({ member: s }) {
  const { state: t } = U(),
    n = s.userId === t.currentUserId;
  if (!s.user) return null;
  const i = ls(t.currentUserRole, s.role, n);
  return e.jsxs("div", {
    className: "flex items-center justify-between p-3 rounded-lg",
    children: [
      e.jsxs("div", {
        className: "flex items-center gap-3",
        children: [
          e.jsxs(D, {
            className: "h-10 w-10",
            children: [
              e.jsx(T, { src: s.user.image || void 0 }),
              e.jsx(A, { children: s.user.name?.[0]?.toUpperCase() }),
            ],
          }),
          e.jsxs("div", {
            children: [
              e.jsxs("p", {
                className: "font-medium",
                children: [
                  s.user.name,
                  " ",
                  n &&
                    e.jsx("span", {
                      className: "text-muted-foreground",
                      children: "(You)",
                    }),
                ],
              }),
              e.jsx("p", {
                className: "text-sm text-muted-foreground",
                children: s.user.email,
              }),
            ],
          }),
        ],
      }),
      i
        ? e.jsx(Ds, { member: s, isSelf: n })
        : e.jsx(F, {
            variant: "secondary",
            className: "capitalize",
            children: s.role,
          }),
    ],
  });
}
function As({ user: s, isSelected: t, onToggle: n }) {
  return e.jsxs("button", {
    type: "button",
    onClick: () => n(s),
    className: `flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${t ? "border-primary/30 bg-accent" : "hover:bg-muted/50"}`,
    children: [
      e.jsx(rs, { checked: t, tabIndex: -1, className: "pointer-events-none" }),
      e.jsxs(D, {
        className: "size-10",
        children: [
          e.jsx(T, { src: s.image ?? void 0 }),
          e.jsx(A, { children: (s.name ?? s.email)[0]?.toUpperCase() }),
        ],
      }),
      e.jsxs("div", {
        className: "min-w-0",
        children: [
          e.jsx("p", { className: "truncate font-medium", children: s.name }),
          e.jsx("p", {
            className: "truncate text-sm text-muted-foreground",
            children: s.email,
          }),
        ],
      }),
    ],
  });
}
function Ls({
  isLoading: s,
  hasQuery: t,
  debouncedQuery: n,
  members: i,
  filteredMembers: a,
  nonMemberResults: d,
  isSearching: r,
  selectedIds: c,
  allNonMembersSelected: o,
  onToggleUser: l,
  onToggleSelectAll: h,
}) {
  const g = u.useRef(null),
    [N, C] = u.useState(!1),
    S = u.useCallback(() => {
      const p = g.current;
      p && C(p.scrollTop + p.clientHeight < p.scrollHeight - 1);
    }, []);
  return (
    u.useEffect(() => {
      S();
    }, [s, t, i, a, d, S]),
    e.jsx("div", {
      ref: g,
      onScroll: S,
      className: `flex-1 min-h-0 px-4 py-4 overflow-y-auto no-scrollbar transition-[mask-image] duration-200 ${N ? "mask-[linear-gradient(to_bottom,black_calc(100%-4rem),transparent)]" : ""}`,
      children: s
        ? e.jsx("div", {
            className: "flex items-center justify-center py-12",
            children: e.jsx(q, {
              className: "size-8 animate-spin text-muted-foreground",
            }),
          })
        : t
          ? e.jsx(Es, {
              filteredMembers: a,
              nonMemberResults: d,
              isSearching: r,
              selectedIds: c,
              allNonMembersSelected: o,
              debouncedQuery: n,
              onToggleUser: l,
              onToggleSelectAll: h,
            })
          : e.jsx(Us, { members: i }),
    })
  );
}
function Us({ members: s }) {
  return e.jsxs("div", {
    className: "space-y-2",
    children: [
      e.jsxs("p", {
        className:
          "text-xs font-medium tracking-wide text-muted-foreground uppercase",
        children: [s.length, " member", s.length !== 1 ? "s" : ""],
      }),
      s.map((t) => e.jsx(xe, { member: t }, t.userId)),
    ],
  });
}
function Es({
  filteredMembers: s,
  nonMemberResults: t,
  isSearching: n,
  selectedIds: i,
  allNonMembersSelected: a,
  debouncedQuery: d,
  onToggleUser: r,
  onToggleSelectAll: c,
}) {
  const o = !n && s.length === 0 && t.length === 0 && d.length > 0;
  return e.jsxs("div", {
    className: "space-y-4",
    children: [
      s.length > 0 &&
        e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsxs("p", {
              className:
                "text-xs font-medium tracking-wide text-muted-foreground uppercase",
              children: ["In collection · ", s.length],
            }),
            s.map((l) => e.jsx(xe, { member: l }, l.userId)),
          ],
        }),
      (n || t.length > 0) &&
        e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsx(ze, {}),
            e.jsxs("div", {
              className: "flex items-center justify-between pt-2",
              children: [
                e.jsxs("p", {
                  className:
                    "text-xs font-medium tracking-wide text-muted-foreground uppercase",
                  children: ["Not in collection ·", " ", n ? "..." : t.length],
                }),
                t.length > 0 &&
                  e.jsx("button", {
                    type: "button",
                    onClick: c,
                    className:
                      "text-xs font-medium text-primary hover:underline",
                    children: a ? "Deselect all" : "Select all",
                  }),
              ],
            }),
            n
              ? e.jsx("div", {
                  className: "flex items-center justify-center py-6",
                  children: e.jsx(q, {
                    className: "size-4 animate-spin text-muted-foreground",
                  }),
                })
              : t.map((l) =>
                  e.jsx(
                    As,
                    { user: l, isSelected: i.has(l.id), onToggle: r },
                    l.id,
                  ),
                ),
          ],
        }),
      o &&
        e.jsx("p", {
          className: "py-6 text-center text-sm text-muted-foreground",
          children: "No users found",
        }),
    ],
  });
}
function Ps({
  selectedUsers: s,
  role: t,
  onRoleChange: n,
  reviewOpen: i,
  onReviewOpenChange: a,
  isSending: d,
  onRemoveUser: r,
  onSendInvites: c,
}) {
  return e.jsx(De, {
    className: "border-t p-0",
    children: e.jsxs("div", {
      className: "flex w-full items-center justify-between p-3",
      children: [
        e.jsxs(Ae, {
          open: i,
          onOpenChange: a,
          children: [
            e.jsx(Le, {
              asChild: !0,
              children: e.jsxs(v, {
                variant: "ghost",
                className: "px-2",
                children: [
                  e.jsxs(ie, {
                    children: [
                      s
                        .slice(0, 2)
                        .map((o) =>
                          e.jsxs(
                            D,
                            {
                              size: "sm",
                              children: [
                                e.jsx(T, { src: o.image ?? void 0 }),
                                e.jsx(A, {
                                  children: (o.name ??
                                    o.email)[0]?.toUpperCase(),
                                }),
                              ],
                            },
                            o.id,
                          ),
                        ),
                      s.length > 2 &&
                        e.jsx(D, {
                          size: "sm",
                          children: e.jsxs(A, {
                            children: ["+", s.length - 2],
                          }),
                        }),
                    ],
                  }),
                  e.jsxs("p", {
                    className:
                      "inline-flex items-center gap-1 text-sm font-medium text-muted-foreground",
                    children: [
                      "Review",
                      " ",
                      i
                        ? e.jsx(oe, { className: "size-3" })
                        : e.jsx(us, { className: "size-3" }),
                    ],
                  }),
                ],
              }),
            }),
            e.jsxs(Ue, {
              side: "top",
              align: "start",
              sideOffset: 8,
              className: "w-72 p-0",
              children: [
                e.jsxs("p", {
                  className:
                    "px-4 pb-2 pt-3 text-xs font-medium tracking-wide text-muted-foreground uppercase",
                  children: ["Inviting ", s.length, " people"],
                }),
                e.jsx("div", {
                  className: "pb-1",
                  children: s.map((o) =>
                    e.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-3 px-4 py-2",
                        children: [
                          e.jsxs(D, {
                            className: "size-8 shrink-0",
                            children: [
                              e.jsx(T, { src: o.image ?? void 0 }),
                              e.jsx(A, {
                                children: (o.name ?? o.email)[0]?.toUpperCase(),
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className: "min-w-0 flex-1",
                            children: [
                              e.jsx("p", {
                                className: "truncate text-sm font-medium",
                                children: o.name,
                              }),
                              e.jsx("p", {
                                className:
                                  "truncate text-xs text-muted-foreground",
                                children: o.email,
                              }),
                            ],
                          }),
                          e.jsx(v, {
                            variant: "ghost",
                            size: "icon",
                            className:
                              "size-7 shrink-0 text-muted-foreground hover:text-foreground",
                            onClick: () => r(o.id),
                            children: e.jsx(ae, { className: "size-3.5" }),
                          }),
                        ],
                      },
                      o.id,
                    ),
                  ),
                }),
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          className: "flex shrink-0 items-center gap-2",
          children: [
            e.jsxs(ms, {
              value: t,
              onValueChange: (o) => n(o),
              children: [
                e.jsx(xs, { className: "w-28", children: e.jsx(hs, {}) }),
                e.jsxs(gs, {
                  children: [
                    e.jsx(se, { value: "member", children: "Member" }),
                    e.jsx(se, { value: "admin", children: "Admin" }),
                  ],
                }),
              ],
            }),
            e.jsxs(v, {
              onClick: c,
              disabled: d,
              children: [
                d
                  ? e.jsx(q, { className: "mr-2 size-4 animate-spin" })
                  : e.jsx(Ss, { className: "size-4" }),
                "Invite",
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function Rs() {
  const [s, t] = u.useState(!1),
    { state: n, meta: i } = U(),
    a = Ms();
  function d(r) {
    a.isSending || (r || a.reset(), t(r));
  }
  return e.jsxs(Ee, {
    open: s,
    onOpenChange: d,
    children: [
      e.jsx(Pe, {
        asChild: !0,
        children: e.jsx(v, {
          variant: "ghost",
          className: "space-x-2 px-1",
          children: e.jsxs(ie, {
            children: [
              e.jsx(Re, { members: n.members, isLoading: n.isLoading }),
              e.jsx(Oe, {
                children: i.canManage ? e.jsx(Te, {}) : e.jsx(_e, {}),
              }),
            ],
          }),
        }),
      }),
      e.jsxs(Fe, {
        className: "flex flex-col gap-0 p-0",
        children: [
          e.jsxs($e, {
            className: "border-b px-4 py-4",
            children: [
              e.jsx(Ve, { children: "Members" }),
              e.jsx(He, {
                children: "Manage who has access to this collection",
              }),
              i.canManage &&
                e.jsx(Is, { value: a.query, onChange: a.setQuery }),
            ],
          }),
          e.jsx(Ls, {
            isLoading: n.isLoading,
            hasQuery: a.query.length > 0,
            debouncedQuery: a.debouncedQuery,
            members: n.members,
            filteredMembers: a.filteredMembers,
            nonMemberResults: a.nonMemberResults,
            isSearching: a.isSearching,
            selectedIds: a.selectedIds,
            allNonMembersSelected: a.allNonMembersSelected,
            onToggleUser: a.toggleUser,
            onToggleSelectAll: a.toggleSelectAll,
          }),
          a.selectedUsers.length > 0 &&
            e.jsx(Ps, {
              selectedUsers: a.selectedUsers,
              role: a.role,
              onRoleChange: a.setRole,
              reviewOpen: a.reviewOpen,
              onReviewOpenChange: a.setReviewOpen,
              isSending: a.isSending,
              onRemoveUser: a.removeUser,
              onSendInvites: a.sendInvites,
            }),
        ],
      }),
    ],
  });
}
function Os({ role: s }) {
  const { collectionId: t } = ne();
  return !s || !t
    ? null
    : e.jsx(ks, {
        collectionId: t,
        currentUserRole: s,
        children: e.jsx(Rs, {}),
      });
}
function Ts({ collectionId: s, currentTitle: t, isShared: n, role: i }) {
  const a = Se(),
    [d, r] = u.useState(!1),
    [c, o] = u.useState(!1),
    [l, h] = u.useState(""),
    g = j.useUtils(),
    { mutate: N, isPending: C } =
      j.collectionAccess.leaveCollection.useMutation(),
    { mutate: S, isPending: p } = j.collections.delete.useMutation(),
    E = () => {
      N(
        { collectionId: s },
        {
          onSuccess: async () => {
            (await g.collections.getUserCollections.invalidate(),
              x.success("You have left the collection"),
              r(!1),
              a("/dashboard"));
          },
          onError: (b) => {
            (console.error(b),
              x.error(
                b.message || "Failed to leave collection. Please try again.",
              ),
              r(!1));
          },
        },
      );
    },
    P = () => {
      if (l !== t) {
        x.error("Collection name doesn't match");
        return;
      }
      S(
        { id: s },
        {
          onSuccess: async () => {
            (await g.collections.getUserCollections.invalidate(),
              x.success("Collection deleted successfully"),
              o(!1),
              h(""),
              a("/dashboard"));
          },
          onError: (b) => {
            (console.error(b),
              x.error(
                b.message || "Failed to delete collection. Please try again.",
              ));
          },
        },
      );
    };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsxs(H, {
        children: [
          e.jsx(Q, {
            asChild: !0,
            children: e.jsx(v, {
              variant: "ghost",
              size: "icon-sm",
              className: "size-8",
              children: e.jsx(le, { className: "size-4" }),
            }),
          }),
          e.jsxs(G, {
            align: "start",
            children: [
              e.jsxs(O, {
                onClick: () => r(!0),
                children: [
                  e.jsx(Qe, { className: "size-4" }),
                  "Leave Collection",
                ],
              }),
              i &&
                os(i) &&
                !n &&
                e.jsxs(O, {
                  onClick: () => o(!0),
                  variant: "destructive",
                  children: [
                    e.jsx(re, { className: "size-4 text-destructive" }),
                    "Purge Collection",
                  ],
                }),
            ],
          }),
        ],
      }),
      e.jsx(K, {
        open: d,
        onOpenChange: r,
        children: e.jsxs(Y, {
          className: "sm:max-w-[425px]",
          children: [
            e.jsxs(X, {
              children: [
                e.jsx(J, { children: "Leave Collection" }),
                e.jsx(W, {
                  children:
                    "Are you sure you want to leave this collection? You will lose access to all items in this collection.",
                }),
              ],
            }),
            e.jsxs(Z, {
              children: [
                e.jsx(v, {
                  type: "button",
                  variant: "outline",
                  onClick: () => r(!1),
                  disabled: C,
                  children: "Cancel",
                }),
                e.jsx(v, {
                  type: "button",
                  variant: "destructive",
                  onClick: E,
                  disabled: C,
                  children: C ? "Leaving..." : "Leave Collection",
                }),
              ],
            }),
          ],
        }),
      }),
      e.jsx(K, {
        open: c,
        onOpenChange: (b) => {
          (o(b), b || h(""));
        },
        children: e.jsxs(Y, {
          className: "sm:max-w-[425px]",
          children: [
            e.jsxs(X, {
              children: [
                e.jsx(J, { children: "Purge Collection" }),
                e.jsx(W, {
                  children:
                    "This action cannot be undone. This will permanently delete the collection and all its items.",
                }),
              ],
            }),
            e.jsx("div", {
              className: "grid gap-4 py-4",
              children: e.jsxs("div", {
                className: "grid gap-2",
                children: [
                  e.jsxs(cs, {
                    htmlFor: "confirmation",
                    children: [
                      "Type ",
                      e.jsx("span", {
                        className: "font-semibold",
                        children: t,
                      }),
                      " to confirm",
                    ],
                  }),
                  e.jsx(V, {
                    id: "confirmation",
                    value: l,
                    onChange: (b) => h(b.target.value),
                    placeholder: "Enter collection name",
                    autoFocus: !0,
                    disabled: p,
                  }),
                ],
              }),
            }),
            e.jsxs(Z, {
              children: [
                e.jsx(v, {
                  type: "button",
                  variant: "outline",
                  onClick: () => {
                    (o(!1), h(""));
                  },
                  disabled: p,
                  children: "Cancel",
                }),
                e.jsx(v, {
                  type: "button",
                  variant: "destructive",
                  onClick: P,
                  disabled: p || l !== t,
                  children: p ? "Purging..." : "Purge Collection",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function he() {
  const {
      state: { collection: s },
      meta: { collectionId: t },
      actions: { refetch: n },
    } = L(),
    i = j.useUtils();
  return s
    ? e.jsxs("div", {
        className: "flex items-center justify-between gap-2",
        children: [
          e.jsx(ns, {
            type: "text",
            value: s.title,
            className: "w-1/2",
            disabled: !ds(s.role),
            inputClassName: "font-display text-3xl",
            actions: "none",
            onSave: async (a) => {
              (await i.client.collections.update.mutate({ id: t, title: a }),
                await n(),
                await i.collections.getUserCollections.invalidate());
            },
            children: (a) =>
              e.jsxs("h1", {
                className:
                  "font-display text-3xl inline-flex items-baseline gap-2",
                children: [
                  e.jsx(Ge, { className: "size-5" }),
                  e.jsx("span", {
                    className: "max-w-[16ch] truncate",
                    children: a,
                  }),
                ],
              }),
          }),
          e.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              e.jsx(Os, { role: s.role }),
              e.jsx(Ts, {
                collectionId: t,
                currentTitle: s.title,
                role: s.role,
              }),
            ],
          }),
        ],
      })
    : null;
}
function ge() {
  const {
      meta: { collectionId: s },
      actions: { refetch: t },
    } = L(),
    [n, i] = u.useState(""),
    [a, d] = u.useState(!1),
    r = u.useRef(null),
    c = j.useUtils(),
    { mutate: o } = j.items.create.useMutation();
  u.useEffect(() => {
    const h = (g) => {
      if (g.key === "A" && !g.metaKey && !g.ctrlKey) {
        const N = g.target;
        if (
          N.tagName === "INPUT" ||
          N.tagName === "TEXTAREA" ||
          N.isContentEditable
        )
          return;
        (g.preventDefault(), r.current?.focus());
      }
    };
    return (
      document.addEventListener("keydown", h),
      () => document.removeEventListener("keydown", h)
    );
  }, []);
  const l = async (h) => {
    if ((h.preventDefault(), !n.trim())) return;
    const g = x.loading("Adding item...");
    (d(!0),
      o(
        { url: n, collectionId: s },
        {
          onSuccess: async () => {
            (await t(),
              await c.collections.getUserCollections.invalidate(),
              x.dismiss(g),
              x.success("Item added successfully!"),
              i(""),
              d(!1));
          },
          onError: (N) => {
            (console.log(N),
              x.dismiss(g),
              x.error("Failed to add item. Please try again."),
              d(!1));
          },
        },
      ));
  };
  return e.jsx("form", {
    onSubmit: l,
    className: $("relative rounded-lg"),
    children: e.jsxs("div", {
      className: $("relative rounded-lg", a && "bg-background"),
      children: [
        a
          ? e.jsx(ps, {
              className:
                "absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground animate-spin",
            })
          : e.jsx(ce, {
              className:
                "absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground ",
            }),
        " ",
        e.jsx(V, {
          ref: r,
          disabled: a,
          value: n,
          onChange: (h) => i(h.target.value),
          placeholder: "Add a link...",
          className: "pl-10 h-12 text-lg pr-10 bg-transparent",
        }),
        e.jsx("div", {
          className:
            "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1",
          children: e.jsx(qe, { children: "Shift + A" }),
        }),
      ],
    }),
  });
}
const pe = fs()(
  js((s) => ({ viewMode: "grid", setViewMode: (t) => s({ viewMode: t }) }), {
    name: "collection-view-mode",
  }),
);
function fe() {
  const {
    state: { filter: s, filteredItems: t },
    actions: { setFilter: n },
  } = L();
  return e.jsxs("div", {
    className: "flex justify-between items-center",
    children: [
      e.jsxs("div", {
        className: "flex gap-1",
        children: [
          e.jsxs(v, {
            variant: s === "all" ? "secondary" : "ghost",
            size: "sm",
            onClick: () => n("all"),
            className: "rounded-full transition-all duration-200 w-fit",
            children: [
              "All",
              s === "all" &&
                e.jsx("span", {
                  className: "text-muted-foreground ml-1",
                  children: t.length,
                }),
            ],
          }),
          e.jsxs(v, {
            variant: s === "link" ? "secondary" : "ghost",
            size: "sm",
            onClick: () => n("link"),
            className: "rounded-full transition-all duration-200 w-fit",
            children: [
              "Links",
              s === "link" &&
                e.jsx("span", {
                  className: "text-muted-foreground ml-1",
                  children: t.length,
                }),
            ],
          }),
          e.jsxs(v, {
            variant: s === "note" ? "secondary" : "ghost",
            size: "sm",
            onClick: () => n("note"),
            className: "rounded-full",
            children: [
              "Notes",
              s === "note" &&
                e.jsx("span", {
                  className: "text-muted-foreground ml-1",
                  children: t.length,
                }),
            ],
          }),
        ],
      }),
      e.jsx(_s, {}),
    ],
  });
}
const _s = () => {
    const { viewMode: s, setViewMode: t } = pe();
    return e.jsxs("div", {
      className: "flex gap-1 border rounded-md p-1",
      children: [
        e.jsx(v, {
          variant: s === "grid" ? "secondary" : "ghost",
          size: "icon-sm",
          onClick: () => t("grid"),
          className: "size-7",
          children: e.jsx(bs, { className: "h-4 w-4" }),
        }),
        e.jsx(v, {
          variant: s === "list" ? "secondary" : "ghost",
          size: "icon-sm",
          onClick: () => t("list"),
          className: "size-7",
          children: e.jsx(ws, { className: "h-4 w-4" }),
        }),
      ],
    });
  },
  Fs = u.lazy(() =>
    Ye(
      () => import("./preview-dialog-9-eGinej.js"),
      __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7]),
    ),
  ),
  $s = u.memo(function ({ item: t, collectionId: n, className: i }) {
    const {
        draggable: {
          attributes: a,
          listeners: d,
          setNodeRef: r,
          isDragging: c,
          active: o,
        },
        dialog: { open: l, onOpenChange: h, handleOpen: g },
        actions: { handleDelete: N },
      } = Be({ item: t, collectionId: n }),
      C = (p) =>
        new Date(p).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      S = (p) => {
        try {
          return new URL(p).hostname.replace("www.", "");
        } catch {
          return p;
        }
      };
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("div", {
          ref: n ? r : void 0,
          ...(n ? a : {}),
          ...(n ? d : {}),
          onClick: g,
          className: $(
            "group grid grid-cols-[1fr_auto_auto] gap-4 items-center py-3 px-4 rounded-md hover:bg-muted/50 transition-all duration-200 ease-in-out",
            n && "active:cursor-grabbing",
            !n && "cursor-pointer",
            n && (c || o?.id === t.id) && "opacity-50 scale-95",
            i,
          ),
          children: [
            e.jsxs("div", {
              className: "flex items-center gap-2 min-w-0",
              children: [
                t.favicon
                  ? e.jsx("img", {
                      src: t.favicon,
                      alt: "Favicon",
                      width: 16,
                      height: 16,
                      className: "w-4 h-4 shrink-0",
                    })
                  : e.jsx(Ke, {
                      className: "size-4 text-muted-foreground shrink-0",
                    }),
                e.jsxs(
                  ee,
                  {
                    preset: "slide-right",
                    className: "min-w-0 flex-1",
                    children: [
                      e.jsx("p", {
                        className: "truncate text-sm font-semibold",
                        children: e.jsx("a", {
                          href: t.url,
                          className: "hover:underline",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          children: t.title || t.url,
                        }),
                      }),
                      e.jsx("p", {
                        className: "truncate text-xs text-muted-foreground",
                        children: S(t.url),
                      }),
                    ],
                  },
                  t.id,
                ),
              ],
            }),
            e.jsxs(
              ee,
              {
                preset: "slide-left",
                className: "flex gap-1 flex-wrap max-w-md",
                children: [
                  t.tags
                    ?.slice(0, 3)
                    .map((p) =>
                      e.jsxs(
                        F,
                        {
                          variant: "secondary",
                          className: "text-xs",
                          children: ["#", p],
                        },
                        p,
                      ),
                    ),
                  t.tags &&
                    t.tags.length > 3 &&
                    e.jsxs(F, {
                      variant: "secondary",
                      className: "text-xs",
                      children: ["+", t.tags.length - 3],
                    }),
                ],
              },
              t.id,
            ),
            e.jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                e.jsx("span", {
                  className: "text-sm text-muted-foreground whitespace-nowrap",
                  children: C(t.createdAt),
                }),
                n &&
                  e.jsx("div", {
                    className:
                      "opacity-0 group-hover:opacity-100 transition-opacity",
                    children: e.jsxs(H, {
                      children: [
                        e.jsx(Q, {
                          asChild: !0,
                          onClick: (p) => p.stopPropagation(),
                          children: e.jsx(v, {
                            variant: "ghost",
                            size: "icon-sm",
                            className: "size-8",
                            children: e.jsx(le, { className: "h-4 w-4" }),
                          }),
                        }),
                        e.jsx(G, {
                          align: "end",
                          children: e.jsxs(O, {
                            onClick: N,
                            className:
                              "text-destructive focus:text-destructive",
                            children: [
                              e.jsx(re, { className: "mr-2 h-4 w-4" }),
                              "Delete",
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
              ],
            }),
          ],
        }),
        e.jsx(u.Suspense, {
          fallback: null,
          children: e.jsx(Fs, { open: l, onOpenChange: h, item: t }),
        }),
      ],
    });
  });
function je() {
  const {
      state: { filter: s, filteredItems: t },
      meta: { collectionId: n },
    } = L(),
    { viewMode: i } = pe();
  return t.length === 0
    ? e.jsxs("div", {
        className: "text-center py-12 text-muted-foreground",
        children: ["No ", s === "all" ? "" : s, " items found"],
      })
    : i === "grid"
      ? e.jsx("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          children: t.map((a) => e.jsx(Xe, { item: a, collectionId: n }, a.id)),
        })
      : e.jsx("div", {
          className: "flex flex-col",
          children: t.map((a) => e.jsx($s, { item: a, collectionId: n }, a.id)),
        });
}
function te() {
  return e.jsxs(Je, {
    className: "border",
    children: [
      e.jsxs(We, {
        children: [
          e.jsx(Ze, { variant: "icon", children: e.jsx(ce, {}) }),
          e.jsx(es, { children: "No items yet" }),
          e.jsx(ss, {
            children: "Add your first item to this collection to see it here.",
          }),
        ],
      }),
      e.jsx(ts, {
        children: e.jsx("p", {
          className: "text-muted-foreground text-sm",
          children:
            "Use the add button in the header to save links into this collection.",
        }),
      }),
    ],
  });
}
function Vs({ count: s = 6 }) {
  return e.jsxs("div", {
    className: "space-y-6 w-225 mx-auto",
    children: [
      e.jsxs("div", {
        className: "space-y-4",
        children: [
          e.jsxs("div", {
            className: "flex items-center justify-between gap-2",
            children: [
              e.jsxs("div", {
                className: "inline-flex items-baseline gap-2",
                children: [
                  e.jsx(w, { className: "h-9 w-48" }),
                  e.jsx(w, { className: "h-9 w-9 rounded-md" }),
                ],
              }),
              e.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  e.jsx(w, { className: "h-8 w-12 rounded-md" }),
                  e.jsx(w, { className: "h-8 w-8 rounded-md" }),
                ],
              }),
            ],
          }),
          e.jsx(w, { className: "h-12 w-full rounded-lg" }),
        ],
      }),
      e.jsx("div", {
        className: "flex justify-between items-center",
        children: e.jsxs("div", {
          className: "flex gap-2",
          children: [
            e.jsx(w, { className: "h-8 w-16 rounded-full" }),
            e.jsx(w, { className: "h-8 w-16 rounded-full" }),
            e.jsx(w, { className: "h-8 w-16 rounded-full" }),
          ],
        }),
      }),
      e.jsx("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        children: Array.from({ length: s }).map((t, n) =>
          e.jsxs(
            "div",
            {
              className: "space-y-2",
              children: [
                e.jsx(w, { className: "h-40 w-full rounded-md" }),
                e.jsx(w, { className: "h-4 w-3/4" }),
              ],
            },
            n,
          ),
        ),
      }),
    ],
  });
}
function Hs() {
  const {
    state: { isLoading: s, collection: t, items: n },
  } = L();
  return s
    ? e.jsx(Vs, {})
    : t
      ? e.jsxs("div", {
          className: "space-y-6 w-225 mx-auto",
          children: [
            e.jsxs("div", {
              className: "space-y-4",
              children: [e.jsx(he, {}), e.jsx(ge, {})],
            }),
            n.length === 0
              ? e.jsx(te, {})
              : e.jsxs(e.Fragment, {
                  children: [e.jsx(fe, {}), e.jsx(je, {})],
                }),
          ],
        })
      : e.jsx(te, {});
}
function k({ collectionId: s }) {
  const [t, n] = u.useState("all");
  return e.jsx(ue, {
    collectionId: s,
    filter: t,
    onFilterChange: n,
    children: e.jsx(Hs, {}),
  });
}
k.Provider = ue;
k.Header = he;
k.AddItemForm = ge;
k.Filters = fe;
k.Items = je;
function Zs() {
  const { collectionId: s } = ne();
  return s
    ? e.jsx(k, { collectionId: s })
    : e.jsx("div", {
        className: "text-muted-foreground",
        children: "No collection selected.",
      });
}
export { Zs as default };
