import { Globe, MoreHorizontal, Trash2 } from "@repo/ui/icons";
import { useState } from "react";
import PreviewDialog from "./collection-card/preview-dialog";
import type { CollectionItem } from "./collection-card";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";
import { cn } from "@repo/ui/lib/utils";
import { useDraggable } from "@dnd-kit/core";

interface CollectionListRowProps {
  item: CollectionItem;
  collectionId?: string;
  className?: string;
}

export function CollectionListRow({
  item,
  collectionId,
  className,
}: CollectionListRowProps) {
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

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <>
      <div
        ref={collectionId ? setNodeRef : undefined}
        {...(collectionId ? attributes : {})}
        {...(collectionId ? listeners : {})}
        onClick={() => {
          if (!isDragging) {
            setDialogOpen(true);
          }
        }}
        className={cn(
          "group grid grid-cols-[1fr_auto_auto] gap-4 items-center py-3 px-4 rounded-md hover:bg-muted/50 transition-all duration-200 ease-in-out",
          collectionId && "cursor-grab active:cursor-grabbing",
          !collectionId && "cursor-pointer",
          collectionId &&
            (isDragging || active?.id === item.id) &&
            "opacity-50 scale-95",
          className,
        )}
      >
        {/* Title column */}
        <div className="flex items-center gap-2 min-w-0">
          {item.favicon ? (
            <img
              src={item.favicon}
              alt="Favicon"
              width={16}
              height={16}
              className="w-4 h-4 flex-shrink-0"
            />
          ) : (
            <Globe className="size-4 text-muted-foreground flex-shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {item.title || item.url}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {getDomain(item.url)}
            </p>
          </div>
        </div>

        {/* Tags column */}
        <div className="flex gap-1 flex-wrap max-w-md">
          {item.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {item.tags && item.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{item.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Added column */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {formatDate(item.createdAt)}
          </span>
          {collectionId && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button variant="ghost" size="icon-sm" className="size-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
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
