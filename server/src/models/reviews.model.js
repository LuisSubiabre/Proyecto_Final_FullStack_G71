import { pool } from "../../database/index.js";
import format from "pg-format";

// Obtener todos los reviews de un producto
export const getReviewProducBytId = async (product_id) => {
  const query = format(
    `SELECT 
        reviews.review_id,
        reviews.product_id,
        reviews.user_id,
        reviews.rating,
        reviews.comment,
        reviews.create_at,
        users.username
      FROM 
        reviews
      JOIN 
        users ON reviews.user_id = users.user_id
      WHERE 
        reviews.product_id = %s`,
    product_id
  );

  try {
    const result = await pool.query(query);
    return result.rowCount ? result.rows : null;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo reviews
export const createReview = async (product_id, user_id, rating, comment) => {
  const query = format(
    "INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (%L, %L, %L, %L) RETURNING *",
    product_id,
    user_id,
    rating,
    comment
  );
  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar una reseña solo si pertenece al usuario
export const updateReview = async (review_id, user_id, rating, comment) => {
  const query = format(
    "UPDATE reviews SET rating = %L, comment = %L WHERE review_id = %L AND user_id = %L RETURNING *",
    rating,
    comment,
    review_id,
    user_id
  );

  try {
    const result = await pool.query(query);
    if (result.rowCount === 0) {
      throw new Error(
        "Review no encontrado o no tienes permisos para actualizarlo"
      );
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Eliminar un reviews  solo si pertenece al usuario
export const deleteReview = async (review_id, user_id) => {
  const query = format(
    "DELETE FROM reviews WHERE review_id = %L AND user_id = %L RETURNING *",
    review_id,
    user_id
  );

  try {
    const result = await pool.query(query);
    if (result.rowCount === 0) {
      throw new Error(
        "Review no encontrado o no tienes permisos para eliminarlo"
      );
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
