import { authClient } from "~/lib/auth-client";
import { trpc } from "~/lib/trpc";
import { Badge } from "@repo/ui/components/ui/badge";
import { ArrowRight, Globe } from "@repo/ui/icons";
import { useState } from "react";
import PreviewDialog from "~/components/dashboard/collections/collection-card/preview-dialog";
import type { RouterOutputs } from "~/lib/trpc";

type RecentItem = RouterOutputs["items"]["getRecents"][number];

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
};

function RecentItemRow({ item }: { item: RecentItem }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setDialogOpen(true)}
        className="group py-4 border-b border-border last:border-0 cursor-pointer hover:bg-muted/30 transition-colors -mx-4 px-4"
      >
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-destructive mt-2" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              {item.favicon ? (
                <img
                  src={item.favicon}
                  alt="Favicon"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              ) : (
                <Globe className="size-4 text-muted-foreground" />
              )}
              <h3 className="font-semibold truncate">{item.title}</h3>
              <span className="text-xs text-muted-foreground">
                {getDomain(item.url)}
              </span>
              {item.collectionTitle && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-foreground">
                    # {item.collectionTitle}
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.tldr}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {item.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {item.tags && item.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{item.tags.length - 3}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground ml-auto">
                {formatDate(item.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <PreviewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={item}
      />
    </>
  );
}

export default function Dashboard() {
  const greeting = getTimeBasedGreeting();
  const { data: session } = authClient.useSession();
  const firstName = session?.user.name?.split(" ")[0];

  const { data: recentItems, isLoading } = trpc.items.getRecents.useQuery({
    limit: 3,
  });

  const { data: collections } = trpc.collections.getUserCollections.useQuery();
  const totalCollections = collections?.length ?? 0;
  const totalItems =
    collections?.reduce((acc: number, col) => acc + (col.itemCount ?? 0), 0) ??
    0;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 mt-16">
        <h1 className="text-4xl 2xl:text-5xl font-display font-light">
          {greeting},{" "}
          <span className="italic text-muted-foreground">{firstName}.</span>
        </h1>
        <p className="text-muted-foreground 2xl:text-lg">
          Your second brain holds{" "}
          <span className="text-foreground">{totalItems} items</span> across{" "}
          <span className="text-foreground">
            {totalCollections} collections
          </span>
          .
        </p>
      </div>

      {/* Recent Captures Section */}
      {recentItems && recentItems.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest inline-flex items-center">
              Recent Captures <ArrowRight className="size-4 ml-1" />
            </h2>
          </div>

          <div className="space-y-0">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading...
              </div>
            ) : (
              recentItems.map((item) => (
                <RecentItemRow key={item.id} item={item} />
              ))
            )}
          </div>
        </section>
      )}
    </main>
  );
}
