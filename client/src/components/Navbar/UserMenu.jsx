import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Icon from "../Icons";
import menuData from "../../data/menuData.json";
import useAuth from "../../hook/useAuth";

const UserMenu = ({ role, userName, userEmail, profilePic }) => {
  const { logout } = useAuth();

  if (!role) {
    return (
      <div className="flex items-center space-x-2 md:space-x-1 sm:space-x-0">
        <div className="flex flex-col items-center">
          <Link
            to="/login"
            className="lg:text-[20px] md:text-[16px] sm:text-[10px] hover:underline font-oswald hover:text-[--color-primary-light]"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="lg:text-[12px] md:text-[10px] sm:text-[6px] hover:underline font-arvo hover:text-[--color-primary-light]"
          >
            ¿No tienes cuenta?
          </Link>
        </div>
        <img
          src="https://res.cloudinary.com/libreriaalondra/image/upload/v1727986331/icono_inicio_sesion_l2ekm0.png"
          alt="User Icon"
          className="md:h-13 md:w-11 lg:h-16 lg:w-20 sm:h-10 sm:w-8"
        />
      </div>
    );
  }

  // Se obtiene la data base del menú según el role
  let userDataJson = menuData[role];

  const avatarUrl = profilePic ? profilePic : userDataJson.avatar;

  if (role === "user") {
    userDataJson = {
      ...userDataJson,
      menu: userDataJson.menu.map((item) =>
        item.id === "user-settings" ? { ...item, link: `/profile-user` } : item
      ),
    };
  } else if (role === "seller") {
    userDataJson = {
      ...userDataJson,
      menu: userDataJson.menu.map((item) =>
        item.id === "seller-settings"
          ? { ...item, link: `/profile-seller` }
          : item
      ),
    };
  } else if (role === "admin") {
    userDataJson = {
      ...userDataJson,
      menu: userDataJson.menu.map((item) =>
        item.id === "admin-settings"
          ? { ...item, link: `/profile-admin` }
          : item
      ),
    };
  }

  return (
    <div className="flex items-center space-x-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: avatarUrl,
            }}
            className="transition-transform"
            description={userEmail || "Sin correo"}
            name={userName || "Sin nombre"}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User Actions"
          variant="faded"
          color="secondary"
        >
          {userDataJson.menu.map((item) => (
            <DropdownItem
              key={item.id}
              className="flex items-center"
              textValue={item.label}
              onPress={() => {
                if (item.link === "/logout") {
                  logout();
                }
              }}
            >
              {item.link === "/logout" ? (
                <span className="flex items-center w-full cursor-pointer">
                  <Icon
                    name={item.icon}
                    className="w-5 h-5 text-[--color-primary-dark] mr-3"
                  />
                  {item.label}
                </span>
              ) : (
                <Link to={item.link} className="flex items-center w-full">
                  <Icon
                    name={item.icon}
                    className="w-5 h-5 text-[--color-primary-dark] mr-3"
                  />
                  {item.label}
                </Link>
              )}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
