import { Breadcrumbs, BreadcrumbItem, Tooltip, Skeleton } from "@nextui-org/react";
import Icon from "./Icons";
import useCategories from "../hook/useCategories.jsx";
import { useParams } from "react-router-dom";

const Breadcrumb = ({ categoryName, categoryId, subcategoryName: propSubcategoryName, productName }) => {
    const { menus, loading, error } = useCategories();
    const { subcategoryId } = useParams();

    // Busca el nombre de la subcategoría si no se pasa como prop
    const findSubcategoryName = (id) => {
        if (!id) return null;
        for (const menu of menus) {
            const subcategory = menu.items.find((item) => item.id === parseInt(id, 10));
            if (subcategory) return subcategory.title;
        }
        return null;
    };

    const effectiveSubcategoryName = propSubcategoryName || findSubcategoryName(subcategoryId);

    // Construye el array de migas de pan, deshabilitando categoría y producto
    const findCategoryPath = (categoryName, categoryId, effectiveSubcategoryName, productName) => {
        let path = [
            { label: "Home", href: "/", icon: "home" },
        ];

        const menu = menus.find((menu) => menu.id === categoryId);
        if (menu) {
            // Categoría sin enlace
            path.push({ label: menu.title, href: null });

            // Subcategoría con enlace (si quieres deshabilitarla también, pon href: null)
            if (effectiveSubcategoryName) {
                path.push({
                    label: effectiveSubcategoryName,
                    href: `/category/${categoryId}/${subcategoryId || ""}`,
                });
            }

            // Producto sin enlace
            if (productName) {
                path.push({ label: productName, href: null });
            }
        }

        return path;
    };

    if (loading) {
        return <Skeleton className="w-full rounded-lg h-16 m-1" />;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    const categoryPath = findCategoryPath(
        categoryName,
        categoryId,
        effectiveSubcategoryName,
        productName
    );

    return (
        <>
            {/* Breadcrumb de NextUI */}
            <Breadcrumbs
                className="mt-4"
                classNames={{
                    list: "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-small p-4 rounded-lg",
                }}
                itemClasses={{
                    item: "text-white/60 data-[current=true]:text-white hover:underline",
                    separator: "text-white/40",
                }}
                underline="hover"
                variant="solid"
            >
                {categoryPath.map((item, index) => {
                    // Si no tiene href, se considera deshabilitado
                    const isDisabled = !item.href;
                    return (
                        <BreadcrumbItem
                            key={index}
                            href={item.href || undefined}
                            current={index === categoryPath.length - 1}
                        >
                            {item.icon && <Icon name={item.icon} className="mr-2" />}
                            {isDisabled ? (
                                <Tooltip content="Este enlace está deshabilitado por el momento" placement="top">
                                    <span className="opacity-50 cursor-not-allowed">{item.label}</span>
                                </Tooltip>
                            ) : (
                                item.label
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </Breadcrumbs>

            {/* Texto descriptivo un poco más largo */}
            <div className="m-2">
                <p className="text-[var(--color-neutral-dark)] font-epilogue">
                    {categoryName
                        ? `Explora los mejores productos en ${categoryName}`
                        : "Explora nuestros mejores productos"}
                    {effectiveSubcategoryName && ` / ${effectiveSubcategoryName}`}.
                    {" "}
                    Descubre nuestra variedad de artículos cuidadosamente seleccionados
                    para llevar creatividad y eficiencia a tu día a día. 
                    <span className="font-bold font-oswald animate-text-color-change text-lg"> {productName && ` Detalle: ${productName}.`} </span>
                </p>
            </div>
        </>
    );
};

export default Breadcrumb;
