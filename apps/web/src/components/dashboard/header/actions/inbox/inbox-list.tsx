import { memo, useEffect, useRef } from "react";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { cn } from "@repo/ui/lib/utils";
import { useInboxContext } from "./inbox-context";
import { NotificationItem } from "./notification-item";
import { NotificationEmpty } from "./notification-empty";
import { NotificationSkeleton } from "./notification-skeleton";
import type { RouterOutputs } from "~/lib/trpc";

type Notification =
  RouterOutputs["notifications"]["getUnifiedFeed"]["unread"][number];

export const InboxList = memo(function InboxList() {
  const { meta, data, state, actions } = useInboxContext();
  const { isLoading } = meta;
  const { pendingInvitationId, pendingAction, isOpen } = state;
  const hasSeenRef = useRef(false);

  // Track when user has seen notifications
  useEffect(() => {
    if (isOpen && !isLoading && data?.unread && data.unread.length > 0) {
      hasSeenRef.current = true;
    }
  }, [isOpen, isLoading, data?.unread]);

  // Auto-mark all non-invitation notifications as read when inbox closes
  useEffect(() => {
    if (!isOpen && hasSeenRef.current) {
      actions.markAllAsRead();
      hasSeenRef.current = false;
    }
  }, [isOpen, actions]);

  const hasUnread = (data?.unread?.length ?? 0) > 0;
  const hasRead = (data?.read?.length ?? 0) > 0;
  const hasNotifications = hasUnread || hasRead;

  return (
    <ScrollArea
      className={cn(
        "max-h-80 [&>div]:rounded-none",
        hasNotifications ? "h-80" : "h-auto",
      )}
    >
      {isLoading && <NotificationSkeleton />}

      {!isLoading && !hasNotifications && <NotificationEmpty />}

      {data && hasUnread && (
        <UnreadSection
          notifications={data.unread}
          pendingInvitationId={pendingInvitationId}
          pendingAction={pendingAction}
        />
      )}

      {data && hasRead && (
        <ReadSection
          notifications={data.read}
          showDivider={hasUnread}
          pendingInvitationId={pendingInvitationId}
          pendingAction={pendingAction}
        />
      )}
    </ScrollArea>
  );
});

const UnreadSection = memo(function UnreadSection({
  notifications,
  pendingInvitationId,
  pendingAction,
}: {
  notifications: Notification[];
  pendingInvitationId: string | null;
  pendingAction: "accept" | "reject" | null;
}) {
  return (
    <>
      <div className="px-3 py-1 text-xs font-medium text-muted-foreground bg-muted/50 border-b">
        New
      </div>
      {notifications.map((notification) => {
        const invitationId = (
          notification.activity?.data as Record<string, unknown>
        )?.invitationId as string | undefined;
        const isInvitation = notification.activity?.type === "invitation_sent";
        const isPending = isInvitation && pendingInvitationId === invitationId;

        return (
          <NotificationItem
            key={notification.id}
            notification={notification}
            variant="unread"
            isPending={isPending ? pendingAction : null}
          />
        );
      })}
    </>
  );
});

const ReadSection = memo(function ReadSection({
  notifications,
  showDivider,
  pendingInvitationId,
  pendingAction,
}: {
  notifications: Notification[];
  showDivider: boolean;
  pendingInvitationId: string | null;
  pendingAction: "accept" | "reject" | null;
}) {
  return (
    <>
      {showDivider && (
        <div className="px-3 py-1 text-xs font-medium text-muted-foreground bg-muted/50 border-b">
          Earlier
        </div>
      )}
      {notifications.map((notification) => {
        const invitationId = (
          notification.activity?.data as Record<string, unknown>
        )?.invitationId as string | undefined;
        const isInvitation = notification.activity?.type === "invitation_sent";
        const isPending = isInvitation && pendingInvitationId === invitationId;

        return (
          <NotificationItem
            key={notification.id}
            notification={notification}
            variant="read"
            isPending={isPending ? pendingAction : null}
          />
        );
      })}
    </>
  );
});
