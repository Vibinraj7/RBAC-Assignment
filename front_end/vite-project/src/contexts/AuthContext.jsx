
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const storedData = JSON.parse(localStorage.getItem('user_data'));


    useEffect(() => {
        if (storedData) {
            const { userToken, user } = storedData;
            setToken(userToken);
            setUserData(user);
            setIsAuthenticated(true);
        }
    }, [])

    const login = (newToken, newData) => {
        localStorage.setItem('user_data', JSON.stringify({ userToken: newToken, user: newData }))

        if (newData.role === "admin") {
            console.log("he is admin")
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('user_data');
        setToken(null);
        setUserData(null);
        setIsAdmin(false);
        setIsAuthenticated(false);

    }

    return (
        <AuthContext.Provider value={{ token, userData, isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
