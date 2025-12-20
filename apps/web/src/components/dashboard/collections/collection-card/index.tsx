import { Globe } from "@repo/ui/icons";
import { useState } from "react";
import PreviewDialog from "./preview-dialog";

export type CollectionItem = {
  id: string;
  type: "link";
  title: string;
  url: string;
  image: string | null;
  favicon: string | null;
  tldr: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export function CollectionCard({ item }: { item: CollectionItem }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div
        className="rounded-lg space-y-3 p-1 cursor-pointer group transition-colors w-full sm:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)] flex-shrink-0"
        onClick={() => setDialogOpen(true)}
      >
        <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
          {item.image ? (
            <img
              src={item.image || item.favicon || "/placeholder.png"}
              alt={item.title || "Preview"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center group-hover:scale-105 transition-transform">
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
            <Globe className="size-5 text-muted-foreground" />
          )}
          <p className="truncate text-sm font-semibold">
            {item.title || item.url}
          </p>
        </div>
      </div>

      <PreviewDialog open={dialogOpen} onOpenChange={setDialogOpen} {...item} />
    </>
  );
}
