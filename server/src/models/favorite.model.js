import { pool } from "../../database/index.js";

export const getFavorites = async () => {
    const SQLquery = {
        text: `
            SELECT f.favorites_id, f.product_id, f.user_id, p.name_product AS product_name, p.price, u.username
            FROM favorites f
            INNER JOIN products p ON f.product_id = p.product_id
            INNER JOIN users u ON f.user_id = u.user_id
        `,
    };
    const response = await pool.query(SQLquery);
    return response.rows;
};

export const getFavoriteById = async ({ id }) => {
    const SQLquery = {
        text: `
            SELECT f.favorites_id, f.product_id, f.user_id, p.name_product AS product_name, p.price, u.username
            FROM favorites f
            INNER JOIN products p ON f.product_id = p.product_id
            INNER JOIN users u ON f.user_id = u.user_id
            WHERE f.favorites_id = $1
        `,
        values: [id],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
};


export const getFavoritesByUser = async ({ id }) => {
    const SQLquery = {
        text: `
            SELECT f.favorites_id, f.product_id, p.name_product AS product_name, p.price, p.image_url, u.username
            FROM favorites f
            INNER JOIN products p ON f.product_id = p.product_id
            INNER JOIN users u ON f.user_id = u.user_id
            WHERE f.user_id = $1
        `,
        values: [id],
    };
    const response = await pool.query(SQLquery);
    return response.rows;
};

export const createFavorite = async ({ product, user }) => {
    const SQLquery = {
        text: `INSERT INTO favorites (product_id, user_id) VALUES ($1, $2) RETURNING *`,
        values: [product, user],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
};

export const updateFavorite = async ({ id }, { product }) => {
    const SQLquery = {
        text: `UPDATE favorites SET product_id = $1 WHERE favorites_id = $2 RETURNING *`,
        values: [product, id],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
};

export const deleteFavorite = async ({ id }) => {
    const SQLquery = {
        text: `DELETE FROM favorites WHERE favorites_id = $1 RETURNING *`,
        values: [id],
    };
    const response = await pool.query(SQLquery);
    return response.rowCount;
};
