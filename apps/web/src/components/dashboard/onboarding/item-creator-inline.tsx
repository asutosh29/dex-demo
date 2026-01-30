import { useState, useEffect, useRef } from "react";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Kbd } from "@repo/ui/components/ui/kbd";
import { Loader } from "@repo/ui/icons";
import { toast } from "@repo/ui/components/ui/sonner";
import { trpc } from "~/lib/trpc";

interface ItemCreatorInlineProps {
  collectionId: string;
  onSuccess: () => void;
}

export function ItemCreatorInline({
  collectionId,
  onSuccess,
}: ItemCreatorInlineProps) {
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const utils = trpc.useUtils();

  const createItem = trpc.items.create.useMutation({
    onSuccess: async () => {
      await utils.collections.get.invalidate({ id: collectionId });
      await utils.collections.getUserCollections.invalidate();
      await utils.collections.getCollectionsAndItemsCount.invalidate();
      toast.success("Item added successfully!");
      setUrl("");
      onSuccess();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add item. Please check the URL and try again.");
    },
  });

  useEffect(() => {
    // Autofocus on mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    createItem.mutate({ url: url.trim(), collectionId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        {createItem.isPending && (
          <Loader className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin" />
        )}
        <Input
          ref={inputRef}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a URL"
          disabled={createItem.isPending}
          className={createItem.isPending ? "pl-10" : ""}
          aria-label="Item URL"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={!url.trim() || createItem.isPending}
          className="flex-1"
        >
          {createItem.isPending ? "Adding..." : "Add Item"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Tip: Press <Kbd>A</Kbd> anywhere to quickly add items
      </p>
    </form>
  );
}
