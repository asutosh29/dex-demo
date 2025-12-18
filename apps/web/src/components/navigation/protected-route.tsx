import { Loader2 } from "@repo/ui/icons";
import { Navigate, Outlet } from "react-router-dom";
import { authClient } from "~/lib/auth-client";

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

  return session ? <Outlet /> : <Navigate to="/login" replace />;
}
