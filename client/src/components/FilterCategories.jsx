import { Accordion, AccordionItem, Slider, Skeleton } from "@nextui-org/react";
import { useState } from "react";
import useCategories from "../hook/useCategories.jsx";

const FilterCategories = ({ onFilterBySubcategory, onFilterByPrice }) => {
    const { allSubcategories, loading, error } = useCategories();
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 50000]);

    const handleSubcategoryChange = (subcategoryId) => {
        setSelectedSubcategory(subcategoryId);
        onFilterBySubcategory(subcategoryId);
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
        onFilterByPrice(value);
    };

    return (
        <div className="w-72 p-4 bg-purple-300 rounded-lg shadow-md m-3">
            <h2 className="text-center text-xl font-bold text-purple-800 mb-4">Filtro</h2>

            <Accordion variant="splitted">
                <AccordionItem
                    aria-label="Categoría"
                    title={<span className="text-black">Categoría</span>}
                    className="bg-[var(--color-secondary)]"
                >
                    {loading ? (
                        <div className="space-y-2">
                            {[...Array(5)].map((_, index) => (
                                <Skeleton key={index} className="h-6 w-32 rounded" />
                            ))}
                        </div>
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : (
                        <ul className="list-none p-0">
                            {allSubcategories.map((subcategory) => (
                                <li key={subcategory.id} className="mb-2">
                                    <label className="flex items-center text-purple-700">
                                        <input
                                            type="radio"
                                            name="subcategory"
                                            value={subcategory.id}
                                            checked={selectedSubcategory === subcategory.id}
                                            onChange={() => handleSubcategoryChange(subcategory.id)}
                                            className="mr-2 accent-purple-500"
                                        />
                                        {subcategory.title}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </AccordionItem>

                {/* Precio */}
                <AccordionItem
                    aria-label="Precio"
                    title={<span className="text-black">Precio</span>}
                    className="text-[var(--color-primary-dark)] bg-[var(--color-secondary)] mt-2"
                >
                    <div className="mt-4">
                        <Slider
                            className="w-full"
                            defaultValue={[0, 50000]}
                            value={priceRange}
                            onChange={handlePriceChange}
                            formatOptions={{ style: "currency", currency: "CLP" }}
                            label="Rango de precios"
                            maxValue={50000}
                            minValue={0}
                            step={1000}
                        />
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default FilterCategories;

