import { useParams } from "react-router-dom";
import { CollectionGrid } from "~/components/dashboard/collections/collection-grid";

export default function Collection() {
  const { collectionId } = useParams();

  if (!collectionId) {
    return <div className="text-muted-foreground">No collection selected.</div>;
  }

  return <CollectionGrid collectionId={collectionId} />;
}
