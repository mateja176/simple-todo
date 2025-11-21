# Architecture

**Project:** simple-todo
**Date:** 2025-11-21
**Version:** 1.0
**Author:** BMad

---

## Executive Summary

Monorepo architecture with separated Next.js 15 frontend and Hono backend, optimized for <800ms AI coaching latency through multi-tier caching and streaming. TypeScript-first development with shared types and validation schemas. Turborepo + pnpm workspaces enable atomic changes and fast builds. Modern stack chosen for performance (Hono 10x faster than Express), type safety (end-to-end), and edge computing readiness.

**Core Architectural Principles:**
- Type-safe API communication (Hono RPC client)
- Independent frontend/backend scaling (critical for AI coaching load)
- Unix timestamps throughout (consistency)
- POJO with discriminators (no classes/enums)
- Aggressive caching (multi-tier: in-memory + Redis)
- Anti-guilt UX philosophy (minimal complexity, maximum clarity)

---

## Project Initialization

**Monorepo Setup:**

```bash
# Create monorepo root
mkdir simple-todo && cd simple-todo
pnpm init

# Install monorepo tools
pnpm add -D turbo typescript

# Create workspace structure
mkdir -p apps/web apps/api packages/types packages/validation packages/typescript-config packages/eslint-config
```

**Frontend (Next.js 15 App Router):**

```bash
cd apps
npx create-next-app@latest web --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"
```

**Backend (Hono):**

```bash
cd apps/api
pnpm init
pnpm add hono @hono/node-server zod
pnpm add -D typescript @types/node tsx nodemon drizzle-orm drizzle-kit postgres
pnpm add -D @anthropic-ai/sdk node-cache pino bcrypt jsonwebtoken
```

**Shared Packages:**

```bash
# Types package
cd packages/types
pnpm init
pnpm add -D typescript

# Validation package
cd packages/validation
pnpm init
pnpm add zod
pnpm add -D typescript
```

**Configuration Files:**

`pnpm-workspace.yaml`:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

`turbo.json`:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "lint": {}
  }
}
```

## Decision Summary

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

## Project Structure

```
simple-todo/                                 # Monorepo root
├── apps/
│   ├── web/                                # Next.js 15 frontend
│   │   ├── src/
│   │   │   ├── app/                        # App Router
│   │   │   │   ├── (auth)/                # Auth route group
│   │   │   │   │   ├── login/page.tsx
│   │   │   │   │   └── signup/page.tsx
│   │   │   │   ├── (dashboard)/           # Protected routes
│   │   │   │   │   ├── layout.tsx         # Auth wrapper
│   │   │   │   │   ├── tasks/page.tsx     # Main task list
│   │   │   │   │   ├── goals/page.tsx     # Goal capture
│   │   │   │   │   └── settings/page.tsx
│   │   │   │   ├── api/                   # Route handlers (proxy)
│   │   │   │   │   ├── auth/route.ts
│   │   │   │   │   └── health/route.ts
│   │   │   │   ├── layout.tsx             # Root layout
│   │   │   │   └── page.tsx               # Landing (SSR)
│   │   │   ├── components/
│   │   │   │   ├── ui/                    # Reusable UI
│   │   │   │   ├── tasks/                 # Task components
│   │   │   │   ├── coaching/              # AI coaching UI
│   │   │   │   └── layout/                # Nav, header
│   │   │   ├── lib/
│   │   │   │   ├── apiClient.ts           # Hono RPC client
│   │   │   │   ├── auth.ts
│   │   │   │   ├── store.ts               # Zustand stores
│   │   │   │   └── utils.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useTask.ts             # TanStack Query
│   │   │   │   ├── useCoaching.ts
│   │   │   │   └── useAuth.ts
│   │   │   ├── types/                     # Frontend-specific types
│   │   │   └── middleware.ts              # Auth check
│   │   ├── public/
│   │   ├── __tests__/
│   │   ├── tailwind.config.ts
│   │   ├── next.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── api/                                # Hono backend
│       ├── src/
│       │   ├── index.ts                    # Entry point
│       │   ├── routes/
│       │   │   ├── auth.ts                 # Auth endpoints
│       │   │   ├── tasks.ts                # Task CRUD
│       │   │   ├── coaching.ts             # AI coaching
│       │   │   ├── goals.ts                # Goals
│       │   │   └── health.ts
│       │   ├── middleware/
│       │   │   ├── auth.ts                 # JWT validation
│       │   │   ├── errorHandler.ts         # Error middleware
│       │   │   ├── rateLimit.ts
│       │   │   └── logger.ts               # Pino logging
│       │   ├── services/
│       │   │   ├── authService.ts
│       │   │   ├── taskService.ts
│       │   │   ├── coachingService.ts      # LLM integration
│       │   │   ├── cacheService.ts         # node-cache wrapper
│       │   │   └── llmService.ts           # Claude client
│       │   ├── db/
│       │   │   ├── schema.ts               # Drizzle schema
│       │   │   ├── migrations/
│       │   │   └── client.ts
│       │   ├── lib/
│       │   │   ├── tokens.ts               # JWT helpers
│       │   │   ├── logger.ts               # Pino config
│       │   │   └── errors.ts               # Error types
│       │   ├── types/                      # Backend-specific
│       │   └── config/
│       │       ├── env.ts
│       │       └── constants.ts
│       ├── __tests__/
│       ├── drizzle.config.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── typescript-config/                  # Shared TS configs
│   │   ├── base.json
│   │   ├── nextjs.json
│   │   └── node.json
│   ├── eslint-config/
│   │   └── index.js
│   ├── types/                              # Shared types
│   │   ├── src/
│   │   │   ├── api.ts                      # API contracts
│   │   │   ├── task.ts
│   │   │   ├── user.ts
│   │   │   └── coaching.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── validation/                         # Shared Zod schemas
│       ├── src/
│       │   ├── auth.ts
│       │   ├── task.ts
│       │   └── coaching.ts
│       ├── tsconfig.json
│       └── package.json
│
├── .github/workflows/
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

