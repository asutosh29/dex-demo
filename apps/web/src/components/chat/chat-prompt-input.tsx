import { useState, type ChangeEvent, useEffect, useMemo } from "react";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@repo/ui/components/ai-elements/prompt-input";
import { SUPPORTED_MODELS } from "~/lib/models";
import { trpc, type RouterOutputs } from "~/lib/trpc";
import { useChatContext } from "../providers/chat-context";
import { Button } from "@repo/ui/components/ui/button";
import { Link } from "react-router-dom";
import { CircleDashed, Square } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";

interface ChatPromptInputProps {
  className?: string;
  sendMessage: (text: string) => void;
}

export function ChatPromptInput({
  className,
  sendMessage,
}: ChatPromptInputProps) {
  const [text, setText] = useState("");
  const { selectedModel, setSelectedModel, status, stop } = useChatContext();
  const [showApiKeyAlert, setShowApiKeyAlert] = useState(false);

  const { data: aiKeys } = trpc.aiKeys.list.useQuery();
  const availableProviders = useMemo(
    () =>
      new Set(
        aiKeys?.map(
          (k: RouterOutputs["aiKeys"]["list"][number]) => k.provider,
        ) || [],
      ),
    [aiKeys],
  );

  // Sync initial model selection if the current selected model isn't available
  useEffect(() => {
    if (aiKeys && aiKeys.length > 0) {
      const currentModel = SUPPORTED_MODELS.find((m) => m.id === selectedModel);
      const isCurrentAvailable =
        currentModel && availableProviders.has(currentModel.provider);

      if (!isCurrentAvailable) {
        const firstAvailable = SUPPORTED_MODELS.find((m) =>
          availableProviders.has(m.provider),
        );
        if (firstAvailable) {
          setSelectedModel(firstAvailable.id);
        }
      }
    }
  }, [aiKeys, availableProviders, selectedModel, setSelectedModel]);

  const availableModels = SUPPORTED_MODELS.filter((m) =>
    availableProviders.has(m.provider),
  );
  const unavailableModels = SUPPORTED_MODELS.filter(
    (m) => !availableProviders.has(m.provider),
  );
  const sortedModels = [...availableModels, ...unavailableModels];

  const isNoModelAvailable = availableModels.length === 0;
  const isGenerating = status === "streaming" || status === "submitted";

  const handleTextareaInteraction = (e: React.SyntheticEvent) => {
    if (isNoModelAvailable) {
      e.preventDefault();
      if ("blur" in e.target && typeof e.target.blur === "function") {
        e.target.blur();
      }
      setShowApiKeyAlert(true);
    }
  };

  return (
    <>
      <PromptInput
        onSubmit={() => {
          sendMessage(text);
          setText("");
        }}
        className={className}
      >
        <PromptInputBody>
          <PromptInputTextarea
            value={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              if (isNoModelAvailable) return;
              setText(e.target.value);
            }}
            onClick={handleTextareaInteraction}
            onFocus={handleTextareaInteraction}
            placeholder="Ask dex"
            readOnly={isNoModelAvailable}
          />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputSelect
              value={selectedModel}
              onValueChange={setSelectedModel}
            >
              <PromptInputSelectTrigger>
                <PromptInputSelectValue />
              </PromptInputSelectTrigger>
              <PromptInputSelectContent>
                {sortedModels.map((m) => {
                  const isAvailable = availableProviders.has(m.provider);
                  return (
                    <PromptInputSelectItem
                      key={m.id}
                      value={m.id}
                      disabled={!isAvailable}
                      className={!isAvailable ? "opacity-50" : ""}
                    >
                      <span>{m.name}</span>
                      {!isAvailable && (
                        <span className="text-muted-foreground ml-2 text-xs">
                          (Requires Key)
                        </span>
                      )}
                    </PromptInputSelectItem>
                  );
                })}
              </PromptInputSelectContent>
            </PromptInputSelect>
          </PromptInputTools>

          <PromptInputSubmit
            status={status}
            onStop={() => {
              stop();
            }}
            disabled={(!text.trim() && !isGenerating) || isNoModelAvailable}
          >
            {isGenerating ? (
              <div className="relative flex items-center justify-center text-destructive">
                <CircleDashed className="size-4 animate-spin" />
                <Square className="absolute size-1.5 fill-current" />
              </div>
            ) : undefined}
          </PromptInputSubmit>
        </PromptInputFooter>
      </PromptInput>

      <Dialog open={showApiKeyAlert} onOpenChange={setShowApiKeyAlert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Key Required</DialogTitle>
            <DialogDescription>
              You need to add an API key first before you can proceed with
              chatting.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowApiKeyAlert(false)}>
              Cancel
            </Button>
            <Button asChild>
              <Link to="/dashboard/api-keys">Add API Keys</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
