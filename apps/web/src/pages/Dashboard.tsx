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
    <main className="max-w-4xl mx-auto p-4">
      <div className="text-center space-y-1 mt-16">
        <h1 className="text-4xl 2xl:text-5xl font-display font-light">
          {greeting},{" "}
          <span className="italic text-muted-foreground">{firstName}.</span>
        </h1>
        <p className="text-muted-foreground mt-3 2xl:text-lg">
          Explore your collections, add items, search, anything!
        </p>
      </div>
    </main>
  );
}
