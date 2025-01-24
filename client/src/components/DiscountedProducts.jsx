import { useEffect, useContext } from "react";
import CardComponent from "../components/ProductCard/CardComponent.jsx";
import dataProductos from "../data/dataProductos.json";
import FavoritosContext from "../context/FavoritosContext.jsx";

const DiscountedProducts = () => {
    const { favoritos } = useContext(FavoritosContext);

    useEffect(() => {
        console.log("Favoritos:", favoritos);
    }, [favoritos]);

    return (
        <section className="p-6 bg-[var(--color-neutral-light)]">
            <h2 className="text-2xl font-bold font-oswald text-[var(--color-primary-light)] mb-6">
                POR ESTA SEMANA TEN ESTOS PRODUCTOS A UN INCREIBLE PRECIO
            </h2>
            <div className="flex flex-wrap justify-around gap-2">
                {dataProductos.map((producto) => (
                    <CardComponent key={producto.id} producto={producto} />
                ))}
            </div>
        </section>
    );
};

export default DiscountedProducts;