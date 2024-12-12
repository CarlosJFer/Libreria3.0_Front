import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import LogoutButton from "./LogoutButton";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top p-2">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <span>Librería</span> 3.0
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Iniciar sesión
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Registrar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/componente2">
                Componente2
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/detalle">
                Detalle
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Perfil
              </NavLink>
            </li>
            <li className="nav-item">
              <LogoutButton />
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Buscar libro"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
