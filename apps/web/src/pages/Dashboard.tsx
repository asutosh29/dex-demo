import { authClient } from "~/lib/auth-client";

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export default function Dashboard() {
  const greeting = getTimeBasedGreeting();
  const { data: session } = authClient.useSession();
  const firstName = session?.user.name?.split(" ")[0];

  return (
    <>
      <div className="text-center space-y-1 mt-2">
        <h1 className="text-3xl font-semibold">
          {greeting}, {firstName}!
        </h1>
        <p className="text-sm text-muted-foreground">
          Explore your collections, add items, search, anything!
        </p>
      </div>
    </>
  );
}
