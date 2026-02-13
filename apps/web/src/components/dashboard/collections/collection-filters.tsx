import { Button } from "@repo/ui/components/ui/button";
import { LayoutGrid, List } from "@repo/ui/icons";
import { useCollection } from "./collection-context";
import { useViewModeStore } from "~/lib/stores/view-mode-store";

export function CollectionFilters() {
  const {
    state: { filter, filteredItems },
    actions: { setFilter },
  } = useCollection();

  return (
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
      <ViewModes />
    </div>
  );
}

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
