import "@repo/ui/globals.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { scan } from "react-scan";
import { StrictMode } from "react";
import { TRPCProvider } from "~/components/providers/trpc-provider";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { Toaster } from "@repo/ui/components/ui/sonner";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import { ChatProvider } from "./components/providers/chat-provider.tsx";

if (import.meta.env.DEV) {
  scan({
    enabled: true,
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TRPCProvider>
      <ChatProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <App />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </ChatProvider>
    </TRPCProvider>
  </StrictMode>,
);
