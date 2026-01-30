import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-8 text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold">Page not found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
