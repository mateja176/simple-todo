import { integer, jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export type PersonaSignals = Record<string, unknown>;

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
