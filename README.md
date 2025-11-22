# Simple Todo

A modern, full-stack todo application built with Next.js, Hono, and Turborepo.

## Prerequisites

- Node.js >= 20
- pnpm >= 9.15

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   pnpm exec playwright install
   ```

2. Build the project:
   ```bash
   pnpm build
   ```

## Development

Start the development server:

```bash
pnpm dev
```

This will start:

- Web app: <http://localhost:3000>
- API: <http://localhost:3001> (or similar)

## Commands

- `pnpm build`: Build all packages
- `pnpm dev`: Start development servers
- `pnpm lint`: Run ESLint
- `pnpm check-types`: Run TypeScript check
- `pnpm test`: Run unit tests (Vitest)
- `pnpm test:e2e`: Run E2E tests (Playwright) - run in `apps/web`

## Project Structure

- `apps/web`: Next.js frontend
- `apps/api`: Hono backend
- `packages/types`: Shared TypeScript types
- `packages/validation`: Shared Zod schemas
- `packages/typescript-config`: Shared TS config
- `packages/eslint-config`: Shared ESLint config
