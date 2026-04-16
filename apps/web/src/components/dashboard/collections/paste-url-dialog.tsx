import { useCallback, useEffect, useRef, useState } from "react";
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
    actions: { refetch },
  } = useCollection();

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedSubCollection, setSelectedSubCollection] = useState<
    string | null
  >(null);

  const isSubCollection = !!collection?.parentId;
  const parentIdForSubQuery = collection?.parentId ?? collection?.id;

  const { data: subCollections } = trpc.collections.getSubCollections.useQuery(
    { parentId: parentIdForSubQuery as string },
    { enabled: !!parentIdForSubQuery },
  );

  const utils = trpc.useUtils();
  const { mutate: createItem } = trpc.items.create.useMutation();

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
            (isSubCollection ? (collection?.id ?? null) : null),
        );
        setOpen(true);
      }
    },
    [activeSubCollection, isSubCollection, collection?.id],
  );

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  const handleToggleSub = useCallback((id: string) => {
    setSelectedSubCollection((prev) => (prev === id ? null : id));
  }, []);

  const targetCollectionId = selectedSubCollection ?? collectionId;
  const targetName =
    selectedSubCollection && subCollections
      ? subCollections.find((s) => s.id === selectedSubCollection)?.title
      : collection?.title;

  const handleSubmit = useCallback(() => {
    const trimmed = url.trim();
    if (!trimmed) return;

    const target = targetCollectionId;
    const subId = selectedSubCollection;

    setOpen(false);
    setUrl("");
    setSelectedSubCollection(null);

    toast.promise(
      new Promise<void>((resolve, reject) => {
        createItem(
          { url: trimmed, collectionId: target },
          {
            onSuccess: async () => {
              await refetch();
              await utils.collections.getUserCollections.invalidate();
              if (subId) {
                await utils.collections.get.invalidate({ id: subId });
              }
              resolve();
            },
            onError: (error) => reject(error),
          },
        );
      }),
      {
        loading: "Adding item...",
        success: "Item added successfully!",
        error: (err: Error) =>
          err?.message ? `Failed: ${err.message}` : "Failed to add item.",
      },
    );
  }, [
    url,
    targetCollectionId,
    selectedSubCollection,
    createItem,
    refetch,
    utils,
  ]);

  const subCollectionsScrollRef = useRef<HTMLDivElement>(null);
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

  useEffect(() => {
    if (!open) return;
    const element = subCollectionsScrollRef.current;
    if (!element) return;

    const checkOverflow = () => {
      setHasHorizontalOverflow(element.scrollWidth > element.clientWidth);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [subCollections, open]);

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
        <DialogHeader className="sr-only">
          <DialogTitle>Add Link</DialogTitle>
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
        {subCollections && subCollections.length > 0 && (
          <div className="space-y-2 w-full min-w-0">
            <p className="text-xs text-muted-foreground font-medium">Add to:</p>
            <div
              ref={subCollectionsScrollRef}
              className={cn(
                "flex gap-2 overflow-auto no-scrollbar w-full min-w-0",
                hasHorizontalOverflow &&
                  "mask-[linear-gradient(to_right,black_90%,transparent_100%)] pr-6",
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
        )}

        {/* Actions */}
        <DialogFooter className="flex-row gap-3 sm:justify-between">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="flex-1 gap-2"
          >
            Cancel
            <Kbd>Esc</Kbd>
          </Button>
          <Button
            ref={addButtonRef}
            onClick={handleSubmit}
            disabled={!url.trim()}
            className="flex-1 gap-2"
          >
            <Plus /> {targetName ? `#${targetName}` : "collection"}
            <Kbd className="bg-muted/50 text-foreground">⏎</Kbd>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
