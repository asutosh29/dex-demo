"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { trpc, type RouterOutputs } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";

type UnifiedFeedData = RouterOutputs["notifications"]["getUnifiedFeed"];

interface InboxState {
  isOpen: boolean;
  pendingInvitationId: string | null;
  pendingAction: "accept" | "reject" | null;
}

interface InboxActions {
  setIsOpen: (open: boolean) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  acceptInvitation: (invitationId: string) => void;
  rejectInvitation: (invitationId: string) => void;
}

interface InboxMeta {
  unreadCount: number;
  isLoading: boolean;
}

interface InboxContextValue {
  state: InboxState;
  actions: InboxActions;
  meta: InboxMeta;
  data: UnifiedFeedData | undefined;
}

const InboxContext = createContext<InboxContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useInboxContext() {
  const context = useContext(InboxContext);
  if (!context) {
    throw new Error("Inbox components must be used within InboxProvider");
  }
  return context;
}

interface InboxProviderProps {
  children: ReactNode;
}

export function InboxProvider({ children }: InboxProviderProps) {
  const [state, setState] = useState<InboxState>({
    isOpen: false,
    pendingInvitationId: null,
    pendingAction: null,
  });

  const utils = trpc.useUtils();

  const { data: unreadCount = 0 } = trpc.notifications.getUnreadCount.useQuery(
    undefined,
    {
      refetchInterval: 30000, // Poll every 30 seconds for notifs
      staleTime: 15000,
      refetchOnWindowFocus: true,
    },
  );

  const { data, isLoading } = trpc.notifications.getUnifiedFeed.useQuery(
    { readLimit: 10 },
    {
      enabled: state.isOpen,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  );

  const markAsReadMutation = trpc.notifications.markAsRead.useMutation({
    onSuccess: () => {
      utils.notifications.getUnifiedFeed.invalidate();
      utils.notifications.getUnreadCount.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to mark as read");
    },
  });

  const markAllAsReadMutation = trpc.notifications.markAllAsRead.useMutation({
    onSuccess: () => {
      utils.notifications.getUnifiedFeed.invalidate();
      utils.notifications.getUnreadCount.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to mark notifications as read");
    },
  });

  const acceptMutation = trpc.invitations.accept.useMutation({
    onSuccess: () => {
      setState((s) => ({
        ...s,
        pendingInvitationId: null,
        pendingAction: null,
      }));
      utils.notifications.getUnifiedFeed.invalidate();
      utils.notifications.getUnreadCount.invalidate();
      utils.collections.getUserCollections.invalidate();
      toast.success("Invitation accepted!");
    },
    onError: (error) => {
      setState((s) => ({
        ...s,
        pendingInvitationId: null,
        pendingAction: null,
      }));
      toast.error(error.message || "Failed to accept invitation");
    },
  });

  const rejectMutation = trpc.invitations.reject.useMutation({
    onSuccess: () => {
      setState((s) => ({
        ...s,
        pendingInvitationId: null,
        pendingAction: null,
      }));
      utils.notifications.getUnifiedFeed.invalidate();
      utils.notifications.getUnreadCount.invalidate();
      toast.success("Invitation declined");
    },
    onError: (error) => {
      setState((s) => ({
        ...s,
        pendingInvitationId: null,
        pendingAction: null,
      }));
      toast.error(error.message || "Failed to reject invitation");
    },
  });

  const actions: InboxActions = useMemo(
    () => ({
      setIsOpen: (open: boolean) => {
        setState((s) => ({ ...s, isOpen: open }));
      },
      markAsRead: (notificationId: string) => {
        markAsReadMutation.mutate({ notificationId });
      },
      markAllAsRead: () => {
        markAllAsReadMutation.mutate();
      },
      acceptInvitation: (invitationId: string) => {
        setState((s) => ({
          ...s,
          pendingInvitationId: invitationId,
          pendingAction: "accept",
        }));
        acceptMutation.mutate({ invitationId });
      },
      rejectInvitation: (invitationId: string) => {
        setState((s) => ({
          ...s,
          pendingInvitationId: invitationId,
          pendingAction: "reject",
        }));
        rejectMutation.mutate({ invitationId });
      },
    }),
    [markAsReadMutation, markAllAsReadMutation, acceptMutation, rejectMutation],
  );

  const meta: InboxMeta = {
    unreadCount,
    isLoading,
  };

  const contextValue: InboxContextValue = {
    state,
    actions,
    meta,
    data,
  };

  return (
    <InboxContext.Provider value={contextValue}>
      {children}
    </InboxContext.Provider>
  );
}
