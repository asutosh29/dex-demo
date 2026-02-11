import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Label } from "@repo/ui/components/ui/label";
import { useState } from "react";
import { trpc } from "~/lib/trpc";
import { useDebounce } from "@repo/ui/hooks/use-debounce";
import { Loader2, ChevronDown } from "@repo/ui/icons";
import { toast } from "@repo/ui/components/ui/sonner";
import { UserSearchResult } from "./user-search-result";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionId: string;
}

export function AddMemberDialog({ open, onOpenChange, collectionId }: Props) {
  const [query, setQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<"member" | "admin">(
    "member",
  );
  const debouncedQuery = useDebounce(query, 300);

  const { data: users, isLoading } = trpc.users.search.useQuery(
    { query: debouncedQuery },
    { enabled: debouncedQuery.length > 0 },
  );

  const utils = trpc.useUtils();

  const inviteMutation = trpc.invitations.create.useMutation({
    onSuccess: () => {
      utils.collectionAccess.getMembers.invalidate({ collectionId });
      utils.collections.getUserCollections.invalidate();
      toast.success("Invitation sent successfully");
      setQuery("");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send invitation");
    },
  });

  const { data: existingMembers } = trpc.collectionAccess.getMembers.useQuery({
    collectionId,
  });

  const existingMemberIds = new Set(
    existingMembers?.map((m) => m.userId) || [],
  );

  const filteredUsers = users?.filter(
    (user) => !existingMemberIds.has(user.id),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Search input */}
          <div className="space-y-2">
            <Label htmlFor="user-search">Search User</Label>
            <Input
              id="user-search"
              placeholder="Search by name or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          {/* Role selector */}
          <div className="space-y-2">
            <Label htmlFor="role-select">Role</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  id="role-select"
                  variant="outline"
                  className="w-full justify-between capitalize"
                >
                  {selectedRole}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem onClick={() => setSelectedRole("member")}>
                  Member
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedRole("admin")}>
                  Admin
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User results */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {isLoading && debouncedQuery && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            )}

            {!isLoading && debouncedQuery && filteredUsers?.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                No users found
              </p>
            )}

            {filteredUsers?.map((user) => (
              <UserSearchResult
                key={user.id}
                user={user}
                onAdd={() =>
                  inviteMutation.mutate({
                    collectionId,
                    userId: user.id,
                    role: selectedRole,
                  })
                }
                isLoading={inviteMutation.isPending}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
