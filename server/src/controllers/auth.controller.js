import bcrypt from "bcryptjs";
import authModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import { handleError } from "../helpers/errorHandler.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email y password son requeridos");
    }
    const data = await authModel.validateUser(email);
    const isMatch = bcrypt.compareSync(password, data.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }
    // Crear JWT con id, nombre y email
    const payload = {
      id: data.user_id,
      username: data.username,
      email: data.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      message: "Usuario logeado correctamente",
      email: data.email,
      user_id: data.user_id,
      token,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const authController = {
  login,
};
export default authController;
