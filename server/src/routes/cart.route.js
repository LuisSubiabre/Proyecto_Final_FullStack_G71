import "dotenv/config";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Obtiene todos los carritos disponibles (para admin)
router.get("/", (req, res) => {
  res.send("Obteniendo todos los carritos disponibles");
});

// Obtiene los detalles de un carrito de compras específico por id_user
router.get("/:id_user", (req, res) => {
  const { id_user } = req.params;
  res.send(
    `Obteniendo detalles del carrito para el usuario con id: ${id_user}`
  );
});

// Obtiene todas las compras previas realizadas por un usuario específico
router.get("/all/:id_user", (req, res) => {
  const { userId } = req.params;
  res.send(
    `Obteniendo todas las compras previas del usuario con id: ${userId}`
  );
});

// Crea un nuevo carrito para un usuario autenticado
router.post("/", authMiddleware, (req, res) => {
  res.send("Creando un nuevo carrito para el usuario autenticado");
});

// Incrementa la cantidad de un producto específico en el carrito actual del usuario
router.put("/increase/:product_id", (req, res) => {
  const { product_id } = req.params;
  res.send(
    `Incrementando la cantidad del producto con id: ${product_id} en el carrito`
  );
});

// Disminuye la cantidad de un producto específico en el carrito actual del usuario
router.put("/decrease/:product_id", (req, res) => {
  const { product_id } = req.params;
  res.send(
    `Disminuyendo la cantidad del producto con id: ${product_id} en el carrito`
  );
});

// Cierra o vacía el carrito actual del usuario identificado por id_user
router.delete("/closeCart/:id_user", (req, res) => {
  const { id_user } = req.params;
  res.send(`Cerrando o vaciando el carrito del usuario con id: ${id_user}`);
});

export default router;
