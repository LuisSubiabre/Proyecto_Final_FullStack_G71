import { useState, useEffect, createContext, useContext } from "react";
import { getUserById } from "../service/user.js";
import { AuthContext } from "./authContext.jsx";

const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  // Obtenemos el userId desde AuthContext para que esté sincronizado
  const { userId: authUserId } = useContext(AuthContext);
  const [userId, setUserId] = useState(authUserId);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (authUserId) {
      setUserId(authUserId);
      getUserById(authUserId)
        .then((response) => {
          if (response.success && response.data) {
            setUsername(response.data.username);
            setAvatar(response.data.url_img_profile);
            setEmail(response.data.email);
            setRole(response.data.role);
          } else {
            setUsername(null);
            setAvatar(null);
            setEmail(null);
            setRole(null);
          }
        })
        .catch((error) => {
          console.error("Error al obtener datos del usuario:", error);
        });
    } else {
      // Si no hay usuario autenticado, reiniciamos todo
      setUserId(null);
      setUsername(null);
      setAvatar(null);
      setEmail(null);
      setRole(null);
    }
  }, [authUserId]);

  return (
    <ProfileContext.Provider
      value={{
        userId,
        username,
        email,
        avatar,
        role,
        setAvatar,
        setEmail,
        setUsername,
        setRole,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileContextProvider };
