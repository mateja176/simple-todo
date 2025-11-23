import type { Context, Next } from 'hono'

const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 5

const ipRequests = new Map<string, { count: number; resetTime: number }>()

export const loginRateLimiter = async (c: Context, next: Next) => {
  const ip = c.req.header('x-forwarded-for') || 'unknown'
  const now = Date.now()

  const record = ipRequests.get(ip)

  if (record) {
    if (now > record.resetTime) {
      // Reset window
      ipRequests.set(ip, { count: 1, resetTime: now + WINDOW_MS })
    } else {
      if (record.count >= MAX_REQUESTS) {
        return c.json({ error: 'Too many login attempts. Please try again later.' }, 429)
      }
      record.count++
    }
  } else {
    ipRequests.set(ip, { count: 1, resetTime: now + WINDOW_MS })
  }

  // Cleanup old entries occasionally (simple optimization)
  if (Math.random() < 0.01) {
    for (const [key, val] of ipRequests.entries()) {
      if (now > val.resetTime) {
        ipRequests.delete(key)
      }
    }
  }

  await next()
}
