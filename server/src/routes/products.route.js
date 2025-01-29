import "dotenv/config";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  validateProduct,
  handleValidationErrors,
} from "../helpers/validations.js";

const router = Router();

// Obtiene todos los productos disponibles (con paginación y filtros)
router.get("/products", (req, res) => {
  res.send("Obteniendo todos los productos disponibles");
});

// Obtiene un listado completo de todos los productos sin paginación ni filtros
router.get("/products/all", (req, res) => {
  res.send("Obteniendo listado completo de todos los productos");
});

// Obtiene los detalles de un producto específico por su id
router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo detalles del producto con id: ${id}`);
});

// Obtiene productos por categoría (id de categoría)
router.get("/category/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo productos de la categoría con id: ${id}`);
});

// Obtiene todos los productos subidos por un usuario específico (id)
router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo productos subidos por el usuario con id: ${id}`);
});

// Permite crear un nuevo producto, incluyendo la subida de una imagen
router.post(
  "/",
  authMiddleware,
  validateProduct, // Aplica las validaciones
  handleValidationErrors, // Maneja los errores de validación
  (req, res) => {
    // Si las validaciones pasan, se ejecuta esta lógica
    res.send("Creando un nuevo producto con imagen");
  }
);

// Busca productos por descripción o palabras clave
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(
    `Buscando productos con palabras clave o descripción relacionada al id: ${id}`
  );
});

// Permite actualizar los datos de un producto específico por su id, incluyendo una imagen nueva si es necesario
router.post("/description", (req, res) => {
  res.send(
    "Actualizando los datos de un producto, incluyendo imagen si es necesario"
  );
});

// Cambia el estado de un producto a "disponible" o "no disponible"
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Cambiando el estado del producto con id: ${id}`);
});

// Elimina un producto específico por su id
router.put("/status/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Eliminando el producto con id: ${id}`);
});

export default router;
