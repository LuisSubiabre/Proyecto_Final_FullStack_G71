import api from "../api/config.js";

/**
 * Servicio para recuperar la contraseña.
 * @param {Object} recoveryData - Datos para la recuperación de contraseña.
 * @param {string} recoveryData.email - Email del usuario que solicita la recuperación.
 * @returns {Promise<Object>} - Respuesta del servidor con el estado de la recuperación.
 */
export const recoverPassword = (recoveryData) => {
    return api
        .post("/recover-password/", recoveryData, { noAuth: true })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error al recuperar la contraseña:", error);
            throw error;
        });
};
