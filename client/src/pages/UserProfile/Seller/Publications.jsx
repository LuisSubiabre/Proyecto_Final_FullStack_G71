import { useState } from "react";
import { Input, Button, Textarea, Card } from "@nextui-org/react";
import { useDropzone } from "react-dropzone";

const CustomInput = ({ label, type = "text", isRequired = true, ...props }) => {
    return (
        <Input
            isRequired={isRequired}
            clearable
            type={type}
            label={label}
            variant="bordered"
            classNames={{
                label: "font-medium text-black",
            }}
            color="secondary"
            {...props}
        />
    );
};

const NewPublication = () => {
    const [categories, setCategories] = useState(["Escolar", "Oficina"]);
    const [categoryInput, setCategoryInput] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [formError, setFormError] = useState("");

    const handleAddCategory = () => {
        if (categoryInput.trim() && !categories.includes(categoryInput)) {
            setCategories([...categories, categoryInput.trim()]);
            setCategoryInput("");
        }
    };

    const handleRemoveCategory = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
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
                        alert("El archivo excede los 3MB");
                    } else if (error.code === "file-invalid-type") {
                        alert("Solo se permiten imágenes");
                    }
                });
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar si la imagen está presente
        if (!imageFile) {
            setFormError("Debes subir una imagen del producto.");
            return;
        }

        setFormError(""); // Limpiar errores
        alert("Formulario enviado correctamente 🎉");
        // Aquí  agregamos las funciones para subir al back
    };

    return (
        <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-md bg-slate-200 font-epilogue text-black m-2">
            <h1 className="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">
                Publica tus productos
            </h1>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <CustomInput label="Nombre del producto" />
                <CustomInput label="Nombre detallado del producto" />
                <CustomInput label="Valor por unidad" type="number" />
                <Textarea
                    isRequired
                    color="secondary"
                    label="Detalles del producto"
                    placeholder="quién lo puede usar, ficha técnica"
                    rows={4}
                    variant="bordered"
                    classNames={{
                        label: "font-medium text-black",
                    }}
                />
                <CustomInput label="Cantidad en existencia" type="number" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <CustomInput
                            label="Añade una o más categorías"
                            isRequired={false}
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                        />
                        <Button auto onPress={handleAddCategory} color="primary">
                            +
                        </Button>
                    </div>
                    <ul className="mt-2">
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mt-2"
                            >
                                {category}
                                <Button
                                    auto
                                    flat
                                    color="error"
                                    onPress={() => handleRemoveCategory(index)}
                                >
                                    -
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col sm:col-span-2">
                    <label htmlFor="imageUpload" className="mb-2 font-medium">
                        Sube una imagen de tu producto
                    </label>
                    <Card bordered className="bg-slate-400 p-4">
                        <div
                            {...getRootProps()}
                            className="border-dashed border-2 border-gray-400 p-4 text-center cursor-pointer"
                        >
                            <input {...getInputProps()} />
                            <p>
                                Arrastra una imagen aquí o haz clic para seleccionar un archivo.
                                (Solo imágenes, máximo 3MB)
                            </p>
                        </div>
                        {imageFile && (
                            <div className="mt-4">
                                <p className="text-sm font-medium">
                                    Archivo seleccionado: {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                                </p>
                                {previewUrl && (
                                    <img
                                        src={previewUrl}
                                        alt="Previsualización"
                                        className="w-32 h-32 mt-2 object-cover mx-auto"
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
                        color="error"
                        size="xs"
                        className="w-full bg-[var(--color-highlight)] text-white hover:bg-white hover:text-[var(--color-highlight)] border-[1.5px] border-[var(--color-highlight)]">
                        Publicar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewPublication;
