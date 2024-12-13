import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link, NavLink } from "react-router-dom";
import Login from "./Login";
import "../styles/NavBar.css";

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext);

  return (
    <>
      {/* ACA EMPIEZA EL SEGUNDO NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top p-2  ">
        <div className="container ">
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated ? (
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
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <span className="nav-link">Hola, {user.name}! 🤓</span>
                      </li>
                      <li className="nav-item ">
                        <NavLink
                          className="nav-link"
                          to={`/perfil/${user._id}`}
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
                    </>
                  )}
                  <li className="nav-item">
                    <NavLink className="nav-link" to={`/${user._id}`}>
                      Catálogo
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login" onClick={logout}>
                      Cerrar Sesión
                    </NavLink>
                  </li>
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
    </>
  );
};

export default Navbar;
{
  /* 
      PRIMER NAVBAR SALVADOR
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            E-Commerce
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link">Hola, {user.name}</span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={logout}>
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav> */
}
// import { NavLink } from "react-router-dom";
// import "../styles/NavBar.css";
// import LogoutButton from "./LogoutButton";
// import { useState } from "react";
// import Login from "./Login";

// function Navbar({ isAuthenticated, setIsAuthenticated }) {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark fixed-top p-2  ">
//       <div className="container ">
//         <NavLink className="navbar-brand" to="/">
//           <span>Librería</span> 3.0
//         </NavLink>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse " id="navbarNav">
//           <ul className="navbar-nav mr-auto">
//             {isAuthenticated ? (
//               <li className="nav-item ">
//                 <NavLink className="nav-link" to="/perfil">
//                   Perfil
//                 </NavLink>
//               </li>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <NavLink
//                     className="nav-link"
//                     to="/login"
//                     element={
//                       <Login
//                         setIsAuthenticated={setIsAuthenticated}
//                         isAuthenticated={isAuthenticated}
//                       />
//                     }
//                   >
//                     Iniciar sesión
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/register">
//                     Registrarse
//                   </NavLink>
//                 </li>
//               </>
//             )}

//             <li className="nav-item">
//               <NavLink className="nav-link" to="/">
//                 Home
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/productos">
//                 Productos
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/usuarios">
//                 Usuarios
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/ordenes">
//                 Órdenes
//               </NavLink>
//             </li>

//             <li className="nav-item">
//               <NavLink className="nav-link" to="/mislibros">
//                 Mis libros
//               </NavLink>
//             </li>
//           </ul>
//           <form className="form-inline my-2 my-lg-0">
//             <input
//               className="form-control mr-sm-2"
//               type="search"
//               placeholder="Buscar libro"
//               aria-label="Search"
//             />
//           </form>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
