import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { Link, useLocation, useParams } from "react-router-dom";
import { trpc } from "~/lib/trpc";

const CollectionBreadcrumbContent = () => {
  const { collectionId } = useParams();
  const { data: collection } = trpc.collections.get.useQuery(
    { id: collectionId! },
    { enabled: !!collectionId },
  );

  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/dashboard">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {collection && (
        <>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="max-w-[16ch] truncate">
              {collection.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </>
      )}
    </>
  );
};

const ChatBreadcrumbContent = () => {
  const { threadId } = useParams();

  // TODO: Replace with real thread title lookup once integrated
  const threadTitle = threadId ? `Thread ${threadId}` : null;

  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/chat">Chat</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {threadTitle && (
        <>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="max-w-[20ch] truncate">
              {threadTitle}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </>
      )}
    </>
  );
};

export const CollectionBreadcrumbs = () => {
  const { pathname } = useLocation();
  const isChatRoute = pathname.startsWith("/chat");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {isChatRoute ? (
          <ChatBreadcrumbContent />
        ) : (
          <CollectionBreadcrumbContent />
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
