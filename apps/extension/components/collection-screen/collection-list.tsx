import { useState, useMemo, useEffect, useCallback } from "react";
import { useCollectionStore } from "@/lib/stores/collection-store";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Badge } from "@repo/ui/components/ui/badge";
import { Search, Plus, Loader } from "@repo/ui/icons";
import { CreateCollection } from "@/components/collection-screen/create-collection";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { AnimatedCheck } from "@repo/ui/components/ui/animated-check";

export function CollectionList() {
  const { collections } = useCollectionStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<
    Set<string>
  >(new Set());
  const [existingCollectionIds, setExistingCollectionIds] = useState<
    Set<string>
  >(new Set());
  const [isCheckingExistence, setIsCheckingExistence] = useState(true);
  const [isAddingItems, setIsAddingItems] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Toggle collection selection
  const toggleCollection = useCallback(
    (collectionId: string) => {
      // Don't allow toggling if item already exists in this collection
      if (existingCollectionIds.has(collectionId)) return;

      setSelectedCollectionIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(collectionId)) {
          newSet.delete(collectionId);
        } else {
          newSet.add(collectionId);
        }
        return newSet;
      });
    },
    [existingCollectionIds],
  );

  // Filter collections based on search query
  const filteredCollections = useMemo(() => {
    if (!searchQuery.trim()) return collections;
    return collections.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [collections, searchQuery]);

  // Get current tab URL
  const currentTabUrl = useMemo(() => {
    return typeof window !== "undefined" ? window.location.href : "";
  }, []);

  // Check if current URL already exists in any collections
  useEffect(() => {
    if (!currentTabUrl) return;

    setIsCheckingExistence(true);
    browser.runtime.sendMessage(
      {
        type: "CHECK_ITEM_EXISTS",
        url: currentTabUrl,
      },
      (response) => {
        if (response.ok && response.data.itemExists) {
          setExistingCollectionIds(new Set(response.data.collectionIds));
        } else {
          setExistingCollectionIds(new Set());
        }
        setIsCheckingExistence(false);
      },
    );
  }, [currentTabUrl]);

  useEffect(() => {
    if (isSaved) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("toggle-ui"));
      }, 1500);
    }
  }, [isSaved]);

  // Add current tab to selected collections
  const handleAddToCollections = async () => {
    if (selectedCollectionIds.size === 0) return;

    setIsAddingItems(true);
    try {
      // Only add to collections where item doesn't already exist
      const collectionsToAdd = Array.from(selectedCollectionIds).filter(
        (id) => !existingCollectionIds.has(id),
      );

      const results = await Promise.all(
        collectionsToAdd.map(
          (collectionId) =>
            new Promise<{ success: boolean; collectionId: string }>(
              (resolve) => {
                browser.runtime.sendMessage(
                  {
                    type: "ADD_ITEM_TO_COLLECTION",
                    url: currentTabUrl,
                    collectionId,
                  },
                  (response) => {
                    if (response.ok) {
                      console.log(`Added to collection ${collectionId}`);
                      resolve({ success: true, collectionId });
                    } else {
                      console.error(
                        `Failed to add to collection ${collectionId}:`,
                        response.error,
                      );
                      resolve({ success: false, collectionId });
                    }
                  },
                );
              },
            ),
        ),
      );

      // Add successful collection IDs to existing
      const successfulIds = results
        .filter((r) => r.success)
        .map((r) => r.collectionId);

      setExistingCollectionIds((prev) => new Set([...prev, ...successfulIds]));
      setSelectedCollectionIds(new Set());

      // Mark as saved if any items were successfully added
      if (successfulIds.length > 0) {
        setIsSaved(true);
      }
    } finally {
      setIsAddingItems(false);
    }
  };

  if (isCheckingExistence) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (isSaved) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <AnimatedCheck />
        <h1 className="text-xl">Saved!</h1>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border">
        {/* Search Input */}
        <div className="relative border-b">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 pl-9"
          />
        </div>

        {/* Collections List */}
        <ScrollArea className="h-44 w-full">
          {filteredCollections.length === 0 ? (
            <div className="p-2">
              <CreateCollection defaultTitle={searchQuery} asChild>
                <Button
                  variant={"outline"}
                  className="w-full border-dashed"
                  size={"sm"}
                >
                  <Plus /> Create "{searchQuery}"
                </Button>
              </CreateCollection>
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {filteredCollections.map((collection) => {
                const alreadyExists = existingCollectionIds.has(collection.id);
                const isChecked =
                  selectedCollectionIds.has(collection.id) || alreadyExists;

                return (
                  <div
                    key={collection.id}
                    className={`flex items-center gap-2 p-2 rounded-md ${
                      alreadyExists
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-muted cursor-pointer"
                    }`}
                    onClick={() => toggleCollection(collection.id)}
                  >
                    <Checkbox
                      checked={isChecked}
                      disabled={alreadyExists}
                      onChange={() => toggleCollection(collection.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        # {collection.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {alreadyExists && (
                        <Badge variant="outline" className="text-xs">
                          exists
                        </Badge>
                      )}
                      {collection.isShared && (
                        <Badge variant="outline" className="text-xs">
                          Shared
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Add Button */}
      {selectedCollectionIds.size > 0 && (
        <Button
          onClick={handleAddToCollections}
          disabled={isAddingItems}
          className="w-full"
        >
          {isAddingItems ? (
            <>
              <Loader className="animate-spin w-4 h-4 mr-2" />
              Adding...
            </>
          ) : (
            `Add to ${selectedCollectionIds.size} collection${selectedCollectionIds.size > 1 ? "s" : ""}`
          )}
        </Button>
      )}
    </>
  );
}
