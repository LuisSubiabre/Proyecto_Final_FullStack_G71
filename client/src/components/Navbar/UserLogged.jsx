import { Link } from "react-router-dom";

const UserLogged = () => {
    return (
        <div className="flex items-center space-x-2">
            <div className="flex flex-col items-center">
                <Link
                    to="/login"
                    className="text-[20px] hover:underline font-oswald"
                >
                    Iniciar sesión
                </Link>
                <Link
                    to="/register"
                    className="text-[12px] hover:underline font-arvo"
                >
                    ¿No tienes cuenta?
                </Link>
            </div>
            <img
                src="https://res.cloudinary.com/dxxrdckad/image/upload/v1727986331/icono_inicio_sesion_l2ekm0.png"
                alt="User Icon"
                className="h-15 w-16"
            />
        </div>
    );
};

export default UserLogged;
