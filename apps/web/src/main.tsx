import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@repo/ui/globals.css";
import { TRPCProvider } from "~/components/providers/trpc-provider";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { Toaster } from "@repo/ui/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TRPCProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
        <Toaster />
      </ThemeProvider>
    </TRPCProvider>
  </StrictMode>,
);
