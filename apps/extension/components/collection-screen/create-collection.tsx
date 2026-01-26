import { useState, useEffect, cloneElement, isValidElement } from "react";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Plus, Loader, X } from "@repo/ui/icons";
import { useCollectionStore } from "@/lib/stores/collection-store";

interface CreateCollectionProps {
  onSuccess?: (collectionId: string) => void;
  children?:
    | React.ReactNode
    | ((props: { onClick: () => void }) => React.ReactNode);
  defaultTitle?: string;
  defaultExpanded?: boolean;
  placeholder?: string;
  asChild?: boolean;
}

export const CreateCollection = ({
  onSuccess,
  children,
  defaultTitle = "",
  defaultExpanded = false,
  placeholder = "Collection name",
  asChild = false,
}: CreateCollectionProps) => {
  const [showCreateModal, setShowCreateModal] = useState(defaultExpanded);
  const [newCollectionTitle, setNewCollectionTitle] = useState(defaultTitle);
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);

  // Update title if defaultTitle changes
  useEffect(() => {
    if (defaultTitle) {
      setNewCollectionTitle(defaultTitle);
    }
  }, [defaultTitle]);

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
            const collectionId = response.data.id;
            setNewCollectionTitle("");
            setShowCreateModal(false);
            onSuccess?.(collectionId);
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

  if (showCreateModal) {
    return (
      <div className="flex items-center gap-1">
        <Input
          placeholder={placeholder}
          value={newCollectionTitle}
          onChange={(e) => setNewCollectionTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateCollection();
            }
          }}
          autoFocus
        />
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            setShowCreateModal(false);
            // Reset to default title or empty string
            setNewCollectionTitle(defaultTitle);
          }}
        >
          <X className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          onClick={handleCreateCollection}
          disabled={!newCollectionTitle.trim() || isCreatingCollection}
        >
          {isCreatingCollection ? (
            <Loader className="animate-spin w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </Button>
      </div>
    );
  }

  const handleClick = () => setShowCreateModal(true);

  // asChild pattern: merge onClick into child element
  if (asChild && isValidElement(children)) {
    const childProps = children.props as any;
    return cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        childProps?.onClick?.(e);
        handleClick();
      },
    });
  }

  // Render prop pattern: call function with onClick handler
  if (typeof children === "function") {
    return <>{children({ onClick: handleClick })}</>;
  }

  // Default trigger button
  return (
    <Button
      variant="outline"
      className="w-full border-dashed"
      size={"sm"}
      onClick={handleClick}
    >
      <Plus className="w-4 h-4 mr-2" />
      Create New Collection
    </Button>
  );
};
