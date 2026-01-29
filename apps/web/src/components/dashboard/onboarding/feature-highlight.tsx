import {
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@repo/ui/components/ui/empty";
import { Badge } from "@repo/ui/components/ui/badge";
import type { ReactNode } from "react";

interface FeatureHighlightProps {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
}

export function FeatureHighlight({
  icon,
  title,
  description,
  badge,
}: FeatureHighlightProps) {
  return (
    <div className="flex flex-col h-full items-center text-center p-4 bg-card rounded-lg border-t">
      <EmptyMedia variant="icon">{icon}</EmptyMedia>
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <EmptyTitle className="text-base">{title}</EmptyTitle>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <EmptyDescription className="text-sm">{description}</EmptyDescription>
      </div>
    </div>
  );
}
