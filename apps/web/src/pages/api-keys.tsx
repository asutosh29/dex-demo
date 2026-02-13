import { Key, Plus } from "@repo/ui/icons";
import { Button } from "@repo/ui/components/ui/button";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@repo/ui/components/ui/empty";
import { trpc } from "~/lib/trpc";
import { useState, lazy, Suspense } from "react";
import { ApiKeysDataTable } from "~/components/dashboard/api-keys/api-keys-data-table";

const CreateApiKeyDialog = lazy(() =>
  import("~/components/dashboard/api-keys/create-api-key-dialog").then((m) => ({
    default: m.CreateApiKeyDialog,
  })),
);
import { ApiKeyModesPopover } from "~/components/dashboard/api-keys/api-key-modes-popover";

export default function ApiKeys() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { data: apiKeys, isLoading } = trpc.apiKeys.list.useQuery();

  return (
    <div className="container max-w-6xl mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <Key className="h-6 w-6" />
            <h1 className="text-3xl font-display">API Keys</h1>
            <ApiKeyModesPopover />
          </div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus />
            Create Key
          </Button>
        </div>
        <p className="text-muted-foreground">
          Manage API keys for accessing your collections via MCP and other
          integrations
        </p>
      </div>

      {/* API Keys Table */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12" />
          <Skeleton className="h-64" />
        </div>
      ) : apiKeys && apiKeys.length > 0 ? (
        <ApiKeysDataTable data={apiKeys} />
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Key />
            </EmptyMedia>
            <EmptyTitle>No API keys yet</EmptyTitle>
            <EmptyDescription>
              Create your first API key to access your collections via MCP
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {/* Create Dialog */}
      <Suspense fallback={null}>
        <CreateApiKeyDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />
      </Suspense>
    </div>
  );
}
