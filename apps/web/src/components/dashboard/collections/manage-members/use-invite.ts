import { useState } from "react";
import { useDebounce } from "@repo/ui/hooks/use-debounce";
import { toast } from "@repo/ui/components/ui/sonner";
import { trpc } from "~/lib/trpc";
import { useMemberManagement } from "./member-management-context";
import type { Role } from "@repo/server/rbac/helpers";

export type SelectedUser = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
};

export function useInvite() {
  const { state, meta } = useMemberManagement();

  const [query, setQuery] = useState("");
  const [role, setRole] = useState<Role>("member");
  const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  const { data: searchResults, isLoading: isSearching } =
    trpc.users.search.useQuery(
      { query: debouncedQuery },
      { enabled: debouncedQuery.length > 0 },
    );

  const bulkInviteMutation = trpc.invitations.bulkCreate.useMutation();

  const existingMemberIds = new Set(state.members?.map((m) => m.userId) || []);
  const selectedIds = new Set(selectedUsers.map((u) => u.id));

  const filteredMembers = query
    ? state.members.filter((m) => {
        const q = query.toLowerCase();
        return (
          m.user?.name?.toLowerCase().includes(q) ||
          m.user?.email?.toLowerCase().includes(q)
        );
      })
    : state.members;

  const nonMemberResults =
    searchResults?.filter((u) => !existingMemberIds.has(u.id)) ?? [];

  const allNonMembersSelected =
    nonMemberResults.length > 0 &&
    nonMemberResults.every((u) => selectedIds.has(u.id));

  function toggleUser(user: SelectedUser) {
    setSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user],
    );
  }

  function removeUser(userId: string) {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== userId));
  }

  function toggleSelectAll() {
    if (allNonMembersSelected) {
      const visibleIds = new Set(nonMemberResults.map((u) => u.id));
      setSelectedUsers((prev) => prev.filter((u) => !visibleIds.has(u.id)));
    } else {
      setSelectedUsers((prev) => {
        const existing = new Set(prev.map((u) => u.id));
        const newUsers = nonMemberResults.filter((u) => !existing.has(u.id));
        return [...prev, ...newUsers];
      });
    }
  }

  async function sendInvites() {
    if (selectedUsers.length === 0 || isSending) return;
    setIsSending(true);

    try {
      const result = await bulkInviteMutation.mutateAsync({
        collectionId: meta.collectionId,
        invitees: selectedUsers.map((u) => ({ userId: u.id, role })),
      });

      if (result.failed.length === 0) {
        toast.success(
          `Invited ${selectedUsers.length} user${selectedUsers.length > 1 ? "s" : ""}`,
        );
        setSelectedUsers([]);
        setQuery("");
      } else {
        const succeeded = result.succeeded.length;
        if (succeeded > 0) {
          toast.success(`Invited ${succeeded} user${succeeded > 1 ? "s" : ""}`);
        }
        const failedNames = result.failed.map((f) => {
          const u = selectedUsers.find((su) => su.id === f.userId);
          return u?.name || u?.email;
        });
        toast.error(`Failed to invite: ${failedNames.join(", ")}`);
        const failedIds = new Set(result.failed.map((f) => f.userId));
        setSelectedUsers((prev) => prev.filter((u) => failedIds.has(u.id)));
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }

    setIsSending(false);
  }

  function reset() {
    setSelectedUsers([]);
    setQuery("");
    setRole("member");
    setReviewOpen(false);
  }

  return {
    // search
    query,
    setQuery,
    debouncedQuery,
    isSearching,
    filteredMembers,
    nonMemberResults,
    allNonMembersSelected,
    // selection
    selectedUsers,
    selectedIds,
    toggleUser,
    removeUser,
    toggleSelectAll,
    // invite
    role,
    setRole,
    isSending,
    sendInvites,
    // review popover
    reviewOpen,
    setReviewOpen,
    // utils
    reset,
  };
}
