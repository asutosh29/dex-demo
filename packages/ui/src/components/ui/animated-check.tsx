import { cn } from "@repo/ui/lib/utils";

export const AnimatedCheck = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "size-16 bg-emerald-950 rounded-full flex items-center justify-center",
        className,
      )}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4ade80"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path className="check-animated" d="M20 6L9 17l-5-5" />
      </svg>
    </div>
  );
};
