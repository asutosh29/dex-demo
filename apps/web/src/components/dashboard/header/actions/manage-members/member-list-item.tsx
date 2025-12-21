import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";
import { authClient } from "~/lib/auth-client";
import { RoleDropdown } from "./role-dropdown";

interface MemberListItemProps {
  member: {
    userId: string;
    user: { name: string; email: string; image?: string | null };
    role: "owner" | "admin" | "member";
  };
  currentUserRole: "owner" | "admin" | "member";
  collectionId: string;
}

export function MemberListItem({
  member,
  currentUserRole,
  collectionId,
}: MemberListItemProps) {
  const { data: session } = authClient.useSession();
  const isSelf = member.userId === session?.user?.id;

  const isCurrentUserOwner = currentUserRole === "owner";
  const isCurrentUserAdmin = currentUserRole === "admin";

  // Determine if role is editable
  const canEdit =
    (isCurrentUserOwner && member.role !== "owner") || // Owner can edit anyone except other owners
    (isCurrentUserOwner && isSelf && member.role === "owner") || // Owner can transfer ownership (self)
    (isCurrentUserAdmin && member.role === "member") || // Admin can edit members
    (isCurrentUserAdmin && isSelf && member.role === "admin"); // Admin can step down

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
        <RoleDropdown
          member={member}
          currentUserRole={currentUserRole}
          collectionId={collectionId}
          isSelf={isSelf}
        />
      ) : (
        <Badge variant="secondary" className="capitalize">
          {member.role}
        </Badge>
      )}
    </div>
  );
}
