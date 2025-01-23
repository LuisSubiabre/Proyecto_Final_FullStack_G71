import React from "react";
import Icon from "../components/Icons.jsx";

const Register = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dxxrdckad/image/upload/v1730820074/fondo_login_register_nqwroy.jpg')",
      }}
    >
      <div className="absolute top-4 left-4 flex items-center">
        <img
          src="https://res.cloudinary.com/dxxrdckad/image/upload/v1734362650/logo_fondo_azul_tt5joc.png"
          alt="Logo"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <a
          href="/"
          className="ml-2 text-[20px] font-bold text-[var(--color-primary-light)] hover:text-color-primary"
        >
          Regresar a inicio
        </a>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-4xl px-4">
        {/* Columna del texto a la izquierda */}
        <div className="flex flex-col items-center justify-center space-y-8">
        {/* Primer div */}
        <div className="mb-8 text-center lg:text-left">
            <p className="text-[24px] text-center text-[var(--color-highlight)] mt-4 font-bold">
            Registrate y recibe un descuento del 10% en tu primera compra.
            </p>
        </div>

        {/* Segundo div */}
        <div className="mb-8 text-center lg:text-left lg:w-1/3">
            <p className="text-[32px] text-center text-[var(--color-primary-dark)] mt-4">
            ¿Ya tienes cuenta?{" "}
            <a
                href="/login"
                className="font-bold text-[var(--color-highlight)] hover:underline"
            >
                Inicia sesión AQUÍ
            </a>
            </p>
        </div>
        </div>


        {/* Columna del formulario a la derecha */}
        <div className="bg-[var(--color-secondary)] bg-opacity-90 shadow-xl p-6 rounded-md w-full max-w-xs">
          <h1 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4 text-center">
            REGISTRO DE USUARIO
          </h1>
          <form className="space-y-4">
            {[
              { id: "name", label: "Nombre Completo", type: "text", icon: "user" },
              { id: "birthdate", label: "Fecha de Nacimiento", type: "date", icon: "user" },
              { id: "phone", label: "Teléfono", type: "tel", icon: "phone" },
              { id: "email", label: "Correo", type: "email", icon: "mail" },
              { id: "confirmEmail", label: "Repite el correo", type: "email", icon: "mail" },
              { id: "password", label: "Contraseña", type: "password", icon: "padlock" },
              { id: "confirmPassword", label: "Repite la contraseña", type: "password", icon: "padlock" },
            ].map(({ id, label, type, icon }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-semibold text-[var(--color-primary-dark)]"
                >
                  {label} *
                </label>
                <div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2">
                  <Icon name={icon} className="text-[var(--color-primary-light)] mr-3" />
                  <input
                    id={id}
                    type={type}
                    placeholder={label}
                    required
                    className="flex-1 bg-transparent outline-none text-[var(--color-primary-dark)] placeholder:text-[var(--color-secondary-dark)]"
                  />
                </div>
              </div>
            ))}

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-[var(--color-primary-dark)]"
              >
                Selecciona un rol *
              </label>
              <select
                id="role"
                className="w-full bg-white px-4 py-2 border rounded-md text-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-color-primary"
              >
                <option>Usuario</option>
                <option>Administrador</option>
              </select>
            </div>

            <div className="flex items-center">
              <input id="terms" type="checkbox" className="mr-2" required />
              <label
                htmlFor="terms"
                className="text-sm text-[var(--color-primary-dark)]"
              >
                Aceptar términos y condiciones
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-primary-light)] hover:bg-color-primary-dark text-white font-bold py-2 px-4 rounded-md"
            >
              ENVIAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;




