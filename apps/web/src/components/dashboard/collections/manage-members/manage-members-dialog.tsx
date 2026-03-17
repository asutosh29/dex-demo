import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import { Button } from "@repo/ui/components/ui/button";
import { AvatarGroup, AvatarGroupCount } from "@repo/ui/components/ui/avatar";
import { ChevronRight, PlusIcon } from "@repo/ui/icons";
import { useState } from "react";
import { useMemberManagement } from "./member-management-context";
import { useInvite } from "./use-invite";
import { MemberAvatarGroup } from "./member-avatar-group";
import { MemberSearchInput } from "./member-search-input";
import { MemberBody } from "./member-body";
import { InviteFooter } from "./invite-footer";

export function ManageMembersDialog() {
  const [open, setOpen] = useState(false);
  const { state, meta } = useMemberManagement();
  const invite = useInvite();

  function handleOpenChange(value: boolean) {
    if (invite.isSending) return;
    if (!value) invite.reset();
    setOpen(value);
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
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
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0 p-0">
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle>Members</SheetTitle>
          <SheetDescription>
            Manage who has access to this collection
          </SheetDescription>
          {meta.canManage && (
            <MemberSearchInput
              value={invite.query}
              onChange={invite.setQuery}
            />
          )}
        </SheetHeader>

        <MemberBody
          isLoading={state.isLoading}
          hasQuery={invite.query.length > 0}
          debouncedQuery={invite.debouncedQuery}
          members={state.members}
          filteredMembers={invite.filteredMembers}
          nonMemberResults={invite.nonMemberResults}
          isSearching={invite.isSearching}
          selectedIds={invite.selectedIds}
          allNonMembersSelected={invite.allNonMembersSelected}
          onToggleUser={invite.toggleUser}
          onToggleSelectAll={invite.toggleSelectAll}
        />

        {invite.selectedUsers.length > 0 && (
          <InviteFooter
            selectedUsers={invite.selectedUsers}
            role={invite.role}
            onRoleChange={invite.setRole}
            reviewOpen={invite.reviewOpen}
            onReviewOpenChange={invite.setReviewOpen}
            isSending={invite.isSending}
            onRemoveUser={invite.removeUser}
            onSendInvites={invite.sendInvites}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
