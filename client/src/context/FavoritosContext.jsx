import { useState, useEffect, createContext } from "react";

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
    const [favoritos, setFavoritos] = useState(() => {
        const favoritosGuardados = localStorage.getItem("favoritos");
        return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
    });

    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }, [favoritos]);

    return (
        <FavoritosContext.Provider value={{ favoritos, setFavoritos }}>
            {children}
        </FavoritosContext.Provider>
    );
};

export default FavoritosContext;
