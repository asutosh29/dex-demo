import { Plus, FolderIcon } from "@repo/ui/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Badge } from "@repo/ui/components/ui/badge";
import { authClient } from "~/lib/auth-client";
import { useNavigate } from "react-router-dom";
import { trpc } from "~/lib/trpc";
import { useState } from "react";

interface AppSidebarProps {
  selectedCollection: string | null;
  onCollectionSelect: (id: string | null) => void;
  allItemsCount: number;
}

export function AppSidebar({
  selectedCollection,
  onCollectionSelect,
  allItemsCount,
}: AppSidebarProps) {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const [newCollectionTitle, setNewCollectionTitle] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const utils = trpc.useUtils();

  const { data: collections, isLoading } = trpc.collections.getAll.useQuery();

  const createCollection = trpc.collections.create.useMutation({
    onSuccess: () => {
      utils.collections.getAll.invalidate();
      setNewCollectionTitle("");
      setIsCreateDialogOpen(false);
    },
  });

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate("/login");
  };

  const handleCreateCollection = () => {
    if (newCollectionTitle.trim()) {
      createCollection.mutate({ title: newCollectionTitle });
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-2 py-1">
              <SidebarGroupLabel className="text-lg font-semibold">
                Collections
              </SidebarGroupLabel>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button size="icon-sm" variant="ghost">
                    <Plus className="size-4" />
                    <span className="sr-only">Add Collection</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Collection</DialogTitle>
                    <DialogDescription>
                      Create a new collection to organize your items
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    placeholder="Collection title"
                    value={newCollectionTitle}
                    onChange={(e) => setNewCollectionTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCreateCollection();
                      }
                    }}
                  />
                  <DialogFooter>
                    <Button
                      onClick={handleCreateCollection}
                      disabled={createCollection.isPending}
                    >
                      {createCollection.isPending ? "Creating..." : "Create"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onCollectionSelect(null)}
                  isActive={!selectedCollection}
                >
                  <FolderIcon className="size-4" />
                  <span>All Items</span>
                  <Badge variant="secondary" className="ml-auto">
                    {allItemsCount}
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isLoading ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  Loading collections...
                </div>
              ) : (
                collections?.map((collection) => (
                  <SidebarMenuItem key={collection.id}>
                    <SidebarMenuButton
                      onClick={() => onCollectionSelect(collection.id)}
                      isActive={selectedCollection === collection.id}
                    >
                      <FolderIcon className="size-4" />
                      <span>{collection.title}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {collection.itemCount}
                      </Badge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-2 py-2">
              <span className="text-sm text-muted-foreground truncate max-w-[160px]">
                {session?.user?.email}
              </span>
              <Button onClick={handleSignOut} variant="ghost" size="sm">
                Sign Out
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
