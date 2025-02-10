import { Router } from "express";
import {
    getFavoritesController,
    getFavoriteByIdController,
    getFavoritesByUserController,
    createFavoriteController,
    updateFavoriteController,
    deleteFavoriteController,
} from "../controllers/favorite.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Rutas para favoritos
router.get("/", authMiddleware, getFavoritesController);                   // Obtener todos los favoritos
router.get("/:id", authMiddleware, getFavoriteByIdController);             // Obtener un favorito por ID
router.get("/user/:id", authMiddleware, getFavoritesByUserController);     // Obtener favoritos de un usuario
router.post("/", authMiddleware, createFavoriteController);                // Crear un favorito
router.put("/:id", authMiddleware, updateFavoriteController);              // Actualizar un favorito
router.delete("/:id", authMiddleware, deleteFavoriteController);           // Eliminar un favorito

export default router;
