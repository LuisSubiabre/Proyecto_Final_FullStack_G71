import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import FilterCategories from "../components/FilterCategories.jsx";
import CardComponent from "../components/ProductCard/CardComponent.jsx";
import { Pagination } from "@nextui-org/react";
import { getProductsBySubcategory } from "../service/productService.js";

const ITEMS_PER_PAGE = 6;

const Category = () => {
    const { id, subcategoryId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(subcategoryId || null);
    const [priceRange, setPriceRange] = useState([0, 25000]);

    useEffect(() => {
        if (!selectedSubcategory) return;

        getProductsBySubcategory(selectedSubcategory)
            .then((response) => {
                const productsArray = response.data || [];
                if (productsArray.length > 0) {
                    setProducts(productsArray);
                    setFilteredProducts(productsArray);
                } else {
                    setError("No se encontraron productos para esta subcategoría.");
                }
            })
            .catch((err) => {
                console.error("Error al obtener productos:", err);
                setError("Error al obtener productos.");
            });
    }, [selectedSubcategory]);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );
        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [priceRange, products]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="p-4">
            <Breadcrumb categoryName={name} categoryId={parseInt(id, 10)} />
            <div className="flex flex-col md:flex-row">
                <div className="justify-items-center sm:justify-items-stretch ">
                    <FilterCategories
                        onFilterBySubcategory={setSelectedSubcategory}
                        onFilterByPrice={setPriceRange}
                    />
                </div>
                <div className="w-full md:w-3/4">
                    <div className="ml-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center sm:justify-items-stretch">
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

export default Category;