---
name: write-use-cases
description: Formats Use Case specifications with actor matrices, preconditions, main flows, and alternative/exception flows in docs/02-use-cases/.
---

# Write Use Case Specifications

Creates granular Use Case specifications in `docs/02-use-cases/`.

## Directives
1. **File Location:** `docs/02-use-cases/<feature>-use-cases.md`
2. **Template Structure:**
   ```markdown
   # Use Case: UC-[ID] [Use Case Title]

   * **Primary Actor:** [e.g. Registered User / Admin]
   * **Preconditions:** [e.g. User authenticated with valid JWT]
   * **Postconditions:** [e.g. Transaction recorded in PENDING state]

   ### Main Success Scenario
   1. User navigates to feature screen.
   2. User fills in required form inputs.
   3. User clicks Submit.
   4. System validates inputs and persists record.
   5. System displays success toast and updates table.

   ### Alternative & Exception Flows
   * **4a. Validation Failure:** System flags invalid fields and blocks submission.
   * **4b. Network/Server Error:** System displays friendly error banner.
   ```
