import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { Input, Button, Card, Modal } from "@nextui-org/react";
import Icon from "../components/Icons.jsx";

const Login = ({ onLoginSuccess }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [visible, setVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Nuevo estado para distinguir el tipo de mensaje
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleUser = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value.trim()) {
        error = "El correo es obligatorio";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "El correo no es válido";
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        error = "La contraseña es obligatoria";
      } else if (value.length < 6) {
        error = "La contraseña debe tener al menos 6 caracteres";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "El correo no es válido";
    }
    if (!user.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (user.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, password: user.password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Guardamos el token y la información del usuario
          localStorage.setItem('token', data.token);
          //alert("recibi los datos del backend");
          //console.log(data.token);
          //localStorage.setItem('userEmail', data.email);
          //localStorage.setItem('userId', data.user_id);

          // Llamamos a la función de éxito
          onLoginSuccess(data.email, data.user_id);

          // Mostramos mensaje de éxito
          setModalMessage("Inicio de sesión exitoso");
          setIsSuccess(true); // Indicamos que el mensaje es de éxito
          setVisible(true);

          // Esperamos 3 segundos antes de redirigir
          setTimeout(() => {
            setVisible(false);
            navigate("/");
          }, 3000);
        } else {
          // Mostramos mensaje de error
          alert("no recibi bien los datos del backend")
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
    } else {
      setModalMessage("Por favor, corrige los errores antes de enviar.");
      setIsSuccess(false);
      setVisible(true);
    }
  };

  return (
    <div className='bg-[url("https://res.cloudinary.com/dxxrdckad/image/upload/v1730842164/Green_and_Blue_Illustrative_World_Friendship_Day_Banner_Landscape_izseal.png")] bg-cover bg-center flex flex-col items-center justify-center min-h-screen font-osvald'>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-4xl px-4">
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
              status={errors.email ? "error" : "default"}
              helperText={errors.email}
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
              status={errors.password ? "error" : "default"}
              helperText={errors.password}
              startContent={<Icon name="padlock" className="text-[var(--color-primary-light)]" />}
            />
            <Button fullWidth color="primary" type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Ingresar"}
            </Button>
          </form>
        </Card>
      </div>

      <Modal closeButton aria-labelledby="modal-title" open={visible}>
        <Modal.Header>
          <h4 id="modal-title" className={`text-lg font-bold ${isSuccess ? "text-green-500" : "text-red-500"}`}>
            {isSuccess ? "Éxito" : "Error"}
          </h4>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="primary" onPress={() => setVisible(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;




