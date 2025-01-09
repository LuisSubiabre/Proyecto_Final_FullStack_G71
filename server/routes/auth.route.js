import "dotenv/config";
import { Router } from "express";
import authController from "../controllers/auth.controller.js";
const router = Router();

router.post("/", authController.login);
//router.post("/verify", authController.verifyToken);

export default router;
