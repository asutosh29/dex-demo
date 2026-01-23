import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  MoreVertical,
  Shield,
  Lock,
  ArrowUpDown,
  Trash2,
  Settings2,
} from "@repo/ui/icons";
import { trpc } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";
import { formatDistanceToNow } from "date-fns";
import { CollectionAccessManager } from "./collection-access-manager";

type ApiKeyMode = "full_access" | "collection_specific";

interface ApiKey {
  id: string;
  name: string | null;
  mode: ApiKeyMode;
  createdAt: string;
  expiresAt: string | null;
  lastRequest: string | null;
  grantedCollections: Array<{ id: string; title: string }>;
}

interface ApiKeysDataTableProps {
  data: ApiKey[];
}

export function ApiKeysDataTable({ data }: ApiKeysDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [manageAccessOpen, setManageAccessOpen] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState<ApiKey | null>(null);

  const utils = trpc.useUtils();

  const deleteMutation = trpc.apiKeys.delete.useMutation({
    onSuccess: () => {
      utils.apiKeys.list.invalidate();
      toast.success("API key deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete API key");
    },
  });

  const handleDelete = (apiKey: ApiKey) => {
    if (
      confirm(
        `Are you sure you want to delete "${apiKey.name}"? This action cannot be undone.`,
      )
    ) {
      deleteMutation.mutate({ keyId: apiKey.id });
    }
  };

  const handleManageAccess = (apiKey: ApiKey) => {
    setSelectedApiKey(apiKey);
    setManageAccessOpen(true);
  };

  const columns: ColumnDef<ApiKey>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.name}</p>
        </div>
      ),
    },
    {
      accessorKey: "mode",
      header: "Access",
      cell: ({ row }) => {
        const mode = row.original.mode;
        return (
          <Badge
            variant={mode === "full_access" ? "default" : "secondary"}
            className="gap-1"
          >
            {mode === "full_access" ? (
              <>
                <Shield className="h-3 w-3" />
                Full Access
              </>
            ) : (
              <>
                <Lock className="h-3 w-3" />
                Collection-Specific
              </>
            )}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value === "all" || row.getValue(id) === value;
      },
    },
    {
      accessorKey: "lastRequest",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2"
          >
            Last Used
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const lastRequest = row.original.lastRequest;
        return (
          <div className="text-sm">
            {lastRequest
              ? formatDistanceToNow(new Date(lastRequest), { addSuffix: true })
              : "-"}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.lastRequest;
        const b = rowB.original.lastRequest;
        if (!a && !b) return 0;
        if (!a) return 1;
        if (!b) return -1;
        return new Date(a).getTime() - new Date(b).getTime();
      },
    },
    {
      accessorKey: "expiresAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2"
          >
            Expires
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const expiresAt = row.original.expiresAt;
        if (!expiresAt) {
          return <div className="text-sm text-muted-foreground">Never</div>;
        }

        const isExpired = new Date(expiresAt) < new Date();
        const isExpiringSoon =
          new Date(expiresAt).getTime() - new Date().getTime() <
          7 * 24 * 60 * 60 * 1000; // 7 days

        return (
          <div className="text-sm">
            {isExpired ? (
              <Badge variant="destructive" className="text-xs">
                Expired
              </Badge>
            ) : isExpiringSoon ? (
              <Badge variant="outline" className="text-xs text-amber-600">
                {formatDistanceToNow(new Date(expiresAt), { addSuffix: true })}
              </Badge>
            ) : (
              <span className="text-muted-foreground">
                {formatDistanceToNow(new Date(expiresAt), { addSuffix: true })}
              </span>
            )}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.expiresAt;
        const b = rowB.original.expiresAt;
        if (!a && !b) return 0;
        if (!a) return 1;
        if (!b) return -1;
        return new Date(a).getTime() - new Date(b).getTime();
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const apiKey = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {apiKey.mode === "collection_specific" && (
                <DropdownMenuItem onClick={() => handleManageAccess(apiKey)}>
                  <Settings2 className="mr-2 h-4 w-4" />
                  Manage Collections
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => handleDelete(apiKey)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  const modeFilter = table.getColumn("mode");

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Access:</span>
          <Select
            value={(modeFilter?.getFilterValue() as string) ?? "all"}
            onValueChange={(value) =>
              modeFilter?.setFilterValue(value === "all" ? undefined : value)
            }
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by access" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="full_access">Full Access</SelectItem>
              <SelectItem value="collection_specific">
                Collection-Specific
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No API keys found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Collection Access Manager Dialog */}
      {selectedApiKey && (
        <CollectionAccessManager
          apiKeyId={selectedApiKey.id}
          apiKeyName={selectedApiKey.name}
          grantedCollections={selectedApiKey.grantedCollections}
          open={manageAccessOpen}
          onOpenChange={setManageAccessOpen}
        />
      )}
    </div>
  );
}
