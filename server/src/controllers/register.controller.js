import bcrypt from "bcryptjs";
import registerModel from "../models/register.model.js";
import { handleError } from "../helpers/errorHandler.js";
import {
  validateRegister,
  handleValidationErrors,
} from "../helpers/validations.js";

const register = async (req, res) => {
  try {
    // Validar los campos del registro
    validateRegister(req, res, () => {
      handleValidationErrors(req, res, async () => {
        const { username, rut, birth_date, email, phone, password } = req.body;

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
      });
    });
  } catch (error) {
    handleError(error, res);
  }
};

const registerController = {
  register,
};

export default registerController;
