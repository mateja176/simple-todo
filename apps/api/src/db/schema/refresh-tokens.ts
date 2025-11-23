import { index, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.ts";

export const refreshTokens = pgTable(
  "refresh_tokens",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: varchar("token", { length: 500 }).notNull().unique(),
    expiresAt: integer("expires_at").notNull(), // Unix timestamp
    createdAt: integer("created_at").notNull(),
  },
  (table) => [
    index("idx_refresh_tokens_user").on(table.userId),
    index("idx_refresh_tokens_token").on(table.token),
  ]
);
