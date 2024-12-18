import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import "../styles/NavBar.css";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext);
  console.log(user);
  const cart = useSelector((state) => state.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* ACA EMPIEZA EL SEGUNDO NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top p-2">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated && user ? (
                <>
                  <NavLink className="navbar-brand" to={`/${user._id}`}>
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

                  {isAdmin ? (
                    <>
                      <li className="nav-item">
                        <span className="nav-link">Admin {user.name}! 🫡</span>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/productos">
                          Gestión Productos
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/usuarios">
                          Gestión Usuarios
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/ordenes">
                          Gestión Órdenes
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to={`/${user._id}`}>
                          Catálogo
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <span className="nav-link">Hola, {user.name}! 🤓</span>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to={`/profile/${user._id}`}
                        >
                          Perfil
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to={`/mislibros/${user._id}`}
                        >
                          Mis libros
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to={`/${user._id}`}>
                          Catálogo
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to={`/cart/${user._id}`}>
                          Carrito <FaShoppingCart />
                          {cartItemCount > 0 && (
                            <span className="cartItemCount">
                              {cartItemCount}
                            </span>
                          )}
                        </NavLink>
                      </li>
                    </>
                  )}
                </>
              ) : (
                <>
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
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/login"
                      element={<Login />}
                    >
                      Iniciar sesión
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Registrarse
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Catálogo
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Este bloque mueve el botón Cerrar Sesión a la derecha */}
            {isAuthenticated && user && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={logout}>
                    Cerrar Sesión
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;