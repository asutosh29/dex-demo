import { createContext, use, type ReactNode } from "react";
import { trpc, type RouterOutputs } from "~/lib/trpc";
import { authClient } from "~/lib/auth-client";
import { canManageMembers, type Role } from "@repo/server/rbac/helpers";

type Member = RouterOutputs["collectionAccess"]["getMembers"][number];

// Generic context interface: state, actions, meta
interface MemberManagementState {
  members: Member[];
  isLoading: boolean;
  currentUserRole: Role;
  currentUserId: string | undefined;
}

interface MemberManagementActions {
  invalidateMembers: () => void;
}

interface MemberManagementMeta {
  collectionId: string;
  canManage: boolean; // derived from role
}

interface MemberManagementContextValue {
  state: MemberManagementState;
  actions: MemberManagementActions;
  meta: MemberManagementMeta;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MemberManagementContext =
  createContext<MemberManagementContextValue | null>(null);

export function MemberManagementProvider({
  collectionId,
  currentUserRole,
  children,
}: {
  collectionId: string;
  currentUserRole: Role;
  children: ReactNode;
}) {
  const { data: session } = authClient.useSession();
  const utils = trpc.useUtils();
  const { data: members, isLoading } =
    trpc.collectionAccess.getMembers.useQuery({ collectionId });

  return (
    <MemberManagementContext
      value={{
        state: {
          members: members ?? [],
          isLoading,
          currentUserRole,
          currentUserId: session?.user?.id,
        },
        actions: {
          invalidateMembers: () =>
            utils.collectionAccess.getMembers.invalidate({ collectionId }),
        },
        meta: {
          collectionId,
          canManage: canManageMembers(currentUserRole),
        },
      }}
    >
      {children}
    </MemberManagementContext>
  );
}

// Convenience hook
// eslint-disable-next-line react-refresh/only-export-components
export function useMemberManagement() {
  const ctx = use(MemberManagementContext);
  if (!ctx)
    throw new Error(
      "useMemberManagement must be used within MemberManagementProvider",
    );
  return ctx;
}
