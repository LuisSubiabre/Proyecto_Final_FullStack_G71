import { body, validationResult } from "express-validator";

/* valida que los campos del formulario de registro no estén vacíos o en con datos incorrectos */
export const validateRegister = [
  body("username").notEmpty().withMessage("El nombre de usuario es requerido"),
  body("rut").notEmpty().withMessage("El RUT es requerido"),
  body("birth_date")
    .notEmpty()
    .withMessage("La fecha de nacimiento es requerida"),
  body("email").isEmail().withMessage("El email debe ser válido"),
  body("phone").notEmpty().withMessage("El teléfono es requerido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

/* valida que los campos del formulario de login no estén vacíos o en con datos incorrectos */
export const validateLogin = [
  body("email").isEmail().withMessage("El email debe ser válido"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
];

// Validaciones para la creación de un producto (propuesta)
export const validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto es requerido")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede tener más de 100 caracteres"),

  body("description")
    .optional() // La descripción es opcional
    .isLength({ max: 500 })
    .withMessage("La descripción no puede tener más de 500 caracteres"),

  body("price")
    .notEmpty()
    .withMessage("El precio es requerido")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número válido y mayor o igual a 0"),

  body("stock")
    .notEmpty()
    .withMessage("El stock es requerido")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero y mayor o igual a 0"),

  body("user_id")
    .notEmpty()
    .withMessage("El ID del usuario es requerido")
    .isInt()
    .withMessage("El ID del usuario debe ser un número entero"),

  body("category_id")
    .notEmpty()
    .withMessage("El ID de la categoría es requerido")
    .isInt()
    .withMessage("El ID de la categoría debe ser un número entero"),
];

/* maneja los errores de validación */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
