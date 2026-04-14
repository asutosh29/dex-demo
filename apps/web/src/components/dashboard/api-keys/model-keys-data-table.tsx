import { useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
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
import { Button } from "@repo/ui/components/ui/button";
import { MoreVertical, Trash2, Edit2, ArrowUpDown } from "@repo/ui/icons";
import { trpc, type RouterOutputs } from "~/lib/trpc";
import { toast } from "@repo/ui/components/ui/sonner";
import { formatDistanceToNow } from "date-fns";
import { ModelKeysDialog } from "./model-keys-dialog";

type AiKey = RouterOutputs["aiKeys"]["list"][number];

interface ModelKeysDataTableProps {
  data: AiKey[];
}

export function ModelKeysDataTable({ data }: ModelKeysDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState<AiKey | null>(null);

  const utils = trpc.useUtils();

  const deleteMutation = trpc.aiKeys.delete.useMutation({
    onSuccess: () => {
      utils.aiKeys.list.invalidate();
      toast.success("Model key deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete model key");
    },
  });

  const handleDelete = (apiKey: AiKey) => {
    if (
      confirm(
        `Are you sure you want to delete the key for ${apiKey.provider}? This action cannot be undone.`,
      )
    ) {
      deleteMutation.mutate({ provider: apiKey.provider as any });
    }
  };

  const handleUpdate = (apiKey: AiKey) => {
    setSelectedApiKey(apiKey);
    setEditDialogOpen(true);
  };

  const columns: ColumnDef<AiKey>[] = [
    {
      accessorKey: "label",
      header: "Name",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.label || "Unnamed Key"}</p>
        </div>
      ),
    },
    {
      accessorKey: "provider",
      header: "Provider",
      cell: ({ row }) => {
        const provider = row.original.provider;
        // Capitalize the provider nicely
        const displayProvider =
          provider.charAt(0).toUpperCase() + provider.slice(1);
        return (
          <div className="font-medium text-muted-foreground">
            {displayProvider}
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2"
          >
            Last Updated
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.original.updatedAt || row.original.createdAt;
        return (
          <div className="text-sm">
            {date
              ? formatDistanceToNow(new Date(date), { addSuffix: true })
              : "-"}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.updatedAt || rowA.original.createdAt;
        const b = rowB.original.updatedAt || rowB.original.createdAt;
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
              <DropdownMenuItem onClick={() => handleUpdate(apiKey)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Update Key
              </DropdownMenuItem>
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
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="space-y-4">
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
                  No model keys found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ModelKeysDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        editingKey={selectedApiKey}
      />
    </div>
  );
}
