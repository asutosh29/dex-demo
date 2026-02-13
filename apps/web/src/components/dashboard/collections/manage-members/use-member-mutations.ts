import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";
import { useMemberManagement } from "./member-management-context";
import type { RouterOutputs } from "~/lib/trpc";

type Member = RouterOutputs["collectionAccess"]["getMembers"][number];

export function useMemberMutations() {
  const { actions, meta } = useMemberManagement();
  const { collectionId } = meta;
  const utils = trpc.useUtils();

  const promoteMutation =
    trpc.collectionAccess.promoteMemberToAdmin.useMutation({
      onSuccess: () => {
        actions.invalidateMembers();
        toast.success("Promoted member to admin");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const demoteMutation = trpc.collectionAccess.demoteAdminToMember.useMutation({
    onSuccess: () => {
      actions.invalidateMembers();
      toast.success("Demoted member");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const removeMutation = trpc.collectionAccess.removeMember.useMutation({
    onSuccess: () => {
      actions.invalidateMembers();
      toast.success("Removed member from collection");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const transferMutation = trpc.collectionAccess.transferOwnership.useMutation({
    onSuccess: () => {
      actions.invalidateMembers();
      utils.collections.get.invalidate({ id: collectionId });
      toast.success("Transferred ownership");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const leaveMutation = trpc.collectionAccess.leaveCollection.useMutation({
    onSuccess: () => {
      utils.collections.getUserCollections.invalidate();
      toast.success("Left collection");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    promote: (userId: string) =>
      promoteMutation.mutate({ collectionId, userId }),
    demote: (userId: string) => demoteMutation.mutate({ collectionId, userId }),
    remove: (userId: string) => removeMutation.mutate({ collectionId, userId }),
    transferOwnership: (newOwnerId: string, member: Member) => {
      if (
        confirm(
          `Transfer ownership to ${member.user?.name || "this member"}? You will become an admin.`,
        )
      ) {
        transferMutation.mutate({ collectionId, newOwnerId });
      }
    },
    leave: () => leaveMutation.mutate({ collectionId }),
  };
}
