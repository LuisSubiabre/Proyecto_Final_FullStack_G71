import {
    getCartsWithItems,
    getCartsWithItemsByUser,
    getAllCartsByUser,
    createCart,
    closeCartById,
    createCartItem,
    incrementCartItem,
    decrementCartItem
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
        createResponse(res, carts, "Carritos guardados del usuario obtenidos correctamente");
    } catch (error) {
        next(error);
    }
};

// Obtener todos los carritos con detalles completos por usuario
export const getAllCartsByUserController = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const carts = await getAllCartsByUser(user_id);
        createResponse(res, carts, "Carritos completos del usuario obtenidos correctamente");
    } catch (error) {
        next(error);
    }
};

// Crear un ítem en el carrito o crear un nuevo carrito si no existe
export const addCartItemController = async (req, res, next) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        const existingCarts = await getCartsWithItemsByUser(user_id);

        let cart_id;
        if (existingCarts.length === 0) {
            const newCart = await createCart(user_id, 'carrito_guardado');
            cart_id = newCart.cart_id;
        } else {
            cart_id = existingCarts[0].cart_id;
        }

        const newItem = await createCartItem(cart_id, product_id, quantity);
        createResponse(res, newItem, "Ítem añadido al carrito correctamente", 201);
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
        createResponse(res, updatedItem, "Cantidad de ítem incrementada correctamente");
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
        createResponse(res, updatedItem, "Cantidad de ítem decrementada correctamente");
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
            return res.status(404).json({ error: "No se encontró un carrito activo para el usuario" });
        }

        // Cerrar el carrito
        const cart_id = existingCarts[0].cart_id;
        const closedCart = await closeCartById(cart_id);
        createResponse(res, closedCart, "Carrito cerrado correctamente");
    } catch (error) {
        next(error);
    }
};
