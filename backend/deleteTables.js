// backend/deleteTables.js
import { pool } from "./db/index.js";

async function deleteTables() {
  try {
    // Drop session table first (because users may reference it later)
    await pool.query(`DROP TABLE IF EXISTS "session_data";`);
    
    // Drop users table
    await pool.query(`DROP TABLE IF EXISTS users;`);

    console.log("Tables deleted successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error deleting tables:", err);
    process.exit(1);
  }
}

deleteTables();
