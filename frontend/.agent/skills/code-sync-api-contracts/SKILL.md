---
name: sync-api-contracts
description: Generates TypeScript DTO models and TanStack Query hooks via OpenAPI + Orval, and connects them to the Frontend UI.
---

# Sync API Contracts (OpenAPI & Orval)

Focuses solely on contract generation and wiring generated query/mutation hooks to Frontend components.

## Directives
1. **CodeGen Execution:**
   Run from the `frontend/` directory:
   ```bash
   npm run codegen
   ```
   Generated artifacts will update automatically in `frontend/src/generated/api/`.

2. **UI Integration:**
   In `frontend/src/features/<feature>/<Feature>Page.tsx`:
   * Replace mock states with generated hooks:
     - `useGet<Feature>List({ page, size, sort })`
     - `useCreate<Feature>()`
     - `useUpdate<Feature>()`
     - `useDelete<Feature>()`
   * Invalidate query cache upon successful mutation to auto-refetch the table.
