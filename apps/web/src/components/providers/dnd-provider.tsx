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
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { useState, useEffect } from "react";
import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";
import { ArrowUpLeft, CopyIcon, Globe } from "@repo/ui/icons";
import { cn } from "@repo/ui/lib/utils";

interface DraggedItem {
  id: string;
  title: string | null;
  url: string;
  image?: string | null;
  favicon?: string | null;
  collectionId: string;
}

function DragPreview({
  item,
  isShiftPressed,
}: {
  item: DraggedItem;
  isShiftPressed: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center p-4 w-60",
        "*:bg-background/70 *:backdrop-blur-md",
      )}
    >
      <div className="rounded-full p-1.5 border absolute top-2 left-2 z-5 text-muted-foreground">
        {" "}
        {isShiftPressed ? (
          <>
            <ArrowUpLeft className="size-3 animate-pulse" />
          </>
        ) : (
          <>
            <CopyIcon className="size-3 animate-pulse" />
          </>
        )}
      </div>
      <div
        className={cn(
          "cursor-grabbing rounded-lg border h-10 px-3 text-sm",
          "shadow-2xl",
          "flex items-center gap-2",
          "w-full",
        )}
      >
        {item.favicon ? (
          <img src={item.favicon} alt="Favicon" className="size-4" />
        ) : (
          <Globe className="size-4 text-muted-foreground" />
        )}
        <span className="max-w-[16ch] truncate">{item.title}</span>
      </div>
    </div>
  );
}

export function DndProvider({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState<DraggedItem | null>(null);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const utils = trpc.useUtils();
  const moveItemMutation = trpc.collections.moveItem.useMutation();
  const copyItemMutation = trpc.collections.copyItem.useMutation();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
  );

  // Track shift key state
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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

      // Use shift key to determine copy vs move (default is copy)
      const isMoving = isShiftPressed;
      const loadingToast = toast.loading(
        isMoving ? "Moving item..." : "Copying item...",
      );

      const mutation = isMoving ? moveItemMutation : copyItemMutation;

      mutation.mutate(
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
            toast.success(
              isMoving ? "Item moved successfully" : "Item copied successfully",
            );
          },
          onError: (error) => {
            console.error(
              isMoving ? "Error moving item:" : "Error copying item:",
              error,
            );
            toast.dismiss(loadingToast);
            toast.error(
              error?.message ??
                `Failed to ${isMoving ? "move" : "copy"} item. Please try again.`,
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
      modifiers={[snapCenterToCursor]}
    >
      {children}

      <DragOverlay dropAnimation={dropAnimation}>
        {activeItem ? (
          <DragPreview isShiftPressed={isShiftPressed} item={activeItem} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
