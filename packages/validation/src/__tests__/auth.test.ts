import { describe, expect, it } from 'vitest'
import { loginSchema, passwordSchema, signupSchema } from '../auth'

describe('Auth Validation', () => {
  describe('Password Schema', () => {
    it('should validate correct password', () => {
      expect(passwordSchema.safeParse('SecurePass1!').success).toBe(true)
    })

    it('should fail if too short', () => {
      expect(passwordSchema.safeParse('Short1!').success).toBe(false)
    })

    it('should fail if no uppercase', () => {
      expect(passwordSchema.safeParse('securepass1!').success).toBe(false)
    })

    it('should fail if no number', () => {
      expect(passwordSchema.safeParse('SecurePass!').success).toBe(false)
    })

    it('should fail if no special char', () => {
      expect(passwordSchema.safeParse('SecurePass1').success).toBe(false)
    })
  })

  describe('Signup Schema', () => {
    it('should validate correct signup data', () => {
      const data = { email: 'test@example.com', password: 'SecurePass1!' }
      expect(signupSchema.safeParse(data).success).toBe(true)
    })

    it('should fail with invalid email', () => {
      const data = { email: 'invalid-email', password: 'SecurePass1!' }
      expect(signupSchema.safeParse(data).success).toBe(false)
    })
  })

  describe('Login Schema', () => {
    it('should validate correct login data', () => {
      const data = { email: 'test@example.com', password: 'any' }
      expect(loginSchema.safeParse(data).success).toBe(true)
    })
  })
})
