import "dotenv/config";
import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import subcategoryController from "../controllers/subcategory.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validateParametersCategory, validateParametersSubcategory } from "../middlewares/category.middleware.js";
import { handleValidationErrors } from "../helpers/validationsCategory.js";

const router = Router();

// ** Subcategorías **
router.get("/subcategory", subcategoryController.getAllSubcategories); // Obtener todas las subcategorías
router.get("/subcategory/:id", subcategoryController.getSubcategory); // Obtener una subcategoría por ID
router.get("/subcategory/:id/category", subcategoryController.getSubcategoryWithCategoryInfo); // Obtener la subcategoría con información de su categoría
router.post("/subcategory", authMiddleware, validateParametersSubcategory, handleValidationErrors, subcategoryController.createSubcategory); // Crear una nueva subcategoría
router.put("/subcategory/:id", authMiddleware, validateParametersSubcategory, handleValidationErrors, subcategoryController.updateSubcategoryById); // Actualizar una subcategoría por ID
router.delete("/subcategory/:id", authMiddleware, subcategoryController.deleteSubcategoryById); // Eliminar una subcategoría por ID

// ** Categorías **
router.get("/", categoryController.getAllCategories); // Obtener todas las categorías
router.get("/:id", categoryController.getCategory); // Obtener una categoría por ID
router.get("/:id/subcategory", categoryController.getCategoryWithSubcategoriesInfo); // Obtener una categoría con sus subcategorías
router.post("/", authMiddleware, validateParametersCategory, handleValidationErrors, categoryController.createCategory); // Crear una nueva categoría
router.put("/:id", authMiddleware, validateParametersCategory, handleValidationErrors, categoryController.updateCategoryById); // Actualizar una categoría por ID
router.delete("/:id", authMiddleware, categoryController.deleteCategoryById); // Eliminar una categoría por ID

export default router;


