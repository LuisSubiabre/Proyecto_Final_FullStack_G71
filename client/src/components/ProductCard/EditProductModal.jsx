import { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { useDisclosure } from "@heroui/react";

const EditProductModal = ({
    formData,
    handleInputChange,
    handleStatusChange,
    handleCategoryChange,
    handleSubcategoryChange,
    categories,
    availableSubcategories,
    getRootProps,
    getInputProps,
    previewUrl,
    handleUpdateSubmit,
    onClose,
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    return (
        <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={isOpen}
            onOpenChange={(open) => {
                onOpenChange(open);
                if (!open) {
                    onClose();
                }
            }}
            size="lg"
            placement="top"
        >
            <ModalContent>
                {(close) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Editar Publicación
                        </ModalHeader>
                        <ModalBody>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    setIsLoading(true);
                                    await handleUpdateSubmit(e);
                                    setIsLoading(false);
                                    close();
                                }}
                                className="flex flex-col gap-4"
                            >
                                <label className="block">
                                    Nombre del Producto:
                                    <input
                                        className="border p-2 w-full"
                                        name="name_product"
                                        value={formData.name_product}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label className="block">
                                    Descripción:
                                    <textarea
                                        className="border p-2 w-full h-24 resize-none"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label className="block">
                                    Marca:
                                    <input
                                        className="border p-2 w-full"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label className="block">
                                    Precio:
                                    <input
                                        className="border p-2 w-full"
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label className="block">
                                    Cantidad:
                                    <input
                                        className="border p-2 w-full"
                                        name="quantity"
                                        type="number"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                {/* Select de Categoría */}
                                <label className="block">
                                    Categoría:
                                    <select
                                        className="border p-2 w-full"
                                        value={formData.category_id}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id.toString()}>
                                                {cat.title}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {/* Select de Subcategoría */}
                                <label className="block">
                                    Subcategoría:
                                    <select
                                        className="border p-2 w-full"
                                        value={formData.subcategory_id}
                                        onChange={(e) => handleSubcategoryChange(e.target.value)}
                                        required
                                        disabled={!availableSubcategories.length}
                                    >
                                        <option value="">Selecciona una subcategoría</option>
                                        {availableSubcategories.map((sub) => (
                                            <option key={sub.id} value={sub.id.toString()}>
                                                {sub.title}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {/* Sección de imagen */}
                                <div className="flex flex-col">
                                    <label className="font-medium mb-2">
                                        Imagen del Producto
                                    </label>
                                    <div
                                        {...getRootProps()}
                                        className="border-dashed border-2 border-gray-400 p-4 text-center cursor-pointer hover:border-gray-500 transition-colors"
                                    >
                                        <input {...getInputProps()} />
                                        <p className="text-gray-600">
                                            Arrastra una imagen o haz clic para seleccionar (máx 3MB)
                                        </p>
                                    </div>
                                    {previewUrl && (
                                        <img
                                            src={previewUrl}
                                            alt="Previsualización"
                                            className="w-80 h-80 object-cover mt-2 mx-auto rounded-sm"
                                        />
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="status" className="font-semibold">
                                        Estado:
                                    </label>
                                    <input
                                        id="status"
                                        type="checkbox"
                                        checked={formData.status}
                                        onChange={handleStatusChange}
                                    />
                                </div>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Cargando..." : "Guardar cambios"}
                                </Button>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={close}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditProductModal;
