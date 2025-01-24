import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    User
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Icon from "../Icons";
import menuData from "../../data/menuData.json";

const UserMenu = ({ role }) => {
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
                    src="https://res.cloudinary.com/dxxrdckad/image/upload/v1727986331/icono_inicio_sesion_l2ekm0.png"
                    alt="User Icon"
                    className="md:h-13 md:w-11 lg:h-16 lg:w-20 sm:h-10 sm:w-8"
                />
            </div>
        );
    }

    const userData = menuData[role];

    return (
        <div className="flex items-center space-x-4">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <User
                        as="button"
                        avatarProps={{
                            isBordered: true,
                            src: userData.avatar
                        }}
                        className="transition-transform"
                        description="@aqui_va_el_correo"
                        name="Aqui va el nombre del usuario"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="faded" color="secondary" >
                    {userData.menu.map((item) => (
                        <DropdownItem
                            key={item.id}
                            className="flex items-center"
                            textValue={item.label}
                        >
                            <Link to={item.link} className="flex items-center w-full">
                                <Icon name={item.icon} className="w-5 h-5 text-[--color-primary-dark] mr-3" />
                                {item.label}
                            </Link>
                        </DropdownItem>
                    ))}
                </DropdownMenu>

            </Dropdown>
        </div>
    );
};

export default UserMenu;


