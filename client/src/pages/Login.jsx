import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Icon from "../components/Icons.jsx";
import useAuth from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [modalIsClosed, setModalIsClosed] = useState(false); // Nuevo estado

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "El correo no es válido";
    }

    if (!password) {
      errors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login({ email, password });
        setSuccessMessage("¡Has iniciado sesión correctamente!"); // Set success message
        e.target.reset();
        setErrors({}); // Limpiar errores
        onOpen(); // Open success modal

        // Primero, mostramos el modal y aseguramos que se renderice antes de programar su cierre
        setTimeout(() => {
          setModalIsClosed(false); // Asegura que el modal esté visible
          
          setTimeout(() => {
            setModalIsClosed(true); // Cierra el modal después de 5 segundos visibles
            
            setTimeout(() => {
              navigate("/"); // Redirige después de 2 segundos adicionales para evitar cortes bruscos
            }, 2000); // Margen de 2 segundos después de cerrar el modal

          }, 2000); // Mantiene el modal abierto durante 2 segundos antes de cerrarlo

        }, 2000); // Breve margen inicial para asegurar que el modal se renderice antes de iniciar el proceso
      } catch (error) {
        setErrors({ general: "Error al iniciar sesión. Verifique sus credenciales." });
        onOpen(); // Open error modal
      }
    } else {
      onOpen(); // Open modal to show validation errors
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Validación en tiempo real para la contraseña
    if (newPassword.length < 6) {
      setErrors((prev) => ({ ...prev, password: "La contraseña debe tener al menos 6 caracteres" }));
    } else {
      setErrors((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
    }
  };

  const handlePasswordBlur = () => {
    // Validación cuando el campo pierde el foco
    if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: "La contraseña debe tener al menos 6 caracteres" }));
    }
  };

  // Efecto para cerrar el modal después de la redirección
  useEffect(() => {
    if (modalIsClosed) {
      onClose(); // Cerrar modal después de la redirección
    }
  }, [modalIsClosed]);

  return (
    <div className='bg-[url("https://res.cloudinary.com/dxxrdckad/image/upload/v1730842164/Green_and_Blue_Illustrative_World_Friendship_Day_Banner_Landscape_izseal.png")] bg-cover bg-center flex flex-col items-center justify-center min-h-screen font-osvald'>
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
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-[var(--color-highlight)] font-bold hover:underline">
              Regístrate AQUÍ
            </a>
          </p>
        </div>
        <Card className="bg-[var(--color-primary-light)] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-[var(--color-primary-dark)] text-2xl font-bold mb-6 text-center">
            Iniciar sesión
          </h2>
          {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              fullWidth
              type="email"
              label="Correo"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              status={errors.email ? "error" : "default"}
              helperText={errors.email}
              classNames={{ helperText: "text-white font-bold" }}
              startContent={<Icon name="mail" className="text-[var(--color-primary-light)]" />}
            />
            <Input
              fullWidth
              type="password"
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={handlePasswordChange} // Validación en tiempo real
              onBlur={handlePasswordBlur} // Validación al perder el foco
              status={errors.password ? "error" : "default"}
              helperText={errors.password}
              classNames={{ helperText: "text-white font-bold" }}
              startContent={<Icon name="padlock" className="text-[var(--color-primary-light)]" />}
            />
            <Button
              fullWidth
              color="primary"
              type="submit"
              className="py-2 rounded-lg font-bold text-lg hover:bg-[var(--color-primary-dark)] hover:text-white transition"
            >
              Ingresar
            </Button>
            <Button
              fullWidth
              variant="bordered"
              color="primary"
              className="py-2 rounded-lg font-bold text-lg text-white hover:bg-[var(--color-primary-dark)] hover:text-white transition"
            >
              Recuperar cuenta
            </Button>
          </form>
        </Card>
      </div>

      {/* Modal de alerta para errores */}
      <Modal isOpen={isOpen && !successMessage} onClose={onClose}>
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
      <Modal isOpen={isOpen && successMessage.length > 0} onClose={onClose}>
        <ModalContent>
          <ModalHeader>¡Bienvenido!</ModalHeader>
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

export default Login;









