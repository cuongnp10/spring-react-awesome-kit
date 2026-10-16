---
name: apply-integration-recipe
description: Connects a pre-packaged 3rd-party integration recipe (VNPay, MoMo, Cloudinary, Mailer, Turnstile) into backend and frontend.
---

# Apply 3rd-Party Integration Recipe

Integrates a standalone recipe from `integrations/<name>/` into the active application.

## Directives
1. **Recipe Inspection:**
   Read `integrations/<name>/README.md` to identify required environment variables and dependencies.
2. **Strict Environment Configuration:**
   Add required environment keys into `.env` and `application.yml`.
   * Enforce fail-fast syntax: `${VNPAY_TMN_CODE}` (never `${VNPAY_TMN_CODE:default}`).
3. **Copy & Activate:**
   - Copy integration Java files into the target backend module or shared kit package.
   - Activate via feature flag: `@ConditionalOnProperty(prefix = "awesome.integration.<name>", name = "enabled", havingValue = "true")`.
4. **Frontend Integration:**
   Import and mount corresponding payment redirects or Turnstile widgets into the UI flow.
