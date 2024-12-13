import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
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
    </nav>
  );
};

export default Navbar;

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
