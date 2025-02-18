import { useState, useEffect, createContext, useMemo } from "react";
import {
    getAllCategories,
    getCategoryWithSubcategories,
    getAllSubcategories,
} from "../service/categoriesService.js";

const CategoriesContext = createContext();

const CACHE_KEY = "categoriesData";
const CACHE_EXPIRATION = 1000 * 60 * 60;

const CategoriesProvider = ({ children }) => {
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

                const dataToCache = {
                    menus: menusWithItems,
                    allSubcategories: filteredSubcategories,
                    timestamp: new Date().getTime(),
                };
                localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));
            } catch (err) {
                console.error("Error al cargar las categorías o subcategorías:", err);
                setError("No se pudieron cargar las categorías o subcategorías.");
            } finally {
                setLoading(false);
            }
        };

        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            try {
                const parsedData = JSON.parse(cachedData);
                const now = new Date().getTime();
                if (now - parsedData.timestamp < CACHE_EXPIRATION) {
                    setMenus(parsedData.menus);
                    setAllSubcategories(parsedData.allSubcategories);
                    setLoading(false);
                    return;
                }
            } catch (e) {
                console.error("Error al parsear la caché:", e);
            }
        }

        fetchCategoriesAndSubcategories();
    }, []);

    const contextValue = useMemo(
        () => ({
            menus,
            allSubcategories,
            loading,
            error,
        }),
        [menus, allSubcategories, loading, error]
    );

    return (
        <CategoriesContext.Provider value={contextValue}>
            {children}
        </CategoriesContext.Provider>
    );
};

export { CategoriesContext, CategoriesProvider };
