import { Loader2 } from "@repo/ui/icons";
import { MemberListItem } from "./member-list-item";
import { useMemberManagement } from "./member-management-context";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";

export function MemberList() {
  const { state } = useMemberManagement();
  const { members, isLoading } = state;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        {members.length} member{members.length !== 1 ? "s" : ""}
      </p>

      <ScrollArea className="max-h-64 rounded-md">
        {members.map((member) => (
          <MemberListItem key={member.userId} member={member} />
        ))}
      </ScrollArea>
    </div>
  );
}
