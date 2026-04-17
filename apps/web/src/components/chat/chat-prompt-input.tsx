import { useState, type ChangeEvent, useEffect } from "react";
import {
  PromptInput,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputActionAddAttachments,
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/ui/components/ui/hover-card";
import { Button } from "@repo/ui/components/ui/button";
import { Link } from "react-router-dom";

interface ChatPromptInputProps {
  className?: string;
  sendMessage: (text: string) => void;
}

export function ChatPromptInput({
  className,
  sendMessage,
}: ChatPromptInputProps) {
  const [text, setText] = useState("");
  const { selectedModel, setSelectedModel } = useChatContext();

  const { data: aiKeys } = trpc.aiKeys.list.useQuery();
  const availableProviders = new Set(
    aiKeys?.map((k: RouterOutputs["aiKeys"]["list"][number]) => k.provider) ||
      [],
  );

  // Sync initial model selection if the first element isn't available but others are
  useEffect(() => {
    if (
      aiKeys &&
      aiKeys.length > 0 &&
      !availableProviders.has(SUPPORTED_MODELS[0].provider)
    ) {
      const firstAvailable = SUPPORTED_MODELS.find((m) =>
        availableProviders.has(m.provider),
      );
      if (firstAvailable) {
        setSelectedModel(firstAvailable.id);
      }
    }
  }, [aiKeys, availableProviders]);

  const availableModels = SUPPORTED_MODELS.filter((m) =>
    availableProviders.has(m.provider),
  );
  const unavailableModels = SUPPORTED_MODELS.filter(
    (m) => !availableProviders.has(m.provider),
  );
  const sortedModels = [...availableModels, ...unavailableModels];

  const isNoModelAvailable = availableModels.length === 0;

  return (
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
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
          placeholder="Ask dex"
        />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
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
        {isNoModelAvailable ? (
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <div className="flex">
                <PromptInputSubmit disabled />
              </div>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-80">
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  You need add API keys first before to proceed!
                </p>
                <Button asChild size="sm" className="w-full">
                  <Link to="/dashboard/api-keys">Add api keys</Link>
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <PromptInputSubmit disabled={!text.trim()} />
        )}
      </PromptInputFooter>
    </PromptInput>
  );
}
