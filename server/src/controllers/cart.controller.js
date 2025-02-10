import {
  getCartsWithItems,
  getCartsWithItemsByUser,
  getAllCartsByUser,
  createCart,
  closeCartById,
  createCartItem,
  incrementCartItem,
  decrementCartItem,
  getCarritoGuardadoModel,
  consultaItemCarrito,
  getDetailCarritoModel,
  eliminarItemCarritoModel,
} from "../models/cart.model.js";

const createResponse = (res, data, message, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const getCartsController = async (req, res, next) => {
  try {
    const carts = await getCartsWithItems();
    createResponse(res, carts, "Carritos obtenidos correctamente");
  } catch (error) {
    next(error);
  }
};

// Obtener carritos con ítems por usuario (solo con estado 'carrito_guardado')
export const getCartsByUserController = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const carts = await getCartsWithItemsByUser(user_id);
    createResponse(
      res,
      carts,
      "Carritos guardados del usuario obtenidos correctamente"
    );
  } catch (error) {
    next(error);
  }
};

// Obtener todos los carritos con detalles completos por usuario
export const getAllCartsByUserController = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const carts = await getAllCartsByUser(user_id);
    createResponse(
      res,
      carts,
      "Carritos completos del usuario obtenidos correctamente"
    );
  } catch (error) {
    next(error);
  }
};

// Crear un ítem en el carrito o crear un nuevo carrito si no existe
export const addCartItemController = async (req, res, next) => {
  try {
    const { product_id, cart_id, quantity } = req.body;
    console.log(quantity);
    /* si el item existe en el carrito, incrementar la cantidad */
    const existingItem = await consultaItemCarrito(cart_id, product_id);
    console.log(existingItem);
    if (existingItem) {
      const updatedItem = await incrementCartItem(
        existingItem.detail_id,
        quantity
      );
      createResponse(
        res,
        updatedItem,
        "Cantidad de ítem incrementada correctamente"
      );
      return;
    } else {
      const newItem = await createCartItem(cart_id, product_id, quantity);
      createResponse(
        res,
        newItem,
        "Ítem añadido al carrito correctamente",
        201
      );
    }
  } catch (error) {
    next(error);
  }
};

export const addCartUserController = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const newCart = await createCart(user_id, "carrito_guardado");
    return res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
};

// Incrementar cantidad de un ítem en el carrito
export const updateCartIncreaseController = async (req, res, next) => {
  try {
    const { detail_id, quantity } = req.body;
    // Incrementar la cantidad del ítem
    const updatedItem = await incrementCartItem(detail_id, quantity);
    createResponse(
      res,
      updatedItem,
      "Cantidad de ítem incrementada correctamente"
    );
  } catch (error) {
    next(error);
  }
};

// Decrementar cantidad de un ítem en el carrito
export const updateCartDecreaseController = async (req, res, next) => {
  try {
    const { detail_id, quantity } = req.body;
    // Decrementar la cantidad del ítem
    const updatedItem = await decrementCartItem(detail_id, quantity);
    createResponse(
      res,
      updatedItem,
      "Cantidad de ítem decrementada correctamente"
    );
  } catch (error) {
    next(error);
  }
};

// Cerrar un carrito
export const closeCartController = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    // Consultar si el usuario tiene un carrito activo
    const existingCarts = await getCartsWithItemsByUser(user_id);

    if (existingCarts.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró un carrito activo para el usuario" });
    }

    // Cerrar el carrito
    const cart_id = existingCarts[0].cart_id;
    const closedCart = await closeCartById(cart_id);
    createResponse(res, closedCart, "Carrito cerrado correctamente");
  } catch (error) {
    next(error);
  }
};

// busca carrito guardado del usuario
export const getCarritoGuardado = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const cart = await getCarritoGuardadoModel(user_id);
    res.status(200).json(cart);
    //createResponse(res, cart, "Carrito guardado obtenido correctamente");
  } catch (error) {
    next(error);
  }
};

// Obtiene el detalle de un carrito para mostrar en el front
export const getDetailCarrito = async (req, res, next) => {
  try {
    const { cart_id } = req.params;
    const cart = await getDetailCarritoModel(cart_id);
    if (!cart) {
      return res.status(404).json({ error: "No se encontró el carrito" });
    }
    createResponse(
      res,
      cart,
      "Carritos completos del usuario obtenidos correctamente"
    );
  } catch (error) {
    next(error);
  }
};

export const eliminarItemCarrito = async (req, res, next) => {
  const { detail_id } = req.params;
  //res.json({ message: "Ruta para eliminar un ítem del carrito " + detail_id });
  try {
    const { detail_id } = req.params;
    const item = await eliminarItemCarritoModel(detail_id, 1);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};
