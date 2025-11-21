# Architecture Document (Continuation)

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

_Generated by BMAD Architecture Workflow v1.0_
_Date: 2025-11-21_
