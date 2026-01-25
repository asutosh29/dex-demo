import { useState, useMemo, useCallback, useEffect } from "react";
import { useCollectionStore, Collection } from "@/lib/stores/collection-store";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Badge } from "@repo/ui/components/ui/badge";
import { Plus, Search, Loader } from "@repo/ui/icons";
import { GreetingHeader } from "@/components/collection-screen/greeting-header";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";

export default () => {
  const { collections, isLoading, error } = useCollectionStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<
    Set<string>
  >(new Set());
  const [existingCollectionIds, setExistingCollectionIds] = useState<
    Set<string>
  >(new Set());
  const [isCheckingExistence, setIsCheckingExistence] = useState(true);
  const [isAddingItems, setIsAddingItems] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState("");
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);

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

  // Add current tab to selected collections
  const handleAddToCollections = async () => {
    if (selectedCollectionIds.size === 0) return;

    setIsAddingItems(true);
    try {
      // Only add to collections where item doesn't already exist
      const collectionsToAdd = Array.from(selectedCollectionIds).filter(
        (id) => !existingCollectionIds.has(id),
      );

      for (const collectionId of collectionsToAdd) {
        await new Promise<void>((resolve) => {
          browser.runtime.sendMessage(
            {
              type: "ADD_ITEM_TO_COLLECTION",
              url: currentTabUrl,
              collectionId,
            },
            (response) => {
              if (response.ok) {
                console.log(`Added to collection ${collectionId}`);
                // Add to existing collection IDs
                setExistingCollectionIds(
                  (prev) => new Set([...prev, collectionId]),
                );
              } else {
                console.error(
                  `Failed to add to collection ${collectionId}:`,
                  response.error,
                );
              }
              resolve();
            },
          );
        });
      }
      setSelectedCollectionIds(new Set());
    } finally {
      setIsAddingItems(false);
    }
  };

  // Create new collection
  const handleCreateCollection = async () => {
    if (!newCollectionTitle.trim()) return;

    setIsCreatingCollection(true);
    try {
      browser.runtime.sendMessage(
        {
          type: "CREATE_COLLECTION",
          title: newCollectionTitle,
        },
        (response) => {
          if (response.ok) {
            useCollectionStore.getState().addCollection(response.data);
            setNewCollectionTitle("");
            setShowCreateModal(false);
          } else {
            console.error("Failed to create collection:", response.error);
          }
          setIsCreatingCollection(false);
        },
      );
    } catch (err) {
      console.error("Error creating collection:", err);
      setIsCreatingCollection(false);
    }
  };

  if (isLoading || isCheckingExistence) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-destructive">
        <p>Error loading collections: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <GreetingHeader />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Collections</h2>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowCreateModal(!showCreateModal)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Create Collection Modal */}
      {showCreateModal && (
        <div className="space-y-2 p-3 bg-muted rounded-lg">
          <Input
            placeholder="Collection name"
            value={newCollectionTitle}
            onChange={(e) => setNewCollectionTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateCollection();
              }
            }}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleCreateCollection}
              disabled={!newCollectionTitle.trim() || isCreatingCollection}
              className="flex-1"
            >
              {isCreatingCollection ? (
                <Loader className="animate-spin w-4 h-4" />
              ) : (
                "Create"
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setNewCollectionTitle("");
              }}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Collections Container */}
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
        <ScrollArea className="h-36">
          {filteredCollections.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              {collections.length === 0
                ? "No collections yet"
                : "No matching collections"}
            </p>
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
    </div>
  );
};
