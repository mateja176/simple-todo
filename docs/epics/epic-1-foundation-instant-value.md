# Epic 1: Foundation & Instant Value

**Goal:** User can discover product value, sign up, and create first task within 60 seconds. Establishes technical foundation for all subsequent epics.

**User Value:** Instant onboarding with zero friction. Landing page communicates regret-prevention value proposition. Authentication that doesn't block momentum.

**FRs Covered:** FR1-6 (auth), FR66-67 (landing page), FR71 (baseline reliability)

---

## Story 1.1: Project Setup & Monorepo Foundation

**As a** development team,
**I want** a properly initialized monorepo with build system and deployment pipeline,
**So that** all subsequent stories can be developed and deployed rapidly.

**Acceptance Criteria:**

**Given** a new project repository
**When** running `pnpm install && pnpm build`
**Then** all packages compile without errors

**And** Turborepo caching works correctly (second build near-instant)
**And** Project structure follows architecture doc (apps/web, apps/api, packages/\*)
**And** TypeScript configured with strict mode across all packages
**And** ESLint + Prettier configured with consistent rules
**And** Git hooks prevent commits with lint/type errors

**Prerequisites:** None (first story)

**Technical Notes:**

- Monorepo structure per ADR-001 (architecture/architecture-decision-records.md)
- Turborepo 2.3+ for build orchestration
- pnpm 9.15+ workspaces
  lint-config Shared packages: @repo/types, @repo/validation, @repo/typescript-config, @repo/eslint-config
- Initialize Next.js 16.0.3 (apps/web), Hono 4.10+ (apps/api)
- Setup Vitest for unit tests, Playwright for E2E
- CI/CD placeholder (GitHub Actions basic setup)
- Document setup in README with prerequisites

---

## Story 1.2: Database Schema & Drizzle ORM Setup

**As a** backend developer,
**I want** PostgreSQL database initialized with all required tables,
**So that** user and task data can be persisted.

**Acceptance Criteria:**

**Given** PostgreSQL 17.7 running locally
**When** running `pnpm db:migrate`
**Then** all tables created: users, refresh_tokens, tasks, goals, coaching_interactions, coaching_cache

**And** Drizzle schema matches data-architecture.md specification exactly
**And** Indexes created for performance-critical queries (per data-architecture.md)
**And** Connection pooling configured (max 20 connections for MVP)
**And** Database seeded with test data for local development
**And** Migration rollback works correctly

**Prerequisites:** Story 1.1 (project structure exists)

**Technical Notes:**

- Drizzle ORM 0.44+ with PostgreSQL 17 adapter
- Schema files in apps/api/src/db/schema/
- Unix timestamps for all date fields (ADR-006)
- JSONB for persona_signals (flexible structure)
- Use UUIDs for primary keys (security, distributed systems)
- Environment variables: DATABASE_URL
- Local dev: Docker Compose for PostgreSQL
- Production: Railway PostgreSQL addon

---

## Story 1.3: Authentication API - Signup & Login

**As a** user,
**I want** to create an account and log in with email/password,
**So that** my tasks are private and persisted.

**Acceptance Criteria:**

**Given** valid email and password (8+ chars, 1 uppercase, 1 number, 1 special)
**When** POST /api/auth/signup
**Then** user created in database with bcrypt hash (cost factor 12)

**And** JWT access token returned (24h expiry, HS256)
**And** Refresh token set in httpOnly cookie (30d expiry)
**And** User object returned (id, email, createdAt)
**And** Response time <200ms (P95)

**Given** existing user credentials
**When** POST /api/auth/login
**Then** user authenticated, tokens issued same as signup

