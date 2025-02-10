import { pool } from "../../database/index.js";
import format from "pg-format";

const validateUser = async (email) => {
  const query =
    "SELECT user_id, username, email, password FROM users WHERE email = $1";
  const { rows, rowCount } = await pool.query(query, [email]);
  if (!rowCount) {
    throw new Error("Usuario o clave no encontrados.");
  }

  return rows[0];
};

const authModel = {
  validateUser,
};

export default authModel;
