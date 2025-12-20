import { useMemo } from "react";
import { trpc } from "~/lib/trpc";
import { CollectionCard } from "./collection-card";
import { CollectionEmptyState } from "./collection-empty-state";
import { CollectionSkeleton } from "./collection-skeleton";

export function CollectionGrid({ collectionId }: { collectionId: string }) {
  const { data: collection, isLoading } = trpc.collections.get.useQuery(
    { id: collectionId },
    { enabled: !!collectionId },
  );

  const items = useMemo(() => collection?.items ?? [], [collection]);

  if (isLoading) {
    return <CollectionSkeleton />;
  }

  if (!collection) {
    return <CollectionEmptyState />;
  }

  if (items.length === 0) {
    return <CollectionEmptyState />;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item) => (
        <CollectionCard key={item.id} item={item} />
      ))}
    </div>
  );
}
