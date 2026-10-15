# Frontend Client (React 18 + TypeScript + Vite + Shadcn UI)

## Architecture Overview
This frontend client is a production-grade enterprise single-page application built with:
* **Vite + React 18 + TypeScript**: Lightning-fast HMR and compile-time type safety.
* **Shadcn UI (Zinc Palette)**: Accessible Radix UI primitives, Tailwind CSS v3, and Lucide Icons.
* **React Router DOM v6**: Nested routing with `AuthGuard`, `AppLayout`, and breadcrumb state.
* **Zustand v5 (Persist)**: Client state management for auth credentials (`useAuthStore`) and theme (`useThemeStore`).
* **TanStack Query v5 + Orval**: Contract-first API generation from OpenAPI 3.0 specification.
* **TanStack Table v8**: Reusable, customizable `DataTable` with search, sorting, and pagination.
* **Demo / Mock Fallback**: Runs out of the box (`npm run dev`) with in-memory realistic seed catalog, with seamless live API fallback.

```
src/
├── core/
│   ├── api/                     # Axios instance, types, mock seed data, custom Orval mutator
│   ├── components/
│   │   ├── data-table/          # Generic DataTable, Pagination
│   │   ├── layout/              # AppLayout, Sidebar, Header
│   │   └── ui/                  # Shadcn UI primitives (Button, Card, Dialog, Select, etc.)
│   └── theme/                   # Theme provider, Theme toggle, Zustand theme store
├── features/
│   ├── auth/                    # AuthGuard, LoginPage, auth-store
│   ├── dashboard/               # DashboardPage (Architecture overview, KPI cards)
│   └── product/                 # Reference feature (ProductPage, ProductDialog, ProductTableColumns, api)
├── generated/
│   └── api/                     # Orval auto-generated models & TanStack Query hooks (READ-ONLY)
├── lib/
│   └── utils.ts                 # cn, formatCurrency, formatDate
├── routes/                      # React Router v6 routing tree
├── App.tsx                      # QueryClientProvider, RouterProvider, Toaster
└── main.tsx                     # React root mount
```

## Available Scripts

```bash
# Start Vite development server (http://localhost:3000)
npm run dev

# Compile TypeScript and bundle for production
npm run build

# Preview production build locally
npm run preview

# Regenerate API models and TanStack Query hooks from OpenAPI spec
npm run api:generate
```

## Environment Variables (`.env`)

```ini
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:8080

# Mock Mode (false: live API with auto-fallback to local mock data; true: forced mock)
VITE_USE_MOCK=false
```
