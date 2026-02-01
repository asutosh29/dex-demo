import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { Pencil, LogOut, MoreHorizontal } from "@repo/ui/icons";
import { trpc } from "~/lib/trpc";

interface CollectionActionsDropdownProps {
  collectionId: string;
  currentTitle: string;
}

export function CollectionActionsDropdown({
  collectionId,
  currentTitle,
}: CollectionActionsDropdownProps) {
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [title, setTitle] = useState(currentTitle);

  const utils = trpc.useUtils();

  const { mutate: updateCollection, isPending: isUpdating } =
    trpc.collections.update.useMutation();

  const { mutate: leaveCollection, isPending: isLeaving } =
    trpc.collectionAccess.leaveCollection.useMutation();

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Collection name cannot be empty");
      return;
    }

    if (title.trim() === currentTitle) {
      setEditDialogOpen(false);
      return;
    }

    updateCollection(
      { id: collectionId, title: title.trim() },
      {
        onSuccess: async () => {
          await utils.collections.get.invalidate({ id: collectionId });
          await utils.collections.getUserCollections.invalidate();
          toast.success("Collection updated successfully!");
          setEditDialogOpen(false);
        },
        onError: (error) => {
          console.error(error);
          toast.error("Failed to update collection. Please try again.");
        },
      },
    );
  };

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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="size-8">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            <Pencil className="size-4" />
            Edit Collection
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setLeaveDialogOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="size-4" />
            Leave Collection
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Collection</DialogTitle>
              <DialogDescription>
                Update the name of your collection.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Collection Name</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter collection name"
                  autoFocus
                  disabled={isUpdating}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
    </>
  );
}
