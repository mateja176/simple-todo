# Architecture Decision Records

## ADR-001: Monorepo Over Multi-Repo

**Decision:** Use Turborepo + pnpm workspaces monorepo
**Rationale:** Shared types/validation, atomic changes, single version control
**Consequences:** Slightly more complex setup, but massive DX improvement

## ADR-002: Next.js Over Vite + React

**Decision:** Use Next.js 16.0.3 App Router for frontend
**Rationale:** SSR for landing page, RSC performance, file-based routing, mature ecosystem
**Trade-offs:** Slightly larger bundle than Vite, but RSC mitigates this

## ADR-003: Hono Over Express

**Decision:** Use Hono for backend
**Rationale:** 10x faster, TypeScript-first, edge-ready, RPC client for type safety
**Consequences:** Smaller ecosystem than Express, but modern and performant

## ADR-004: Drizzle Over Prisma

**Decision:** Use Drizzle ORM
**Rationale:** Lightweight (7.4kb), SQL transparency, better for latency optimization
**Trade-offs:** Less tooling than Prisma, but performance critical for <800ms target

## ADR-005: Claude Sonnet 4.5 Over GPT-4o

**Decision:** Primary LLM is Claude Sonnet 4.5
**Rationale:** Stable latency, $0.225/user/month cost, prompt caching 90% savings
**Fallback:** Claude Haiku or GPT-4o-mini (not rule-based patterns)
**Fallback Cascade:** Sonnet 4.5 → Haiku → Error message

## ADR-006: Unix Timestamps Over ISO Strings

**Decision:** Unix timestamps (integers) throughout system
**Rationale:** Consistency, smaller storage, simpler comparison
**Trade-offs:** Less human-readable in DB, but convert in frontend

## ADR-007: POJO Over Classes/Enums

**Decision:** Use plain objects with discriminators, no classes or enums
**Rationale:** Simpler serialization, no runtime overhead, better type inference
**Implementation:** Zod for validation, TypeScript unions for types

## ADR-008: Multi-Tier Caching Strategy (MVP)

**Decision:** node-cache (in-memory only) for MVP
**Rationale:** <1ms access, simpler deployment, sufficient for MVP scale (<100 concurrent users)
**Scaling Path:** Add Redis when scaling beyond single instance post-MVP

## ADR-009: Stripe for Payments

**Decision:** Stripe for payment processing
**Rationale:** Industry standard, excellent docs, embedded checkout, robust API
**Implementation:** Stripe Checkout for subscription management

## ADR-010: Datadog for Observability

**Decision:** Datadog for monitoring and observability
**Rationale:** Unified APM + logs + metrics, <800ms latency tracking critical
**Implementation:** Datadog agent + trace instrumentation for Hono

## ADR-011: Resend.com for Transactional Email

**Decision:** Resend.com for email delivery (password resets, notifications)
**Rationale:** Developer-friendly API, generous free tier, excellent deliverability
**Alternative Considered:** SendGrid, AWS SES (rejected for complexity)

## ADR-012: PWA Over Native Mobile

**Decision:** Progressive Web App for mobile (post-MVP consideration)
**Rationale:** Responsive web validates usage before native investment
**Implementation:** Start responsive web, add PWA features (offline, install prompt) post-MVP

## ADR-013: Referral Incentive Model

**Decision:** Referrals receive +5 free coaching sessions/month (10→15 free tier limit)
**Rationale:** Aligns with product value, low marginal cost, encourages viral loop
**Implementation:** Track referral codes, increment coaching_limit for successful referrals

---
