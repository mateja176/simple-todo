# FR Coverage Map

**Epic 1: Foundation & Instant Value**

- Covers: Infrastructure setup, landing page, authentication, instant onboarding
- FRs: FR1-6 (auth), FR66-67 (landing page), FR71 (baseline reliability)
- User Value: User can discover product, sign up, and see value within 60 seconds
- Rationale: Foundation enables all subsequent work; landing page critical for user acquisition

**Epic 2: Core Todo Experience**

- Covers: Baseline task CRUD, mobile & desktop UX, visual feedback
- FRs: FR7-14 (task CRUD), FR43-44 (quick-add, optimistic UI), FR47-48 (responsive), FR74 (background sync)
- User Value: Fully functional todo app that works perfectly without AI
- Rationale: Builds trust before introducing AI; delivers immediate utility

**Epic 3: AI Coaching with Context**

- Covers: AI coaching, goal management, caching, persona adaptation, <800ms latency
- FRs: FR19-37 (goals + coaching), FR38-42 (nudges), FR49, FR54 (persona detection), FR72-73 (fallback/reliability)
- User Value: Regret-prevention coaching that catches wasted effort before it happens
- Rationale: CRITICAL conversion moment - aha moment that drives retention; combines goals + coaching for cohesive experience

**Epic 4: Power User & Personalization**

- Covers: Keyboard shortcuts, swipe gestures, metadata, advanced UX
- FRs: FR15-18 (metadata), FR45-46 (shortcuts/gestures), FR50-53 (desktop/mobile personalization)
- User Value: Power users get efficient workflows; enhanced retention through optimized UX
- Rationale: Retention drivers after core value established

**Epic 5: Growth, Analytics & Monetization**

- Covers: Freemium limits, data export, viral features, BMAD validation metrics
- FRs: FR55-65 (freemium, privacy, export), FR68-70 (viral features), BMAD metrics (not FRs)
- User Value: Sustainable business model + viral growth + methodology validation
- Rationale: Monetization after value proven; separates growth mechanics from core experience

**FR Coverage Validation:**

- ✅ All 74 FRs mapped to epics
- ✅ Each epic delivers standalone user value
- ✅ No forward dependencies (sequential ordering maintained)
- ✅ Foundation epic acceptable (greenfield project setup)
- ✅ Epic 3 combines goals + coaching (journey mapping insight: user needs goals before coaching is valuable)

---
