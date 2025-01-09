import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  allowExitOnIdle: true,
});

try {
  await pool.query("SELECT NOW()");
  console.log("Database connected");
} catch (error) {
  console.log(error);
}
