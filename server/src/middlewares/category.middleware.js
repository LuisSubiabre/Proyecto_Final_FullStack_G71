import { validationResult } from "express-validator";
import { validateCategory, validateSubcategory } from "../helpers/validationsCategory.js";

// Middleware para validar parámetros de categoría
export const validateParametersCategory = (req, res, next) => {
    validateCategory.forEach((validation) => validation.run(req));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Middleware para validar parámetros de subcategoría
export const validateParametersSubcategory = (req, res, next) => {
    validateSubcategory.forEach((validation) => validation.run(req));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
