import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Pagination } from "@nextui-org/react";
import { searchProductsByDescription, getProductsBySubcategory } from "../service/productService.js";
import CardComponent from "../components/ProductCard/CardComponent.jsx";
import FilterCategories from "../components/FilterCategories.jsx";

const ITEMS_PER_PAGE = 6;

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 25000]);

    const containerRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        if (selectedSubcategory) {
            getProductsBySubcategory(selectedSubcategory)
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
        } else if (searchQuery) {
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
    }, [searchQuery, selectedSubcategory]);

    useEffect(() => {
        setCurrentPage(1);
    }, [priceRange]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [currentPage]);

    const filteredProducts = products.filter(
        (product) =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div ref={containerRef} className="p-4">
            <h1 className="text-2xl font-bold m-4 text-[var(--color-primary-dark)] font-oswald animate-text-color-change">
                Resultados de búsqueda
            </h1>
            {loading && (
                <p className="text-[var(--color-primary-dark)] font-oswald animate-pulse text-center text-4xl">
                    Cargando productos...
                </p>
            )}
            {error && <p className="text-red-500 animate-pulse text-center">{error}</p>}
            {filteredProducts.length === 0 && !loading && !error && (
                <p className="text-[var(--color-primary-light)]">No se encontraron productos.</p>
            )}
            <div className="flex flex-col md:flex-row">
                <div className="justify-items-center sm:justify-items-stretch">
                    <FilterCategories
                        onFilterBySubcategory={setSelectedSubcategory}
                        onFilterByPrice={setPriceRange}
                    />
                </div>
                <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center sm:justify-items-stretch">
                        {currentProducts.map((producto) => (
                            <CardComponent key={producto.product_id} producto={producto} />
                        ))}
                    </div>
                    <div className="mt-6 flex justify-center">
                        <Pagination
                            total={totalPages}
                            initialPage={1}
                            page={currentPage}
                            onChange={(page) => setCurrentPage(page)}
                            color="primary"
                            size="lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
