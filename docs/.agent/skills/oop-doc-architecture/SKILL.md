---
name: oop-doc-architecture
description: Directives for organizing software documentation using Role-Driven (BA, SA, PM) and OOP Domain Architecture.
---

# OOP & Role-Driven Documentation Directives

## Directives (Content First)

1. **Role-Driven Ownership:**
   - **Business Analyst (BA):** Owns `00-product/`, `01-logic/`, `02-design/`, and `04-domains/`. Ensures business clarity without leaking framework/DB engine implementation details.
   - **Tech Lead / Solution Architect (SA):** Owns `03-technical/` (System architecture, Context, 3rd parties) and `05-api-specs/` (OpenAPI contracts).
   - **DevOps Engineer:** Owns `06-infrastructure/` (Deployment guide, Docker, CI/CD). Never create `env-matrix.md` (root `.env.example` is SSOT).
   - **Project Manager (PM):** Owns `07-planning/` (Team roles/RACI, deadlines/milestones, epic breakdown). Focuses strictly on core items; micro-tasks belong in Jira/Linear boards.
2. **Logic & Diagram Mapping (1-1):** In `01-logic/`, strictly separate `defines/` (`.md`) from `diagrams/` (`.mmd`). Keep identical numeric prefixes (e.g., `01-usecase.md` <-> `01-usecase.mmd`). Never inline raw Mermaid code blocks inside Markdown files.
3. **OOP Domain Architecture (04-domains):**
   - **Interface First (Parent Spec):** Define standard contracts, shared entity schemas, lifecycle states, and external API interfaces in `04-domains/<domain>/interface_<domain>.md`.
   - **Child Implementation (Inheritance):** Specific business flows in `04-domains/<domain>/<feature>.md` inherit from the parent interface. Document only specialized business logic, overrides, and edge cases.
4. **Single Source of Truth (SSOT):** Strictly ban duplicate schema definitions, status enums, or business formulas across files. For complete directory specs and templates, refer to [DOCUMENTATION_STANDARDS.md]
5. **Bidirectional Traceability:** Every requirement must trace from `00-product/` -> `01-logic/` -> `02-design/` -> `03-technical/` -> `04-domains/` -> `05-api-specs/`.

---

## Directory Summary

```text
docs/
├── README.md                      # [Root Index] System roadmap and domain index
├── DOCUMENTATION_STANDARDS.md     # [Authoritative Standard] Detailed specification & templates
├── 00-product/                    # [BA] Product Inception, Personas, Business Rules
├── 01-logic/                      # [BA] Logic defines/ (.md) & diagrams/ (.mmd) mapped 1-1
├── 02-design/                     # [BA/UI-UX] DESIGN.md tokens & site-structure.md
├── 03-technical/                  # [Tech Lead/SA] System context, architecture, 3rd-party services
├── 04-domains/                    # [BA & Dev] OOP Bounded Contexts (interface_<domain>.md + child specs)
├── 05-api-specs/                  # [Tech Lead/SA] OpenAPI 3.0 specs & API guidelines
├── 06-infrastructure/             # [DevOps] Build & Deployment guide (no env-matrix.md)
└── 07-planning/                   # [PM] Team roles/RACI, milestones, high-level epics
```

---

## Agent Execution Workflow

1. **Ingest:** Start with `docs/DOCUMENTATION_STANDARDS.md` -> traverse to target domain interface -> read child spec.
2. **Modify:** Update specific child implementation first; propagate contract/API changes up to the parent interface.
3. **Extend:** When adding a feature, create a new child document in the appropriate domain folder and register it in the parent interface.
