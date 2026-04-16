import type { UIMessage } from "ai";
import { MessageResponse } from "@repo/ui/components/ai-elements/message";
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from "@repo/ui/components/ai-elements/tool";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@repo/ui/components/ai-elements/reasoning";
import type { ToolUIPart } from "ai";

export const MessageParts = ({
  message,
  isLastMessage,
  isStreaming,
}: {
  message: UIMessage;
  isLastMessage: boolean;
  isStreaming: boolean;
}) => {
  const reasoningParts = message.parts.filter(
    (part) => part.type === "reasoning",
  );
  const reasoningText = reasoningParts.map((part) => part.text).join("\n\n");
  const hasReasoning = reasoningParts.length > 0;
  // Check if reasoning is still streaming (last part is reasoning on last message)
  const lastPart = message.parts.at(-1);
  const isReasoningStreaming =
    isLastMessage && isStreaming && lastPart?.type === "reasoning";

  return (
    <>
      {hasReasoning && (
        <Reasoning
          key={`${message.id}-reasoning-${message.id}`}
          isStreaming={isReasoningStreaming}
        >
          <ReasoningTrigger />
          <ReasoningContent>{reasoningText}</ReasoningContent>
        </Reasoning>
      )}
      {message.parts.map((part, partIndex) => {
        if (part.type === "text") {
          return (
            <MessageResponse key={`${message.id}-text-${partIndex}`}>
              {part.text}
            </MessageResponse>
          );
        }
        if (part.type.startsWith("tool-")) {
          const toolPart = part as ToolUIPart;
          return (
            <Tool defaultOpen key={`${message.id}-tool-${partIndex}`}>
              <ToolHeader
                type={toolPart.type as `tool-${string}`}
                state="output-available"
              />
              <ToolContent>
                <ToolInput input={toolPart.input} />
                <ToolOutput output={toolPart.output} errorText={undefined} />
              </ToolContent>
            </Tool>
          );
        }
      })}
    </>
  );
};
