# Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

## Naming Conventions

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

## Code Organization

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

## Error Handling

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

## Logging Strategy

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

## Date/Time Handling

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

## Authentication Pattern

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

## API Response Format

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

## Validation Pattern

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

## Testing Strategy

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
