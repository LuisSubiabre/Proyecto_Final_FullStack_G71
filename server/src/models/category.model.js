import { pool } from "../../database/index.js";

// Obtener todas las categorías
export const getCategories = async () => {
    const query = "SELECT * FROM categories";
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// Obtener una categoría por ID
export const getCategoryById = async (category_id) => {
    const query = "SELECT * FROM categories WHERE category_id = $1";
    try {
        const result = await pool.query(query, [category_id]);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};

// Obtener una categoría con sus subcategorías
export const getCategoryWithSubcategories = async (category_id) => {
    const query = `
        SELECT c.category_id, c.name_categories, json_agg(
            json_build_object('subcategory_id', s.subcategory_id, 'name_subcategories', s.name_subcategories)
        ) AS subcategories
        FROM categories c
        LEFT JOIN subcategories s ON c.category_id = s.category_id
        WHERE c.category_id = $1
        GROUP BY c.category_id
    `;
    try {
        const result = await pool.query(query, [category_id]);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};

// Crear una nueva categoría
export const createNewCategory = async (name_categories) => {
    const query = "INSERT INTO categories (name_categories) VALUES ($1) RETURNING *";
    try {
        const result = await pool.query(query, [name_categories]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Actualizar una categoría
export const updateCategory = async (category_id, name_categories) => {
    const query = "UPDATE categories SET name_categories = $1 WHERE category_id = $2 RETURNING *";
    try {
        const result = await pool.query(query, [name_categories, category_id]);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};

// Eliminar una categoría
export const deleteCategory = async (category_id) => {
    const query = "DELETE FROM categories WHERE category_id = $1 RETURNING *";
    try {
        const result = await pool.query(query, [category_id]);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};
