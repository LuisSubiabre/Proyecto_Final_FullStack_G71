import bcrypt from "bcryptjs";
import registerModel from "../models/register.model.js";
import { handleError } from "../helpers/errorHandler.js";

const register = async (req, res) => {
  try {
    const {
      username,
      rut,
      birth_date,
      email,
      phone,
      password,
      role,
      status = true,
    } = req.body;

    const newUser = {
      username,
      rut,
      birth_date,
      email,
      phone,
      password: await bcrypt.hash(password, 10),
      role,
      status,
    };

    await registerModel.register(newUser);

    //return res.status(200).send("Usuario creado correctamente");
    return res.status(200).json({ message: 'Usuario creado', data: newUser });
  } catch (error) {
    handleError(error, req, res);
  }
};

const registerController = {
  register,
};

export default registerController;
