import api from "../api/config.js";

// En el archivo service/register.js se encuentra la estrutura para registrar un nuevo usuario,
// con lo que se espera tbm recibir para la actualizacion de los datos de un  usuario.

export const getAllUsers = () =>
  api.get("/user").then((response) => response.data);

export const getUserById = (id) =>
  api.get(`/user/${id}`).then((response) => response.data);

export const updateUserById = (id, userData) =>
  api.put(`/user/${id}`, userData).then((response) => response.data);

export const changeUserStatus = (id, status) =>
  api.put(`/user/status/${id}`, { status }).then((response) => response.data);

export const updateProfileImage = (id, url_img_profile) =>
  api
    .put(`/user/profile-image/${id}`, { url_img_profile })
    .then((response) => response.data);

export const deleteUserById = (id) =>
  api.delete(`/user/${id}`).then((response) => response.data);

export const changeRole = (id, role) =>
  api.patch(`/user/role/${id}`, { role }).then((response) => response.data);
