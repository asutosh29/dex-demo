import { useCollectionStore } from "@/lib/stores/collection-store";
import { Loader } from "@repo/ui/icons";
import { GreetingHeader } from "@/components/collection-screen/greeting-header";
import { CollectionList } from "@/components/collection-screen/collection-list";

export default () => {
  const { isLoading, error } = useCollectionStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-destructive">
        <p>Error loading collections: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <GreetingHeader />
      <CollectionList />
    </div>
  );
};
