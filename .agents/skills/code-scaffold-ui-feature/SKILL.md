---
name: scaffold-ui-feature
description: Builds the initial React frontend UI (screens, tables, forms, modals) based on specifications before backend API implementation.
---

# Scaffold UI Feature (UI-First)

Focuses solely on creating the visual and interactive UI layer in `frontend/src/features/<feature>/` matching requirements in `docs/`.

## Directives
1. **Directory Convention:**
   ```
   frontend/src/features/<feature>/
   ├── components/
   │   ├── <Feature>Table.tsx      # Uses @/core/components/DataTable
   │   ├── <Feature>Form.tsx       # react-hook-form + zod schema validation
   │   └── <Feature>Modal.tsx      # Create/Edit dialog wrapper
   └── <Feature>Page.tsx           # Page container with breadcrumb and layout
   ```
2. **Mock State:**
   - Use local mock state or mock arrays initially to allow immediate visual testing of tables, pagination, filters, and forms.
   - Do NOT write manual Axios endpoints. CodeGen will connect real APIs later.
3. **Design & UX:**
   - Use Shadcn UI primitives, Lucide icons, and Tailwind styling.
   - Provide toast notifications on simulated submit.
