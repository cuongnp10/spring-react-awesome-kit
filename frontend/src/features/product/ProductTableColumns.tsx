import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Product } from "./types";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { formatCurrency, formatDate } from "@/lib/utils";

interface GetColumnsProps {
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export function getProductColumns({
  onEdit,
  onDelete,
}: GetColumnsProps): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{product.name}</span>
            {product.description && (
              <span className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                {product.description}
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => {
        return (
          <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded text-foreground">
            {row.getValue("sku")}
          </code>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        return (
          <span className="font-semibold text-foreground">
            {formatCurrency(row.getValue("price"))}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        let variant: "success" | "warning" | "secondary" = "secondary";
        if (status === "ACTIVE") variant = "success";
        else if (status === "DRAFT") variant = "warning";

        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => {
        return (
          <span className="text-xs text-muted-foreground">
            {formatDate(row.getValue("updatedAt"))}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onEdit(product)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit Product</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={() => onDelete(product.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete Product</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
