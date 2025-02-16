import { useState, useEffect, createContext } from "react";
import useAuth from "../hook/useAuth";
import {
    getFavoritesByUser,
    createFavorite,
    deleteFavoriteById,
} from "../service/favortieService.js";

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
    const [favoritos, setFavoritos] = useState([]);
    const { userId } = useAuth();

    useEffect(() => {
        if (userId) {
            getFavoritesByUser(userId)
                .then((data) => {
                    setFavoritos(data);
                })
                .catch((error) => {
                    console.error("Error al cargar favoritos:", error);
                });
        } else {
            setFavoritos([]);
        }
    }, [userId]);

    const toggleFavorite = async (producto) => {
        if (!userId) {
            console.warn("Debes iniciar sesión para agregar/eliminar favoritos.");
            return;
        }

        const isFav = favoritos.some((fav) => fav.product_id === producto.product_id);

        if (isFav) {
            const favToRemove = favoritos.find((f) => f.product_id === producto.product_id);
            try {
                await deleteFavoriteById(favToRemove.favorites_id);
                setFavoritos((prev) =>
                    prev.filter((fav) => fav.product_id !== producto.product_id)
                );
            } catch (error) {
                console.error("Error al eliminar favorito:", error);
            }
        } else {
            try {
                const newFavorite = await createFavorite({
                    user_id: userId,
                    product_id: producto.product_id,
                });
                setFavoritos((prev) => [...prev, newFavorite]);
            } catch (error) {
                console.error("Error al agregar favorito:", error);
            }
        }
    };

    return (
        <FavoritosContext.Provider value={{ favoritos, toggleFavorite }}>
            {children}
        </FavoritosContext.Provider>
    );
};

export default FavoritosContext;
