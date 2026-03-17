import { Input } from "@repo/ui/components/ui/input";
import { Search, X } from "@repo/ui/icons";

interface MemberSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function MemberSearchInput({ value, onChange }: MemberSearchInputProps) {
  return (
    <div className="relative flex items-center pt-2">
      <Search className="absolute left-3 size-4 text-muted-foreground" />
      <Input
        placeholder="Search members or find people to invite..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-9"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
