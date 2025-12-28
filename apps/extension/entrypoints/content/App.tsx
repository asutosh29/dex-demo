import { useAuthStore } from "@/lib/stores/auth-store";
import { Button } from "@repo/ui/components/ui/button";
import { LogIn } from "@repo/ui/icons";
import { useEffect } from "react";

export default () => {
  const { isLoggedIn, user, setUser } = useAuthStore();

  useEffect(() => {
    browser.runtime.sendMessage({ type: "GET_SESSION" }, (response) => {
      if (response.ok) {
        setUser(response.data.user);
      }
    });
  }, []);

  return (
    <div className="fixed top-2 right-2 bg-background/90 backdrop-blur-md z-1000 w-64 border shadow-2xl rounded-md p-4">
      <div className="flex flex-row gap-2 items-center justify-center">
        {!isLoggedIn ? (
          <Button
            onClick={() => {
              browser.runtime.sendMessage({ type: "SIGN_IN" });
            }}
          >
            Dex Login <LogIn />
          </Button>
        ) : (
          <span className="text-sm text-muted-foreground">
            Signed in as {user?.email}
          </span>
        )}
      </div>
    </div>
  );
};
