import { AppSidebar } from "~/components/dashboard/sidebar/app-sidebar";
import { Separator } from "@repo/ui/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import {
  CollectionBreadcrumbs,
  HeaderActions,
} from "~/components/dashboard/header";
import { DndProvider } from "~/components/providers/dnd-provider";

export default function DashboardLayout() {
  return (
    <DndProvider>
      <SidebarProvider>
        <AppSidebar variant="sidebar" />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-10 bg-background/70 backdrop-blur-md">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <CollectionBreadcrumbs />
            <div className="ml-auto">
              <HeaderActions />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </DndProvider>
  );
}
