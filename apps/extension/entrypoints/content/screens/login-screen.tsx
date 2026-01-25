import { Button } from "@repo/ui/components/ui/button";
import { ArrowRight, LogInIcon, MoveRight } from "@repo/ui/icons";
import Logo from "~/assets/logo.svg";

const LoginScreen = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="left-2 top-2 flex items-center self-start gap-1">
        <img src={Logo} alt="Dex Logo" className="h-4 w-4" />
      </div>
      <h1 className="font-display text-3xl text-center">
        Gotta save <br />
        <span className="text-muted-foreground">
          <em>'em all</em>
        </span>
      </h1>
      <Button
        className="mt-4 mb-1 w-full"
        variant={"outline"}
        size={"lg"}
        onClick={() => {
          browser.runtime.sendMessage({ type: "SIGN_IN" });
        }}
      >
        Login to Dex
        <MoveRight />
      </Button>
    </div>
  );
};

export default LoginScreen;
