import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { GlobeIcon, Loader2, SquareArrowOutUpRight } from "@repo/ui/icons";
import { Link } from "react-router-dom";
import OEmbedViewer from "./oembed-viewer";
import { Badge } from "@repo/ui/components/ui/badge";
import type { CollectionItem } from ".";
import { trpc } from "~/lib/trpc";
import { getDomainFromUrl } from "~/lib/utils";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";
import { EditableField } from "@repo/ui/components/ui/editable-field";
import { authClient } from "~/lib/auth-client";
import { toast } from "@repo/ui/components/ui/sonner";

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: CollectionItem;
  collectionId?: string;
}

export default function PreviewDialog({
  open,
  onOpenChange,
  item,
  collectionId,
}: PreviewDialogProps) {
  const { data: session } = authClient.useSession();
  const utils = trpc.useUtils();

  const { data: oembedData, isLoading: isLoadingEmbed } =
    trpc.ogp.getOembed.useQuery({ url: item.url }, { enabled: open });

  const { data: canIframe } = trpc.ogp.canIframe.useQuery(
    { url: item.url },
    { enabled: open },
  );

  // Check if current user can edit (is the creator)
  const canEdit = session?.user?.id === item.creatorId;

  // Update item mutation with optimistic updates
  const updateMutation = trpc.items.update.useMutation({
    onMutate: async (newData) => {
      if (!collectionId) return;

      // Cancel outgoing refetches
      await utils.collections.get.cancel({ id: collectionId });

      // Snapshot previous value
      const previousData = utils.collections.get.getData({ id: collectionId });

      // Optimistically update the cache
      utils.collections.get.setData({ id: collectionId }, (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.map((i) =>
            i.id === item.id ? { ...i, ...newData } : i,
          ),
        };
      });

      return { previousData };
    },
    onError: (err, _, context) => {
      // Rollback on error
      if (collectionId && context?.previousData) {
        utils.collections.get.setData(
          { id: collectionId },
          context.previousData,
        );
      }
      toast.error(err.message || "Failed to update item");
    },
    onSettled: () => {
      // Refetch to ensure consistency
      if (collectionId) {
        utils.collections.get.invalidate({ id: collectionId });
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex flex-col max-w-none! w-[80vw]"
        onEscapeKeyDown={(e) => {
          // Prevent dialog close if user is editing an EditableField
          const editingField = (e.target as HTMLElement).closest(
            '[data-state="editing"]',
          );
          if (editingField) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 max-w-full">
            {item.favicon ? (
              <img
                src={item.favicon}
                alt="favicon"
                className="size-5 shrink-0"
              />
            ) : (
              <GlobeIcon className="size-5 text-muted-foreground shrink-0" />
            )}
            <EditableField
              type="text"
              value={item.title || item.url}
              placeholder="Enter title..."
              disabled={!canEdit}
              className="w-1/2"
              showActions={false}
              inputClassName="text-lg"
              onSave={async (value) => {
                await updateMutation.mutateAsync({
                  id: item.id,
                  title: value as string,
                });
              }}
            >
              {(value) => <span className="truncate block">{value}</span>}
            </EditableField>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-4 h-[80vh]">
          <div className="basis-5/7 flex items-center justify-center overflow-auto bg-muted rounded-md relative">
            {isLoadingEmbed ? (
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            ) : oembedData?.html ? (
              <OEmbedViewer
                html={oembedData.html as string}
                className="max-h-full *:my-auto p-4"
              />
            ) : canIframe ? (
              <iframe
                src={item.url}
                title={item.title || "Preview"}
                className="w-full h-full rounded-lg"
              />
            ) : item.image ? (
              <img
                src={item.image}
                alt={item.title || "Preview Image"}
                className="max-w-full max-h-full object-contain rounded-lg p-4"
              />
            ) : (
              <div className="flex items-center justify-center h-64 aspect-square border rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">
                  No preview available
                </p>
              </div>
            )}
            <div
              className={cn(
                "absolute bottom-0 w-full h-12 p-2",
                "flex items-center gap-2",
                "rounded-b-lg",
                canIframe &&
                  "bg-linear-to-t from-background/70 via-background/30 to-background/0 to-99%",
              )}
            >
              <Link to={item.url} target="_blank" rel="noopener noreferrer">
                <Button
                  variant={"outline"}
                  className="bg-background/50! backdrop-blur-2xl shadow-md cursor-pointer"
                  effect={"pop"}
                >
                  <SquareArrowOutUpRight />
                  {getDomainFromUrl(item.url)}{" "}
                </Button>
              </Link>
            </div>
          </div>

          <div className="basis-2/7 overflow-y-auto overflow-x-hidden space-y-4 pr-2">
            <EditableField
              type="multiline"
              value={item.tldr || ""}
              label="TL;DR"
              placeholder="Enter summary..."
              disabled={!canEdit}
              onSave={async (value) => {
                await updateMutation.mutateAsync({
                  id: item.id,
                  tldr: value as string,
                });
              }}
            >
              {(value) => <p className="text-sm">{value}</p>}
            </EditableField>

            <EditableField
              type="tags"
              value={item.tags || []}
              label="Tags"
              disabled={!canEdit}
              onSave={async (value) => {
                await updateMutation.mutateAsync({
                  id: item.id,
                  tags: value as string[],
                });
              }}
            >
              {(tags) => (
                <div className="flex flex-row gap-2 flex-wrap">
                  {(tags as string[]).map((tag, index) => (
                    <Badge key={index} variant={"secondary"}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </EditableField>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
