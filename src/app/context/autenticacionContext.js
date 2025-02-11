'use client'
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "@/app/api/autenticacion";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe estar dentro de AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const registro = async (user) => {
        try {
            const res = await registerRequest(user);
            localStorage.setItem('token', res.data.token);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response?.data || ['Error en registro']);
        }
    };

    const inicio = async (user) => {
        try {
            const res = await loginRequest(user);
            localStorage.setItem('token', res.data.token);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            setErrors(Array.isArray(error.response?.data) ? 
                error.response.data : 
                [error.response?.data?.message || 'Error en inicio de sesión']);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    const verificarToken = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }
    
            const res = await verifyTokenRequest(token);
            if (res.data && res.data.user) { // Asegurar que contiene la información del usuario
                setIsAuthenticated(true);
                setUser(res.data.user); // Asegurarse de extraer correctamente la info del usuario
            } else {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Error al verificar token:", error);
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        verificarToken();
    }, []);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => setErrors([]), 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <AuthContext.Provider value={{
            registro,
            inicio,
            logout,
            loading,
            user,
            isAuthenticated,
            errors,
        }}>
            {children}
        </AuthContext.Provider>
    );
};