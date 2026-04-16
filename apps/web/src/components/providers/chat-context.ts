import { createContext, useContext } from "react";
import type { useChat } from "@ai-sdk/react";

export type ChatContextType = ReturnType<typeof useChat> & {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
};

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined,
);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context)
    throw new Error("useChatContext must be used within a ChatProvider");
  return context;
};
