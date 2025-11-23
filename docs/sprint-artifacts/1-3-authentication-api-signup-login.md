# Story 1.3: Authentication API - Signup & Login

Status: ready-for-dev

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

- [ ] Setup Auth Environment
  - [ ] Install dependencies (`bcryptjs`, `jsonwebtoken`, `zod`)
  - [ ] Configure environment variables (`JWT_SECRET`)
- [ ] Implement Validation Schemas
  - [ ] Create Zod schemas for signup and login requests in `@repo/validation`
  - [ ] Ensure password complexity rules are enforced
- [ ] Implement Auth Utilities
  - [ ] Create password hashing helper (bcrypt cost 12)
  - [ ] Create JWT signing/verification helper
- [ ] Implement Signup Endpoint (`POST /api/auth/signup`)
  - [ ] Validate request body
  - [ ] Check if user exists (handle duplicate email)
  - [ ] Hash password
  - [ ] Create user in DB
  - [ ] Generate tokens (access & refresh)
  - [ ] Store refresh token in DB
  - [ ] Set httpOnly cookie for refresh token
  - [ ] Return user object and access token
- [ ] Implement Login Endpoint (`POST /api/auth/login`)
  - [ ] Validate request body
  - [ ] Find user by email
  - [ ] Verify password
  - [ ] Generate tokens
  - [ ] Store refresh token (rotate if needed, or just add new)
  - [ ] Set httpOnly cookie
  - [ ] Return user object and access token
- [ ] Implement Rate Limiting
  - [ ] Add rate limiting middleware for login endpoint
- [ ] Testing
  - [ ] Unit tests for validation schemas
  - [ ] Integration tests for signup flow
  - [ ] Integration tests for login flow (success, invalid credentials, rate limit)

## Dev Notes

- Endpoints per `api-contracts.md`
- bcrypt with cost factor 12 (`security-architecture.md`)
- JWT signing secret from environment variable (`JWT_SECRET`)
- Refresh token stored in `refresh_tokens` table
- Zod validation for request bodies (`@repo/validation`)
- Error responses follow API response format (`implementation-patterns.md`)
- Log auth events with Pino (no sensitive data logged)
