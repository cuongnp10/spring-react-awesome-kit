# create-spring-react-kit

> Interactive CLI Scaffolder for the **Spring Boot & React Awesome Starter Kit**.

Initialize a production-ready, fullstack application combining **Spring Boot 3.4+ (Java 21 LTS)** and **React 19 (TypeScript, Vite, Shadcn UI)** with a single terminal command.

---

## Quickstart

Run via `npx` (zero installation required):

```bash
npx create-spring-react-kit
```

Or with `npm`:

```bash
npm create spring-react-kit@latest
```

---

## Interactive Prompts

The CLI offers a clean, arrow-key interactive experience:

1. **Project Name:** Specify the destination directory name (e.g. `my-awesome-app`).
2. **Backend Architecture:** Choose between 3 pre-engineered architectural styles:
   - **🏛️ Academic Layered:** Textbook N-tier structure (`controller`, `service/impl`, `repository`, `entity`, `dto`, `config`) conforming to university curricula and exams (SBA301, SWP391, PRN221).
   - **📦 Feature-Sliced (Modular):** Self-contained vertical slices (`modules/product`) inheriting from reusable `core/base`. Ideal for agile startups and indie hackers.
   - **🔷 Modern Hexagonal (Clean):** Ports & Adapters (`domain`, `application`, `infrastructure`, `adapter/web`) with zero framework dependencies in the domain core. Favored by Claude Code and enterprise architectures.

---

## Non-Interactive / CI/CD Mode

You can also pass arguments directly:

```bash
# Academic Layered
npx create-spring-react-kit my-app --arch layered

# Feature-Sliced
npx create-spring-react-kit my-app --arch feature

# Modern Hexagonal
npx create-spring-react-kit my-app --arch hexagonal
```

---

## Next Steps After Generation

```bash
cd my-awesome-app

# 1. Start Database (PostgreSQL 16) & Mock Mailpit
docker compose up -d

# 2. Run Spring Boot Backend (Java 21)
cd backend && ./mvnw spring-boot:run

# 3. Run React Frontend
cd ../frontend && npm install && npm run dev
```
