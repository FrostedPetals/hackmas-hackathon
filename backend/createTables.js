import { pool } from "./db/index.js";

async function createTables() {
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
    
    // Optionally: session table for connect-pg-simple
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "session_data" (
  "sid" varchar NOT NULL COLLATE "default" PRIMARY KEY,
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);

    `);

    await pool.query(`CREATE TABLE IF NOT EXISTS "calendar_events" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL
    REFERENCES users(id) ON DELETE CASCADE,

  title TEXT NOT NULL,
  description TEXT,

  event_date DATE NOT NULL,

  created_at TIMESTAMP DEFAULT NOW()
);
`)

    console.log("Tables created successfully");
    process.exit(0); 
  } catch (err) {
    console.error("Error creating tables:", err);
    process.exit(1);
  }
}

createTables();
