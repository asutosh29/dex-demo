import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { Plus } from "@repo/ui/icons";

interface Props {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
  onAdd: () => void;
  isLoading: boolean;
}

export function UserSearchResult({ user, onAdd, isLoading }: Props) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image || undefined} />
          <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Button size="sm" onClick={onAdd} disabled={isLoading}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
