import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Users } from "@repo/ui/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { trpc } from "~/lib/trpc";
import { MemberManagementContent } from "./member-management-content";

export function ManageMembers() {
  const { collectionId } = useParams();
  const [open, setOpen] = useState(false);
  const { data: currentCollection } = trpc.collections.get.useQuery(
    { id: collectionId! },
    { enabled: !!collectionId },
  );

  // Show button for all members (members can view, admin/owner can manage)
  const canView = !!currentCollection?.role;

  if (!canView || !collectionId) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Users className="h-4 w-4" />
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
          currentUserRole={currentCollection?.role!}
        />
      </DialogContent>
    </Dialog>
  );
}
