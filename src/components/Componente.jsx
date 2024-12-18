import React from "react";
import "../styles/card.css";
import { Link, NavLink } from "react-router-dom";
import Home from "./Home";

function Componente({ users }) {
  return (
    <>
      <div></div>
      <div>
        <h3>Cursos de programacion</h3>
      </div>
      {/* 
      users.map((user) => (
        <div className="card">
          <p>Usuario</p>
          <p>{user.name}</p>
        </div>
      )) */}
    </>
  );
}

export default Componente;