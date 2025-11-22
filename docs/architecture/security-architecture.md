# Security Architecture

## Authentication Flow

1. **Signup/Login:**
   - Password → bcrypt hash (cost 12)
   - Generate access token (JWT, 15min expiry)
   - Generate refresh token (random, 7 day expiry)
   - Store refresh token in DB
   - Set httpOnly cookie with refresh token
   - Return access token in response

2. **Protected Requests:**
   - Client sends `Authorization: Bearer {accessToken}`
   - Middleware validates JWT signature
   - Extract userId from JWT payload
   - Attach to request context

3. **Token Refresh:**
   - Client sends request with expired access token
   - Gets 401 response
   - Automatically calls /api/auth/refresh with httpOnly cookie
   - Backend validates refresh token from DB
   - Issues new access + refresh tokens
   - Invalidates old refresh token (rotation)
   - Client retries original request

4. **Logout:**
   - Delete refresh token from DB
   - Clear httpOnly cookie
   - Client discards access token

## Input Validation

- All inputs validated with Zod schemas (packages/validation)
- Frontend validates before submission
- Backend validates again (never trust client)
- Sanitize HTML/SQL injection attempts
- Rate limiting on auth endpoints (5 attempts/15min)

## Data Protection

- TLS enforced (Vercel + Railway)
- Passwords never logged
- PII (task text, goals) hashed in logs
- CORS configured for frontend origin only
- CSRF protection via SameSite cookies

---
