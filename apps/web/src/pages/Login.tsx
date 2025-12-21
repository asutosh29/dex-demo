import { authClient } from "~/lib/auth-client";
import { Hexagon } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { DexLogo } from "@repo/ui/icons";

export default function Login() {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/dashboard`,
    });
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <DexLogo className="size-5" />
            Dex
          </a>
        </div>
        <div className="flex flex-col gap-6 flex-1 items-center justify-center relative">
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-lg text-muted-foreground">Welcome to</h1>
            <h1 className="text-5xl font-bold flex gap-2 items-center">
              <DexLogo className="size-10" />
              Dex
            </h1>
            <p className="text-muted-foreground text-base text-balance mt-2">
              Your shared second brain.
            </p>
          </div>
          <Button onClick={handleGoogleSignIn} size="lg" className="mt-2">
            Sign in with Google
          </Button>
          <Hexagon className="-z-10 size-80 text-muted-foreground/10 absolute animate-ping" />
        </div>
      </div>
      <div className="relative hidden lg:flex items-center justify-center p-10 bg-muted/50">
        <img
          src="/login.svg"
          alt="Login illustration"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}
