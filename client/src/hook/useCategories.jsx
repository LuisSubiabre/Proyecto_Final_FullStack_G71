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
                // Obtener categorías con subcategorías organizadas por menú
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
                            items: subcategories.map((sub) => sub.name_subcategories),
                        };
                    })
                );

                setMenus(menusWithItems);

                // Obtener todas las subcategorías únicas
                const responseSubcategories = await getAllSubcategories();
                const uniqueSubcategories = Array.from(
                    new Set(responseSubcategories.data.map((sub) => sub.name_subcategories))
                );

                setAllSubcategories(uniqueSubcategories);
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
