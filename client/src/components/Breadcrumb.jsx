import { Breadcrumbs, BreadcrumbItem, Tooltip } from "@nextui-org/react";
import Icon from "./Icons";
import useCategories from "../hook/useCategories.jsx";

const Breadcrumb = ({ categoryName, categoryId }) => {
    const { menus, loading, error } = useCategories();

    const findCategoryPath = (name, id) => {
        let path = [
            { label: "Home", href: "/", icon: "home" }
        ];

        const menu = menus.find((menu) => menu.id === id);

        if (menu) {
            path.push({ label: menu.title, href: `/category/${id}` });
            if (menu.items.includes(name)) {
                path.push({ label: name, href: `/category/${id}/${name}` });
            }
        }

        return path;
    };

    if (loading) {
        return <p className="text-center">Cargando categorías...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    const categoryPath = findCategoryPath(categoryName, categoryId);

    return (
        <>
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
                    const isDisabled = index === 1; // Desactivar el segundo botón

                    return (
                        <BreadcrumbItem
                            key={index}
                            href={!isDisabled ? item.href : undefined}
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

            <div className="m-2">
                <p className="text-[var(--color-neutral-dark)] font-epilogue">
                    ¡Encuentra todo lo que necesitas para la vuelta a clases en Librería Alas de Alondra!
                    Nuestro catálogo incluye, <strong className="text-[var(--color-primary-dark)]">{categoryName}</strong>
                    de las marcas más reconocidas como Artel, Jm, Jovi, Maped, Pentel, Stabilo y más.
                    ¡Haz de este regreso a clases algo único con nuestros productos de calidad!
                </p>
            </div>
        </>
    );
};

export default Breadcrumb;

