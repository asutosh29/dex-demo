import { useState } from "react";
import { CollectionProvider } from "./collection-context";
import { CollectionHeader } from "./collection-header";
import { CollectionAddItemForm } from "./collection-add-item-form";
import { CollectionFilters } from "./collection-filters";
import { CollectionItems } from "./collection-items";
import { CollectionEmptyState } from "./collection-empty-state";
import { CollectionSkeleton } from "./collection-skeleton";
import { useCollection } from "./collection-context";

type FilterType = "link" | "note";

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
  const [activeSubCollection, setActiveSubCollection] = useState<string | null>(
    null,
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
