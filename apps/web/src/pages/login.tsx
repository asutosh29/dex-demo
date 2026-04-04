import { Button } from "@repo/ui/components/ui/button";
import { AnimatedGroup } from "@repo/ui/components/ui/animated-group";
import { authClient } from "~/lib/auth-client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatedCheck } from "@repo/ui/components/ui/animated-check";
import { ChevronLeft } from "@repo/ui/icons";

export default function Login() {
  const [searchParams] = useSearchParams();
  const isWaitlisted = searchParams.get("status") === "waitlist";
  const { data: session, isPending } = authClient.useSession();

  const navigate = useNavigate();

  // TODO: shift to a flag from the backend rather than checking for prod
  if (
    session &&
    !isPending &&
    (import.meta.env.DEV || session.user.status === "active")
  )
    navigate("/dashboard");

  return (
    <main className="flex flex-col h-screen w-full items-center justify-center">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute top-6 left-4 inline-flex items-center gap-2">
        <img src="/logo.svg" className="size-6" />
        <span className="text-lg">Dex</span>
      </div>
      {isWaitlisted ? (
        <WaitlistScreen
          name={searchParams.get("name") || "User"}
          email={searchParams.get("email") || "user@example.com"}
        />
      ) : (
        <HeroScreen isPending={isPending} />
      )}
      <footer className="fixed bottom-2 p-2 text-muted-foreground brightness-50 text-center">
        © 2026 Dex. Building the future of personal knowledge.
      </footer>
    </main>
  );
}

function HeroScreen({ isPending }: { isPending: boolean }) {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/dashboard`,
    });
  };
  return (
    <AnimatedGroup
      preset="blur-slide"
      className="flex flex-col items-center justify-center gap-4 max-w-3xl px-4 sm:px-0"
    >
      <p className="text-sm md:text-base uppercase tracking-widest text-muted-foreground text-center">
        Your digital collections, reimagined
      </p>
      <h1 className="text-5xl sm:text-6xl md:text-8xl items-center text-balance text-center font-display">
        Capture it. Tag it.
        <br />
        <span className="text-muted-foreground italic">Find it forever</span>
      </h1>
      <p className="text-base md:text-xl text-center max-w-[46ch] text-muted-foreground mt-4">
        Save anything. Find everything. Your links, notes, and files — indexed
        and searchable in one place.
      </p>
      <div className="space-y-2 text-center">
        <Button
          onClick={handleGoogleSignIn}
          className="mt-8 font-medium text-base p-6"
          size={"lg"}
          disabled={isPending}
        >
          {isPending
            ? "Checking for existing session..."
            : "Sign in with Google"}
        </Button>
        <p className="text-sm font-medium text-muted-foreground brightness-50">
          Join the waitlist for early access
        </p>
      </div>
    </AnimatedGroup>
  );
}

function WaitlistScreen({ name, email }: { name: string; email: string }) {
  const navigate = useNavigate();
  return (
    <div className="max-w-xl w-full mx-auto p-8">
      <div className="bg-card border-t rounded-2xl p-12 flex flex-col items-center text-center space-y-6 relative">
        <Button
          size={"icon"}
          variant={"ghost"}
          className="absolute top-2 left-2 text-muted-foreground"
          onClick={() => {
            navigate("/");
          }}
        >
          <ChevronLeft />
        </Button>
        {/* Check icon */}
        <AnimatedCheck className="size-24 *:w-12 *:h-12" />

        {/* Heading */}
        <h1 className="text-4xl font-semibold">You're on the list, {name}!</h1>

        {/* Description */}
        <div className="text-muted-foreground space-y-1">
          <p>
            We'll notify you at <span className="text-foreground">{email}</span>
          </p>
          <p>when it's your turn.</p>
        </div>
      </div>
    </div>
  );
}
