import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  changeUserStatusController,
  deleteUserByIdController,
  updateProfileImageController
} from "../controllers/users.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/", authMiddleware, getAllUsersController);                         // Obtener todos los usuarios
router.get("/:id", authMiddleware, getUserByIdController);                      // Obtener un usuario específico por ID
router.put("/:id", authMiddleware, updateUserByIdController);                   // Actualizar datos de un usuario específico por ID
router.put("/status/:id", authMiddleware, changeUserStatusController);          // Cambiar el estado de un usuario específico por ID
router.put("/profile-image/:id", authMiddleware, updateProfileImageController); // Actualizar la imagen de perfil de un usuario por ID
router.delete("/:id", authMiddleware, deleteUserByIdController);                // Eliminar un usuario específico por ID

export default router;

