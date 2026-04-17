import { CollectionCard } from "./collection-card";
import { CollectionListRow } from "./collection-list-row";
import { useCollection } from "./collection-context";
import { useViewModeStore } from "~/lib/stores/view-mode-store";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@repo/ui/components/ui/context-menu";
import { Kbd } from "@repo/ui/components/ui/kbd";
import { ArrowUpLeft, CopyIcon, Trash } from "@repo/ui/icons";
import { type AnyCollectionItem } from "./use-collection-item";
import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";

export function CollectionItems() {
  const {
    state: { filter, filteredItems },
    meta: { collectionId },
  } = useCollection();

  const { viewMode } = useViewModeStore();

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No {filter === "link" ? "" : filter} items found
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <ActionsContextMenu
            collectionId={collectionId}
            item={item}
            key={item.id}
          >
            <CollectionCard item={item} collectionId={collectionId} />
          </ActionsContextMenu>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {filteredItems.map((item) => (
        <ActionsContextMenu
          key={item.id}
          item={item}
          collectionId={collectionId}
        >
          <CollectionListRow item={item} collectionId={collectionId} />
        </ActionsContextMenu>
      ))}
    </div>
  );
}

function ActionsContextMenu({
  collectionId,
  item,
  children,
}: {
  collectionId: string;
  item: AnyCollectionItem;
  children: React.ReactNode;
}) {
  const utils = trpc.useUtils();
  const sourceCollectionId = item.subCollection?.id ?? collectionId;
  const deleteMutation = trpc.collections.removeItem.useMutation({
    onSuccess: () => {
      [collectionId, sourceCollectionId]
        .filter((id): id is string => Boolean(id))
        .forEach((id) => utils.collections.get.invalidate({ id }));
      toast.success("Item deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete item");
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteMutation.mutate({
      collectionId: sourceCollectionId,
      itemId: item.id,
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuGroup>
          <ContextMenuItem>
            <ArrowUpLeft /> Move
            <ContextMenuShortcut>
              <Kbd>Drag</Kbd>
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <CopyIcon />
            Copy
            <ContextMenuShortcut>
              <Kbd>Shift + Drag</Kbd>
            </ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem onClick={handleDelete} variant="destructive">
            <Trash /> Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
