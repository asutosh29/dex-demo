const morningGreetings = [
  "Good morning",
  "Rise and shine",
  "Morning",
  "Top of the morning",
];

const afternoonGreetings = [
  "Good afternoon",
  "Afternoon",
  "Hope you're having a great day",
];

const eveningGreetings = [
  "Good evening",
  "Evening",
  "Welcome back",
  "Hope your day went well",
];

const nightGreetings = ["Evening", "Hey night owl", "Burning the midnight oil"];

export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();

  const getRandomFrom = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  if (hour >= 5 && hour < 12) {
    return getRandomFrom(morningGreetings);
  } else if (hour >= 12 && hour < 17) {
    return getRandomFrom(afternoonGreetings);
  } else if (hour >= 17 && hour < 21) {
    return getRandomFrom(eveningGreetings);
  } else {
    return getRandomFrom(nightGreetings);
  }
};

export const getDomainFromUrl = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace("www.", "");
  } catch {
    return url;
  }
};
