import { useEffect, useContext } from "react";
import FavoriteCard from "../components/ProductCard/FavoriteCard.jsx";
import FavoritosContext from "../context/FavoritosContext.jsx";

const FavoriteProducts = () => {
    const { favoritos } = useContext(FavoritosContext);

    useEffect(() => {
        console.log("Favoritos en la vista de favoritos:", favoritos);
    }, [favoritos]);

    if (!favoritos || favoritos.length === 0) {
        return (
            <section className="p-6 bg-[var(--color-neutral-light)]">
                <h2 className="text-2xl font-bold font-oswald text-[var(--color-primary-light)] mb-6">
                    No tienes productos favoritos aún.
                </h2>
            </section>
        );
    }

    return (
        <section className="p-6 bg-[var(--color-neutral-light)]">
            <h2 className="text-2xl font-bold font-oswald text-[var(--color-primary-light)] mb-6">
                Tus Productos Favoritos
            </h2>
            <div className="flex flex-wrap justify-around gap-2">
                {favoritos.map((fav) => (
                    <FavoriteCard
                        key={fav.favorites_id || fav.product_id}
                        producto={fav}
                    />
                ))}
            </div>
        </section>
    );
};

export default FavoriteProducts;

