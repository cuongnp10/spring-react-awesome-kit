# AI AGENT EXECUTION RULES & ARCHITECTURAL CONSTRAINTS

This document specifies mandatory execution rules, architectural patterns, and workflows for any AI Agent working in this repository or in projects generated from this kit.

---

## 1. Prime Directives (Non-Negotiable)

### 1.1. Documentation is the Single Source of Truth (SSOT)
* Detailed protocol: [docs-source-of-truth.md](docs-source-of-truth.md).
* **Before writing or modifying any code**, the agent MUST verify that the requirement is explicitly defined in `docs/` (`00-product-definition/`, `01-srs/`, `02-use-cases/`, `03-modeling/`, `04-api-specs/`).
* **If NOT defined in `docs/`:**
  * **Direct & clear request:** Update `docs/` first, then implement code.
  * **Indirect / ambiguous request:** STOP immediately, propose architectural/business options to the user, wait for confirmation, update `docs/`, and only then write code.
* **NEVER code ahead of documentation.**

### 1.2. Zero Hardcoding & Strict Fail-Fast Environment Variables
* Detailed protocol: [strict-env-configuration.md](strict-env-configuration.md).
* All variable configuration (database, server port, secrets, JWT keys, 3rd-party services, mail, URLs) must reside in `.env`.
* **ABSOLUTE BAN on colon `:` fallback syntax:** Never use `${VAR:default}` in Spring Boot YAML or code fallback `env.VAR || 'default'`.
* **Fail-Fast:** All references must be strictly `${VAR}`. If `.env` is missing or variable is omitted, the application MUST crash immediately on startup to prevent hidden configuration bugs.

### 1.3. Startup Diagnostics & Failure Recovery
* Detailed protocol: [startup-diagnostics-and-troubleshooting.md](startup-diagnostics-and-troubleshooting.md).
* When diagnosing run errors (missing `.env` keys, DB unreachable, Flyway checksum mismatch), follow the prescribed resolution steps.
* All error messages and logs must be pure English, concise, and free of icons or emojis.

### 1.4. Conversational Protocol (No Redundant Summaries)
* **DO NOT summarize completed steps or re-explain what you just coded** unless the user explicitly asks for a summary.
* Keep chat responses minimal and pragmatic.
* Always end the turn with a focused, actionable question regarding the next step instead of executing end-to-end blindly.

### 1.5. No Unprompted Test Execution
* Detailed protocol: [no-unprompted-tests.md](no-unprompted-tests.md).
* **NEVER execute test suites** (`mvn test`, `npm test`, `vitest`, `playwright`) unless explicitly requested by the user.
* For code and type verification, use non-executing checks only: `mvn test-compile` (backend) or `npx tsc --noEmit` / `npm run build` (frontend).

---

## 2. Core Architectural Pillars

1. **Zero Boilerplate & Minimized Context Churn:** Never read or modify 10+ files for a simple task. Every new business feature must be confined to 1–2 files within its vertical slice.
2. **Modular Monolith / Package-by-Feature (Vertical Slice):** Technical layer-based folder structuring (`controllers/`, `services/`, `repositories/` at root) is **STRICTLY FORBIDDEN**. All artifacts belonging to a feature live together in `modules/<feature-name>/`.
3. **Type-Safe Contract & Automated CodeGen:** Never write manual Axios endpoints or TypeScript DTO interfaces on the Frontend. All API models and TanStack Query hooks must be generated via **OpenAPI + Orval**.
4. **Leverage Base Classes & Platform Kits:** Never rewrite generic CRUD logic, JWT filters, OAuth2, or payment gateways from scratch.

---

## 3. Directory Conventions

### Backend (Spring Boot 3.4 + Java 21)
```
backend/src/main/java/com/awesome/kit/
├── core/                           # Shared infrastructure & base classes
│   ├── base/                       # BaseEntity, BaseRepository, BaseService, BaseController
│   ├── config/                     # OpenAPI, Security, WebMvc, Flyway
│   ├── exception/                  # GlobalExceptionHandler, BusinessException
│   ├── response/                   # ApiResponse<T>, PageResponse<T>
│   └── security/                   # JWT filters, RBAC, OAuth2 support
└── modules/                        # BUSINESS VERTICAL SLICES
    ├── auth/                       # Auth module
    └── <feature>/                  # Feature slice (e.g. product)
        ├── Product.java            # Entity (extends BaseEntity)
        ├── ProductDto.java         # Java Records (Request / Response)
        ├── ProductRepository.java  # Package-private: extends BaseRepository
        ├── ProductService.java     # Extends BaseService (override only custom logic)
        └── ProductController.java  # Extends BaseController (pure CRUD requires NO code)
```

