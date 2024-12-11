import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token de localStorage
    navigate("/login"); // Redirige al usuario
  };

  return (
    <button onClick={handleLogout} className="btn btn-secondary">
      Cerrar Sesión
    </button>
  );
}

export default LogoutButton;
