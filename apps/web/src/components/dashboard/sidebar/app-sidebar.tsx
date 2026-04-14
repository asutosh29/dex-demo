import { memo, useEffect, useMemo } from "react";

import { useDroppable } from "@dnd-kit/core";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { Hash, Loader2, MessageSquare, Plus } from "@repo/ui/icons";
import { cn } from "@repo/ui/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authClient } from "~/lib/auth-client";
import { trpc, type RouterOutputs } from "~/lib/trpc";
import { useUserCollections } from "~/lib/hooks/use-user-collections";
import { AddCollectionDialogTrigger } from "./add-collection-dialog";
import { NavUser } from "./nav-user";
import { MemberAvatarGroup } from "../collections/manage-members/member-avatar-group";

type UserCollection =
  RouterOutputs["collections"]["getUserCollections"][number];

const CollectionMenuItem = memo(function CollectionMenuItem({
  collection,
  isActive,
}: {
  collection: UserCollection;
  isActive: boolean;
}) {
  const droppableData = useMemo(
    () => ({
      type: "collection" as const,
      collection,
    }),
    [collection],
  );

  const { setNodeRef, isOver } = useDroppable({
    id: collection.id!,
    data: droppableData,
  });

  const { data: members, isLoading } =
    trpc.collectionAccess.getMembers.useQuery(
      {
        collectionId: collection.id,
      },
      {
        enabled: collection.isShared as boolean,
      },
    );

  return (
    <SidebarMenuItem ref={setNodeRef}>
      <SidebarMenuButton
        isActive={isActive}
        asChild
        className={cn("transition-all", isOver && "bg-secondary")}
      >
        <Link
          to={`/dashboard/${collection.id}`}
          prefetch="intent"
          className={cn(
            isOver && "animate-pulse",
            "flex w-full justify-between",
          )}
        >
          <div className="inline-flex items-center gap-2">
            <Hash className="size-4" />
            <span
              className={cn(
                "truncate",
                collection.isShared ? "max-w-[10ch]" : "max-w-[12ch]",
              )}
            >
              {collection.title}
            </span>
          </div>
          {(collection.isShared as boolean) && (
            <MemberAvatarGroup
              showMemberCount
              members={members || []}
              isLoading={isLoading}
            />
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

// --- Mock chat threads for static UI ---
const MOCK_THREADS = [
  { id: "1", title: "Planning travel..." },
  { id: "2", title: "Checking weather conditions..." },
  { id: "3", title: "Booking accommodations..." },
  { id: "4", title: "Creating an itinerary..." },
  { id: "5", title: "Packing essentials..." },
];

function ChatHistoryList({ currentThreadId }: { currentThreadId?: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recents</SidebarGroupLabel>
      <SidebarGroupAction title="New Chat" asChild>
        <Link to="/chat">
          <Plus /> <span className="sr-only">New Chat</span>
        </Link>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {MOCK_THREADS.map((thread) => (
            <SidebarMenuItem key={thread.id}>
              <SidebarMenuButton
                isActive={currentThreadId === thread.id}
                asChild
              >
                <Link to={`/chat/${thread.id}`}>
                  <MessageSquare className="size-4" />
                  <span className="truncate max-w-[16ch]">{thread.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function CollectionsList({
  privateCollections,
  sharedCollections,
  isLoading,
  pathname,
}: {
  privateCollections: UserCollection[];
  sharedCollections: UserCollection[];
  isLoading: boolean;
  pathname: string;
}) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Private</SidebarGroupLabel>
        <AddCollectionDialogTrigger>
          <SidebarGroupAction title="Add Collection">
            <Plus /> <span className="sr-only">Add Collection</span>
          </SidebarGroupAction>
        </AddCollectionDialogTrigger>
        <SidebarGroupContent>
          <SidebarMenu>
            {isLoading ? (
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Loader2 className="animate-spin text-muted-foreground" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : (
              privateCollections.map((collection: UserCollection) => (
                <CollectionMenuItem
                  key={collection.id}
                  collection={collection}
                  isActive={pathname.includes(`/dashboard/${collection.id}`)}
                />
              ))
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {sharedCollections.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Shared</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sharedCollections.map((collection: UserCollection) => (
                <CollectionMenuItem
                  key={collection.id}
                  collection={collection}
                  isActive={pathname.includes(`/dashboard/${collection.id}`)}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const { data: collections, isLoading } = useUserCollections();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const activeTab = pathname.startsWith("/chat") ? "chats" : "collections";
  const threadId = pathname.startsWith("/chat/")
    ? pathname.split("/chat/")[1]
    : undefined;

  const privateCollections = useMemo(
    () => collections?.filter((c: UserCollection) => !c.isShared) ?? [],
    [collections],
  );

  const sharedCollections = useMemo(
    () => collections?.filter((c: UserCollection) => c.isShared) ?? [],
    [collections],
  );

  // Prefetch members for all shared collections to avoid N+1 queries
  const utils = trpc.useUtils();
  useEffect(() => {
    if (sharedCollections.length > 0) {
      sharedCollections.forEach((collection: UserCollection) => {
        utils.collectionAccess.getMembers.prefetch({
          collectionId: collection.id,
        });
      });
    }
  }, [sharedCollections, utils]);

  const handleTabChange = (value: string) => {
    if (value === "chats") {
      navigate("/chat");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to={"/dashboard"}>
              <SidebarMenuButton>
                <img src="/logo.svg" className="size-5" />
                <p className="font-medium text-base">Dex</p>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="w-full">
            <TabsTrigger value="collections" className="flex-1">
              Collections
            </TabsTrigger>
            <TabsTrigger value="chats" className="flex-1">
              Chats
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </SidebarHeader>
      <SidebarContent>
        {activeTab === "chats" ? (
          <ChatHistoryList currentThreadId={threadId} />
        ) : (
          <CollectionsList
            privateCollections={privateCollections}
            sharedCollections={sharedCollections}
            isLoading={isLoading}
            pathname={pathname}
          />
        )}
      </SidebarContent>
      {session?.user && (
        <SidebarFooter>
          <NavUser user={session.user} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