## FR to Architecture Mapping

| FR Category | Frontend Location | Backend Location | Database Tables | Key Technologies |
|-------------|-------------------|------------------|-----------------|------------------|
| User Account & Auth (FR1-6) | `app/(auth)/`, `middleware.ts` | `routes/auth.ts`, `services/authService.ts` | `users`, `refresh_tokens` | JWT, bcrypt, httpOnly cookies |
| Task Management (FR7-14) | `app/(dashboard)/tasks/`, `components/tasks/` | `routes/tasks.ts`, `services/taskService.ts` | `tasks` | TanStack Query, optimistic updates |
| Optional Metadata (FR15-18) | `components/tasks/TaskForm.tsx` | (embedded in tasks) | `tasks.importance`, `tasks.confidence` | React Hook Form, Zod |
| Goal Management (FR19-23) | `app/(dashboard)/goals/` | `routes/goals.ts` | `goals` | Optional flow, async |
| AI Coaching (FR24-37) | `components/coaching/`, `hooks/useCoaching.ts` | `routes/coaching.ts`, `services/coachingService.ts`, `services/llmService.ts` | `coaching_interactions`, `coaching_cache` | Claude Sonnet 4.5, streaming, multi-tier cache |
| Smart Suggestions (FR38-42) | `components/coaching/Nudges.tsx` | `services/coachingService.ts` | (state-based, usage patterns) | Pattern recognition |
| UX & Interface (FR43-48) | `components/ui/`, `components/layout/` | N/A | N/A | Tailwind, responsive design |
| Persona Adaptation (FR49-54) | `hooks/usePersona.ts`, adaptive components | `services/coachingService.ts` (tone) | `users.persona_signals` | Inference engine, adaptive prompts |
| Freemium (FR55-60) | `components/UpgradePrompt.tsx` | `middleware/usageLimit.ts` | `users.coaching_count` | Soft limits, contextual prompts |
| Privacy & Export (FR61-65) | `app/(dashboard)/settings/` | `routes/data.ts` | (all tables) | GDPR compliance, data export |
| Marketing & Viral (FR66-70) | `app/page.tsx` (landing), `components/Share.tsx` | N/A | N/A | Next.js SSR, social sharing |
| System Reliability (FR71-74) | TanStack Query retries | `middleware/errorHandler.ts`, `services/cacheService.ts` | N/A | Error boundaries, fallback cache |

