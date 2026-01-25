import { useState, useMemo, useCallback } from "react";
import { useCollectionStore, Collection } from "@/lib/stores/collection-store";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Badge } from "@repo/ui/components/ui/badge";
import { Plus, Search, Loader } from "@repo/ui/icons";

export default () => {
  const { collections, isLoading, error } = useCollectionStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<
    Set<string>
  >(new Set());
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

  // Toggle collection selection
  const toggleCollection = useCallback((collectionId: string) => {
    setSelectedCollectionIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(collectionId)) {
        newSet.delete(collectionId);
      } else {
        newSet.add(collectionId);
      }
      return newSet;
    });
  }, []);

  // Add current tab to selected collections
  const handleAddToCollections = async () => {
    if (selectedCollectionIds.size === 0) return;

    setIsAddingItems(true);
    try {
      for (const collectionId of selectedCollectionIds) {
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

  if (isLoading) {
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
      {/* Header */}
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

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search collections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Collections List */}
      {filteredCollections.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          {collections.length === 0
            ? "No collections yet"
            : "No matching collections"}
        </p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredCollections.map((collection) => (
            <div
              key={collection.id}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer"
              onClick={() => toggleCollection(collection.id)}
            >
              <Checkbox
                checked={selectedCollectionIds.has(collection.id)}
                onChange={() => toggleCollection(collection.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {collection.title}
                </p>
              </div>
              {collection.itemCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {collection.itemCount}
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}

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