**And** Invalid credentials return 401 with generic error (don't leak user existence)
**And** Rate limited to 5 login attempts per IP per hour (prevent brute force)

**Prerequisites:** Story 1.2 (database schema exists)

**Technical Notes:**

- Endpoints per api-contracts.md
- bcrypt with cost factor 12 (security-architecture.md)
- JWT signing secret from environment variable (JWT_SECRET)
- Refresh token stored in refresh_tokens table
- Zod validation for request bodies (@repo/validation)
- Error responses follow API response format (implementation-patterns.md)
- Log auth events with Pino (no sensitive data logged)
- Tests: unit (validation), integration (E2E flow)

---

## Story 1.4: Authentication API - Token Refresh & Logout

**As a** user,
**I want** my session to persist across browser sessions and be able to log out,
**So that** I don't have to re-login frequently but can secure my account.

**Acceptance Criteria:**

**Given** valid refresh token in httpOnly cookie
**When** POST /api/auth/refresh
**Then** new access token issued (24h expiry)

**And** new refresh token issued, old one invalidated (rotation)
**And** response time <100ms (P95)

**Given** authenticated user
**When** POST /api/auth/logout
**Then** refresh token removed from database

**And** httpOnly cookie cleared
**And** subsequent requests with old tokens return 401

**Given** expired or invalid refresh token
**When** POST /api/auth/refresh
**Then** 401 error returned, user must re-login

**Prerequisites:** Story 1.3 (signup/login exists)

**Technical Notes:**

- FR4 (session persistence), FR5 (logout)
- Token rotation prevents replay attacks
- Cleanup job for expired refresh tokens (daily cron)
- Tests: token rotation, expiration handling, logout flow

---

## Story 1.5: Authentication Middleware & Protected Routes

**As a** backend developer,
**I want** reusable authentication middleware,
**So that** protected endpoints verify JWT tokens consistently.

**Acceptance Criteria:**

**Given** protected endpoint (e.g., GET /api/tasks)
**When** request includes valid Authorization: Bearer <token>
**Then** request proceeds, user ID available in request context

**Given** missing or invalid token
**When** request to protected endpoint
**Then** 401 error returned with clear message

**And** error doesn't leak implementation details

**Given** expired access token
**When** request to protected endpoint
**Then** 401 error with "token_expired" code (client can auto-refresh)

**Prerequisites:** Story 1.4 (auth endpoints exist)

**Technical Notes:**

- Hono middleware pattern
- JWT verification with jsonwebtoken library
- Attach userId to request context for downstream handlers
- Tests: valid token, expired token, missing token, malformed token

---

## Story 1.6: Frontend Authentication State Management

**As a** user,
**I want** seamless authentication across page refreshes,
**So that** I remain logged in without disruption.

**Acceptance Criteria:**

**Given** user logs in successfully
**When** access token received from backend
**Then** token stored in Zustand auth store (memory only, not localStorage)

**And** token included in all API requests via TanStack Query
**And** user state persists across page navigations (not full refreshes)

**Given** page refresh occurs
**When** app initializes
**Then** refresh token endpoint called automatically

**And** new access token retrieved and stored
**And** user redirected to previous page (not login)

**Given** refresh token expired
**When** app initializes
**Then** user redirected to login page with session expired message

**Prerequisites:** Story 1.4 (auth API exists)

**Technical Notes:**

- Zustand for auth state (currentUser, accessToken, isAuthenticated)
- TanStack Query for API calls with auth interceptor
- Automatic token refresh on 401 responses
- Hono RPC Client for type-safe API calls
- Protected route wrapper for Next.js pages
- Tests: login flow, token refresh, protected route redirect

---

## Story 1.7: Landing Page - Value Prop & Demo Video

**As a** potential user,
**I want** to understand product value in 5 seconds,
**So that** I decide whether to sign up.

**Acceptance Criteria:**

**Given** visitor lands on homepage
**When** page loads
**Then** hero section visible above fold (<1.5s FCP per NFR-P3)

**And** headline: "Catch Regret Before It Happens" (or approved alternative)
**And** subheadline: AI coaching that prevents wasted effort on wrong priorities
**And** 15-second demo video showing user journey: task creation → coaching → aha moment
**And** Real example quotes visible:

- Alex: "AI caught me spending week on 0-user-wanted feature"
- Jordan: "AI saved me from all-nighter on low-value assignment"

**And** Clear CTA: "Get Started Free" button (prominent, high contrast)
**And** Mobile responsive: works at 320px width minimum
**And** Skeleton loading (no blank screens per FR47)

**Prerequisites:** Story 1.1 (Next.js app exists)

**Technical Notes:**

- FR66-67 (landing page, demo video)
- Next.js SSR for SEO (landing page only)
- Video: <5MB, autoplay muted loop, lazy load below fold
- Images: WebP format, responsive srcset
- Tailwind CSS for styling
- Open Graph tags for social sharing (FR69) - basic implementation
- Lighthouse score targets: FCP <1.5s, TTI <3s
- Tests: visual regression (Playwright screenshots), mobile responsive

---

## Story 1.8: Signup/Login UI Forms

**As a** user,
**I want** simple signup and login forms,
**So that** I can create account or access existing one quickly.

**Acceptance Criteria:**

**Given** user on landing page
**When** clicks "Get Started Free"
**Then** signup modal opens (or navigates to /signup)

**And** form fields: email, password
**And** Real-time validation: email format (RFC 5322), password requirements visible
**And** Password visibility toggle (eye icon)
**And** Submit button shows loading state during API call
**And** Success: redirect to /tasks with empty state
**And** Error: display user-friendly message below form

**Given** user clicks "Already have account? Log in"
**When** login form displays
**Then** same UX as signup (email, password, validation, loading states)

**And** "Forgot password?" link visible (Story 1.9)
**And** Form accessible via keyboard (Tab order logical, Enter submits)

**Prerequisites:** Story 1.6 (frontend auth state exists)

**Technical Notes:**

- React Hook Form + Zod resolver (@repo/validation)
- Optimistic UI: show loading, hide form details during submission
- WCAG 2.1 AA compliance (NFR-A1): labels, ARIA, contrast
- Error messages: generic for security ("Invalid credentials" not "User not found")
- Mobile: 44×44px tap targets minimum (FR52)
- Tests: form validation, submission flow, error handling

---

## Story 1.9: Password Reset Flow

**As a** user,
**I want** to reset my password if I forget it,
**So that** I can regain access to my account.

**Acceptance Criteria:**

**Given** user on login page
**When** clicks "Forgot password?"
**Then** password reset modal/page displays

**And** form requests email address
**And** submit sends password reset request

**Given** valid email submitted
**When** POST /api/auth/reset-password-request
**Then** reset token generated (1-hour expiry)

**And** email sent with reset link (future: email service integration)
**And** generic success message shown (don't leak user existence)
**And** rate limited to 3 requests per IP per hour

**Given** user clicks reset link with valid token
**When** reset password page loads
**Then** form requests new password (same validation as signup)

**And** submit updates password hash in database
**And** all refresh tokens invalidated (force re-login on all devices)
**And** success message: "Password updated, please log in"

**Prerequisites:** Story 1.3 (auth API exists)

**Technical Notes:**

- FR3 (password reset)
- Reset tokens stored in password_reset_tokens table (add to schema in Story 1.2)
- Tokens: random 32-byte hex, SHA-256 hashed in DB
- Email integration: placeholder for MVP (console.log), real service post-MVP
- Future: SendGrid/Postmark integration (NFR-I3)
- Tests: token generation, expiration, reset flow

---

## Story 1.10: Account Deletion

**As a** user,
**I want** to delete my account and all associated data,
**So that** I comply with GDPR and maintain privacy control.

**Acceptance Criteria:**

**Given** authenticated user
**When** navigates to account settings → delete account
**Then** confirmation modal displays with warning (irreversible action)

**And** requires password re-entry for confirmation
**And** checkbox: "I understand all my data will be permanently deleted"

**Given** user confirms deletion
**When** DELETE /api/auth/account endpoint called
**Then** all user data deleted: user record, tasks, goals, coaching_interactions, refresh_tokens

**And** cascade deletes work correctly (database foreign key constraints)
**And** user logged out immediately
**And** redirect to homepage with confirmation message
**And** subsequent login attempts fail (account no longer exists)

**Prerequisites:** Story 1.5 (protected routes exist)

**Technical Notes:**

- FR6, FR64 (account deletion, GDPR compliance)
- Database cascade deletes configured in schema (onDelete: 'cascade')
- Soft delete NOT used (hard delete for GDPR)
- Log deletion event (audit trail, no PII)
- Tests: cascade deletion, re-login prevention

---

## Story 1.11: Deployment Pipeline & Environment Config

**As a** development team,
**I want** automated deployment to staging and production,
**So that** code changes ship rapidly with confidence.

**Acceptance Criteria:**

**Given** code merged to main branch
**When** CI/CD pipeline runs
**Then** all tests pass (unit, integration, E2E)

**And** frontend deployed to Vercel (preview + production)
**And** backend deployed to Railway (staging + production)
**And** database migrations run automatically (Railway)
**And** environment variables configured per deployment-architecture.md
**And** deployment completes in <5 minutes
**And** health check endpoints verify deployment success

**Given** deployment fails
**When** tests fail or build errors occur
**Then** deployment blocked, team notified (Slack/email)

**And** previous version remains live (no downtime)

**Prerequisites:** Story 1.1 (project structure exists)

**Technical Notes:**

- Vercel for frontend (apps/web): automatic preview deploys, edge CDN
- Railway for backend (apps/api) + PostgreSQL: usage-based pricing
- Environment variables: JWT_SECRET, DATABASE_URL, ANTHROPIC_API_KEY (placeholder), etc.
- Health check endpoints: GET /api/health (backend), GET /health (frontend)
- GitHub Actions for CI/CD
- Deployment strategy: blue-green for backend (zero downtime)
- Monitor deployment metrics: success rate, duration
- Documentation: deployment runbook in docs/

---

## Story 1.12: Observability Foundation - Logging & Monitoring

**As a** development team,
**I want** structured logging and basic monitoring,
**So that** production issues are detectable and debuggable.

**Acceptance Criteria:**

**Given** application running in production
**When** requests processed
**Then** all logs structured JSON (Pino logger)

**And** log levels: error, warn, info, debug
**And** request correlation IDs for tracing
**And** no sensitive data logged (passwords, tokens, PII)
**And** logs searchable (Railway logs or external service)

**Given** critical error occurs (500 error, auth failure spike)
**When** threshold exceeded
**Then** alert triggered (email/Slack to team)

**And** error includes: timestamp, endpoint, user ID (if authenticated), error message, stack trace

**Given** performance metrics tracked
**When** viewing dashboard
**Then** key metrics visible: request latency (P50, P95, P99), error rate, active users

**Prerequisites:** Story 1.1 (project structure exists)

**Technical Notes:**

- Service blueprint insight: monitoring infrastructure needed from start
- Pino logger in backend (fast, structured)
- Frontend: error boundary component captures React errors
- Basic APM: Railway metrics or simple self-hosted solution
- Future: Sentry/Datadog for advanced monitoring (post-MVP)
- Alerts: Railway webhooks → Slack/email
- NFR-R4 (monitoring & alerting)
- Tests: log format validation, error tracking

---

**Epic 1 Complete: 12 Stories**

All stories sequenced for independent value delivery. Foundation established for Epic 2.

---
