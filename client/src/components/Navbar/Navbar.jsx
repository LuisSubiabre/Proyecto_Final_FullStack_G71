import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Image,
} from "@nextui-org/react";
import DropdownMenuComponent from "./DropdownMenu.jsx";
import UserLogged from "./UserLogged.jsx";
import Search from "../filter/Search.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div>
            <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className=" bg-[--color-primary-dark] border-b-0">
                <NavbarContent >
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        <Image
                            isBlurred
                            alt="logo"
                            className="w-[200px] h-16"
                            src="https://res.cloudinary.com/dxxrdckad/image/upload/v1727986358/logo_sin_fondo_o6f8m0.png"
                        />
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent justify="center" className="hidden sm:flex w-96">
                    <Search />
                </NavbarContent>

                <NavbarContent justify="end" className="hidden sm:flex">
                    <UserLogged />
                </NavbarContent>

                <NavbarContent  justify="end">
                <FontAwesomeIcon icon={faCartPlus} className="w-10 h-10" />
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
