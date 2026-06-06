import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@repo/ui/components/ui/card";
import {
  MessageSquare,
  Server,
  Clock,
  Activity,
  ChevronDown,
  ChevronUp,
} from "@repo/ui/icons";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@repo/ui/components/ui/collapsible";
import { Button } from "@repo/ui/components/ui/button";

export type TestEchoInput = {
  message: string;
};
export type TestEchoOutput = {
  echoedMessage: string;
  timestamp: string;
  serverName: string;
};

export default function TestEcho({
  input,
  output,
}: {
  input: TestEchoInput;
  output: TestEchoOutput;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="w-full border-primary/20 shadow-sm overflow-hidden transition-all duration-300">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between bg-primary/5 pr-2">
          <CardHeader className="py-3 flex-1">
            <CardTitle className="flex items-center gap-2 text-sm font-bold text-primary">
              <Activity className="w-4 h-4" />
              <span>Echo Response</span>
              <span className="text-xs font-normal text-muted-foreground ml-2 opacity-70">
                📡 {output.serverName}
              </span>
            </CardTitle>
          </CardHeader>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary/10"
            >
              {isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
          <CardContent className="pt-4 space-y-4 pb-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> Input
              </span>
              <p className="text-sm bg-muted/40 px-3 py-2 rounded-md border border-border/50 text-foreground/80 italic line-clamp-2">
                "{input.message}"
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-primary/80 uppercase tracking-widest flex items-center gap-1">
                <Activity className="w-3 h-3" /> Result 🔊
              </span>
              <p className="text-base font-semibold text-foreground leading-relaxed">
                {output.echoedMessage}
              </p>
            </div>
          </CardContent>

          <CardFooter className="bg-muted/20 border-t border-border/40 py-2.5 flex justify-between items-center text-[10px] text-muted-foreground/70 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Server className="w-3 h-3 opacity-50" />
              <span>{output.serverName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 opacity-50" />
              <span>{new Date(output.timestamp).toLocaleTimeString()} 🕒</span>
            </div>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
