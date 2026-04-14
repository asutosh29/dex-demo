import { CollectionCard } from "./collection-card";
import { CollectionListRow } from "./collection-list-row";
import { useCollection } from "./collection-context";
import { useViewModeStore } from "~/lib/stores/view-mode-store";

export function CollectionItems() {
  const {
    state: { filter, filteredItems },
    meta: { collectionId },
  } = useCollection();

  const { viewMode } = useViewModeStore();

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No {filter === "link" ? "" : filter} items found
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <CollectionCard
            key={item.id}
            item={item}
            collectionId={collectionId}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {filteredItems.map((item) => (
        <CollectionListRow
          key={item.id}
          item={item}
          collectionId={collectionId}
        />
      ))}
    </div>
  );
}
