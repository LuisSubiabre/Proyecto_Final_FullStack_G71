import { useState, useEffect } from "react";
import {
    getAllCategories,
    getCategoryWithSubcategories,
    getAllSubcategories,
} from "../service/categoriesService.js";

const useCategories = () => {
    const [menus, setMenus] = useState([]);
    const [allSubcategories, setAllSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoriesAndSubcategories = async () => {
            try {
                const responseCategories = await getAllCategories();
                const categories = responseCategories.data;

                const menusWithItems = await Promise.all(
                    categories.map(async (category) => {
                        const subcategoryResponse = await getCategoryWithSubcategories(
                            category.category_id
                        );
                        const subcategories = subcategoryResponse.data.subcategories;

                        return {
                            id: category.category_id,
                            title: category.name_categories,
                            items: subcategories.map((sub) => ({
                                id: sub.subcategory_id,
                                title: sub.name_subcategories,
                            })),
                        };
                    })
                );

                setMenus(menusWithItems);

                // Obtener todas las subcategorías y eliminar duplicados por nombre
                const responseSubcategories = await getAllSubcategories();
                const subcategories = responseSubcategories.data;

                const filteredSubcategories = [];
                const seenTitles = new Set();

                subcategories.forEach((sub) => {
                    if (!seenTitles.has(sub.name_subcategories)) {
                        filteredSubcategories.push({
                            id: sub.subcategory_id,
                            title: sub.name_subcategories,
                        });
                        seenTitles.add(sub.name_subcategories);
                    }
                });

                setAllSubcategories(filteredSubcategories);
            } catch (err) {
                console.error("Error al obtener categorías o subcategorías:", err);
                setError("No se pudieron cargar las categorías o subcategorías.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndSubcategories();
    }, []);

    return { menus, allSubcategories, loading, error };
};

export default useCategories;
