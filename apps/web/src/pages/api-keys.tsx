import { Key, Plus, Settings2 } from "@repo/ui/icons";
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
import { ModelKeysDataTable } from "~/components/dashboard/api-keys/model-keys-data-table";
import { ModelKeysDialog } from "~/components/dashboard/api-keys/model-keys-dialog";
import { Separator } from "@repo/ui/components/ui/separator";

const CreateApiKeyDialog = lazy(() =>
  import("~/components/dashboard/api-keys/create-api-key-dialog").then((m) => ({
    default: m.CreateApiKeyDialog,
  })),
);
import { ApiKeyModesPopover } from "~/components/dashboard/api-keys/api-key-modes-popover";

export default function ApiKeys() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [modelKeyDialogOpen, setModelKeyDialogOpen] = useState(false);

  const { data: apiKeys, isLoading: isApiKeysLoading } =
    trpc.apiKeys.list.useQuery();
  const { data: aiKeys, isLoading: isAiKeysLoading } =
    trpc.aiKeys.list.useQuery();

  return (
    <div className="container max-w-6xl mx-auto py-8 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <Key className="h-6 w-6" />
            <h1 className="text-3xl font-display">Keys & Access</h1>
            <ApiKeyModesPopover />
          </div>
        </div>
        <p className="text-muted-foreground">
          Manage your Dex MCP server keys and external AI Model API keys.
        </p>
      </div>

      {/* MCP API Keys Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Key className="h-5 w-5 text-muted-foreground" />
              Dex API Keys
            </h2>
            <p className="text-sm text-muted-foreground">
              Keys used to access your collections via MCP and other
              integrations.
            </p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus />
            Create Key
          </Button>
        </div>

        {isApiKeysLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12" />
            <Skeleton className="h-48" />
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
      </section>

      <Separator />

      {/* Model Keys Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-muted-foreground" />
              Model Keys
            </h2>
            <p className="text-sm text-muted-foreground">
              Bring your own API keys for AI models (OpenAI, Anthropic, Groq,
              Gemini).
            </p>
          </div>
          <Button onClick={() => setModelKeyDialogOpen(true)}>
            <Plus />
            Add Provider Key
          </Button>
        </div>

        {isAiKeysLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12" />
            <Skeleton className="h-48" />
          </div>
        ) : aiKeys && aiKeys.length > 0 ? (
          <ModelKeysDataTable data={aiKeys} />
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Settings2 />
              </EmptyMedia>
              <EmptyTitle>No model keys yet</EmptyTitle>
              <EmptyDescription>
                Add a provider API key to use native LLM features.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </section>

      {/* Create Dialogs */}
      <Suspense fallback={null}>
        <CreateApiKeyDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />
      </Suspense>

      <ModelKeysDialog
        open={modelKeyDialogOpen}
        onOpenChange={setModelKeyDialogOpen}
      />
    </div>
  );
}
