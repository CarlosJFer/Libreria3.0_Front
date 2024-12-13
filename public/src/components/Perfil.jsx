import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Perfil = ({ setIsAuthenticated }) => {
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();
  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  };
  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token no encontrado");
        setIsAuthenticated(false);
        return;
      }

      try {
        // Usa la función manual de decodificación
        const decodedToken = decodeToken(token);

        if (!decodedToken || !decodedToken.id) {
          throw new Error("Token inválido");
        }

        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPerfil(response.data.user);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setIsAuthenticated(false);
      }
    };

    fetchPerfil();
  }, [setIsAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="mt-5">
      {perfil ? (
        <div>
          <h1>Perfil de Usuario</h1>
          <p>Nombre: {perfil.name}</p>
          <p>Correo Electrónico: {perfil.email}</p>
          {/* Añade más campos según sea necesario */}
          <button onClick={handleLogout} className="btn btn-secondary mt-3">
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Perfil;
