import { pool } from "../../database/index.js";
import format from "pg-format";

// Obtener todos los usuarios
export const getAllUsers = async () => {
    const query = "SELECT * FROM users";
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// Obtener un usuario por ID
export const getUserById = async (user_id) => {
    const query = format("SELECT * FROM users WHERE user_id = %s", user_id);
    try {
        const result = await pool.query(query);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};

// Actualizar un usuario por ID
export const updateUserById = async (user_id, userData) => {
    const {
        username,
        rut,
        birth_date,
        email,
        phone,
        password,
        role,
        status
    } = userData;

    const query = format(`
        UPDATE users SET
            username = %L,
            rut = %L,
            birth_date = %L,
            email = %L,
            phone = %L,
            password = %L,
            role = %L,
            status = %L
        WHERE user_id = %s
        RETURNING *
    `, username, rut, birth_date, email, phone, password, role, status, user_id);

    try {
        const result = await pool.query(query);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};

// Cambiar el estado de un usuario
export const changeUserStatus = async (user_id, status) => {
    const query = format("UPDATE users SET status = %L WHERE user_id = %s RETURNING *", status, user_id);
    try {
        const result = await pool.query(query);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};

// Eliminar un usuario
export const deleteUserById = async (user_id) => {
    const query = format("DELETE FROM users WHERE user_id = %s RETURNING *", user_id);
    try {
        const result = await pool.query(query);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};

// Actualizar la imagen de perfil
export const updateProfileImage = async (user_id, url_img_profile) => {
    const query = format(
        "UPDATE users SET url_img_profile = %L WHERE user_id = %s RETURNING *",
        url_img_profile,
        user_id
    );
    try {
        const result = await pool.query(query);
        return result.rowCount ? result.rows[0] : null;
    } catch (error) {
        throw error;
    }
};
