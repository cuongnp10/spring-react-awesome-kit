# Startup Diagnostics & Troubleshooting Guide

## 1. Overview
When running the Spring Boot backend or React frontend, common startup failures must be diagnosed and resolved immediately using clear, actionable steps.
All diagnostics and error outputs must be strictly in English with no icons or emojis.

---

## 2. Common Failure Mode 1: Environment Configuration Mismatch (.env vs .env.example)

### Symptom
Application crashes on startup with:
```
[CONFIG ERROR] Missing required environment variable(s) in .env file.
Missing key: DB_PASSWORD
```

### Root Cause
A new environment variable was added to `.env.example` (or code), but the local `.env` file was not updated.

### Resolution Protocol
1. Diff `.env` against `.env.example`:
   * Check which keys exist in `.env.example` that are missing from `.env`.
2. Add the missing keys into `.env` with appropriate local values.
3. Verify that all values are defined without colon fallback syntax `${VAR:default}`.
4. Restart the application.

---

## 3. Common Failure Mode 2: Database Connection Failure

### Symptom
Application crashes with `CannotGetJdbcConnectionException` or `ConnectException`:
```
[DATABASE ERROR] Cannot connect to PostgreSQL database.
Target URL: jdbc:postgresql://localhost:5432/awesome_db
```

### Root Cause
PostgreSQL container is stopped, or database credentials in `.env` do not match `docker-compose.yml`.

### Resolution Protocol
1. Check if the Docker container is running:
   ```bash
   docker compose ps
   ```
2. Start the local database container if down:
   ```bash
   docker compose up -d
   ```
3. Verify `.env` matches `docker-compose.yml`:
   * `DB_URL=jdbc:postgresql://localhost:5432/awesome_db`
   * `DB_USER=postgres`
   * `DB_PASSWORD=postgres`

---

## 4. Common Failure Mode 3: Flyway Migration Desynchronization

### Symptom
Application crashes with `FlywayValidateException`:
```
[FLYWAY ERROR] Migration checksum mismatch or pending migration conflict detected.
Applied version in DB does not match local migration files.
```

### Root Cause
1. A migration script in `backend/src/main/resources/db/migration/` was modified after being executed.
2. A feature branch introduced migration `V2__...` which was executed locally, but switching to another branch has a different or unmerged `V2__...`.

### Resolution Protocol
* **Option A (Quick local reset - recommended for development):**
  Reset the local database volume and re-run migrations from scratch:
  ```bash
  docker compose down -v && docker compose up -d
  ```
* **Option B (Repair Flyway schema history):**
  If existing database data must be retained:
  ```bash
  ./mvnw flyway:repair
  ```