## Technology Stack Details

### Frontend Stack

**Next.js 15.5 (App Router)**
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

### Backend Stack

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

### Shared Packages

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

**@repo/eslint-config**
- Shared linting rules
- TypeScript + React rules
- Import ordering

### Development Tools

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

### Integration Points

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

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

### Naming Conventions

**API Endpoints:**
- Pattern: `/api/{resource}` (plural, lowercase)
- Examples: `/api/tasks`, `/api/goals`, `/api/coaching`
- Route parameters: `/api/tasks/:id`
- Query params: camelCase (`?userId=123`)

**Database:**
- Tables: plural, snake_case (`users`, `tasks`, `coaching_interactions`)
- Columns: snake_case (`user_id`, `created_at`, `confidence_rating`)
- Foreign keys: `{table}_id` (`user_id`, `task_id`)
- Timestamps: `created_at`, `updated_at` (Unix timestamps, always both)
- Booleans: `is_` or `has_` prefix (`is_completed`, `has_coaching_enabled`)

**Frontend Files:**
- Components: PascalCase (`TaskCard.tsx`, `CoachingPanel.tsx`)
- Hooks: camelCase with `use` prefix (`useTask.ts`, `useCoaching.ts`)
- Utils: camelCase (`apiClient.ts`, `formatDate.ts`)
- Pages: lowercase, hyphens for multi-word (`login/page.tsx`)

**Variables/Functions/Constants:**
- Variables: camelCase (`taskList`, `coachingResponse`)
- Functions: camelCase verbs (`createTask`, `fetchCoaching`)
- Constants: camelCase (`maxCoachingCount`, `apiBaseUrl`)
- Types/Interfaces: PascalCase (`Task`, `CoachingResponse`)
- **No enums** - Use POJO with `as const`

**POJO Instead of Enums:**
```typescript
// ✅ DO THIS
export const personaType = {
  founder: 'founder',
  student: 'student',
  neutral: 'neutral'
} as const;

export type PersonaType = typeof personaType[keyof typeof personaType];

// ❌ DON'T USE ENUMS
```

### Code Organization

**Tests:**
- Co-located: `TaskCard.test.tsx` next to `TaskCard.tsx`
- Mirrors src structure: `__tests__/unit/services/coachingService.test.ts`
- Test files end with `.test.ts` or `.test.tsx`

**Components:**
- One component per file
- Export default for page components
- Named exports for reusable components

**Shared Code:**
- Types in `packages/types/src/`
- Validation in `packages/validation/src/`
- No duplicate definitions

### Error Handling

**Backend (Hono) - POJO with Zod:**
```typescript
import { z } from 'zod';

export const appErrorSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('validation'),
    message: z.string(),
    details: z.record(z.unknown()).optional()
  }),
  z.object({
    type: z.literal('authentication'),
    message: z.string()
  }),
  z.object({
    type: z.literal('authorization'),
    message: z.string()
  }),
  z.object({
    type: z.literal('notFound'),
    message: z.string(),
    resource: z.string()
  }),
  z.object({
    type: z.literal('llmTimeout'),
    message: z.string(),
    latency: z.number()
  }),
  z.object({
    type: z.literal('database'),
    message: z.string()
  })
]);

export type AppError = z.infer<typeof appErrorSchema>;

// Usage in routes - just throw POJO
throw { type: 'validation', message: 'Task text required', details: { field: 'text' } };
throw { type: 'llmTimeout', message: 'Coaching timeout', latency: 850 };
throw { type: 'authentication', message: 'Invalid credentials' };
```

**Error Middleware:**
```typescript
app.onError((err, c) => {
  const parseResult = appErrorSchema.safeParse(err);

  if (parseResult.success) {
    const appError = parseResult.data;
    const statusCode = {
      validation: 400,
      authentication: 401,
      authorization: 403,
      notFound: 404,
      llmTimeout: 504,
      database: 500
    }[appError.type];

    return c.json({
      success: false,
      error: {
        code: appError.type.toUpperCase(),
        message: appError.message,
        ...(appError.type === 'validation' && appError.details && { details: appError.details })
      }
    }, statusCode);
  }

  logger.error('Unhandled error:', err);
  return c.json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    }
  }, 500);
});
```

