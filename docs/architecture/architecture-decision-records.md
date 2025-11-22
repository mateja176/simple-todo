# Architecture Decision Records

## ADR-001: Monorepo Over Multi-Repo
**Decision:** Use Turborepo + pnpm workspaces monorepo
**Rationale:** Shared types/validation, atomic changes, single version control
**Consequences:** Slightly more complex setup, but massive DX improvement

## ADR-002: Next.js Over Vite + React
**Decision:** Use Next.js 15 App Router for frontend
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
**Fallback:** GPT-4o mini available if cost optimization needed

## ADR-006: Unix Timestamps Over ISO Strings
**Decision:** Unix timestamps (integers) throughout system
**Rationale:** Consistency, smaller storage, simpler comparison
**Trade-offs:** Less human-readable in DB, but convert in frontend

## ADR-007: POJO Over Classes/Enums
**Decision:** Use plain objects with discriminators, no classes or enums
**Rationale:** Simpler serialization, no runtime overhead, better type inference
**Implementation:** Zod for validation, TypeScript unions for types

## ADR-008: Multi-Tier Caching Strategy
**Decision:** node-cache (Tier 1) + optional Redis (Tier 2)
**Rationale:** <1ms in-memory for <800ms guarantee, Redis for scaling
**Scaling Path:** Start in-memory only, add Redis when multiple instances needed

---
