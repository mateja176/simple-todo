# Project Structure

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
