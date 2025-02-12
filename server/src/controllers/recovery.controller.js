import Recovery from "../models/recovery.model.js";
import nodemailer from "nodemailer";
import "dotenv/config";

// Cargar las variables de entorno
//dotenv.config();

console.log("Correo: ", process.env.EMAIL_USER);
console.log("Contraseña: ", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const recoverPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "El correo es obligatorio" });
  }

  try {
    const user = await Recovery.findByEmail(email);
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "El correo no está registrado" });
    }

    // Generar nueva contraseña
    const newPassword = Math.random().toString(36).slice(-8);

    // Actualizar la contraseña en la base de datos
    await Recovery.updatePassword(email, newPassword);

    // Enviar correo con la nueva clave
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperación de contraseña",
      text: `Has solicitado una nueva contraseña, \ntu nueva contraseña es: ${newPassword}\n\nSaludos cordiales,\npapeleriaalasdealondra`,
    });

    res.json({ message: "Correo enviado con éxito y clave actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

