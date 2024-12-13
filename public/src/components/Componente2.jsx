import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Componente2() {
  return (
    <div>
      <p>Componente2</p>
      <Outlet />
    </div>
  );
}

export default Componente2;
