# ATDD Checklist - Epic 1, Story 3: Authentication API - Signup & Login

**Date:** 23 November 2025
**Author:** BMad
**Primary Test Level:** API Integration

---

## Story Summary

**As a** user
**I want** to create an account and log in with email/password
**So that** my tasks are private and persisted

---

## Acceptance Criteria

1. **Given** valid email and password (8+ chars, 1 uppercase, 1 number, 1 special), **when** POST /api/auth/signup, **then** user created in database with bcrypt hash (cost factor 12)
2. JWT access token returned (24h expiry, HS256)
3. Refresh token set in httpOnly cookie (30d expiry)
4. User object returned (id, email, createdAt)
5. Response time <200ms (P95)
6. **Given** existing user credentials, **when** POST /api/auth/login, **then** user authenticated, tokens issued same as signup
7. Invalid credentials return 401 with generic error (don't leak user existence)
8. Rate limited to 5 login attempts per IP per hour (prevent brute force)

---

## Failing Tests Created (RED Phase)

### API Tests (5 tests)

**File:** `apps/api/__tests__/integration/auth.test.ts`

- ✅ **Test:** should create a new user and return tokens
  - **Status:** RED - Expected 201, Received 404
  - **Verifies:** AC 1, 2, 3, 4

- ✅ **Test:** should return 400 for invalid email
  - **Status:** RED - Expected 400, Received 404
  - **Verifies:** AC 1 (Validation)

- ✅ **Test:** should return 400 for weak password
  - **Status:** RED - Expected 400, Received 404
  - **Verifies:** AC 1 (Validation)

- ✅ **Test:** should authenticate user and return tokens
  - **Status:** RED - Expected 200, Received 404
  - **Verifies:** AC 6

- ✅ **Test:** should return 401 for invalid credentials
  - **Status:** RED - Expected 401, Received 404
  - **Verifies:** AC 7

---

## Data Factories Created

### Auth Factories

**File:** `apps/api/__tests__/helpers/factories.ts`

**Exports:**

- `createSignupPayload(overrides?)` - Create valid signup payload with complex password
- `createLoginPayload(overrides?)` - Create login payload

**Example Usage:**

```typescript
const payload = createSignupPayload();
const loginPayload = createLoginPayload({ email: payload.email });
```
