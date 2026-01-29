import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { ChevronDown } from "@repo/ui/icons";
import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";

interface Props {
  member: {
    userId: string;
    user: { name: string; email: string };
    role: "owner" | "admin" | "member";
  };
  currentUserRole: "owner" | "admin" | "member";
  collectionId: string;
  isSelf: boolean;
}

interface MenuItem {
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
}

export function RoleDropdown({
  member,
  currentUserRole,
  collectionId,
  isSelf,
}: Props) {
  const utils = trpc.useUtils();

  const promoteMutation =
    trpc.collectionAccess.promoteMemberToAdmin.useMutation({
      onSuccess: () => {
        utils.collectionAccess.getMembers.invalidate({ collectionId });
        toast.success(`Promoted ${member.user.name} to admin`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const demoteMutation = trpc.collectionAccess.demoteAdminToMember.useMutation({
    onSuccess: () => {
      utils.collectionAccess.getMembers.invalidate({ collectionId });
      toast.success(`Demoted ${member.user.name} to member`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const removeMutation = trpc.collectionAccess.removeMember.useMutation({
    onSuccess: () => {
      utils.collectionAccess.getMembers.invalidate({ collectionId });
      toast.success(`Removed ${member.user.name} from collection`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const transferMutation = trpc.collectionAccess.transferOwnership.useMutation({
    onSuccess: () => {
      utils.collectionAccess.getMembers.invalidate({ collectionId });
      utils.collections.get.invalidate({ id: collectionId });
      toast.success(`Transferred ownership to ${member.user.name}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const leaveMutation = trpc.collectionAccess.leaveCollection.useMutation({
    onSuccess: () => {
      utils.collections.getUserCollections.invalidate();
      toast.success("Left collection");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function buildMenuItems(): MenuItem[] {
    const items: MenuItem[] = [];

    // Admin viewing member
    if (currentUserRole === "admin" && member.role === "member" && !isSelf) {
      items.push({
        label: "Promote to Admin",
        onClick: () =>
          promoteMutation.mutate({ collectionId, userId: member.userId }),
      });
      items.push({
        label: "Remove from Collection",
        onClick: () =>
          removeMutation.mutate({ collectionId, userId: member.userId }),
        variant: "destructive",
      });
    }

    // Admin stepping down (self)
    if (currentUserRole === "admin" && isSelf && member.role === "admin") {
      items.push({
        label: "Step Down to Member",
        onClick: () =>
          demoteMutation.mutate({ collectionId, userId: member.userId }),
      });
      items.push({
        label: "Leave Collection",
        onClick: () => leaveMutation.mutate({ collectionId }),
        variant: "destructive",
      });
    }

    // Owner viewing member
    if (currentUserRole === "owner" && member.role === "member") {
      items.push({
        label: "Promote to Admin",
        onClick: () =>
          promoteMutation.mutate({ collectionId, userId: member.userId }),
      });
      items.push({
        label: "Remove from Collection",
        onClick: () =>
          removeMutation.mutate({ collectionId, userId: member.userId }),
        variant: "destructive",
      });
    }

    // Owner viewing admin
    if (currentUserRole === "owner" && member.role === "admin" && !isSelf) {
      items.push({
        label: "Promote to Owner",
        onClick: () => {
          if (
            confirm(
              `Transfer ownership to ${member.user.name}? You will become an admin.`,
            )
          ) {
            transferMutation.mutate({
              collectionId,
              newOwnerId: member.userId,
            });
          }
        },
      });
      items.push({
        label: "Demote to Member",
        onClick: () =>
          demoteMutation.mutate({ collectionId, userId: member.userId }),
      });
    }

    // Owner viewing self (can leave or transfer)
    if (currentUserRole === "owner" && isSelf && member.role === "owner") {
      items.push({
        label: "Leave Collection",
        onClick: () => leaveMutation.mutate({ collectionId }),
        variant: "destructive",
      });
    }

    // Member viewing self (can leave)
    if (currentUserRole === "member" && isSelf) {
      items.push({
        label: "Leave Collection",
        onClick: () => leaveMutation.mutate({ collectionId }),
        variant: "destructive",
      });
    }

    return items;
  }

  const menuItems = buildMenuItems();

  if (menuItems.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="capitalize">
          {member.role} <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            className={item.variant === "destructive" ? "text-destructive" : ""}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
