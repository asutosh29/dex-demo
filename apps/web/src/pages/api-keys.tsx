import { Key, Plus, Info } from "@repo/ui/icons";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Empty } from "@repo/ui/components/ui/empty";
import { trpc } from "~/lib/trpc";
import { useState } from "react";
import { CreateApiKeyDialog } from "~/components/dashboard/api-keys/create-api-key-dialog";
import { ApiKeyCard } from "~/components/dashboard/api-keys/api-key-card";

export default function ApiKeys() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { data: apiKeys, isLoading } = trpc.apiKeys.list.useQuery();

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Key className="h-6 w-6" />
          <h1 className="text-3xl font-bold">API Keys</h1>
        </div>
        <p className="text-muted-foreground">
          Manage API keys for accessing your collections via MCP and other
          integrations
        </p>
      </div>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            <CardTitle className="text-lg">API Key Modes</CardTitle>
          </div>
          <CardDescription>
            Choose the access level for your API keys
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/50">
            <div className="flex-1 space-y-3">
              <div>
                <p className="font-semibold text-sm mb-1">Full Access</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Inherits all your collection permissions and can create new
                  collections
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    All collections
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    collection:create
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    item:search
                  </Badge>
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="font-semibold text-sm mb-1">
                  Collection-Specific
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Limited to collections you explicitly grant access to
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
          </div>
        </CardContent>
      </Card>

      {/* Create Button */}
      <Button
        onClick={() => setCreateDialogOpen(true)}
        className="w-full"
        size="lg"
      >
        <Plus className="mr-2 h-4 w-4" />
        Create API Key
      </Button>

      {/* API Keys List */}
      <div className="space-y-4">
        {isLoading ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : apiKeys && apiKeys.length > 0 ? (
          apiKeys.map((apiKey) => (
            <ApiKeyCard key={apiKey.id} apiKey={apiKey} />
          ))
        ) : (
          <Empty
            icon={Key}
            title="No API keys yet"
            description="Create your first API key to access your collections via MCP"
          />
        )}
      </div>

      {/* Create Dialog */}
      <CreateApiKeyDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}