**Frontend (React):**
```typescript
// Error boundaries
<ErrorBoundary fallback={<ErrorFallback />}>
  <TaskList />
</ErrorBoundary>

// Toast notifications
toast.error('Failed to save task. Please try again.');

// TanStack Query handles network errors automatically
```

### Logging Strategy

**Format:** Structured JSON (Pino)
**Levels:** DEBUG, INFO, WARN, ERROR

**Always Include:**
- `timestamp` (Unix timestamp)
- `level`
- `message`
- `userId` (if authenticated)
- `requestId` (UUID per request)
- `endpoint`

**LLM API Calls:**
```typescript
logger.info({
  message: 'Coaching request processed',
  userId: user.id,
  requestId: req.id,
  endpoint: '/api/coaching',
  questionHash: hash(taskText),
  latency: 650,
  tokens: { input: 500, output: 200 },
  cost: 0.0045,
  cached: false
});
```

**Never Log:**
- Passwords
- Full task text (use hash)
- Access tokens
- Goal content (use goal IDs)

### Date/Time Handling

**Standard:** Unix timestamps (seconds since epoch)

**Storage:** Integer columns in PostgreSQL
```typescript
createdAt: integer('created_at').notNull() // Unix timestamp
```

**API Format:** Unix timestamps
```json
{
  "createdAt": 1732186200,
  "updatedAt": 1732186200
}
```

**Display:** Convert in frontend
```typescript
import { format, fromUnixTime } from 'date-fns';

function formatTimestamp(unix: number): string {
  return format(fromUnixTime(unix), 'MMM d, yyyy h:mm a');
}
```

### Authentication Pattern

**Token Storage:**
- Access token: Memory only (Zustand store)
- Refresh token: httpOnly cookie (backend sets)
- **Never** localStorage (XSS risk)

**Protected Routes:**
```typescript
// Next.js middleware
export function middleware(request: NextRequest) {
  const token = request.cookies.get('refreshToken');
  if (!token && isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

**API Calls:**
```typescript
headers: {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
}
```

### API Response Format

**Success:**
```json
{
  "success": true,
  "data": { /* payload */ }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "User-friendly message",
    "details": { /* optional */ }
  }
}
```

### Validation Pattern

**Shared Zod Schemas** (`packages/validation/src/`):
```typescript
// task.ts
export const taskSchema = z.object({
  text: z.string().min(1).max(500),
  importance: z.number().int().min(1).max(10).optional(),
  confidence: z.number().int().min(1).max(10).optional()
});

export type TaskInput = z.infer<typeof taskSchema>;
```

**Backend:**
```typescript
app.post('/api/tasks', async (c) => {
  const body = await c.req.json();
  const validated = taskSchema.parse(body); // throws if invalid
  // proceed with validated data
});
```

**Frontend:**
```typescript
const { register, handleSubmit } = useForm({
  resolver: zodResolver(taskSchema)
});
```

### Testing Strategy

**Coverage Targets:**
- Unit: 70%+ (business logic, utilities)
- Integration: Key flows (auth, CRUD, coaching)
- E2E: Happy paths (signup → task → coaching)

**Test Organization:**
```
__tests__/
  ├── unit/
  │   ├── services/
  │   └── utils/
  ├── integration/
  │   └── api/
  └── e2e/
      └── flows/
```

---

## Consistency Rules

### State Management

**Zustand Stores:**
- One store per domain (`useTaskStore`, `useAuthStore`)
- Flat structure (no nesting)
- Actions return promises

**TanStack Query:**
- Query keys: array format `['tasks', userId]`
- Mutations invalidate related queries
- Optimistic updates for instant feedback

### Component Patterns

**Page Components:**
```typescript
// app/(dashboard)/tasks/page.tsx
export default function TasksPage() {
  // Server Component by default
}
```

**Client Components:**
```typescript
'use client';

