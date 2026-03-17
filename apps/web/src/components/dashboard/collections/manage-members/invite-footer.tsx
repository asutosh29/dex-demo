import { SheetFooter } from "@repo/ui/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Button } from "@repo/ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { ChevronDown, ChevronUp, Loader2, Send, X } from "@repo/ui/icons";
import type { Role } from "@repo/server/rbac/helpers";
import type { SelectedUser } from "./use-invite";

interface InviteFooterProps {
  selectedUsers: SelectedUser[];
  role: Role;
  onRoleChange: (role: Role) => void;
  reviewOpen: boolean;
  onReviewOpenChange: (open: boolean) => void;
  isSending: boolean;
  onRemoveUser: (userId: string) => void;
  onSendInvites: () => void;
}

export function InviteFooter({
  selectedUsers,
  role,
  onRoleChange,
  reviewOpen,
  onReviewOpenChange,
  isSending,
  onRemoveUser,
  onSendInvites,
}: InviteFooterProps) {
  return (
    <SheetFooter className="border-t p-0">
      <div className="flex w-full items-center justify-between p-3">
        <Popover open={reviewOpen} onOpenChange={onReviewOpenChange}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="px-2">
              <AvatarGroup>
                {selectedUsers.slice(0, 2).map((user) => (
                  <Avatar key={user.id} size="sm">
                    <AvatarImage src={user.image ?? undefined} />
                    <AvatarFallback>
                      {(user.name ?? user.email)[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {selectedUsers.length > 2 && (
                  <Avatar size="sm">
                    <AvatarFallback>+{selectedUsers.length - 2}</AvatarFallback>
                  </Avatar>
                )}
              </AvatarGroup>
              <p className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
                Review{" "}
                {reviewOpen ? (
                  <ChevronDown className="size-3" />
                ) : (
                  <ChevronUp className="size-3" />
                )}
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="start"
            sideOffset={8}
            className="w-72 p-0"
          >
            <p className="px-4 pb-2 pt-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Inviting {selectedUsers.length} people
            </p>
            <div className="pb-1">
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 px-4 py-2"
                >
                  <Avatar className="size-8 shrink-0">
                    <AvatarImage src={user.image ?? undefined} />
                    <AvatarFallback>
                      {(user.name ?? user.email)[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 shrink-0 text-muted-foreground hover:text-foreground"
                    onClick={() => onRemoveUser(user.id)}
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex shrink-0 items-center gap-2">
          <Select value={role} onValueChange={(v) => onRoleChange(v as Role)}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={onSendInvites} disabled={isSending}>
            {isSending ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
            Invite
          </Button>
        </div>
      </div>
    </SheetFooter>
  );
}
