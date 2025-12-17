import { authClient } from "~/lib/auth-client";
import { Button } from "@repo/ui/components/ui/button";

export default function Login() {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/dashboard`,
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg border bg-card">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to continue to your account
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full"
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
