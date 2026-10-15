---
name: write-srs-spec
description: Standardizes Software Requirements Specifications (SRS), functional requirements matrices, and business rules in docs/01-srs/.
---

# Write SRS Specification

Creates structured SRS documentation files in `docs/01-srs/`.

## Directives
1. **File Location:** `docs/01-srs/<feature>-srs.md`
2. **Template Structure:**
   ```markdown
   # SRS: [Feature Name]

   ## 1. Feature Overview
   Brief summary of business value and target users.

   ## 2. Functional Requirements (FR Matrix)
   | ID | Requirement | Priority | Business Rule / Validation |
   | :--- | :--- | :--- | :--- |
   | FR-01 | Create entity record | High | Name must be unique and non-blank |
   | FR-02 | Filter entity list | Medium | Support search by keyword and status |

   ## 3. Non-Functional Constraints
   - Performance: Response time < 200ms for p95.
   - Security: Role-based authorization (`ADMIN` only).
   ```
