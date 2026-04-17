import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@repo/ui/components/ai-elements/conversation";

import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authClient } from "~/lib/auth-client";
import { trpc } from "~/lib/trpc";
import { ChatPromptInput } from "~/components/chat/chat-prompt-input";
import { toAISdkV5Messages } from "@mastra/ai-sdk/ui";
import { MessageParts } from "~/components/chat/message-parts";
import {
  Message,
  MessageContent,
} from "@repo/ui/components/ai-elements/message";
import { useChatContext } from "~/components/providers/chat-context";

export default function Thread() {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name?.split(" ")[0] ?? "there";

  // Track threads we created optimistically (so we don't fetch empty history for them)
  const optimisticThreadId = useRef<string | null>(null);
  // Track which threadId we've already loaded history for (apply only once)
  const historyLoadedFor = useRef<string | null>(null);

  const { data: historyData } = trpc.threads.getHistory.useQuery(
    { threadId: threadId! },
    { enabled: !!threadId },
  );

  const {
    messages,
    sendMessage,
    setMessages,
    status,
    selectedModel,
    setSelectedModel,
  } = useChatContext();

  const activeThreadIdKey = threadId || "new";

  // When we switch to a new thread, load its saved model (or fallback)
  useEffect(() => {
    try {
      const threadModels = JSON.parse(
        localStorage.getItem("dex-thread-models") || "{}",
      );
      if (
        threadModels[activeThreadIdKey] &&
        threadModels[activeThreadIdKey] !== selectedModel
      ) {
        setSelectedModel(threadModels[activeThreadIdKey]);
      }
    } catch {}
    // We intentionally exclude selectedModel from dependencies to avoid overriding manual user changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeThreadIdKey, setSelectedModel]);

  // When selectedModel changes, save it for the current thread
  useEffect(() => {
    if (!selectedModel) return;
    try {
      const threadModels = JSON.parse(
        localStorage.getItem("dex-thread-models") || "{}",
      );
      if (threadModels[activeThreadIdKey] !== selectedModel) {
        threadModels[activeThreadIdKey] = selectedModel;
        localStorage.setItem("dex-thread-models", JSON.stringify(threadModels));
      }
    } catch {}
  }, [selectedModel, activeThreadIdKey]);

  // const showSuggestions = !isAiKeysLoading && (aiKeys?.length ?? 0) > 0;
  const showSuggestions = false;

  // Reset state when threadId changes (including navigating to /chat with no threadId)
  useEffect(() => {
    if (threadId !== historyLoadedFor.current) {
      historyLoadedFor.current = null;
    }
    // Clear stale messages from previous thread when navigating to a new/empty chat
    if (
      !threadId ||
      (threadId !== optimisticThreadId.current &&
        threadId !== historyLoadedFor.current)
    ) {
      setMessages([]);
    }
  }, [threadId, setMessages]);

  // Sync history exactly once per thread navigation, skipping optimistic threads
  useEffect(() => {
    if (!historyData || !threadId) return;
    // Don't overwrite live conversation for a thread we just created
    if (optimisticThreadId.current === threadId) return;
    // Don't re-apply history we've already loaded
    if (historyLoadedFor.current === threadId) return;

    setMessages(toAISdkV5Messages(historyData.messages));
    historyLoadedFor.current = threadId;
  }, [historyData, threadId, setMessages]);

  const isStreaming = status === "streaming";
  const showGreeting = !threadId && messages.length === 0;

  const handleSend = (text: string) => {
    if (!threadId) {
      const newId = crypto.randomUUID();
      optimisticThreadId.current = newId;
      sendMessage(
        { text },
        { body: { threadId: newId, userId: session?.user?.id } },
      );
      navigate(`/chat/${newId}`, { replace: true });
    } else {
      sendMessage({ text }, { body: { threadId, userId: session?.user?.id } });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100svh-3.5rem)]">
      {showGreeting ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 pb-20">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-4xl font-medium text-muted-foreground">
              Hi {userName}!
            </h1>
            <h2 className="text-5xl font-semibold tracking-tight">
              What should we explore?
            </h2>
          </div>

          {showSuggestions && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full mt-4">
              {/* TODO: Make this dynamic by referring to recent activity and making an LLM call */}
              {[
                "Summarize my recent collections",
                "What APIs did I save recently?",
                "Help me categorize my ungrouped items",
                "Show me resources about React",
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(suggestion)}
                  className="text-left p-4 rounded-xl border bg-card hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
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
      )}

      {/* Add a linear gradient bg-background at bottom and fade it out to the top */}
      <div className="sticky bottom-0 bg-linear-to-t from-background from-50% to-transparent pt-4 pb-4">
        <ChatPromptInput
          className={
            showGreeting
              ? "w-full max-w-2xl mx-auto"
              : "max-w-3xl mx-auto w-full bg-background rounded-lg"
          }
          sendMessage={handleSend}
        />
      </div>
    </div>
  );
}
