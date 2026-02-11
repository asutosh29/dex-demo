import { Search } from "./actions/search";
import { InboxButton } from "./actions/inbox";

export const HeaderActions = () => {
  return (
    <div className="flex items-center gap-2">
      <InboxButton />
      <Search />
    </div>
  );
};
