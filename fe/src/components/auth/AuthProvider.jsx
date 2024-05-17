import jwt_decode from "jwt-decode"
import React, { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext({
    user: null,
    handleLogin: (token) => {},
    handleLogout: () => {}
})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jwt_decode(token);
            setUser(decodedUser);
        }
    }, []);

    const handleLogin = (token) => {
        const decodedUser = jwt_decode(token)
        localStorage.setItem("userId", decodedUser.sub)
        localStorage.setItem("userRole", decodedUser.roles)
        localStorage.setItem("token", token)
        setUser(decodedUser)
    }

    const handleLogout = () => {
        localStorage.removeItem("userId")
        localStorage.removeItem("userRole")
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}