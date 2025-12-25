import pg from "pg";

//import dotenv from "dotenv";

//dotenv.config();

const env = process.env.NODE_ENV || 'development';
if (env !== 'production') {
  await import('dotenv/config')
}

const { Pool } = pg;

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

const connectionString = process.env.DATABASE_URL || `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}` ;

// Create pool
export const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL pool error:", err);
  process.exit(1);
});
