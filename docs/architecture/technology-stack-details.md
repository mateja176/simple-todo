# Technology Stack Details

## Frontend Stack

**Next.js 16.0.3 (App Router)**

- React Server Components for performance
- File-based routing with nested layouts
- Built-in API routes for proxying to Hono
- SSR for landing page (SEO)
- Middleware for auth protection

**React 18+**

- Stable, massive ecosystem
- Error boundaries for fault tolerance
- Suspense for async loading states

**Tailwind CSS 4.x**

- Utility-first styling
- Responsive design primitives
- Dark mode support (future)
- Small bundle size

**Zustand**

- Client state (auth, UI preferences)
- Selective subscriptions (no cascade re-renders)
- 1.2kb, simpler than Redux
- Middleware for persistence

**TanStack Query 5.x**

- Server state caching
- Automatic refetching
- Optimistic updates
- Request deduplication
- Retry logic

**React Hook Form**

- Form management
- Uncontrolled components (performance)
- Zod resolver integration
- 8kb bundle

**date-fns**

- Unix timestamp formatting
- Tree-shakeable
- Timezone conversion

## Backend Stack

**Hono 4.10+**

- 10x faster than Express
- TypeScript-first
- RPC client for type-safe API calls
- Edge-ready (Cloudflare Workers, Node.js, Bun)
- Built-in middleware

**Drizzle ORM 0.44+**

- Lightweight (7.4kb)
- SQL transparency
- Type-safe queries
- Migration system
- PostgreSQL 17 support

**PostgreSQL 17.7**

- MVCC for concurrency
- JSONB for flexible data
- Full-text search (task search)
- Robust indexing
- ACID guarantees

**@anthropic-ai/sdk**

- Claude Sonnet 4.5 integration
- Streaming support
- Prompt caching (90% savings)

**node-cache**

- In-memory caching (<1ms)
- TTL support
- Automatic cleanup
- Simple API

**Pino**

- Structured JSON logging
- Fast (minimal overhead)
- Production-ready
- Log levels

**bcrypt**

- Password hashing
- Cost factor 12
- Salt per-user

**jsonwebtoken**

- JWT generation/validation
- HS256 algorithm
- Short-lived access tokens

## Shared Packages

**@repo/types**

- API contracts
- Data models
- Shared interfaces
- Type-safe communication

**@repo/validation**

- Zod schemas
- Request/response validation
- Frontend + backend reuse
- Type inference

**@repo/typescript-config**

- Base, Next.js, Node.js configs
- Consistent compiler options
- Composable extends

**@repo/lint-config**

- Shared linting rules
- TypeScript + React rules
- Import ordering

## Development Tools

**@typescript/native-preview**

- Native Go-based implementation of TypeScript
- Significantly faster compilation and type checking
- Drop-in replacement for standard TypeScript

**Turborepo 2.3+**

- Monorepo build orchestration
- Intelligent caching
- Parallel task execution
- Remote caching support

**pnpm 9.15+**

- Fast package manager
- Disk space efficient
- Workspace support
- Strict dependency resolution

**Vitest 2.x**

- Unit + integration testing
- 10-20x faster than Jest
- Native TypeScript
- Vite integration

**React Testing Library**

- Component testing
- User-centric queries
- Accessibility testing

**Playwright**

- E2E testing
- Cross-browser
- Visual regression
- Network mocking

## Integration Points

**Frontend → Backend:**

- Hono RPC Client (type-safe API calls)
- TanStack Query for caching/retry
- Server-Sent Events for streaming

**Backend → Database:**

- Drizzle ORM (type-safe queries)
- Connection pooling
- Prepared statements

**Backend → LLM:**

- Anthropic SDK
- Streaming responses
- Error handling with fallback

**Backend → Cache:**

- node-cache (Tier 1: in-memory)
- Redis optional (Tier 2: distributed)

**Deployment:**

- Vercel (frontend): Edge CDN, instant deploys
- Railway (backend + DB): PostgreSQL addon, usage-based pricing
