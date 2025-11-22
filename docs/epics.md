# simple-todo - Epic Breakdown

**Author:** BMad
**Date:** 2025-11-22
**Project Level:** Medium Complexity (Domain: Low, Technical: Medium - <800ms AI latency constraint)
**Target Scale:** MVP validation (100 concurrent users)

---

## Overview

This document provides the complete epic and story breakdown for simple-todo, decomposing the requirements from the [PRD](./prd/index.md) into implementable stories.

**Living Document Notice:** This is the initial version created with PRD + Architecture context. Enhanced with journey mapping, service blueprint, stakeholder mapping, and empathy map insights.

**Epic Summary:**

- **Epic 1:** Foundation & Instant Value (Onboarding, Landing Page, Project Setup)
- **Epic 2:** Core Todo Experience (Baseline CRUD, Mobile & Desktop UX)
- **Epic 3:** AI Coaching with Context (Critical <800ms latency, Caching, Persona Adaptation)
- **Epic 4:** Power User & Personalization (Keyboard Shortcuts, Goal Management, Advanced UX)
- **Epic 5:** Growth, Analytics & Monetization (Freemium, Viral Features, BMAD Validation Metrics)

---

## Functional Requirements Inventory

**User Account & Authentication:**
- FR1: Users can create accounts with email and password
- FR2: Users can log in securely with email/password credentials
- FR3: Users can reset forgotten passwords via email verification
- FR4: Users can remain logged in across sessions (session persistence)
- FR5: Users can log out of their account
- FR6: Users can delete their account and all associated data

**Task Management (Baseline Functionality):**
- FR7: Users can create new tasks with plain text descriptions
- FR8: Users can view all their tasks in a list
- FR9: Users can edit task descriptions
- FR10: Users can delete tasks
- FR11: Users can mark tasks as complete
- FR12: Users can unmark completed tasks (return to active)
- FR13: Users can see visual distinction between active and completed tasks
- FR14: Task operations (create/edit/delete/complete) work without AI coaching enabled

**Optional Task Metadata:**
- FR15: Users can optionally assign importance rating to tasks
- FR16: Users can optionally assign confidence rating to tasks
- FR17: Users can view visual indicators of importance/confidence when assigned
- FR18: Users can skip all metadata and use app as simple todo list

**Goal Management (Optional):**
- FR19: Users can capture their top goals through conversational prompts (optional setup)
- FR20: Users can skip goal capture entirely and use app without goals
- FR21: Users can edit or update their goals at any time
- FR22: Users can view their saved goals
- FR23: System stores user goals to provide context for AI coaching

**AI Coaching (Optional Enhancement):**
- FR24: Users can enable/disable AI coaching at any time via toggle
- FR25: Users can request AI coaching on specific tasks
- FR26: Users can request AI coaching before creating a new task
- FR27: System provides AI coaching responses in <800ms (99th percentile)
- FR28: AI coaching references user's goals when providing guidance (if goals captured)
- FR29: AI coaching adapts tone based on detected persona (founder vs student context)
- FR30: AI coaching uses opportunity cost framing for business-context users
- FR31: AI coaching uses future-value framing for student-context users
- FR32: Users receive coaching in conversational, non-judgmental tone (2-3 sentences)
- FR33: Users can respond to coaching with actions: keep task, revise task, delete task, or ask follow-up
- FR34: Users can provide thumbs up/down feedback on coaching quality
- FR35: System functions with rule-based fallback when LLM unavailable (graceful degradation)
- FR36: System uses pre-generated coaching patterns for common scenarios (reduce latency)
- FR37: System caches coaching responses for similar tasks (reduce API calls)

**Smart Suggestions & Nudges (Non-Intrusive):**
- FR38: System detects when user has added 5+ tasks and offers gentle coaching invitation
- FR39: System shows example AI interaction before user's first coaching attempt
- FR40: System displays thinking indicator during AI response generation
- FR41: System celebrates progress milestones (every 5 completions) with positive messages
- FR42: All suggestions are dismissible and never block core functionality

**User Experience & Interface:**
- FR43: Users can access quick-add task entry from any screen (always visible)
- FR44: Users receive immediate visual feedback when creating/completing tasks (optimistic UI)
- FR45: Desktop users can use keyboard shortcuts for common actions (new task, search, etc.)
- FR46: Mobile users can use swipe gestures for task actions
- FR47: Users see skeleton screens during loading (never blank screens)
- FR48: Interface adapts layout based on screen size (mobile, tablet, desktop)

**Persona-Specific Adaptations:**
- FR49: System detects usage context (desktop vs mobile, task complexity patterns)
- FR50: Desktop interface shows multi-column layout when space allows
- FR51: Mobile interface uses bottom navigation optimized for thumb reach
- FR52: Mobile interface uses touch-optimized tap targets (44×44px minimum)
- FR53: Desktop interface emphasizes keyboard shortcuts in UI
- FR54: System adapts coaching language without requiring user to select persona

**Freemium & Usage Limits:**
- FR55: Free tier users can create unlimited tasks
- FR56: Free tier users can use 10 AI coaching interactions per month
- FR57: Paid tier users can use unlimited AI coaching interactions
- FR58: System tracks coaching usage count per user per month
- FR59: System notifies users when approaching free tier coaching limit
- FR60: Users can upgrade to paid tier at any time

**Data Privacy & Export:**
- FR61: Users can export all their data (tasks, goals, interactions) in standard format
- FR62: Users can opt out of AI coaching interaction logging
- FR63: System provides clear privacy policy on data usage
- FR64: System deletes all user data when account deleted (GDPR compliance)
- FR65: User todo data remains private (not shared with third parties)

**Marketing & Viral Features:**
- FR66: Landing page shows 5-second value proposition with real examples
- FR67: Landing page includes 15-second demo video showing user journey
- FR68: Users can share aha moments (coaching wins) on social media
- FR69: System generates Open Graph tags for shared content
- FR70: Users can refer friends (viral loop support)

**System Reliability:**
- FR71: System remains fully functional for baseline todo operations even when AI unavailable
- FR72: System provides rule-based coaching fallback when LLM API fails
- FR73: System handles API rate limits gracefully without blocking users
- FR74: System syncs task changes to backend without blocking UI (background sync)

**Total: 74 Functional Requirements**

---

## FR Coverage Map

**Epic 1: Foundation & Instant Value**
- Covers: Infrastructure setup, landing page, authentication, instant onboarding
- FRs: FR1-6 (auth), FR66-67 (landing page), FR71 (baseline reliability)
- User Value: User can discover product, sign up, and see value within 60 seconds
- Rationale: Foundation enables all subsequent work; landing page critical for user acquisition

**Epic 2: Core Todo Experience**
- Covers: Baseline task CRUD, mobile & desktop UX, visual feedback
- FRs: FR7-14 (task CRUD), FR43-44 (quick-add, optimistic UI), FR47-48 (responsive), FR74 (background sync)
- User Value: Fully functional todo app that works perfectly without AI
- Rationale: Builds trust before introducing AI; delivers immediate utility

**Epic 3: AI Coaching with Context**
- Covers: AI coaching, goal management, caching, persona adaptation, <800ms latency
- FRs: FR19-37 (goals + coaching), FR38-42 (nudges), FR49, FR54 (persona detection), FR72-73 (fallback/reliability)
- User Value: Regret-prevention coaching that catches wasted effort before it happens
- Rationale: CRITICAL conversion moment - aha moment that drives retention; combines goals + coaching for cohesive experience

**Epic 4: Power User & Personalization**
- Covers: Keyboard shortcuts, swipe gestures, metadata, advanced UX
- FRs: FR15-18 (metadata), FR45-46 (shortcuts/gestures), FR50-53 (desktop/mobile personalization)
- User Value: Power users get efficient workflows; enhanced retention through optimized UX
- Rationale: Retention drivers after core value established

**Epic 5: Growth, Analytics & Monetization**
- Covers: Freemium limits, data export, viral features, BMAD validation metrics
- FRs: FR55-65 (freemium, privacy, export), FR68-70 (viral features), BMAD metrics (not FRs)
- User Value: Sustainable business model + viral growth + methodology validation
- Rationale: Monetization after value proven; separates growth mechanics from core experience

**FR Coverage Validation:**
- ✅ All 74 FRs mapped to epics
- ✅ Each epic delivers standalone user value
- ✅ No forward dependencies (sequential ordering maintained)
- ✅ Foundation epic acceptable (greenfield project setup)
- ✅ Epic 3 combines goals + coaching (journey mapping insight: user needs goals before coaching is valuable)

---

## Epic 1: Foundation & Instant Value

**Goal:** User can discover product value, sign up, and create first task within 60 seconds. Establishes technical foundation for all subsequent epics.

**User Value:** Instant onboarding with zero friction. Landing page communicates regret-prevention value proposition. Authentication that doesn't block momentum.

**FRs Covered:** FR1-6 (auth), FR66-67 (landing page), FR71 (baseline reliability)

---

### Story 1.1: Project Setup & Monorepo Foundation

**As a** development team,
**I want** a properly initialized monorepo with build system and deployment pipeline,
**So that** all subsequent stories can be developed and deployed rapidly.

**Acceptance Criteria:**

**Given** a new project repository
**When** running `pnpm install && pnpm build`
**Then** all packages compile without errors

