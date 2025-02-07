import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Card } from "@nextui-org/react";
import Icon from "../components/Icons.jsx";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

const Login = ({ onLoginSuccess }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [visible, setVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUser = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    validateField(name, value);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!value.trim()) error = "El correo es obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "El correo no es válido";
    }
    if (name === "password") {
      if (!value.trim()) error = "La contraseña es obligatoria";
      else if (value.length < 6) error = "La contraseña debe tener al menos 6 caracteres";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.email.trim()) newErrors.email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) newErrors.email = "El correo no es válido";

    if (!user.password.trim()) newErrors.password = "La contraseña es obligatoria";
    else if (user.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      setModalMessage("Por favor, corrige los errores antes de enviar.");
      setIsSuccess(false);
      setVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userId", data.user_id);

        onLoginSuccess(data.email, data.user_id);

        setModalMessage("Inicio de sesión exitoso");
        setIsSuccess(true);
        setVisible(true);
      } else {
        setModalMessage(data.message || "Error en el inicio de sesión");
        setIsSuccess(false);
        setVisible(true);
      }
    } catch (error) {
      setModalMessage("Error en la conexión con el servidor");
      setIsSuccess(false);
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setVisible(false); // Cierra el modal antes de redirigir
        navigate("/"); // Redirige después de 2 segundos
      }, 2000);

      return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
    }
  }, [isSuccess, navigate]);

  const handleModalClose = () => {
    setVisible(false);
    if (isSuccess) {
      navigate("/"); // Redirige inmediatamente si el modal se cierra manualmente
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
        <Card className="bg-[var(--color-primary-light)] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-[var(--color-primary-dark)] text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              fullWidth
              type="email"
              name="email"
              label="Correo"
              placeholder="Ingrese su correo"
              value={user.email}
              onChange={handleUser}
              onBlur={handleBlur}
              status={errors.email ? "error" : "default"}
              helperText={errors.email}
              classNames={{ helperText: "text-white font-bold" }}
              startContent={<Icon name="mail" className="text-[var(--color-primary-light)]" />}
            />
            <Input
              fullWidth
              type="password"
              name="password"
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              value={user.password}
              onChange={handleUser}
              onBlur={handleBlur}
              status={errors.password ? "error" : "default"}
              helperText={errors.password}
              classNames={{ helperText: "text-white font-bold" }}
              startContent={<Icon name="padlock" className="text-[var(--color-primary-light)]" />}
            />

            <Button fullWidth color="primary" type="submit" className="py-2 rounded-lg font-bold text-lg hover:bg-[var(--color-primary-dark)] hover:text-white transition" disabled={loading}>
              {loading ? "Cargando..." : "Ingresar"}
            </Button>
            <Button fullWidth variant="bordered" color="primary" className="py-2 rounded-lg font-bold text-lg text-white hover:bg-[var(--color-primary-dark)] hover:text-white transition">
              Recuperar cuenta
            </Button>
          </form>
        </Card>
      </div>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={handleModalClose}
      >
        <Modal.Header>
          <h4 id="modal-title" className="text-lg font-bold">
            {isSuccess ? "Inicio de sesión exitoso" : "Error"}
          </h4>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="primary" onPress={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;







