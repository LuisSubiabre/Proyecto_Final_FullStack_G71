import { useContext, useEffect, useState } from "react";
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

// Componentes internos
import DropdownMenuComponent from "./DropdownMenu.jsx";
import Search from "../filter/Search.jsx";
import Icon from "../Icons.jsx";
import UserMenu from "./UserMenu.jsx";

// Contextos
import CartContext from "../../context/CartContext.jsx";
import { AuthContext } from "../../context/authContext.jsx";

// Servicio para obtener el usuario por ID
import { getUserById } from "../../service/user.js";

export default function Navbar() {
  const { userId } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalQuantity } = useContext(CartContext);

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((response) => {
          if (response.success && response.data) {
            setUserRole(response.data.role);
            setUserData(response.data);
          } else {
            setUserRole(null);
            setUserData(null);
          }
        })
        .catch((error) => {
          console.error("Error al obtener el role del usuario:", error);
          setUserRole(null);
          setUserData(null);
        });
    } else {
      setUserRole(null);
      setUserData(null);
    }
  }, [userId]);

  return (
    <div>
      <NextUINavbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="bg-[--color-primary-dark] border-b-0 z-50"
        position="sticky"
      >
        <NavbarContent>
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
          {/* Se pasan role, userName, userEmail y profilePic al UserMenu */}
          <UserMenu
            role={userRole}
            userName={userData?.username}
            userEmail={userData?.email}
            profilePic={userData?.url_img_profile}
            userId={userId}
          />
        </NavbarContent>

        <NavbarContent justify="end">
          <Tooltip content="Ver carrito de compras" position="bottom">
            <Link
              to={userId ? "/shopping-cart" : "#"}
              className={userId ? "" : "pointer-events-none opacity-50"}
            >
              <Badge content={getTotalQuantity()} color="primary" overlap>
                <Icon
                  name="cart"
                  size="2xl"
                  className="hover:text-[--color-highlight] transition-all"
                />
              </Badge>
            </Link>
          </Tooltip>
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem>
            {/* Aquí se pueden mapear las categorías */}
          </NavbarMenuItem>
        </NavbarMenu>
      </NextUINavbar>
      <div className="w-full hidden md:flex bg-[--color-background-light] py-1 border-b-4 border-[--color-primary-dark]">
        <DropdownMenuComponent />
      </div>
    </div>
  );
}
