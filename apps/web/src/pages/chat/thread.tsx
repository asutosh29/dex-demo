import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@repo/ui/components/ai-elements/conversation";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { authClient } from "~/lib/auth-client";
import { trpc } from "~/lib/trpc";
import { ChatPromptInput } from "~/components/chat/chat-prompt-input";
import { toAISdkV5Messages } from "@mastra/ai-sdk/ui";
import { MessageParts } from "./messages";
import {
  Message,
  MessageContent,
} from "@repo/ui/components/ai-elements/message";
import { useChatContext } from "~/components/providers/chat-context";

export default function Thread() {
  const { threadId } = useParams<{ threadId: string }>();
  const { data: session } = authClient.useSession();

  const { data: historyData } = trpc.threads.getHistory.useQuery({
    threadId: threadId!,
  });

  const { messages, sendMessage, setMessages, status } = useChatContext();

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
  const isStreaming = status === "streaming";
  return (
    <div className="flex flex-col h-full">
      <Conversation>
        <ConversationContent className="max-w-3xl mx-auto w-full">
          {/* <DebugPanel messages={messages} /> */}
          {messages.map((message, index) => (
            <Message from={message.role} key={message.id}>
              <MessageContent>
                <MessageParts
                  key={message.id}
                  message={message}
                  isLastMessage={index === messages.length - 1}
                  isStreaming={isStreaming}
                />
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      {/* Add a linear gradient bg-background at bottom and fade it out to the top */}
      <div className="sticky bottom-0 bg-linear-to-t from-background from-50% to-transparent pt-12 pb-4">
        <ChatPromptInput
          className="max-w-3xl mx-auto w-full bg-background rounded-lg"
          sendMessage={(text) =>
            sendMessage(
              { text },
              {
                body: {
                  threadId,
                  userId: session?.user?.id,
                },
              },
            )
          }
        />
      </div>
    </div>
  );
}
