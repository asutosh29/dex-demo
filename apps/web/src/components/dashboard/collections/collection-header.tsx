import { Hash } from "@repo/ui/icons";
import { EditableField } from "@repo/ui/components/ui/editable-field";
import { ManageMembers } from "./manage-members";
import { CollectionActionsDropdown } from "./collection-actions-dropdown";
import { useCollection } from "./collection-context";
import { trpc } from "~/lib/trpc";
import { canUpdateCollection, type Role } from "@repo/server/rbac/helpers";
import { useUserCollections } from "~/lib/hooks/use-user-collections";
import { Link } from "react-router-dom";

export function CollectionHeader() {
  const {
    state: { collection },
    meta: { collectionId },
    actions: { refetch },
  } = useCollection();

  const utils = trpc.useUtils();
  const { data: userCollections } = useUserCollections();
  const parentCollection = collection?.parentId
    ? userCollections?.find((c) => c.id === collection.parentId)
    : null;

  const { mutate: updateCollectionTitle } = trpc.collections.update.useMutation(
    {
      onSuccess: async () => {
        if (parentCollection) {
          await utils.collections.getSubCollections.invalidate({
            parentId: parentCollection.id,
          });
        } else {
          await utils.collections.getUserCollections.invalidate();
        }
        refetch();
      },
    },
  );

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
        onSave={(value) => {
          updateCollectionTitle({
            id: collectionId,
            title: value as string,
          });
        }}
      >
        {(value) => (
          <h1 className="font-display text-3xl inline-flex items-baseline gap-2">
            {parentCollection && (
              <>
                <Link
                  to={`/dashboard/${parentCollection.id}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {parentCollection.title}
                </Link>
                <span className="text-muted-foreground">/</span>
              </>
            )}
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
