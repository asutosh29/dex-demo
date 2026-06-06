import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";
import type { RouterOutputs } from "~/lib/trpc";

export type CollectionItem =
  RouterOutputs["collections"]["get"]["items"][number];

// Permissive item type for components that receive items from endpoints other
// than collections.get (e.g. search), which don't carry subCollection data.
export type AnyCollectionItem = Omit<CollectionItem, "subCollection"> & {
  subCollection?: CollectionItem["subCollection"];
};

interface UseCollectionItemOptions {
  item: AnyCollectionItem;
  collectionId?: string;
}

export function useCollectionItem({
  item,
  collectionId,
}: UseCollectionItemOptions) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const sourceCollectionId = item.subCollection?.id ?? collectionId;

  // Draggable setup
  const draggable = useDraggable({
    id: item.id,
    data: {
      type: "item",
      item,
      sourceCollectionId,
      viewCollectionId: collectionId,
    },
    disabled: !collectionId,
  });

  // Delete mutation
  const utils = trpc.useUtils();
  const deleteMutation = trpc.collections.removeItem.useMutation({
    onSuccess: () => {
      const idsToInvalidate = [collectionId, sourceCollectionId].filter(
        (id): id is string => Boolean(id),
      );

      idsToInvalidate.forEach((id) => {
        utils.collections.get.invalidate({ id });
      });
      toast.success("Item deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete item");
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!sourceCollectionId) {
      return;
    }

    deleteMutation.mutate({
      collectionId: sourceCollectionId,
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
