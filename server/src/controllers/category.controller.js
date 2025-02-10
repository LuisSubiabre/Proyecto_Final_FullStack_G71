import {
    getCategories,
    getCategoryById,
    getCategoryWithSubcategories,
    createNewCategory,
    updateCategory,
    deleteCategory
} from "../models/category.model.js";

// Respuestas estándar para el cliente
const createResponse = (res, data, message, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

// Obtener todas las categorías
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await getCategories();
        createResponse(res, categories, "Categorías obtenidas correctamente");
    } catch (error) {
        next(error);
    }
};

// Obtener una categoría por ID
const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                error: "Categoría no encontrada",
            });
        }
        createResponse(res, category, "Categoría obtenida correctamente");
    } catch (error) {
        next(error);
    }
};

// Obtener una categoría con sus subcategorías
const getCategoryWithSubcategoriesInfo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await getCategoryWithSubcategories(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                error: "Categoría no encontrada",
            });
        }
        createResponse(res, category, "Categoría con subcategorías obtenida correctamente");
    } catch (error) {
        next(error);
    }
};

// Crear una nueva categoría
const createCategory = async (req, res, next) => {
    try {
        const { name_categories } = req.body;
        const newCategory = await createNewCategory(name_categories);
        createResponse(res, newCategory, "Categoría creada correctamente", 201);
    } catch (error) {
        next(error);
    }
};

// Actualizar una categoría
const updateCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name_categories } = req.body;
        const updatedCategory = await updateCategory(id, name_categories);
        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                error: "Categoría no encontrada para actualizar",
            });
        }
        createResponse(res, updatedCategory, "Categoría actualizada correctamente");
    } catch (error) {
        next(error);
    }
};

// Eliminar una categoría
const deleteCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await deleteCategory(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: "Categoría no encontrada para eliminar",
            });
        }
        createResponse(res, null, "Categoría eliminada correctamente", 200);
    } catch (error) {
        next(error);
    }
};

const categoryController = {
    getAllCategories,
    getCategory,
    getCategoryWithSubcategoriesInfo,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
};

export default categoryController;

