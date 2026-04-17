import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { FaviconSearch } from "@repo/ui/components/ui/favicon-search";
import { Kbd } from "@repo/ui/components/ui/kbd";
import { Hash, Check, Plus } from "@repo/ui/icons";
import { toast } from "@repo/ui/components/ui/sonner";
import { cn } from "@repo/ui/lib/utils";
import { trpc, type RouterOutputs } from "~/lib/trpc";
import { useUserCollections } from "~/lib/hooks/use-user-collections";
import { useCollection } from "./collection-context";

type SubCollection = RouterOutputs["collections"]["getSubCollections"][number];

function isUrl(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;
  // Quick check: contains a dot and no spaces
  if (trimmed.includes(" ") || !trimmed.includes(".")) return false;
  try {
    const raw = trimmed.includes("://") ? trimmed : `https://${trimmed}`;
    new URL(raw);
    return true;
  } catch {
    return false;
  }
}

function SubCollectionPill({
  sub,
  isSelected,
  onToggle,
}: {
  sub: SubCollection;
  isSelected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(sub.id)}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0",
        isSelected
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-muted/80",
      )}
    >
      {isSelected ? (
        <Check className="size-3.5" />
      ) : (
        <Hash className="size-3.5" />
      )}
      {sub.title}
    </button>
  );
}

export function PasteUrlDialog() {
  const {
    meta: { collectionId },
    state: { collection, activeSubCollection },
  } = useCollection();

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedSubCollection, setSelectedSubCollection] = useState<
    string | null
  >(null);

  const parentIdForSubQuery = collection?.parentId ?? collection?.id ?? null;

  const { data: subCollectionsData } =
    trpc.collections.getSubCollections.useQuery(
      { parentId: parentIdForSubQuery ?? "" },
      { enabled: Boolean(parentIdForSubQuery) },
    );

  const subCollections = useMemo(
    () => subCollectionsData ?? [],
    [subCollectionsData],
  );

  const subCollectionsById = useMemo(
    () => new Map(subCollections.map((sub) => [sub.id, sub])),
    [subCollections],
  );

  const utils = trpc.useUtils();
  const { mutateAsync: createItem } = trpc.items.create.useMutation();
  const { data: userCollections } = useUserCollections();

  const parentCollection = collection?.parentId
    ? (userCollections?.find((c) => c.id === collection.parentId) ?? null)
    : null;

  const selection = useMemo(() => {
    const selectedSub = selectedSubCollection
      ? (subCollectionsById.get(selectedSubCollection) ?? null)
      : null;

    const rootTitle =
      parentCollection?.title ?? collection?.title ?? "Select collection";

    if (selectedSub) {
      return {
        targetCollectionId: selectedSub.id,
        targetCollectionTitle: selectedSub.title,
        dialogTitle: `${rootTitle} / ${selectedSub.title}`,
        selectedSubId: selectedSub.id,
      };
    }

    return {
      targetCollectionId: collection?.parentId ?? collectionId,
      targetCollectionTitle: rootTitle,
      dialogTitle: rootTitle,
      selectedSubId: null,
    };
  }, [
    selectedSubCollection,
    subCollectionsById,
    parentCollection?.title,
    collection?.title,
    collection?.parentId,
    collectionId,
  ]);

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      // Don't intercept paste inside inputs/textareas
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const text = e.clipboardData?.getData("text/plain") ?? "";
      if (isUrl(text)) {
        e.preventDefault();
        setUrl(text.trim());
        setSelectedSubCollection(
          activeSubCollection ??
            (collection?.parentId ? (collection?.id ?? null) : null),
        );
        setOpen(true);
      }
    },
    [activeSubCollection, collection?.parentId, collection?.id],
  );

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  const handleToggleSub = useCallback((id: string) => {
    setSelectedSubCollection((prev) => (prev === id ? null : id));
  }, []);

  const handleSubmit = useCallback(() => {
    const trimmed = url.trim();
    if (!trimmed) return;

    setOpen(false);
    setUrl("");
    setSelectedSubCollection(null);

    toast.promise(
      (async () => {
        await createItem({
          url: trimmed,
          collectionId: selection.targetCollectionId,
        });

        await utils.collections.getUserCollections.invalidate();
        if (selection.selectedSubId) {
          await utils.collections.get.invalidate({
            id: selection.selectedSubId,
          });
        }
      })(),
      {
        loading: "Adding item...",
        success: "Item added successfully!",
        error: (err: Error) =>
          err?.message ? `Failed: ${err.message}` : "Failed to add item.",
      },
    );
  }, [
    url,
    createItem,
    selection.targetCollectionId,
    selection.selectedSubId,
    utils,
  ]);

  const addButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md gap-5"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          addButtonRef.current?.focus();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
            const target = e.target as HTMLElement;
            if (
              target.tagName === "INPUT" ||
              target.tagName === "TEXTAREA" ||
              target.tagName === "BUTTON"
            ) {
              return;
            }
            e.preventDefault();
            handleSubmit();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle className="font-display font-normal inline-flex items-center gap-2">
            <Hash className="size-4" /> {selection.dialogTitle}
          </DialogTitle>
        </DialogHeader>

        {/* URL input */}
        <FaviconSearch
          value={url}
          onChange={setUrl}
          onSearch={handleSubmit}
          placeholder="Paste or type a URL..."
          className="max-w-full"
        />

        {/* Sub-collection selection */}
        {subCollections.length > 0 ? (
          <div className="space-y-2 w-full min-w-0">
            <div
              className={cn(
                "flex gap-2 overflow-auto no-scrollbar w-full min-w-0",
              )}
            >
              {subCollections.map((sub) => (
                <SubCollectionPill
                  key={sub.id}
                  sub={sub}
                  isSelected={selectedSubCollection === sub.id}
                  onToggle={handleToggleSub}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* Actions */}
        <DialogFooter className="flex-row gap-3 sm:justify-between">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
            <Kbd>Esc</Kbd>
          </Button>
          <Button
            ref={addButtonRef}
            onClick={handleSubmit}
            disabled={!url.trim()}
            className="flex-1 gap-2"
          >
            <Plus />
            {selection.targetCollectionTitle
              ? `#${selection.targetCollectionTitle}`
              : "collection"}
            <Kbd className="bg-muted/50 text-foreground">⏎</Kbd>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
