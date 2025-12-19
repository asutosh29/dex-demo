import { Badge } from "@repo/ui/components/ui/badge";
import { Globe, Tags } from "@repo/ui/icons";
import { useState } from "react";
import PreviewDialog from "./preview-dialog";

export type CollectionItem = {
  url: string;
  title: string;
  image?: string;
  favicon?: string;
  tldr: string;
  tags: string[];
};

export function CollectionCard({ item }: { item: CollectionItem }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <div
        className="rounded-lg space-y-3 p-1 cursor-pointer hover:bg-accent/50 transition-colors w-full sm:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)] flex-shrink-0"
        onClick={() => setDialogOpen(true)}
      >
        <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
          {item.image ? (
            <img
              src={item.image || item.favicon || "/placeholder.png"}
              alt={item.title || "Preview"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Globe className="size-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex gap-1 items-center">
          {item.favicon ? (
            <img
              src={item.favicon}
              alt="Favicon"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          ) : (
            <Globe className="w-4 h-4 text-muted-foreground" />
          )}
          <p className="truncate text-sm font-semibold">
            {item.title || item.url}
          </p>
        </div>
        {/* <div className="flex flex-row gap-1 flex-wrap text-xs items-center line-clamp-1">
          <Tags className="size-4 text-muted-foreground" />{" "}
          {topTags.map((tag, index) => (
            <Badge className="justify-center" variant={"outline"} key={index}>
              {tag}
            </Badge>
          ))}{" "}
          {item.tags.length > topTags.length && (
            <span>+ {item.tags.length - topTags.length}</span>
          )}
        </div> */}
      </div>

      <PreviewDialog open={dialogOpen} onOpenChange={setDialogOpen} {...item} />
    </>
  );
}
