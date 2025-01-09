import bcrypt from "bcryptjs";
import registerModel from "../models/register.model.js";

const register = async (req, res) => {
  try {
    const { email, password, rut } = req.body;
    if (!email || !password || !rut) {
      return res.status(400).send("Faltan campos");
    }

    const newUser = {
      email,
      password: bcrypt.hashSync(password, 10),
      rut,
      username: email,
      birth_date: new Date(),
      phone: 0,
      role: "user",
      status: "1",
    };
    await registerModel.register(newUser);

    return res.status(200).send("Usuario creado");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el body: " + error);
  }
};
const registerController = {
  register,
};
export default registerController;
