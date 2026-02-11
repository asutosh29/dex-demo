import { memo } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { cn } from "@repo/ui/lib/utils";
import {
  Mail,
  Shield,
  Users,
  UserMinus,
  Crown,
  Loader2,
  Check,
  X,
} from "@repo/ui/icons";
import { useInboxContext } from "./inbox-context";
import type { RouterOutputs } from "~/lib/trpc";

type Notification =
  RouterOutputs["notifications"]["getUnifiedFeed"]["unread"][number];
type ActivityType = NonNullable<Notification["activity"]>["type"];

interface NotificationItemProps {
  notification: Notification;
  variant: "unread" | "read";
  isPending: "accept" | "reject" | null;
}

export const NotificationItem = memo(function NotificationItem({
  notification,
  variant,
  isPending,
}: NotificationItemProps) {
  const { actions } = useInboxContext();
  const activity = notification.activity;

  if (!activity) return null;

  const isUnread = variant === "unread";

  const handleClick = () => {
    if (isUnread && activity.type !== "invitation_sent") {
      actions.markAsRead(notification.id);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      className={cn(
        "group px-2 py-3 border-b transition-colors cursor-pointer",
        isUnread ? "bg-muted/20 hover:bg-muted/40" : "hover:bg-muted/30",
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <div className="flex gap-3 items-start">
        <NotificationIcon type={activity.type} />

        <div className="flex-1 min-w-0">
          <NotificationContent
            activity={activity}
            isPending={isPending}
            isUnread={isUnread}
          />

          <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
        </div>

        {/* Unread indicator dot */}
        {isUnread && (
          <div className="size-2 rounded-full bg-primary shrink-0 mt-2" />
        )}
      </div>
    </div>
  );
});

const NotificationContent = memo(function NotificationContent({
  activity,
  isPending,
  isUnread,
}: {
  activity: Notification["activity"];
  isPending: "accept" | "reject" | null;
  isUnread: boolean;
}) {
  const { actions } = useInboxContext();
  if (!activity) return null;

  const data = activity.data as Record<string, string>;
  const collectionTitle = activity.collection?.title ?? "Unknown Collection";
  const actorName = activity.actor?.name ?? "Someone";

  switch (activity.type) {
    case "invitation_sent":
      return (
        <InvitationContent
          actorName={actorName}
          collectionTitle={collectionTitle}
          role={data.role}
          invitationId={data.invitationId}
          isPending={isPending}
          isUnread={isUnread}
          onAccept={actions.acceptInvitation}
          onReject={actions.rejectInvitation}
        />
      );

    case "invitation_accepted":
      return (
        <p className="text-sm line-clamp-3">
          <span className="font-medium">{data.inviteeName}</span>
          {" joined "}
          <span className="font-medium inline-flex"># {collectionTitle}</span>
          {" as "}
          <Badge variant="outline" className="text-xs capitalize">
            {data.role}
          </Badge>
        </p>
      );

    case "invitation_rejected":
      return (
        <p className="text-sm line-clamp-3">
          <span className="font-medium">{data.inviteeName}</span>
          {" declined the invitation to "}
          <span className="font-medium inline-flex"># {collectionTitle}</span>
        </p>
      );

    case "member_removed":
      return (
        <p className="text-sm line-clamp-3">
          You were removed from{" "}
          <span className="font-medium inline-flex"># {collectionTitle}</span>
          {" by "}
          {actorName}
        </p>
      );

    case "role_changed":
      return (
        <p className="text-sm line-clamp-3">
          Your role in{" "}
          <span className="font-medium inline-flex"># {collectionTitle}</span>
          {" was changed from "}
          <Badge variant="outline" className="text-xs capitalize">
            {data.oldRole}
          </Badge>
          {" to "}
          <Badge variant="outline" className="text-xs capitalize">
            {data.newRole}
          </Badge>
          {" by "}
          {actorName}
        </p>
      );

    case "ownership_transferred":
      return (
        <p className="text-sm line-clamp-3">
          Ownership of{" "}
          <span className="font-medium inline-flex"># {collectionTitle}</span>
          {" was transferred from "}
          <span className="font-medium">{data.previousOwnerName}</span>
          {" to "}
          <span className="font-medium">{data.newOwnerName}</span>
        </p>
      );

    default:
      return null;
  }
});

const InvitationContent = memo(function InvitationContent({
  actorName,
  collectionTitle,
  role,
  invitationId,
  isPending,
  isUnread,
  onAccept,
  onReject,
}: {
  actorName: string;
  collectionTitle: string;
  role: string;
  invitationId: string;
  isPending: "accept" | "reject" | null;
  isUnread: boolean;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const isAcceptPending = isPending === "accept";
  const isRejectPending = isPending === "reject";

  return (
    <div>
      <p className="text-sm line-clamp-3">
        <span className="font-medium">{actorName}</span>
        {" invited you to join "}
        <span className="font-medium inline-flex"># {collectionTitle}</span>
        {" as "}
        <Badge variant="outline" className="ml-1 text-xs capitalize">
          {role}
        </Badge>
      </p>
      {isUnread && (
        <div className="flex gap-2 mt-2">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAccept(invitationId);
            }}
            disabled={!!isPending}
          >
            {isAcceptPending ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <Check className="size-4" />
            )}
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onReject(invitationId);
            }}
            disabled={!!isPending}
          >
            {isRejectPending ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <X className="size-4" />
            )}
            Decline
          </Button>
        </div>
      )}
    </div>
  );
});

function NotificationIcon({ type }: { type: ActivityType }) {
  const iconMap: Record<ActivityType, typeof Users> = {
    invitation_sent: Mail,
    invitation_accepted: Users,
    invitation_rejected: Users,
    member_removed: UserMinus,
    role_changed: Shield,
    ownership_transferred: Crown,
  };
  const Icon = iconMap[type] || Mail;

  return (
    <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0">
      <Icon className="size-4 text-muted-foreground" />
    </div>
  );
}
