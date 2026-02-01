import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { ChevronRight, PlusIcon } from "@repo/ui/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { trpc, type RouterOutputs } from "~/lib/trpc";
import { MemberManagementContent } from "./member-management-content";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

type Member = RouterOutputs["collectionAccess"]["getMembers"][number];

export function ManageMembers({
  role,
}: {
  role: "owner" | "admin" | "member" | undefined;
}) {
  const { collectionId } = useParams();
  const [open, setOpen] = useState(false);
  const { data: members, isLoading } =
    trpc.collectionAccess.getMembers.useQuery({
      collectionId: collectionId!,
    });

  // Show button for all members (members can view, admin/owner can manage)
  const canView = !!role;

  if (!canView || !collectionId) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="space-x-2 px-1">
          <AvatarGroup>
            <MemberAvatarGroup members={members || []} isLoading={isLoading} />
            <AvatarGroupCount>
              {role == "member" ? <ChevronRight /> : <PlusIcon />}
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
        <MemberManagementContent
          collectionId={collectionId}
          currentUserRole={role}
        />
      </DialogContent>
    </Dialog>
  );
}

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
          <AvatarImage src={member.user.image || undefined} />
          <AvatarFallback>
            {member.user.name?.[0]?.toUpperCase()}
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
