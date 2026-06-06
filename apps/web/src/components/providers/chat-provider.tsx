import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { SUPPORTED_MODELS, type ModelProvider } from "~/lib/models";
import { ChatContext, type ChatContextType } from "./chat-context";
import { toast } from "@repo/ui/components/ui/sonner";
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedModel, setSelectedModel] = useState<string>(
    () => localStorage.getItem("dex-selected-model") || SUPPORTED_MODELS[0].id,
  );
  const [modelProvider, setModelProvider] = useState<ModelProvider>(
    () =>
      (localStorage.getItem("dex-model-provider") as ModelProvider) ||
      SUPPORTED_MODELS[0].provider,
  );
  const prevModelRef = useRef<string>(selectedModel);

  const latestStateRef = useRef({ selectedModel, modelProvider });

  useEffect(() => {
    localStorage.setItem("dex-selected-model", selectedModel);
    localStorage.setItem("dex-model-provider", modelProvider);
    latestStateRef.current = { selectedModel, modelProvider };
  }, [selectedModel, modelProvider]);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8787/"}chat`,
        fetch: async (url, init) => {
          return fetch(url, {
            ...init,
            credentials: "include", // This is the magic line
          });
        },
        prepareSendMessagesRequest({ messages, body }) {
          console.log("messages", messages);
          console.log("body", body);
          const { selectedModel, modelProvider } = latestStateRef.current;
          console.log("modelProvider", modelProvider);
          console.log("selectedModel", selectedModel);
          // NOTE: whatever is passed in the send message goes through here.
          // What goes to the chat is plan and simple json
          // Use the middleware on /chat/* to intercept and inject into request context in the backend!
          return {
            body: {
              messages: [messages[messages.length - 1]],
              memory: {
                thread: body?.threadId,
                resource: body?.userId,
              },
              data: {
                provider: modelProvider,
                model: selectedModel,
              },
            },
          };
        },
      }),
    [],
  );
  const chat = useChat({
    transport,
    experimental_throttle: 400,
    onError: (error) => {
      console.log("error", error);
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (prevModelRef.current !== selectedModel) {
      console.log(
        `Transitioning logic from ${prevModelRef.current} to ${selectedModel}`,
      );
      const model = SUPPORTED_MODELS.find(
        (model) => model.id === selectedModel,
      );
      if (model) {
        setModelProvider(model.provider);
      }

      prevModelRef.current = selectedModel;
      setSelectedModel(selectedModel);
    }
  }, [selectedModel]);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
  };

  const value: ChatContextType = {
    ...chat,
    selectedModel,
    setSelectedModel: handleModelChange,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
