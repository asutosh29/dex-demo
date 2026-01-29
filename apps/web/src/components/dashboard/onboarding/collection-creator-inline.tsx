import { useState, useEffect, useRef } from "react";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Loader } from "@repo/ui/icons";
import { toast } from "@repo/ui/components/ui/sonner";
import { trpc } from "~/lib/trpc";

interface CollectionCreatorInlineProps {
  onSuccess: (collectionId: string) => void;
}

export function CollectionCreatorInline({
  onSuccess,
}: CollectionCreatorInlineProps) {
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const utils = trpc.useUtils();

  const createCollection = trpc.collections.create.useMutation({
    onSuccess: async (data) => {
      await utils.collections.getUserCollections.invalidate();
      await utils.collections.getCollectionsAndItemsCount.invalidate();
      toast.success("Collection created!");
      setTitle("");
      onSuccess(data.id);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create collection. Please try again.");
    },
  });

  useEffect(() => {
    // Autofocus on mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createCollection.mutate({ title: title.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        {createCollection.isPending && (
          <Loader className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin" />
        )}
        <Input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Reading List, Work Resources, Inspiration"
          disabled={createCollection.isPending}
          className={createCollection.isPending ? "pl-10" : ""}
          aria-label="Collection name"
        />
      </div>
      <Button
        type="submit"
        disabled={!title.trim() || createCollection.isPending}
        className="w-full"
      >
        {createCollection.isPending ? "Creating..." : "Create Collection"}
      </Button>
    </form>
  );
}
