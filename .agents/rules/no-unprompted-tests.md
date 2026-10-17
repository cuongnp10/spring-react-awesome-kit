# Rule: No Unprompted Test Execution

## 1. Core Principle
* **Explicit Request Only:** Agents are strictly forbidden from running test suites (`mvn test`, `gradle test`, `npm test`, `vitest`, `jest`, `playwright`, `cypress`) unless the user explicitly commands it.
* **Non-Executing Compilation Checks:** When verifying code changes, agents must only use compilation and type-checking commands that do not execute test suites:
  - Backend: `mvn test-compile` or `mvn compile` (verifies syntax, types, and annotations without executing test methods).
  - Frontend: `npm run build` or `npx tsc --noEmit` (verifies TypeScript types and Vite bundle integrity).

## 2. Rationale
* Automated test runs often initiate long-running background processes, connect to external or containerized databases, spin up mock servers, or fail due to unseeded test data.
* Unsolicited test runs consume substantial token budgets, prolong agent turn latencies, and risk stalling development loops with false-positive test runner hangs.
