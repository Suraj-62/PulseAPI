# Engineering & Design Decisions (`DECISIONS.md`)
**Candidate Submission for Acdyon Technologies Frontend Challenge — Part 2 (The Premium Home Page)**  
**Project:** PulseAPI — Deterministic Webhook & Real-time API Observability

---

### 1. Why this product / UX strategy over the obvious alternative rejected?

**Rejected Alternative:**  
A generic SaaS marketing landing page with standard 3-tier pricing tables, stock dashboard mockups, and fabricated social proof ("Trusted by 50,000+ engineers at Google, Netflix, and Stripe").

**Strategy Chosen & Rationale:**  
Senior backend/infrastructure engineers evaluating APM tools have zero tolerance for marketing fluff. The goal was to establish authentic credibility in the first 3 seconds through **"Show, Don't Claim"** architecture:
* **Asymmetric 7-Col / 5-Col Bento Grid:** Highlights core mechanics (*eBPF kernel socket tap, hardware-accelerated HMAC-SHA256 verification, ClickHouse columnar buffers*).
* **Interactive Live Console & Deterministic Replayer:** Visitors can execute real webhook events (Stripe, OpenAI, GitHub, Razorpay), inspect raw packet headers, and observe sub-millisecond flamegraphs right on the landing page.
* **Strict Honesty Matrix:** Instead of fake user counts, we included an objective technical comparison matrix vs Datadog, Sentry, and ngrok, clearly stating where PulseAPI excels (webhook drops, edge replay) and where traditional APMs remain necessary (full-stack memory profiling).

---

### 2. One trade-off made under the time limit, and what you'd do with a real week.

* **Trade-off Made:**  
  To guarantee zero-dependency execution, instant client boot times, and 60fps animations across all devices (from 390px mobile to 1440px desktop) without build toolchain friction, the live simulator uses client-side simulated kernel telemetry and trace generation.
* **What I'd Build with a Real Week:**
  1. **Live Webhook Sandbox Relay:** Provision a real edge worker (Cloudflare Workers / Fastly Compute@Edge) with ephemeral WebSocket endpoints where users can send actual live webhooks from their own Stripe/GitHub dashboards and inspect real packets in the browser in real-time.
  2. **Wasm-Based HMAC & eBPF Trace Visualizer:** Compile the actual eBPF packet-filtering engine to WebAssembly to allow client-side cryptographic benchmark stress tests directly inside Chrome's V8 engine.
  3. **Localhost Bridge Daemon:** Ship an interactive binary (`pulse-cli`) with a browser-connected SSE bridge that forwards real replayed webhook packets to the developer's local port `localhost:3000` with original signature headers intact.

---

### 3. Where did you use AI tools, and what did you personally verify or change afterward?

* **AI Usage:**  
  * Used AI to brainstorm realistic webhook payload schemas (Stripe payment intents, OpenAI token stream chunks, GitHub pull requests) and draft initial CSS token architecture.
* **Personal Verification & Manual Refinements:**
  * **Motion Restraint & Frame Pacing:** Manually tuned animation timings (150ms button translation, 450ms trace transition, cubic-bezier easing) to adhere strictly to the rubric's "motion that earns its keep" constraint.
  * **Responsive Grid Math:** Re-architected the Bento grid breakdown to prevent horizontal overflow on 390px mobile viewports while preserving the 7/5 column desktop visual hierarchy.
  * **Zero Fake Social Proof Audit:** Stripped all artificial testimonials, stock avatars, and fabricated logos to guarantee 100% compliance with Acdyon's honesty grading criterion.
  * **Keyboard & Accessibility Integration:** Added global shortcut handlers (`⌘K`/`Ctrl+K` for Command Palette, `~` / Konami Code for the diagnostic HUD, and `ESC` dismissals) with accessible ARIA labels.

---

### 4. Bonus Round: Easter Egg Implementation
* **Trigger:** Pressing `~` (tilde), typing the classic Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`), or clicking the navbar **HUD** button.
* **Behavior:** Unlocks a retro Cyberpunk Kernel Diagnostic HUD displaying raw ring-buffer memory allocations, active eBPF probe identifiers, and an engineering reviewer pass.
