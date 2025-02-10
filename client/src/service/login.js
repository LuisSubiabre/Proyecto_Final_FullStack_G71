import api from "../api/config.js";

export const login = (userData) => {
    return api.post("/login", userData, { noAuth: true }).then((response) => {
        return response.data;
    });
};
