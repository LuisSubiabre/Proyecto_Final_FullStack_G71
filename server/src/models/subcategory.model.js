import { pool } from "../../database/index.js";

// Obtener todas las subcategorías
export const getSubcategories = async () => {
    try {
        const result = await pool.query("SELECT * FROM subcategories");
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// Obtener subcategoría por ID
export const getSubcategoryById = async (subcategoryId) => {
    try {
        const result = await pool.query("SELECT * FROM subcategories WHERE subcategory_id = $1", [subcategoryId]);
        if (!result.rowCount) throw new Error("Subcategoría no encontrada");
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Obtener subcategoría con información de la categoría principal
export const getSubcategoryWithCategory = async (subcategoryId) => {
    try {
        const result = await pool.query(`
            SELECT s.subcategory_id, s.name_subcategories, c.category_id, c.name_categories
            FROM subcategories s
            INNER JOIN categories c ON s.category_id = c.category_id
            WHERE s.subcategory_id = $1
        `, [subcategoryId]);

        if (!result.rowCount) throw new Error("Subcategoría no encontrada");
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Crear una nueva subcategoría
export const createNewSubcategory = async (name_subcategories, category_id) => {
    const query = `
        INSERT INTO subcategories (name_subcategories, category_id)
        VALUES ($1, $2) RETURNING *;
    `;
    const values = [name_subcategories, category_id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};


// Actualizar una subcategoría
export const updateSubcategory = async (subcategory_id, name_subcategories, category_id) => {
    const query = `
        UPDATE subcategories
        SET name_subcategories = $1, category_id = $2
        WHERE subcategory_id = $3
        RETURNING *;
    `;
    const values = [name_subcategories, category_id, subcategory_id];

    try {
        const result = await pool.query(query, values);
        if (!result.rowCount) return null;
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};


// Eliminar una subcategoría
export const deleteSubcategory = async (subcategory_id) => {
    const query = "DELETE FROM subcategories WHERE subcategory_id = $1 RETURNING *";
    const values = [subcategory_id];
    try {
        const result = await pool.query(query, values);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};

