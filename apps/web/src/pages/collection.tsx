import { useParams } from "react-router-dom";
import { Collection as CollectionView } from "~/components/dashboard/collections";

export default function Collection() {
  const { collectionId, subCollectionId } = useParams();
  const effectiveId = subCollectionId ?? collectionId;

  if (!effectiveId) {
    return <div className="text-muted-foreground">No collection selected.</div>;
  }

  return <CollectionView collectionId={effectiveId} />;
}
