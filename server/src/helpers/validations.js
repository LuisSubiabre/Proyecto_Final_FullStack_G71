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
  body("role").notEmpty().withMessage("El rol es requerido"),
  body("url_img_profile")
    .optional()
    .isURL()
    .withMessage("La URL de la imagen de perfil no es válida"),
];

/* valida que los campos del formulario de login no estén vacíos o en con datos incorrectos */
export const validateLogin = [
  body("email").isEmail().withMessage("El email debe ser válido"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
];

// Validaciones para la creación de un producto (propuesta)
export const validateProduct = [
  body("name_product")
    .notEmpty()
    .withMessage("El nombre del producto es requerido")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede tener más de 100 caracteres"),

  body("description")
    .notEmpty()
    .withMessage("La descripción del producto es requerida")
    .isLength({ max: 500 })
    .withMessage("La descripción no puede tener más de 500 caracteres"),

  body("brand").notEmpty().withMessage("La marca es requerida"),

  body("price")
    .notEmpty()
    .withMessage("El precio es requerido")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número válido y mayor o igual a 0"),

  body("quantity")
    .notEmpty()
    .withMessage("El stock es requerido")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero y mayor o igual a 0"),

  body("category_id")
    .notEmpty()
    .withMessage("El ID de la categoría es requerido")
    .isInt()
    .withMessage("El ID de la categoría debe ser un número entero"),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("El estado del producto debe ser un valor booleano"),

  body("user_id")
    .notEmpty()
    .withMessage("El ID del usuario es requerido")
    .isInt()
    .withMessage("El ID del usuario debe ser un número entero"),

  body("image_url")
    .notEmpty()
    .withMessage("La URL de la imagen es requerida")
    .isURL()
    .withMessage("La URL de la imagen no es válida"),

  body("subcategory_id")
    .notEmpty()
    .withMessage("El ID de la subcategoría es requerido")
    .isInt()
    .withMessage("El ID de la subcategoría debe ser un número entero"),
];

// Validaciones para la creacion de un review
export const validateReview = [
  body("product_id")
    .notEmpty()
    .withMessage("El ID del producto es requerido")
    .isInt()
    .withMessage("El ID del producto debe ser un número entero"),
  body("user_id")
    .notEmpty()
    .withMessage("El ID del usuario es requerido")
    .isInt()
    .withMessage("El ID del usuario debe ser un número entero"),
  body("rating")
    .notEmpty()
    .withMessage("La calificación es requerida")
    .isInt({ min: 1, max: 5 })
    .withMessage("La calificación debe ser un número entero entre 1 y 5"),
  body("comment")
    .optional()
    .isString()
    .withMessage("El comentario debe ser un texto"),
];

/* maneja los errores de validación */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
