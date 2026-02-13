import { useState, useRef, useEffect } from "react";
import { BookmarkPlus, Loader } from "@repo/ui/icons";
import { Input } from "@repo/ui/components/ui/input";
import { Kbd } from "@repo/ui/components/ui/kbd";
import { toast } from "@repo/ui/components/ui/sonner";
import { cn } from "@repo/ui/lib/utils";
import { useCollection } from "./collection-context";
import { trpc } from "~/lib/trpc";

export function CollectionAddItemForm() {
  const {
    meta: { collectionId },
    actions: { refetch },
  } = useCollection();

  const [url, setUrl] = useState("");
  const [addingItem, setAddingItem] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();
  const { mutate: createItem } = trpc.items.create.useMutation();

  // Keyboard shortcut: Press 'Shift+A' to focus input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "A" && !e.metaKey && !e.ctrlKey) {
        // Only trigger if not in an input/textarea
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) return;

    const loadingToast = toast.loading("Adding item...");
    setAddingItem(true);

    createItem(
      { url, collectionId },
      {
        onSuccess: async () => {
          await refetch();
          // TODO: The whole collections list shouldn't need to be invalidated here just for a count update.
          // Figure out a better way to sync count numbers for items and members across channels.
          await utils.collections.getUserCollections.invalidate();
          toast.dismiss(loadingToast);
          toast.success("Item added successfully!");
          setUrl("");
          setAddingItem(false);
        },
        onError: (error) => {
          console.log(error);
          toast.dismiss(loadingToast);
          toast.error("Failed to add item. Please try again.");
          setAddingItem(false);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative rounded-lg")}>
      <div className={cn("relative rounded-lg", addingItem && "bg-background")}>
        {addingItem ? (
          <Loader className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground animate-spin" />
        ) : (
          <BookmarkPlus className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground " />
        )}{" "}
        <Input
          ref={inputRef}
          disabled={addingItem}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Add a link..."
          className="pl-10 h-12 text-lg pr-10 bg-transparent"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <Kbd>Shift + A</Kbd>
        </div>
      </div>
    </form>
  );
}
