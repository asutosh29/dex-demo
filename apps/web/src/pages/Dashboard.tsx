import { SidebarProvider } from "@repo/ui/components/ui/sidebar";
import { trpc } from "~/lib/trpc";
import { useState } from "react";
import { AppSidebar } from "~/components/dashboard/app-sidebar";
import { DashboardHeader } from "~/components/dashboard/dashboard-header";
import { ItemsGrid } from "~/components/dashboard/items-grid";

export default function Dashboard() {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );

  // Queries
  const { data: items, isLoading: loadingItems } = trpc.items.getAll.useQuery();
  const { data: selectedCollectionData, isLoading: loadingCollection } =
    trpc.collections.get.useQuery(
      { id: selectedCollection! },
      { enabled: !!selectedCollection },
    );

  const displayItems = selectedCollection
    ? selectedCollectionData?.items || []
    : items || [];

  const headerTitle = selectedCollection
    ? selectedCollectionData?.title || "Collection"
    : "All Items";

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar
          selectedCollection={selectedCollection}
          onCollectionSelect={setSelectedCollection}
          allItemsCount={items?.length || 0}
        />

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 max-w-7xl">
            <DashboardHeader
              title={headerTitle}
              itemCount={displayItems.length}
              selectedCollection={selectedCollection}
            />

            <ItemsGrid
              items={displayItems}
              selectedCollection={selectedCollection}
              isLoading={
                loadingItems || (selectedCollection ? loadingCollection : false)
              }
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
