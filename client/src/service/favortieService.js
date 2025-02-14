import api from "../api/config.js";

export const getAllFavorites = () =>
    api.get("/favorites").then((response) => response.data);

export const getFavoriteById = (id) =>
    api.get(`/favorites/${id}`).then((response) => response.data);

export const updateFavoriteById = (id, favoriteData) =>
    api.put(`/favorites/${id}`, favoriteData).then((response) => response.data);

export const getFavoritesByUser = (userId) =>
    api.get(`/favorites/user/${userId}`).then((response) => response.data.data);

export const createFavorite = (favoriteData) =>
    api.post("/favorites", favoriteData).then((response) => response.data.data);

export const deleteFavoriteById = (id) =>
    api.delete(`/favorites/${id}`).then((response) => response.data.data);
