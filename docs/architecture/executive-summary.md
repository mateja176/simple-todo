# Executive Summary

Monorepo architecture with separated Next.js 16.0.3 frontend and Hono backend, optimized for <800ms AI coaching latency through multi-tier caching and streaming. TypeScript-first development with shared types and validation schemas. Turborepo + pnpm workspaces enable atomic changes and fast builds. Modern stack chosen for performance (Hono 10x faster than Express), type safety (end-to-end), and edge computing readiness.

**Core Architectural Principles:**

- Type-safe API communication (Hono RPC client)
- Independent frontend/backend scaling (critical for AI coaching load)
- Unix timestamps throughout (consistency)
- POJO with discriminators (no classes/enums)
- Aggressive caching (multi-tier: in-memory + Redis)
- Anti-guilt UX philosophy (minimal complexity, maximum clarity)

---
