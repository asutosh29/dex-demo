import { useMemo, useState, useRef, useEffect } from "react";
import {
  Bookmark,
  BookmarkPlus,
  Hash,
  LayoutGrid,
  List,
  Plus,
} from "@repo/ui/icons";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Kbd } from "@repo/ui/components/ui/kbd";
import { Badge } from "@repo/ui/components/ui/badge";
import { toast } from "@repo/ui/components/ui/sonner";
import { trpc } from "~/lib/trpc";
import { CollectionCard } from "./collection-card";
import { CollectionListRow } from "./collection-list-row";
import { CollectionEmptyState } from "./collection-empty-state";
import { CollectionSkeleton } from "./collection-skeleton";
import { useViewModeStore } from "~/lib/stores/view-mode-store";
import { cn } from "@repo/ui/lib/utils";
import { ManageMembers } from "./manage-members";

type FilterType = "all" | "link" | "note";

export function CollectionGrid({ collectionId }: { collectionId: string }) {
  const { data: collection, isLoading } = trpc.collections.get.useQuery(
    { id: collectionId },
    { enabled: !!collectionId },
  );

  const [filter, setFilter] = useState<FilterType>("all");
  const { viewMode, setViewMode } = useViewModeStore();
  const [url, setUrl] = useState("");

  const [addingItem, setAddingItem] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();
  const { mutate: createItem } = trpc.items.create.useMutation();

  const items = useMemo(() => collection?.items ?? [], [collection]);

  const filteredItems = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.type === filter);
  }, [items, filter]);

  // Keyboard shortcut: Press 'A' to focus input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "a" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
        // Only trigger if not in an input/textarea
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) return;

    const loadingToast = toast.loading("Adding item...");
    setAddingItem(true);

    createItem(
      { url, collectionId },
      {
        onSuccess: async () => {
          await utils.collections.get.invalidate({ id: collectionId });
          // TODO: The whole collections list shouldn't need to be invalidated here just for a count update.
          // Figure out a better way to sync count numbers for items and members across channels.
          await utils.collections.getUserCollections.invalidate();
          toast.dismiss(loadingToast);
          toast.success("Item added successfully!");
          setUrl("");
          setAddingItem(false);
        },
        onError: (error) => {
          console.log(error);
          toast.dismiss(loadingToast);
          toast.error("Failed to add item. Please try again.");
          setAddingItem(false);
        },
      },
    );
  };

  if (isLoading) {
    return <CollectionSkeleton />;
  }

  if (!collection) {
    return <CollectionEmptyState />;
  }

  return (
    <div className="space-y-6 w-225 mx-auto">
      {/* Collection Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-display text-3xl inline-flex items-baseline gap-2">
            <Hash className="size-5" />
            {collection.title}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              <Bookmark /> {items.length}
            </Badge>
            <ManageMembers role={collection.role} />
          </div>
        </div>

        {/* Add Item Input */}
        <form
          onSubmit={handleSubmit}
          className={cn("relative", addingItem && "animate-pulse")}
        >
          <BookmarkPlus className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            readOnly={addingItem}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Add a link.."
            className="pl-10 h-12 text-lg pr-10"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Kbd>A</Kbd>
          </div>
        </form>
      </div>

      {items.length === 0 ? (
        <CollectionEmptyState />
      ) : (
        <>
          <div className="flex justify-between items-center">
            {/* Filter Tabs */}
            <div className="flex gap-1">
              <Button
                variant={filter === "all" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter("all")}
                className="rounded-full"
              >
                All
              </Button>
              <Button
                variant={filter === "link" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter("link")}
                className="rounded-full"
              >
                Links
              </Button>
              <Button
                variant={filter === "note" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter("note")}
                className="rounded-full"
              >
                Notes
              </Button>
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setViewMode("grid")}
                className="size-7"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setViewMode("list")}
                className="size-7"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Items: Grid or List */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No {filter === "all" ? "" : filter} items found
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <CollectionCard
                  key={item.id}
                  item={item}
                  collectionId={collectionId}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredItems.map((item) => (
                <CollectionListRow
                  key={item.id}
                  item={item}
                  collectionId={collectionId}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
