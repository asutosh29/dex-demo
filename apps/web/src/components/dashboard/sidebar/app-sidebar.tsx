import * as React from "react";

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
import { Hash, Loader2, Plus, Users } from "@repo/ui/icons";
import { cn } from "@repo/ui/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { authClient } from "~/lib/auth-client";
import { trpc, type RouterOutputs } from "~/lib/trpc";
import { AddCollectionDialogTrigger } from "./add-collection-dialog";
import { NavUser } from "./nav-user";
import { Badge } from "@repo/ui/components/ui/badge";

type UserCollection =
  RouterOutputs["collections"]["getUserCollections"][number];

function CollectionMenuItem({
  collection,
  isActive,
}: {
  collection: UserCollection;
  isActive: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: collection.id!,
    data: {
      type: "collection",
      collection,
    },
  });

  return (
    <SidebarMenuItem ref={setNodeRef}>
      <SidebarMenuButton
        isActive={isActive}
        asChild
        className={cn("transition-all", isOver && "bg-secondary")}
      >
        <Link
          to={`/dashboard/${collection.id}`}
          className={cn(
            isOver && "animate-pulse",
            "flex w-full justify-between",
          )}
        >
          <div className="inline-flex items-center gap-2">
            <Hash className="size-4" />
            {collection.title}
          </div>
          <div className="text-muted-foreground inline-flex items-center gap-2">
            {collection.memberCount >= 2 ? (
              <Badge variant={"outline"}>
                <Users /> {collection.memberCount}
              </Badge>
            ) : (
              collection.itemCount
            )}
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const { data: collections, isLoading } =
    trpc.collections.getUserCollections.useQuery();
  const { pathname } = useLocation();

  const privateCollections = React.useMemo(
    () => collections?.filter((c) => c.memberCount < 2) ?? [],
    [collections],
  );

  const sharedCollections = React.useMemo(
    () => collections?.filter((c) => c.memberCount >= 2) ?? [],
    [collections],
  );

  console.log("Collections:", collections);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <img src="/logo.svg" className="size-6" />
              <p className="font-medium text-base">Dex</p>
            </SidebarMenuButton>
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
                privateCollections.map((collection) => (
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
                {sharedCollections.map((collection) => (
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
