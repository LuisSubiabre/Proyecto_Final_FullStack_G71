import { pool } from "../../database/index.js";
import format from "pg-format";

const register = async (newUser) => {
  const query = format(
    "INSERT INTO users (username, rut, birth_date, email, phone, password, role, status) VALUES (%L) RETURNING *",
    [
      newUser.username,
      newUser.rut,
      newUser.birth_date,
      newUser.email,
      newUser.phone,
      newUser.password,
      newUser.role,
      newUser.status,
    ]
  );

  const { rows, rowCount } = await pool.query(query);
  if (rowCount === 0) {
    throw new Error("No se pudo registrar el usuario");
  }
  return rows[0];
};

const registerModel = {
  register,
};
export default registerModel;
