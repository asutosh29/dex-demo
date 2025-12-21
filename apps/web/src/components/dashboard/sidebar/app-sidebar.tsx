import * as React from "react";

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
import { DexLogo, Hash, Loader2, Plus } from "@repo/ui/icons";
import { NavUser } from "./nav-user";
import { trpc } from "~/lib/trpc";
import { authClient } from "~/lib/auth-client";
import { AddCollectionDialogTrigger } from "./add-collection-dialog";
import { Link, useLocation } from "react-router-dom";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@repo/ui/lib/utils";

function CollectionMenuItem({
  collection,
  isActive,
}: {
  collection: { id: string; title: string };
  isActive: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: collection.id,
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
        className={cn("transition-all", isOver && "bg-secondary border-b-1")}
      >
        <Link
          to={`/dashboard/${collection.id}`}
          className={cn(isOver && "animate-pulse")}
        >
          <span>
            <Hash className="size-4" />
          </span>
          {collection.title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const { data: collections, isLoading } = trpc.collections.getAll.useQuery();
  const { pathname } = useLocation();

  const privateCollections = React.useMemo(
    () => collections?.filter((c) => !c.isShared) ?? [],
    [collections],
  );

  const sharedCollections = React.useMemo(
    () => collections?.filter((c) => c.isShared) ?? [],
    [collections],
  );

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <DexLogo className="size-6" />
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
