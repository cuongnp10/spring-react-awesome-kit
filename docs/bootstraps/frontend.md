# Frontend Bootstrap Checklist (React 19 + Vite + TypeScript)

> Execute during project initialization. Once verified, this checklist is complete.

## 1. Prerequisites Check
- `node -v`: Ensure Node.js 20+.
- `npm -v` or `pnpm -v`.

## 2. Environment & Dependencies
- Copy `.env.example` -> `.env`.
- Set `VITE_API_BASE_URL` pointing to backend port (e.g. `http://localhost:8080`).
- Install dependencies: `npm install`.

## 3. Contract Sync & Smoke Test
- Generate API client types & hooks: `npm run codegen`.
- Verify output files inside `src/generated/api/`.
- Run typecheck & build: `npm run build`.
- Start dev server: `npm run dev`.
