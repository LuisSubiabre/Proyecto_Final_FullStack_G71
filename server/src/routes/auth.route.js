import "dotenv/config";
import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import {
  validateLogin,
  handleValidationErrors,
} from "../helpers/validations.js";

const router = Router();

router.post("/", validateLogin, handleValidationErrors, authController.login);

export default router;
