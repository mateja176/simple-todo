import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createLoginPayload, createSignupPayload } from '../helpers/factories.js'

// Mock db and auth lib BEFORE importing app
vi.mock('../../src/db/index.js', () => ({
  db: {
    query: {
      users: {
        findFirst: vi.fn(),
      },
    },
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn(),
      })),
    })),
  },
}))

vi.mock('../../src/lib/auth.js', () => ({
  hashPassword: vi.fn().mockResolvedValue('hashed_password'),
  verifyPassword: vi.fn().mockResolvedValue(true),
  generateTokens: vi
    .fn()
    .mockReturnValue({ accessToken: 'access_token', refreshToken: 'refresh_token' }),
}))

vi.mock('../../src/middleware/rate-limit.js', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loginRateLimiter: async (_c: any, next: any) => await next(),
}))

// Import app AFTER mocks
import app from '../../src/app.js'
import { db } from '../../src/db/index.js'
import { verifyPassword } from '../../src/lib/auth.js'

describe('Auth API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/auth/signup', () => {
    it('should create a new user and return tokens', async () => {
      vi.mocked(db.query.users.findFirst).mockResolvedValue(undefined)
      const payload = createSignupPayload()

      const mockUser = {
        id: 'user-id',
        email: payload.email,
        createdAt: 123,
        updatedAt: 123,
      }
      const returningMock = vi.fn().mockResolvedValue([mockUser])
      const valuesMock = vi.fn().mockReturnValue({ returning: returningMock })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(db.insert).mockReturnValue({ values: valuesMock } as any)

      const res = await app.request('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      expect(res.status).toBe(201)
      const body = await res.json()
      expect(body).toHaveProperty('user')
      expect(body.user).toHaveProperty('email', payload.email)
      expect(body.user).not.toHaveProperty('password') // Should not return password
      expect(body).toHaveProperty('accessToken')

      // Verify refresh token cookie
      const cookies = res.headers.get('set-cookie')
      expect(cookies).toContain('refreshToken')
      expect(cookies).toContain('HttpOnly')
    })

    it('should return 400 for invalid email', async () => {
      const payload = createSignupPayload({ email: 'invalid-email' })
      const res = await app.request('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      expect(res.status).toBe(400)
    })

    it('should return 400 for weak password', async () => {
      const payload = createSignupPayload({ password: 'weak' })
      const res = await app.request('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      expect(res.status).toBe(400)
    })
  })

  describe('POST /api/auth/login', () => {
    it('should authenticate user and return tokens', async () => {
      const signupPayload = createSignupPayload()

      const mockUser = {
        id: 'user-id',
        email: signupPayload.email,
        passwordHash: 'hashed_password',
        createdAt: 123,
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(db.query.users.findFirst).mockResolvedValue(mockUser as any)
      vi.mocked(verifyPassword).mockResolvedValue(true)

      const valuesMock = vi.fn()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(db.insert).mockReturnValue({ values: valuesMock } as any)

      const res = await app.request('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signupPayload.email,
          password: signupPayload.password,
        }),
      })

      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body).toHaveProperty('user')
      expect(body.user.email).toBe(signupPayload.email)
      expect(body).toHaveProperty('accessToken')

      const cookies = res.headers.get('set-cookie')
      expect(cookies).toContain('refreshToken')
    })

    it('should return 401 for invalid credentials', async () => {
      vi.mocked(db.query.users.findFirst).mockResolvedValue(undefined)
      const payload = createLoginPayload()
      const res = await app.request('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      expect(res.status).toBe(401)
    })
  })
})
