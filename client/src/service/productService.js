import api from "../api/config.js";

// ** Rutas Públicas **
export const searchProductsByDescription = (description) =>
    api.get("/products/search", { params: { description } }).then((response) => response.data);

export const getAllProducts = () =>
    api.get("/products").then((response) => response.data);

export const getProductById = (id) =>
    api.get(`/products/${id}`).then((response) => response.data);

export const getProductsByCategory = (categoryId) =>
    api.get(`/products/category/${categoryId}`).then((response) => response.data);

// ** Rutas Privadas (requieren autenticación) **
export const getProductsByUser = (userId) =>
    api.get(`/products/user/${userId}`).then((response) => response.data);

export const createProduct = (productData) =>
    api.post("/products", productData).then((response) => response.data);

export const updateProductById = (id, productData) =>
    api.put(`/products/${id}`, productData).then((response) => response.data);

export const deleteProductById = (id) =>
    api.delete(`/products/${id}`).then((response) => response.data);

export const changeProductStatus = (id, status) =>
    api.patch(`/products/${id}/status`, { status }).then((response) => response.data);

export const getProductsBySubcategory = (subcategoryId) =>
    api.get(`/products/subcategory/${subcategoryId}`).then((response) => response.data);

