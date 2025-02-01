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
import { handleValidationErrors } from "../middlewares/users.middleware.js";

const router = Router();

// Rutas privadas (requieren autenticación)
router.get("/", authMiddleware, getAllUsersController);
router.get("/:id", authMiddleware, getUserByIdController);
router.put("/:id", authMiddleware, handleValidationErrors, updateUserByIdController);
router.put("/status/:id", authMiddleware, changeUserStatusController);
router.put("/profile-image/:id", authMiddleware, updateProfileImageController);
router.delete("/:id", authMiddleware, deleteUserByIdController);

export default router;

