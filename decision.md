# Engineering and Design Decisions: PulseAPI

## Question 1: Strategy and Product Decisions
What product and UX strategy did you choose, what obvious alternatives were avoided, and why?

### Answer:
What I Avoided:
Standard SaaS templates loaded with stock illustrations, 3-tier pricing tables, and fake social proof ("Trusted by 50,000+ engineers").

What I Built Instead:
An interactive, split-view API and Webhook Console placed right below the hero section.

Why:
In developer tools, showing the product is much more effective than making claims. Giving users a way to switch endpoints (`POST /stripe/webhook`, `GET /users/auth`), inspect raw JSON payloads, and see sub-millisecond trace breakdowns immediately demonstrates value within 3 seconds.

---

## Question 2: Time-Constrained Trade-Offs and Future Improvements
What trade-offs were made under the time limit, and what would you build with a full week?

### Answer:
The Trade-Off:
To keep the frontend fast, reliable, and completely dependency-free for deployment, all trace simulations and latency metrics run entirely on client-side state.

With a Full Week:
1. Live Edge Endpoint: Connect the console to an active Cloudflare Worker / Edge function to stream real HTTP telemetry via WebSockets.
2. Interactive Diff Editor: Integrate Monaco Editor so users can edit the payload and test schema drift in real time.
3. Local CLI Bridge: Build a small CLI tool that forwards replayed webhook payloads directly to `localhost:3000`.

---

## Question 3: AI Tooling and Human Verification
Where was AI used in development, and what did you personally verify, tune, or change afterward?

### Answer:
Where AI Was Used:
I used AI to quickly generate realistic webhook payload structures (Stripe, GitHub events) and scaffold the initial Tailwind bento grid layout.

What I Personally Verified and Tuned:
1. Mobile Layout (390px): Debugged the console header and tab navigation to keep horizontal scrolling scoped only inside the widget, preventing any page-level overflow.
2. Visual Hierarchy and Spacing: Manually refined the color palette (`#09090B` background with `#34D399` Emerald accents), typography scale, and button hover states to keep the UI clean and restrained rather than flashy.
3. Easter Egg and Keyboard Shortcuts: Handled the `⌘K` / `Ctrl+K` global keyboard listener and modal state logic myself.

---

## Question 4: Bonus Round - Easter Egg
What easter egg is implemented, how is it triggered, and what is its behavior?

### Answer:
Trigger:
Press `Ctrl + K` (or `Cmd + K` on Mac) / click the `⌘K` badge in the navbar.

Behavior:
Opens a command palette displaying real-time system cluster status and an instant theme toggle (Emerald vs Purple).
