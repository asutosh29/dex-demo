import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Loader2, Info } from "@repo/ui/icons";
import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";

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
  const { data: allCollections, isLoading } =
    trpc.collections.getAll.useQuery();
  const utils = trpc.useUtils();

  const [pendingToggle, setPendingToggle] = useState<string | null>(null);

  const grantMutation = trpc.apiKeys.grantCollectionAccess.useMutation({
    onSuccess: () => {
      utils.apiKeys.list.invalidate();
      toast.success("Collection access granted");
      setPendingToggle(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to grant access");
      setPendingToggle(null);
    },
  });

  const revokeMutation = trpc.apiKeys.revokeCollectionAccess.useMutation({
    onSuccess: () => {
      utils.apiKeys.list.invalidate();
      toast.success("Collection access revoked");
      setPendingToggle(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to revoke access");
      setPendingToggle(null);
    },
  });

  const handleToggle = (collectionId: string, isGranted: boolean) => {
    setPendingToggle(collectionId);

    if (isGranted) {
      revokeMutation.mutate({ apiKeyId, collectionId });
    } else {
      grantMutation.mutate({ apiKeyId, collectionId });
    }
  };

  const grantedIds = new Set(grantedCollections.map((c) => c.id));

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
            <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
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
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : allCollections && allCollections.length > 0 ? (
            <div className="space-y-2">
              {allCollections.map((collection) => {
                const isGranted = grantedIds.has(collection.id);
                const isPending = pendingToggle === collection.id;

                return (
                  <div
                    key={collection.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox
                        checked={isGranted}
                        onCheckedChange={() =>
                          handleToggle(collection.id, isGranted)
                        }
                        disabled={isPending}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{collection.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {collection.itemCount} item
                          {collection.itemCount !== 1 ? "s" : ""}
                          {collection.isShared && " • Shared"}
                        </p>
                      </div>
                    </div>
                    {isPending && (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No collections available</p>
              <p className="text-sm">Create a collection first</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
