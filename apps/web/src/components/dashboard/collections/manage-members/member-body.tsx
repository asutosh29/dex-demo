import { useCallback, useEffect, useRef, useState } from "react";
import { Separator } from "@repo/ui/components/ui/separator";
import { Loader2 } from "@repo/ui/icons";
import { MemberListItem } from "./member-list-item";
import { SelectableUserRow } from "./selectable-user-row";
import type { RouterOutputs } from "~/lib/trpc";
import type { SelectedUser } from "./use-invite";

type Member = RouterOutputs["collectionAccess"]["getMembers"][number];
type SearchUser = SelectedUser;

interface MemberBodyProps {
  isLoading: boolean;
  hasQuery: boolean;
  debouncedQuery: string;
  // Default view
  members: Member[];
  // Search view
  filteredMembers: Member[];
  nonMemberResults: SearchUser[];
  isSearching: boolean;
  selectedIds: Set<string>;
  allNonMembersSelected: boolean;
  onToggleUser: (user: SelectedUser) => void;
  onToggleSelectAll: () => void;
}

export function MemberBody({
  isLoading,
  hasQuery,
  debouncedQuery,
  members,
  filteredMembers,
  nonMemberResults,
  isSearching,
  selectedIds,
  allNonMembersSelected,
  onToggleUser,
  onToggleSelectAll,
}: MemberBodyProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  }, []);

  useEffect(() => {
    checkScroll();
  }, [
    isLoading,
    hasQuery,
    members,
    filteredMembers,
    nonMemberResults,
    checkScroll,
  ]);

  return (
    <div
      ref={scrollRef}
      onScroll={checkScroll}
      className={`flex-1 min-h-0 px-4 py-4 overflow-y-auto no-scrollbar transition-[mask-image] duration-200 ${
        canScrollDown
          ? "mask-[linear-gradient(to_bottom,black_calc(100%-4rem),transparent)]"
          : ""
      }`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : !hasQuery ? (
        <DefaultView members={members} />
      ) : (
        <SearchView
          filteredMembers={filteredMembers}
          nonMemberResults={nonMemberResults}
          isSearching={isSearching}
          selectedIds={selectedIds}
          allNonMembersSelected={allNonMembersSelected}
          debouncedQuery={debouncedQuery}
          onToggleUser={onToggleUser}
          onToggleSelectAll={onToggleSelectAll}
        />
      )}
    </div>
  );
}

function DefaultView({ members }: { members: Member[] }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {members.length} member{members.length !== 1 ? "s" : ""}
      </p>
      {members.map((member) => (
        <MemberListItem key={member.userId} member={member} />
      ))}
    </div>
  );
}

interface SearchViewProps {
  filteredMembers: Member[];
  nonMemberResults: SearchUser[];
  isSearching: boolean;
  selectedIds: Set<string>;
  allNonMembersSelected: boolean;
  debouncedQuery: string;
  onToggleUser: (user: SelectedUser) => void;
  onToggleSelectAll: () => void;
}

function SearchView({
  filteredMembers,
  nonMemberResults,
  isSearching,
  selectedIds,
  allNonMembersSelected,
  debouncedQuery,
  onToggleUser,
  onToggleSelectAll,
}: SearchViewProps) {
  const noResults =
    !isSearching &&
    filteredMembers.length === 0 &&
    nonMemberResults.length === 0 &&
    debouncedQuery.length > 0;

  return (
    <div className="space-y-4">
      {filteredMembers.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            In collection &middot; {filteredMembers.length}
          </p>
          {filteredMembers.map((member) => (
            <MemberListItem key={member.userId} member={member} />
          ))}
        </div>
      )}

      {(isSearching || nonMemberResults.length > 0) && (
        <div className="space-y-2">
          <Separator />
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Not in collection &middot;{" "}
              {isSearching ? "..." : nonMemberResults.length}
            </p>
            {nonMemberResults.length > 0 && (
              <button
                type="button"
                onClick={onToggleSelectAll}
                className="text-xs font-medium text-primary hover:underline"
              >
                {allNonMembersSelected ? "Deselect all" : "Select all"}
              </button>
            )}
          </div>

          {isSearching ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            nonMemberResults.map((user) => (
              <SelectableUserRow
                key={user.id}
                user={user}
                isSelected={selectedIds.has(user.id)}
                onToggle={onToggleUser}
              />
            ))
          )}
        </div>
      )}

      {noResults && (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No users found
        </p>
      )}
    </div>
  );
}
