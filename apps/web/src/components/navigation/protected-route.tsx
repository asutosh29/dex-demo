import { Loader2 } from "@repo/ui/icons";
import { AnimatedCheck } from "@repo/ui/components/ui/animated-check";
import { Navigate, Outlet } from "react-router-dom";
import { authClient } from "~/lib/auth-client";

function WaitlistScreen({ email }: { email: string }) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="max-w-xl w-full mx-auto p-8">
        <div className="border border-border rounded-2xl p-12 flex flex-col items-center text-center space-y-6">
          {/* Check icon */}
          <AnimatedCheck className="size-24" />

          {/* Heading */}
          <h1 className="text-4xl font-semibold">You're on the list!</h1>

          {/* Description */}
          <div className="text-muted-foreground space-y-1">
            <p>We'll notify you at {email}</p>
            <p>when it's your turn.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProtectedRoute() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-muted-foreground size-5 animate-spin">
          <Loader2 />
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  // Check user status
  const userStatus = session.user.status;

  if (userStatus === "waitlist" && import.meta.env.PROD) {
    return <WaitlistScreen email={session.user.email} />;
  }

  if (userStatus === "suspended") {
    return <Navigate to="/?status=suspended" replace />;
  }

  // User is active, allow access
  return <Outlet />;
}
