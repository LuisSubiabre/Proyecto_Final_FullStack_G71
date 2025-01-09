import bcrypt from "bcryptjs";
import authModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";

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
      id: data.id,
      nombre: data.nombre,
      email: data.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      message: "Usuario logeado",
      usuario: data.email,
      token,
    });
  } catch (error) {
    return res.status(500).send("Error en el body: " + error);
  }
};

const authController = {
  login,
};
export default authController;
