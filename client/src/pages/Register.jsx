import React from "react";
import {
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Icon from "../components/Icons.jsx";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redireccionar

const Register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Para manejar el modal de alerta
  const [errors, setErrors] = React.useState({}); // Estado para manejar errores
  const [successMessage, setSuccessMessage] = React.useState(""); // Estado para mensajes de éxito
  const navigate = useNavigate(); // Hook para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validaciones manuales
    const newErrors = {};

    if (!data.name) newErrors.name = "El nombre es requerido";
    if (!data.rut) newErrors.rut = "El rut es requerido";
    if (!data.birthdate)
      newErrors.birthdate = "La fecha de nacimiento es requerida";
    if (!data.email) newErrors.email = "El correo es requerido";
    if (data.email !== data.confirmEmail)
      newErrors.confirmEmail = "Los correos no coinciden";
    if (!data.phone) newErrors.phone = "El teléfono es requerido";
    if (!data.password) newErrors.password = "La contraseña es requerida";
    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (!data.role) newErrors.role = "El rol es requerido";
    if (!data.terms)
      newErrors.terms = "Debes aceptar los términos y condiciones";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Mostrar errores
      onOpen(); // Abrir modal de alerta
    } else {
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.name,
            rut: data.rut,
            birth_date: data.birthdate,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: data.role,
          }),
        });

        const responseText = await response.text();
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch (error) {
          throw new Error(
            `Error en la respuesta del servidor: ${responseText}`
          );
        }

        if (!response.ok) {
          throw new Error("Error al registrar el usuario");
        }

        // const responseText = await response.text();
        // const result = JSON.parse(responseText);
        // console.log("Usuario registrado:", result);

        // Mostrar mensaje de éxito
        setSuccessMessage("¡Registro exitoso! Redirigiendo al login...");
        e.target.reset();
        setErrors({}); // Limpiar errores

        // Redirigir al usuario después de 2 segundos
        setTimeout(() => {
          navigate("/login"); // Redirigir al componente de Login
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
        setErrors({ submit: "Error al registrar el usuario" });
        onOpen();
      }
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                id: "name",
                label: "Nombre Completo",
                type: "text",
                icon: "user",
              },
              { id: "rut", label: "RUT", type: "text", icon: "user" },
              {
                id: "birthdate",
                label: "Fecha de Nacimiento",
                type: "date",
                icon: "user",
              },
              { id: "email", label: "Correo", type: "email", icon: "mail" },
              {
                id: "confirmEmail",
                label: "Repite el correo",
                type: "email",
                icon: "mail",
              },
              { id: "phone", label: "Teléfono", type: "tel", icon: "phone" },
              {
                id: "password",
                label: "Contraseña",
                type: "password",
                icon: "padlock",
              },
              {
                id: "confirmPassword",
                label: "Repite la contraseña",
                type: "password",
                icon: "padlock",
              },
            ].map(({ id, label, type, icon }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-semibold text-[var(--color-primary-dark)]"
                >
                  {label} *
                </label>
                <Input
                  id={id}
                  type={type}
                  placeholder={label}
                  name={id}
                  fullWidth
                  contentLeft={
                    <Icon
                      name={icon}
                      className="text-[var(--color-primary-light)]"
                    />
                  }
                  status={errors[id] ? "error" : "default"}
                  helperText={errors[id]}
                />
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
                name="role"
                className="w-full bg-white px-4 py-2 border rounded-md text-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-color-primary"
              >
                <option value="">Selecciona un rol</option>
                <option value="Usuario">Usuario</option>
                <option value="Administrador">Seller</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            <div className="flex items-center">
              <input id="terms" type="checkbox" name="terms" className="mr-2" />
              <label
                htmlFor="terms"
                className="text-sm text-[var(--color-primary-dark)]"
              >
                Aceptar términos y condiciones
              </label>
              {errors.terms && (
                <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
              )}
            </div>

            <Button type="submit" color="primary" fullWidth>
              ENVIAR
            </Button>
          </form>
        </div>
      </div>

      {/* Modal de alerta para errores */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Error en el formulario</ModalHeader>
          <ModalBody>
            <p>Por favor, corrige los siguientes errores:</p>
            <ul>
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de éxito */}
      <Modal isOpen={successMessage.length > 0} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Registro exitoso</ModalHeader>
          <ModalBody>
            <p>{successMessage}</p>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Register;
