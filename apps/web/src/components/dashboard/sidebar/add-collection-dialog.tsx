import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { useState } from "react";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";

import { trpc } from "~/lib/trpc";

export function AddCollectionDialogTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const [newCollectionTitle, setNewCollectionTitle] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const utils = trpc.useUtils();

  const createCollection = trpc.collections.create.useMutation({
    onSuccess: () => {
      utils.collections.getAll.invalidate();
      setNewCollectionTitle("");
      setIsCreateDialogOpen(false);
    },
  });

  const handleCreateCollection = () => {
    if (newCollectionTitle.trim()) {
      createCollection.mutate({ title: newCollectionTitle });
    }
  };

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Collection</DialogTitle>
          <DialogDescription>
            Create a new collection to organize your items
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Collection title"
          value={newCollectionTitle}
          onChange={(e) => setNewCollectionTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateCollection();
            }
          }}
        />
        <DialogFooter>
          <Button
            onClick={handleCreateCollection}
            disabled={createCollection.isPending}
          >
            {createCollection.isPending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
