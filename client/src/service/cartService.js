import api from "../api/config.js";

// ** Rutas Privadas (requieren autenticación) **

// Obtener todos los carritos
export const getAllCarts = () =>
    api.get("/cart").then((response) => response.data);

// Obtener los carritos guardados de un usuario específico
export const getCartsByUser = (userId) =>
    api.get(`/cart/user/${userId}`).then((response) => response.data);

// Obtener todos los carritos completos de un usuario específico
export const getAllCartsByUser = (userId) =>
    api.get(`/cart/all/${userId}`).then((response) => response.data);

// Añadir un ítem al carrito (crea el carrito si no existe)
export const addCartItem = (cartItemData) =>
    api.post("/cart/items", cartItemData).then((response) => response.data);

// Incrementar la cantidad de un ítem en el carrito
export const increaseCartItemQuantity = (cartItemData) =>
    api.put("/cart/items/increment", cartItemData).then((response) => response.data);

// Decrementar la cantidad de un ítem en el carrito
export const decreaseCartItemQuantity = (cartItemData) =>
    api.put("/cart/items/decrement", cartItemData).then((response) => response.data);

// Cerrar el carrito de un usuario específico
export const closeCartByUser = (userId) =>
    api.put(`/cart/close/${userId}`).then((response) => response.data);
