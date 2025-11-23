import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index.ts";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:password@localhost:5432/simple_todo";
const client = postgres(connectionString, { max: 20 });
export const db = drizzle(client, { schema });
