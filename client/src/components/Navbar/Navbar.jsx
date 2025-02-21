import { useContext, useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Image,
  Tooltip,
  Badge,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import DropdownMenuComponent from "./DropdownMenu.jsx";
import Search from "../filter/Search.jsx";
import Icon from "../Icons.jsx";
import UserMenu from "./UserMenu.jsx";
import MobileMenu from "./MobileMenu.jsx";
import CartContext from "../../context/CartContext.jsx";
import { AuthContext } from "../../context/authContext.jsx";
import { ProfileContext } from "../../context/profileContext.jsx";

export default function Navbar() {
  const { userId } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalQuantity } = useContext(CartContext);
  const { username, email, avatar, role } = useContext(ProfileContext);

  return (
    <div>
      <NextUINavbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="bg-[--color-primary-dark] border-b-0 z-50"
        position="sticky"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Tooltip content="Regresar a inicio">
              <Link to="/">
                <Image
                  isBlurred
                  alt="logo"
                  className="w-[200px] h-16 hover:animate-pulse hover:scale-110 transition-all ml-20 sm:ml-0"
                  src="https://res.cloudinary.com/libreriaalondra/image/upload/v1727986358/logo_sin_fondo_o6f8m0.png"
                />
              </Link>
            </Tooltip>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="center" className="hidden sm:flex w-96">
          <Search />
        </NavbarContent>

        <NavbarContent justify="end" className="hidden sm:flex">
          <UserMenu
            role={role}
            userName={username}
            userEmail={email}
            profilePic={avatar}
            userId={userId}
          />
        </NavbarContent>

        <NavbarContent justify="end">
          <Tooltip
            content={
              !userId
                ? "Debes iniciar sesión para añadir productos"
                : "Ver carrito de compras"
            }
            position="bottom"
          >
            <Link
              to={userId ? "/shopping-cart" : "#"}
              className={userId ? "" : " opacity-50"}
            >
              <Badge content={getTotalQuantity()} color="primary" overlap="true">
                <Icon
                  name="cart"
                  size="2xl"
                  className="hover:text-[--color-highlight] transition-all"
                />
              </Badge>
            </Link>
          </Tooltip>

        </NavbarContent>

        <NavbarMenu className="mt-14">
          <NavbarMenuItem>
            <MobileMenu closeMenu={() => setIsMenuOpen(false)} />
          </NavbarMenuItem>
        </NavbarMenu>
      </NextUINavbar>

      <div className="w-full flex md:hidden justify-center bg-[--color-background-light] py-1 border-b-4 border-[--color-primary-dark]">
        <Search />
      </div>

      <div className="w-full hidden md:flex bg-[--color-background-light] py-1 border-b-4 border-[--color-primary-dark]">
        <DropdownMenuComponent />
      </div>
    </div>
  );
}
