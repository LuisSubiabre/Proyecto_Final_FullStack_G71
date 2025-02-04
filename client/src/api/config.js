import axios from "axios";
import errorHandler from "../utils/errorHandler.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_URL_BASE,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        if (!config.noAuth) {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => errorHandler(error)
);

export default api;
