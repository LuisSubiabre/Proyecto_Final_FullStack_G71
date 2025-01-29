import "dotenv/config";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Obtiene un listado de todos los usuarios registrados
router.get("/", (req, res) => {
  res.send("Obteniendo listado de todos los usuarios registrados");
});

// Obtiene la información de un usuario específico por su id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo información del usuario con id: ${id}`);
});

// Crea un nuevo usuario con los datos proporcionados
router.post("/", (req, res) => {
  res.send("Creando un nuevo usuario con los datos proporcionados");
});

// Actualiza los datos de un usuario específico por su id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando los datos del usuario con id: ${id}`);
});

// Cambia el estado de un usuario (por ejemplo, "activo" o "inactivo")
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Cambiando el estado del usuario con id: ${id}`);
});

// Elimina un usuario específico por su id
router.put("/status/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Eliminando el usuario con id: ${id}`);
});

export default router;