### Frontend (React + TypeScript + Vite)
```
frontend/src/
├── core/                           # Shared UI, Providers, Base Axios
│   ├── components/                 # DataTable, FormBuilder, Modal, Layout, UI primitives
│   ├── hooks/                      # useAuth, useDebounce, etc.
│   └── api/                        # Axios instance configured with JWT & error handlers
├── generated/                      # CODE AUTO-GENERATED BY ORVAL (READ-ONLY)
│   └── api/                        # TypeScript types, endpoints, TanStack Query hooks
└── features/                       # Independent feature pages & components
    ├── auth/
    └── <feature>/                  # e.g. product/
        ├── components/             # Feature-specific components
        └── ProductPage.tsx         # Page container consuming generated hooks
```

---

## 4. Strict Coding Conventions

### Backend (Spring Boot)
1. **Encapsulation:**
   * Use Java default `package-private` (no `public` keyword) for internal entities, repositories, and service implementations.
   * Only mark `public` on Controllers, external DTO records, or cross-module interfaces.
2. **DTOs & Serialization:**
   * **Mandatory Java Records (Java 21):** Never use standard classes with Lombok `@Getter`/`@Setter` for DTOs.
   * Enforce Jakarta Validation annotations (`@NotNull`, `@NotBlank`, `@Size`, `@Min`).
3. **Unified Response Envelope:**
   * All API endpoints must return `ApiResponse<T>`:
     ```json
     {
       "success": true,
       "message": "Operation successful",
       "data": { ... },
       "timestamp": "2026-10-13T00:00:00Z"
     }
     ```
4. **CRUD Logic:**
   * Inherit from `BaseEntity`, `BaseRepository<T, ID>`, `BaseService<T, DTO, ID>`, and `BaseController<T, DTO, ID>`.
   * For standard CRUD, do **NOT** rewrite save/update/delete/findById methods.
   * Support dynamic filtering and pagination via `JpaSpecificationExecutor`.

### Frontend (React + TypeScript)
1. **Zero Manual API Clients:**
   * NEVER create manual `api.ts` files or write raw `axios.get('/api/...')`.
   * All API hooks must be imported from `@/generated/api`.
2. **Form Handling:**
   * Enforce `react-hook-form` paired with `zod` schema validation (`zodResolver`).
3. **Component Reusability:**
   * Utilize shared `@/core/components/DataTable` and form primitives rather than rewriting table/pagination code.

---

## 5. Feature Development Step-by-Step Workflow (Doc -> UI -> API)

When requested to create or update a business feature, the Agent MUST execute in this exact sequence:

* **Step 0 (SSOT Verification):** Verify requirement against `docs/`. If missing, update docs first (or clarify if ambiguous).
* **Step 1 (Frontend UI First):** 
  - Build UI screens, components, tables, and forms in `frontend/src/features/<feature>/` based on `docs/`.
  - Use mock data or interface contracts to validate layout, user interaction, and aesthetics early.
* **Step 2 (Backend API Implementation):**
  - Define Entity in `backend/src/main/java/.../modules/<feature>/` extending `BaseEntity`.
  - Define Request/Response DTOs using Java Records with Jakarta Validation.
  - Define Repository extending `BaseRepository<Entity, ID>`.
  - Inherit `BaseService` and `BaseController`. Only add business-specific methods.
* **Step 3 (Automated Contract Sync & Integration):**
  - Synchronize Frontend Contract via CodeGen:
    ```bash
    npm run codegen
    ```
  - Connect the generated TanStack Query hooks in `@/generated/api` to the UI components built in Step 1, replacing mock state.

---

## 6. Absolute Anti-Patterns (Violations)
* ❌ NEVER code without verifying or updating `docs/` first.
* ❌ NEVER use fallback colon syntax `${VAR:default}` in configs or silent fallbacks in code.
* ❌ NEVER create files in technical root folders like `controllers/` or `services/`.
* ❌ NEVER scan the entire project when working on a single module.
* ❌ NEVER recreate integrations from scratch (always use `integrations/`).
* ❌ NEVER create manual TypeScript interfaces for API contracts that exist in OpenAPI.
