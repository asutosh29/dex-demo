import { useState, type ChangeEvent } from "react";
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

const MODELS = [
  { id: "groq/moonshot-kimi", name: "groq/moonshot-kimi" },
  { id: "openai/gpt-4o", name: "openai/gpt-4o" },
  { id: "anthropic/claude-sonnet", name: "anthropic/claude-sonnet" },
];

interface ChatPromptInputProps {
  className?: string;
}

export function ChatPromptInput({ className }: ChatPromptInputProps) {
  const [text, setText] = useState("");
  const [model, setModel] = useState(MODELS[0].id);

  return (
    <PromptInput
      onSubmit={() => {
        // Static — no-op for now
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
          <PromptInputSelect value={model} onValueChange={setModel}>
            <PromptInputSelectTrigger>
              <PromptInputSelectValue />
            </PromptInputSelectTrigger>
            <PromptInputSelectContent>
              {MODELS.map((m) => (
                <PromptInputSelectItem key={m.id} value={m.id}>
                  {m.name}
                </PromptInputSelectItem>
              ))}
            </PromptInputSelectContent>
          </PromptInputSelect>
        </PromptInputTools>
        <PromptInputSubmit disabled={!text.trim()} />
      </PromptInputFooter>
    </PromptInput>
  );
}
