import { useParams } from "react-router-dom";
import { type Role } from "@repo/server/rbac/helpers";
import { MemberManagementProvider } from "./member-management-context";
import { ManageMembersDialog } from "./manage-members-dialog";

export function ManageMembers({ role }: { role: Role | undefined }) {
  const { collectionId } = useParams();

  if (!role || !collectionId) return null;

  return (
    <MemberManagementProvider
      collectionId={collectionId}
      currentUserRole={role}
    >
      <ManageMembersDialog />
    </MemberManagementProvider>
  );
}
