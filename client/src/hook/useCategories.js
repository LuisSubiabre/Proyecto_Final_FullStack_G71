import { useState, useEffect } from "react";
import {
    getAllCategories,
    getCategoryWithSubcategories,
} from "../service/categoriesService.js";

const useCategories = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                const categories = response.data;

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
            } catch (err) {
                console.error("Error al obtener categorías:", err);
                setError("No se pudieron cargar las categorías.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { menus, loading, error };
};

export default useCategories;
