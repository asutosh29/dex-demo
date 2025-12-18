import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { ExternalLink, Trash2 } from "@repo/ui/icons";

interface ItemCardProps {
  item: {
    id: string;
    title: string;
    tldr: string | null;
    url: string;
    image: string | null;
    favicon: string | null;
    tags: string[] | null;
  };
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function ItemCard({ item, onDelete, isDeleting }: ItemCardProps) {
  return (
    <Card className="flex flex-col transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
            {item.tldr && (
              <CardDescription className="mt-2 line-clamp-2">
                {item.tldr}
              </CardDescription>
            )}
          </div>
          {item.favicon && (
            <img
              src={item.favicon}
              alt=""
              className="size-6 rounded flex-shrink-0"
              loading="lazy"
            />
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-40 object-cover rounded mb-3"
            loading="lazy"
          />
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 5).map((tag: string, idx: number) => (
              <Badge key={idx} variant="secondary">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 5 && (
              <Badge variant="outline">+{item.tags.length - 5} more</Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(item.url, "_blank")}
        >
          <ExternalLink className="size-4 mr-2" />
          Visit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(item.id)}
          disabled={isDeleting}
        >
          <Trash2 className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
