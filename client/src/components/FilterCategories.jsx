import { Accordion, AccordionItem, Slider } from "@nextui-org/react";
import menuCategories from "../data/menuCategories.json";

const FilterCategories = () => {
    // Obtener subcategorías únicas del JSON
    const allSubcategories = menuCategories.menus.flatMap((menu) => menu.items);
    const uniqueSubcategories = [...new Set(allSubcategories)];

    return (
        <div className="w-72 p-4 bg-purple-300 rounded-lg shadow-md m-3 " >
            <h2 className="text-center text-xl font-bold text-purple-800 mb-4">Filtro</h2>
            <Accordion variant="splitted" c>
                {/* Categorías */}
                <AccordionItem
                    title={<span className="text-black">Categoría</span>}
                    className="bg-[var(--color-secondary)]">
                    <ul className="list-none p-0">
                        {uniqueSubcategories.map((subcategory, index) => (
                            <li key={index} className="mb-2">
                                <label className="flex items-center text-purple-700">
                                    <input
                                        type="checkbox"
                                        className="mr-2 accent-purple-500"
                                    />
                                    {subcategory}
                                </label>
                            </li>
                        ))}
                    </ul>
                </AccordionItem>

                {/* Precio */}
                <AccordionItem
                    title={<span className="text-black">Precio</span>}
                    className="text-[var(--color-primary-dark)] bg-[var(--color-secondary)] mt-2">
                    <div className="mt-4">
                        <Slider
                            className="w-full"
                            defaultValue={[0, 50000]}
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
}

export default FilterCategories