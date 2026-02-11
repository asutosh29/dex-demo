import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { InboxProvider, useInboxContext } from "./inbox-context";
import { InboxHeader } from "./inbox-header";
import { InboxList } from "./inbox-list";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { Inbox } from "@repo/ui/icons";

function InboxPopover() {
  const { state, actions, meta } = useInboxContext();
  const { unreadCount } = meta;
  const ariaLabel = unreadCount > 0 ? `Inbox, ${unreadCount} unread` : "Inbox";
  const displayCount = unreadCount > 99 ? "99+" : unreadCount;

  return (
    <Popover open={state.isOpen} onOpenChange={actions.setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={ariaLabel}
          className="relative size-8"
        >
          <Inbox className="size-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 size-4 flex items-center justify-center p-0 text-xs">
              {displayCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 overflow-hidden" align="end">
        <InboxHeader />
        <InboxList />
      </PopoverContent>
    </Popover>
  );
}

export function InboxButton() {
  return (
    <InboxProvider>
      <InboxPopover />
    </InboxProvider>
  );
}
