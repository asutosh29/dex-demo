import { useMemo, useState, useRef, useEffect } from "react";
import { BookmarkPlus, Hash, LayoutGrid, List, Loader } from "@repo/ui/icons";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Kbd } from "@repo/ui/components/ui/kbd";
import { toast } from "@repo/ui/components/ui/sonner";
import { trpc } from "~/lib/trpc";
import { CollectionCard } from "./collection-card";
import { CollectionListRow } from "./collection-list-row";
import { CollectionEmptyState } from "./collection-empty-state";
import { CollectionSkeleton } from "./collection-skeleton";
import { useViewModeStore } from "~/lib/stores/view-mode-store";
import { cn } from "@repo/ui/lib/utils";
import { ManageMembers } from "./manage-members";
import { CollectionActionsDropdown } from "./collection-actions-dropdown";
import { EditableField } from "@repo/ui/components/ui/editable-field";

type FilterType = "all" | "link" | "note";

// TODO: This component is getting pretty large and kinda will hamper performance. Break down into smaller components and implement virtualization
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

  // Keyboard shortcut: Press 'Shift+A' to focus input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "A" && !e.metaKey && !e.ctrlKey) {
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
          <EditableField
            type="text"
            value={collection.title}
            className="w-1/2"
            disabled={collection.role === "member"}
            inputClassName="font-display text-3xl"
            showActions={false}
            onSave={async (value) => {
              await utils.client.collections.update.mutate({
                id: collectionId,
                title: value as string,
              });
              await utils.collections.get.invalidate({ id: collectionId });
              await utils.collections.getUserCollections.invalidate();
            }}
          >
            {(value) => (
              <h1 className="font-display text-3xl inline-flex items-baseline gap-2">
                <Hash className="size-5" />
                <span className="max-w-[16ch] truncate">{value}</span>
              </h1>
            )}
          </EditableField>

          <div className="flex items-center gap-2">
            <ManageMembers role={collection.role} />
            <CollectionActionsDropdown
              isShared={collection.isShared as boolean}
              collectionId={collectionId}
              currentTitle={collection.title}
              role={collection.role}
            />
          </div>
        </div>

        {/* Add Item Input */}
        <form onSubmit={handleSubmit} className={cn("relative rounded-lg")}>
          <div
            className={cn("relative rounded-lg", addingItem && "bg-background")}
          >
            {addingItem ? (
              <Loader className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground animate-spin" />
            ) : (
              <BookmarkPlus className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground " />
            )}{" "}
            <Input
              ref={inputRef}
              disabled={addingItem}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Add a link..."
              className="pl-10 h-12 text-lg pr-10 bg-transparent"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Kbd>Shift + A</Kbd>
            </div>
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
                className="rounded-full transition-all duration-200 w-fit"
              >
                All
                {filter === "all" && (
                  <span className="text-muted-foreground ml-1">
                    {filteredItems.length}
                  </span>
                )}
              </Button>
              <Button
                variant={filter === "link" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter("link")}
                className="rounded-full transition-all duration-200 w-fit"
              >
                Links
                {filter === "link" && (
                  <span className="text-muted-foreground ml-1">
                    {filteredItems.length}
                  </span>
                )}
              </Button>
              <Button
                variant={filter === "note" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter("note")}
                className="rounded-full"
              >
                Notes
                {filter === "note" && (
                  <span className="text-muted-foreground ml-1">
                    {filteredItems.length}
                  </span>
                )}
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
