import bcrypt from "bcryptjs";
import {
    getAllUsers,
    getUserById,
    updateUserById,
    changeUserStatus,
    deleteUserById,
    updateProfileImage
} from "../models/users.model.js";

const createResponse = (res, data, message, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

// Obtener todos los usuarios
export const getAllUsersController = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        createResponse(res, users, "Usuarios obtenidos correctamente");
    } catch (error) {
        next(error);
    }
};

// Obtener un usuario por ID
export const getUserByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ success: false, error: "Usuario no encontrado" });
        }
        createResponse(res, user, "Usuario obtenido correctamente");
    } catch (error) {
        next(error);
    }
};

// Actualizar un usuario por ID
export const updateUserByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userData = req.body;

        // Obtener el usuario existente por su ID
        const existingUser = await getUserById(id);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                error: "Usuario no encontrado"
            });
        }

        // Actualizar los campos del usuario existente con los valores proporcionados en userData
        userData.rut = existingUser.rut;
        userData.status = userData.status !== undefined
            ? (userData.status === true || userData.status === "true")
            : existingUser.status;
        userData.birth_date = userData.birth_date || existingUser.birth_date;
        userData.role = userData.role || existingUser.role;
        if (userData.password) {
            const salt = bcrypt.genSaltSync(10);
            userData.password = bcrypt.hashSync(userData.password, salt);
        }

        const requiredFields = ["username", "birth_date", "email", "phone", "role", "status"];
        const missingFields = requiredFields.filter(field => userData[field] === undefined);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                error: `Faltan campos obligatorios: ${missingFields.join(", ")}`
            });
        }

        const updatedUser = await updateUserById(id, userData);

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                error: "Usuario no encontrado para actualizar"
            });
        }
        createResponse(res, updatedUser, "Usuario actualizado correctamente");
    } catch (error) {
        next(error);
    }
};



// Cambiar estado de un usuario
export const changeUserStatusController = async (req, res, next) => {
    try {
        const { id } = req.params;
        let { status } = req.body;
        status = status === true || status === "true";
        const updatedStatus = await changeUserStatus(id, status);
        if (!updatedStatus) {
            return res.status(404).json({
                success: false,
                error: "Usuario no encontrado para cambiar el estado"
            });
        }

        createResponse(res, updatedStatus, "Estado del usuario actualizado correctamente");
    } catch (error) {
        next(error);
    }
};


// Eliminar un usuario
export const deleteUserByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, error: "Usuario no encontrado para eliminar" });
        }
        createResponse(res, null, "Usuario eliminado correctamente");
    } catch (error) {
        next(error);
    }
};

// Actualizar la imagen de perfil
export const updateProfileImageController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { url_img_profile } = req.body;

        if (!url_img_profile) {
            return res.status(400).json({
                success: false,
                error: "La URL de la imagen de perfil es requerida",
            });
        }

        const updatedUser = await updateProfileImage(id, url_img_profile);
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                error: "Usuario no encontrado para actualizar la imagen de perfil",
            });
        }

        createResponse(res, updatedUser, "Imagen de perfil actualizada correctamente");
    } catch (error) {
        next(error);
    }
};