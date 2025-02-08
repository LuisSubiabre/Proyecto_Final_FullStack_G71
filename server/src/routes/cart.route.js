import { Router } from "express";
import {
  getCartsController,
  getCartsByUserController,
  getAllCartsByUserController,
  addCartItemController,
  updateCartIncreaseController,
  updateCartDecreaseController,
  closeCartController,
  getCarritoGuardado,
  addCartUserController,
  getDetailCarrito,
} from "../controllers/cart.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Rutas privadas (requieren autenticación)
router.get("/", authMiddleware, getCartsController); // Obtener todos los carritos
router.get("/user/:user_id", authMiddleware, getCartsByUserController); // Obtener carritos guardados por usuario
router.get("/all/:user_id", authMiddleware, getAllCartsByUserController); // Obtener todos los carritos completos por usuario
router.post("/items", authMiddleware, addCartItemController); // Añadir un ítem al carrito (crear carrito si no existe)
router.put("/items/increment", authMiddleware, updateCartIncreaseController); // Incrementar cantidad de un ítem
router.put("/items/decrement", authMiddleware, updateCartDecreaseController); // Decrementar cantidad de un ítem
router.put("/close/:user_id", authMiddleware, closeCartController); // Cerrar un carrito del usuario

router.get("/detail/:cart_id", authMiddleware, getDetailCarrito); // Crear un carrito
router.get("/getCarrito/:user_id", authMiddleware, getCarritoGuardado); // Obtener carrito por usuario
router.post("/addCart", authMiddleware, addCartUserController); // Crear un carrito

export default router;
