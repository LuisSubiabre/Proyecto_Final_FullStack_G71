import { validationResult } from "express-validator";
import { validateReview } from "../helpers/validations.js";

export const handleValidationErrors = [
  ...validateReview, // Ejecutar validaciones directamente
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
