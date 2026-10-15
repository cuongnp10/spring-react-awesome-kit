---
name: mermaid-sequence-diagrams
description: Generates clean Mermaid sequence diagrams for API requests, authentication, and 3rd-party webhook callbacks.
---

# Mermaid Sequence Diagrams

Generates interaction diagrams tracing requests across Frontend, Controller, Service, Database, and External Gateways.

## Directives
1. **Participant Declaration:**
   Always declare participants explicitly with descriptive aliases:
   ```mermaid
   sequenceDiagram
       autonumber
       actor User
       participant FE as React Client
       participant BE as Spring Controller
       participant DB as PostgreSQL
       participant GW as Payment Gateway

       User->>FE: Click "Pay with VNPay"
       FE->>BE: POST /api/v1/payments/create-url
       BE->>DB: Save PENDING transaction
       BE-->>FE: Return paymentUrl
       FE->>GW: Redirect user to Gateway
   ```
2. **Conventions:**
   - Use `autonumber` for step tracing.
   - Use solid arrows (`->>`) for sync calls and dashed arrows (`-->>`) for responses.
   - Use `alt`/`else` blocks for success vs failure branches.
