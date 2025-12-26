import { useState } from "react";
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
import { Copy, CheckCheck, AlertTriangle, Shield, Lock } from "@repo/ui/icons";
import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";

type ApiKeyMode = "full_access" | "collection_specific";

interface CreateApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateApiKeyDialog({
  open,
  onOpenChange,
}: CreateApiKeyDialogProps) {
  const [name, setName] = useState("");
  const [mode, setMode] = useState<ApiKeyMode>("collection_specific");
  const [expiresIn, setExpiresIn] = useState<string>("never");
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const utils = trpc.useUtils();

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
    setNewApiKey(null);
    setCopied(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
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

              <div className="space-y-3">
                <Label>Access Mode</Label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => setMode("full_access")}
                    className={`relative flex items-start gap-3 p-4 rounded-lg border-2 transition-colors text-left ${
                      mode === "full_access"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Shield className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">Full Access</p>
                        {mode === "full_access" && (
                          <Badge variant="default" className="text-xs">
                            Selected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Inherits all your collection permissions and can create
                        new collections
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          All collections
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          collection:create
                        </Badge>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("collection_specific")}
                    className={`relative flex items-start gap-3 p-4 rounded-lg border-2 transition-colors text-left ${
                      mode === "collection_specific"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Lock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">Collection-Specific</p>
                        {mode === "collection_specific" && (
                          <Badge variant="default" className="text-xs">
                            Selected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Limited to collections you explicitly grant access to
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
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
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Expiration</Label>
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    type="button"
                    variant={expiresIn === "30d" ? "default" : "outline"}
                    onClick={() => setExpiresIn("30d")}
                  >
                    30 days
                  </Button>
                  <Button
                    type="button"
                    variant={expiresIn === "90d" ? "default" : "outline"}
                    onClick={() => setExpiresIn("90d")}
                  >
                    90 days
                  </Button>
                  <Button
                    type="button"
                    variant={expiresIn === "1y" ? "default" : "outline"}
                    onClick={() => setExpiresIn("1y")}
                  >
                    1 year
                  </Button>
                  <Button
                    type="button"
                    variant={expiresIn === "never" ? "default" : "outline"}
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
                    : "Grant collection access to enable these permissions"}
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
