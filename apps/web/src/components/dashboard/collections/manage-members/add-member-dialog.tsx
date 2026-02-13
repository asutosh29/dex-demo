import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { useState } from "react";
import { Search, Loader2, UserSearch } from "@repo/ui/icons";
import { trpc } from "~/lib/trpc";
import { UserSearchResult } from "./user-search-result";
import { useMemberManagement } from "./member-management-context";
import type { Role } from "@repo/server/rbac/helpers";
import { useDebounce } from "@repo/ui/hooks/use-debounce";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMemberDialog({ open, onOpenChange }: Props) {
  const { meta, actions, state } = useMemberManagement();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<Role>("member");

  const debouncedQuery = useDebounce(query, 300);

  const { data: users, isLoading: isSearching } = trpc.users.search.useQuery(
    { query: debouncedQuery },
    { enabled: debouncedQuery.length > 0 },
  );

  const addMemberMutation = trpc.collectionAccess.addMember.useMutation({
    onSuccess: () => {
      actions.invalidateMembers();
      setQuery("");
      onOpenChange(false);
    },
  });

  const existingMemberIds = new Set(state.members?.map((m) => m.userId) || []);

  const filteredUsers = users?.filter(
    (user) => !existingMemberIds.has(user.id),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Search for users to invite to this collection
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input and Role Selection */}
          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search">Search by name/email</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Start typing to search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="w-32 space-y-2">
              <Label htmlFor="role">Invite as Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger className="w-full" id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Results */}
          <div className="space-y-2 h-64">
            {query && filteredUsers && filteredUsers.length > 0 && (
              <ScrollArea className="h-full rounded-md">
                {filteredUsers.map((user) => (
                  <UserSearchResult
                    key={user.id}
                    user={user}
                    onAdd={() =>
                      addMemberMutation.mutate({
                        collectionId: meta.collectionId,
                        userId: user.id,
                        role,
                      })
                    }
                    isLoading={addMemberMutation.isPending}
                  />
                ))}
              </ScrollArea>
            )}
            {isSearching && query && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            )}

            {!isSearching && query && users?.length === 0 && (
              <div className="h-full flex items-center justify-center text-center text-sm text-muted-foreground">
                No users found
              </div>
            )}

            {!isSearching && !query && (
              <div className="h-full flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
                <UserSearch className="size-12 text-muted-foreground mb-4" />
                Start typing to search for users
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
