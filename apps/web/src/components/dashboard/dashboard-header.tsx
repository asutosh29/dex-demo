import { Plus } from "@repo/ui/icons";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Separator } from "@repo/ui/components/ui/separator";
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { trpc } from "~/lib/trpc";
import { useState } from "react";

interface DashboardHeaderProps {
  title: string;
  itemCount: number;
  selectedCollection: string | null;
}

export function DashboardHeader({
  title,
  itemCount,
  selectedCollection,
}: DashboardHeaderProps) {
  const [newItemUrl, setNewItemUrl] = useState("");
  const [isCreateItemOpen, setIsCreateItemOpen] = useState(false);

  const utils = trpc.useUtils();

  const addItemToCollection = trpc.collections.addItem.useMutation({
    onSuccess: () => {
      utils.collections.getAll.invalidate();
      if (selectedCollection) {
        utils.collections.get.invalidate({ id: selectedCollection });
      }
    },
  });

  const createItem = trpc.items.create.useMutation({
    onSuccess: (newItem) => {
      utils.items.getAll.invalidate();
      utils.collections.getAll.invalidate();

      // If a collection is selected, add the item to it
      if (selectedCollection && newItem?.id) {
        addItemToCollection.mutate({
          collectionId: selectedCollection,
          itemId: newItem.id,
        });
      }

      setNewItemUrl("");
      setIsCreateItemOpen(false);
    },
  });

  const handleCreateItem = () => {
    if (newItemUrl.trim()) {
      createItem.mutate({ url: newItemUrl });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {itemCount} {itemCount === 1 ? "item" : "items"}
              {selectedCollection ? " in collection" : " total"}
            </p>
          </div>
        </div>

        <Dialog open={isCreateItemOpen} onOpenChange={setIsCreateItemOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Item</DialogTitle>
              <DialogDescription>
                Enter a URL and we'll automatically extract the title and
                description
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="https://example.com/article"
              value={newItemUrl}
              onChange={(e) => setNewItemUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateItem();
                }
              }}
            />
            <DialogFooter>
              <Button
                onClick={handleCreateItem}
                disabled={
                  createItem.isPending ||
                  addItemToCollection.isPending ||
                  !newItemUrl.trim()
                }
              >
                {createItem.isPending || addItemToCollection.isPending
                  ? "Adding..."
                  : "Add Item"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Separator className="my-6" />
    </>
  );
}
