import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => localStorage.getItem('userEmail') || null);
    const [userId, setUserId] = useState(() => localStorage.getItem('userId') || null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('userEmail');
        const storedUserId = localStorage.getItem('userId');

        if (token && storedUser && storedUserId) {
            setUser(storedUser);
            setUserId(storedUserId);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };

