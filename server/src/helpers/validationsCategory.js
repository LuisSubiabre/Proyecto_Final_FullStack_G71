import { body, validationResult } from "express-validator";

// Validaciones para la creación de una categoría
export const validateCategory = [
    body("name_categories")
        .notEmpty()
        .withMessage("El nombre de la categoría es requerido")
        .matches(/^[a-zA-Z\u00C0-\u017F\s]+$/)
        .withMessage("El nombre de la categoría solo puede contener letras y espacios")
        .isLength({ max: 100 })
        .withMessage("El nombre de la categoría no puede tener más de 100 caracteres"),
];

// Validaciones para la creación de una subcategoría
export const validateSubcategory = [
    body("name_subcategories")
        .notEmpty()
        .withMessage("El nombre de la subcategoría es requerido")
        .matches(/^[a-zA-Z\u00C0-\u017F\s]+$/)
        .withMessage("El nombre de la subcategoría solo puede contener letras y espacios")
        .isLength({ max: 100 })
        .withMessage("El nombre de la subcategoría no puede tener más de 100 caracteres"),

    body("category_id")
        .notEmpty()
        .withMessage("El ID de la categoría es requerido")
        .isInt()
        .withMessage("El ID de la categoría debe ser un número entero"),
];

// Maneja los errores de validación
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
