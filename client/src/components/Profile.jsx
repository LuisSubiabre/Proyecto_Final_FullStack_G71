import { Avatar, Button } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";

import {
  getUserById,
  updateProfileImage,
  updateUserById,
} from "../service/user.js";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { ProfileContext } from "../context/profileContext.jsx";
const Profile = () => {
  const { userId } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loadingUsuario, setLoadingUsuario] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  // Estados para manejar los valores de los campos
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const {
    setEmail: setProfileEmail,
    setUsername: setProfileUsername,
    setAvatar: setProfileAvatar,
  } = useContext(ProfileContext);

  // Estados para manejar los errores de validación
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((response) => {
          setLoadingUsuario(true);

          if (response.success && response.data) {
            setUserData(response.data);
            setUsername(response.data.username);
            setPhone(response.data.phone);
            setEmail(response.data.email);
            setRepeatEmail(response.data.email);
          } else {
            setUserData(null);
          }
        })
        .catch((error) => {
          console.error("Error al obtener el role del usuario:", error);
          setUserData(null);
        })
        .finally(() => {
          setLoadingUsuario(false);
        });
    } else {
      setUserData(null);
    }
  }, [userId]);

  function calcularEdad(birthDate) {
    const fechaActual = new Date();
    const fechaNac = new Date(birthDate);

    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    const mes = fechaActual.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
      edad--;
    }

    return edad;
  }

  const validateFields = () => {
    let isValid = true;

    if (!username) {
      setUsernameError("El nombre completo es obligatorio");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!phone) {
      setPhoneError("El teléfono es obligatorio");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (!email) {
      setEmailError("El correo es obligatorio");
      isValid = false;
    } else if (email !== repeatEmail) {
      setEmailError("Los correos no coinciden");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("La contraseña es obligatoria");
      isValid = false;
    } else if (password !== repeatPassword) {
      setPasswordError("Las contraseñas no coinciden");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateFields();

    if (isValid) {
      await updateUserById(userId, {
        username,
        phone,
        email,
        password,
      }).then((response) => {
        if (response.success) {
          /* Actualiza los datos del usuario en el contexto */
          setProfileUsername(username);
          setProfileEmail(email);

          setMessage("Información de usuario actualizado correctamente");
          onOpen();
        } else {
          setError(response.message || "Error al actualizar el usuario");
          onOpen();
        }
      });
    }
  };

  // Función para verificar si hay campos vacíos
  const hasEmptyFields = () => {
    return (
      !username ||
      !phone ||
      !email ||
      !repeatEmail ||
      !password ||
      !repeatPassword
    );
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error("Error al subir la imagen");
    }
  };

  const handleProfileImageUpdate = async () => {
    if (!newProfileImage) {
      setError("Por favor, selecciona una imagen para actualizar.");
      onOpen();
      return;
    }
    const imageUrl = await uploadToCloudinary(newProfileImage);

    try {
      const response = await updateProfileImage(userId, imageUrl);
      if (response.success) {
        setProfileAvatar(imageUrl);
        setMessage("Foto de perfil actualizada correctamente.");
        onOpen();
        // Actualiza la imagen en el estado local
        setUserData((prevData) => ({
          ...prevData,
          profile_image: URL.createObjectURL(newProfileImage),
        }));
      } else {
        setError(response.message || "Error al actualizar la foto de perfil.");
        onOpen();
      }
    } catch (error) {
      setError("Error al actualizar la foto de perfil." + error.message);
      onOpen();
    }
  };

  return (
    <>
      <section className="p-4 sm:p-6 bg-[var(--color-neutral-light)]">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 flex flex-col items-center h-full justify-center">
              <h3 className="text-gray-800 text-xl sm:text-3xl font-normal mb-4 text-center">
                BIENVENID@ DE VUELTA
              </h3>
              {loadingUsuario ? (
                "Cargando información del usuario..."
              ) : (
                <div className="flex items-center mt-8 italic">
                  <Avatar
                    isBordered
                    color="primary"
                    className="w-16 h-16 sm:w-24 sm:h-24 text-large mr-4"
                    src={
                      newProfileImage
                        ? URL.createObjectURL(newProfileImage)
                        : userData?.url_img_profile
                    }
                  />
                  <div>
                    <p className="text-gray-700 font-bold">{username}</p>
                    <p className="text-gray-700">
                      Edad: {calcularEdad(userData?.birth_date)}
                    </p>
                    <p className="text-gray-700">Telf: {phone}</p>
                    <p className="text-gray-700">Rol: {userData?.role}</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewProfileImage(e.target.files[0])}
                      className="mt-2"
                    />
                    <Button
                      className="mt-2 bg-fuchsia-700 text-white hover:bg-fuchsia-800"
                      onPress={handleProfileImageUpdate}
                      disabled={!newProfileImage}
                    >
                      Actualizar Foto de Perfil
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 w-full max-w-screen-md mx-auto bg-purple-300 rounded-xl shadow-lg">
              <h3 className="text-purple-950 text-xl sm:text-3xl font-bold mb-4 text-center">
                ACTUALIZAR INFORMACIÓN DE USUARIO
              </h3>
              <form className="space-y-4 px-4 sm:px-12" onSubmit={handleSubmit}>
                <div className="relative">
                  <label className="block text-gray-700">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  {usernameError && (
                    <p className="text-red-500 text-sm">{usernameError}</p>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-gray-700">Teléfono *</label>
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm">{phoneError}</p>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-gray-700">Correo *</label>
                  <input
                    type="email"
                    placeholder="Correo"
                    className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-gray-700">
                    Repite el Correo *
                  </label>
                  <input
                    type="email"
                    placeholder="Repite el Correo"
                    className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                    value={repeatEmail}
                    onChange={(e) => setRepeatEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block text-gray-700">Contraseña *</label>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-gray-700">
                    Repite la Contraseña *
                  </label>
                  <input
                    type="password"
                    placeholder="Repite la Contraseña"
                    className="w-full p-3 border bg-white border-gray-300 rounded-lg"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                  />
                </div>
                <p className="text-gray-800">
                  * Todos los campos son obligatorios
                </p>
                <div className="text-center">
                  <Button
                    type="submit"
                    className="size-80 bg-fuchsia-700 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full disabled:bg-gray-300"
                    disabled={hasEmptyFields()}
                    onPress={handleSubmit}
                  >
                    ACTUALIZAR DATOS
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
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
    </>
  );
};

export default Profile;
