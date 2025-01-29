import "dotenv/config";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Obtiene un listado de todos los favoritos
router.get("/", (req, res) => {
  res.send("Obteniendo listado de todos los favoritos");
});

// Obtiene los detalles de un favorito específico por su id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo detalles del favorito con id: ${id}`);
});

// Obtiene todos los productos marcados como favoritos por un usuario específico
router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo todos los favoritos del usuario con id: ${id}`);
});

// Permite que un usuario autenticado marque un producto o ítem como favorito
router.post("/", (req, res) => {
  res.send(
    "Agregando un producto a la lista de favoritos del usuario autenticado"
  );
});

// Actualiza los datos de un favorito específico por su id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando los datos del favorito con id: ${id}`);
});

// Elimina un producto o ítem de la lista de favoritos del usuario
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Eliminando el producto con id: ${id} de la lista de favoritos`);
});

export default router;
