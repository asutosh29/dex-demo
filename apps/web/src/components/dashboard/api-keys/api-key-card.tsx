import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Button } from "@repo/ui/components/ui/button";
import { MoreVertical, Trash2, Settings, Shield, Lock } from "@repo/ui/icons";
import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";
import { useState } from "react";
import { CollectionAccessManager } from "./collection-access-manager";

type ApiKeyMode = "full_access" | "collection_specific";

interface ApiKeyCardProps {
  apiKey: {
    id: string;
    name: string;
    mode: ApiKeyMode;
    createdAt: Date;
    expiresAt: Date | null;
    grantedCollections: Array<{ id: string; title: string }>;
  };
}

export function ApiKeyCard({ apiKey }: ApiKeyCardProps) {
  const [manageAccessOpen, setManageAccessOpen] = useState(false);
  const utils = trpc.useUtils();

  const deleteMutation = trpc.apiKeys.delete.useMutation({
    onSuccess: () => {
      utils.apiKeys.list.invalidate();
      toast.success("API key deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete API key");
    },
  });

  const handleDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete "${apiKey.name}"? This action cannot be undone.`,
      )
    ) {
      deleteMutation.mutate({ keyId: apiKey.id });
    }
  };

  const isExpired = apiKey.expiresAt && new Date(apiKey.expiresAt) < new Date();

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{apiKey.name}</CardTitle>
                {apiKey.mode === "full_access" ? (
                  <Badge variant="default" className="gap-1">
                    <Shield className="h-3 w-3" />
                    Full Access
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <Lock className="h-3 w-3" />
                    Collection-Specific
                  </Badge>
                )}
              </div>
              <CardDescription>
                Created {new Date(apiKey.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {isExpired ? (
                <Badge variant="destructive">Expired</Badge>
              ) : apiKey.expiresAt ? (
                <Badge variant="secondary">
                  Expires {new Date(apiKey.expiresAt).toLocaleDateString()}
                </Badge>
              ) : (
                <Badge variant="default">Active</Badge>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {apiKey.mode === "collection_specific" && (
                    <DropdownMenuItem onClick={() => setManageAccessOpen(true)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Manage Collections
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Key
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {apiKey.mode === "full_access" ? (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Access:</span>
                <span className="font-medium">All your collections</span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Collection Access:
                  </span>
                  <span className="font-medium">
                    {apiKey.grantedCollections.length > 0
                      ? `${apiKey.grantedCollections.length} collection${
                          apiKey.grantedCollections.length !== 1 ? "s" : ""
                        }`
                      : "None"}
                  </span>
                </div>
                {apiKey.grantedCollections.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {apiKey.grantedCollections.map((collection) => (
                      <Badge key={collection.id} variant="outline">
                        {collection.title}
                      </Badge>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {apiKey.mode === "collection_specific" && (
        <CollectionAccessManager
          apiKeyId={apiKey.id}
          apiKeyName={apiKey.name}
          grantedCollections={apiKey.grantedCollections}
          open={manageAccessOpen}
          onOpenChange={setManageAccessOpen}
        />
      )}
    </>
  );
}
