import { AddItem, Search, ManageMembers } from "./actions";

export const HeaderActions = () => {
  return (
    <div className="flex items-center gap-1">
      <Search />
      <ManageMembers />
      <AddItem />
    </div>
  );
};
