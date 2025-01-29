import "dotenv/config";
import { Router } from "express";
import registerController from "../controllers/register.controller.js";
import {
  validateRegister,
  handleValidationErrors,
} from "../helpers/validations.js";
const router = Router();

router.post(
  "/",
  validateRegister,
  handleValidationErrors,
  registerController.register
);

export default router;
