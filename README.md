# Spring-React-Awesome-Kit 🚀

> An AI-Native, Production-Ready Fullstack Starter Ecosystem & Platform powered by **Spring Boot 3.4+ (Java 21 LTS)**, **React 18/19 (TypeScript, Vite, Shadcn UI)**, and automated **OpenAPI Orval CodeGen**.

---

## 🌟 Overview

`spring-react-awesome-kit` accelerates development from **0% to 25%** on Day 1. It provides a standardized foundation engineered specifically for seamless collaboration between **developers** and **AI coding agents** (Antigravity, Cursor, Claude Code).

- **Architecture:** Modular Monolith / Package-by-Feature (Vertical Slice).
- **Zero Boilerplate:** Generic CRUD base layer reducing new feature development to 1–2 files.
- **Type Safety:** 100% automated TypeScript DTO types and TanStack Query hooks via OpenAPI & Orval.
- **Plug-and-Play Integrations:** VNPay, MoMo, Cloudinary, Mailer (SMTP), and Cloudflare Turnstile with copyable code and setup guides.
- **Documentation First:** Industrial-grade specification templates (Product Definition, SRS, Use Cases, Mermaid ERD & Sequence Diagrams).
- **Local DX:** Single-command local environment via Docker Compose (PostgreSQL 16 + Mailpit mock SMTP).

---

## 📁 Repository Structure

```text
spring-react-awesome-kit/
├── backend/                  # Spring Boot 3.4 + Java 21 LTS Maven service
├── frontend/                 # React 18/19 + Vite + TypeScript + Shadcn UI client
├── docs/                     # Standard engineering documentation framework
│   ├── 00-product-definition/# Product context, persona, value proposition
│   ├── 01-srs/               # Software Requirements Specification
│   ├── 02-use-cases/         # Use Case flows & Actor matrix
│   ├── 03-modeling/          # Conceptual model, Mermaid ERD & Sequence diagrams
│   └── 04-api-specs/         # REST API contract specifications
├── integrations/             # Standalone 3rd-party recipes & setup guides
│   ├── vnpay/                # VNPay payment gateway
│   ├── momo/                 # MoMo payment gateway
│   ├── cloudinary/           # Cloud media storage
│   ├── mailer/               # Spring Mail (SMTP) + Thymeleaf templates
│   └── turnstile/            # Cloudflare Turnstile bot verification
├── .agents/                  # AI Agent operating system
│   ├── rules/                # Mandatory agent constraints (AGENT_RULES.md)
│   ├── skills/               # Kit-Consumer skills (scaffold-crud, write-docs, draw-diagrams)
├── docker-compose.yml        # PostgreSQL 16 + Mailpit local environment

```

---

## 🚀 Quick Start (Local Environment)

### 1. Start Local Infrastructure

```bash
docker compose up -d
```

- **PostgreSQL:** `localhost:5432` (`awesome_db` / `postgres` / `postgres`)
- **Mailpit (Mock Mailbox UI):** `http://localhost:8025`
- **Mailpit (SMTP Server):** `localhost:1025`

### 2. Stop Infrastructure

```bash
docker compose down
```

---

## 📜 Documentation & Guidelines

- [Project Charter & Architectural Blueprint](PROJECT_CHARTER.md)
- [Implementation Roadmap](ROADMAP.md)
- [AI Agent Execution Rules](.agents/rules/AGENT_RULES.md)
- [Kit-Authoring Meta-Skills](.agents/meta-skills/META_SKILLS.md)
