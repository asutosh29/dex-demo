import { Button } from "@repo/ui/components/ui/button";
import { DexLogo, LogInIcon } from "@repo/ui/icons";

const LoginScreen = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-2xl inline-flex items-center gap-2 font-bold">
        <DexLogo /> Dex
      </h1>
      <p>Your shared second brain.</p>
      <Button
        className="w-full mt-2"
        onClick={() => {
          browser.runtime.sendMessage({ type: "SIGN_IN" });
        }}
      >
        Login <LogInIcon />
      </Button>
    </div>
  );
};

export default LoginScreen;
