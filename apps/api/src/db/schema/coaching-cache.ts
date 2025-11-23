import {
  index,
  integer,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const coachingCache = pgTable(
  "coaching_cache",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    questionHash: varchar("question_hash", { length: 64 }).notNull().unique(),
    response: text("response").notNull(),
    hitCount: integer("hit_count").notNull().default(1),
    expiresAt: integer("expires_at").notNull(), // Unix timestamp
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
  },
  (table) => [index("idx_coaching_cache_hash").on(table.questionHash)]
);
