function NotFound() {
  return (
    <div className='bg-[url("https://res.cloudinary.com/libreriaalondra/image/upload/v1730842164/Green_and_Blue_Illustrative_World_Friendship_Day_Banner_Landscape_izseal.png")] bg-cover bg-center flex flex-col items-center justify-center min-h-screen font-osvald'>
      <div className="absolute top-4 left-4 flex items-center">
        <img
          src="https://res.cloudinary.com/libreriaalondra/image/upload/v1734362650/logo_fondo_azul_tt5joc.png"
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
      <div className="flex flex-col items-center justify-center w-full max-w-4xl">
        <h1 className="text-[var(--color-primary-dark)] text-[50px] font-bold font-oswald">
          Error 404 :(
        </h1>
        <p className="text-[var(--color-primary-light)] text-[36px] font-light font-arvo">
          Página no encontrada
        </p>
      </div>
    </div>
  );
}

export default NotFound;
