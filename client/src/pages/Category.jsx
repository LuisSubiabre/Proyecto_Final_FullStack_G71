import { useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import FilterCategories from "../components/FilterCategories.jsx";
import CardComponent from "../components/ProductCard/CardComponent.jsx";
import { Pagination } from "@nextui-org/react";
import dataProductsCategories from "../data/dataProductsCategories.json";

const ITEMS_PER_PAGE = 6;

const Category = () => {
    const { name, id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    // Determinar el total de páginas
    const totalPages = Math.ceil(dataProductsCategories.length / ITEMS_PER_PAGE);

    // Obtener los productos para la página actual
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = dataProductsCategories.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    return (
        <div className="category-page p-4">
            <Breadcrumb categoryName={name} categoryId={parseInt(id, 10)} />
            <div className="flex flex-col md:flex-row">
                {/* Filtros */}
                <div className="w-full md:w-1/4 mb-4">
                    <FilterCategories />
                </div>

                {/* Productos */}
                <div className="w-full md:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentProducts.map((producto) => (
                            <CardComponent key={producto.id} producto={producto} />
                        ))}
                    </div>

                    {/* Paginación */}
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




