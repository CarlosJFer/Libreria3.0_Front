import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [axiosInstance, setAxiosInstance] = useState(null);

  const login = (userData) => {
    const token = localStorage.getItem("token");

    // Crear una nueva instancia de axios con el token de autorización
    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    setIsAuthenticated(true);
    setUser(userData);
    setAxiosInstance(authAxios);

    userData.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    setAxiosInstance(null); // Restablecer a axios original
    localStorage.removeItem("token");
  };

  // Inicializar con token existente si hay uno
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setAxiosInstance(authAxios);
      setIsAuthenticated(true);
    }
  }, []);

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
