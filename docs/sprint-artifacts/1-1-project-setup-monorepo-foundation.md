# Story 1.1: Project Setup & Monorepo Foundation

Status: drafted

## Story

As a **development team**,
I want **a properly initialized monorepo with build system and deployment pipeline**,
so that **all subsequent stories can be developed and deployed rapidly**.

## Acceptance Criteria

1. **Given** a new project repository, **when** running `pnpm install && pnpm build`, **then** all packages compile without errors
2. Turborepo caching works correctly (second build near-instant)
3. Project structure follows architecture doc (apps/web, apps/api, packages/*)
4. TypeScript configured with strict mode across all packages
5. ESLint + Prettier configured with consistent rules
6. Git hooks prevent commits with lint/type errors

## Tasks / Subtasks

- [ ] Initialize monorepo structure (AC: 1, 3)
  - [ ] Create pnpm workspace at project root
  - [ ] Setup apps/web (Next.js 15.5)
  - [ ] Setup apps/api (Hono 4.10+)
  - [ ] Create packages/types, packages/validation, packages/typescript-config, packages/eslint-config
- [ ] Configure build system (AC: 2)
  - [ ] Install and configure Turborepo 2.3+
  - [ ] Setup turbo.json with pipeline dependencies
  - [ ] Verify build caching works (run build twice, confirm instant second run)
- [ ] Configure TypeScript (AC: 4)
  - [ ] Create base tsconfig.json in packages/typescript-config
  - [ ] Extend base config in each app/package
  - [ ] Enable strict mode, noImplicitAny, strictNullChecks
  - [ ] Verify no type errors across all packages
- [ ] Configure linting and formatting (AC: 5)
  - [ ] Setup ESLint base config in packages/eslint-config
  - [ ] Configure Prettier with consistent rules
  - [ ] Add lint scripts to all packages
  - [ ] Verify lint passes across all packages
- [ ] Setup git hooks (AC: 6)
  - [ ] Install husky
  - [ ] Configure pre-commit hook running lint + type check
  - [ ] Test hook prevents commit on errors
- [ ] Setup testing frameworks
  - [ ] Install and configure Vitest for unit tests
  - [ ] Install and configure Playwright for E2E
  - [ ] Create example test in each framework
- [ ] Initialize CI/CD placeholder
  - [ ] Create GitHub Actions workflow file
  - [ ] Add basic build + test checks
  - [ ] Setup to run on PR and main branch
- [ ] Documentation
  - [ ] Create README with setup instructions
  - [ ] Document prerequisites (Node.js version, pnpm)
  - [ ] Document common commands (install, build, test, lint)

## Dev Notes

### Technical Context

**Monorepo Architecture** [Source: docs/architecture/architecture-decision-records.md ADR-001]
- Turborepo for build orchestration and caching
- pnpm workspaces for dependency management
- Shared packages for code reuse across apps

**Required Package Versions:**
- pnpm: 9.15+
- Turborepo: 2.3+
- Next.js: 15.5
- Hono: 4.10+
- TypeScript: 5.x (strict mode)

**Folder Structure:**
```
simple-todo/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Hono backend
├── packages/
│   ├── types/        # Shared TypeScript types
│   ├── validation/   # Zod schemas
│   ├── typescript-config/  # Base tsconfig
│   └── eslint-config/      # ESLint rules
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

**Testing Strategy:**
- Vitest for unit tests (fast, modern)
- Playwright for E2E tests (cross-browser)
- Tests should run in CI before merge

**CI/CD Placeholder:**
- Basic GitHub Actions setup only
- Full deployment pipeline in Story 1.11
- Should verify: build passes, tests pass, lint passes

### Project Structure Notes

This story establishes the foundation structure that all subsequent stories will build upon. No conflicts expected as this is the first story.

**Critical Success Factors:**
- Build must be fast (caching working)
- Type safety enforced from start
- Git hooks prevent broken code from being committed
- Clear documentation for team onboarding

### References

- [Source: docs/architecture/architecture-decision-records.md#ADR-001] - Monorepo architecture decision
- [Source: docs/epics/epic-1-foundation-instant-value.md#Story-1.1] - Story specification
- [Source: docs/prd/prd-summary.md] - Overall project context

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

<!-- Will be populated by dev agent -->

### Debug Log References

<!-- Will be populated by dev agent during implementation -->

### Completion Notes List

<!-- Will be populated by dev agent upon completion -->

### File List

<!-- Will be populated by dev agent with created/modified files -->
