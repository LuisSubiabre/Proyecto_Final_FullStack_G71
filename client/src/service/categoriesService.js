import api from "../api/config.js";

// ** Categorías **
export const getAllCategories = () =>
    api.get("/category").then((response) => response.data);

export const getCategoryById = (id) =>
    api.get(`/category/${id}`).then((response) => response.data);

export const getCategoryWithSubcategories = (id) =>
    api.get(`/category/${id}/subcategory`).then((response) => response.data);

export const createCategory = (categoryData) =>
    api.post("/category", categoryData).then((response) => response.data);

export const updateCategoryById = (id, categoryData) =>
    api.put(`/category/${id}`, categoryData).then((response) => response.data);

export const deleteCategoryById = (id) =>
    api.delete(`/category/${id}`).then((response) => response.data);

// ** Subcategorías **
export const getAllSubcategories = () =>
    api.get("/category/subcategory").then((response) => response.data);

export const getSubcategoryById = (id) =>
    api.get(`/category/subcategory/${id}`).then((response) => response.data);

export const getSubcategoryWithCategoryInfo = (id) =>
    api.get(`/category/subcategory/${id}/category`).then((response) => response.data);

export const createSubcategory = (subcategoryData) =>
    api.post("/category/subcategory", subcategoryData).then((response) => response.data);

export const updateSubcategoryById = (id, subcategoryData) =>
    api.put(`/category/subcategory/${id}`, subcategoryData).then((response) => response.data);

export const deleteSubcategoryById = (id) =>
    api.delete(`/category/subcategory/${id}`).then((response) => response.data);


