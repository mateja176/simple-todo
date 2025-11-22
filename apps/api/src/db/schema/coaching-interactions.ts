import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { tasks } from './tasks.js'
import { users } from './users.js'

export const coachingInteractions = pgTable(
  'coaching_interactions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    taskId: uuid('task_id').references(() => tasks.id, { onDelete: 'set null' }),
    questionHash: varchar('question_hash', { length: 64 }).notNull(), // SHA-256 of task text
    response: text('response').notNull(),
    latency: integer('latency').notNull(), // milliseconds
    tokenCount: jsonb('token_count').$type<{ input: number; output: number }>(),
    cost: numeric('cost', { precision: 10, scale: 6 }), // USD
    cacheHit: boolean('cache_hit').notNull().default(false),
    createdAt: integer('created_at').notNull(),
  },
  (table) => [index('idx_coaching_interactions_user').on(table.userId)]
)
