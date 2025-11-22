# Story 1.2: Database Schema & Drizzle ORM Setup

Status: done

## Story

**As a** backend developer,
**I want** PostgreSQL database initialized with all required tables,
**So that** user and task data can be persisted.

## Acceptance Criteria

1. **Given** PostgreSQL 17.7 running locally, **when** running `pnpm db:migrate`, **then** all tables created: users, refresh_tokens, tasks, goals, coaching_interactions, coaching_cache
2. Drizzle schema matches data-architecture.md specification exactly
3. Indexes created for performance-critical queries (per data-architecture.md)
4. Connection pooling configured (max 20 connections for MVP)
5. Database seeded with test data for local development
6. Migration rollback works correctly

## Tasks / Subtasks

- [x] Setup Database Environment (AC: 1)
  - [x] Configure Docker Compose for local PostgreSQL 17.7
  - [x] Configure environment variables (DATABASE_URL)
  - [ ] Setup production database (Railway PostgreSQL addon)
- [x] Configure Drizzle ORM (AC: 2)
  - [x] Install Drizzle ORM 0.44+ and PostgreSQL adapter
  - [x] Configure Drizzle Kit for migrations
  - [x] Setup schema directory structure in `apps/api/src/db/schema/`
- [x] Implement Database Schema (AC: 2, 3)
  - [x] Define `users` table (UUID, email, password_hash, timestamps)
  - [x] Define `refresh_tokens` table (UUID, user_id, token, expires_at)
  - [x] Define `tasks` table (UUID, user_id, title, status, timestamps)
  - [x] Define `goals` table (UUID, user_id, title, description, timestamps)
  - [x] Define `coaching_interactions` table (UUID, user_id, task_id, prompt, response)
  - [x] Define `coaching_cache` table (key, value, expires_at)
  - [x] Add indexes for foreign keys and frequent query fields
- [x] Configure Connection Pooling (AC: 4)
  - [x] Setup connection pooling in Drizzle config
  - [x] Configure max connections (20)
- [x] Implement Seeding & Migrations (AC: 5, 6)
  - [x] Create seed script with test users and tasks
  - [x] Generate initial migration
  - [x] Verify migration rollback works
  - [x] Add `db:migrate` and `db:seed` scripts to `package.json`
- [x] Documentation & Testing
  - [x] Document database schema and setup instructions
  - [ ] Add unit tests for schema validation (if applicable)

## Dev Notes

### Technical Context

**Database Architecture** [Source: docs/architecture/data-architecture.md]

- **Database:** PostgreSQL 17.7
- **ORM:** Drizzle ORM 0.44+
- **IDs:** UUIDv4 for all primary keys
- **Timestamps:** Unix timestamps (BigInt) or ISO strings (check ADR-006) - Epic says Unix timestamps.
- **JSONB:** Used for `persona_signals` and flexible data.

**Schema Requirements:**

- `users`: id, email, password_hash, created_at, updated_at
- `refresh_tokens`: id, user_id, token, expires_at, created_at
- `tasks`: id, user_id, title, status, created_at, updated_at
- `goals`: id, user_id, title, description, created_at, updated_at
- `coaching_interactions`: id, user_id, task_id, prompt, response, created_at
- `coaching_cache`: key, value, expires_at

### Learnings from Previous Story

#### From Story 1.1 (Status: done)

- **Monorepo Structure**: `apps/api` is the target for database setup.
- **Package Management**: Use `pnpm add` in `apps/api`.
- **Env Vars**: Add `DATABASE_URL` to `.env` (and `.env.example`).
- **Scripts**: Add db scripts to `apps/api/package.json` and expose via `turbo`.

### References

- [Source: docs/epics/epic-1-foundation-instant-value.md#Story-1.2] - Story specification
- [Source: docs/architecture/data-architecture.md] - Data architecture
- [Source: docs/sprint-artifacts/1-1-project-setup-monorepo-foundation.md] - Previous story

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/1-2-database-schema-drizzle-orm-setup.context.xml

### Agent Model Used

Gemini 3 Pro (Preview)

### Debug Log References

(Empty)

### Completion Notes List

- Code review passed.
- Schema verified against architecture.
- Migration and seed scripts verified.
- Connection pooling verified.

- Database environment setup with Docker Compose (PostgreSQL 17.7).
- Drizzle ORM configured with `postgres` driver and connection pooling.
- Schema implemented matching `data-architecture.md`.
- Migrations generated and applied.
- Seeding script created and verified.
- Documentation added in `docs/architecture/database-setup.md`.

### File List

- `docker-compose.yml`
- `apps/api/.env`
- `apps/api/.env.example`
- `apps/api/package.json`
- `apps/api/drizzle.config.ts`
- `apps/api/src/db/index.ts`
- `apps/api/src/db/seed.ts`
- `apps/api/src/db/schema/index.ts`
- `apps/api/src/db/schema/users.ts`
- `apps/api/src/db/schema/refresh-tokens.ts`
- `apps/api/src/db/schema/tasks.ts`
- `apps/api/src/db/schema/goals.ts`
- `apps/api/src/db/schema/coaching-interactions.ts`
- `apps/api/src/db/schema/coaching-cache.ts`
- `docs/architecture/database-setup.md`

### Change Log

- 2025-11-22: Story drafted by SM Agent
- 2025-11-22: Implementation completed by Dev Agent. Database setup, schema, migrations, and seeding implemented. Documentation added.
