# Data Architecture

## Database Schema (Drizzle)

**users table:**

```typescript
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: integer("created_at").notNull(), // Unix timestamp
  updatedAt: integer("updated_at").notNull(),
  coachingCount: integer("coaching_count").notNull().default(0),
  coachingResetAt: integer("coaching_reset_at"), // Unix timestamp
  personaSignals: jsonb("persona_signals").$type<PersonaSignals>(),
});
```

**refresh_tokens table:**

```typescript
export const refreshTokens = pgTable("refresh_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 500 }).notNull().unique(),
  expiresAt: integer("expires_at").notNull(), // Unix timestamp
  createdAt: integer("created_at").notNull(),
});
```

**tasks table:**

```typescript
export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  text: varchar("text", { length: 500 }).notNull(),
  importance: integer("importance"), // 1-10, optional
  confidence: integer("confidence"), // 1-10, optional
  isCompleted: boolean("is_completed").notNull().default(false),
  completedAt: integer("completed_at"), // Unix timestamp
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
});
```

**goals table:**

```typescript
export const goals = pgTable("goals", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  whatMatters: text("what_matters").notNull(),
  biggestWin: text("biggest_win").notNull(),
  worstOutcome: text("worst_outcome").notNull(),
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
});
```

**coaching_interactions table:**

```typescript
export const coachingInteractions = pgTable("coaching_interactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  taskId: uuid("task_id").references(() => tasks.id, { onDelete: "set null" }),
  questionHash: varchar("question_hash", { length: 64 }).notNull(), // SHA-256 of task text
  response: text("response").notNull(),
  latency: integer("latency").notNull(), // milliseconds
  tokenCount: jsonb("token_count").$type<{ input: number; output: number }>(),
  cost: numeric("cost", { precision: 10, scale: 6 }), // USD
  cacheHit: boolean("cache_hit").notNull().default(false),
  createdAt: integer("created_at").notNull(),
});
```

**coaching_cache table:**

```typescript
export const coachingCache = pgTable("coaching_cache", {
  id: uuid("id").primaryKey().defaultRandom(),
  questionHash: varchar("question_hash", { length: 64 }).notNull().unique(),
  response: text("response").notNull(),
  hitCount: integer("hit_count").notNull().default(1),
  expiresAt: integer("expires_at").notNull(), // Unix timestamp
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
});
```

## Indexes

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
