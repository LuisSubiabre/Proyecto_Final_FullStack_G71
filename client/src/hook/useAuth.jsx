import { useContext } from 'react';
import { AuthContext } from '../context/authContext.jsx';
import { login as loginService } from '../service/login.js';
import { registerUser as registerService } from '../service/register.js';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const { user, setUser, userId, setUserId } = useContext(AuthContext);
    const navigate = useNavigate();

    const login = async (userData) => {
        try {
            const result = await loginService(userData);
            if (result && result.email && result.user_id && result.token) {
                setUser(result.email);
                setUserId(result.user_id);
                localStorage.setItem('token', result.token);
                localStorage.setItem('userEmail', result.email);
                localStorage.setItem('userId', result.user_id);
                navigate('/');
            } else {
                throw new Error('Datos incompletos en la respuesta del servidor');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await registerService(userData);
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setUserId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    // Método para inicializar el estado de autenticación
    const initializeAuth = () => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('userEmail');
        const storedUserId = localStorage.getItem('userId');

        if (token && storedUser && storedUserId) {
            setUser(storedUser);
            setUserId(storedUserId);
        } else {
            console.log("No hay un usuario autenticado.");
        }
    };

    return { user, userId, login, register, logout, initializeAuth };
};

export default useAuth;
