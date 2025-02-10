import api from "../api/config.js";

/**
 * Servicio para registrar un nuevo usuario.
 * @param {Object} userData - Datos del usuario a registrar.
 * @param {string} userData.username - Nombre de usuario.
 * @param {string} userData.rut - RUT del usuario.
 * @param {string} userData.birth_date - Fecha de nacimiento del usuario.
 * @param {string} userData.email - Email del usuario.
 * @param {string} userData.phone - Teléfono del usuario.
 * @param {string} userData.password - Contraseña del usuario.
 * @param {string} userData.role - Rol del usuario (user o seller).
 * @param {boolean} userData.status - Estado del usuario (opcional).
 * @returns {Promise<Object>} - Respuesta del servidor con los datos del registro.
 */
export const registerUser = (userData) => {
    return api.post("/register", userData, { noAuth: true })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error al registrar el usuario:", error);
            throw error;
        });
};
