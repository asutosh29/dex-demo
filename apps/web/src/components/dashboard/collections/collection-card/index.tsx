import { lazy, Suspense, memo } from "react";
import {
  Globe,
  Hash,
  LucideSquareArrowOutUpRight,
  MoreHorizontal,
  Trash2,
} from "@repo/ui/icons";
import { cn } from "@repo/ui/lib/utils";

const PreviewDialog = lazy(() => import("./preview-dialog"));
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { AnimatedGroup } from "@repo/ui/components/ui/animated-group";
import { getDomainFromUrl } from "~/lib/utils";
import { useCollectionItem } from "../use-collection-item";
import type { CollectionItem, AnyCollectionItem } from "../use-collection-item";

export type { CollectionItem };

interface CollectionCardProps {
  item: AnyCollectionItem;
  collectionId?: string;
  className?: string;
}

export const CollectionCard = memo(function CollectionCard({
  item,
  collectionId,
  className,
}: CollectionCardProps) {
  const {
    draggable: { attributes, listeners, setNodeRef, isDragging, active },
    dialog: { open: dialogOpen, onOpenChange: setDialogOpen, handleOpen },
    actions: { handleDelete },
  } = useCollectionItem({ item, collectionId });

  return (
    <>
      <div
        ref={collectionId ? setNodeRef : undefined}
        {...(collectionId ? attributes : {})}
        {...(collectionId ? listeners : {})}
        className={cn(
          "group w-full shrink-0 rounded-lg bg-card p-1 space-y-3",
          collectionId && "cursor-grab active:cursor-grabbing",
          "transition-all duration-200 ease-in-out",
          collectionId &&
            (isDragging || active?.id === item.id) &&
            "opacity-50 scale-95",
          className,
        )}
        onClick={handleOpen}
      >
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          {collectionId && (
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
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
          {item.subCollection && (
            <div
              className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-sm px-2 py-0.5 text-xs font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <Hash className="h-3 w-3" />
              {item.subCollection.title}
            </div>
          )}
          {item.image ? (
            <AnimatedGroup preset="slide-down" key={item.id}>
              <img
                src={item.image || item.favicon || "/placeholder.png"}
                alt={item.title || "Preview"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </AnimatedGroup>
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center group-hover:scale-105 transition-transform">
              <AnimatedGroup preset="slide" key={item.id}>
                {item.favicon ? (
                  <div
                    className="size-12 mask-linear-180 mask-linear-from-10% mask-linear-to-95% brightness-75 saturate-0 bg-cover bg-center animate-in"
                    style={{ backgroundImage: `url(${item.favicon})` }}
                  />
                ) : (
                  <Globe className="size-12 text-muted-foreground mask-linear-180 mask-linear-from-10% mask-linear-to-90% brightness-75 saturate-75 bg-cover bg-center animate-in" />
                )}
              </AnimatedGroup>
            </div>
          )}

          <a
            href={item.url}
            className={cn(
              "absolute -bottom-2 right-0 p-2 rounded-tl",
              "opacity-0 group-hover:bottom-0 group-hover:opacity-100 transition-all duration-150 ease-in-out",
              "bg-card/50 backdrop-blur-lg shadow-md",
              "text-xs flex items-center gap-1 hover:underline",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="max-w-[16ch] truncate">
              {getDomainFromUrl(item.url)}
            </span>{" "}
            <LucideSquareArrowOutUpRight className="size-4" />
          </a>
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
