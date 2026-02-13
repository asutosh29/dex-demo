import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";
import { RoleDropdown } from "./role-dropdown";
import { canEditMember } from "@repo/server/rbac/helpers";
import type { RouterOutputs } from "~/lib/trpc";
import { useMemberManagement } from "./member-management-context";

type Member = RouterOutputs["collectionAccess"]["getMembers"][number];

interface MemberListItemProps {
  member: Member;
}

export function MemberListItem({ member }: MemberListItemProps) {
  const { state } = useMemberManagement();
  const isSelf = member.userId === state.currentUserId;

  // Guard against null user (shouldn't happen in practice)
  if (!member.user) {
    return null;
  }

  // Determine if role is editable using centralized RBAC logic
  const canEdit = canEditMember(state.currentUserRole, member.role, isSelf);

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={member.user.image || undefined} />
          <AvatarFallback>
            {member.user.name?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">
            {member.user.name}{" "}
            {isSelf && <span className="text-muted-foreground">(You)</span>}
          </p>
          <p className="text-sm text-muted-foreground">{member.user.email}</p>
        </div>
      </div>

      {canEdit ? (
        <RoleDropdown member={member} isSelf={isSelf} />
      ) : (
        <Badge variant="secondary" className="capitalize">
          {member.role}
        </Badge>
      )}
    </div>
  );
}
