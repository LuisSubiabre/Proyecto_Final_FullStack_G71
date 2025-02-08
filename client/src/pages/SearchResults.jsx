import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchProductsByDescription } from "../service/productService.js";
import CardComponent from "../components/ProductCard/CardComponent.jsx";

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchQuery) {
            searchProductsByDescription(searchQuery)
                .then((response) => {
                    if (response.success) {
                        setProducts(response.data);
                    } else {
                        setError("No se encontraron productos.");
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setError("Error al obtener productos");
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [searchQuery]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Resultados de búsqueda</h1>
            {loading && <p>Cargando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {products.length === 0 && !loading && !error && <p>No se encontraron productos.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((producto) => (
                    <CardComponent key={producto.product_id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;

