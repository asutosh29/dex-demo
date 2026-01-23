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
import {
  Copy,
  CheckCheck,
  AlertTriangle,
  Shield,
  Lock,
  Search,
} from "@repo/ui/icons";
import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";

type ApiKeyMode = "full_access" | "collection_specific";
type Role = "owner" | "admin" | "member";

interface CreateApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateApiKeyDialog({
  open,
  onOpenChange,
}: CreateApiKeyDialogProps) {
  // TODO: too many use-states, consider using tanstack form later.
  const [name, setName] = useState("");
  const [mode, setMode] = useState<ApiKeyMode>("full_access");
  const [expiresIn, setExpiresIn] = useState<string>("never");
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const utils = trpc.useUtils();

  const { data: allCollections, isLoading: collectionsLoading } =
    trpc.collections.getUserCollections.useQuery();

  const createMutation = trpc.apiKeys.create.useMutation({
    onSuccess: (result) => {
      setNewApiKey(result.key);
      utils.apiKeys.list.invalidate();
      toast.success("API key created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create API key");
    },
  });

  const canManageApiKeyAccess = (role: Role) =>
    role === "admin" || role === "owner";

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

  const handleCopy = async () => {
    if (newApiKey) {
      await navigator.clipboard.writeText(newApiKey);
      setCopied(true);
      toast.success("API key copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setName("");
    setMode("collection_specific");
    setExpiresIn("never");
    setSelectedCollections([]);
    setSearchQuery("");
    setNewApiKey(null);
    setCopied(false);
    onOpenChange(false);
  };

  const toggleCollection = (collectionId: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId],
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        {!newApiKey ? (
          <>
            <DialogHeader>
              <DialogTitle>Create API Key</DialogTitle>
              <DialogDescription>
                Create a new API key for accessing your collections via MCP and
                other integrations
              </DialogDescription>
            </DialogHeader>

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
                      Inherits all your collection permissions and can create
                      new collections
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
                                          You need admin or owner role to grant
                                          API key access to this shared
                                          collection
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
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Creating..." : "Create API Key"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>API Key Created!</DialogTitle>
              <DialogDescription>
                Save this key now - you won't be able to see it again
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-start gap-3 p-3 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-900 dark:text-amber-100">
                  <strong>Important:</strong> Copy this key now and store it
                  securely. For security reasons, you won't be able to view it
                  again.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Your API Key</Label>
                <div className="font-mono text-sm bg-muted p-4 rounded-lg border flex items-center justify-between gap-3">
                  <code className="flex-1 break-all">{newApiKey}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopy}
                    className="flex-shrink-0"
                  >
                    {copied ? (
                      <CheckCheck className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="flex flex-wrap gap-2">
                  {mode === "full_access" ? (
                    <>
                      <Badge variant="secondary">All your collections</Badge>
                      <Badge variant="secondary">collection:create</Badge>
                      <Badge variant="secondary">item:search</Badge>
                    </>
                  ) : (
                    <>
                      <Badge variant="secondary">collection:read</Badge>
                      <Badge variant="secondary">item:add</Badge>
                      <Badge variant="secondary">collection:view_members</Badge>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {mode === "full_access"
                    ? "This key has access to all collections you can access"
                    : selectedCollections.length > 0
                      ? `Granted access to ${selectedCollections.length} collection${selectedCollections.length === 1 ? "" : "s"}`
                      : "No collections selected - you can grant access later"}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleClose}>Done</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
