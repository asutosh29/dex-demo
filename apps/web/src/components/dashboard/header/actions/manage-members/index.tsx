import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Kbd } from "@repo/ui/components/ui/kbd";
import { Users } from "@repo/ui/icons";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "m" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
        // Only trigger if not in an input/textarea
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  if (!canView || !collectionId) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Users className="h-4 w-4" />
          <Kbd className="ml-1">M</Kbd>
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
          currentUserRole={currentCollection?.role}
        />
      </DialogContent>
    </Dialog>
  );
}
