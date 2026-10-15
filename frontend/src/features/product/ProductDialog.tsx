import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Product, ProductCreateInput } from "./types";
import { useCreateProduct, useUpdateProduct } from "./api";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(255),
  sku: z.string().min(1, "SKU is required").max(100),
  price: z.coerce.number().positive("Price must be greater than zero"),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productToEdit?: Product | null;
}

export function ProductDialog({
  open,
  onOpenChange,
  productToEdit,
}: ProductDialogProps) {
  const isEditing = Boolean(productToEdit);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: 0,
      description: "",
      status: "ACTIVE",
    },
  });

  const selectedStatus = watch("status");

  useEffect(() => {
    if (productToEdit) {
      reset({
        name: productToEdit.name,
        sku: productToEdit.sku,
        price: productToEdit.price,
        description: productToEdit.description || "",
        status: productToEdit.status,
      });
    } else {
      reset({
        name: "",
        sku: "",
        price: 0,
        description: "",
        status: "ACTIVE",
      });
    }
  }, [productToEdit, reset, open]);

  const onSubmit = async (values: ProductFormValues) => {
    if (isEditing && productToEdit) {
      await updateProduct.mutateAsync({
        id: productToEdit.id,
        input: values,
      });
    } else {
      await createProduct.mutateAsync(values as ProductCreateInput);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Product" : "Create Product"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update product information in the system."
                : "Fill in the product details to publish to the catalog."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                placeholder="e.g. MacBook Pro 16 M3 Max"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* SKU and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="sku">SKU Code *</Label>
                <Input
                  id="sku"
                  placeholder="e.g. MBP-16-M3M"
                  {...register("sku")}
                />
                {errors.sku && (
                  <p className="text-xs text-destructive">{errors.sku.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="text-xs text-destructive">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select
                value={selectedStatus}
                onValueChange={(val: "ACTIVE" | "INACTIVE" | "DRAFT") =>
                  setValue("status", val)
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">ACTIVE (Published)</SelectItem>
                  <SelectItem value="DRAFT">DRAFT (Under Review)</SelectItem>
                  <SelectItem value="INACTIVE">INACTIVE (Hidden)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                rows={3}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Brief technical specifications and notes..."
                {...register("description")}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || createProduct.isPending || updateProduct.isPending}
            >
              {isSubmitting || createProduct.isPending || updateProduct.isPending
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
