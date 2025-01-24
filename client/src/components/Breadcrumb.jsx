import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import categoriesData from "../data/menuCategories.json";
import Icon from "./Icons";

const Breadcrumb = ({ categoryName, categoryId }) => {
    const findCategoryPath = (name, id) => {
        let path = [
            { label: "Home", href: "/", icon: "home" } // Agregar el icono de Home
        ];
        const menu = categoriesData.menus.find((menu) => menu.id === id);

        if (menu) {
            path.push({ label: menu.title, href: `/category/${id}` });
            if (menu.items.includes(name)) {
                path.push({ label: name, href: `/category/${id}/${name}` });
            }
        }
        return path;
    };

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
                {categoryPath.map((item, index) => (
                    <BreadcrumbItem
                        key={index}
                        href={item.href}
                        current={index === categoryPath.length - 1}
                    >
                        {/* Renderizar el icono solo para Home */}
                        {item.icon && <Icon name={item.icon} className="mr-2" />}
                        {item.label}
                    </BreadcrumbItem>
                ))}
            </Breadcrumbs>
            <div className="m-2">
                <p className="text-[var(--color-neutral-dark)] font-epilogue">
                    ¡Encuentra todo lo que necesitas para la vuelta a clases en Librería Alas de Alondra!
                    Nuestro catálogo incluye,  <strong className="text-[var(--color-primary-dark)]">{categoryName}</strong> de las marcas más reconocidas como Artel, Jm, Jovi, Maped,
                    Pentel, Stabilo y más. ¡Haz de este regreso a clases algo único con nuestros productos de calidad!
                </p>
            </div>
        </>
    );
};

export default Breadcrumb;
