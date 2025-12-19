import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/ui/empty";
import { BookmarkPlus } from "@repo/ui/icons";

export function CollectionEmptyState() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookmarkPlus />
        </EmptyMedia>
        <EmptyTitle>No items yet</EmptyTitle>
        <EmptyDescription>
          Add your first item to this collection to see it here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <p className="text-muted-foreground text-sm">
          Use the add button in the header to save links into this collection.
        </p>
      </EmptyContent>
    </Empty>
  );
}
