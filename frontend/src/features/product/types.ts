export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  description?: string;
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateInput {
  name: string;
  sku: string;
  price: number;
  description?: string;
  status?: "ACTIVE" | "INACTIVE" | "DRAFT";
}

export interface ProductUpdateInput {
  name?: string;
  sku?: string;
  price?: number;
  description?: string;
  status?: "ACTIVE" | "INACTIVE" | "DRAFT";
}
