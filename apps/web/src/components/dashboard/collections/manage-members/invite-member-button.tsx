import { Button } from "@repo/ui/components/ui/button";
import { UserPlus } from "@repo/ui/icons";
import { useState, lazy, Suspense } from "react";
import { useMemberManagement } from "./member-management-context";

const AddMemberDialog = lazy(() =>
  import("./add-member-dialog").then((m) => ({ default: m.AddMemberDialog })),
);

export function InviteMemberButton() {
  const { meta } = useMemberManagement();
  const [isOpen, setIsOpen] = useState(false);

  if (!meta.canManage) return null;

  return (
    <>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setIsOpen(true)}
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Invite Member
      </Button>

      <Suspense fallback={null}>
        <AddMemberDialog open={isOpen} onOpenChange={setIsOpen} />
      </Suspense>
    </>
  );
}
