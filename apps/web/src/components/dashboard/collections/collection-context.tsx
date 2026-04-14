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
    activeSubCollection: string | null;
    items: CollectionData["items"];
    filteredItems: CollectionData["items"];
  };
  actions: {
    setFilter: (filter: FilterType) => void;
    setActiveSubCollection: (id: string | null) => void;
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
  activeSubCollection: string | null;
  onFilterChange: (filter: FilterType) => void;
  onSubCollectionChange: (id: string | null) => void;
  children: ReactNode;
}

export function CollectionProvider({
  collectionId,
  filter,
  activeSubCollection,
  onFilterChange,
  onSubCollectionChange,
  children,
}: CollectionProviderProps) {
  const { data: collection, isLoading } = trpc.collections.get.useQuery(
    { id: collectionId },
    { enabled: !!collectionId },
  );

  const utils = trpc.useUtils();

  const items = useMemo(() => collection?.items ?? [], [collection]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (item.type !== filter) return false;
      if (activeSubCollection !== null) {
        return item.subCollection?.id === activeSubCollection;
      }
      return true;
    });
  }, [items, filter, activeSubCollection]);

  const refetch = async () => {
    await utils.collections.get.invalidate({ id: collectionId });
  };

  const value: CollectionContextValue = {
    state: {
      collection,
      isLoading,
      filter,
      activeSubCollection,
      items,
      filteredItems,
    },
    actions: {
      setFilter: onFilterChange,
      setActiveSubCollection: onSubCollectionChange,
      refetch,
    },
    meta: {
      collectionId,
    },
  };

  return <CollectionContext value={value}>{children}</CollectionContext>;
}
