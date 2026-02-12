import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { trpc } from "~/lib/trpc";
import { CollectionCard } from "~/components/dashboard/collections/collection-card";
import { Loader2, SearchIcon } from "@repo/ui/icons";
import { useDebounce } from "@repo/ui/hooks/use-debounce";
import { Button } from "@repo/ui/components/ui/button";
import { Kbd } from "@repo/ui/components/ui/kbd";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Badge } from "@repo/ui/components/ui/badge";

export function Search() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const { data: results, isLoading } = trpc.items.search.useQuery(
    { query: debouncedQuery },
    {
      enabled: debouncedQuery.length > 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setQuery("");
    }
  };

  return (
    <>
      <Button variant={"outline"} onClick={() => setOpen(true)}>
        <SearchIcon />
        <span className="text-muted-foreground text-sm">Search Dex...</span>
        <Kbd className="ml-4">⌘ + K</Kbd>
      </Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="p-0 border-0 bg-popover text-popover-foreground"
        >
          <DialogHeader>
            <DialogTitle className="sr-only">Search Items</DialogTitle>
            <div className="flex h-12 items-center gap-2 px-3 border-b">
              <SearchIcon className="size-4 shrink-0 opacity-50" />{" "}
              <input
                placeholder="Search your items..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="placeholder:text-muted-foreground bg-transparent flex w-full rounded-md h-full py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                autoFocus
              />
              {results && results.length > 0 && (
                <Badge className="float-end" variant={"secondary"}>
                  {results.length} items
                </Badge>
              )}
            </div>
          </DialogHeader>

          <div className="h-90 w-full flex-1">
            {query.length === 0 && !results?.length && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <SearchIcon className="size-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Type to search your items
                </p>
              </div>
            )}
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="size-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {results && results.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">
                  No items found for "{query}"
                </p>
              </div>
            )}
            {results && results.length > 0 && (
              <ScrollArea className="px-4 pb-4 h-full" type="auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.map((item) => (
                    <CollectionCard key={item.id} item={item} />
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
