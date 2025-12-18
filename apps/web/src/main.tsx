import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@repo/ui/globals.css";
import { TRPCProvider } from "./lib/trpc-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TRPCProvider>
      <App />
    </TRPCProvider>
  </StrictMode>,
);
