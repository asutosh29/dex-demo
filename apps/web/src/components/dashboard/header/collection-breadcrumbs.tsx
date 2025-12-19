import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { trpc } from "~/lib/trpc";

export const CollectionBreadcrumbs = () => {
  const { collectionId } = useParams();
  const { data: collection } = trpc.collections.get.useQuery(
    { id: collectionId! },
    { enabled: !!collectionId },
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/dashboard">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {collection && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{collection.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
