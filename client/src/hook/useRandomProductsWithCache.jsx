import { useState, useEffect } from "react";

const useRandomProductsWithCache = (fetchProducts, cacheKey, productCount = 3) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem(`${cacheKey}Products`);
        const storedTimestamp = localStorage.getItem(`${cacheKey}ProductsTimestamp`);

        if (storedData && storedTimestamp) {
            const oneWeek = 7 * 24 * 60 * 60 * 1000;
            const now = new Date().getTime();

            if (now - storedTimestamp < oneWeek) {
                try {
                    const parsedData = JSON.parse(storedData);
                    if (Array.isArray(parsedData) && parsedData.length > 0) {
                        setProducts(parsedData);
                        return;
                    }
                } catch {
                    console.error("Error al parsear los productos almacenados en localStorage.");
                }
            }
        }

        fetchProducts()
            .then((response) => {
                const productsArray = Array.isArray(response.data) ? response.data : [];
                if (productsArray.length > 0) {
                    const randomProducts = productsArray.sort(() => 0.5 - Math.random()).slice(0, productCount);
                    setProducts(randomProducts);

                    // Guardar en localStorage
                    localStorage.setItem(`${cacheKey}Products`, JSON.stringify(randomProducts));
                    localStorage.setItem(`${cacheKey}ProductsTimestamp`, new Date().getTime().toString());
                } else {
                    setError("La respuesta de la API no contiene productos válidos.");
                }
            })
            .catch((err) => {
                console.error(`Error al obtener productos para ${cacheKey}:`, err);
                setError("Error al obtener productos.");
            });
    }, [fetchProducts, cacheKey, productCount]);

    return { products, error };
};

export default useRandomProductsWithCache;
