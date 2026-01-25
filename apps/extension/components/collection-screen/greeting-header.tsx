import { useAuthStore } from "@/lib/stores/auth-store";
import Logo from "~/assets/logo.svg";

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12 && hour >= 5) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else if (hour >= 17 && hour < 21) {
    return "Good evening";
  } else {
    return "Good night";
  }
};

const GreetingHeader = () => {
  const { user } = useAuthStore();
  const firstName = user?.name?.split(" ")[0] || "Guest";
  return (
    <div className="w-full inline-flex items-center gap-1 text-sm">
      <img src={Logo} alt="Dex Logo" className="h-4 w-4 mr-1" />
      {getTimeBasedGreeting()},
      <span className="text-muted-foreground">{firstName}!</span>
    </div>
  );
};

export { GreetingHeader };
