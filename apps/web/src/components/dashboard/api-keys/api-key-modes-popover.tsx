import { Info } from "@repo/ui/icons";
import { Button } from "@repo/ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { Badge } from "@repo/ui/components/ui/badge";

export function ApiKeyModesPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Info className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="start">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-1">API Key Modes</h4>
            <p className="text-xs text-muted-foreground">
              Choose the access level for your API keys
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <p className="font-semibold text-sm mb-1">Full Access</p>
              <p className="text-xs text-muted-foreground mb-2">
                Inherits all your collection permissions and can create new
                collections
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  All collections
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  collection:create
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  item:search
                </Badge>
              </div>
            </div>

            <div className="pt-3 border-t">
              <p className="font-semibold text-sm mb-1">Collection-Specific</p>
              <p className="text-xs text-muted-foreground mb-2">
                Limited to collections you explicitly grant access to
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  collection:read
                </Badge>
                <Badge variant="outline" className="text-xs">
                  item:add
                </Badge>
                <Badge variant="outline" className="text-xs">
                  collection:view_members
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