export function TaskCard({ task }: { task: Task }) {
  // Interactive component
}
```

**Async Data Loading:**
```typescript
// Use TanStack Query, not useEffect
const { data, isLoading } = useQuery({
  queryKey: ['tasks', userId],
  queryFn: fetchTasks
});
```

---

## Architecture Decision Records

### ADR-001: Monorepo Over Multi-Repo
**Decision:** Use Turborepo + pnpm workspaces monorepo
**Rationale:** Shared types/validation, atomic changes, single version control
**Consequences:** Slightly more complex setup, but massive DX improvement

### ADR-002: Next.js Over Vite + React
**Decision:** Use Next.js 15 App Router for frontend
**Rationale:** SSR for landing page, RSC performance, file-based routing, mature ecosystem
**Trade-offs:** Slightly larger bundle than Vite, but RSC mitigates this

### ADR-003: Hono Over Express
**Decision:** Use Hono for backend
**Rationale:** 10x faster, TypeScript-first, edge-ready, RPC client for type safety
**Consequences:** Smaller ecosystem than Express, but modern and performant

### ADR-004: Drizzle Over Prisma
**Decision:** Use Drizzle ORM
**Rationale:** Lightweight (7.4kb), SQL transparency, better for latency optimization
**Trade-offs:** Less tooling than Prisma, but performance critical for <800ms target

### ADR-005: Claude Sonnet 4.5 Over GPT-4o
**Decision:** Primary LLM is Claude Sonnet 4.5
**Rationale:** Stable latency, $0.225/user/month cost, prompt caching 90% savings
**Fallback:** GPT-4o mini available if cost optimization needed

### ADR-006: Unix Timestamps Over ISO Strings
**Decision:** Unix timestamps (integers) throughout system
**Rationale:** Consistency, smaller storage, simpler comparison
**Trade-offs:** Less human-readable in DB, but convert in frontend

### ADR-007: POJO Over Classes/Enums
**Decision:** Use plain objects with discriminators, no classes or enums
**Rationale:** Simpler serialization, no runtime overhead, better type inference
**Implementation:** Zod for validation, TypeScript unions for types

### ADR-008: Multi-Tier Caching Strategy
**Decision:** node-cache (Tier 1) + optional Redis (Tier 2)
**Rationale:** <1ms in-memory for <800ms guarantee, Redis for scaling
**Scaling Path:** Start in-memory only, add Redis when multiple instances needed

---

## Novel Architectural Patterns

### Pattern 1: AI Coaching with <800ms Latency Guarantee

**Challenge:** Real-time AI coaching without typical 2-5s LLM latency.

**Solution Components:**
1. Multi-tier caching system
2. Streaming responses (progressive UI)
3. Rule-based fallback
4. Pre-generation engine

**Data Flow:**
```
User triggers coaching
    ↓
Frontend → Hono /api/coaching endpoint
    ↓
Check Tier 1 (node-cache) - <1ms
    ├─ HIT → Return immediately
    └─ MISS ↓
Check Tier 2 (Redis, optional) - ~3ms
    ├─ HIT → Return + update Tier 1
    └─ MISS ↓
Parallel execution:
    ├─ Call Claude Sonnet 4.5 with streaming
    │   ├─ First token <500ms → start streaming
    │   └─ Complete <800ms target
    └─ If >600ms elapsed → Activate fallback
        └─ Return pre-generated coaching
    ↓
