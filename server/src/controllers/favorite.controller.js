import {
    getFavorites,
    getFavoriteById,
    getFavoritesByUser,
    createFavorite,
    updateFavorite,
    deleteFavorite,
} from "../models/favorite.model.js";

const createResponse = (res, data, message, statusCode = 200) => {
    return res.status(statusCode).json({ success: true, message, data });
};

export const getFavoritesController = async (req, res, next) => {
    try {
        const favorites = await getFavorites();
        createResponse(res, favorites, "Favoritos obtenidos correctamente");
    } catch (error) {
        next(error);
    }
};

export const getFavoriteByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const favorite = await getFavoriteById({ id });

        if (!favorite) {
            return res.status(404).json({ success: false, message: "Favorito no encontrado" });
        }

        createResponse(res, favorite, "Favorito obtenido correctamente");
    } catch (error) {
        next(error);
    }
};

export const getFavoritesByUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const favorites = await getFavoritesByUser({ id });

        if (!favorites.length) {
            return res.status(404).json({ success: false, message: "No se encontraron favoritos para este usuario" });
        }

        createResponse(res, favorites, "Favoritos del usuario obtenidos correctamente");
    } catch (error) {
        next(error);
    }
};

export const createFavoriteController = async (req, res, next) => {
    try {
        const { user_id, product_id } = req.body;

        if (!user_id || !product_id) {
            return res.status(400).json({ success: false, message: "Faltan datos obligatorios" });
        }

        const newFavorite = await createFavorite({ user: user_id, product: product_id });
        createResponse(res, newFavorite, "Favorito creado correctamente", 201);
    } catch (error) {
        next(error);
    }
};

export const updateFavoriteController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { product_id } = req.body;

        if (!product_id) {
            return res.status(400).json({ success: false, message: "Falta el ID del producto" });
        }

        const updatedFavorite = await updateFavorite({ id }, { product: product_id });

        if (!updatedFavorite) {
            return res.status(404).json({ success: false, message: "Favorito no encontrado" });
        }

        createResponse(res, updatedFavorite, "Favorito actualizado correctamente");
    } catch (error) {
        next(error);
    }
};

export const deleteFavoriteController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await deleteFavorite({ id });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Favorito no encontrado" });
        }

        createResponse(res, {}, "Favorito eliminado correctamente");
    } catch (error) {
        next(error);
    }
};
