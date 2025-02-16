import { useState, useEffect } from "react";
import { Card, Button, Alert } from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import {
    getProductsByUser,
    updateProductById,
    deleteProductById,
} from "../../../service/productService.js";
import useAuth from "../../../hook/useAuth.jsx";
import useCategories from "../../../hook/useCategories.jsx";
import EditProductModal from "../../../components/ProductCard/EditProductModal.jsx";

const SellerPublicactions = () => {
    const { userId } = useAuth();
    const { menus } = useCategories();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [notification, setNotification] = useState({
        visible: false,
        message: "",
        type: "success",
    });

    const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const [formData, setFormData] = useState({
        id: null,
        name_product: "",
        description: "",
        brand: "",
        price: "",
        quantity: "",
        category_id: "",
        subcategory_id: "",
        status: false,
        user_id: userId,
        image_url: "",
    });

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [availableSubcategories, setAvailableSubcategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        if (userId) {
            getProductsByUser(userId)
                .then((data) => {
                    const prods = data.data;
                    if (Array.isArray(prods)) {
                        setProducts(prods);
                    } else if (prods) {
                        setProducts([prods]);
                    } else {
                        setProducts([]);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error al obtener las publicaciones:", error);
                    setLoading(false);
                });
        }
    }, [userId]);

    useEffect(() => {
        if (selectedCategory && menus.length > 0) {
            const category = menus.find(
                (menu) => menu.id === parseInt(selectedCategory)
            );
            setAvailableSubcategories(category ? category.items : []);
        } else {
            setAvailableSubcategories([]);
        }
    }, [selectedCategory, menus]);

    const handleEditClick = (product) => {
        setFormData({
            id: product.product_id,
            name_product: product.name_product,
            description: product.description,
            brand: product.brand,
            price: product.price.toString(),
            quantity: product.quantity.toString(),
            category_id: product.category_id.toString(),
            subcategory_id: product.subcategory_id.toString(),
            status:
                product.status === true ||
                product.status === "true" ||
                product.status === "t",
            user_id: userId,
            image_url: product.image_url,
        });
        setSelectedCategory(product.category_id.toString());
        setPreviewUrl(product.image_url);
        setImageFile(null);
        setEditModalVisible(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (e) => {
        setFormData((prev) => ({ ...prev, status: e.target.checked }));
    };


    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setFormData((prev) => ({
            ...prev,
            category_id: value,
            subcategory_id: "",
        }));
    };

    // Selección de subcategoría
    const handleSubcategoryChange = (value) => {
        setFormData((prev) => ({ ...prev, subcategory_id: value }));
    };

    // Configuración de dropzone para imagen
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxSize: 3 * 1024 * 1024,
        multiple: false,
    });

    const uploadToCloudinary = async (file) => {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: "POST", body: form }
            );
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Error al subir la imagen a Cloudinary:", error);
            throw new Error("Error al subir la imagen");
        }
    };

    // Actualiza la publicación
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const productId = Number(formData.id);
            if (!productId) throw new Error("Producto no seleccionado");

            let imageUrl = formData.image_url;
            if (imageFile) {
                imageUrl = await uploadToCloudinary(imageFile);
            }
            const updatedData = {
                name_product: formData.name_product,
                description: formData.description,
                brand: formData.brand,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
                category_id: Number(formData.category_id),
                subcategory_id: Number(formData.subcategory_id),
                status: formData.status,
                user_id: Number(formData.user_id),
                image_url: imageUrl,
            };

            await updateProductById(productId, updatedData);

            setProducts((prev) =>
                prev.map((prod) =>
                    prod.product_id === productId ? { ...prod, ...updatedData } : prod
                )
            );

            setEditModalVisible(false);
            setImageFile(null);
            setNotification({
                visible: true,
                message: "Producto editado correctamente",
                type: "success",
            });
            setTimeout(() => {
                setNotification((prev) => ({ ...prev, visible: false }));
            }, 3000);
        } catch (error) {
            console.error("Error al actualizar la publicación:", error);
            setNotification({
                visible: true,
                message: "Error al actualizar el producto",
                type: "error",
            });
            setTimeout(() => {
                setNotification((prev) => ({ ...prev, visible: false }));
            }, 3000);
        }
    };

    const confirmDelete = (productId) => {
        setProductToDelete(productId);
        setDeleteAlertVisible(true);
    };

    const handleDeleteConfirmed = async () => {
        try {
            console.log("Eliminando producto con id:", productToDelete);
            await deleteProductById(productToDelete);
            setProducts((prev) =>
                prev.filter((prod) => prod.product_id !== productToDelete)
            );
        } catch (error) {
            console.error("Error al eliminar la publicación:", error);
        }
        setDeleteAlertVisible(false);
        setProductToDelete(null);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 font-oswald text-[var(--color-primary-light)]">Mis Publicaciones</h2>
            {notification.visible && (
                <Alert
                    hideIcon
                    color={notification.type}
                    description={notification.message}
                    title={notification.type === "success" ? "Éxito" : "Error"}
                    variant="solid"
                    className="mb-4"
                />
            )}

            {loading ? (
                <p>Cargando publicaciones...</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {products.map((product) => (
                        <Card key={product.product_id}  className="p-4 bg-white border border-purple-500 text-black hover:bg-[var(--color-secondary)]"  shadow="lg"  >
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <img
                                    src={product.image_url}
                                    alt={product.name_product}
                                    className="w-32 h-32 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold font-oswald text-[var(--color-primary-dark)]">
                                        {product.name_product}
                                    </h3>
                                    <p className="text-sm font-epilogue mt-1">{product.description}</p>
                                    <p>
                                        <strong>Marca:</strong> {product.brand}
                                    </p>
                                    <p>
                                        <strong>Precio:</strong> ${product.price}
                                    </p>
                                    <p>
                                        <strong>Cantidad:</strong> {product.quantity}
                                    </p>
                                    <p>
                                        <strong>Categoría:</strong> {product.category_id}
                                    </p>
                                    <p>
                                        <strong>Subcategoría:</strong> {product.subcategory_id}
                                    </p>
                                    <p>
                                        <strong>Estado:</strong>{" "}
                                        {product.status === true ||
                                            product.status === "true" ||
                                            product.status === "t"
                                            ? "Activo"
                                            : "Inactivo"}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button onPress={() => handleEditClick(product)} size="lg" color="primary">
                                        Editar
                                    </Button>
                                    <Button
                                        onPress={() => confirmDelete(product.product_id)}
                                        size="lg"
                                        color="danger"
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Renderiza el modal de edición */}
            {editModalVisible && (
                <EditProductModal
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleStatusChange={handleStatusChange}
                    handleCategoryChange={handleCategoryChange}
                    handleSubcategoryChange={handleSubcategoryChange}
                    categories={menus}
                    availableSubcategories={availableSubcategories}
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    previewUrl={previewUrl}
                    handleUpdateSubmit={handleUpdateSubmit}
                    onClose={() => setEditModalVisible(false)}
                />
            )}

            {/* Alerta de confirmación para eliminar */}
            {deleteAlertVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="w-full max-w-xs p-4 bg-white rounded">
                        <Alert
                            hideIcon
                            color="warning"
                            title="Confirmar Eliminación"
                            description="¿Estás segura de eliminar esta publicación?"
                            variant="faded"
                        />
                        <div className="mt-4 flex justify-end gap-2">
                            <Button size="sm" onClick={() => setDeleteAlertVisible(false)}>
                                Cancelar
                            </Button>
                            <Button size="sm" color="error" onClick={handleDeleteConfirmed}>
                                Confirmar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerPublicactions;
