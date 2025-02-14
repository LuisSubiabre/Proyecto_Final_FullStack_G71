import { useState } from "react";
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
  Spinner,
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
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "El correo no es válido";
    if (!password) errors.password = "La contraseña es obligatoria";
    else if (password.length < 6)
      errors.password = "Debe tener al menos 6 caracteres";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return onOpen();
    setLoading(true);

    try {
      await login({ email, password });
      setSuccessMessage("¡Has iniciado sesión correctamente!");
      setErrors({});
      onOpen();
      setTimeout(() => navigate("/"), 6000);
    } catch {
      setErrors({
        general: "Error al iniciar sesión. Verifique sus credenciales.",
      });
      onOpen();
    } finally {
      setLoading(false);
    }
  };

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
          className="ml-2 text-[20px] font-bold text-[var(--color-primary-light)] hover:text-[var(--color-primary-dark)] hover:underline"
        >
          Regresar a inicio
        </a>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-4xl px-4">
        <div className="mb-8 lg:mb-0 lg:mr-16 text-center">
          <p className="text-[var(--color-primary-dark)] text-[36px] font-medium">
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              className="text-[var(--color-highlight)] font-bold hover:underline"
            >
              Regístrate AQUÍ
            </a>
          </p>
        </div>
        <Card className="bg-[var(--color-primary-light)] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-[var(--color-primary-dark)] text-2xl font-bold mb-6 text-center">
            Iniciar sesión
          </h2>
          {errors.general && (
            <p className="text-red-500 text-center mb-4">{errors.general}</p>
          )}
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
              startContent={
                <Icon name="mail" className="text-[var(--color-primary-light)]" />
              }
            />
            <Input
              fullWidth
              type="password"
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              status={errors.password ? "error" : "default"}
              helperText={errors.password}
              classNames={{ helperText: "text-white font-bold" }}
              startContent={
                <Icon
                  name="padlock"
                  className="text-[var(--color-primary-light)]"
                />
              }
            />
            <Button
              fullWidth
              color="primary"
              type="submit"
              className="py-2 rounded-lg font-bold text-lg hover:bg-[var(--color-primary-dark)] hover:text-white transition"
              disabled={loading}
            >
              {loading ? <Spinner color="success" size="sm" /> : "Ingresar"}
            </Button>
            <Button
              fullWidth
              variant="bordered"
              color="primary"
              className="py-2 rounded-lg font-bold text-lg text-white hover:bg-[var(--color-primary-dark)] hover:text-white transition"
              onPress={() => navigate("/recover-password")}
            >
              Recuperar cuenta
            </Button>
          </form>
        </Card>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            {successMessage ? "¡Bienvenido!" : "Error en el formulario"}
          </ModalHeader>
          <ModalBody>
            {successMessage ? (
              <p>{successMessage}</p>
            ) : (
              <ul>
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
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



