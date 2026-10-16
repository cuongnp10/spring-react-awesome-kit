# Frontend Agent Directives (React 19 + TypeScript + Shadcn UI)

## 1. Type-Safe Contract Enforcement
- **Zero Manual API Calls:** Never create ad-hoc API client files (e.g. `productApi.ts`) or use raw `axios.get('/api/...')` in features.
- **Orval CodeGen:** All API types and TanStack Query hooks must be generated via `npm run codegen` into `@/generated/api`.

## 2. Component System & Styling
- **Shadcn UI Primitives:** Always use Radix primitives and Shadcn components configured in `components.json`.
- **Forms & Validation:** Always use `react-hook-form` coupled with `zod` schemas via `@hookform/resolvers/zod`.
- **Tailwind CSS:** Use atomic utility classes with `cn()` utility (`clsx` + `tailwind-merge`).

## 3. Directory Layout
- `src/features/<feature>/`: Feature pages, local components, and state logic.
- `src/core/`: Reusable layouts, base Axios instance, global UI providers.
- `src/generated/api/`: Read-only generated API contracts (do not edit manually).
