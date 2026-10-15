---
name: write-data-dictionary
description: Documents entity attributes, field data types, validations, and relational constraints in docs/03-modeling/data-dictionary.md.
---

# Write Data Dictionary

Maintains the system data dictionary in `docs/03-modeling/data-dictionary.md`.

## Directives
1. **File Location:** `docs/03-modeling/data-dictionary.md`
2. **Template Structure:**
   ```markdown
   ## Entity: `<EntityName>` (Table: `<table_name>`)

   | Field Name | Type | Constraints | Description & Business Rules |
   | :--- | :--- | :--- | :--- |
   | `id` | `Long` | PK, Auto | Unique primary key identifier |
   | `name` | `String` | Non-null, Max 100 | Display name, unique across organization |
   | `status` | `Enum` | `ACTIVE`, `INACTIVE` | Lifecycle status |
   | `created_at` | `Instant` | Non-null | Auto-generated audit timestamp |
   ```
