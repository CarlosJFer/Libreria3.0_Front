import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token de localStorage
    localStorage.removeItem("userData"); // Elimina los datos del usuario de localStorage
    setIsAuthenticated(false); // Actualiza el estado de autenticación
    navigate("/login"); // Redirige al usuario
  };

  useEffect(() => {
    // Este efecto se ejecuta cada vez que isAuthenticated cambia
    if (isAuthenticated) {
      console.log("Usuario autenticado");
    } else {
      console.log("Usuario no autenticado");
    }
  }, [isAuthenticated]); // El array de dependencias contiene isAuthenticated

  return (
    <>
      {isAuthenticated && (
        <button onClick={handleLogout} className="btn btn-secondary">
          Cerrar Sesión
        </button>
      )}
    </>
  );
}

export default LogoutButton;
