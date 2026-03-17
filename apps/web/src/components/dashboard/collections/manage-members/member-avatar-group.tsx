import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import type { RouterOutputs } from "~/lib/trpc";

type Member = RouterOutputs["collectionAccess"]["getMembers"][number];

interface MemberAvatarGroupProps {
  members: Member[];
  isLoading?: boolean;
  showMemberCount?: boolean;
}

export function MemberAvatarGroup({
  members,
  isLoading,
  showMemberCount = false,
}: MemberAvatarGroupProps) {
  if (members.length === 0) return null;

  if (isLoading) {
    return (
      <AvatarGroup>
        {Array.from({ length: 3 }).map((_, index) => (
          <Avatar key={index} size="sm">
            <AvatarFallback>
              <Skeleton className="size-4" />
            </AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    );
  }

  return (
    <AvatarGroup>
      {members.slice(0, 3).map((member) => (
        <Avatar key={member.userId} size="sm">
          <AvatarImage src={member.user?.image || undefined} />
          <AvatarFallback>
            {member.user?.name?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {members.length > 3 && showMemberCount && (
        <Avatar size="sm">
          <AvatarFallback>+{members.length - 3}</AvatarFallback>
        </Avatar>
      )}
    </AvatarGroup>
  );
}
