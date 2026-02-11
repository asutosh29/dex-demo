import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { toast } from "@repo/ui/components/ui/sonner";
import { LogOut, MoreHorizontal, Trash2 } from "@repo/ui/icons";
import { trpc } from "~/lib/trpc";

interface CollectionActionsDropdownProps {
  collectionId: string;
  currentTitle: string;
  role?: string;
  isShared?: boolean;
}

export function CollectionActionsDropdown({
  collectionId,
  currentTitle,
  isShared,
  role,
}: CollectionActionsDropdownProps) {
  const navigate = useNavigate();
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [purgeDialogOpen, setPurgeDialogOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const utils = trpc.useUtils();

  const { mutate: leaveCollection, isPending: isLeaving } =
    trpc.collectionAccess.leaveCollection.useMutation();

  const { mutate: deleteCollection, isPending: isDeleting } =
    trpc.collections.delete.useMutation();

  const handleLeave = () => {
    leaveCollection(
      { collectionId },
      {
        onSuccess: async () => {
          await utils.collections.getUserCollections.invalidate();
          toast.success("You have left the collection");
          setLeaveDialogOpen(false);
          navigate("/dashboard");
        },
        onError: (error) => {
          console.error(error);
          toast.error(
            error.message || "Failed to leave collection. Please try again.",
          );
          setLeaveDialogOpen(false);
        },
      },
    );
  };

  const handlePurge = () => {
    if (confirmationText !== currentTitle) {
      toast.error("Collection name doesn't match");
      return;
    }

    deleteCollection(
      { id: collectionId },
      {
        onSuccess: async () => {
          await utils.collections.getUserCollections.invalidate();
          toast.success("Collection deleted successfully");
          setPurgeDialogOpen(false);
          setConfirmationText("");
          navigate("/dashboard");
        },
        onError: (error) => {
          console.error(error);
          toast.error(
            error.message || "Failed to delete collection. Please try again.",
          );
        },
      },
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="size-8">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setLeaveDialogOpen(true)}>
            <LogOut className="size-4" />
            Leave Collection
          </DropdownMenuItem>
          {role === "owner" && !isShared && (
            <DropdownMenuItem
              onClick={() => setPurgeDialogOpen(true)}
              variant="destructive"
            >
              <Trash2 className="size-4 text-destructive" />
              Purge Collection
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Leave Confirmation Dialog */}
      <Dialog open={leaveDialogOpen} onOpenChange={setLeaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Leave Collection</DialogTitle>
            <DialogDescription>
              Are you sure you want to leave this collection? You will lose
              access to all items in this collection.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLeaveDialogOpen(false)}
              disabled={isLeaving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleLeave}
              disabled={isLeaving}
            >
              {isLeaving ? "Leaving..." : "Leave Collection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Purge Confirmation Dialog */}
      <Dialog
        open={purgeDialogOpen}
        onOpenChange={(open) => {
          setPurgeDialogOpen(open);
          if (!open) setConfirmationText("");
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Purge Collection</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              collection and all its items.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="confirmation">
                Type <span className="font-semibold">{currentTitle}</span> to
                confirm
              </Label>
              <Input
                id="confirmation"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="Enter collection name"
                autoFocus
                disabled={isDeleting}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setPurgeDialogOpen(false);
                setConfirmationText("");
              }}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handlePurge}
              disabled={isDeleting || confirmationText !== currentTitle}
            >
              {isDeleting ? "Purging..." : "Purge Collection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
