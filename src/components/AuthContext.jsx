import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [axiosInstance, setAxiosInstance] = useState(null);

  // Función login para iniciar sesión
  const login = (userData) => {
    const token = localStorage.getItem("token");
    if (token) {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setAxiosInstance(authAxios);
    }

    setIsAuthenticated(true);
    setUser(userData);
    userData.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
  };

  // Función logout para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    setAxiosInstance(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  // Verificar si hay un token almacenado al cargar el contexto
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userData");

    if (token && storedUser) {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setAxiosInstance(authAxios);
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []); // Se ejecuta solo al montar el componente

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        user,
        login,
        logout,
        axiosInstance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
