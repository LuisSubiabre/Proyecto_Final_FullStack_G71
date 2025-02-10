import "dotenv/config";
import { Router } from "express";
import productController from "../controllers/products.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { handleValidationErrors } from "../middlewares/products.middleware.js";

const router = Router();

// ** Rutas Públicas **
router.get("/search", productController.searchProductsByDescription);              // Buscar productos por descripción
router.get("/", productController.getAllProductsController);                       // Obtener todos los productos
router.get("/:id", productController.getProductById);                              // Obtener un producto por ID
router.get("/category/:categoryId", productController.getProductsByCategory);      // Obtener productos por categoría
router.get("/subcategory/:subcategoryId", productController.getProductsBySubcategory);


// ** Rutas Privadas (requieren autenticación) **
router.get("/user/:id", authMiddleware, productController.getProductsByUser);                     // Obtener productos de un usuario específico
router.post("/", authMiddleware, handleValidationErrors, productController.createProduct);        // Crear un nuevo producto
router.put("/:id", authMiddleware, handleValidationErrors, productController.updateProductById);  // Actualizar un producto por ID
router.delete("/:id", authMiddleware, productController.deleteProductById);                       // Eliminar un producto por ID
router.patch("/:id/status", authMiddleware, productController.changeProductStatus);               // Cambiar el estado de un producto

export default router;

