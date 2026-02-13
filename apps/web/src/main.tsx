import "@repo/ui/globals.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { scan } from "react-scan";
import { StrictMode } from "react";
import { TRPCProvider } from "~/components/providers/trpc-provider";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { Toaster } from "@repo/ui/components/ui/sonner";

if (import.meta.env.DEV) {
  scan({
    enabled: true,
  });
}

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
