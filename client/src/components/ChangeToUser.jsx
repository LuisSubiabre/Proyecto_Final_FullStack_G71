import { useContext, useEffect } from "react";
import { ProfileContext } from "../context/ProfileContext.jsx";
import { useNavigate } from "react-router-dom";
import { changeRole } from "../service/user.js"; // Importar la función changeRole

const ChangeToUser = () => {
  const { userId, setRole } = useContext(ProfileContext); // Obtener userId y setRole del contexto
  const navigate = useNavigate();

  useEffect(() => {
    const changeToUserRole = async () => {
      try {
        // Llamar a la API para cambiar el rol
        await changeRole(userId, "user"); // Pasar userId y el nuevo rol "user"

        // Actualizar el rol en el estado global y localStorage
        setRole("user");
        localStorage.setItem("role", "user");

        // Redirigir al usuario a la página principal
        navigate("/");
      } catch (error) {
        console.error("Error al cambiar el rol:", error);
        // Manejar el error (por ejemplo, mostrar un mensaje al usuario)
      }
    };

    changeToUserRole(); // Ejecutar la función
  }, [userId, setRole, navigate]);

  return (
    <>
      <section className="p-4 sm:p-6 bg-[var(--color-neutral-light)] flex justify-center items-center h-3/6">
        <div className="p-4 text-black">Has cambiado tu perfil a usuario</div>
      </section>
    </>
  );
};

export default ChangeToUser;
