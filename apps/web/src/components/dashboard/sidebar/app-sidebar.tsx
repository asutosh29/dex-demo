import { memo, useEffect, useMemo, useState } from "react";

import { useDroppable, useDndMonitor } from "@dnd-kit/core";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@repo/ui/components/ui/sidebar";
import { Hash, Loader2, Plus } from "@repo/ui/icons";
import { cn } from "@repo/ui/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { authClient } from "~/lib/auth-client";
import { trpc, type RouterOutputs } from "~/lib/trpc";
import { useUserCollections } from "~/lib/hooks/use-user-collections";
import { AddCollectionDialogTrigger } from "./add-collection-dialog";
import { NavUser } from "./nav-user";
import { MemberAvatarGroup } from "../collections/manage-members/member-avatar-group";

type UserCollection =
  RouterOutputs["collections"]["getUserCollections"][number];

type SubCollection = RouterOutputs["collections"]["getSubCollections"][number];

const SubCollectionSidebarItem = memo(function SubCollectionSidebarItem({
  subCollection,
  parentId,
  isActive,
}: {
  subCollection: SubCollection;
  parentId: string;
  isActive: boolean;
}) {
  const droppableData = useMemo(
    () => ({ type: "collection" as const, collection: subCollection }),
    [subCollection],
  );

  const { setNodeRef, isOver } = useDroppable({
    id: `sidebar:${subCollection.id}`,
    data: droppableData,
  });

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        asChild
        isActive={isActive}
        className={cn(isOver && "bg-secondary")}
      >
        <Link
          ref={setNodeRef}
          to={`/dashboard/${parentId}/${subCollection.id}`}
          className={cn(isOver && "animate-pulse")}
        >
          <Hash />
          {subCollection.title}
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
});

const CollectionMenuItem = memo(function CollectionMenuItem({
  collection,
  isActive,
}: {
  collection: UserCollection;
  isActive: boolean;
}) {
  const { pathname } = useLocation();
  // Latch: once this collection is hovered during a drag, keep sub-collections
  // visible until the drag ends — so moving onto a child chip doesn't collapse them.
  const [isExpandedForDrag, setIsExpandedForDrag] = useState(false);

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

  // Latch open when this root collection is first hovered during a drag;
  // reset when the drag ends so it collapses back to its default state.
  useDndMonitor({
    onDragOver: ({ over }) => {
      if (over?.id === collection.id) setIsExpandedForDrag(true);
    },
    onDragEnd: () => setIsExpandedForDrag(false),
    onDragCancel: () => setIsExpandedForDrag(false),
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

  const { data: subCollections } = trpc.collections.getSubCollections.useQuery(
    {
      parentId: collection.id,
    },
    {
      enabled: isActive || isExpandedForDrag,
    },
  );

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        asChild
        className={cn(
          "transition-all",
          isOver && "bg-secondary",
          isActive || isOver ? "text-foreground" : "text-muted-foreground",
        )}
      >
        <Link
          ref={setNodeRef}
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
      {(isActive || isExpandedForDrag) &&
        subCollections &&
        subCollections.length > 0 && (
          <SidebarMenuSub className="animate-in slide-in-from-top-5">
            {subCollections.map((subCollection) => (
              <SubCollectionSidebarItem
                key={subCollection.id}
                subCollection={subCollection}
                parentId={collection.id}
                isActive={
                  pathname === `/dashboard/${collection.id}/${subCollection.id}`
                }
              />
            ))}
          </SidebarMenuSub>
        )}
    </SidebarMenuItem>
  );
});

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const { data: collections, isLoading } = useUserCollections();
  const { pathname } = useLocation();

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
      </SidebarHeader>
      <SidebarContent>
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
