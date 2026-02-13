import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Badge } from "@repo/ui/components/ui/badge";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { Info, Search } from "@repo/ui/icons";
import { trpc } from "~/lib/trpc";
import { useUserCollections } from "~/lib/hooks/use-user-collections";
import { toast } from "@repo/ui/components/ui/sonner";
import { type Role, canManageApiKeyAccess } from "@repo/server/rbac/helpers";

interface CollectionAccessManagerProps {
  apiKeyId: string;
  apiKeyName: string;
  grantedCollections: Array<{ id: string; title: string }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CollectionAccessManager({
  apiKeyId,
  apiKeyName,
  grantedCollections,
  open,
  onOpenChange,
}: CollectionAccessManagerProps) {
  const { data: allCollections, isLoading } = useUserCollections();
  const utils = trpc.useUtils();

  const [searchQuery, setSearchQuery] = useState("");
  const initialGrantedIds = useMemo(
    () => grantedCollections.map((c) => c.id),
    [grantedCollections],
  );
  const [selectedCollections, setSelectedCollections] =
    useState<string[]>(initialGrantedIds);
  const [isApplying, setIsApplying] = useState(false);

  // Check if there are changes
  const hasChanges = useMemo(() => {
    const selectedSet = new Set(selectedCollections);
    const grantedSet = new Set(initialGrantedIds);

    if (selectedSet.size !== grantedSet.size) return true;

    for (const id of selectedSet) {
      if (!grantedSet.has(id)) return true;
    }

    return false;
  }, [selectedCollections, initialGrantedIds]);

  const grantMutation = trpc.apiKeys.grantCollectionAccess.useMutation();
  const revokeMutation = trpc.apiKeys.revokeCollectionAccess.useMutation();

  const filteredCollections = useMemo(() => {
    if (!allCollections) return [];
    return allCollections.filter((collection) =>
      collection.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allCollections, searchQuery]);

  const toggleCollection = (collectionId: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId],
    );
  };

  const handleApply = async () => {
    setIsApplying(true);

    const currentGrantedIds = new Set(initialGrantedIds);
    const newSelectedIds = new Set(selectedCollections);

    // Find collections to grant access to (in new selection but not in current)
    const toGrant = selectedCollections.filter(
      (id) => !currentGrantedIds.has(id),
    );

    // Find collections to revoke access from (in current but not in new selection)
    const toRevoke = initialGrantedIds.filter((id) => !newSelectedIds.has(id));

    try {
      // Execute all grants
      for (const collectionId of toGrant) {
        await grantMutation.mutateAsync({ apiKeyId, collectionId });
      }

      // Execute all revokes
      for (const collectionId of toRevoke) {
        await revokeMutation.mutateAsync({ apiKeyId, collectionId });
      }

      utils.apiKeys.list.invalidate();
      toast.success("Collection access updated successfully");
      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update collection access";
      toast.error(message);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Collection Access</DialogTitle>
          <DialogDescription>
            Grant "{apiKeyName}" access to specific collections
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Info Box */}
          <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/50">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Granted collections receive these permissions:
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  collection:read
                </Badge>
                <Badge variant="outline" className="text-xs">
                  item:add
                </Badge>
                <Badge variant="outline" className="text-xs">
                  collection:view_members
                </Badge>
              </div>
            </div>
          </div>

          {/* Collections List */}
          <div className="space-y-2">
            <div className="border rounded-lg">
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

              {/* Scrollable Collection List */}
              <ScrollArea className="max-h-60 min-h-30">
                <div className="p-2">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                      Loading collections...
                    </div>
                  ) : filteredCollections.length > 0 ? (
                    <div className="space-y-1">
                      {filteredCollections.map((collection) => {
                        const isSelected = selectedCollections.includes(
                          collection.id,
                        );
                        const isShared = collection.isShared as boolean;
                        const role = collection.role as Role;
                        const canManage = canManageApiKeyAccess(role);
                        const isDisabled = isShared && !canManage;

                        return (
                          <TooltipProvider key={collection.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={`flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors ${
                                    isDisabled
                                      ? "opacity-50 cursor-not-allowed"
                                      : "cursor-pointer"
                                  }`}
                                  onClick={() =>
                                    !isDisabled &&
                                    toggleCollection(collection.id)
                                  }
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <Checkbox
                                      checked={isSelected}
                                      disabled={isDisabled}
                                      onCheckedChange={() =>
                                        toggleCollection(collection.id)
                                      }
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <p className="font-medium text-sm">
                                          {collection.title}
                                        </p>
                                        {isShared && (
                                          <Badge
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            Shared
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TooltipTrigger>
                              {isDisabled && (
                                <TooltipContent>
                                  <p className="text-xs">
                                    You need admin or owner role to manage API
                                    key access to this shared collection
                                  </p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      {searchQuery
                        ? "No collections found"
                        : "No collections available"}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply} disabled={isApplying || !hasChanges}>
              {isApplying ? "Applying..." : "Apply Changes"}
            </Button>
          </>
        </div>
      </DialogContent>
    </Dialog>
  );
}
