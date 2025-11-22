import { boolean, index, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { users } from './users.js'

export const tasks = pgTable(
  'tasks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    text: varchar('text', { length: 500 }).notNull(),
    importance: integer('importance'), // 1-10, optional
    confidence: integer('confidence'), // 1-10, optional
    isCompleted: boolean('is_completed').notNull().default(false),
    completedAt: integer('completed_at'), // Unix timestamp
    createdAt: integer('created_at').notNull(),
    updatedAt: integer('updated_at').notNull(),
  },
  (table) => [
    index('idx_tasks_user_id').on(table.userId),
    index('idx_tasks_user_completed').on(table.userId, table.isCompleted),
  ]
)
