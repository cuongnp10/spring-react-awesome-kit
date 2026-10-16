---
name: domain-vs-global-isolation
description: Enforces separation between Root Global Skills and domain subfolder .agent skills.
---

# Domain vs Global Skill Isolation

## Context Rules
- **Root `.agents/skills/`:** Repository-wide orchestration only. No framework-specific or domain-specific code skills.
- **Domain Subfolders (`frontend/.agent/`, `templates/backends/*/.agent/`, `docs/.agent/`, `mobile/.agent/`):** Carry their own local `.agent/` folder.
- When working inside a domain directory, only consume local `.agent/` skills and rules. Never leak domain logic into root.
