import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { useState } from "react";
import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";
import { Globe } from "@repo/ui/icons";

interface DraggedItem {
  id: string;
  title: string | null;
  url: string;
  image?: string | null;
  favicon?: string | null;
  collectionId: string;
}

function DragPreview({ item }: { item: DraggedItem }) {
  return (
    <div className="max-w-64 rotate-2 bg-background/50 backdrop-blur-md shadow-2xl rounded-lg overflow-hidden">
      <div className="relative aspect-[16/9] bg-muted">
        {item.image ? (
          <img
            src={item.image || item.favicon || ""}
            alt={item.title || "Preview"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Globe className="size-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="p-3 space-y-1">
        <div className="flex gap-1.5 items-center">
          {item.favicon ? (
            <img
              src={item.favicon}
              alt="Favicon"
              className="w-4 h-4 flex-shrink-0"
            />
          ) : (
            <Globe className="size-4 text-muted-foreground flex-shrink-0" />
          )}
          <p className="truncate text-sm font-semibold">
            {item.title || item.url}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DndProvider({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState<DraggedItem | null>(null);
  const utils = trpc.useUtils();
  const moveItemMutation = trpc.collections.moveItem.useMutation();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === "item") {
      setActiveItem(active.data.current.item as DraggedItem);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveItem(null);
      return;
    }

    // Check if we're dropping an item onto a collection
    if (
      active.data.current?.type === "item" &&
      over.data.current?.type === "collection"
    ) {
      const itemId = active.id as string;
      const fromCollectionId = active.data.current.collectionId as string;
      const toCollectionId = over.id as string;

      // Don't move if it's the same collection
      if (fromCollectionId === toCollectionId) {
        setActiveItem(null);
        return;
      }

      // Clear immediately to allow drop animation
      setActiveItem(null);

      const loadingToast = toast.loading("Moving item...");

      moveItemMutation.mutate(
        {
          itemId,
          fromCollectionId,
          toCollectionId,
        },
        {
          onSuccess: () => {
            // Invalidate both collections
            utils.collections.get.invalidate({ id: fromCollectionId });
            utils.collections.get.invalidate({ id: toCollectionId });
            toast.dismiss(loadingToast);
            toast.success("Item moved successfully");
          },
          onError: (error) => {
            console.error("Error moving item:", error);
            toast.dismiss(loadingToast);
            toast.error(
              error?.message ?? "Failed to move item. Please try again.",
            );
          },
        },
      );
      return;
    }

    setActiveItem(null);
  };

  const dropAnimation = {
    duration: 100,
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        dragOverlay: {
          opacity: "0",
        },
      },
    }),
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}

      <DragOverlay dropAnimation={dropAnimation}>
        {activeItem ? <DragPreview item={activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
