import api from "../api/config.js";

// ** Categorías **
export const getAllCategories = () =>
    api.get("/").then((response) => response.data);

export const getCategoryById = (id) =>
    api.get(`/${id}`).then((response) => response.data);

export const getCategoryWithSubcategories = (id) =>
    api.get(`/${id}/subcategory`).then((response) => response.data);

export const createCategory = (categoryData) =>
    api.post("/", categoryData).then((response) => response.data);

export const updateCategoryById = (id, categoryData) =>
    api.put(`/${id}`, categoryData).then((response) => response.data);

export const deleteCategoryById = (id) =>
    api.delete(`/${id}`).then((response) => response.data);

// ** Subcategorías **
export const getAllSubcategories = () =>
    api.get("/subcategory").then((response) => response.data);

export const getSubcategoryById = (id) =>
    api.get(`/subcategory/${id}`).then((response) => response.data);

export const getSubcategoryWithCategoryInfo = (id) =>
    api.get(`/subcategory/${id}/category`).then((response) => response.data);

export const createSubcategory = (subcategoryData) =>
    api.post("/subcategory", subcategoryData).then((response) => response.data);

export const updateSubcategoryById = (id, subcategoryData) =>
    api.put(`/subcategory/${id}`, subcategoryData).then((response) => response.data);

export const deleteSubcategoryById = (id) =>
    api.delete(`/subcategory/${id}`).then((response) => response.data);

