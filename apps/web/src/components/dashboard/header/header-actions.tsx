import { AddItem, Search } from "./actions";

export const HeaderActions = () => {
  return (
    <div className="flex items-center gap-1">
      <Search />
      <AddItem />
    </div>
  );
};
