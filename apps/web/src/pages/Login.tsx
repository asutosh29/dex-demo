import { authClient } from "~/lib/auth-client";
import { Hexagon } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";

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
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Hexagon className="size-4" />
            </div>
            Dex
          </a>
        </div>
        <div className="flex flex-col gap-6 flex-1 items-center justify-center relative">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Welcome to Dex!</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Your shared second brain.
            </p>
          </div>
          <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
          <Hexagon className="-z-10 size-80 text-muted-foreground/10 absolute animate-ping" />
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://placehold.co/400x800"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
