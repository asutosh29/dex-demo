import { Globe } from "@repo/ui/icons";
import { useState } from "react";
import PreviewDialog from "./preview-dialog";
import type { RouterOutputs } from "~/lib/trpc";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@repo/ui/lib/utils";

export type CollectionItem =
  RouterOutputs["collections"]["get"]["items"][number];

interface CollectionCardProps {
  item: CollectionItem;
  collectionId?: string;
  className?: string;
}

export function CollectionCard({
  item,
  collectionId,
  className,
}: CollectionCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { attributes, listeners, setNodeRef, isDragging, active } =
    useDraggable({
      id: item.id,
      data: {
        type: "item",
        item,
        collectionId,
      },
      disabled: !collectionId,
    });

  return (
    <>
      <div
        ref={collectionId ? setNodeRef : undefined}
        {...(collectionId ? attributes : {})}
        {...(collectionId ? listeners : {})}
        className={cn(
          "group w-full flex-shrink-0 rounded-lg bg-card p-1 space-y-3",
          collectionId && "cursor-grab active:cursor-grabbing",
          "transition-all duration-200 ease-in-out",
          collectionId &&
            (isDragging || active?.id === item.id) &&
            "opacity-50 scale-95",
          className,
        )}
        onClick={() => {
          if (!isDragging) {
            setDialogOpen(true);
          }
        }}
      >
        <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
          {item.image ? (
            <img
              src={item.image || item.favicon || "/placeholder.png"}
              alt={item.title || "Preview"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center group-hover:scale-105 transition-transform">
              <Globe className="size-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex gap-1 items-center">
          {item.favicon ? (
            <img
              src={item.favicon}
              alt="Favicon"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          ) : (
            <Globe className="size-5 text-muted-foreground" />
          )}
          <p className="truncate text-sm font-semibold">
            {item.title || item.url}
          </p>
        </div>
      </div>

      <PreviewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={item}
      />
    </>
  );
}
