import { useState, useEffect } from "react";
import {
    Input,
    Button,
    Textarea,
    Card,
    Spinner,
    Alert,
    Select,
    SelectItem
} from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import useCategories from "../../../hook/useCategories.jsx";
import useAuth from "../../../hook/useAuth.jsx";
import { createProduct } from "../../../service/productService.js";

const MAX_NAME_LENGTH = 255;
const MAX_BRAND_LENGTH = 50;
const MAX_PRICE = 999999.99;

const CustomInput = ({ label, type = "text", isRequired = true, maxLength, max, ...props }) => {
    return (
        <Input
            max={max}
            maxLength={maxLength}
            isRequired={isRequired}
            clearable
            type={type}
            label={label}
            variant="bordered"
            color="secondary"
            classNames={{
                label: "font-medium text-black",
                input: "text-black",
            }}
            css={{
                "& input": { color: "black !important" },
                "& input::placeholder": { color: "black !important" },
            }}
            {...props}
        />
    );
};




const NewPublication = () => {
    const { menus, loading, error } = useCategories();
    const { userId } = useAuth();
    const [formData, setFormData] = useState({
        name_product: "",
        description: "",
        brand: "",
        price: "",
        quantity: "",
        category_id: "",
        subcategory_id: "",
        image_url: "",
    });
    const [selectedCategory, setSelectedCategory] = useState("");
    const [availableSubcategories, setAvailableSubcategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [formError, setFormError] = useState("");
    const [publishStatus, setPublishStatus] = useState("idle");

    useEffect(() => {
        if (selectedCategory) {
            const category = menus.find((menu) => String(menu.id) === selectedCategory);
            setAvailableSubcategories(category ? category.items : []);
        } else {
            setAvailableSubcategories([]);
        }
    }, [selectedCategory, menus]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "price") {
            if (value === "") {
                setFormData((prev) => ({ ...prev, price: "" }));
                return;
            }
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue) && numericValue > MAX_PRICE) {
                setFormData((prev) => ({ ...prev, price: MAX_PRICE }));
                return;
            }
        }
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCategoryChange = (keySet) => {
        const key = Array.from(keySet)[0] || "";
        setSelectedCategory(key);
        setFormData((prev) => ({
            ...prev,
            category_id: key,
            subcategory_id: "",
        }));
    };

    const handleSubcategoryChange = (keySet) => {
        const key = Array.from(keySet)[0] || "";
        setFormData((prev) => ({
            ...prev,
            subcategory_id: key,
        }));
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setFormError("");
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [],
        },
        maxSize: 3 * 1024 * 1024, // 3MB
        multiple: false,
        onDropRejected: (fileRejections) => {
            fileRejections.forEach((file) => {
                const { errors } = file;
                errors.forEach((error) => {
                    if (error.code === "file-too-large") {
                        setFormError("El archivo excede los 3MB");
                    } else if (error.code === "file-invalid-type") {
                        setFormError("Solo se permiten imágenes");
                    }
                });
            });
        },
    });

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw new Error("Error al subir la imagen");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        setPublishStatus("loading");
        try {
            if (!imageFile) {
                throw new Error("Debes subir una imagen del producto.");
            }
            const imageUrl = await uploadToCloudinary(imageFile);
            const productData = {
                ...formData,
                image_url: imageUrl,
                user_id: userId,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity),
                category_id: parseInt(formData.category_id),
                subcategory_id: parseInt(formData.subcategory_id),
            };

            await createProduct(productData);
            setPublishStatus("success");

            setFormData({
                name_product: "",
                description: "",
                brand: "",
                price: "",
                quantity: "",
                category_id: "",
                subcategory_id: "",
                image_url: "",
            });
            setImageFile(null);
            setPreviewUrl("");
            setSelectedCategory("");

            setTimeout(() => {
                setPublishStatus("idle");
            }, 5000);
        } catch (error) {
            setFormError(error.message || "Error al publicar el producto");
            setPublishStatus("idle");
        }
    };

    if (loading)
        return (
            <div className="text-center p-52 m-14 font-epilogue text-2xl text-[var(--color-primary-dark)]">
                Espera un momento, cargando el formulario...
            </div>
        );
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-md bg-slate-200 font-epilogue text-black m-2">
            <h1 className="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">
                Publica tus productos
            </h1>
            {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <CustomInput
                    label="Nombre del producto"
                    name="name_product"
                    value={formData.name_product}
                    onChange={handleInputChange}
                    maxLength={MAX_NAME_LENGTH}
                />
                <CustomInput
                    label="Marca"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    maxLength={MAX_BRAND_LENGTH}
                />
                <CustomInput
                    label="Precio"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    max={MAX_PRICE}
                />
                <CustomInput
                    label="Cantidad"
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                />
                <div className="flex flex-col">
                    <Select
                        isRequired
                        variant="bordered"
                        color="secondary"
                        label="Categoría principal"
                        placeholder="Selecciona una categoría"
                        selectedKeys={formData.category_id ? new Set([formData.category_id]) : new Set()}
                        onSelectionChange={handleCategoryChange}
                    >
                        {menus.map((category) => (
                            <SelectItem key={String(category.id)} value={String(category.id)}>
                                {category.title}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col">
                    <Select
                        isRequired
                        variant="bordered"
                        color="secondary"
                        label="Subcategoría"
                        placeholder="Selecciona una subcategoría"
                        selectedKeys={formData.subcategory_id ? new Set([formData.subcategory_id]) : new Set()}
                        onSelectionChange={handleSubcategoryChange}
                        disabled={!selectedCategory}
                    >
                        {availableSubcategories.map((sub) => (
                            <SelectItem key={String(sub.id)} value={String(sub.id)}>
                                {sub.title}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <Textarea
                    isRequired
                    maxLength={180}
                    color="secondary"
                    label="Descripción del producto"
                    placeholder="Detalles, especificaciones técnicas, uso recomendado..."
                    rows={4}
                    variant="bordered"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="sm:col-span-2"
                    classNames={{
                        label: "font-medium text-black",
                    }}
                />
                <div className="flex flex-col sm:col-span-2">
                    <label htmlFor="imageUpload" className="mb-2 font-medium">
                        Sube una imagen de tu producto
                    </label>
                    <Card bordered className="bg-white p-4 shadow-sm">
                        <div
                            {...getRootProps()}
                            className="border-dashed border-2 border-gray-400 p-4 text-center cursor-pointer hover:border-gray-500 transition-colors"
                        >
                            <input {...getInputProps()} />
                            <p className="text-gray-600">
                                Arrastra una imagen aquí o haz clic para seleccionar un archivo.
                                (Solo imágenes, máximo 3MB)
                            </p>
                        </div>
                        {imageFile && (
                            <div className="mt-4">
                                <p className="text-sm font-medium">
                                    Archivo seleccionado: {imageFile.name} (
                                    {(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                                </p>
                                {previewUrl && (
                                    <img
                                        src={previewUrl}
                                        alt="Previsualización"
                                        className="w-80 h-80 mt-2 object-cover mx-auto rounded-sm"
                                    />
                                )}
                            </div>
                        )}
                    </Card>
                    {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
                </div>
                <div className="flex sm:col-span-2 justify-end">
                    <Button
                        type="submit"
                        color="primary"
                        size="md"
                        disabled={publishStatus !== "idle"}
                        className="w-full bg-[var(--color-highlight)] text-white hover:bg-white hover:text-[var(--color-highlight)] border-[1.5px] border-[var(--color-highlight)]"
                    >
                        {publishStatus === "idle" && "Publicar"}
                        {publishStatus === "loading" && (
                            <>
                                <Spinner size="sm" color="white" /> Cargando producto...
                            </>
                        )}
                        {publishStatus === "success" && (
                            <>
                                ✅ Producto publicado con éxito 🎉
                            </>
                        )}
                    </Button>
                </div>
                {publishStatus === "success" && (
                    <div className="sm:col-span-2">
                        <Alert variant="solid" color="primary">
                            Puedes ver tu producto publicado accediendo al menú de usuario en la opción de publicaciones.
                        </Alert>
                    </div>
                )}
            </form>
        </div>
    );
};

export default NewPublication;
