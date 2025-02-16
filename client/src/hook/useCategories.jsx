import { useContext } from "react";
import { CategoriesContext } from "../context/categoriesContext.jsx";

const useCategories = () => {
    return useContext(CategoriesContext);
};

export default useCategories;