---
name: mermaid-chen-erd
description: Generates academic/conceptual Entity-Relationship Diagrams (Chen's notation) using Mermaid flowcharts with rectangles and diamonds.
---

# Mermaid Chen ERD (Conceptual)

Generates classic Conceptual ER Diagrams with Diamonds and Rectangles instead of database table schemas.

## Directives
1. **Flowchart Syntax (Not erDiagram):**
   Mermaid's native `erDiagram` creates database tables. For Chen notation, you MUST use `flowchart LR` or `flowchart TD`.
2. **Node Shapes & Undirected Edges:**
   - Entities: Rectangles `[Entity Name]`
   - Relationships: Diamonds `{Relationship Name}`
   - Connections: Undirected lines `---` with cardinality labels (`|1|`, `|M|`, `|N|`). Never use arrows (`-->`).
3. **Template:**
   ```mermaid
   %%{init: {"flowchart": {"curve": "linear"}}}%%
   flowchart LR
       E1[User]:::entity
       E2[Order]:::entity
       R1{places}:::relation

       E1 ---|1| R1
       R1 ---|M| E2

       classDef entity fill:#5b9bd5,stroke:#41719c,stroke-width:2px,color:#fff;
       classDef relation fill:#5b9bd5,stroke:#41719c,stroke-width:2px,color:#fff;
   ```
