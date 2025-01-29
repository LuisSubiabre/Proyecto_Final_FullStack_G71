import "dotenv/config";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Obtiene todas las categorías disponibles
router.get("/category", (req, res) => {
  res.send("Obteniendo todas las categorías disponibles");
});

// Obtiene los detalles de una categoría específica por su id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo detalles de la categoría con id: ${id}`);
});

// Crea una nueva categoría
router.post("/", (req, res) => {
  res.send("Creando una nueva categoría");
});

// Actualiza los datos de una categoría específica por su id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando los datos de la categoría con id: ${id}`);
});

// Elimina una categoría específica por su id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Eliminando la categoría con id: ${id}`);
});

export default router;
