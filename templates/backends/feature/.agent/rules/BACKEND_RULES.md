# Backend Agent Directives (Spring Boot 3.4 + Java 21)

## 1. Java 21 & Encapsulation
- **Records for DTOs:** All Request/Response data transfers must use Java Records with Jakarta Validation.
- **Package-Private Visibility:** Keep Entity, Repository, and internal ServiceImpl package-private. Only Controllers and boundary DTOs are `public`.
- **Envelope Standardization:** All endpoints must wrap returned data in `ApiResponse<T>`.

## 2. Configuration & Fail-Fast
- **Zero Fallback Hardcoding:** Banned `${VAR:default}` syntax in `application.yml`. Always use pure `${VAR}`.
- **Diagnostics:** Startup diagnostics (`EnvMismatchValidator`, `DatabaseFailureAnalyzer`) ensure clear console errors when prerequisites fail.

## 3. Database & Migrations
- **Flyway:** Never alter existing versioned scripts (`V1__...`). Always add incremental migrations (`V2__...`).
