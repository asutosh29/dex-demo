import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";
import type { RouterOutputs } from "~/lib/trpc";

export type CollectionItem =
  RouterOutputs["collections"]["get"]["items"][number];

interface UseCollectionItemOptions {
  item: CollectionItem;
  collectionId?: string;
}

export function useCollectionItem({
  item,
  collectionId,
}: UseCollectionItemOptions) {
  const [dialogOpen, setDialogOpen] = useState(false);

  // Draggable setup
  const draggable = useDraggable({
    id: item.id,
    data: {
      type: "item",
      item,
      collectionId,
    },
    disabled: !collectionId,
  });

  // Delete mutation
  const utils = trpc.useUtils();
  const deleteMutation = trpc.collections.removeItem.useMutation({
    onSuccess: () => {
      utils.collections.get.invalidate({ id: collectionId! });
      toast.success("Item deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete item");
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteMutation.mutate({
      collectionId: collectionId!,
      itemId: item.id,
    });
  };

  const handleOpenDialog = () => {
    if (!draggable.isDragging) {
      setDialogOpen(true);
    }
  };

  return {
    draggable,
    dialog: {
      open: dialogOpen,
      onOpenChange: setDialogOpen,
      handleOpen: handleOpenDialog,
    },
    actions: {
      handleDelete,
      isDeleting: deleteMutation.isPending,
    },
  };
}
