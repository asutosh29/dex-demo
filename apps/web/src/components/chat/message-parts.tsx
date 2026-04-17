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
import TestEcho, {
  type TestEchoInput,
  type TestEchoOutput,
} from "./gen-ui/test-echo";
import { Loader } from "@repo/ui/icons";
import { TEST_ECHO } from "~/lib/chat/tools/utils";

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
          // TODO: Abstract this out into a component mapper
          if (toolPart.type === `tool-${TEST_ECHO}`) {
            const input = toolPart.input as TestEchoInput;
            const output = toolPart.output as TestEchoOutput;
            // return <TestEcho key={`${message.id}-tool-${partIndex}`} message={toolPart.input as string} />
            switch (toolPart.state) {
              case "input-available":
                return <Loader key={`${message.id}-tool-${partIndex}`} />;
              case "output-available":
                return (
                  <TestEcho
                    key={`${message.id}-tool-${partIndex}`}
                    input={input}
                    output={output}
                  />
                );
              case "output-error":
                return (
                  <div key={`${message.id}-tool-${partIndex}`}>
                    Error: {"Some Error"}
                  </div>
                );
              default:
                return null;
            }
          }
          return (
            <Tool key={`${message.id}-tool-${partIndex}`}>
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
