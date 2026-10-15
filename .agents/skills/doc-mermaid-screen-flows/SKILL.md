---
name: mermaid-screen-flows
description: Generates crisp orthogonal UX sitemaps and screen flow diagrams with color-coded public, secure, and modal views.
---

# Mermaid Screen Flow Diagrams

Generates UX Sitemaps and Screen Flow Diagrams mapping page navigation structures.

## Directives
1. **Orthogonal Routing:**
   Use the `elk` layout engine with `curve: "step"` for clean 90-degree lines:
   ```mermaid
   %%{init: {"flowchart": {"defaultRenderer": "elk", "curve": "step", "nodeSpacing": 50, "rankSpacing": 70}}}%%
   flowchart LR
       HomePage[Home Page]:::publicMain --> LoginPage[Login Page]:::publicSub
       LoginPage --> Dashboard[Admin Dashboard]:::secure
       Dashboard --> ExportData([Export Report]):::oval

       classDef publicMain fill:#ffe6cc,stroke:#000,stroke-width:1px,color:#0000ff;
       classDef publicSub fill:#ffffff,stroke:#000,stroke-width:1px,color:#0000ff;
       classDef secure fill:#ffffff,stroke:#000,stroke-width:1px,color:#000000;
       classDef oval fill:#ffffff,stroke:#000,stroke-width:1px,color:#000000;
   ```
2. **Subgraphs for Multi-panel Views:**
   Use subgraphs with white backgrounds to group panels contained within a single screen.
