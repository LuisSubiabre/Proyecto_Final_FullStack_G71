import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

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

