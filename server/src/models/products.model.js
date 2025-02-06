import { pool } from "../../database/index.js";
import format from "pg-format";

// Obtener todos los productos
export const getAllProducts = async () => {
    const query = "SELECT * FROM products";
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// Obtener un producto por ID
export const getProductsId = async (product_id) => {
    const query = format("SELECT * FROM products WHERE product_id = %s", product_id);
    try {
        const result = await pool.query(query);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};

// Obtener productos por ID de categoría
export const getProductsCategoryId = async (category_id) => {
    const query = format("SELECT * FROM products WHERE category_id = %s", category_id);
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// Obtener productos por ID de usuario
export const getProductsByUsers = async (user_id) => {
    const query = "SELECT * FROM products WHERE user_id = $1";
    try {
        const result = await pool.query(query, [user_id]);
        return result.rows;
    } catch (error) {
        console.error("Error en la consulta SQL:", error);
        throw error;
    }
};

// Buscar productos por descripción
export const getProductsByDescription = async (description) => {
    const query = "SELECT * FROM products WHERE description ILIKE $1";
    console.log("Ejecutando consulta:", query, "con parámetro:", `%${description}%`);

    try {
        const result = await pool.query(query, [`%${description}%`]);
        return result.rows;
    } catch (error) {
        console.error("Error en la consulta SQL:", error);
        throw error;
    }
};


// Crear un nuevo producto (status definido desde el controlador)
export const createNewProduct = async (productData) => {
    const {
        name_product,
        description,
        brand,
        price,
        quantity,
        category_id,
        status,
        user_id,
        image_url,
        subcategory_id
    } = productData;

    const query = format(`
        INSERT INTO products (
            name_product, description, brand, price, quantity,
            category_id, status, user_id, image_url, subcategory_id
        ) VALUES (%L, %L, %L, %s, %s, %s, %L, %s, %L, %s)
        RETURNING *
    `, name_product, description, brand, price, quantity, category_id, status, user_id, image_url, subcategory_id);

    try {
        const result = await pool.query(query);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};


// Actualizar un producto
export const updateProducts = async (product_id, productData) => {
    const {
        name_product,
        description,
        brand,
        price,
        quantity,
        category_id,
        status,
        user_id,
        image_url,
        subcategory_id
    } = productData;

    const query = format(`
        UPDATE products SET
            name_product = %L,
            description = %L,
            brand = %L,
            price = %s,
            quantity = %s,
            category_id = %s,
            status = %L,
            user_id = %s,
            image_url = %L,
            subcategory_id = %s
        WHERE product_id = %s
        RETURNING *
    `, name_product, description, brand, price, quantity, category_id, status, user_id, image_url, subcategory_id, product_id);

    try {
        const result = await pool.query(query);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};


// Eliminar un producto
export const deleteProducts = async (product_id) => {
    const query = format("DELETE FROM products WHERE product_id = %s RETURNING *", product_id);
    try {
        const result = await pool.query(query);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};

// Cambiar el estado de un producto
export const statusProducts = async (product_id, status) => {
    const query = format("UPDATE products SET status = %L WHERE product_id = %s RETURNING *", status, product_id);
    try {
        const result = await pool.query(query);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};

export const getProductsBySubcategoryId = async (subcategory_id) => {
    const query = "SELECT * FROM products WHERE subcategory_id = $1";
    try {
        const result = await pool.query(query, [subcategory_id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};