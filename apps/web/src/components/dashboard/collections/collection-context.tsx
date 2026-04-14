import { createContext, use, useMemo, type ReactNode } from "react";
import { trpc } from "~/lib/trpc";
import type { RouterOutputs } from "~/lib/trpc";

type CollectionData = RouterOutputs["collections"]["get"];
type FilterType = "link" | "note";

interface CollectionContextValue {
  state: {
    collection: CollectionData | undefined;
    isLoading: boolean;
    filter: FilterType;
    items: CollectionData["items"];
    filteredItems: CollectionData["items"];
  };
  actions: {
    setFilter: (filter: FilterType) => void;
    refetch: () => Promise<void>;
  };
  meta: {
    collectionId: string;
  };
}

const CollectionContext = createContext<CollectionContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useCollection() {
  const context = use(CollectionContext);
  if (!context) {
    throw new Error("useCollection must be used within CollectionProvider");
  }
  return context;
}

interface CollectionProviderProps {
  collectionId: string;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  children: ReactNode;
}

export function CollectionProvider({
  collectionId,
  filter,
  onFilterChange,
  children,
}: CollectionProviderProps) {
  const { data: collection, isLoading } = trpc.collections.get.useQuery(
    { id: collectionId },
    { enabled: !!collectionId },
  );

  const utils = trpc.useUtils();

  const items = useMemo(() => collection?.items ?? [], [collection]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.type === filter);
  }, [items, filter]);

  const refetch = async () => {
    await utils.collections.get.invalidate({ id: collectionId });
  };

  const value: CollectionContextValue = {
    state: {
      collection,
      isLoading,
      filter,
      items,
      filteredItems,
    },
    actions: {
      setFilter: onFilterChange,
      refetch,
    },
    meta: {
      collectionId,
    },
  };

  return <CollectionContext value={value}>{children}</CollectionContext>;
}
