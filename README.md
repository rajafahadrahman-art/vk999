# VK999APK.pk

Production-ready informational website for VK999 download, login, deposit and withdrawal guides (Pakistan audience).

> **Disclaimer:** `vk999apk.pk` is an independent informational website. It does not own, operate, or represent the VK999 platform.

## Stack

- Next.js App Router
- TypeScript
- Lightweight CSS (dark/light themes)
- Static Markdown content in `content/`

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run lint
npm run check-links
npm run build
```

## Configuration

Central settings live in `lib/site-config.ts`:

- Domain and metadata
- Contact email (`contact@vk999apk.pk`)
- External APK download URL
- Navigation and image paths

## Routes

| Page | Route |
|---|---|
| Home | `/` |
| Download | `/vk999-download/` |
| Login | `/vk999-login/` |
| Deposit | `/vk999-deposit-guide/` |
| Withdrawal | `/vk999-withdrawal-guide/` |
| About | `/about-us/` |
| Contact | `/contact-us/` |
| Privacy | `/privacy-policy/` |
| Disclaimer | `/disclaimer/` |
| Terms | `/terms-and-conditions/` |
| Responsible Gaming | `/responsible-gaming/` |

## Redirects

- `/download/` → `/vk999-download/`
- `/login/` → `/vk999-login/`
- `/vk999-deposit/` → `/vk999-deposit-guide/`
- `/vk999-withdrawal/` → `/vk999-withdrawal-guide/`
