# Rule: Documentation is the Single Source of Truth (SSOT)

## 1. Core Principle
* The `docs/` directory (`00-product-definition/`, `01-srs/`, `02-use-cases/`, `03-modeling/`, `04-api-specs/`) is the highest and only Source of Truth for the entire system.
* **Every code change (Backend & Frontend) must be verified against `docs/` before implementation.**
* Agents and developers must NEVER guess, assume business logic, or write undocumented code.

## 2. Decision Tree When Code Change is Requested

```
                 Incoming Request / Code Change
                               │
               Is it already defined in `docs/`?
                               │
                ┌──────────────┴──────────────┐
               YES                            NO
                │                              │
         Proceed to Code          Is the request direct & clear?
                                               │
                                 ┌─────────────┴─────────────┐
                                YES                          NO
                                 │                           │
                          1. Update `docs/`          1. STOP & Ask User
                          2. Then write code            (provide proposals)
                                                     2. Wait for confirmation
                                                     3. Update `docs/`
                                                     4. Then write code
```

### Case 1: Direct & Unambiguous Request
* The user clearly specifies what needs to be added/changed, but it is not yet in `docs/`.
* **Action:**
  1. Update the appropriate documentation file in `docs/` first (SRS, Use Cases, ERD, or API specs).
  2. Implement the code strictly according to the updated documentation.

### Case 2: Indirect, Vague, or Ambiguous Request
* The user asks for a feature or adjustment that has multiple interpretations or lacks specifications.
* **Action:**
  1. **STOP immediately. Do NOT write any code.**
  2. Prompt the user with specific questions and recommended architectural/business options.
  3. Once confirmed, update the relevant files in `docs/`.
  4. Only then proceed to code implementation.
