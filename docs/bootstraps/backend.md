# Backend Bootstrap Checklist (Spring Boot 3.4 + Java 21)

> Execute during project initialization. Once verified, this checklist is complete.

## 1. Prerequisites Check
- `java -version`: Ensure Java 21 LTS runtime.
- `docker info`: Ensure Docker daemon is active for PostgreSQL 16.

## 2. Environment Setup
- Copy `.env.example` -> `.env`.
- Ensure all required keys (`DB_URL`, `DB_USER`, `DB_PASSWORD`, `SERVER_PORT`) are populated.
- Enforce fail-fast: no default fallback `${VAR:default}` syntax in `application.yml`.

## 3. Infrastructure & Smoke Test
- Start database and mock mail: `docker compose up -d postgres mailpit`.
- Run compile check: `./mvnw compile`.
- Verify Flyway runs `db/migration/V1__init_schema.sql`.
- Verify OpenAPI spec is reachable at `/v3/api-docs`.
