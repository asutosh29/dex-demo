import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { ChevronDown } from "@repo/ui/icons";
import { type RouterOutputs } from "~/lib/trpc";
import {
  getAvailableRoleActions,
  type RoleAction,
} from "@repo/server/rbac/helpers";
import { useMemberManagement } from "./member-management-context";
import { useMemberMutations } from "./use-member-mutations";

type Member = RouterOutputs["collectionAccess"]["getMembers"][number];

interface Props {
  member: Member;
  isSelf: boolean;
}

interface MenuItem {
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
}

export function RoleDropdown({ member, isSelf }: Props) {
  const { state } = useMemberManagement();
  const mutations = useMemberMutations();

  // Get available role actions from centralized RBAC
  const roleActions = getAvailableRoleActions(
    state.currentUserRole,
    member.role,
    isSelf,
  );

  // Map RoleAction types to mutation handlers
  const actionHandlers: Record<RoleAction["type"], () => void> = {
    promote_admin: () => mutations.promote(member.userId),
    promote_owner: () => mutations.transferOwnership(member.userId, member),
    demote_member: () => mutations.demote(member.userId),
    step_down: () => mutations.demote(member.userId),
    remove: () => mutations.remove(member.userId),
    leave: () => mutations.leave(),
  };

  // Convert RoleActions to MenuItem format
  const menuItems: MenuItem[] = roleActions.map((ra) => ({
    label: ra.label,
    onClick: actionHandlers[ra.type],
    variant: ra.destructive ? "destructive" : "default",
  }));

  if (menuItems.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="capitalize">
          {member.role} <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            className={item.variant === "destructive" ? "text-destructive" : ""}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
