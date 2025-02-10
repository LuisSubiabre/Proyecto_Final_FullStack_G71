import { pool } from "../../database/index.js";

// Obtener todos los carritos con sus ítems
export const getCartsWithItems = async () => {
  const query = `
        SELECT c.cart_id, c.user_id, c.status, ci.detail_id, ci.product_id, ci.quantity, ci.price, ci.created_at
        FROM cart c
        INNER JOIN cart_items ci ON c.cart_id = ci.cart_id;
    `;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Obtener carritos con ítems por usuario
export const getCartsWithItemsByUser = async (user_id) => {
  const query = `
        SELECT c.cart_id, c.user_id, c.status, ci.detail_id, ci.product_id, ci.quantity, ci.price, ci.created_at
        FROM cart c
        INNER JOIN cart_items ci ON c.cart_id = ci.cart_id
        WHERE c.user_id = $1 AND c.status = 'carrito_guardado';
    `;
  try {
    const result = await pool.query(query, [user_id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Crear un carrito
export const createCart = async (user_id, status) => {
  const query =
    "INSERT INTO cart (user_id, status) VALUES ($1, $2) RETURNING *";
  try {
    const result = await pool.query(query, [user_id, status]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Cerrar un carrito por ID
export const closeCartById = async (cart_id) => {
  const query =
    "UPDATE cart SET status = 'carrito_cerrado' WHERE cart_id = $1 RETURNING *";
  try {
    const result = await pool.query(query, [cart_id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Crear un ítem en el carrito con precio real desde la tabla `products`
export const createCartItem = async (cart_id, product_id, quantity) => {
  const query = `
        INSERT INTO cart_items (cart_id, product_id, quantity, price)
        VALUES ($1, $2, $3, (SELECT price FROM products WHERE product_id = $2))
        RETURNING *;
    `;
  try {
    const result = await pool.query(query, [cart_id, product_id, quantity]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Incrementar cantidad de un ítem en el carrito
export const incrementCartItem = async (detail_id) => {
  // Primero, obtener la cantidad actual del ítem
  const getQuantityQuery =
    "SELECT quantity FROM cart_items WHERE detail_id = $1";

  try {
    // Obtener la cantidad actual
    const currentQuantityResult = await pool.query(getQuantityQuery, [
      detail_id,
    ]);

    if (currentQuantityResult.rows.length === 0) {
      throw new Error("Ítem no encontrado en el carrito");
    }

    const currentQuantity = currentQuantityResult.rows[0].quantity;

    // Calcular la nueva cantidad sumando 1
    const newQuantity = currentQuantity + 1;

    // Actualizar la cantidad en la base de datos
    const updateQuery =
      "UPDATE cart_items SET quantity = $1 WHERE detail_id = $2 RETURNING *";
    const result = await pool.query(updateQuery, [newQuantity, detail_id]);

    return result.rows[0];
  } catch (error) {
    console.error("Error al incrementar la cantidad del ítem:", error);
    throw error;
  }
};

// Decrementar cantidad de un ítem en el carrito
export const decrementCartItem = async (detail_id, quantity) => {
  const query =
    "UPDATE cart_items SET quantity = $1 WHERE detail_id = $2 RETURNING *";
  try {
    const result = await pool.query(query, [quantity, detail_id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getAllCartsByUser = async (user_id) => {
  const query = `
        SELECT
            c.cart_id,
            c.status,
            ci.detail_id,
            ci.product_id,
            p.name_product,
            ci.quantity,
            ci.price,
            c.created_at,
            p.image_url,
            u.username
        FROM cart c
        INNER JOIN cart_items ci ON c.cart_id = ci.cart_id
        INNER JOIN products p ON ci.product_id = p.product_id
        INNER JOIN users u ON c.user_id = u.user_id
        WHERE c.user_id = $1
        ORDER BY c.cart_id DESC, ci.detail_id;
    `;
  try {
    const result = await pool.query(query, [user_id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const getCarritoGuardadoModel = async (user_id) => {
  const query = `
SELECT * from cart where user_id = $1 and status = 'carrito_guardado'`;
  const { rows } = await pool.query(query, [user_id]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

export const consultaItemCarrito = async (cart_id, product_id) => {
  const query = `
    SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2;
    `;
  try {
    const result = await pool.query(query, [cart_id, product_id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// reemplazara a getAllCartsByUser, ya que consulta por el carrito activo del usuario
export const getDetailCarritoModel = async (cart_id) => {
  const query = `
  SELECT
      c.cart_id,
      c.status,
      ci.detail_id,
      ci.product_id,
      p.name_product,
      ci.quantity,
      ci.price,
      c.created_at,
      p.image_url,
      u.username
  FROM cart c
  INNER JOIN cart_items ci ON c.cart_id = ci.cart_id
  INNER JOIN products p ON ci.product_id = p.product_id
  INNER JOIN users u ON c.user_id = u.user_id
  WHERE c.cart_id = $1
  ORDER BY c.cart_id DESC, ci.detail_id;
`;
  const { rows } = await pool.query(query, [cart_id]);
  if (rows.length === 0) {
    return null;
  }
  return rows;
};

/* si un item del carrito front es 0 se elimina del carrito*/
export const eliminarItemCarritoModel = async (detail_id, quantity) => {
  const query = `
    DELETE FROM cart_items WHERE detail_id = $1 RETURNING *;
    `;
  try {
    const result = await pool.query(query, [detail_id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
