import { describe, expect, it } from 'vitest'
import app from '../../src/app.js'
import { createLoginPayload, createSignupPayload } from '../helpers/factories.js'

describe('Auth API', () => {
  describe('POST /api/auth/signup', () => {
    it('should create a new user and return tokens', async () => {
      const payload = createSignupPayload()
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
      // First create a user (this relies on signup working, or we need to seed DB)
      // For ATDD, we can assume signup works or mock the DB.
      // Since we are in "Red" phase, this will fail anyway.

      const signupPayload = createSignupPayload()
      // Signup first
      await app.request('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupPayload),
      })

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
