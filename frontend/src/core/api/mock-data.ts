import { PageResponse } from "./types";

export interface MockProduct {
  id: number;
  name: string;
  sku: string;
  price: number;
  description: string;
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 1,
    name: "MacBook Pro 16\" M3 Max",
    sku: "MBP-16-M3M-01",
    price: 3499.0,
    description: "Apple M3 Max chip with 16-core CPU, 40-core GPU, 48GB Unified Memory, 1TB SSD.",
    status: "ACTIVE",
    createdAt: "2026-01-10T08:30:00Z",
    updatedAt: "2026-02-15T10:15:00Z",
  },
  {
    id: 2,
    name: "Dell UltraSharp 32\" 6K Monitor",
    sku: "DEL-U3224KB-02",
    price: 2199.99,
    description: "6144 x 3456 resolution IPS Black technology with 4K HDR webcam and Thunderbolt 4 hub.",
    status: "ACTIVE",
    createdAt: "2026-01-12T09:00:00Z",
    updatedAt: "2026-02-10T14:20:00Z",
  },
  {
    id: 3,
    name: "Keychron Q1 Pro Wireless Custom Keyboard",
    sku: "KC-Q1P-RGB-03",
    price: 199.0,
    description: "75% layout QMK/VIA wireless mechanical keyboard with CNC aluminum body and hot-swap sockets.",
    status: "ACTIVE",
    createdAt: "2026-01-15T11:20:00Z",
    updatedAt: "2026-03-01T09:45:00Z",
  },
  {
    id: 4,
    name: "Logitech MX Master 3S Mouse",
    sku: "LOG-MXM3S-04",
    price: 99.99,
    description: "Quiet clicks with 8K DPI tracking on glass, MagSpeed scrolling, Bluetooth and USB receiver.",
    status: "ACTIVE",
    createdAt: "2026-01-20T13:40:00Z",
    updatedAt: "2026-02-28T16:00:00Z",
  },
  {
    id: 5,
    name: "Sony WH-1000XM5 Wireless Headphones",
    sku: "SNY-WHXM5-05",
    price: 398.0,
    description: "Industry Leading Noise Canceling with 2 processors, 8 microphones, and LDAC high-res audio.",
    status: "ACTIVE",
    createdAt: "2026-02-01T15:10:00Z",
    updatedAt: "2026-03-05T11:30:00Z",
  },
  {
    id: 6,
    name: "Herman Miller Embody Gaming Chair",
    sku: "HM-EMB-CYAN-06",
    price: 1795.0,
    description: "Ergonomic chair engineered with copper-infused foam for cooling and Pixelated Support.",
    status: "DRAFT",
    createdAt: "2026-02-05T16:45:00Z",
    updatedAt: "2026-03-08T18:00:00Z",
  },
  {
    id: 7,
    name: "CalDigit TS4 Thunderbolt 4 Station",
    sku: "CD-TS4-HUB-07",
    price: 399.95,
    description: "18 ports including 2.5GbE, 98W charging, SD 4.0 card reader, and triple display support.",
    status: "INACTIVE",
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-03-10T08:15:00Z",
  },
];

// In-memory mock storage so CRUD works dynamically in browser session
let mockProductsStore: MockProduct[] = [...INITIAL_MOCK_PRODUCTS];

export const mockProductApi = {
  getProducts: (page = 0, size = 10, search = ""): PageResponse<MockProduct> => {
    let filtered = [...mockProductsStore];
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    const totalElements = filtered.length;
    const totalPages = Math.ceil(totalElements / size) || 1;
    const start = page * size;
    const items = filtered.slice(start, start + size);

    return {
      items,
      page,
      size,
      totalElements,
      totalPages,
      isFirst: page === 0,
      isLast: page >= totalPages - 1,
    };
  },

  getProductById: (id: number): MockProduct => {
    const found = mockProductsStore.find((p) => p.id === id);
    if (!found) throw new Error(`Product not found with id: ${id}`);
    return found;
  },

  createProduct: (input: Omit<MockProduct, "id" | "createdAt" | "updatedAt">): MockProduct => {
    const newId = Math.max(...mockProductsStore.map((p) => p.id), 0) + 1;
    const now = new Date().toISOString();
    const created: MockProduct = {
      id: newId,
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    mockProductsStore = [created, ...mockProductsStore];
    return created;
  },

  updateProduct: (id: number, input: Partial<Omit<MockProduct, "id" | "createdAt">>): MockProduct => {
    const idx = mockProductsStore.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Product not found with id: ${id}`);
    const updated: MockProduct = {
      ...mockProductsStore[idx],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    mockProductsStore[idx] = updated;
    return updated;
  },

  deleteProduct: (id: number): void => {
    mockProductsStore = mockProductsStore.filter((p) => p.id !== id);
  },
};
