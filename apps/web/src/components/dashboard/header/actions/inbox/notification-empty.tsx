import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@repo/ui/components/ui/empty";
import { Inbox } from "@repo/ui/icons";

export function NotificationEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle className="text-base">No notifications</EmptyTitle>
        <EmptyDescription className="text-xs">
          You're all caught up!
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
