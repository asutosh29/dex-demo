import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { FaviconSearch } from "@repo/ui/components/ui/favicon-search";
import { Hash, Check } from "@repo/ui/icons";
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
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
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
    state: { collection },
    actions: { refetch },
  } = useCollection();

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedSubCollection, setSelectedSubCollection] = useState<
    string | null
  >(null);

  const isSubCollection = !!collection?.parentId;

  const { data: subCollections } = trpc.collections.getSubCollections.useQuery(
    { parentId: collection?.id as string },
    { enabled: !!collection && !isSubCollection },
  );

  const utils = trpc.useUtils();
  const { mutate: createItem, isPending } = trpc.items.create.useMutation();

  const handlePaste = useCallback((e: ClipboardEvent) => {
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
      setSelectedSubCollection(null);
      setOpen(true);
    }
  }, []);

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

  const handleSubmit = () => {
    if (!url.trim()) return;

    const loadingToast = toast.loading("Adding item...");

    createItem(
      { url: url.trim(), collectionId: targetCollectionId },
      {
        onSuccess: async () => {
          await refetch();
          await utils.collections.getUserCollections.invalidate();
          if (selectedSubCollection) {
            await utils.collections.get.invalidate({
              id: selectedSubCollection,
            });
          }
          toast.dismiss(loadingToast);
          toast.success("Item added successfully!");
          setOpen(false);
          setUrl("");
          setSelectedSubCollection(null);
        },
        onError: (error) => {
          toast.dismiss(loadingToast);
          toast.error("Failed to add item.", { description: error.message });
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false} className="sm:max-w-md gap-5">
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
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Add to:</p>
            <div className="flex flex-wrap gap-2">
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
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!url.trim() || isPending}
            className="flex-1"
          >
            {isPending
              ? "Adding..."
              : `+ Add to #${targetName ?? "collection"}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
