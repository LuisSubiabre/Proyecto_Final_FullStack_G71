import { Avatar, Button } from "@nextui-org/react";

const Profile = () => {
  return (
    <section className="p-4 sm:p-6 bg-[var(--color-neutral-light)]">
      <div className="p-4">
        {/* Sección inferior con dos columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="p-4 flex flex-col items-center h-full justify-center">
            <h3 className="text-gray-800 text-xl sm:text-3xl font-normal mb-4 text-center">
              BIENVENID@ DE VUELTA
            </h3>
            <div className="flex items-center mt-8 italic">
              <Avatar
                isBordered
                color="primary"
                className="w-16 h-16 sm:w-24 sm:h-24 text-large mr-4"
                src="https://res.cloudinary.com/libreriaalondra/image/upload/v1737644821/profile-admin_glp1xo.png"
              />
              <div>
                <p className="text-gray-700 font-bold">Alondra Luque</p>
                <p className="text-gray-700">Edad: 1 año</p>
                <p className="text-gray-700">Telf: 123-123-1233</p>
                <p className="text-gray-700">Rol: Administrador</p>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="p-4 w-full max-w-screen-md mx-auto bg-purple-300 rounded-xl shadow-lg">
            <h3 className="text-purple-950 text-xl sm:text-3xl font-bold mb-4 text-center">
              ACTUALIZAR INFORMACIÓN DE USUARIO
            </h3>
            <form className="space-y-4 px-4 sm:px-12">
              <div className="relative">
                <label className="block text-gray-700">Nombre Completo *</label>
                <input
                  type="text"
                  placeholder="Nombre Completo"
                  className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700">Teléfono *</label>
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700">Correo *</label>
                <input
                  type="email"
                  placeholder="Correo"
                  className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700">
                  Repite el Correo *
                </label>
                <input
                  type="email"
                  placeholder="Repite el Correo"
                  className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700">Contraseña *</label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700">
                  Repite la Contraseña *
                </label>
                <input
                  type="password"
                  placeholder="Repite la Contraseña"
                  className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                  required
                />
              </div>
              <p className="text-gray-800">
                * Todos los campos son obligatorios
              </p>
              <div className="text-center">
                <Button className="size-80 bg-fuchsia-700 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full disabled:bg-gray-300">
                  ACTUALIZAR DATOS
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
