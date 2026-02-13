import { Hash } from "@repo/ui/icons";
import { EditableField } from "@repo/ui/components/ui/editable-field";
import { ManageMembers } from "./manage-members";
import { CollectionActionsDropdown } from "./collection-actions-dropdown";
import { useCollection } from "./collection-context";
import { trpc } from "~/lib/trpc";
import { canUpdateCollection, type Role } from "@repo/server/rbac/helpers";

export function CollectionHeader() {
  const {
    state: { collection },
    meta: { collectionId },
    actions: { refetch },
  } = useCollection();

  const utils = trpc.useUtils();

  if (!collection) return null;

  return (
    <div className="flex items-center justify-between gap-2">
      <EditableField
        type="text"
        value={collection.title}
        className="w-1/2"
        disabled={!canUpdateCollection(collection.role as Role)}
        inputClassName="font-display text-3xl"
        actions="none"
        onSave={async (value) => {
          await utils.client.collections.update.mutate({
            id: collectionId,
            title: value as string,
          });
          await refetch();
          await utils.collections.getUserCollections.invalidate();
        }}
      >
        {(value) => (
          <h1 className="font-display text-3xl inline-flex items-baseline gap-2">
            <Hash className="size-5" />
            <span className="max-w-[16ch] truncate">{value}</span>
          </h1>
        )}
      </EditableField>

      <div className="flex items-center gap-2">
        <ManageMembers role={collection.role} />
        <CollectionActionsDropdown
          collectionId={collectionId}
          currentTitle={collection.title}
          role={collection.role}
        />
      </div>
    </div>
  );
}
