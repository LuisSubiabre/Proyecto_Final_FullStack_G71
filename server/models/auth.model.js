import { pool } from "../database/connection.js";
import format from "pg-format";

const validateUser = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const { rows, rowCount } = await pool.query(query, [email]);
  if (!rowCount) {
    throw new Error("Usuario o clave no encontrados.");
  }

  return rows[0]; // Retorna el primer usuario encontrado
};

const authModel = {
  validateUser,
};
export default authModel;
