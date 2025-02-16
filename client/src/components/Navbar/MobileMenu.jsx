import { useContext } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Link } from "react-router-dom";
import useAuth from "../../hook/useAuth.jsx";
import menuData from "../../data/menuData.json";
import useCategories from "../../hook/useCategories.jsx";
import { ProfileContext } from "../../context/profileContext.jsx";

const MobileMenu = ({ closeMenu }) => {
  const { menus, loading, error } = useCategories();
  const { logout } = useAuth();
  const { userId, username, email, avatar, role } = useContext(ProfileContext);

  if (loading) {
    return <div className="p-4">Cargando categorías...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col mt-2">
      <Accordion>
        {menus.map((menu) => (
          <AccordionItem key={menu.id} title={menu.title}>
            <ul className="flex flex-col pl-4">
              {menu.items.map((item) => (
                <li key={item.id} className="py-1">
                  <Link
                    to={`/category/${menu.id}/${item.id}`}
                    className="text-[var(--color-primary-dark)] hover:underline hover:font-bold"
                    onClick={closeMenu}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>
      {userId ? (
        <div className="mt-4 p-2 border-t">
          <p className="text-lg font-bold animate-text-color-change text-center">
            BIENVENID@ DE VUELTA
          </p>
          <div className="flex items-center space-x-2">
            <img
              src={avatar}
              alt="Perfil"
              className="w-14 h-14 rounded-full border-3 border-[var(--color-primary)]"
            />
            <div>
              <p className="text-sm font-medium">
                {username || "Sin nombre"}
              </p>
              <p className="text-xs text-gray-500">
                {email || "Sin correo"}
              </p>
            </div>
          </div>
          {/* Renderizamos el menú basado en el rol */}
          <ul className="mt-2">
            {role &&
              menuData[role]?.menu.map((item) => (
                <li key={item.id} className="py-1">
                  {item.link === "/logout" ? (
                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="text-danger-700 hover:underline hover:font-bold"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.link}
                      onClick={closeMenu}
                      className="text-[var(--color-primary-dark)] hover:underline hover:font-bold"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="mt-4 flex flex-col">
          <Link
            to="/login"
            className="block p-2 text-center text-lg font-oswald font-bold text-[var(--color-primary-dark)] hover:bg-[var(--color-secondary-light)] hover:underline"
            onClick={closeMenu}
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="block p-2 text-center text-lg font-oswald font-bold text-[var(--color-primary-dark)] hover:bg-[var(--color-secondary-light)] hover:underline"
            onClick={closeMenu}
          >
            ¿No tienes cuenta?
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
