import { useParams } from "react-router-dom";

export default function Thread() {
  const { threadId } = useParams();

  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-muted-foreground">Thread: {threadId} (placeholder)</p>
    </div>
  );
}
