import type { UIMessage } from "ai";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/ui/alert-dialog";
import { CodeBlock } from "@repo/ui/components/ai-elements/code-block";
import { Button } from "@repo/ui/components/ui/button";

export const DebugPanel = ({ messages }: { messages: UIMessage[] }) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Debug</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>JSON output</AlertDialogTitle>
            <div className="h-[500px] overflow-y-scroll w-full">
              <CodeBlock
                code={JSON.stringify(messages, null, 2)}
                language="json"
                className="w-full overflow-y-scroll"
              />
            </div>
            <AlertDialogDescription>HI</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