Cache successful responses (both tiers)
```

**Cache Keys:** `coaching:${userId}:${taskHash}`

**Rule-Based Fallback Patterns:**
```typescript
const fallbackPatterns = {
  work_task: "Does this align with your business goals?",
  learning_task: "Will this matter in 5 years?",
  urgent_task: "Is the urgency real or perceived?",
  low_confidence: "What info do you need to feel confident?"
};
```

**Streaming Implementation:**
- Use Server-Sent Events (SSE)
- Frontend shows "thinking..." → progressive text
- Perceived latency <300ms even if total 800ms

**Affects:** FR24-37 (all AI coaching)

---

### Pattern 2: Persona-Adaptive UI Without Explicit Configuration

**Challenge:** Detect persona (founder vs student) from behavior, adapt tone without asking.

**Solution Components:**
1. Persona Signal Collector
2. Inference Engine
3. Adaptive Rendering System
4. Tone Adapter (backend coaching prompts)

**Signal Collection:**
```typescript
interface PersonaSignals {
  deviceType: 'desktop' | 'mobile';  // Alex=desktop, Jordan=mobile
  taskComplexity: number;             // Alex=higher
  timeOfDay: 'work_hours' | 'evening'; // Alex=work, Jordan=evening
  taskKeywords: string[];             // 'fundraise'=Alex, 'exam'=Jordan
  sessionLength: number;              // Alex=longer
}
```

**Inference Scoring:**
```typescript
function inferPersona(signals: PersonaSignals): PersonaType {
  let score = 0;
  if (signals.deviceType === 'desktop') score += 2;
  if (signals.taskComplexity > 7) score += 2;
  if (signals.taskKeywords.some(k => ['business', 'customer', 'revenue'].includes(k))) score += 3;
  // score > 5 = founder, score < -5 = student, else neutral
  return score > 5 ? 'founder' : score < -5 ? 'student' : 'neutral';
}
```

**Adaptive Components:**
```typescript
// Frontend
const persona = usePersona();
<CoachingPanel
  tone={persona === 'founder' ? 'challenging' : 'supportive'}
  language={persona === 'founder' ? 'opportunity cost' : 'future value'}
/>

// Backend
function buildCoachingPrompt(task: Task, persona: PersonaType, goals: Goal[]) {
  const toneInstruction = persona === 'founder'
    ? "Use direct, business-focused language. Frame as opportunity cost."
    : "Use supportive, permission-granting language. Frame as long-term value.";
  return `${toneInstruction}\n\nTask: ${task.text}\nGoals: ${goals}...`;
}
```

**Graceful Degradation:**
- Start neutral, adapt after 5 tasks or 1 week
- Never wrong—both tones helpful
- Manual override in settings

**Affects:** FR29-31, FR49-54

---

### Pattern 3: Freemium Usage Limiting Without Breaking Flow

**Challenge:** Limit free tier (10 coaching/month) without nagging.

**Solution:**

**Usage Tracking:**
```typescript
async function trackCoachingUsage(userId: string): Promise<number> {
  const month = new Date().toISOString().slice(0, 7); // "2025-11"
  const key = `coaching:count:${userId}:${month}`;
  const count = await cache.incr(key);
  await cache.expire(key, 30 * 24 * 60 * 60); // 30 days
  return count;
}
```

**Soft Limit UX:**
- 0-6 uses: No indication
- 7 uses (70%): Badge "3 free coaching left this month"
- 9 uses (90%): Gentle "1 left—upgrade for unlimited"
- 10 uses (100%): Button shows "Upgrade for coaching" but tasks work perfectly
- Never: Block task creation, nag popups, guilt language

**Contextual Upgrade Prompts:**
- After successful coaching → "Want this every time? Upgrade"
- 5 tasks completed → "Loving this? Get unlimited coaching"
- Never on errors or blocking core features

**Affects:** FR55-60

---

## Data Architecture

### Database Schema (Drizzle)

**users table:**
```typescript
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: integer('created_at').notNull(), // Unix timestamp
  updatedAt: integer('updated_at').notNull(),
  coachingCount: integer('coaching_count').notNull().default(0),
  coachingResetAt: integer('coaching_reset_at'), // Unix timestamp
  personaSignals: jsonb('persona_signals').$type<PersonaSignals>()
});
```

**refresh_tokens table:**
```typescript
export const refreshTokens = pgTable('refresh_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 500 }).notNull().unique(),
  expiresAt: integer('expires_at').notNull(), // Unix timestamp
  createdAt: integer('created_at').notNull()
});
```

**tasks table:**
```typescript
export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  text: varchar('text', { length: 500 }).notNull(),
  importance: integer('importance'), // 1-10, optional
  confidence: integer('confidence'), // 1-10, optional
  isCompleted: boolean('is_completed').notNull().default(false),
  completedAt: integer('completed_at'), // Unix timestamp
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull()
});
```

**goals table:**
```typescript
export const goals = pgTable('goals', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  whatMatters: text('what_matters').notNull(),
  biggestWin: text('biggest_win').notNull(),
  worstOutcome: text('worst_outcome').notNull(),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull()
});
```

**coaching_interactions table:**
```typescript
export const coachingInteractions = pgTable('coaching_interactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  taskId: uuid('task_id').references(() => tasks.id, { onDelete: 'set null' }),
  questionHash: varchar('question_hash', { length: 64 }).notNull(), // SHA-256 of task text
  response: text('response').notNull(),
  latency: integer('latency').notNull(), // milliseconds
  tokenCount: jsonb('token_count').$type<{ input: number; output: number }>(),
  cost: numeric('cost', { precision: 10, scale: 6 }), // USD
  cacheHit: boolean('cache_hit').notNull().default(false),
  createdAt: integer('created_at').notNull()
});
```

**coaching_cache table:**
```typescript
export const coachingCache = pgTable('coaching_cache', {
  id: uuid('id').primaryKey().defaultRandom(),
  questionHash: varchar('question_hash', { length: 64 }).notNull().unique(),
  response: text('response').notNull(),
  hitCount: integer('hit_count').notNull().default(1),
  expiresAt: integer('expires_at').notNull(), // Unix timestamp
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull()
});
```

### Indexes

```sql
-- Performance-critical queries
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_user_completed ON tasks(user_id, is_completed);
CREATE INDEX idx_coaching_interactions_user ON coaching_interactions(user_id);
CREATE INDEX idx_coaching_cache_hash ON coaching_cache(question_hash);
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
```

---

## API Contracts

### Authentication Endpoints

**POST /api/auth/signup**
```typescript
// Request
{
  "email": "alex@example.com",
  "password": "SecurePass123!"
}

