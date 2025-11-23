/* eslint-disable no-console */
import { randomUUID } from "crypto";
import { db } from "./index.js";
import { tasks, users } from "./schema/index.js";

async function seed() {
  console.log("Seeding database...");

  try {
    // Create a test user
    const userId = randomUUID();
    await db.insert(users).values({
      id: userId,
      email: "test@example.com",
      passwordHash: "hashed_password",
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    });

    console.log("User created:", userId);

    // Create some tasks
    await db.insert(tasks).values([
      {
        userId,
        text: "Buy groceries",
        isCompleted: false,
        createdAt: Math.floor(Date.now() / 1000),
        updatedAt: Math.floor(Date.now() / 1000),
      },
      {
        userId,
        text: "Walk the dog",
        isCompleted: true,
        completedAt: Math.floor(Date.now() / 1000),
        createdAt: Math.floor(Date.now() / 1000),
        updatedAt: Math.floor(Date.now() / 1000),
      },
    ]);

    console.log("Tasks created");
    console.log("Seeding complete!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    process.exit(0);
  }
}

seed();
