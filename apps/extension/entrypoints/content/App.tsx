import { useAuthStore } from "@/lib/stores/auth-store";
import LoginScreen from "./screens/login-screen";
import CollectionsManager from "./screens/collections-manager";

export default () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <div
      className="fixed top-2 right-2 bg-background/90 backdrop-blur-md z-10000 border shadow-2xl rounded-md p-4 overflow-y-auto"
      style={{
        width: "300px",
      }}
    >
      {!isLoggedIn ? <LoginScreen /> : <CollectionsManager />}
    </div>
  );
};
