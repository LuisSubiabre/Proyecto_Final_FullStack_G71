import bcrypt from "bcryptjs";
import registerModel from "../models/register.model.js";

const register = async (req, res) => {
  try {
    const { username, rut, birth_date, email, phone, password } = req.body;
    if (!username || !rut || !birth_date || !email || !phone || !password) {
      return res.status(400).send("Faltan campos por llenar");
    }

    const newUser = {
      username,
      rut,
      birth_date,
      email,
      phone,
      password: bcrypt.hashSync(password, 10),
      role: "user",
      status: true,
    };

    await registerModel.register(newUser);

    return res.status(200).send("Usuario creado correctamente");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el body: " + error);
  }
};
const registerController = {
  register,
};
export default registerController;
