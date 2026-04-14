import { useEffect, useMemo, useRef, useState } from "react";

import { useDroppable } from "@dnd-kit/core";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Input } from "@repo/ui/components/ui/input";
import { Check, Hash, LayoutGrid, List, Plus } from "@repo/ui/icons";
import { cn } from "@repo/ui/lib/utils";
import { useCollection } from "./collection-context";
import { useViewModeStore } from "~/lib/stores/view-mode-store";
import { trpc, type RouterOutputs } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";

type SubCollection = RouterOutputs["collections"]["getSubCollections"][number];

function SubCollectionChip({
  sub,
  isActive,
  onSelect,
}: {
  sub: SubCollection;
  isActive: boolean;
  onSelect: () => void;
}) {
  const droppableData = useMemo(
    () => ({ type: "collection" as const, collection: sub }),
    [sub],
  );

  const { setNodeRef, isOver } = useDroppable({
    id: `chip:${sub.id}`,
    data: droppableData,
  });

  return (
    <Button
      ref={setNodeRef}
      variant={isActive ? "default" : "secondary"}
      effect="pop"
      onClick={onSelect}
      className={cn(
        "shrink-0 transition-colors min-w-20",
        isOver && "ring-2 ring-primary",
      )}
    >
      {isActive ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Hash className="h-3.5 w-3.5" />
      )}
      {sub.title}
    </Button>
  );
}

export function CollectionFilters() {
  return (
    <div className="flex items-center">
      <div className="flex-1">
        <SubCollectionsView />
      </div>
      <div className="flex items-center gap-2">
        <FilterTabs />
        <ViewModes />
      </div>
    </div>
  );
}

const FilterTabs = () => {
  const {
    state: { filter, filteredItems },
    actions: { setFilter },
  } = useCollection();

  return (
    <div className="flex gap-1">
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
  );
};

const ViewModes = () => {
  const { viewMode, setViewMode } = useViewModeStore();

  return (
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
  );
};

const SubCollectionsView = () => {
  const {
    state: { collection, activeSubCollection },
    actions: { setActiveSubCollection },
  } = useCollection();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSubCollectionTitle, setNewSubCollectionTitle] = useState("");
  const subCollectionsScrollRef = useRef<HTMLDivElement | null>(null);
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

  // Sub-collections can only exist on root collections — skip if this is already a child
  const isSubCollection = !!collection?.parentId;

  const { data: subCollections } = trpc.collections.getSubCollections.useQuery(
    {
      parentId: collection?.id as string,
    },
    {
      enabled: !!collection && !isSubCollection,
    },
  );

  const utils = trpc.useUtils();

  const { mutate: createSubCollection, isPending: isCreatingSubCollection } =
    trpc.collections.create.useMutation({
      onSuccess: () => {
        utils.collections.getSubCollections.invalidate({
          parentId: collection?.id as string,
        });
        setNewSubCollectionTitle("");
        setIsCreateDialogOpen(false);
      },
      onError: (error) => {
        console.error("Failed to create sub-collection:", error);
        toast.error("Failed to create sub-collection. Please try again.", {
          description: error.message,
        });
      },
    });

  const handleCreateSubCollection = () => {
    if (!collection?.id || !newSubCollectionTitle.trim()) {
      return;
    }

    createSubCollection({
      title: newSubCollectionTitle,
      parentId: collection.id,
    });
  };

  useEffect(() => {
    const element = subCollectionsScrollRef.current;
    if (!element) {
      return;
    }

    const checkOverflow = () => {
      setHasHorizontalOverflow(element.scrollWidth > element.clientWidth);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [subCollections]);

  if (!collection || isSubCollection) {
    return null;
  }

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <div className="flex items-center gap-2">
        {subCollections && subCollections.length > 0 && (
          <div
            ref={subCollectionsScrollRef}
            className={cn(
              "max-w-[80%] flex overflow-auto items-center gap-2 no-scrollbar py-1",
              hasHorizontalOverflow &&
                "mask-[linear-gradient(to_right,black_90%,transparent_100%)] pr-6",
            )}
          >
            {subCollections?.map((sub) => (
              <SubCollectionChip
                key={sub.id}
                sub={sub}
                isActive={activeSubCollection === sub.id}
                onSelect={() =>
                  setActiveSubCollection(
                    activeSubCollection === sub.id ? null : sub.id,
                  )
                }
              />
            ))}
          </div>
        )}

        <DialogTrigger asChild>
          {subCollections && subCollections.length > 0 ? (
            <Button
              variant="secondary"
              className="rounded-full shrink-0"
              size="icon-sm"
            >
              <Plus />
            </Button>
          ) : (
            <Button variant="secondary" className="rounded-full shrink-0">
              <Plus />
              Create Sub-Collection
            </Button>
          )}
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Sub-Collection</DialogTitle>
          <DialogDescription>
            Add a new sub-collection inside {collection.title}
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Sub-collection title"
          value={newSubCollectionTitle}
          onChange={(e) => setNewSubCollectionTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateSubCollection();
            }
          }}
        />
        <DialogFooter>
          <Button
            onClick={handleCreateSubCollection}
            disabled={isCreatingSubCollection}
          >
            {isCreatingSubCollection ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
