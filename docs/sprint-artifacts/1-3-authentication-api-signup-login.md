# Story 1.3: Authentication API - Signup & Login

Status: done

## Story

**As a** user,
**I want** to create an account and log in with email/password,
**So that** my tasks are private and persisted.

## Acceptance Criteria

1. **Given** valid email and password (8+ chars, 1 uppercase, 1 number, 1 special), **when** POST /api/auth/signup, **then** user created in database with bcrypt hash (cost factor 12)
2. JWT access token returned (24h expiry, HS256)
3. Refresh token set in httpOnly cookie (30d expiry)
4. User object returned (id, email, createdAt)
5. Response time <200ms (P95)
6. **Given** existing user credentials, **when** POST /api/auth/login, **then** user authenticated, tokens issued same as signup
7. Invalid credentials return 401 with generic error (don't leak user existence)
8. Rate limited to 5 login attempts per IP per hour (prevent brute force)

## Tasks / Subtasks

- [x] Setup Auth Environment
  - [x] Install dependencies (`bcryptjs`, `jsonwebtoken`, `zod`)
  - [x] Configure environment variables (`JWT_SECRET`)
- [x] Implement Validation Schemas
  - [x] Create Zod schemas for signup and login requests in `@repo/validation`
  - [x] Ensure password complexity rules are enforced
- [x] Implement Auth Utilities
  - [x] Create password hashing helper (bcrypt cost 12)
  - [x] Create JWT signing/verification helper
- [x] Implement Signup Endpoint (`POST /api/auth/signup`)
  - [x] Validate request body
  - [x] Check if user exists (handle duplicate email)
  - [x] Hash password
  - [x] Create user in DB
  - [x] Generate tokens (access & refresh)
  - [x] Store refresh token in DB
  - [x] Set httpOnly cookie for refresh token
  - [x] Return user object and access token
- [x] Implement Login Endpoint (`POST /api/auth/login`)
  - [x] Validate request body
  - [x] Find user by email
  - [x] Verify password
  - [x] Generate tokens
  - [x] Store refresh token (rotate if needed, or just add new)
  - [x] Set httpOnly cookie
  - [x] Return user object and access token
- [x] Implement Rate Limiting
  - [x] Add rate limiting middleware for login endpoint
- [x] Testing
  - [x] Unit tests for validation schemas
  - [x] Integration tests for signup flow
  - [x] Integration tests for login flow (success, invalid credentials, rate limit)

## Dev Notes

- Endpoints per `api-contracts.md`
- bcrypt with cost factor 12 (`security-architecture.md`)
- JWT signing secret from environment variable (`JWT_SECRET`)
- Refresh token stored in `refresh_tokens` table
- Zod validation for request bodies (`@repo/validation`)
- Error responses follow API response format (`implementation-patterns.md`)
- Log auth events with Pino (no sensitive data logged)

## Dev Agent Record

### Debug Log

- Implemented auth endpoints and validation.
- Fixed lint errors in tests.
- Fixed JWT_SECRET missing in tests.
- Updated integration tests to mock DB.

### Completion Notes

- Implemented Signup and Login endpoints with JWT auth.
- Added Zod validation schemas in `@repo/validation`.
- Added rate limiting middleware.
- Added unit tests for validation and integration tests for API.
- Verified all ACs.

## File List

- apps/api/package.json
- apps/api/.env
- apps/api/.env.example
- apps/api/src/app.ts
- apps/api/src/routes/auth.ts
- apps/api/src/lib/auth.ts
- apps/api/src/middleware/rate-limit.ts
- apps/api/**tests**/integration/auth.test.ts
- apps/api/vitest.config.ts
- packages/validation/package.json
- packages/validation/src/auth.ts
- packages/validation/src/index.ts
- packages/validation/src/**tests**/auth.test.ts

## Change Log

- 2025-11-23: Implemented auth endpoints, validation, and tests.
