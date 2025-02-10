import {
    getSubcategories,
    getSubcategoryById,
    getSubcategoryWithCategory,
    createNewSubcategory,
    updateSubcategory,
    deleteSubcategory
} from "../models/subcategory.model.js";


// Respuestas estándar para el cliente
const createResponse = (res, data, message, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

// Definir las funciones del controlador
const getAllSubcategories = async (req, res, next) => {
    try {
        const subcategories = await getSubcategories();
        createResponse(res, subcategories, "Subcategorías obtenidas correctamente");
    } catch (error) {
        next(error);
    }
};

const getSubcategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const subcategory = await getSubcategoryById(id);
        if (!subcategory) {
            return res.status(404).json({
                success: false,
                error: "Subcategoría no encontrada",
            });
        }
        createResponse(res, subcategory, "Subcategoría obtenida correctamente");
    } catch (error) {
        next(error);
    }
};

const getSubcategoryWithCategoryInfo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const subcategory = await getSubcategoryWithCategory(id);
        if (!subcategory) {
            return res.status(404).json({
                success: false,
                error: "Subcategoría no encontrada",
            });
        }
        createResponse(res, subcategory, "Subcategoría con categoría principal obtenida correctamente");
    } catch (error) {
        next(error);
    }
};

const createSubcategory = async (req, res, next) => {
    try {
        const { name_subcategories, category_id } = req.body;
        if (!name_subcategories || !category_id) {
            const error = new Error("Los campos 'name_subcategories' y 'category_id' son obligatorios.");
            error.status = 400;
            throw error;
        }
        const newSubcategory = await createNewSubcategory(name_subcategories, category_id);
        createResponse(res, newSubcategory, "Subcategoría creada correctamente", 201);
    } catch (error) {
        next(error);
    }
};

const updateSubcategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name_subcategories, category_id } = req.body;
        if (!name_subcategories || !category_id) {
            const error = new Error("Los campos 'name_subcategories' y 'category_id' son obligatorios.");
            error.status = 400;
            throw error;
        }
        const updatedSubcategory = await updateSubcategory(id, name_subcategories, category_id);
        if (!updatedSubcategory) {
            const error = new Error("Subcategoría no encontrada para actualizar.");
            error.status = 404;
            throw error;
        }
        createResponse(res, updatedSubcategory, "Subcategoría actualizada correctamente");
    } catch (error) {
        next(error);
    }
};

const deleteSubcategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedSubcategory = await deleteSubcategory(id);
        if (!deletedSubcategory) {
            return res.status(404).json({
                success: false,
                error: "Subcategoría no encontrada para eliminar",
            });
        }
        createResponse(res, deletedSubcategory, "Subcategoría eliminada correctamente");
    } catch (error) {
        next(error);
    }
};

const subcategoryController = {
    getAllSubcategories,
    getSubcategory,
    getSubcategoryWithCategoryInfo,
    createSubcategory,
    updateSubcategoryById,
    deleteSubcategoryById,
};

export default subcategoryController;

