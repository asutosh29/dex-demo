import { Button } from "@repo/ui/components/ui/button";
import { BookmarkPlus, Hash, Plus } from "@repo/ui/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import { Kbd } from "@repo/ui/components/ui/kbd";
import { toast } from "@repo/ui/components/ui/sonner";
import { useParams } from "react-router-dom";
import { trpc } from "~/lib/trpc";
import { useState, useEffect } from "react";

export const AddItem = () => {
  const { collectionId } = useParams();
  const { data: collection } = trpc.collections.get.useQuery(
    { id: collectionId! },
    { enabled: !!collectionId },
  );

  const utils = trpc.useUtils();

  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate: createItem } = trpc.items.create.useMutation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "a" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
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
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading("Adding item...");
    setOpen(false);

    createItem(
      { url, collectionId: collectionId },
      {
        onSuccess: async () => {
          await utils.collections.get.invalidate({ id: collectionId! });
          toast.dismiss(loadingToast);
          toast.success("Item added successfully!");
          setUrl("");
        },
        onError: (error) => {
          console.log(error);
          toast.dismiss(loadingToast);
          toast.error("Failed to add item. Please try again.");
        },
      },
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button disabled={!collectionId} variant={"outline"}>
          <BookmarkPlus />
          <Kbd className="ml-1">A</Kbd>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={2} className="w-80">
        <form onSubmit={handleSubmit} className="space-y-2">
          <Label>
            Add Item in -
            <span className="inline-flex gap-1 items-center">
              <Hash className="size-4" />
              {collection?.title}
            </span>
          </Label>
          <div className="flex gap-1">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1"
            />
            <Button type="submit" size={"icon"} variant={"secondary"}>
              <Plus />
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