**And** Turborepo caching works correctly (second build near-instant)
**And** Project structure follows architecture doc (apps/web, apps/api, packages/*)
**And** TypeScript configured with strict mode across all packages
**And** ESLint + Prettier configured with consistent rules
**And** Git hooks prevent commits with lint/type errors

**Prerequisites:** None (first story)

**Technical Notes:**
- Monorepo structure per ADR-001 (architecture/architecture-decision-records.md)
- Turborepo 2.3+ for build orchestration
- pnpm 9.15+ workspaces
- Shared packages: @repo/types, @repo/validation, @repo/typescript-config, @repo/eslint-config
- Initialize Next.js 15.5 (apps/web), Hono 4.10+ (apps/api)
- Setup Vitest for unit tests, Playwright for E2E
- CI/CD placeholder (GitHub Actions basic setup)
- Document setup in README with prerequisites

---

### Story 1.2: Database Schema & Drizzle ORM Setup

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

### Story 1.3: Authentication API - Signup & Login

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

### Story 1.4: Authentication API - Token Refresh & Logout

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

### Story 1.5: Authentication Middleware & Protected Routes

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

### Story 1.6: Frontend Authentication State Management

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

### Story 1.7: Landing Page - Value Prop & Demo Video

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

### Story 1.8: Signup/Login UI Forms

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

### Story 1.9: Password Reset Flow

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

### Story 1.10: Account Deletion

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

### Story 1.11: Deployment Pipeline & Environment Config

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

### Story 1.12: Observability Foundation - Logging & Monitoring

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

## Epic 2: Core Todo Experience

**Goal:** Deliver fully functional baseline todo app that works perfectly without AI. Build trust through reliable, responsive UX before introducing AI coaching.

**User Value:** Users get immediate utility. Can adopt as simple todo app with AI coaching 100% optional. Responsive across desktop and mobile.

**FRs Covered:** FR7-14 (task CRUD), FR43-44 (quick-add, optimistic UI), FR47-48 (responsive), FR74 (background sync)

---

### Story 2.1: Task API Endpoints - CRUD Operations

**As a** user,
**I want** backend API to manage my tasks,
**So that** tasks persist across sessions and devices.

**Acceptance Criteria:**

**Given** authenticated user
**When** POST /api/tasks with {text, importance?, confidence?}
**Then** task created in database with userId, timestamps

**And** task object returned with id, text, metadata, isCompleted=false, timestamps
**And** response time <50ms (P95 per NFR-SC2)

**Given** authenticated user
**When** GET /api/tasks
**Then** all user's tasks returned, sorted by createdAt desc

**And** query param ?completed=false filters to active tasks only
**And** query param ?completed=true filters to completed tasks only
**And** response time <50ms (P95)

**Given** authenticated user owns task
**When** PATCH /api/tasks/:id with updates (text, importance, confidence, isCompleted)
**Then** task updated in database, updatedAt timestamp refreshed

**And** if isCompleted=true, completedAt set to current timestamp
**And** if isCompleted=false, completedAt cleared
**And** updated task returned

**Given** authenticated user owns task
**When** DELETE /api/tasks/:id
**Then** task removed from database

**And** 200 success response returned
**And** subsequent GET excludes deleted task

**Given** user attempts to modify another user's task
**When** any task operation with wrong userId
**Then** 403 Forbidden error returned

**Prerequisites:** Story 1.5 (auth middleware exists), Story 1.2 (database schema exists)

**Technical Notes:**
- Endpoints per api-contracts.md
- FR7-14 (task CRUD operations)
- Drizzle queries with userId filter (security)
- Zod validation for request bodies
- Tests: CRUD operations, authorization, validation

---

### Story 2.2: Frontend Task State Management

**As a** developer,
**I want** centralized task state management,
**So that** UI stays synchronized with backend.

**Acceptance Criteria:**

**Given** user authenticated
**When** app loads /tasks page
**Then** TanStack Query fetches tasks from GET /api/tasks

**And** loading skeleton displayed during fetch (FR47)
**And** tasks rendered when fetch completes
**And** error boundary catches fetch failures

**Given** tasks loaded
**When** user creates/updates/deletes task
**Then** optimistic update applied immediately (FR44)

**And** UI reflects change before backend confirmation
**And** background sync queued (FR74)
**And** on success: cache invalidated, task list refreshed
**And** on failure: optimistic update rolled back, error toast shown, retry option

**Given** multiple devices/tabs open
**When** task changes on device A
**Then** device B receives update via TanStack Query refetch (polling or refetchOnFocus)

**Prerequisites:** Story 2.1 (task API exists), Story 1.6 (auth state exists)

**Technical Notes:**
- TanStack Query for server state caching
- Optimistic updates pattern
- Background sync queue (retry logic, exponential backoff)
- Error handling: toast notifications, retry UI
- Tests: optimistic updates, rollback on error, cache invalidation

---

### Story 2.3: Task List UI - Empty State & First Task

**As a** new user,
**I want** clear guidance when task list is empty,
**So that** I know what to do first.

**Acceptance Criteria:**

**Given** user logs in for first time
**When** /tasks page loads with zero tasks
**Then** empty state displays:

**And** illustration or icon (friendly, minimal)
**And** message: "Ready to focus on what matters?"
**And** subtext: "Add your first task to get started"
**And** prominent "Add Task" button or input field visible
**And** optional: example task shown ("Try: Prepare pitch deck")

**Given** user adds first task
**When** task creation succeeds
**Then** empty state disappears

**And** task list displays with single task
**And** celebration micro-animation (subtle, non-intrusive)
**And** quick-add input remains visible (FR43)

**Prerequisites:** Story 2.2 (task state management exists)

**Technical Notes:**
- Empty state design: friendly, encouraging (not guilt-inducing)
- Empathy map insight: tool fatigue - must feel simple and inviting
- Mobile responsive: works at 320px width
- Tests: empty state rendering, first task flow

---

### Story 2.4: Task List UI - Active & Completed Views

**As a** user,
**I want** to see my active and completed tasks separately,
**So that** I focus on what needs doing without clutter.

**Acceptance Criteria:**

**Given** user has active and completed tasks
**When** viewing /tasks page
**Then** active tasks displayed by default at top

**And** completed tasks section below (collapsible or separate tab)
**And** visual distinction between active/completed (FR13):
- Active: normal opacity, checkbox empty
- Completed: reduced opacity or strikethrough, checkbox filled

**Given** user toggles completed section
**When** clicks "Show/Hide Completed" or switches tabs
**Then** completed tasks visibility toggles

**And** preference persisted (Zustand or localStorage)

**Given** many tasks exist (20+)
**When** scrolling task list
**Then** virtual scrolling or pagination for performance

**And** scroll position maintained on task updates

**Prerequisites:** Story 2.2 (task state management exists)

**Technical Notes:**
- FR8, FR13 (view tasks, visual distinction)
- Active tasks priority display
- Completed tasks: strikethrough + reduced opacity
- Consider virtualization for long lists (react-window)
- Mobile: swipe to reveal completed section
- Tests: filtering, visual distinction, toggle persistence

---

### Story 2.5: Quick-Add Task Input (Always Visible)

**As a** user,
**I want** to add tasks instantly from anywhere,
**So that** capturing thoughts requires zero friction.

**Acceptance Criteria:**

**Given** user on any page in app
**When** viewing UI
**Then** quick-add input field always visible (FR43)

**And** input placeholder: "What needs your focus?" or similar
**And** input auto-expands on focus (mobile: keyboard appears)
**And** Enter key or "Add" button submits

**Given** user types task and submits
**When** Enter pressed or Add clicked
**Then** task created via optimistic update (Story 2.2)

**And** input clears immediately
**And** input remains focused for rapid multiple adds
**And** success micro-feedback (checkmark icon flash, subtle animation)

**Given** user submits empty input
**When** Enter pressed with blank field
**Then** no-op (nothing happens, no error)

**And** input remains focused

**Given** mobile device
**When** input focused
**Then** keyboard appears, input accessible without scrolling

**And** tap target 44×44px minimum (FR52)

**Prerequisites:** Story 2.2 (task state management exists)

**Technical Notes:**
- FR43 (quick-add always visible)
- FR7 (create tasks)
- Sticky positioning (top of viewport) or fixed header
- Desktop: keyboard shortcut (e.g., Cmd+K) focuses input (Story 4.x)
- Mobile: bottom-positioned for thumb reach consideration
- Optimistic UI: immediate feedback
- Tests: task creation, empty submission, keyboard interactions

---

### Story 2.6: Task Inline Edit

**As a** user,
**I want** to edit task text directly in the list,
**So that** I can fix typos or refine descriptions quickly.

**Acceptance Criteria:**

**Given** user viewing task
**When** clicks on task text (desktop) or taps and holds (mobile)
**Then** text becomes editable input field

**And** current text pre-filled, cursor at end
**And** input auto-focused, text selectable

**Given** user editing task
**When** changes text and presses Enter or clicks outside
**Then** task updated via API (PATCH /api/tasks/:id)

**And** optimistic update applied immediately
**And** loading indicator during save (subtle spinner)
**And** on success: edit mode exits, new text displays
**And** on failure: rollback to original text, error toast, retry option

**Given** user presses Escape while editing
**When** Escape key pressed
**Then** edit cancelled, original text restored

**And** edit mode exits without saving

**Prerequisites:** Story 2.2 (task state management), Story 2.5 (task display exists)

**Technical Notes:**
- FR9 (edit tasks)
- Inline editing UX: contentEditable or input field replacement
- Desktop: click-to-edit
- Mobile: long-press to edit (avoid conflicts with swipe gestures)
- Validation: max 500 chars (database constraint)
- Tests: edit flow, cancel, validation, optimistic update

---

### Story 2.7: Task Completion Toggle

**As a** user,
**I want** to mark tasks complete with a single click/tap,
**So that** I get satisfaction from progress.

**Acceptance Criteria:**

**Given** user viewing active task
**When** clicks checkbox (desktop) or taps task row (mobile)
**Then** task marked complete (isCompleted=true)

**And** visual change immediate: checkbox fills, strikethrough applied, opacity reduced
**And** optimistic update (FR44)
**And** PATCH /api/tasks/:id {isCompleted: true} sent to backend
**And** completedAt timestamp set

**Given** user viewing completed task
**When** clicks checkbox again
**Then** task marked active (isCompleted=false)

**And** visual change immediate: checkbox clears, strikethrough removed, full opacity
**And** completedAt cleared in database

**Given** task completion triggers milestone
**When** completing 5th, 10th, 15th... task
**Then** celebration animation displays (FR41)

**And** positive message: "5 tasks completed! You're building momentum."
**And** dismissible (click/tap to close)

**Prerequisites:** Story 2.2 (task state management)

**Technical Notes:**
- FR11, FR12 (mark complete, unmark)
- FR41 (milestone celebrations)
- Empathy map insight: celebrate meaningful completion
- Animation: subtle confetti or checkmark burst (not annoying)
- Milestone intervals: every 5 completions
- Desktop: checkbox click
- Mobile: tap entire task row OR dedicated checkbox (44×44px target)
- Tests: toggle completion, milestones, animations

---

### Story 2.8: Task Deletion with Confirmation

**As a** user,
**I want** to delete tasks I no longer need,
**So that** my list stays relevant and actionable.

**Acceptance Criteria:**

**Given** user viewing task
**When** clicks delete icon/button or swipes left (mobile)
**Then** confirmation prompt appears:

**And** message: "Delete this task?"
**And** options: "Delete" (danger color), "Cancel"
**And** brief context shown (first 50 chars of task text)

**Given** user confirms deletion
**When** clicks "Delete"
**Then** task deleted via API (DELETE /api/tasks/:id)

**And** optimistic removal from UI
**And** undo toast appears briefly (3 seconds): "Task deleted. [Undo]"
**And** if undo clicked: task restored

**Given** user cancels deletion
**When** clicks "Cancel" or clicks outside modal
**Then** confirmation closes, no deletion

**Prerequisites:** Story 2.2 (task state management)

**Technical Notes:**
- FR10 (delete tasks)
- Desktop: delete icon/button on hover
- Mobile: swipe left reveals delete action (FR46 - swipe gestures)
- Undo mechanism: temporary local cache (3-5 seconds), restore if needed
- Tests: deletion flow, undo, swipe gestures (mobile)

---

### Story 2.9: Responsive Layout - Mobile & Desktop

**As a** user,
**I want** optimal layout for my device,
**So that** experience feels native whether on phone or computer.

**Acceptance Criteria:**

**Given** mobile device (320px-768px width)
**When** viewing task list
**Then** single-column layout

**And** touch-optimized spacing (tasks vertically stacked)
**And** tap targets 44×44px minimum (FR52)
**And** bottom navigation for future features (FR51)
**And** swipe gestures enabled: swipe right = complete, swipe left = delete (FR46)
**And** quick-add input accessible without scrolling

**Given** tablet device (768px-1024px width)
**When** viewing task list
**Then** adaptive layout: single or dual-column based on content density

**Given** desktop device (1024px+ width)
**When** viewing task list
**Then** multi-column layout if space allows (FR50)

**And** sidebar for navigation/settings
**And** keyboard shortcuts emphasized in UI (FR53)
**And** hover states on interactive elements

**Given** any device
**When** resizing viewport
**Then** layout adapts smoothly without breaking

**And** no horizontal scroll (responsive images, text wrapping)

**Prerequisites:** Story 2.4 (task list UI exists)

**Technical Notes:**
- FR48, FR50-52 (responsive, desktop/mobile optimization)
- Empathy map insight: mobile is NOT smaller desktop - distinct patterns
- Tailwind CSS responsive utilities (sm, md, lg, xl)
- Mobile-first CSS approach
- Test on real devices: iPhone SE (small), Pixel (medium), iPad (tablet), desktop
- Tests: responsive breakpoints, touch targets, swipe gestures

---

### Story 2.10: Skeleton Loading States

**As a** user,
**I want** visual feedback during loading,
**So that** I know the app is working (not frozen).

**Acceptance Criteria:**

**Given** user navigating to /tasks
**When** task list loading from API
**Then** skeleton screens display (FR47)

**And** task row placeholders: gray rectangles with shimmer animation
**And** 5-7 skeleton rows shown (realistic list preview)
**And** quick-add input visible (not skeleton)

**Given** individual task operation (edit, complete, delete)
**When** API request in flight
**Then** subtle loading indicator on affected task

**And** spinner icon or opacity change
**And** user can still interact with other tasks (non-blocking)

**Given** API request fails
**When** error occurs
**Then** error state displays (not blank screen)

**And** error message: "Something went wrong. [Retry]"
**And** retry button functional

**Prerequisites:** Story 2.2 (task state management)

**Technical Notes:**
- FR47 (skeleton screens, no blank screens)
- Skeleton component library or custom CSS
- Shimmer animation for polish
- Error boundaries catch render errors
- Tests: loading states, error states, retry behavior

---

### Story 2.11: Background Sync & Offline Queue

**As a** user,
**I want** task operations to work even with spotty network,
**So that** I'm not blocked by connectivity issues.

**Acceptance Criteria:**

**Given** user performs task operation (create/edit/delete)
**When** network request fails (timeout, offline, 500 error)
**Then** operation queued in local storage (FR74)

**And** UI shows "Syncing..." indicator
**And** retry automatically with exponential backoff (1s, 2s, 4s, 8s...)
**And** max 5 retry attempts

**Given** queued operations exist
**When** network restored
**Then** queue processed in order (FIFO)

**And** successful operations removed from queue
**And** failed operations remain for manual retry
**And** user notified: "Synced X tasks"

**Given** operations conflict (e.g., edited on multiple devices)
**When** sync detects conflict
**Then** last-write-wins strategy applied

**And** user notified of conflict resolution

**Given** user reloads page with pending queue
**When** app initializes
**Then** queue reloaded from localStorage

**And** sync resumes automatically

**Prerequisites:** Story 2.2 (task state management)

**Technical Notes:**
- FR74 (background sync)
- Service blueprint insight: critical for mobile reliability
- localStorage for queue persistence
- Exponential backoff algorithm
- Conflict resolution: simple last-write-wins for MVP
- Future: CRDTs or operational transforms for better conflict handling
- Tests: offline operations, queue processing, retry logic, conflicts

---

### Story 2.12: Task Count & List Stats

**As a** user,
**I want** quick visibility into my progress,
**So that** I see momentum building.

**Acceptance Criteria:**

**Given** user has tasks
**When** viewing task list
**Then** stats displayed at top or sidebar:

**And** "X active tasks"
**And** "Y completed today"
**And** "Z completed this week"

**Given** user completes task
**When** task marked complete
**Then** stats update immediately (optimistic)

**Given** stats shown on mobile
**When** viewing on small screen
**Then** condensed stats format: "3 active • 12 done"

**Prerequisites:** Story 2.7 (task completion exists)

**Technical Notes:**
- Computed from task list state (TanStack Query)
- Today/week calculated from completedAt timestamps
- Empathy map insight: progress visibility reduces anxiety
- Tests: stat calculations, real-time updates

---

**Epic 2 Complete: 12 Stories**

All stories deliver standalone value. Baseline todo app fully functional without AI. Foundation for Epic 3.

---

## Epic 3: AI Coaching with Context

**Goal:** Deliver <800ms AI coaching that prevents regret by catching wasted effort before it happens. CRITICAL conversion moment - makes or breaks retention.

**User Value:** Objective sounding board that references user goals and adapts tone to persona (anxiety-framing for founders, hope-framing for students). Regret prevention over productivity optimization.

**FRs Covered:** FR19-37 (goals + coaching), FR38-42 (nudges), FR49, FR54 (persona detection), FR72-73 (fallback/reliability)

**Journey Mapping Insight:** This is the aha moment. If latency >800ms or tone judgmental, user disables coaching permanently.

---

### Story 3.1: Goals API - Capture & Storage

**As a** user,
**I want** to capture my top goals once,
**So that** AI coaching has context about what matters to me.

**Acceptance Criteria:**

**Given** authenticated user
**When** POST /api/goals with {whatMatters, biggestWin, worstOutcome}
**Then** goals created in database with userId, timestamps

**And** single goals record per user (upsert on re-submission)
**And** response time <50ms (P95)

**Given** authenticated user
**When** GET /api/goals
**Then** user's goals returned (or null if never set)

**Given** authenticated user
**When** PATCH /api/goals to update
**Then** goals updated, updatedAt refreshed

**Prerequisites:** Story 1.5 (auth middleware), Story 1.2 (database schema)

**Technical Notes:**
- FR19-23 (goal management)
- Schema: goals table per data-architecture.md
- Upsert pattern: one goals record per user
- Goals optional (can skip entirely per FR20)
- Validation: each field max 500 chars
- Tests: CRUD operations, upsert behavior

---

### Story 3.2: Goals Capture UI - Conversational Flow

**As a** new user,
**I want** quick, conversational goal capture,
**So that** I provide coaching context without tedious forms.

**Acceptance Criteria:**

**Given** user completes first task (or after 5 tasks added)
**When** goal invitation triggered
**Then** modal displays: "Help me understand what matters to you" (dismissible, not forced)

**And** 3 conversational prompts displayed:
1. "What matters most to you right now?" (whatMatters)
2. "What would be your biggest win in the next 3-6 months?" (biggestWin)
3. "What outcome would you most want to avoid?" (worstOutcome)

**And** text areas for each (not intimidating essay boxes)
**And** placeholder examples based on detected context:
- Desktop user: business examples ("raise funding", "ship MVP", "avoid runway burn")
- Mobile user: student/career examples ("land internship", "build portfolio", "avoid wasted effort")

**And** "Skip for now" always visible (FR20)
**And** "Save & Continue" submits to POST /api/goals

**Given** user skips goal capture
**When** clicks "Skip for now"
**Then** modal closes, flag set (don't re-prompt for 7 days)

**And** coaching still works (generic fallback without goal context)

**Given** user saved goals previously
**When** navigates to settings → goals
**Then** can view and edit goals anytime (FR21-22)

**Prerequisites:** Story 3.1 (goals API), Story 2.7 (milestone trigger exists)

**Technical Notes:**
- FR19-23 (goal capture, optional, editable)
- Trigger: after completing first task OR after 5 tasks added (FR38)
- Conversational prompts: non-judgmental, encouraging
- Character count hints (e.g., "30-60 seconds to answer")
- Mobile: bottom sheet instead of modal
- Tests: goal capture flow, skip behavior, edit existing goals

---

### Story 3.3: Persona Detection - Context Signals

**As a** system,
**I want** to detect user persona passively,
**So that** coaching adapts tone without forcing user to self-identify.

**Acceptance Criteria:**

**Given** user using application
**When** user interacts over time
**Then** persona signals collected in users.persona_signals (JSONB):

**And** device type tracked: desktop vs mobile (primary usage pattern)
**And** task complexity tracked: word count, business terms, technical jargon
**And** time-of-day usage tracked: business hours vs evenings/weekends
**And** goal language analyzed: "customers", "revenue", "funding" vs "grades", "internship", "portfolio"

**Given** sufficient signals collected (5+ tasks + goals)
**When** coaching request made
**Then** persona inferred: "founder" or "student" or "general"

**And** confidence score calculated (0.0-1.0)
**And** fallback to "general" if confidence <0.6

**Prerequisites:** Story 3.2 (goals captured), Story 2.1 (tasks exist)

**Technical Notes:**
- FR49, FR54 (persona detection, no explicit selection)
- Passive collection: no user-visible persona picker
- Signals stored in persona_signals JSONB field
- Simple heuristics for MVP:
  - Desktop + business terms in goals = founder
  - Mobile + "internship"/"grades" in goals = student
  - Otherwise = general
- Future: ML model for better detection
- Tests: signal collection, persona inference, confidence scoring

---

### Story 3.4: LLM Integration - Anthropic SDK Setup

**As a** backend developer,
**I want** Anthropic API integrated,
**So that** coaching requests can be sent to Claude.

**Acceptance Criteria:**

**Given** backend application running
**When** coaching request made
**Then** Anthropic SDK initialized with API key from environment

**And** Claude Sonnet 4.5 model selected (per ADR-005)
**And** streaming enabled for progressive response display
**And** prompt caching configured (90% cost savings per novel-architectural-patterns.md)

**Given** LLM API call made
**When** request sent to Anthropic
**Then** request includes:
- System prompt with persona adaptation instructions
- User goals as context (if available)
- Task text being evaluated
- Max tokens: 150 (2-3 sentences per FR32)
- Temperature: 0.7 (conversational, not robotic)

**And** streaming response chunks received
**And** complete response assembled
**And** latency tracked (for P99 <800ms target)

**Given** API call fails
**When** timeout, 500 error, or rate limit hit
**Then** error logged with details (no PII)

**And** fallback mechanism triggered (Story 3.8)

**Prerequisites:** Story 1.2 (database), Story 3.1 (goals API)

**Technical Notes:**
- @anthropic-ai/sdk package
- Environment variable: ANTHROPIC_API_KEY
- Claude Sonnet 4.5: fast, high-quality, cost-effective
- Streaming via Server-Sent Events (SSE)
- Error handling: timeout (5s), retry logic (exponential backoff)
- Cost tracking: log token counts, calculate per interaction
- Tests: API integration, streaming, error handling

---

### Story 3.5: Coaching API - Request & Response

**As a** user,
**I want** to request AI coaching on a task,
**So that** I get objective perspective on whether it's worth doing.

**Acceptance Criteria:**

**Given** authenticated user
**When** POST /api/coaching with {taskId, taskText}
**Then** coaching response generated

**And** user goals loaded from database (if exist)
**And** persona detected from signals (Story 3.3)
**And** LLM prompt constructed with context
**And** streaming response returned via SSE
**And** events: {type: "thinking"}, {type: "token", data: {text}}, {type: "complete", data: {response, latency, cached}}
**And** P99 latency <800ms (CRITICAL per NFR-P1, FR27)

**Given** coaching request for task
**When** generating response
**Then** prompt includes:
- Persona-specific tone: anxiety-framing (founder) vs hope-framing (student)
- User goals as context: "User's goals: [whatMatters, biggestWin, worstOutcome]"
- Task text: "User wants to: [taskText]"
- Instructions: "2-3 sentences, conversational, non-judgmental, ask Socratic questions"

**Given** coaching completes
**When** response generated
**Then** coaching_interactions record created:
- userId, taskId, questionHash (SHA-256 of taskText), response, latency, tokenCount, cost, cacheHit

**And** user.coachingCount incremented
**And** freemium limit checked (Story 5.x)

**Prerequisites:** Story 3.4 (LLM integration), Story 3.3 (persona detection), Story 3.1 (goals API)

**Technical Notes:**
- Endpoint per api-contracts.md
- FR25-37 (coaching mechanics)
- FR29-31 (persona-adapted framing)
- Streaming SSE for progressive display
- questionHash enables caching (Story 3.6)
- Cost calculation: input tokens + output tokens × pricing
- Tests: coaching flow, persona adaptation, streaming, metrics

---

### Story 3.6: Multi-Tier Caching - Memory & Database

**As a** system,
**I want** aggressive caching of coaching responses,
**So that** latency <800ms is achievable and API costs controlled.

**Acceptance Criteria:**

**Given** coaching request for task text
**When** questionHash calculated (SHA-256 of normalized taskText)
**Then** check Tier 1 cache (node-cache in-memory):

**And** if hit: return cached response immediately (<1ms)
**And** if miss: check Tier 2 cache (database coaching_cache table)

**Given** Tier 2 cache check
**When** query coaching_cache by questionHash
**Then** if hit: response returned (~5-10ms)

**And** response stored in Tier 1 (memory)
**And** hitCount incremented in Tier 2
**And** if miss: proceed to Tier 3 (LLM API call)

**Given** Tier 3 LLM call
**When** response generated
**Then** response stored in both caches:
- Tier 1 (node-cache): TTL 1 hour, auto-cleanup
- Tier 2 (database): expiresAt 30 days, hitCount = 1

**Given** popular coaching patterns
**When** hitCount >10 for cached response
**Then** expiresAt extended by 30 days (keep frequently used responses)

**Prerequisites:** Story 3.5 (coaching API)

**Technical Notes:**
- Service blueprint insight: 3-tier caching CRITICAL for <800ms
- FR36-37 (pre-generated patterns, caching)
- Tier 1: node-cache (1 hour TTL, 500 entry limit)
- Tier 2: PostgreSQL coaching_cache table
- Tier 3: Anthropic API (fallback)
- questionHash: SHA-256 of lowercased, trimmed taskText (normalization)
- Cache invalidation: manual purge option for admin
- Cost savings: cache hits reduce API calls dramatically
- Tests: cache hit/miss, TTL expiration, multi-tier flow

---

### Story 3.7: Pre-Generated Coaching Patterns

**As a** system,
**I want** pre-generated responses for common task patterns,
**So that** first-time coaching requests are fast and cost-effective.

**Acceptance Criteria:**

**Given** application initialization
**When** backend starts
**Then** seed coaching_cache with common patterns:

**And** ~20-30 common task patterns seeded (e.g., "prepare presentation", "review code", "respond to emails")
**And** responses pre-generated for both personas (founder + student variations)
**And** expiresAt set to 90 days (longer for seeded patterns)

**Given** user submits task matching common pattern
**When** questionHash matches seeded entry
**Then** cached response returned immediately

**And** latency <10ms (Tier 2 cache hit)
**And** cacheHit=true logged

**Prerequisites:** Story 3.6 (caching infrastructure)

**Technical Notes:**
- FR36 (pre-generated patterns)
- Seed script: generate patterns during deployment
- Common patterns identified from competitor analysis, user research
- Both persona variations: anxiety-framing + hope-framing
- Fuzzy matching consideration: exact match only for MVP (future: semantic similarity)
- Tests: seeded cache, pattern matching

---

### Story 3.8: Rule-Based Coaching Fallback

**As a** user,
**I want** coaching to work even when LLM API fails,
**So that** core functionality isn't blocked by external dependency.

**Acceptance Criteria:**

**Given** LLM API unavailable (timeout, error, rate limit)
**When** coaching request fails after retries
**Then** rule-based fallback activated (FR35, FR72)

**And** generic coaching response generated:
- "Consider: Is this aligned with your goals?"
- "Ask yourself: Will this matter in 3 months?"
- "What would happen if you skipped this?"

**And** persona-adapted if signals available:
- Founder: "What's the opportunity cost of spending time on this?"
- Student: "Will this help you 6 months from now?"

**And** response marked as fallback (not logged as LLM interaction)
**And** user sees subtle indicator: "Quick coaching" (not full AI)

**Given** API rate limit hit
**When** 429 error returned
**Then** fallback used gracefully (FR73)

**And** user not blocked from using app
**And** error logged for monitoring

**Prerequisites:** Story 3.5 (coaching API)

**Technical Notes:**
- FR35, FR72-73 (graceful degradation, fallback, rate limits)
- Rule-based templates: 5-10 generic questions
- Persona detection still used (if available)
- No coaching_interactions record created (not LLM interaction)
- User messaging: "Quick coaching" or "Suggested questions"
- Tests: LLM failure scenarios, fallback activation, rate limit handling

---

### Story 3.9: Coaching UI - Request Button & Thinking State

**As a** user,
**I want** to request coaching on a task easily,
**So that** I get perspective before committing effort.

**Acceptance Criteria:**

**Given** user viewing task in list
**When** hovering (desktop) or tapping task (mobile)
**Then** coaching button appears:

**And** icon: lightbulb or thinking face
**And** label: "Get Coaching" or "Ask AI"
**And** accessible: 44×44px tap target (mobile)

**Given** user clicks coaching button
**When** request initiated
**Then** thinking indicator displays (FR40):

**And** animated spinner or pulsing icon
**And** text: "Thinking..." or "Considering..."
**And** displayed immediately (<100ms)
**And** coaching button disabled (prevent duplicate requests)

**Given** coaching response streaming
**When** SSE events received
**Then** thinking indicator updates to show progress

**And** "token" events render progressively (typewriter effect optional)

**Prerequisites:** Story 3.5 (coaching API), Story 2.4 (task list UI)

**Technical Notes:**
- FR25, FR40 (request coaching, thinking indicator)
- Desktop: coaching button on task hover
- Mobile: tap task → action sheet with coaching option
- Thinking indicator: optimistic UI, shows <100ms
- Streaming display: progressive text reveal for engagement
- Tests: button visibility, thinking state, streaming display

---

### Story 3.10: Coaching UI - Response Display & Actions

**As a** user,
**I want** to see coaching response clearly and take action,
**So that** I decide what to do with the task.

**Acceptance Criteria:**

**Given** coaching response received
**When** streaming completes
**Then** coaching card displays:

**And** response text (2-3 sentences, conversational per FR32)
**And** action buttons: "Keep Task", "Revise", "Delete", "Ask More" (FR33)
**And** thumbs up/down feedback buttons (FR34)
**And** latency indicator if >500ms: "Answered in Xms"

**Given** user clicks "Keep Task"
**When** action selected
**Then** coaching card dismisses

**And** task remains unchanged
**And** no further action

**Given** user clicks "Revise"
**When** action selected
**Then** task enters edit mode (Story 2.6)

**And** coaching card remains visible for reference

**Given** user clicks "Delete"
**When** action selected
**Then** task deletion flow triggered (Story 2.8)

**And** coaching card dismisses

**Given** user clicks "Ask More"
**When** follow-up requested
**Then** input field appears for follow-up question

**And** previous response remains visible for context
**And** new coaching request sent with conversation history

**Given** user clicks thumbs up/down
**When** feedback submitted
**Then** coaching_interactions record updated with feedback

**And** icon changes to indicate feedback received
**And** used for future coaching quality improvements

**Prerequisites:** Story 3.9 (coaching UI request), Story 3.5 (coaching API)

**Technical Notes:**
- FR32-34 (tone, actions, feedback)
- Coaching card: modal or inline below task (mobile: bottom sheet)
- Action buttons: clear affordances, color coding
- Follow-up: maintains conversation context (future: multi-turn)
- Feedback: stored for analytics, future model fine-tuning
- Tests: action flows, feedback submission, follow-up requests

---

### Story 3.11: Coaching Example - First-Time User Education

**As a** new user,
**I want** to see coaching example before trying,
**So that** I understand what to expect and reduce uncertainty.

**Acceptance Criteria:**

**Given** user never used coaching before
**When** first coaching button clicked
**Then** example modal displays first (FR39):

**And** title: "Here's how coaching works"
**And** example task shown: "Prepare comprehensive documentation for entire codebase"
**And** example coaching response shown: "Have you validated whether users actually need comprehensive docs? Consider starting with the 20% that covers 80% of questions."
**And** explanation: "AI coaching asks questions to help you focus on what matters"
**And** button: "Try coaching on this task"

**Given** user clicks "Try coaching"
**When** modal dismissed
**Then** actual coaching request proceeds

**And** flag set: user has seen example (don't show again)

**Given** user has used coaching 3+ times
**When** coaching button clicked
**Then** example modal skipped, direct to coaching request

**Prerequisites:** Story 3.9 (coaching UI)

**Technical Notes:**
- FR39 (show example before first use)
- Empathy map insight: uncertainty about AI must be addressed
- Example carefully chosen: shows value without overpromising
- Example demonstrates non-judgmental tone
- Flag stored in user preferences (Zustand or database)
- Tests: first-time flow, example display, flag persistence

---

### Story 3.12: Gentle Coaching Invitation After 5 Tasks

**As a** user who hasn't tried coaching,
**I want** subtle prompts to discover the feature,
**So that** I don't miss the core value proposition.

**Acceptance Criteria:**

**Given** user added 5+ tasks without using coaching
**When** completing task or viewing list
**Then** gentle nudge displays (FR38):

**And** message: "Want to make sure you're working on the right things?"
**And** subtext: "Try AI coaching on one of your tasks"
**And** button: "Show me how"
**And** dismiss option: "Maybe later" (not pushy)

**Given** user clicks "Show me how"
**When** nudge accepted
**Then** coaching example modal displays (Story 3.11)

**And** then prompts to select task for coaching

**Given** user dismisses nudge
**When** "Maybe later" clicked
**Then** nudge hidden for 7 days

**And** can re-trigger if still no coaching usage

**Given** user tries coaching once
**When** coaching used
**Then** nudge never shown again (feature discovered)

**Prerequisites:** Story 3.11 (coaching example), Story 2.5 (task count tracking)

**Technical Notes:**
- FR38, FR42 (detect 5+ tasks, gentle invitation, dismissible)
- Trigger: after 5 tasks added + 0 coaching requests
- Nudge placement: banner at top of task list (non-intrusive)
- Re-prompt logic: 7-day cooldown if dismissed
- Journey mapping insight: prompt at right moment (after baseline trust built)
- Tests: trigger conditions, dismissal, cooldown, feature discovery

---

### Story 3.13: Persona-Adaptive Coaching Prompts

**As a** user,
**I want** coaching tone that resonates with my context,
**So that** advice feels relevant and actionable (not generic).

**Acceptance Criteria:**

**Given** founder persona detected (Story 3.3)
**When** coaching prompt constructed
**Then** anxiety-framing applied (FR30):

**And** opportunity cost language: "What could you accomplish instead with this time?"
**And** runway awareness: "With limited runway, is this the highest-impact use of a week?"
**And** customer focus: "Have you validated this with users?"
**And** business context: "How does this move revenue/fundraising/traction forward?"

**Given** student persona detected
**When** coaching prompt constructed
**Then** hope-framing applied (FR31):

**And** future-value language: "Will this matter for your career in 6 months?"
**And** skill-building focus: "Does this teach you valuable skills?"
**And** FOMO mitigation: "Is this aligned with your long-term goals?"
**And** permission-granting: "It's okay to skip low-value work"

**Given** general persona (insufficient signals)
**When** coaching prompt constructed
**Then** balanced neutral tone:

**And** generic questions: "Is this aligned with your goals?"
**And** Socratic approach: "What would success look like?"

**Prerequisites:** Story 3.3 (persona detection), Story 3.5 (coaching API)

**Technical Notes:**
- FR29-31 (persona adaptation, framing)
- Empathy map insight: Alex = anxiety-driven, Jordan = hope-driven
- Prompt templates: separate system prompts per persona
- A/B testing consideration: measure response quality by persona
- Tests: prompt generation by persona, tone validation

---

**Epic 3 Complete: 13 Stories**

All stories deliver <800ms coaching with context. Aha moment optimized. Persona adaptation, caching, fallback all covered.

---

## Epic 4: Power User & Personalization

**Goal:** Enhance retention through efficient workflows for power users. Desktop keyboard shortcuts for Alex, mobile gestures for Jordan. Optional task metadata for power users who want it.

**User Value:** Power users get optimized workflows. Desktop users control everything via keyboard. Mobile users access via thumb-friendly bottom nav and swipes.

**FRs Covered:** FR15-18 (metadata), FR45-46 (shortcuts/gestures), FR50-53 (desktop/mobile personalization)

---

### Story 4.1: Task Metadata - Importance & Confidence Fields

**As a** power user,
**I want** to add importance and confidence ratings to tasks,
**So that** I track which tasks matter most and where I need help.

**Acceptance Criteria:**

**Given** user creating or editing task
**When** form displayed
**Then** optional metadata fields visible:

**And** importance slider/picker: 1-10 scale (optional, can leave blank)
**And** confidence slider/picker: 1-10 scale (optional, can leave blank)
**And** tooltips explain meaning:
- Importance: "How critical is this task?"
- Confidence: "How confident are you in executing this?"

**And** fields collapsed by default (not intimidating)
**And** "Show advanced" toggle expands metadata section

**Given** user skips metadata
**When** task created without importance/confidence
**Then** task saved successfully (FR18)

**And** no validation errors
**And** fields remain null in database

**Given** user sets metadata
**When** importance and/or confidence provided
**Then** values saved to task record

**And** API accepts partial metadata (importance only, confidence only, or both)

**Prerequisites:** Story 2.1 (task API), Story 2.5 (task creation UI)

**Technical Notes:**
- FR15-18 (optional metadata)
- Database: importance, confidence fields nullable integers (1-10)
- UI: range sliders or picker dropdowns
- Default state: collapsed (don't overwhelm simple users)
- Mobile: bottom sheet with sliders for metadata entry
- Tests: metadata saving, optional behavior, validation

---

### Story 4.2: Task List - Visual Metadata Indicators

**As a** user with metadata enabled,
**I want** to see importance/confidence at a glance,
**So that** I prioritize effectively.

**Acceptance Criteria:**

**Given** task has importance rating
**When** displayed in list
**Then** importance indicator visible (FR17):

**And** visual representation: color-coded dot, badge, or border intensity
**And** high importance (8-10): red/urgent color
**And** medium importance (4-7): yellow/orange
**And** low importance (1-3): blue/calm
**And** no importance: no indicator

**Given** task has confidence rating
**When** displayed in list
**Then** confidence indicator visible:

**And** visual representation: icon or secondary badge
**And** low confidence (1-3): question mark icon or red flag
**And** medium confidence (4-7): neutral indicator
**And** high confidence (8-10): checkmark or green indicator
**And** no confidence: no indicator

**Given** task has both ratings
**When** displayed
**Then** both indicators shown without cluttering UI

**And** indicators small, non-intrusive
**And** accessible via hover tooltip (desktop) or long-press (mobile)

**Prerequisites:** Story 4.1 (metadata fields exist)

**Technical Notes:**
- FR17 (visual indicators)
- Design: subtle, professional (not overwhelming)
- Color-blind accessible: use icons + colors
- Mobile: tap indicator to see details
- Tests: indicator rendering, accessibility, color contrast

---

### Story 4.3: Keyboard Shortcuts - Core Actions

**As a** desktop power user,
**I want** keyboard shortcuts for common actions,
**So that** I work faster without reaching for mouse.

**Acceptance Criteria:**

**Given** user on desktop
**When** keyboard shortcuts pressed
**Then** actions triggered:

**And** `N` or `Cmd/Ctrl+N`: focus quick-add input
**And** `Cmd/Ctrl+K`: open command palette (future: search/navigate)
**And** `Cmd/Ctrl+Enter`: create task from quick-add
**And** `J` / `K`: navigate down/up in task list (Vim-style)
**And** `E`: edit selected task
**And** `D`: delete selected task (with confirmation)
**And** `Space`: toggle task completion
**And** `C`: request coaching on selected task
**And** `?`: show keyboard shortcuts help modal

**Given** shortcuts help modal open
**When** `?` pressed or help icon clicked
**Then** modal displays all shortcuts with descriptions

**And** shortcuts grouped by category (navigation, actions, etc.)
**And** shortcuts display OS-specific notation (Cmd on Mac, Ctrl on Windows)

**Given** user in input field
**When** typing
**Then** shortcuts disabled (prevent interference)

**And** only form-specific shortcuts active (Enter to submit, Esc to cancel)

**Prerequisites:** Story 2.5 (quick-add), Story 2.6 (edit), Story 2.7 (completion), Story 2.8 (delete), Story 3.9 (coaching)

**Technical Notes:**
- FR45, FR53 (keyboard shortcuts, desktop emphasis)
- Library: react-hotkeys-hook or custom implementation
- OS detection: display Cmd (Mac) vs Ctrl (Windows/Linux)
- Selected task state: track active task for J/K navigation
- Accessibility: shortcuts don't break screen reader navigation
- Tests: shortcut triggering, modal display, input field disabling

---

### Story 4.4: Keyboard Shortcuts - Visual Hints

**As a** desktop user,
**I want** keyboard shortcuts visible in UI,
**So that** I discover and remember them.

**Acceptance Criteria:**

**Given** desktop user hovering over actionable element
**When** hover state active
**Then** keyboard shortcut hint displayed:

**And** subtle badge showing shortcut (e.g., "E" for edit, "Space" for complete)
**And** positioned near element (tooltip or inline badge)
**And** non-intrusive (doesn't obscure content)

**Given** user on mobile/tablet
**When** viewing UI
**Then** keyboard shortcut hints hidden (not applicable)

**Given** quick-add input visible
**When** input empty
**Then** placeholder hints: "What needs your focus? (Press N to focus)"

**Prerequisites:** Story 4.3 (keyboard shortcuts exist)

**Technical Notes:**
- FR53 (desktop interface emphasizes shortcuts)
- Empathy map insight: Alex loves keyboard control
- Subtle visual hints: gray badges, tooltips
- Hide on mobile: responsive CSS (display: none below 768px)
- Tests: hint visibility, responsive hiding, tooltip positioning

---

### Story 4.5: Mobile Swipe Gestures - Enhanced Actions

**As a** mobile user,
**I want** swipe gestures for quick task actions,
**So that** I work efficiently on touch devices.

**Acceptance Criteria:**

**Given** user on mobile device
**When** viewing task in list
**Then** swipe gestures enabled:

**And** swipe right: mark complete (reveal green checkmark background)
**And** swipe left: delete (reveal red delete background)
**And** partial swipe shows action preview (background color + icon)
**And** full swipe (past threshold) triggers action
**And** partial swipe releases: snaps back to original position

**Given** user swipes right to complete
**When** swipe threshold crossed
**Then** task marked complete (Story 2.7)

**And** smooth animation (slide + opacity transition)
**And** celebration if milestone (every 5th completion)

**Given** user swipes left to delete
**When** swipe threshold crossed
**Then** confirmation prompt appears (Story 2.8)

**And** prevents accidental deletion

**Given** user on desktop
**When** viewing task list
**Then** swipe gestures disabled (mouse/trackpad not touch)

**Prerequisites:** Story 2.7 (completion), Story 2.8 (deletion), Story 2.9 (responsive layout)

**Technical Notes:**
- FR46 (mobile swipe gestures)
- Empathy map insight: Jordan's mobile-first, thumb-driven behavior
- Library: react-swipeable or custom touch event handlers
- Swipe threshold: ~50% of task width
- Animation: CSS transitions for smoothness
- Haptic feedback (if supported): vibrate on action trigger
- Tests: swipe detection, threshold triggering, animation, desktop disabling

---

### Story 4.6: Mobile Bottom Navigation

**As a** mobile user,
**I want** thumb-friendly bottom navigation,
**So that** I access features comfortably one-handed.

**Acceptance Criteria:**

**Given** user on mobile device (< 768px width)
**When** viewing app
**Then** bottom navigation bar displayed:

**And** fixed position at bottom (thumb-reach zone per FR51)
**And** 3-4 nav items: Tasks, Goals, Settings, (optional: Insights future)
**And** icons with labels
**And** active item highlighted (color + icon fill)
**And** tap target 44×44px minimum per item

**Given** user on tablet/desktop
**When** viewing app
**Then** bottom nav hidden, sidebar navigation shown instead

**Given** user taps nav item
**When** item selected
**Then** navigate to corresponding page

**And** smooth transition (no page flash)
**And** active state updates

**Prerequisites:** Story 2.9 (responsive layout), Story 3.2 (goals page exists)

**Technical Notes:**
- FR51 (mobile bottom nav, thumb reach)
- Empathy map insight: Jordan's thumb-driven navigation
- Fixed bottom position: z-index high, doesn't overlap content
- Responsive breakpoint: show bottom nav < 768px, sidebar ≥ 768px
- Icons: simple, recognizable (home, target/goal, settings)
- Tests: nav rendering, active state, responsive switching

---

### Story 4.7: Desktop Multi-Column Layout

**As a** desktop user with large screen,
**I want** multi-column layout,
**So that** I see more information without scrolling.

**Acceptance Criteria:**

**Given** desktop viewport (≥ 1024px width)
**When** viewing task list
**Then** multi-column layout enabled (FR50):

**And** sidebar navigation (left): 200-250px width
**And** main task list (center): flexible width
**And** optional coaching/insights panel (right): 300px width (future)

**Given** viewport width 1024px-1440px
**When** layout rendered
**Then** 2-column: sidebar + main content

**Given** viewport width > 1440px
**When** layout rendered
**Then** 3-column option: sidebar + main + right panel

**And** right panel shows recent coaching interactions or tips

**Given** viewport < 1024px
**When** layout rendered
**Then** single column, sidebar collapses to hamburger menu

**Prerequisites:** Story 2.9 (responsive layout), Story 4.6 (nav components exist)

**Technical Notes:**
- FR50 (desktop multi-column layout)
- Empathy map insight: Alex's desktop-optimized workflow
- Flexbox or CSS Grid for layout
- Sidebar: navigation links (Tasks, Goals, Settings, Account)
- Right panel: optional, can be hidden by user preference
- Tests: responsive breakpoints, column rendering, sidebar collapse

---

### Story 4.8: Coaching Toggle - Enable/Disable

**As a** user,
**I want** to turn AI coaching on/off globally,
**So that** I control when I see coaching features.

**Acceptance Criteria:**

**Given** user in settings
**When** viewing preferences
**Then** coaching toggle visible:

**And** label: "Enable AI Coaching"
**And** toggle switch (on/off)
**And** description: "Get AI perspective on tasks. Uses LLM API."
**And** current state displayed (enabled/disabled)

**Given** user toggles coaching off
**When** toggle switched
**Then** coaching features hidden throughout app:

**And** coaching buttons removed from task list
**And** coaching nudges disabled
**And** goal capture still accessible (optional context for future)
**And** user preference saved to database (users.coaching_enabled field)

**Given** user toggles coaching on
**When** toggle switched
**Then** coaching features restored

**And** coaching buttons visible on tasks
**And** nudges re-enabled if not dismissed
**And** preference saved

**Prerequisites:** Story 3.9 (coaching UI), Story 1.10 (settings page structure)

**Technical Notes:**
- FR24 (enable/disable coaching anytime)
- Add users.coaching_enabled boolean field to schema
- Default: true (coaching enabled, user opts out if desired)
- Zustand store: cache coaching_enabled state
- Tests: toggle functionality, UI changes, persistence

---

### Story 4.9: Settings Page - Account & Preferences

**As a** user,
**I want** centralized settings page,
**So that** I manage account and preferences in one place.

**Acceptance Criteria:**

**Given** authenticated user
**When** navigating to /settings
**Then** settings page displays:

**And** sections: Account, Preferences, Privacy, About
**And** Account section: email (read-only), change password, delete account (Story 1.10)
**And** Preferences section: coaching toggle (Story 4.8), theme (future: dark mode)
**And** Privacy section: export data (Story 5.x), coaching logging opt-out (Story 5.x)
**And** About section: app version, links to help/privacy policy

**Given** user on mobile
**When** viewing settings
**Then** single-column layout, touch-optimized

**Given** user on desktop
**When** viewing settings
**Then** sidebar + content layout, keyboard navigable

**Prerequisites:** Story 1.10 (account deletion exists), Story 4.8 (coaching toggle)

**Technical Notes:**
- Centralized settings UI
- Form sections: collapsible accordions or tabs
- Change password: same validation as signup (Story 1.8)
- Mobile: bottom sheet for subsections
- Tests: navigation, form submissions, responsive layout

---

**Epic 4 Complete: 9 Stories**

All stories enhance power user workflows. Desktop keyboard shortcuts + multi-column layout. Mobile swipe gestures + bottom nav. Optional metadata for advanced users.

---

## Epic 5: Growth, Analytics & Monetization

**Goal:** Sustainable business model through freemium. BMAD validation metrics tracked. Viral features enable organic growth. Privacy compliance (GDPR).

**User Value:** Free tier provides value indefinitely. Paid tier unlocks unlimited coaching. Data export + privacy controls build trust. Viral sharing drives growth.

**FRs Covered:** FR55-65 (freemium, privacy, export), FR68-70 (viral features), BMAD metrics (not FRs)

**Stakeholder Mapping Insight:** Dual success criteria - product metrics AND BMAD methodology validation.

---

### Story 5.1: Freemium Usage Tracking

**As a** system,
**I want** to track coaching usage per user per month,
**So that** free tier limits are enforced accurately.

**Acceptance Criteria:**

**Given** user makes coaching request
**When** POST /api/coaching called
**Then** users.coachingCount incremented

**And** if coachingResetAt is null or >30 days ago: reset count to 1, set coachingResetAt to now
**And** if coachingResetAt <30 days ago: increment count

**Given** user on free tier
**When** coachingCount checked
**Then** limit enforced: max 10 per month (FR56)

**And** if count ≥10: coaching request blocked, upgrade prompt shown

**Given** user on paid tier
**When** coachingCount checked
**Then** unlimited coaching allowed (FR57)

**And** count still tracked for analytics (not for limiting)

**Given** month rolls over (30 days since coachingResetAt)
**When** next coaching request made
**Then** count resets to 1, coachingResetAt updated

**Prerequisites:** Story 3.5 (coaching API), Story 1.2 (database schema)

**Technical Notes:**
- FR56-58 (free tier limit, paid unlimited, tracking)
- Database fields: users.coachingCount, users.coachingResetAt, users.tier (enum: 'free', 'paid')
- Reset logic: 30-day rolling window (not calendar month)
- Paid tier check: users.tier === 'paid'
- Tests: count increment, reset logic, limit enforcement, paid tier bypass

---

### Story 5.2: Freemium Limit Notification

**As a** free tier user,
**I want** notification when approaching coaching limit,
**So that** I'm not surprised when limit reached.

**Acceptance Criteria:**

**Given** free tier user at 7/10 coaching uses
**When** coaching response displayed
**Then** subtle reminder shown (FR59):

**And** message: "3 coaching interactions left this month"
**And** link: "Upgrade for unlimited"
**And** dismissible (non-intrusive)

**Given** free tier user at 9/10 coaching uses
**When** coaching response displayed
**Then** stronger notification:

**And** message: "1 coaching interaction left. Resets in X days."
**And** upgrade CTA more prominent

**Given** free tier user at 10/10 limit reached
**When** attempting coaching request
**Then** limit modal displays:

**And** message: "You've reached your free coaching limit (10/month)"
**And** options: "Upgrade to Pro" (primary), "Wait X days for reset" (secondary)
**And** coaching request blocked until upgrade or reset

**Prerequisites:** Story 5.1 (usage tracking), Story 3.10 (coaching UI)

**Technical Notes:**
- FR59 (approaching limit notification)
- Notification thresholds: 7, 9, 10 uses
- Calculate days until reset: (coachingResetAt + 30 days) - now
- Non-intrusive: banner or toast, not blocking modal (until limit reached)
- Tests: notification triggers, messaging, limit enforcement

---

### Story 5.3: Upgrade Flow - Payment Integration

**As a** user,
**I want** to upgrade to paid tier easily,
**So that** I get unlimited coaching.

**Acceptance Criteria:**

**Given** user clicks "Upgrade" CTA
**When** upgrade flow initiated
**Then** payment modal displays:

**And** pricing: $X/month (or annual option)
**And** benefits listed: "Unlimited AI coaching", "Priority support", "Future premium features"
**And** payment form: Stripe Checkout or embedded form
**And** secure payment processing (PCI compliant via Stripe)

**Given** payment succeeds
**When** Stripe webhook received
**Then** users.tier updated to 'paid'

**And** users.paidAt timestamp set
**And** coaching limit immediately removed
**And** success message: "Welcome to Pro! Enjoy unlimited coaching."
**And** email confirmation sent (future: email service integration)

**Given** payment fails
**When** Stripe error returned
**Then** user-friendly error displayed

**And** retry option available
**And** support contact provided

**Prerequisites:** Story 5.1 (tier tracking), Story 5.2 (upgrade CTAs exist)

**Technical Notes:**
- FR60 (upgrade anytime)
- Stripe integration: Stripe Checkout (simplest) or Stripe Elements
- Webhook handling: POST /api/webhooks/stripe
- Verify webhook signature (security)
- Database: users.tier, users.paidAt, subscriptions table (optional: track subscription ID, status)
- Handle subscription states: active, canceled, past_due
- Tests: payment success flow, webhook handling, error scenarios

---

### Story 5.4: Data Export - JSON Format

**As a** user,
**I want** to export all my data,
**So that** I have backup and portability.

**Acceptance Criteria:**

**Given** authenticated user
**When** navigates to settings → privacy → export data
**Then** export button visible: "Download My Data"

**Given** user clicks export button
**When** export initiated
**Then** backend generates JSON file containing:

**And** user account info (email, createdAt, but NOT passwordHash)
**And** all tasks (text, importance, confidence, isCompleted, timestamps)
**And** goals (whatMatters, biggestWin, worstOutcome)
**And** coaching interactions (task, response, latency, timestamp, but NOT userId for privacy)
**And** persona signals (device, usage patterns)

**And** file downloaded: simple-todo-export-YYYY-MM-DD.json
**And** file size displayed before download
**And** export completes in <5 seconds for typical user (<1000 tasks)

**Given** user has opted out of coaching logging
**When** export generated
**Then** coaching interactions excluded (respects opt-out)

**Prerequisites:** Story 1.10 (settings page), Story 5.5 (privacy opt-outs)

**Technical Notes:**
- FR61 (data export)
- Export format: JSON (machine-readable, standard)
- Exclude sensitive fields: passwordHash, internal IDs (use text labels)
- Future: CSV option for spreadsheet import
- Rate limiting: 1 export per hour per user (prevent abuse)
- Tests: export generation, data completeness, privacy opt-out respect

---

### Story 5.5: Privacy Controls - Coaching Logging Opt-Out

**As a** privacy-conscious user,
**I want** to opt out of coaching interaction logging,
**So that** my coaching history isn't permanently stored.

**Acceptance Criteria:**

**Given** user in settings → privacy
**When** privacy controls displayed
**Then** coaching logging toggle visible:

**And** label: "Log AI Coaching Interactions"
**And** description: "Store coaching history for quality improvements. Disable to prevent logging."
**And** default: enabled (opt-out model)
**And** current state displayed

**Given** user toggles logging off
**When** toggle switched
**Then** users.coaching_logging_enabled set to false

**And** future coaching interactions NOT saved to coaching_interactions table
**And** coaching still works (responses generated, just not logged)
**And** warning shown: "Disabling logging means we can't improve coaching quality based on your feedback"

**Given** user with logging disabled requests coaching
**When** coaching response generated
**Then** response displayed normally

**And** NO record created in coaching_interactions table
**And** usage count still incremented (for freemium limit)

**Prerequisites:** Story 3.5 (coaching API), Story 4.9 (settings page)

**Technical Notes:**
- FR62 (opt out of coaching logging)
- Database: users.coaching_logging_enabled boolean (default true)
- Coaching still functional when disabled (only logging affected)
- Usage tracking separate from interaction logging (freemium still works)
- Tests: opt-out functionality, logging behavior, coaching still works

---

### Story 5.6: Privacy Policy & GDPR Compliance

**As a** user,
**I want** clear privacy policy and GDPR compliance,
**So that** I trust the app with my data.

**Acceptance Criteria:**

**Given** user on landing page or in app
**When** footer displayed
**Then** privacy policy link visible

**And** link navigates to /privacy-policy page
**And** policy clearly states:
- Data collected: email, tasks, goals, coaching interactions (if opted in)
- Data usage: app functionality, coaching quality improvement
- Data sharing: NOT shared with third parties (FR65)
- Data retention: deleted on account deletion (FR64)
- User rights: export, delete, opt-out

**Given** EU user
**When** signing up
**Then** GDPR-compliant consent shown:

**And** checkbox: "I agree to the privacy policy and terms of service"
**And** links to both documents
**And** cannot proceed without consent

**Given** user deletes account (Story 1.10)
**When** deletion confirmed
**Then** ALL data permanently deleted (FR64):

**And** user record, tasks, goals, coaching interactions, refresh tokens
**And** cascade deletes work correctly
**And** no soft delete (hard delete for GDPR)
**And** confirmation email sent: "Your data has been permanently deleted"

**Prerequisites:** Story 1.10 (account deletion), Story 5.5 (privacy controls)

**Technical Notes:**
- FR63-65 (privacy policy, GDPR deletion, no third-party sharing)
- Privacy policy: Markdown document, versioned
- GDPR compliance: consent checkbox on signup, data deletion on account delete
- Tests: privacy policy accessible, deletion completeness, consent required

---

### Story 5.7: Social Sharing - Aha Moment Posts

**As a** user who had positive coaching experience,
**I want** to share on social media,
**So that** I spread the word and invite friends.

**Acceptance Criteria:**

**Given** user receives helpful coaching
**When** coaching response displayed
**Then** share button visible (FR68):

**And** icon: share/export symbol
**And** label: "Share this insight"
**And** positioned near feedback buttons (thumbs up/down)

**Given** user clicks share button
**When** share modal opens
**Then** pre-populated social post shown:

**And** text: "Just got great perspective from @SimpleToDoAI: '[coaching excerpt]'. Helps me focus on what actually matters. 🎯"
**And** editable (user can customize)
**And** share options: Twitter/X, LinkedIn, copy link
**And** Open Graph preview shown (image + description)

**Given** user shares on Twitter
**When** share clicked
**Then** Twitter intent URL opened with pre-filled text

**And** opens in new tab/window
**And** tracking pixel (optional): utm_source=twitter&utm_campaign=aha_share

**Prerequisites:** Story 3.10 (coaching UI), Story 1.7 (Open Graph tags exist)

**Technical Notes:**
- FR68-69 (share aha moments, Open Graph tags)
- Share button: optional, not pushy
- Social platforms: Twitter/X, LinkedIn (professional contexts)
- Open Graph tags: already implemented in Story 1.7, enhance for coaching shares
- Privacy: don't share task text without permission, only coaching insight
- Tests: share button visibility, modal display, social intent URLs

---

### Story 5.8: Referral Program - Invite Friends

**As a** satisfied user,
**I want** to invite friends and get rewards,
**So that** I benefit from spreading the word.

**Acceptance Criteria:**

**Given** authenticated user
**When** navigates to settings → referrals (or dedicated /refer page)
**Then** referral interface displays:

**And** unique referral link: https://simple-todo.app/r/[userCode]
**And** copy link button (clipboard API)
**And** referral count: "X friends joined"
**And** reward status: "Earn 1 month Pro for every 3 referrals" (example)

**Given** user copies referral link
**When** copy button clicked
**Then** link copied to clipboard

**And** toast notification: "Link copied!"

**Given** new user visits referral link
**When** /r/[userCode] accessed
**Then** referrer tracked in signup flow

**And** cookie set: referred_by=[userCode] (7-day expiry)
**And** redirect to signup page

**Given** referred user signs up
**When** account created
**Then** referral recorded in database:

**And** referrals table: referrer_id, referred_user_id, createdAt
**And** referrer's referral count incremented
**And** reward eligibility checked (e.g., every 3 referrals = 1 month Pro)

**Prerequisites:** Story 1.3 (signup), Story 5.3 (paid tier mechanics)

**Technical Notes:**
- FR70 (referral/viral loop)
- Referral code: short alphanumeric (6-8 chars), unique per user
- Generate on user creation: base64(userId) or random string
- Track referrals: separate table or users.referred_by foreign key
- Reward mechanics: configurable (1 month free per N referrals)
- Fraud prevention: validate referred user is active (e.g., completed 5 tasks)
- Tests: link generation, referral tracking, reward calculation

---

### Story 5.9: Analytics - BMAD Validation Metrics

**As a** project owner,
**I want** BMAD methodology validation metrics tracked,
**So that** I measure iteration velocity and pattern reusability.

**Acceptance Criteria:**

**Given** application running in production
**When** key events occur
**Then** metrics logged for BMAD validation:

**And** **Iteration Velocity:**
- Story completion time (from started to deployed)
- Epic completion time
- Deployment frequency (commits/deploys per week)
- Bug/rework rate (issues created post-deployment)

**And** **User Metrics (validate product, not just methodology):**
- 2-week retention rate
- Coaching try rate (% of users who try coaching at least once)
- Time-to-first-value (signup to first task created)
- Free-to-paid conversion rate

**And** **Cost Metrics:**
- LLM API cost per user per month (target <$2 per FR/NFR)
- Cache hit rate (% of coaching requests served from cache)
- Average coaching latency (P50, P95, P99)

**Given** viewing admin dashboard (/admin/metrics)
**When** authenticated as project owner
**Then** BMAD metrics displayed:

**And** charts: velocity trends, retention curves, cost per user
**And** exportable as CSV for case study documentation
**And** real-time data (refreshed hourly)

**Prerequisites:** Story 1.12 (observability foundation), Story 3.5 (coaching metrics logged)

**Technical Notes:**
- Stakeholder mapping insight: dual success criteria (BMAD + product)
- Metrics storage: dedicated analytics_events table or external service (Plausible, PostHog)
- BMAD-specific metrics: track story/epic completion via git commits or manual logging
- Admin dashboard: protected route, simple charts (Chart.js or Recharts)
- Privacy: aggregate only, no individual user tracking without consent
- Tests: metric logging, dashboard rendering, CSV export

---

### Story 5.10: User Feedback Mechanism

**As a** user,
**I want** easy way to provide feedback or report bugs,
**So that** I help improve the product.

**Acceptance Criteria:**

**Given** user in app
**When** viewing any page
**Then** feedback button accessible:

**And** positioned in footer or floating button (non-intrusive)
**And** icon: message or feedback symbol
**And** label: "Feedback" or "Help"

**Given** user clicks feedback button
**When** feedback modal opens
**Then** simple form displayed:

**And** feedback type dropdown: Bug Report, Feature Request, General Feedback
**And** message textarea (required, max 500 chars)
**And** email optional (pre-filled if authenticated)
**And** screenshot option: "Include screenshot" checkbox (captures current page)
**And** submit button

**Given** user submits feedback
**When** form submitted
**Then** feedback saved to database (feedback table)

**And** email notification to team (optional)
**And** success message: "Thanks! We'll review your feedback."
**And** user can continue using app (modal closes)

**Prerequisites:** Story 4.9 (settings/UI framework)

**Technical Notes:**
- Stakeholder mapping insight: early adopter feedback loop critical
- Feedback table: type, message, email, screenshot_url, user_id, createdAt
- Screenshot: browser screenshot API (if supported) or skip
- Email notification: placeholder for MVP (console.log), real email post-MVP
- Alternative: integrate with existing tools (Canny, GitHub Issues)
- Tests: form submission, feedback storage, modal behavior

---

**Epic 5 Complete: 10 Stories**

All stories deliver sustainable business model + BMAD validation + viral growth. Freemium limits enforced. Data export + privacy controls. Referral program. BMAD metrics tracked.

---

## Detailed FR Coverage Matrix

| FR # | Description | Epic | Story |
|------|-------------|------|-------|
| FR1 | Create accounts (email/password) | Epic 1 | 1.3 |
| FR2 | Login securely | Epic 1 | 1.3 |
| FR3 | Reset forgotten passwords | Epic 1 | 1.3 |
| FR4 | Session persistence | Epic 1 | 1.3 |
| FR5 | Logout | Epic 1 | 1.3 |
| FR6 | Delete account + data | Epic 5 | 5.4 |
| FR7 | Create tasks (plain text) | Epic 2 | 2.1 |
| FR8 | View all tasks | Epic 2 | 2.1 |
| FR9 | Edit task descriptions | Epic 2 | 2.1 |
| FR10 | Delete tasks | Epic 2 | 2.4 |
| FR11 | Mark tasks complete | Epic 2 | 2.3 |
| FR12 | Unmark completed tasks | Epic 2 | 2.3 |
| FR13 | Visual distinction (active/completed) | Epic 2 | 2.3 |
| FR14 | Works without AI | Epic 2 | 2.1-2.4 |
| FR15 | Optional importance rating | Epic 4 | 4.1 |
| FR16 | Optional confidence rating | Epic 4 | 4.1 |
| FR17 | Visual indicators (metadata) | Epic 4 | 4.1 |
| FR18 | Skip metadata (simple mode) | Epic 4 | 4.1 |
| FR19 | Capture goals (conversational) | Epic 3 | 3.1 |
| FR20 | Skip goal capture | Epic 3 | 3.1 |
| FR21 | Edit/update goals | Epic 3 | 3.1 |
| FR22 | View saved goals | Epic 3 | 3.1 |
| FR23 | Store goals for AI context | Epic 3 | 3.1 |
| FR24 | Enable/disable AI coaching | Epic 3 | 3.7 |
| FR25 | Request coaching on specific tasks | Epic 3 | 3.6 |
| FR26 | Request coaching before creating task | Epic 3 | 3.6 |
| FR27 | <800ms latency (99th percentile) | Epic 3 | 3.3, 3.4, 3.5 |
| FR28 | Coaching references goals | Epic 3 | 3.2 |
| FR29 | Persona-adaptive tone | Epic 3 | 3.2 |
| FR30 | Opportunity cost framing (business) | Epic 3 | 3.2 |
| FR31 | Future-value framing (student) | Epic 3 | 3.2 |
| FR32 | Conversational tone (2-3 sentences) | Epic 3 | 3.2 |
| FR33 | Respond to coaching (actions) | Epic 3 | 3.6 |
| FR34 | Thumbs up/down feedback | Epic 3 | 3.11 |
| FR35 | Rule-based fallback (degradation) | Epic 3 | 3.8 |
| FR36 | Pre-generated patterns (latency) | Epic 3 | 3.5 |
| FR37 | Cache responses (reduce API calls) | Epic 3 | 3.3, 3.4 |
| FR38 | Gentle coaching invitation (5+ tasks) | Epic 3 | 3.9 |
| FR39 | Show example before first use | Epic 3 | 3.9 |
| FR40 | Thinking indicator | Epic 3 | 3.6 |
| FR41 | Celebrate milestones (every 5) | Epic 3 | 3.10 |
| FR42 | Dismissible suggestions | Epic 3 | 3.9, 3.10 |
| FR43 | Quick-add task entry (always visible) | Epic 2 | 2.2 |
| FR44 | Optimistic UI (immediate feedback) | Epic 2 | 2.5 |
| FR45 | Keyboard shortcuts (desktop) | Epic 4 | 4.2 |
| FR46 | Swipe gestures (mobile) | Epic 4 | 4.3 |
| FR47 | Skeleton screens (loading) | Epic 2 | 2.8 |
| FR48 | Responsive layout (mobile/tablet/desktop) | Epic 2 | 2.6 |
| FR49 | Detect usage context | Epic 3 | 3.2 |
| FR50 | Multi-column layout (desktop) | Epic 4 | 4.4 |
| FR51 | Bottom navigation (mobile) | Epic 4 | 4.5 |
| FR52 | Touch-optimized tap targets (44×44px) | Epic 4 | 4.5 |
| FR53 | Emphasize keyboard shortcuts (desktop) | Epic 4 | 4.2 |
| FR54 | Adapt coaching language (implicit) | Epic 3 | 3.2 |
| FR55 | Free tier: unlimited tasks | Epic 5 | 5.1 |
| FR56 | Free tier: 10 coaching/month | Epic 5 | 5.1 |
| FR57 | Paid tier: unlimited coaching | Epic 5 | 5.1 |
| FR58 | Track coaching usage | Epic 5 | 5.1 |
| FR59 | Notify approaching limit | Epic 5 | 5.1 |
| FR60 | Upgrade to paid tier | Epic 5 | 5.2 |
| FR61 | Export all data | Epic 5 | 5.3 |
| FR62 | Opt out of interaction logging | Epic 5 | 5.4 |
| FR63 | Clear privacy policy | Epic 5 | 5.4 |
| FR64 | Delete all data (GDPR) | Epic 5 | 5.4 |
| FR65 | Todo data remains private | Epic 5 | 5.4 |
| FR66 | Landing page (5-second value prop) | Epic 1 | 1.2 |
| FR67 | Demo video (15-second) | Epic 1 | 1.2 |
| FR68 | Share aha moments (social) | Epic 5 | 5.6 |
| FR69 | Open Graph tags | Epic 5 | 5.6 |
| FR70 | Refer friends (viral loop) | Epic 5 | 5.7 |
| FR71 | Baseline functionality without AI | Epic 1 | 1.7 |
| FR72 | Rule-based fallback | Epic 3 | 3.8 |
| FR73 | Handle rate limits gracefully | Epic 3 | 3.8 |
| FR74 | Background sync (non-blocking) | Epic 2 | 2.7 |

**Coverage Summary:**
- ✅ All 74 FRs mapped to specific stories
- ✅ No orphaned requirements
- ✅ No duplicate coverage (intentional)
- ✅ Epic 3 largest (13 stories) - reflects <800ms latency complexity
- ✅ Foundation epic (1) acceptable - greenfield project setup

---

## Epic Breakdown Summary

### Story Count by Epic

| Epic | Story Count | Primary Focus |
|------|-------------|---------------|
| Epic 1 | 12 stories | Foundation, Landing Page, Authentication, Instant Onboarding |
| Epic 2 | 12 stories | Core Todo CRUD, Mobile/Desktop UX, Responsive Design |
| Epic 3 | 13 stories | AI Coaching, Goals, Caching, Persona Adaptation, <800ms Latency |
| Epic 4 | 9 stories | Power User Features, Keyboard Shortcuts, Mobile Gestures |
| Epic 5 | 10 stories | Freemium, Analytics, Monetization, Viral Growth, BMAD Metrics |
| **Total** | **56 stories** | Complete MVP coverage |

### Development Sequencing Recommendations

**Sprint 1-2: Epic 1 (Foundation & Instant Value)**
- Critical path: Project setup → Database → Authentication → Landing page
- Deliverable: User can sign up and see landing page
- Risk: Infrastructure decisions block all subsequent work
- Dependencies: None (start here)

**Sprint 3-4: Epic 2 (Core Todo Experience)**
- Critical path: Task CRUD API → Task UI → Quick-add → Responsive layout
- Deliverable: Fully functional todo app without AI
- Risk: Building trust before AI introduction
- Dependencies: Epic 1 complete (auth required)

**Sprint 5-7: Epic 3 (AI Coaching with Context)**
- Critical path: Goals → LLM integration → Multi-tier caching → Coaching UI → Persona adaptation
- Deliverable: <800ms AI coaching with context
- Risk: CRITICAL retention moment - must be excellent
- Dependencies: Epic 2 complete (baseline trust established)
- Notes: Largest epic (13 stories) reflects <800ms latency complexity

**Sprint 8-9: Epic 4 (Power User & Personalization)**
- Critical path: Metadata → Keyboard shortcuts → Mobile gestures → Adaptive layouts
- Deliverable: Power user efficiency features
- Risk: Retention optimization after core value proven
- Dependencies: Epic 2 complete (baseline UX)

**Sprint 10-11: Epic 5 (Growth, Analytics & Monetization)**
- Critical path: Freemium tracking → Payment integration → Data export → Viral features
- Deliverable: Sustainable business model + growth mechanics
- Risk: Monetization after value proven
- Dependencies: Epic 3 complete (AI value demonstrated)

### Context Availability Summary

**Available Context During Epic Creation:**
- ✅ PRD: Functional requirements (74 FRs), non-functional requirements, product scope
- ✅ Architecture: Technology stack, data architecture, API contracts, deployment strategy
- ✅ Advanced Elicitation: Journey mapping, service blueprint, stakeholder mapping, empathy map
- ⚠️ NOT Available: Existing codebase (greenfield project), team velocity data, production metrics

**Context Applied:**
- Journey mapping: Epic sequencing matches user journey stages (discover → trust → aha → retention → growth)
- Service blueprint: Backstage requirements (monitoring, caching, fallback) included in stories
- Stakeholder mapping: BMAD validation metrics (Story 5.9) address methodology stakeholder needs
- Empathy map: Dual persona patterns (Alex desktop/anxiety vs Jordan mobile/hope) throughout

### Architectural Decisions (Resolved)

1. **Caching Strategy:** ✅ Node-cache (in-memory) for MVP (Affects 3.3, 3.4)
   - Rationale: Simpler deployment, sufficient for MVP scale (<100 concurrent users)
   - Post-MVP: Consider Redis if scaling beyond single instance

2. **Payment Provider:** ✅ Stripe (Affects 5.2)
   - Rationale: Industry standard, excellent docs, embedded checkout

3. **LLM Fallback:** ✅ Cheaper model (Claude Haiku or GPT-4o-mini) (Affects 3.8)
   - Rationale: Better UX than rule-based patterns, maintains conversational quality
   - Fallback cascade: Sonnet 4.5 → Haiku → Error message

4. **Monitoring Tool:** ✅ Datadog (Affects 1.7)
   - Rationale: Comprehensive observability, APM + logs + metrics unified

5. **Email Service:** ✅ Resend.com (Affects 1.3 password reset)
   - Rationale: Developer-friendly API, generous free tier, excellent deliverability

6. **Mobile Framework:** ✅ PWA post-MVP (Future consideration)
   - Rationale: Start responsive web, validate usage before native investment

7. **Demo Video:** ✅ Screen recording (Affects 1.2 timeline/cost)
   - Rationale: Faster to produce, easier to update, authentic feel

8. **Referral Incentive:** ✅ Referrals receive +5 free coaching sessions/month (Affects 5.7)
   - Rationale: Aligns with product value, low cost, encourages viral loop

### Next Steps

1. **Review & Approve:** Validate epic breakdown aligns with product vision
2. **Prioritize:** Confirm epic sequencing or adjust based on strategic priorities
3. **Estimate:** Size each story (t-shirt sizes or story points) for sprint planning
4. **Assign:** Map stories to team members based on expertise
5. **Create Tickets:** Convert stories to Linear/Jira tickets with full acceptance criteria
6. **Kickoff Sprint 1:** Begin Epic 1 development (foundation stories)

---

**Document Status:** ✅ Complete

**Generated:** 2025-11-22
**Author:** BMad
**Workflow:** BMAD Method - Epic & Story Creation
**Context:** PRD + Architecture + Advanced Elicitation (Journey Map, Service Blueprint, Stakeholder Map, Empathy Map)

