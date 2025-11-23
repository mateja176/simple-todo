import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.ts";

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
