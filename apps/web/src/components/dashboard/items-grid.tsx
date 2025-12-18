import { ItemCard } from "./item-card";
import { trpc } from "~/lib/trpc";

interface ItemsGridProps {
  items: any[];
  selectedCollection: string | null;
  isLoading?: boolean;
}

export function ItemsGrid({
  items,
  selectedCollection,
  isLoading,
}: ItemsGridProps) {
  const utils = trpc.useUtils();

  const deleteItem = trpc.items.delete.useMutation({
    onSuccess: () => {
      utils.items.getAll.invalidate();
      if (selectedCollection) {
        utils.collections.get.invalidate({ id: selectedCollection });
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-sm text-muted-foreground">Loading items...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg
          className="size-12 text-muted-foreground/50 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="text-lg font-semibold mb-2">No items yet</h3>
        <p className="text-muted-foreground">
          Create your first item by clicking the "Add Item" button
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onDelete={(id) => deleteItem.mutate({ id })}
          isDeleting={deleteItem.isPending}
        />
      ))}
    </div>
  );
}
