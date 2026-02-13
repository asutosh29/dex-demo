import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { ChevronRight, PlusIcon } from "@repo/ui/icons";
import { useState } from "react";
import { MemberList } from "./member-list";
import { InviteMemberButton } from "./invite-member-button";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { useMemberManagement } from "./member-management-context";
import type { RouterOutputs } from "~/lib/trpc";

type Member = RouterOutputs["collectionAccess"]["getMembers"][number];

export const MemberAvatarGroup = ({
  members,
  isLoading,
  showMemberCount = false,
}: {
  members: Member[];
  isLoading?: boolean;
  showMemberCount?: boolean;
}) => {
  // Show avatar group only if there are members
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
};

export function ManageMembersDialog() {
  const [open, setOpen] = useState(false);
  const { state, meta } = useMemberManagement();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="space-x-2 px-1">
          <AvatarGroup>
            <MemberAvatarGroup
              members={state.members}
              isLoading={state.isLoading}
            />
            <AvatarGroupCount>
              {meta.canManage ? <PlusIcon /> : <ChevronRight />}
            </AvatarGroupCount>
          </AvatarGroup>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Members</DialogTitle>
          <DialogDescription>
            View and manage collection members
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <InviteMemberButton />
          <MemberList />
        </div>
      </DialogContent>
    </Dialog>
  );
}
