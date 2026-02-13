import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { CreateApiKeyForm } from "./create-api-key-form";
import { ApiKeySuccess } from "./api-key-success";
import type { ApiKeyMode } from "@repo/server/rbac/helpers";

interface CreateApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ApiKeyResult {
  key: string;
  mode: ApiKeyMode;
  collectionCount: number;
}

export function CreateApiKeyDialog({
  open,
  onOpenChange,
}: CreateApiKeyDialogProps) {
  const [result, setResult] = useState<ApiKeyResult | null>(null);

  const handleSuccess = (
    apiKey: string,
    mode: ApiKeyMode,
    collectionCount: number,
  ) => {
    setResult({ key: apiKey, mode, collectionCount });
  };

  const handleClose = () => {
    setResult(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        {result ? (
          <>
            <DialogHeader>
              <DialogTitle>API Key Created!</DialogTitle>
              <DialogDescription>
                Save this key now - you won't be able to see it again
              </DialogDescription>
            </DialogHeader>
            <ApiKeySuccess
              apiKey={result.key}
              mode={result.mode}
              collectionCount={result.collectionCount}
              onDone={handleClose}
            />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create API Key</DialogTitle>
              <DialogDescription>
                Create a new API key for accessing your collections via MCP and
                other integrations
              </DialogDescription>
            </DialogHeader>
            <CreateApiKeyForm
              onSuccess={handleSuccess}
              onCancel={handleClose}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