// Response (200)
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "alex@example.com",
      "createdAt": 1732186200
    },
    "accessToken": "jwt-token"
  }
}
// Sets httpOnly cookie: refreshToken
```

**POST /api/auth/login**
```typescript
// Request
{
  "email": "alex@example.com",
  "password": "SecurePass123!"
}

// Response (200)
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "alex@example.com"
    },
    "accessToken": "jwt-token"
  }
}
```

**POST /api/auth/refresh**
```typescript
// Request (no body, uses httpOnly cookie)

// Response (200)
{
  "success": true,
  "data": {
    "accessToken": "new-jwt-token"
  }
}
// Sets new httpOnly cookie: refreshToken
```

**POST /api/auth/logout**
```typescript
// Request (no body)

// Response (200)
{
  "success": true,
  "data": null
}
// Clears httpOnly cookie
```

### Task Endpoints

**GET /api/tasks**
```typescript
// Query params: ?completed=false

// Response (200)
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "uuid",
        "text": "Prepare pitch deck",
        "importance": 9,
        "confidence": 7,
        "isCompleted": false,
        "createdAt": 1732186200,
        "updatedAt": 1732186200
      }
    ]
  }
}
```

**POST /api/tasks**
```typescript
// Request
{
  "text": "Prepare pitch deck",
  "importance": 9,
  "confidence": 7
}

// Response (201)
{
  "success": true,
  "data": {
    "task": {
      "id": "uuid",
      "text": "Prepare pitch deck",
      "importance": 9,
      "confidence": 7,
      "isCompleted": false,
      "createdAt": 1732186200,
      "updatedAt": 1732186200
    }
  }
}
```

**PATCH /api/tasks/:id**
```typescript
// Request
{
  "isCompleted": true
}

// Response (200)
{
  "success": true,
  "data": {
    "task": {
      "id": "uuid",
      "text": "Prepare pitch deck",
      "importance": 9,
      "confidence": 7,
      "isCompleted": true,
      "completedAt": 1732190000,
      "createdAt": 1732186200,
      "updatedAt": 1732190000
    }
  }
}
```

**DELETE /api/tasks/:id**
```typescript
// Response (200)
{
  "success": true,
  "data": null
}
```

### Coaching Endpoints

**POST /api/coaching**
```typescript
// Request
{
  "taskId": "uuid",
  "taskText": "Prepare pitch deck"
}

