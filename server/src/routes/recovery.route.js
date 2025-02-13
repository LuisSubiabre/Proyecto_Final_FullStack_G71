import { Router } from "express";
import { recoverPassword } from "../controllers/recovery.controller.js";

const router = Router();

router.post("/", recoverPassword);

export default router;


