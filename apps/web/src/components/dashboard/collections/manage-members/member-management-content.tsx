import { trpc } from "~/lib/trpc";
import { Loader2, UserPlus } from "@repo/ui/icons";
import { Button } from "@repo/ui/components/ui/button";
import { useState } from "react";
import { MemberListItem } from "./member-list-item";
import { AddMemberDialog } from "./add-member-dialog";

interface Props {
  collectionId: string;
  currentUserRole: "owner" | "admin" | "member";
}

export function MemberManagementContent({
  collectionId,
  currentUserRole,
}: Props) {
  const { data: members, isLoading } =
    trpc.collectionAccess.getMembers.useQuery({
      collectionId,
    });
  const [isAddingMember, setIsAddingMember] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Invite Member Button - admin/owner only */}
      {(currentUserRole === "admin" || currentUserRole === "owner") && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsAddingMember(true)}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      )}

      {/* Member List */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          {members?.length} member{members?.length !== 1 ? "s" : ""}
        </p>
        {members?.map((member) => (
          <MemberListItem
            key={member.userId}
            member={member}
            currentUserRole={currentUserRole}
            collectionId={collectionId}
          />
        ))}
      </div>

      <AddMemberDialog
        open={isAddingMember}
        onOpenChange={setIsAddingMember}
        collectionId={collectionId}
      />
    </div>
  );
}
