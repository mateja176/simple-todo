import { zValidator } from "@hono/zod-validator";
import { loginSchema, signupSchema } from "@repo/validation";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { db } from "../db/index.js";
import { refreshTokens, users } from "../db/schema/index.js";
import { generateTokens, hashPassword, verifyPassword } from "../lib/auth.js";
import { loginRateLimiter } from "../middleware/rate-limit.js";

const auth = new Hono();

auth.post("/signup", zValidator("json", signupSchema), async (c) => {
  const { email, password } = c.req.valid("json");

  // Check if user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return c.json({ error: "User already exists" }, 409);
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const now = Math.floor(Date.now() / 1000);
  const [user] = await db
    .insert(users)
    .values({
      email,
      passwordHash,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user.id);

  // Store refresh token
  await db.insert(refreshTokens).values({
    userId: user.id,
    token: refreshToken,
    expiresAt: now + 30 * 24 * 60 * 60, // 30 days
    createdAt: now,
  });

  // Set httpOnly cookie
  setCookie(c, "refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  return c.json(
    {
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
      accessToken,
    },
    201
  );
});

auth.post(
  "/login",
  loginRateLimiter,
  zValidator("json", loginSchema),
  async (c) => {
    const { email, password } = c.req.valid("json");

    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Store refresh token
    const now = Math.floor(Date.now() / 1000);
    await db.insert(refreshTokens).values({
      userId: user.id,
      token: refreshToken,
      expiresAt: now + 30 * 24 * 60 * 60, // 30 days
      createdAt: now,
    });

    // Set httpOnly cookie
    setCookie(c, "refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
      accessToken,
    });
  }
);

export default auth;