// Response (200) - Streaming SSE
// Stream of events:
{
  "type": "thinking"
}
{
  "type": "token",
  "data": { "text": "Have " }
}
{
  "type": "token",
  "data": { "text": "you " }
}
...
{
  "type": "complete",
  "data": {
    "response": "Have you validated your key assumptions with potential customers?",
    "latency": 650,
    "cached": false
  }
}
```

---

## Security Architecture

### Authentication Flow

1. **Signup/Login:**
   - Password → bcrypt hash (cost 12)
   - Generate access token (JWT, 15min expiry)
   - Generate refresh token (random, 7 day expiry)
   - Store refresh token in DB
   - Set httpOnly cookie with refresh token
   - Return access token in response

2. **Protected Requests:**
   - Client sends `Authorization: Bearer {accessToken}`
   - Middleware validates JWT signature
   - Extract userId from JWT payload
   - Attach to request context

3. **Token Refresh:**
   - Client sends request with expired access token
   - Gets 401 response
   - Automatically calls /api/auth/refresh with httpOnly cookie
   - Backend validates refresh token from DB
   - Issues new access + refresh tokens
   - Invalidates old refresh token (rotation)
   - Client retries original request

4. **Logout:**
   - Delete refresh token from DB
   - Clear httpOnly cookie
   - Client discards access token

### Input Validation

- All inputs validated with Zod schemas (packages/validation)
- Frontend validates before submission
- Backend validates again (never trust client)
- Sanitize HTML/SQL injection attempts
- Rate limiting on auth endpoints (5 attempts/15min)

### Data Protection

- TLS enforced (Vercel + Railway)
- Passwords never logged
- PII (task text, goals) hashed in logs
- CORS configured for frontend origin only
- CSRF protection via SameSite cookies

---

## Performance Considerations

### Caching Strategy

**Tier 1: In-Memory (node-cache)**
- Coaching responses: 1 hour TTL
- User goals: 5 min TTL
- Persona signals: 10 min TTL
- Hit rate target: 60%

**Tier 2: Redis (Optional)**
- Shared cache across backend instances
- Same data as Tier 1
- Longer TTLs (24 hours)
- Scaling beyond single instance

### Query Optimization

- Indexed foreign keys
- Composite indexes for common filters
- Pagination for large result sets
- Connection pooling (Drizzle)

### Bundle Optimization

- Code splitting (Next.js automatic)
- Tree-shaking (Vite/Next.js)
- Image optimization (Next.js Image)
- Font optimization (Next.js Font)
- RSC reduces client bundle

### Latency Targets

- Task CRUD: <100ms perceived (optimistic UI)
- AI Coaching: <800ms hard limit (caching + streaming)
- Page load TTI: <3s on 3G
- FCP: <1.5s

---

## Deployment Architecture

### Frontend (Vercel)

- Deploy from `apps/web`
- Environment variables via Vercel dashboard
- Edge CDN globally
- Automatic HTTPS
- Preview deployments per PR
- Production: simple-todo.vercel.app

### Backend (Railway)

- Deploy from `apps/api`
- PostgreSQL addon (same project)
- Environment variables via Railway dashboard
- Automatic TLS
- Usage-based pricing
- Production: api.simple-todo.railway.app

### Database (Railway PostgreSQL)

- Managed PostgreSQL 17
- Automatic backups
- Connection pooling
- Monitoring included

### Environment Variables

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_API_URL=https://api.simple-todo.railway.app
```

**Backend (.env):**
```bash
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=random-secret-key
JWT_REFRESH_SECRET=random-refresh-secret
ANTHROPIC_API_KEY=sk-ant-...
NODE_ENV=production
```

---

## Development Environment

### Prerequisites

- Node.js 20.19+
- pnpm 9.15+
- PostgreSQL 17 (local or Docker)

### Setup Commands

```bash
# Clone and install
git clone <repo>
cd simple-todo
pnpm install

# Setup database
cd apps/api
cp .env.example .env
# Edit .env with local DATABASE_URL
pnpm db:push

# Start dev servers (from root)
pnpm dev

# Run tests
pnpm test

# Build all
pnpm build

# Lint
pnpm lint
```

### Local Development URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Database: postgresql://localhost:5432/simple_todo

---

**Generated by BMAD Architecture Workflow v1.0**
**Date:** 2025-11-21
**Author:** BMad
