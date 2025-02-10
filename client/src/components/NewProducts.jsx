import { useCallback } from "react";
import CardComponent from "../components/ProductCard/CardComponent.jsx";
import { getProductsByCategory } from "../service/productService.js";
import useRandomProductsWithCache from "../hook/useRandomProductsWithCache.jsx";

const NewProducts = () => {
    const fetchProducts = useCallback(() => getProductsByCategory(1), []);

    const { products, error } = useRandomProductsWithCache(fetchProducts, "new", 3);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="p-6 bg-[var(--color-neutral-light)]">
            <h2 className="text-2xl font-bold font-oswald text-[var(--color-primary-light)] mb-6">
                DESCUBRE NUESTROS NUEVOS PRODUCTOS A LA VENTA
            </h2>
            <div className="flex flex-wrap justify-around gap-2">
                {products.map((producto) => (
                    <CardComponent key={producto.product_id} producto={producto} />
                ))}
            </div>
        </section>
    );
};

export default NewProducts;

