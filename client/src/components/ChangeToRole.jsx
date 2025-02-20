import { useContext, useEffect } from "react";
import { ProfileContext } from "../context/profileContext.jsx";
import { useNavigate } from "react-router-dom";
import { changeRole } from "../service/user.js"; // Importar la función changeRole

const ChangeToRole = ({ newRole }) => {
  const { userId, setRole } = useContext(ProfileContext); // Obtener userId y setRole del contexto
  const navigate = useNavigate();

  useEffect(() => {
    const changeToUserRole = async () => {
      try {
        // Llamar a la API para cambiar el rol
        await changeRole(userId, newRole); // Pasar userId y el nuevo rol desde props

        // Actualizar el rol en el estado global y localStorage
        setRole(newRole);
        localStorage.setItem("role", newRole);

        // Redirigir al usuario a la página principal
        navigate("/");
      } catch (error) {
        console.error("Error al cambiar el rol:", error);
        // Manejar el error (por ejemplo, mostrar un mensaje al usuario)
      }
    };

    changeToUserRole(); // Ejecutar la función
  }, [userId, setRole, navigate, newRole]);

  return (
    <>
      <section className="p-4 sm:p-6 bg-[var(--color-neutral-light)] flex justify-center items-center h-3/6">
        <div className="p-4 text-black">Has cambiado tu perfil a {newRole}</div>
      </section>
    </>
  );
};

export default ChangeToRole;
