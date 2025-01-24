import React, { useContext } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Image,
    Tooltip,
    Badge
} from "@nextui-org/react";
import { Link } from "react-router-dom";
// Componentes
import DropdownMenuComponent from "./DropdownMenu.jsx";
import Search from "../filter/Search.jsx";
import Icon from "../Icons.jsx";
import UserMenu from "./UserMenu.jsx";
// Contextos
import CartContext from "../../context/CartContext.jsx";


export default function App() {
    const userRole = "seller";
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { getTotalQuantity } = useContext(CartContext);

    return (
        <div>
            <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className=" bg-[--color-primary-dark] border-b-0 z-50" position="sticky">
                <NavbarContent >
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        <Tooltip content="Regresar a inicio">
                            <Link to="/">
                                <Image
                                    isBlurred
                                    alt="logo"
                                    className="w-[200px] h-16 hover:animate-pulse hover:scale-110 transition-all"
                                    src="https://res.cloudinary.com/dxxrdckad/image/upload/v1727986358/logo_sin_fondo_o6f8m0.png"
                                />
                            </Link>
                        </Tooltip>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent justify="center" className="hidden sm:flex w-96">
                    <Search />
                </NavbarContent>

                <NavbarContent justify="end" className="hidden sm:flex">
                    <UserMenu role={userRole} />
                </NavbarContent>

                <NavbarContent justify="end">
                    <Tooltip content="Ver carrito de compras" position="bottom">
                        <Link to="/shopping-cart">
                            <Badge content={getTotalQuantity()} color="primary" overlap>
                                <Icon name="cart" size="2xl" className="hover:text-[--color-highlight] transition-all" />
                            </Badge>
                        </Link>
                    </Tooltip>
                </NavbarContent>

                <NavbarMenu>
                    <NavbarMenuItem >
                        {/* aqui se mapea las categorias */}
                    </NavbarMenuItem>

                </NavbarMenu>
            </Navbar>
            <div
                className="w-full hidden md:flex  bg-[--color-background-light] py-1 border-b-4 border-[--color-primary-dark] "
            >
                <DropdownMenuComponent />
            </div>

        </div>
    );
}
