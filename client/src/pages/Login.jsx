import React from 'react';
import Icon from "../components/Icons.jsx";

const Login = () => {
  return (
    <div className='bg-[url("https://res.cloudinary.com/dxxrdckad/image/upload/v1730842164/Green_and_Blue_Illustrative_World_Friendship_Day_Banner_Landscape_izseal.png")] bg-cover bg-center flex flex-col items-center justify-center min-h-screen font-sans'>
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
        <div className="mb-8 lg:mb-0 lg:mr-16 text-center">
          <p className="text-[var(--color-primary-dark)] text-[36px] font-medium">
            ¿No tienes cuenta? <a href="/register" className="text-[var(--color-highlight)] font-bold hover:underline">Regístrate AQUÍ</a>
          </p>
        </div>
        <div className="bg-[var(--color-primary-light)] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-[var(--color-primary-dark)] text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
          <form className="space-y-6">
            <div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2">
              <Icon name="mail" className="text-[var(--color-primary-light)] mr-3" />
              <input
                type="email"
                placeholder="Correo"
                required
                className="flex-1 bg-transparent outline-none text-[var(--color-primary-dark)] placeholder:text-[var(--color-secondary-dark)]"
              />
            </div>
            <div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2">
              <Icon name="padlock" className="text-[var(--color-primary-light)] mr-3" />
              <input
                type="password"
                placeholder="Contraseña"
                required
                className="flex-1 bg-transparent outline-none text-[var(--color-primary-dark)] placeholder:text-[var(--color-secondary-dark)]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--color-primary-dark)] text-white py-2 rounded-lg font-bold text-lg hover:bg-[var(--color-highlight)] transition"
            >
              Ingresar
            </button>
            <button
              type="button"
              className="w-full border-2 border-[var(--color-primary-dark)] text-[var(--color-primary-dark)] py-2 rounded-lg font-bold text-lg hover:bg-[var(--color-primary-dark)] hover:text-white transition"
            >
              Recuperar cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
