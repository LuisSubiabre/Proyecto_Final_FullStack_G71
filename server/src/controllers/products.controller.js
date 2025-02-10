import {
    getAllProducts,
    getProductsId,
    getProductsCategoryId,
    getProductsByUsers,
    getProductsByDescription,
    createNewProduct,
    updateProducts,
    deleteProducts,
    statusProducts,
    getProductsBySubcategoryId
} from "../models/products.model.js";

// Respuestas estándar para el cliente
const createResponse = (res, data, message, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

// Obtener todos los productos
const getAllProductsController = async (req, res, next) => {
    try {
        const products = await getAllProducts();
        createResponse(res, products, "Productos obtenidos correctamente");
    } catch (error) {
        next(error);
    }
};

// Obtener un producto por ID
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await getProductsId(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Producto no encontrado",
            });
        }
        createResponse(res, product, "Producto obtenido correctamente");
    } catch (error) {
        next(error);
    }
};

// Obtener productos por categoría
const getProductsByCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const products = await getProductsCategoryId(categoryId);
        createResponse(res, products, "Productos de la categoría obtenidos correctamente");
    } catch (error) {
        next(error);
    }
};

// Obtener productos por usuario
const getProductsByUser = async (req, res, next) => {
    try {
        const { id: user_id } = req.params;
        console.log("ID de usuario recibido:", user_id);

        const products = await getProductsByUsers(user_id);
        createResponse(res, products, "Productos del usuario obtenidos correctamente");
    } catch (error) {
        console.error("Error detectado en el controlador:", error);
        res.status(500).json({
            success: false,
            error: "Error interno del servidor",
            details: error.message,
        });
    }
};


// Buscar productos por descripción
const searchProductsByDescription = async (req, res, next) => {
    try {
        const { description } = req.query;
        console.log("Descripción recibida:", description);
        if (!description) {
            return res.status(400).json({
                success: false,
                message: "El parámetro 'description' es requerido",
            });
        }
        const products = await getProductsByDescription(description);
        createResponse(res, products, "Productos encontrados por descripción");
    } catch (error) {
        console.error("Error al buscar productos:", error);
        res.status(500).json({
            success: false,
            error: "Error interno al ejecutar la consulta",
            details: error.message,
        });
    }
};


// Crear un nuevo producto
const createProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        if (productData.status === undefined) {
            productData.status = true;
        }

        const newProduct = await createNewProduct(productData);
        if (newProduct) {
            newProduct.status = newProduct.status === 't';
        }

        createResponse(res, newProduct, "Producto creado correctamente", 201);
    } catch (error) {
        next(error);
    }
};


// Actualizar un producto
const updateProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productData = req.body;

        const updatedProduct = await updateProducts(id, productData);
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                error: "Producto no encontrado para actualizar",
            });
        }
        updatedProduct.status = updatedProduct.status === 't';

        createResponse(res, updatedProduct, "Producto actualizado correctamente");
    } catch (error) {
        next(error);
    }
};


// Eliminar un producto
const deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await deleteProducts(id);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                error: "Producto no encontrado para eliminar",
            });
        }
        createResponse(res, null, "Producto eliminado correctamente", 200);
    } catch (error) {
        next(error);
    }
};

// Cambiar el estado de un producto
const changeProductStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedStatus = await statusProducts(id, status);

        if (!updatedStatus) {
            return res.status(404).json({
                success: false,
                error: "Producto no encontrado para cambiar el estado",
            });
        }
        updatedStatus.status = updatedStatus.status === 't' || updatedStatus.status === true;
        createResponse(res, updatedStatus, "Estado del producto actualizado correctamente");
    } catch (error) {
        next(error);
    }
};

// Obtener productos por subcategoría
const getProductsBySubcategory = async (req, res, next) => {
    try {
        const { subcategoryId } = req.params;
        const products = await getProductsBySubcategoryId(subcategoryId);
        createResponse(res, products, "Productos de la subcategoría obtenidos correctamente");
    } catch (error) {
        next(error);
    }
};


const productController = {
    getAllProductsController,
    getProductById,
    getProductsByCategory,
    getProductsByUser,
    searchProductsByDescription,
    createProduct,
    updateProductById,
    deleteProductById,
    changeProductStatus,
    getProductsBySubcategory,
};

export default productController;