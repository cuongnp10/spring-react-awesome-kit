# Mobile Agent Directives (Flutter / React Native)

## 1. Network & API Contract
- Use type-safe client generated from OpenAPI specification.
- Point to active backend API gateway via environment variables (`BASE_URL`).

## 2. State & Architecture
- Maintain clear separation between UI widgets/components and state management (BLoC/Riverpod for Flutter, Zustand/TanStack for React Native).
- Ensure graceful offline error handling and retry mechanisms.
