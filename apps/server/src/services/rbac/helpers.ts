// Pure RBAC helper functions with no DB dependencies
// Safe to import in frontend

import { Action, type Role, type ApiKeyMode } from "./types";
import { RolePermissions } from "./permissions";

// Re-export types for convenience
export type { Role, ApiKeyMode, Action };

/** Check if a role has a specific permission */
export function hasPermission(role: Role, action: Action): boolean {
  return RolePermissions[role].includes(action);
}

/** Can this role invite/remove members? */
export function canManageMembers(role: Role): boolean {
  return hasPermission(role, Action.COLLECTION_MANAGE_MEMBERS);
}

/** Can this role update collection settings (title, etc.)? */
export function canUpdateCollection(role: Role): boolean {
  return hasPermission(role, Action.COLLECTION_UPDATE);
}

/** Can this role manage API key access for shared collections? */
export function canManageApiKeyAccess(role: Role): boolean {
  return hasPermission(role, Action.API_KEY_ADD_COLLECTION_ACCESS);
}

/** Can this role purge (delete) a collection? Only owner can. */
export function canPurgeCollection(role: Role): boolean {
  return role === "owner";
}

/** Can currentUser edit the targetMember's role? (for member list UI) */
export function canEditMember(
  currentUserRole: Role,
  targetMemberRole: Role,
  isSelf: boolean,
): boolean {
  if (currentUserRole === "owner") {
    // Owner can edit anyone except other owners, OR transfer their own ownership
    return targetMemberRole !== "owner" || isSelf;
  }
  if (currentUserRole === "admin") {
    // Admin can edit members, or step down themselves
    return (
      (targetMemberRole === "member" && !isSelf) ||
      (isSelf && targetMemberRole === "admin")
    );
  }
  return false;
}

/** Role action type for UI dropdown menus */
export interface RoleAction {
  type:
    | "promote_admin"
    | "promote_owner"
    | "demote_member"
    | "step_down"
    | "remove"
    | "leave";
  label: string;
  destructive: boolean;
}

/** Determine which role actions are available for a member dropdown */
export function getAvailableRoleActions(
  currentUserRole: Role,
  targetMemberRole: Role,
  isSelf: boolean,
): RoleAction[] {
  const actions: RoleAction[] = [];

  // Admin viewing non-self member
  if (currentUserRole === "admin" && targetMemberRole === "member" && !isSelf) {
    actions.push({
      type: "promote_admin",
      label: "Promote to Admin",
      destructive: false,
    });
    actions.push({
      type: "remove",
      label: "Remove from Collection",
      destructive: true,
    });
  }

  // Admin self
  if (currentUserRole === "admin" && isSelf && targetMemberRole === "admin") {
    actions.push({
      type: "step_down",
      label: "Step Down to Member",
      destructive: false,
    });
    actions.push({
      type: "leave",
      label: "Leave Collection",
      destructive: true,
    });
  }

  // Owner viewing member
  if (currentUserRole === "owner" && targetMemberRole === "member") {
    actions.push({
      type: "promote_admin",
      label: "Promote to Admin",
      destructive: false,
    });
    actions.push({
      type: "remove",
      label: "Remove from Collection",
      destructive: true,
    });
  }

  // Owner viewing admin (not self)
  if (currentUserRole === "owner" && targetMemberRole === "admin" && !isSelf) {
    actions.push({
      type: "promote_owner",
      label: "Promote to Owner",
      destructive: false,
    });
    actions.push({
      type: "demote_member",
      label: "Demote to Member",
      destructive: false,
    });
  }

  // Owner self
  if (currentUserRole === "owner" && isSelf && targetMemberRole === "owner") {
    actions.push({
      type: "leave",
      label: "Leave Collection",
      destructive: true,
    });
  }

  // Member self
  if (currentUserRole === "member" && isSelf) {
    actions.push({
      type: "leave",
      label: "Leave Collection",
      destructive: true,
    });
  }

  return actions;
}
