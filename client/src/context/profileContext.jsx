import { useState, useEffect, createContext } from "react";
import { getUserById } from "../service/user";

const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    if (storedUserId) {
      getUserById(storedUserId)
        .then((response) => {
          if (response.success && response.data) {
            setUsername(response.data.username);
            setAvatar(response.data.url_img_profile);
            setEmail(response.data.email);
          } else {
            setUsername(null);
            setAvatar(null);
            setEmail(null);
          }
        })
        .catch((error) => {
          console.error("Error al obtener datos del usuario:", error);
        })
        .finally(() => {});
    }

    console.log("userId", userId);
  }, [userId]);

  return (
    <ProfileContext.Provider
      value={{ username, email, avatar, setAvatar, setEmail, setUsername }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileContextProvider };
