# Rule: Zero Hardcoding & Strict Fail-Fast Environment Variables

## 1. Core Principle
* **Absolute Ban on Hardcoded Values:** Any configuration that can change between environments or runs (database credentials, server ports, JWT secrets, 3rd-party API keys, webhook URLs, SMTP credentials, client domains) must be externalized to environment variables (`.env`).
* **Fail-Fast Enforcement:** Missing environment variables must trigger an immediate application startup crash or build failure. Silent backups, hidden fallbacks, or default values are strictly forbidden.

## 2. Forbidden Syntax (No Colon Fallbacks)
* ❌ **FORBIDDEN:** Spring Boot syntax with colon `:` default fallback:
  ```yaml
  # VIOLATION - DO NOT USE:
  spring:
    datasource:
      url: ${DB_URL:jdbc:postgresql://localhost:5432/awesome_db}
      username: ${DB_USER:postgres}
      password: ${DB_PASSWORD:secret}
  server:
    port: ${SERVER_PORT:8080}
  ```
* ✅ **MANDATORY:** Pure variable reference without colon or fallback value:
  ```yaml
  # REQUIRED:
  spring:
    datasource:
      url: ${DB_URL}
      username: ${DB_USER}
      password: ${DB_PASSWORD}
  server:
    port: ${SERVER_PORT}
  ```

## 3. Rationale
* Providing fallback defaults creates phantom configurations where the application continues running on unintended local defaults despite missing `.env` definitions.
* This leads to painful, elusive bugs during staging, CI/CD, and production deployments.
* If a variable is missing from `.env`, the system MUST fail loudly and instantly at bootstrap.

## 4. Frontend (.env) Rules
* All frontend environment variables must be defined in `.env` with Vite prefix (`VITE_API_BASE_URL`).
* Never fallback in code using `import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'`.
* Always validate or require the variable, throwing a runtime initialization error if missing.
