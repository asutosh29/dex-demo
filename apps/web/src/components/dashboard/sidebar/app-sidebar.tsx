import { memo, useEffect, useMemo, useState, useRef } from "react";

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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@repo/ui/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import {
  Hash,
  Loader2,
  MessageSquare,
  Plus,
  Ellipsis,
  Pencil,
  Trash2,
  Check,
  X,
} from "@repo/ui/icons";
import { cn } from "@repo/ui/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authClient } from "~/lib/auth-client";
import { trpc, type RouterOutputs } from "~/lib/trpc";
import { useUserCollections } from "~/lib/hooks/use-user-collections";
import { AddCollectionDialogTrigger } from "./add-collection-dialog";
import { NavUser } from "./nav-user";
import { MemberAvatarGroup } from "../collections/manage-members/member-avatar-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/components/ui/alert-dialog";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { toast } from "@repo/ui/components/ui/sonner";

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
          to={`/dashboard/${parentId}?sub=${subCollection.id}`}
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
  const { pathname, search } = useLocation();
  const activeSubCollectionId = useMemo(
    () => new URLSearchParams(search).get("sub"),
    [search],
  );
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
          <SidebarMenuSub
            data-state={isActive ? "open" : "closed"}
            className="data-[state=open]:animate-in data-[state=open]:slide-in-from-top-5 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          >
            {subCollections.map((subCollection) => (
              <SubCollectionSidebarItem
                key={subCollection.id}
                subCollection={subCollection}
                parentId={collection.id}
                isActive={
                  pathname === `/dashboard/${collection.id}` &&
                  activeSubCollectionId === subCollection.id
                }
              />
            ))}
          </SidebarMenuSub>
        )}
    </SidebarMenuItem>
  );
});

type Thread = RouterOutputs["threads"]["list"]["threads"][number];

const ThreadMenuItem = memo(function ThreadMenuItem({
  thread,
  isActive,
}: {
  thread: Thread;
  isActive: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(thread.title || "");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const { mutate: rename, isPending: isRenaming } =
    trpc.threads.rename.useMutation({
      onSuccess: (newThread) => {
        setIsEditing(false);
        utils.threads.list.invalidate();
        if (isActive) {
          navigate(`/chat/${newThread.id}`, { replace: true });
        }
        toast.success("Thread renamed");
      },
      onError: (err) => {
        toast.error(err.message || "Failed to rename thread");
      },
    });

  const { mutate: deleteThread, isPending: isDeleting } =
    trpc.threads.delete.useMutation({
      onSuccess: () => {
        utils.threads.list.invalidate();
        if (isActive) {
          navigate("/chat", { replace: true });
        }
        toast.success("Thread deleted");
      },
      onError: (err) => {
        toast.error(err.message || "Failed to delete thread");
      },
    });

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleRename = () => {
    if (editValue.trim() === "" || editValue === thread.title) {
      setIsEditing(false);
      setEditValue(thread.title || "");
      return;
    }
    rename({ threadId: thread.id, title: editValue.trim() });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRename();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue(thread.title || "");
    }
  };

  return (
    <>
      <SidebarMenuItem>
        {isEditing ? (
          <div className="flex items-center gap-1 overflow-hidden px-2 h-8 w-full group-data-[collapsible=icon]:hidden">
            <Input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={onKeyDown}
              className="h-7 text-sm px-2 py-0 focus-visible:ring-1"
              disabled={isRenaming}
            />
            <Button
              size="icon"
              variant="ghost"
              className="size-7 shrink-0"
              onClick={handleRename}
              disabled={isRenaming}
            >
              <Check className="size-3.5" />
            </Button>
            <button
              className="inline-flex items-center justify-center p-0 size-7 shrink-0 hover:bg-accent hover:text-accent-foreground rounded-md disabled:opacity-50"
              onClick={() => {
                setIsEditing(false);
                setEditValue(thread.title || "");
              }}
              disabled={isRenaming}
            >
              <X className="size-3.5" />
            </button>
          </div>
        ) : (
          <>
            <SidebarMenuButton isActive={isActive} asChild>
              <Link to={`/chat/${thread.id}`}>
                {/* <MessageSquare className="size-4" /> */}
                <span className="truncate max-w-[16ch]">
                  {thread.title || "New Conversation"}
                </span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <Ellipsis />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Pencil className="size-4" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDeleteConfirmOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="size-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </SidebarMenuItem>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              chat history for this thread.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                deleteThread({ threadId: thread.id });
                setDeleteConfirmOpen(false);
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Thread"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

function ChatHistoryList({ currentThreadId }: { currentThreadId?: string }) {
  const { data, isLoading } = trpc.threads.list.useQuery({});

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
          {isLoading ? (
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Loader2 className="animate-spin text-muted-foreground mx-auto" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            data?.threads.map((thread) => (
              <ThreadMenuItem
                key={thread.id}
                thread={thread}
                isActive={currentThreadId === thread.id}
              />
            ))
          )}
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
