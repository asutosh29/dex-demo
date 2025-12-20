import { Button } from "@repo/ui/components/ui/button";
import { BookmarkPlus, Hash, Plus } from "@repo/ui/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import { toast } from "@repo/ui/components/ui/sonner";
import { useParams } from "react-router-dom";
import { trpc } from "~/lib/trpc";
import { useState } from "react";

export const AddItem = () => {
  const { collectionId } = useParams();
  const { data: collection } = trpc.collections.get.useQuery(
    { id: collectionId! },
    { enabled: !!collectionId },
  );

  const utils = trpc.useUtils();

  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const { mutateAsync: createItem } = trpc.items.create.useMutation();
  const { mutateAsync: addItemToCollection } =
    trpc.collections.addItem.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading("Adding item...");
    setOpen(false);

    try {
      const item = await createItem({ url });
      if (item) {
        await addItemToCollection({
          collectionId: collectionId!,
          itemId: item.id,
        });
        await utils.collections.get.invalidate({ id: collectionId! });
        await utils.collections.getAll.invalidate();
        toast.dismiss(loadingToast);
        toast.success("Item added successfully!");
        setUrl("");
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error("Failed to add item. Please try again.");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button disabled={!collectionId} size={"icon"} variant={"outline"}>
          <BookmarkPlus />
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
