import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { GlobeIcon } from "lucide-react";
import OEmbedViewer from "./oembed-viewer";
import { Badge } from "@repo/ui/components/ui/badge";
import type { CollectionItem } from ".";
import { trpc } from "~/lib/trpc";

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: CollectionItem;
}

export default function PreviewDialog({
  open,
  onOpenChange,
  item,
}: PreviewDialogProps) {
  const { data: oembedData, isLoading: isLoadingEmbed } =
    trpc.ogp.getOembed.useQuery({ url: item.url }, { enabled: open });

  const { data: canIframe } = trpc.ogp.canIframe.useQuery(
    { url: item.url },
    { enabled: open },
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col max-w-none! w-[80vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center truncate w-[72ch] truncate-ellipsis">
            {item.favicon ? (
              <img
                src={item.favicon}
                alt="favicon"
                className="inline size-5 mr-2"
              />
            ) : (
              <GlobeIcon className="inline size-5 mr-2 text-muted-foreground" />
            )}{" "}
            {item.title || item.url}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-4 h-[80vh]">
          <div className="basis-5/7 flex items-center justify-center overflow-auto bg-muted rounded-md p-4">
            {isLoadingEmbed ? (
              <p className="text-sm text-muted-foreground">
                Loading preview...
              </p>
            ) : oembedData?.html ? (
              <OEmbedViewer
                html={oembedData.html as string}
                className="max-h-full *:my-auto"
              />
            ) : canIframe ? (
              <iframe
                src={item.url}
                title={item.title || "Preview"}
                className="w-full h-full rounded-lg border"
              ></iframe>
            ) : item.image ? (
              <img
                src={item.image}
                alt={item.title || "Preview Image"}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-64 aspect-square border rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">
                  No preview available
                </p>
              </div>
            )}
          </div>

          <div className="basis-2/7 w-full overflow-y-auto">
            <h3 className="font-semibold mb-2">TL;DR</h3>
            <p className="mb-4 text-sm">{item.tldr}</p>

            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-row gap-2 flex-wrap">
              {item.tags?.map((tag, index) => (
                <Badge key={index} variant={"secondary"}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
