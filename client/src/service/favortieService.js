import api from "../api/config.js";

// ** Rutas Privadas (requieren autenticación) **

// Obtener todos los favoritos
export const getAllFavorites = () =>
    api.get("/favorites").then((response) => response.data);

// Obtener un favorito por ID
export const getFavoriteById = (id) =>
    api.get(`/favorites/${id}`).then((response) => response.data);

// Obtener favoritos de un usuario específico
export const getFavoritesByUser = (userId) =>
    api.get(`/favorites/user/${userId}`).then((response) => response.data);

// Crear un nuevo favorito
export const createFavorite = (favoriteData) =>
    api.post("/favorites", favoriteData).then((response) => response.data);

// Actualizar un favorito existente por ID
export const updateFavoriteById = (id, favoriteData) =>
    api.put(`/favorites/${id}`, favoriteData).then((response) => response.data);

// Eliminar un favorito por ID
export const deleteFavoriteById = (id) =>
    api.delete(`/favorites/${id}`).then((response) => response.data);
