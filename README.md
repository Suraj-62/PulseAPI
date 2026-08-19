# PulseAPI — Deterministic Webhook & Real-time API Observability

> Acdyon Technologies Frontend Challenge (Part 2: The Premium Home Page)  
> Redesigned as if a Product Hunt #1 front page depended on it.

---

## ⚡ Quick Start & Live Deployment

This project is built with clean, zero-dependency modern HTML5, CSS3 design tokens, and vanilla ES6+ JavaScript. It runs instantly with zero build setup.

### 1. Run Locally
Open `index.html` directly in any modern browser, or serve with any static server:
```bash
# Python
python -m http.server 3000

# Node (npx)
npx serve .
```

### 2. Deploy to Live URL (Vercel / Netlify / GitHub Pages)
- **Vercel**: Import repository or run `vercel` in root.
- **Netlify**: Drag and drop directory into Netlify Drop or link Git repo.
- **GitHub Pages**: Go to Repo Settings → Pages → Select `main` branch root.

---

## 💎 Features & Architecture

1. **Sub-Millisecond Global Edge Tracing (7-Col Bento)**
   - Live animated latency histogram with real-time dynamic bar animation.
   - Interactive region switcher (IAD 0.34ms, FRA 0.41ms, SIN 0.52ms).
   - Micro-metric pipeline execution breakdown (Ingest → JWT → Worker → Response).

2. **Deterministic One-Click Payload Replay (5-Col Bento)**
   - Interactive simulation replaying failed webhook events (`Stripe: invoice.payment_failed`).
   - 450ms simulated state transition from `500 ERROR` to `200 OK VERIFIED`.
   - Byte-accurate cryptographic diff viewer with preserved HMAC signatures.

3. **Zero-SDK Ingestion Pipeline (5-Col Bento)**
   - Reverse proxy routing (`https://edge.pulseapi.dev/v1/proxy`).
   - Interactive cURL, Node.js, and Python code snippets with 1-click copy.
   - Live simulated edge ping indicator.

4. **Signature Authentication & Raw Packet Inspection (7-Col Bento)**
   - Deep raw-packet inspection with HMAC-SHA256 signature verification.
   - Interactive terminal window with POST, GET, PUT tabs.
   - Collapsible, syntax-highlighted JSON tree inspector.

5. **Interactive Live Playground & Kernel Flamegraph**
   - Test synthetic events (Stripe, OpenAI, GitHub, Razorpay).
   - Real-time zero-copy flamegraph and live kernel log streamer.

6. **Command Palette (`⌘K` / `Ctrl+K`)**
   - Quick search and jump to sections, actions, and terminal HUD.

7. **Bonus Easter Egg (Konami Code / HUD)**
   - Triggerable via `~` (tilde), typing `↑ ↑ ↓ ↓ ← → ← → B A`, or clicking **HUD**.
   - Opens retro cyberpunk kernel diagnostic modal.

8. **Strict Honesty Guarantee**
   - Zero fabricated testimonials, zero fake user counts, zero fake partner logos.
   - Objective technical tradeoff comparison matrix vs Datadog, Sentry, and ngrok.

---

## 📄 Submission Files
- `index.html`: Semantic landing page markup
- `styles.css`: Complete Linear/Vercel design system tokens
- `app.js`: Interactive telemetry simulator and shortcut handlers
- `DECISIONS.md`: 1-page engineering rationale document
