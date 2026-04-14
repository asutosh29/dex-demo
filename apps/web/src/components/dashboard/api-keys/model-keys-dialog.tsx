import { useEffect, useState, type ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Eye, EyeOff, AlertTriangle } from "@repo/ui/icons";
import { trpc, type RouterOutputs } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";

type AiKey = RouterOutputs["aiKeys"]["list"][number];
type Provider = "openai" | "anthropic" | "groq" | "openrouter" | "google";

interface ModelKeysDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // If editingKey is provided, we are in update mode
  editingKey?: AiKey | null;
}

export function ModelKeysDialog({
  open,
  onOpenChange,
  editingKey,
}: ModelKeysDialogProps) {
  const isUpdating = !!editingKey;

  const [provider, setProvider] = useState<Provider>("openai");
  const [label, setLabel] = useState("");
  const [key, setKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  // We check if a key exists for the currently selected provider
  const { data: aiKeysList } = trpc.aiKeys.list.useQuery(undefined, {
    enabled: open,
  });

  // A key exists if it's in the list. During "Update", the selected provider IS the existing provider,
  // so we don't necessarily need an "overwrite warning" because they know they are updating.
  const providerKeyExists = aiKeysList?.some(
    (k: AiKey) => k.provider === provider,
  );
  const showOverwriteWarning = !isUpdating && providerKeyExists;

  const utils = trpc.useUtils();

  const storeMutation = trpc.aiKeys.store.useMutation({
    onSuccess: () => {
      utils.aiKeys.list.invalidate();
      toast.success(
        isUpdating
          ? "Model key updated successfully"
          : "Model key saved successfully",
      );
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save model key");
    },
  });

  useEffect(() => {
    if (open) {
      if (editingKey) {
        setProvider(editingKey.provider as Provider);
        setLabel(editingKey.label || "");
        setKey(""); // Keys cannot be retrieved securely, remain blank
      } else {
        setProvider("openai");
        setLabel("");
        setKey("");
      }
      setShowKey(false);
    }
  }, [open, editingKey]);

  const handleClose = () => {
    setProvider("openai");
    setLabel("");
    setKey("");
    setShowKey(false);
    onOpenChange(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      toast.error("Please enter an API Key");
      return;
    }
    storeMutation.mutate({
      provider,
      label: label.trim(),
      key: key.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isUpdating ? "Update Model Key" : "Add Model Key"}
          </DialogTitle>
          <DialogDescription>
            {isUpdating
              ? "Update your existing AI provider API Key."
              : "Store a new API key to use with native LLM features. Keys are encrypted."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <Select
              disabled={isUpdating || storeMutation.isPending}
              onValueChange={(val: Provider) => setProvider(val)}
              value={provider}
            >
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
                <SelectItem value="groq">Groq</SelectItem>
                <SelectItem value="openrouter">OpenRouter</SelectItem>
                <SelectItem value="google">Google Gemini</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showOverwriteWarning && (
            <div className="flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <p>
                A key for this provider already exists. Proceeding will
                overwrite it.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="label">Key Name</Label>
            <Input
              id="label"
              placeholder="e.g. My Personal OpenAI Key"
              disabled={storeMutation.isPending}
              value={label}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLabel(e.target.value)
              }
            />
            <p className="text-xs text-muted-foreground">
              Optional identifier for this key.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="key">API Key</Label>
            <div className="relative">
              <Input
                id="key"
                type={showKey ? "text" : "password"}
                placeholder={isUpdating ? "Enter new API key..." : "sk-..."}
                disabled={storeMutation.isPending}
                value={key}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setKey(e.target.value)
                }
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {showKey ? "Hide key" : "Show key"}
                </span>
              </Button>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={storeMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={storeMutation.isPending}>
              {storeMutation.isPending ? "Saving..." : "Save Key"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
