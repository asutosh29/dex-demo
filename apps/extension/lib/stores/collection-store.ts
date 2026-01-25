import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Collection {
  id: string;
  title: string;
  isShared: boolean;
  memberCount: number;
}

interface CollectionStore {
  collections: Collection[];
  isLoading: boolean;
  error: string | null;
  setCollections: (collections: Collection[]) => void;
  addCollection: (collection: Collection) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCollectionStore = create<
  CollectionStore,
  [["zustand/persist", CollectionStore]]
>(
  persist(
    (set) => ({
      collections: [],
      isLoading: false,
      error: null,
      setCollections: (collections) =>
        set(() => ({
          collections,
          error: null,
        })),
      addCollection: (collection) =>
        set((state) => ({
          collections: [collection, ...state.collections],
        })),
      setLoading: (isLoading) =>
        set(() => ({
          isLoading,
        })),
      setError: (error) =>
        set(() => ({
          error,
        })),
    }),
    {
      name: "collection-store",
    },
  ),
);
