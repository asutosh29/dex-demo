import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import { Badge } from "@repo/ui/components/ui/badge";
import { Copy, CheckCheck, AlertTriangle } from "@repo/ui/icons";
import { toast } from "@repo/ui/components/ui/sonner";

type ApiKeyMode = "full_access" | "collection_specific";

interface ApiKeySuccessProps {
  apiKey: string;
  mode: ApiKeyMode;
  collectionCount: number;
  onDone: () => void;
}

export function ApiKeySuccess({
  apiKey,
  mode,
  collectionCount,
  onDone,
}: ApiKeySuccessProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success("API key copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="space-y-4 py-4">
        <div className="flex items-start gap-3 p-3 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-900 dark:text-amber-100">
            <strong>Important:</strong> Copy this key now and store it securely.
            For security reasons, you won't be able to view it again.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Your API Key</Label>
          <div className="font-mono text-sm bg-muted p-4 rounded-lg border flex items-center justify-between gap-3">
            <code className="flex-1 break-all">{apiKey}</code>
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
              : collectionCount > 0
                ? `Granted access to ${collectionCount} collection${collectionCount === 1 ? "" : "s"}`
                : "No collections selected - you can grant access later"}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onDone}>Done</Button>
      </div>
    </>
  );
}
