# Backend Service (Spring Boot 3.4 + Java 21 LTS)

## Architecture Overview
This backend follows a **Modular Monolith / Package-by-Feature (Vertical Slice)** design pattern.

```
src/main/java/com/awesome/kit/
├── core/                           # Shared infrastructure & platform base
│   ├── base/                       # BaseEntity, BaseRepository, BaseService, BaseController
│   ├── config/                     # OpenAPI, Security, WebMvc, Flyway configs
│   ├── diagnostics/                # Startup FailureAnalyzers (EnvMismatch, Database, Flyway)
│   ├── exception/                  # GlobalExceptionHandler, BusinessException
│   ├── response/                   # ApiResponse<T>, PageResponse<T>
│   └── security/                   # Stateless JWT, RBAC, OAuth2 support
└── modules/                        # All business domain slices live here
    ├── auth/                       # User authentication, registration, token refresh
    └── product/                    # Reference CRUD implementation (Entity, DTOs, Repository, Service, Controller)
```

## Prerequisites
* Java 21 LTS JDK
* Maven 3.9+
* Docker & Docker Compose (for local PostgreSQL & Mailpit)
