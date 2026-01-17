import { Button } from "@repo/ui/components/ui/button";
import { AnimatedGroup } from "@repo/ui/components/ui/animated-group";
import { authClient } from "~/lib/auth-client";

export default function Login() {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/dashboard`,
    });
  };
  return (
    <main className="flex flex-col h-screen w-full items-center justify-center">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute top-6 left-4 inline-flex items-center gap-2">
        <img src="/logo.svg" className="size-6" />
        <span className="text-lg">Dex</span>
      </div>
      <AnimatedGroup
        preset="blur-slide"
        className="flex flex-col items-center justify-center gap-4 max-w-3xl"
      >
        <p className="uppercase tracking-widest text-muted-foreground">
          Your digital collections, reimagined
        </p>
        <h1 className="text-8xl items-center text-balance text-center font-display">
          Capture it. Tag it.
          <br />
          <span className="text-muted-foreground italic">Find it forever</span>
        </h1>
        <p className="text-xl text-center max-w-[46ch] text-muted-foreground mt-4">
          Save anything. Find everything. Your links, notes, and files — indexed
          and searchable in one place.
        </p>
        <div className="space-y-2 text-center">
          <Button
            onClick={handleGoogleSignIn}
            className="mt-8 font-medium text-base p-6"
            size={"lg"}
          >
            Sign in with Google
          </Button>
          <p className="text-sm font-medium text-muted-foreground brightness-50">
            Join the waitlist for early access
          </p>
        </div>
      </AnimatedGroup>
      <footer className="fixed bottom-2 p-2 text-muted-foreground brightness-50">
        © 2026 Dex. Building the future of personal knowledge.
      </footer>
    </main>
  );
}
