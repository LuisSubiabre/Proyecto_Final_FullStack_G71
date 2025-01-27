import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

try {
  const res = await pool.query("SELECT NOW()");
  console.log("Database connected:", res.rows[0]);
} catch (error) {
  console.error("Database connection error:", error);
}
