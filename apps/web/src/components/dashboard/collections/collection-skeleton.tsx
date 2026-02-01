import { Skeleton } from "@repo/ui/components/ui/skeleton";

export function CollectionSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-6 w-225 mx-auto">
      {/* Collection Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-baseline gap-2">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-12 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>

        {/* Add Item Input Skeleton */}
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>

      {/* Filter and View Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </div>

      {/* Items Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
