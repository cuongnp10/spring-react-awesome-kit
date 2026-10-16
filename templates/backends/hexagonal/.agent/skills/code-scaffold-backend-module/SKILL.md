---
name: scaffold-backend-module
description: Generates the Spring Boot 3.4 vertical slice (Entity, Java 21 Records DTO, Repository, Service, Controller) extending Base classes.
---

# Scaffold Backend Module

Focuses solely on implementing the Spring Boot vertical slice in `backend/src/main/java/com/awesome/kit/modules/<feature>/`.

## Directives
1. **Vertical Slice Files:**
   * `<Feature>.java`: Entity extending `BaseEntity` (provides `id`, `createdAt`, `updatedAt`, `isDeleted`). Package-private.
   * `<Feature>Dto.java`: Request/Response Java 21 Records with Jakarta Validation (`@NotBlank`, `@NotNull`, `@Size`).
   * `<Feature>Repository.java`: Package-private interface extending `BaseRepository<<Feature>, Long>`.
   * `<Feature>Service.java`: Extends `BaseService<<Feature>, <Feature>Dto, Long>`. Override only custom domain logic.
   * `<Feature>Controller.java`: Marked `@RestController`, `@RequestMapping("/api/v1/<features>")`, `@Tag(name = "<Feature>")`. Extends `BaseController<<Feature>, <Feature>Dto, Long>`.
2. **Encapsulation & Envelope:**
   * Keep Entity, Repository, and Service implementation package-private (no `public`).
   * Controller endpoints must return `ApiResponse<T>`. Pure CRUD requires zero method overrides.
