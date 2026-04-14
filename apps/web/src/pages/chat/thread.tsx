import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@repo/ui/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@repo/ui/components/ai-elements/message";
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from "@repo/ui/components/ai-elements/tool";
import { ChatPromptInput } from "~/components/chat/chat-prompt-input";

// --- Static mock data matching the mockup ---
const MOCK_TOOL_INPUT = {
  databases: ["analytics"],
  params: [{ "2024-01-01": "" }],
  query: "SELECT COUNT(*) FROM users WHERE created_at > ?",
};

const MOCK_TOOL_OUTPUT = `| User ID | Name | Email | Created At |
|---------|------|-------|------------|
| 1 | John Doe | john@example.com | 2024-01-15 |
| 2 | Jane Smith | jane@example.com | 2024-01-20 |
| 3 | Bob Wilson | bob@example.com | 2024-02-01 |
| 4 | Alice Brown | alice@example.com | 2024-02-12 |
| 5 | Charlie Davis | charlie@example.com | 2024-02-15 |`;

interface MockMessage {
  id: string;
  role: "user" | "assistant";
  text?: string;
  toolCall?: {
    name: string;
    input: Record<string, unknown>;
    output: string;
  };
}

const MOCK_MESSAGES: MockMessage[] = [
  {
    id: "1",
    role: "user",
    text: "Hi there whatsup!",
  },
  {
    id: "2",
    role: "assistant",
    text: "Hi there!\nI am dex your personal assistant and gateway to your second brain!\n\nLet me know what would you like to discuss next?",
  },
  {
    id: "3",
    role: "user",
    text: "Show me my collections",
  },
  {
    id: "4",
    role: "assistant",
    text: "Let me use the tools at hand...",
    toolCall: {
      name: "database_query",
      input: MOCK_TOOL_INPUT,
      output: MOCK_TOOL_OUTPUT,
    },
  },
];

export default function Thread() {
  return (
    <div className="flex flex-1 flex-col h-full">
      <Conversation>
        <ConversationContent className="max-w-3xl mx-auto w-full">
          {MOCK_MESSAGES.map((message) => (
            <Message from={message.role} key={message.id}>
              <MessageContent>
                {message.text && (
                  <MessageResponse>{message.text}</MessageResponse>
                )}
                {message.toolCall && (
                  <Tool defaultOpen>
                    <ToolHeader
                      type={
                        ("tool-" + message.toolCall.name) as `tool-${string}`
                      }
                      state="output-available"
                    />
                    <ToolContent>
                      <ToolInput input={message.toolCall.input} />
                      <ToolOutput
                        output={
                          <MessageResponse>
                            {message.toolCall.output}
                          </MessageResponse>
                        }
                        errorText={undefined}
                      />
                    </ToolContent>
                  </Tool>
                )}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="sticky bottom-0 p-4 bg-background/80 backdrop-blur-sm">
        <ChatPromptInput className="max-w-3xl mx-auto w-full" />
      </div>
    </div>
  );
}
