import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgres",
  schema: "./drizzle/schema.js",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.NEON_DB_URL,
  },
});