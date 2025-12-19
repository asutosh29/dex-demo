import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

export function CollectionSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <Card
          key={idx}
          className="w-full sm:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]"
        >
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-20" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
