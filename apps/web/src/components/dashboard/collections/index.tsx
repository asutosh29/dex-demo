import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CollectionProvider } from "./collection-context";
import { CollectionHeader } from "./collection-header";
import { CollectionAddItemForm } from "./collection-add-item-form";
import { PasteUrlDialog } from "./paste-url-dialog";
import { CollectionFilters } from "./collection-filters";
import { CollectionItems } from "./collection-items";
import { CollectionEmptyState } from "./collection-empty-state";
import { CollectionSkeleton } from "./collection-skeleton";
import { useCollection } from "./collection-context";

type FilterType = "link" | "note";
type SubCollectionUpdater =
  | string
  | null
  | ((prev: string | null) => string | null);

function CollectionContent() {
  const {
    state: { isLoading, collection, items },
  } = useCollection();

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
        <CollectionHeader />
        <CollectionAddItemForm />
        <PasteUrlDialog />
      </div>

      {items.length === 0 ? (
        <CollectionEmptyState />
      ) : (
        <>
          <CollectionFilters />
          <CollectionItems />
        </>
      )}
    </div>
  );
}

export function Collection({ collectionId }: { collectionId: string }) {
  const [filter, setFilter] = useState<FilterType>("link");
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSubCollection = useMemo(
    () => searchParams.get("sub"),
    [searchParams],
  );

  const setActiveSubCollection = useCallback(
    (value: SubCollectionUpdater) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          const prev = next.get("sub");
          const resolved = typeof value === "function" ? value(prev) : value;

          if (resolved) {
            next.set("sub", resolved);
          } else {
            next.delete("sub");
          }

          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return (
    <CollectionProvider
      collectionId={collectionId}
      filter={filter}
      activeSubCollection={activeSubCollection}
      onFilterChange={setFilter}
      onSubCollectionChange={setActiveSubCollection}
    >
      <CollectionContent />
    </CollectionProvider>
  );
}

// Export compound component API for external composition if needed
Collection.Provider = CollectionProvider;
Collection.Header = CollectionHeader;
Collection.AddItemForm = CollectionAddItemForm;
Collection.Filters = CollectionFilters;
Collection.Items = CollectionItems;
