import { useState } from "react";
import {
  Input,
  Button,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import Icon from "../components/Icons.jsx";
import { recoverPassword as serviceRecoverPassword } from "../service/recoveryPass.js";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const data = await serviceRecoverPassword({ email });
      setMessage(data.message || "Se ha enviado un correo con tu contraseña.");
      onOpen();
    } catch (err) {
      setError(err.response?.data?.error || "Error al recuperar la contraseña.");
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
      <Card className="bg-[var(--color-primary-light)] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-[var(--color-primary-dark)] text-2xl font-bold mb-6 text-center">
          Recuperar Contraseña
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            fullWidth
            type="email"
            label="Correo"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            status={error ? "error" : "default"}
            classNames={{ helperText: "text-white font-bold" }}
            startContent={
              <Icon
                name="mail"
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
            {loading ? <Spinner color="success"  size="md" /> : "Enviar correo"}
          </Button>
        </form>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{error ? "Error" : "Éxito"}</ModalHeader>
          <ModalBody>
            <p>{error || message}</p>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RecoverPassword;
