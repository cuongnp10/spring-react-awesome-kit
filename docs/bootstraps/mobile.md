# Mobile Bootstrap Checklist (Flutter / React Native)

> Execute during project initialization. Once verified, this checklist is complete.

## 1. Prerequisites Check
- Flutter: `flutter doctor`.
- React Native / Expo: `npx expo -v`.

## 2. Environment & Network Configuration
- Set `BASE_URL` in mobile config:
  - Android Emulator: `http://10.0.2.2:8080/api/v1`.
  - iOS Simulator: `http://localhost:8080/api/v1`.
  - Physical Device: `http://<LAN_IP>:8080/api/v1`.

## 3. Dependencies & Smoke Test
- Install packages: `flutter pub get` or `npm install`.
- Run analyzer/test: `flutter analyze` or `npm run test`.
