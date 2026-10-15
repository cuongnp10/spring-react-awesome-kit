# Standalone 3rd-Party Integration Kits & Recipes

This directory contains standalone, plug-and-play recipes for third-party service integrations.

## Available Integrations
1. **`vnpay/`**: VNPay payment gateway (URL generation, HMAC-SHA512 checksum, IPN webhook handling).
2. **`momo/`**: MoMo payment gateway (QR payment, HMAC-SHA256 signature, IPN webhook handling).
3. **`cloudinary/`**: Cloudinary cloud media storage (image/file upload, validation, deletion).
4. **`mailer/`**: Spring Mail (SMTP) with Thymeleaf HTML templates, async queues, and Mailpit local testing.
5. **`turnstile/`**: Cloudflare Turnstile bot verification (frontend widget + backend `@VerifyCaptcha` validation).

## Two-Phase Usage Model
* **Project Initialization (Day 1):** Enable integrations directly via configuration properties in `backend/` and `frontend/`.
* **Mid-Project Addition (Day N):** Follow each integration's standalone `GUIDE.md` to copy the files, inject configurations, and verify with test credentials.
