import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import type { SelectedUser } from "./use-invite";

interface SelectableUserRowProps {
  user: SelectedUser;
  isSelected: boolean;
  onToggle: (user: SelectedUser) => void;
}

export function SelectableUserRow({
  user,
  isSelected,
  onToggle,
}: SelectableUserRowProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(user)}
      className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
        isSelected ? "border-primary/30 bg-accent" : "hover:bg-muted/50"
      }`}
    >
      <Checkbox
        checked={isSelected}
        tabIndex={-1}
        className="pointer-events-none"
      />
      <Avatar className="size-10">
        <AvatarImage src={user.image ?? undefined} />
        <AvatarFallback>
          {(user.name ?? user.email)[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate font-medium">{user.name}</p>
        <p className="truncate text-sm text-muted-foreground">{user.email}</p>
      </div>
    </button>
  );
}
