# Documentation Domain Directives (SSOT & Modeling)

## 1. Documentation as Single Source of Truth (SSOT)
- Always verify or update the relevant document in `docs/` before initiating frontend or backend code generation.
- Never introduce new domain entities or API parameters without updating `01-srs/` and `03-modeling/erd.md`.

## 2. Diagram Notation Standards
- **Conceptual ERD:** Always use Chen's notation (Rectangles for Entities, Diamonds for Relationships, Ovals for Attributes) via Mermaid.
- **Screen Navigation:** Use orthogonal/step layout (`elk step` / `flowchart TD`) for clean readability.
- **Sequence Diagrams:** Keep participants focused: Client, Backend Controller, Service, Database.
