# Database Setup & Schema

## Prerequisites

- Docker & Docker Compose
- Node.js & pnpm

## Setup

1. Start the database:

   ```bash
   docker compose up -d
   ```

2. Install dependencies (if not already):

   ```bash
   pnpm install
   ```

3. Generate migrations:

   ```bash
   cd apps/api
   pnpm db:generate
   ```

4. Apply migrations:

   ```bash
   cd apps/api
   pnpm db:migrate
   ```

5. Seed the database:

   ```bash
   cd apps/api
   pnpm db:seed
   ```

## Schema

The schema is defined in `apps/api/src/db/schema/`.
Main tables:

- `users`
- `refresh_tokens`
- `tasks`
- `goals`
- `coaching_interactions`
- `coaching_cache`

See `docs/architecture/data-architecture.md` for detailed schema specification.

## Commands

- `pnpm db:generate`: Generate SQL migrations from Drizzle schema.
- `pnpm db:migrate`: Apply migrations to the database.
- `pnpm db:push`: Push schema changes directly to DB (prototyping).
- `pnpm db:studio`: Open Drizzle Studio to view/edit data.
- `pnpm db:seed`: Seed database with test data.
