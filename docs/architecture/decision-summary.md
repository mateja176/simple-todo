# Decision Summary

| Category | Decision | Version | Affects FRs | Rationale |
|----------|----------|---------|-------------|-----------|
| Monorepo | Turborepo + pnpm workspaces | Turbo 2.3+, pnpm 9.15+ | All | Shared types/validation, atomic changes, fast builds |
| Frontend Framework | Next.js App Router | 15.5 | FR43-48, FR66-70 | SSR for landing pages, RSC performance, file-based routing |
| Backend Framework | Hono | 4.10+ | FR1-42, FR55-74 | 10x faster than Express, TypeScript-first, edge-ready, <800ms latency |
| Database | PostgreSQL | 17.7 | FR1-65 | Multi-user concurrency, MVCC, production-grade, zero data loss |
| ORM | Drizzle | 0.44+ | FR1-65 | Lightweight (7.4kb), SQL transparency, serverless-friendly, performance |
| Authentication | JWT + refresh token rotation | - | FR1-6 | Short-lived access (15min), secure refresh (httpOnly), rotation prevents reuse |
| LLM Provider | Claude Sonnet 4.5 | API | FR24-37 | Stable latency, $0.225/user/month, prompt caching 90% savings, streaming |
| State Management | Zustand | Latest | FR43-54 | Selective subscriptions, no re-render cascade, 1.2kb, simpler than Redux |
| Server State | TanStack Query | 5.x | FR7-74 | Auto caching, optimistic UI, background refetch, request deduplication |
| Routing | Next.js App Router | Built-in | FR43-48 | File-based, nested layouts, loading states, error boundaries |
| Forms | React Hook Form | Latest | FR7-18, FR19-23 | 8kb, uncontrolled (fewer re-renders), Zod integration |
| Testing | Vitest + RTL + Playwright | Vitest 2.x | All | 10-20x faster than Jest, native TypeScript, Vite integration, E2E |
| Caching | node-cache + Redis (optional) | Latest | FR24-37, FR71-74 | <1ms in-memory, ~3ms Redis, multi-tier for <800ms guarantee |
| Styling | Tailwind CSS | 4.x | FR43-48, FR66-70 | Utility-first, responsive, small bundle, anti-guilt minimalist design |
| Logging | Pino | Latest | All NFRs | Fast structured JSON, Hono-compatible, production-ready |
| Date Library | date-fns | Latest | All | Tree-shakeable, lightweight vs moment.js, Unix timestamp support |
| Deployment | Vercel (frontend) + Railway (backend) | - | All NFRs | Vercel: edge CDN, instant deploys. Railway: PostgreSQL, usage-based pricing |

**Key Technology Versions:**
- Node.js: 20.19+ (required by Vite 7)
- TypeScript: 5.7+
- React: 18+ (Next.js 15 compatible)
- PostgreSQL: 17.7
- pnpm: 9.15+
