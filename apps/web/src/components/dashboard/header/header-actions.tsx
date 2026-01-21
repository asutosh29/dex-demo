import { Search } from "./actions/search";

export const HeaderActions = () => {
  return (
    <div className="flex items-center gap-1">
      <Search />
    </div>
  );
};
