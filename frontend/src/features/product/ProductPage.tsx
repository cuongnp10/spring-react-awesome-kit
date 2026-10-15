import { useState, useMemo } from "react";
import { Plus, Package, Layers, DollarSign } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { DataTable } from "@/core/components/data-table/DataTable";
import { ProductDialog } from "./ProductDialog";
import { getProductColumns } from "./ProductTableColumns";
import { Product } from "./types";
import { useProducts, useDeleteProduct } from "./api";
import { formatCurrency } from "@/lib/utils";

export function ProductPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const { data, isLoading } = useProducts(page, pageSize, search);
  const deleteProduct = useDeleteProduct();

  const products = data?.items || [];
  const totalElements = data?.totalElements || 0;

  // Quick stats calculation
  const stats = useMemo(() => {
    const total = totalElements;
    const active = products.filter((p) => p.status === "ACTIVE").length;
    const avgPrice =
      products.length > 0
        ? products.reduce((acc, p) => acc + Number(p.price), 0) / products.length
        : 0;

    return { total, active, avgPrice };
  }, [products, totalElements]);

  const handleCreate = () => {
    setProductToEdit(null);
    setDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct.mutateAsync(id);
    }
  };

  const columns = useMemo(
    () => getProductColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    []
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage your hardware inventory, pricing, and catalog statuses
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          <span>New Product</span>
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Synchronized with Spring Boot API
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active In Catalog</CardTitle>
            <Layers className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Live and available for purchase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Unit Price</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.avgPrice)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on loaded inventory
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="p-6">
        <DataTable
          columns={columns}
          data={products}
          isLoading={isLoading}
          totalElements={totalElements}
          searchPlaceholder="Search products by name, SKU or description..."
        />
      </Card>

      {/* Product Form Dialog */}
      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        productToEdit={productToEdit}
      />
    </div>
  );
}
