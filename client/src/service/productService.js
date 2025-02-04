import api from "../api/config.js";

// ** Rutas Públicas **
export const searchProductsByDescription = (description) =>
    api.get("/search", { params: { description } }).then((response) => response.data);

export const getAllProducts = () =>
    api.get("/").then((response) => response.data);

export const getProductById = (id) =>
    api.get(`/${id}`).then((response) => response.data);

export const getProductsByCategory = (categoryId) =>
    api.get(`/category/${categoryId}`).then((response) => response.data);

// ** Rutas Privadas (requieren autenticación) **
export const getProductsByUser = (userId) =>
    api.get(`/user/${userId}`).then((response) => response.data);

export const createProduct = (productData) =>
    api.post("/", productData).then((response) => response.data);

export const updateProductById = (id, productData) =>
    api.put(`/${id}`, productData).then((response) => response.data);

export const deleteProductById = (id) =>
    api.delete(`/${id}`).then((response) => response.data);

export const changeProductStatus = (id, status) =>
    api.patch(`/${id}/status`, { status }).then((response) => response.data);
