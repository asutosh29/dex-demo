import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SUPPORTED_MODELS, type ModelProvider } from "~/lib/models";

type ChatContextType = ReturnType<typeof useChat> & {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedModel, setSelectedModel] = useState(SUPPORTED_MODELS[0].id);
  const [modelProvider, setModelProvider] = useState<ModelProvider>(
    SUPPORTED_MODELS[0].provider,
  );
  const prevModelRef = useRef<string>(selectedModel);

  const latestStateRef = useRef({ selectedModel, modelProvider });

  useEffect(() => {
    latestStateRef.current = { selectedModel, modelProvider };
  }, [selectedModel, modelProvider]);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "http://localhost:8787/chat",
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

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context)
    throw new Error("useChatContext must be used within a ChatProvider");
  return context;
};
