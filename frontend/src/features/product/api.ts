import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/core/api/client";
import { ApiResponse, PageResponse } from "@/core/api/types";
import { mockProductApi } from "@/core/api/mock-data";
import { Product, ProductCreateInput, ProductUpdateInput } from "./types";

const PRODUCTS_QUERY_KEY = ["products"];

// Fetch paginated products
export function useProducts(page = 0, size = 10, search = "") {
  return useQuery<PageResponse<Product>>({
    queryKey: [...PRODUCTS_QUERY_KEY, { page, size, search }],
    queryFn: async () => {
      // If forced mock mode
      if (import.meta.env.VITE_USE_MOCK === "true") {
        return mockProductApi.getProducts(page, size, search);
      }

      try {
        const res = await apiClient.get<ApiResponse<PageResponse<Product>>>("/api/v1/products", {
          params: { page, size, search: search || undefined },
        });
        return res.data.data;
      } catch (err) {
        console.warn("Backend not available, falling back to local mock data.", err);
        return mockProductApi.getProducts(page, size, search);
      }
    },
  });
}

// Fetch single product by ID
export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    queryFn: async () => {
      if (import.meta.env.VITE_USE_MOCK === "true") {
        return mockProductApi.getProductById(id);
      }
      try {
        const res = await apiClient.get<ApiResponse<Product>>(`/api/v1/products/${id}`);
        return res.data.data;
      } catch {
        return mockProductApi.getProductById(id);
      }
    },
    enabled: Boolean(id),
  });
}

// Create product mutation
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ProductCreateInput) => {
      if (import.meta.env.VITE_USE_MOCK === "true") {
        return mockProductApi.createProduct(input as any);
      }
      try {
        const res = await apiClient.post<ApiResponse<Product>>("/api/v1/products", input);
        return res.data.data;
      } catch {
        // Fallback to local mock store
        return mockProductApi.createProduct(input as any);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      toast.success("Product created successfully");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to create product");
    },
  });
}

// Update product mutation
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: number; input: ProductUpdateInput }) => {
      if (import.meta.env.VITE_USE_MOCK === "true") {
        return mockProductApi.updateProduct(id, input as any);
      }
      try {
        const res = await apiClient.put<ApiResponse<Product>>(`/api/v1/products/${id}`, input);
        return res.data.data;
      } catch {
        return mockProductApi.updateProduct(id, input as any);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      toast.success("Product updated successfully");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to update product");
    },
  });
}

// Delete product mutation
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      if (import.meta.env.VITE_USE_MOCK === "true") {
        mockProductApi.deleteProduct(id);
        return;
      }
      try {
        await apiClient.delete<ApiResponse<void>>(`/api/v1/products/${id}`);
      } catch {
        mockProductApi.deleteProduct(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      toast.success("Product deleted successfully");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to delete product");
    },
  });
}
