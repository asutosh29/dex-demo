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
import { Hash, Loader2, NotebookTabs, Plus } from "@repo/ui/icons";
import { NavUser } from "./nav-user";
import { trpc } from "~/lib/trpc";
import { authClient } from "~/lib/auth-client";
import { AddCollectionDialogTrigger } from "./add-collection-dialog";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const { data: collections, isLoading } = trpc.collections.getAll.useQuery();
  const { pathname } = useLocation();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <NotebookTabs className="size-4" />
              </div>
              <p className="font-medium text-base">Dex</p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Collections</SidebarGroupLabel>
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
                collections?.map((collection) => (
                  <SidebarMenuItem key={collection.id}>
                    <SidebarMenuButton
                      isActive={pathname.includes(
                        `/dashboard/${collection.id}`,
                      )}
                      asChild
                    >
                      <Link to={`/dashboard/${collection.id}`}>
                        <span>
                          <Hash className="size-4" />
                        </span>
                        {collection.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
