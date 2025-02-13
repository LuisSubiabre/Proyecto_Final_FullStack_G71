import { pool } from "../../database/index.js";
import format from "pg-format";
import bcrypt from "bcrypt";

const Recovery = {
  findByEmail: async (email) => {
    const query = format("SELECT * FROM users WHERE email = %L", email);
    const { rows } = await pool.query(query);
    return rows.length > 0 ? rows[0] : null;
  },

  updatePassword: async (email, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = format(
      "UPDATE users SET password = %L WHERE email = %L",
      hashedPassword,
      email
    );
    await pool.query(query);
  },
};

export default Recovery;


