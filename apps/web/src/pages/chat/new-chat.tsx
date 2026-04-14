import { authClient } from "~/lib/auth-client";
import { ChatPromptInput } from "~/components/chat/chat-prompt-input";

export default function NewChat() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-medium text-muted-foreground">
          Hi {userName}!
        </h1>
        <h2 className="text-5xl font-semibold tracking-tight">
          What should we explore?
        </h2>
      </div>

      <ChatPromptInput className="w-full max-w-2xl" />
    </div>
  );
}
