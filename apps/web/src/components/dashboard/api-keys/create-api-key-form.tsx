import { useState, useMemo } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Badge } from "@repo/ui/components/ui/badge";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { Shield, Lock, Search } from "@repo/ui/icons";
import { trpc } from "~/lib/trpc";
import { useUserCollections } from "~/lib/hooks/use-user-collections";
import { toast } from "@repo/ui/components/ui/sonner";
import {
  type ApiKeyMode,
  type Role,
  canManageApiKeyAccess,
} from "@repo/server/rbac/helpers";

interface CreateApiKeyFormProps {
  onSuccess: (
    apiKey: string,
    mode: ApiKeyMode,
    collectionCount: number,
  ) => void;
  onCancel: () => void;
}

export function CreateApiKeyForm({
  onSuccess,
  onCancel,
}: CreateApiKeyFormProps) {
  const [name, setName] = useState("");
  const [mode, setMode] = useState<ApiKeyMode>("collection_specific");
  const [expiresIn, setExpiresIn] = useState<string>("never");
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const utils = trpc.useUtils();

  const { data: allCollections, isLoading: collectionsLoading } =
    useUserCollections();

  const createMutation = trpc.apiKeys.create.useMutation({
    onSuccess: (result) => {
      onSuccess(result.key, mode, selectedCollections.length);
      utils.apiKeys.list.invalidate();
      toast.success("API key created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create API key");
    },
  });

  const filteredCollections = useMemo(() => {
    if (!allCollections) return [];
    return allCollections.filter((collection) =>
      collection.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allCollections, searchQuery]);

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("Please enter a name for your API key");
      return;
    }

    const expirySeconds =
      expiresIn === "never"
        ? undefined
        : expiresIn === "30d"
          ? 30 * 24 * 60 * 60
          : expiresIn === "90d"
            ? 90 * 24 * 60 * 60
            : 365 * 24 * 60 * 60; // 1 year

    createMutation.mutate({
      name: name.trim(),
      mode,
      expiresIn: expirySeconds,
      collectionIds:
        mode === "collection_specific" ? selectedCollections : undefined,
    });
  };

  const toggleCollection = (collectionId: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId],
    );
  };

  return (
    <>
      <div className="space-y-4 py-4">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="e.g., Claude Desktop, Production Server"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <p className="text-xs text-muted-foreground">
            A descriptive name to identify this API key
          </p>
        </div>

        {/* Access Mode - Side by Side */}
        <div className="space-y-4">
          <Label>Access Mode</Label>
          <div className="flex flex-col gap-4">
            {/* Full Access */}
            <button
              type="button"
              onClick={() => {
                setMode("full_access");
                setSelectedCollections([]);
              }}
              className={`relative flex flex-col items-start gap-2 p-4 rounded-lg transition-colors text-left ${
                mode === "full_access" && "border-b-3 border bg-primary/5"
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <p className="font-semibold">Full Access</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Inherits all your collection permissions and can create new
                collections
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="secondary" className="text-xs">
                  All collections
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  collection:create
                </Badge>
              </div>
            </button>

            {/* Collection-Specific */}
            <button
              type="button"
              onClick={() => setMode("collection_specific")}
              className={`relative flex flex-col items-start gap-2 p-4 rounded-lg border transition-colors text-left ${
                mode === "collection_specific" &&
                "border-b-3 border bg-primary/5"
              }`}
            >
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <p className="font-semibold">Collection-Specific</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Limited to collections you explicitly grant access to
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="secondary" className="text-xs">
                  collection:read
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  item:add
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  collection:view_members
                </Badge>
              </div>
            </button>
          </div>
        </div>

        {/* Collection Selector - Only shown for collection_specific mode */}
        {mode === "collection_specific" && (
          <div className="space-y-4">
            <Label>
              Select Collections{" "}
              <span className="text-muted-foreground">
                ({selectedCollections.length})
              </span>
            </Label>
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
                  {collectionsLoading ? (
                    <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                      Loading collections...
                    </div>
                  ) : filteredCollections.length > 0 ? (
                    <div className="space-y-1">
                      {filteredCollections.map((collection) => {
                        const isShared = collection.isShared as boolean;
                        const role = collection.role as Role;
                        const canManage = canManageApiKeyAccess(role);
                        const isDisabled = isShared && !canManage;

                        return (
                          <TooltipProvider key={collection.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors ${
                                    isDisabled
                                      ? "opacity-50 cursor-not-allowed"
                                      : "cursor-pointer"
                                  }`}
                                  onClick={() =>
                                    !isDisabled &&
                                    toggleCollection(collection.id)
                                  }
                                >
                                  <Checkbox
                                    checked={selectedCollections.includes(
                                      collection.id,
                                    )}
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
                              </TooltipTrigger>
                              {isDisabled && (
                                <TooltipContent>
                                  <p className="text-xs">
                                    You need admin or owner role to grant API
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
        )}

        {/* Expiration */}
        <div className="space-y-2">
          <Label>Expiration</Label>
          <div className="grid grid-cols-4 gap-2">
            <Button
              type="button"
              variant={expiresIn === "30d" ? "secondary" : "outline"}
              onClick={() => setExpiresIn("30d")}
            >
              30 days
            </Button>
            <Button
              type="button"
              variant={expiresIn === "90d" ? "secondary" : "outline"}
              onClick={() => setExpiresIn("90d")}
            >
              90 days
            </Button>
            <Button
              type="button"
              variant={expiresIn === "1y" ? "secondary" : "outline"}
              onClick={() => setExpiresIn("1y")}
            >
              1 year
            </Button>
            <Button
              type="button"
              variant={expiresIn === "never" ? "secondary" : "outline"}
              onClick={() => setExpiresIn("never")}
            >
              Never
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleCreate} disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Create API Key"}
        </Button>
      </div>
    </>
  );
}
