import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/ui/command";
import { trpc } from "~/lib/trpc";
import { CollectionCard } from "~/components/dashboard/collections/collection-card";
import { Loader2, SearchIcon } from "@repo/ui/icons";
import { useDebounce } from "@repo/ui/hooks/use-debounce";
import { Button } from "@repo/ui/components/ui/button";
import { Kbd } from "@repo/ui/components/ui/kbd";

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

  return (
    <>
      <Button variant={"outline"} onClick={() => setOpen(true)}>
        <SearchIcon />
        <span className="text-muted-foreground text-sm">Search...</span>
        <Kbd className="ml-4">⌘ + K</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search your items..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[60vh]">
          {query.length === 0 && (
            <CommandEmpty>
              <div className="flex flex-col items-center justify-center py-12">
                <SearchIcon className="size-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Type to search your items
                </p>
              </div>
            </CommandEmpty>
          )}

          {query.length > 0 && isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {query.length > 0 &&
            !isLoading &&
            results &&
            results.length === 0 && (
              <CommandEmpty>
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-sm text-muted-foreground">
                    No items found for "{query}"
                  </p>
                </div>
              </CommandEmpty>
            )}

          {query.length > 0 && !isLoading && results && results.length > 0 && (
            <CommandGroup
              heading={`${results.length} result${results.length !== 1 ? "s" : ""}`}
            >
              <div className="grid grid-cols-2 gap-3 p-2">
                {results.map((item) => (
                  <CommandItem key={item.id} value={item.title}>
                    <CollectionCard item={item} />
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
