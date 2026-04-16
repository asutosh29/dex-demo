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
import { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { authClient } from "~/lib/auth-client";
import { trpc } from "~/lib/trpc";
import { ChatPromptInput } from "~/components/chat/chat-prompt-input";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toAISdkV5Messages } from "@mastra/ai-sdk/ui";

export default function Thread() {
  const { threadId } = useParams<{ threadId: string }>();
  const { data: session } = authClient.useSession();

  const { data: historyData } = trpc.threads.getHistory.useQuery({
    threadId: threadId!,
  });

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "http://localhost:8787/chat",
        prepareSendMessagesRequest({ messages, body }) {
          console.log("messages", messages);
          console.log("body", body);
          // NOTE: whatever is passed in the send message goes through here.
          // What goes to the chat is plan and simple json
          // Use the middleware on /chat/* to intercept and inject into request context in the backend!
          return {
            body: {
              messages: [messages[messages.length - 1]],
              memory: {
                thread: threadId,
                resource: session?.user?.id,
              },
              data: body?.data,
            },
          };
        },
      }),
    [threadId, session?.user?.id],
  );

  const { messages, sendMessage, setMessages } = useChat({
    transport,
    experimental_throttle: 400,
  });

  useEffect(() => {
    if (historyData) {
      // TODO: For a later stage, avoid using useEffect to seed useChat
      // to cleanly handle the initial mount race condition. Best practice is
      // splitting this out into a wrapper that fetches data, formatting
      // via @mastra/ai-sdk/ui 'toAISdkV5Messages', and passing it via initialMessages.
      setMessages(toAISdkV5Messages(historyData.messages));
    }
    console.log("historyData", historyData);
    console.log("uiMessages", toAISdkV5Messages(historyData?.messages || []));
  }, [historyData, setMessages]);

  return (
    <div className="flex flex-1 flex-col h-full">
      <Conversation>
        <ConversationContent className="max-w-3xl mx-auto w-full">
          {messages.map((message) => (
            <Message from={message.role} key={message.id}>
              <MessageContent>
                {/* normal message */}
                {message.parts.map((part, partIndex) => {
                  if (part.type === "text") {
                    return (
                      <MessageResponse key={`${message.id}-text-${partIndex}`}>
                        {part.text}
                      </MessageResponse>
                    );
                  }
                  if (part.type === "tool-weatherTool") {
                    return (
                      <Tool defaultOpen key={`${message.id}-tool-${partIndex}`}>
                        <ToolHeader
                          type={part.type as `tool-${string}`}
                          state="output-available"
                        />
                        <ToolContent>
                          <ToolInput input={part.input} />
                          <ToolOutput
                            output={
                              <MessageResponse>{part.output}</MessageResponse>
                            }
                            errorText={undefined}
                          />
                        </ToolContent>
                      </Tool>
                    );
                  }
                })}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="sticky bottom-0 p-4 bg-background/80 backdrop-blur-sm">
        <ChatPromptInput
          className="max-w-3xl mx-auto w-full"
          sendMessage={(text) =>
            sendMessage(
              { text },
              {
                body: {
                  data: {
                    provider: "groq",
                    model: "groq/llama-3.3-70b-versatile",
                  },
                },
              },
            )
          }
        />
      </div>
    </div>
  );
}
