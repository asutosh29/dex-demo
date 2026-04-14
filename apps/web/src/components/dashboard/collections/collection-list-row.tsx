import { lazy, Suspense, memo } from "react";
import { Globe, Hash, MoreHorizontal, Trash2 } from "@repo/ui/icons";
import { Button } from "@repo/ui/components/ui/button";

const PreviewDialog = lazy(() => import("./collection-card/preview-dialog"));
import { Badge } from "@repo/ui/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { cn } from "@repo/ui/lib/utils";
import { AnimatedGroup } from "@repo/ui/components/ui/animated-group";
import { useCollectionItem } from "./use-collection-item";
import type { AnyCollectionItem } from "./use-collection-item";

interface CollectionListRowProps {
  item: AnyCollectionItem;
  collectionId?: string;
  className?: string;
}

export const CollectionListRow = memo(function CollectionListRow({
  item,
  collectionId,
  className,
}: CollectionListRowProps) {
  const {
    draggable: { attributes, listeners, setNodeRef, isDragging, active },
    dialog: { open: dialogOpen, onOpenChange: setDialogOpen, handleOpen },
    actions: { handleDelete },
  } = useCollectionItem({ item, collectionId });

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
        onClick={handleOpen}
        className={cn(
          "group grid grid-cols-[1fr_auto_auto] gap-4 items-center py-3 px-4 rounded-md hover:bg-muted/50 transition-all duration-200 ease-in-out",
          collectionId && "active:cursor-grabbing",
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
              className="w-4 h-4 shrink-0"
            />
          ) : (
            <Globe className="size-4 text-muted-foreground shrink-0" />
          )}
          <AnimatedGroup
            preset="slide-right"
            key={item.id}
            className="min-w-0 flex-1"
          >
            <p className="truncate text-sm font-semibold">
              <a
                href={item.url}
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title || item.url}
              </a>
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {getDomain(item.url)}
            </p>
          </AnimatedGroup>
        </div>

        {/* Tags column */}
        <AnimatedGroup
          preset="slide-left"
          key={item.id}
          className="flex gap-1 flex-wrap max-w-md"
        >
          {item.subCollection && (
            <Badge variant="secondary" className="text-xs gap-1">
              <Hash className="h-3 w-3" />
              {item.subCollection.title}
            </Badge>
          )}
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
        </AnimatedGroup>

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

      <Suspense fallback={null}>
        <PreviewDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          item={item}
          collectionId={collectionId}
        />
      </Suspense>
    </>
  );
});
