import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Plus } from "@repo/ui/icons";
import { useState } from "react";

export default () => {
  const [count, setCount] = useState(1);
  const increment = () => setCount((count) => count + 1);

  return (
    <div className="fixed top-2 right-2 bg-background/70 backdrop-blur-md z-1000 w-64 shadow-2xl rounded-md p-4">
      <div className="flex flex-row gap-2 items-center justify-between">
        <p className="inline-flex items-center gap-2">
          Counter <Badge>{count}</Badge>
        </p>
        <Button size={"icon"} onClick={increment}>
          <Plus />
        </Button>
      </div>
    </div>
  );
};
