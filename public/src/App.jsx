import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext"; // Ajusta la ruta
import Navbar from "./components/Navbar"; // Ajusta la ruta
import Login from "./components/Login"; // Ajusta la ruta
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Este debe ser el único Router en la aplicación */}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<p>home</p>} />
          {/* Agrega otras rutas aquí */}
        </Routes>
        <Navbar />
        <Footer></Footer>
      </Router>
    </AuthProvider>
  );
}

export default App;

// import { Component, useState } from "react";
// import "./App.css";
// import Home from "./components/Home";
// import Error404 from "./components/Error404";
// import { Route, Router, Routes, Link, NavLink } from "react-router-dom";
// import Users from "./components/Users";
// import PostForm from "./components/PostForm";
// import NavBar from "./components/NavBar";
// import PaginaCatalogo from "./components/PaginaCatalogo";
// import Footer from "./components/Footer";
// import Login from "./components/Login";
// import UserForm from "./components/UserForm";
// import OrderForm from "./components/OrderForm";
// import OrderList from "./components/OrderList";
// import Perfil from "./components/Perfil";
// import MisLibros from "./components/MisLibros";
// import Register from "./components/Register";
// import "./App.css";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     !!localStorage.getItem("token")
//   );

//   return (
//     <>
//       <div className="app shadow ">
//         <NavBar></NavBar>

//         <Routes>
//           {isAuthenticated ? (
//             <>
//               //Perfil
//               <Route path="/perfil" element={<Perfil />} />
//               //Mis Libros
//               <Route path="/mislibros" element={<MisLibros />} />
//             </>
//           ) : (
//             <>
//               //Login
//               <Route path="/login" element={<Login />} />
//               //Register
//               <Route path="/register" element={<Register />} />
//             </>
//           )}
//           //Home sin logear
//           <Route path="/" element={<Home />} />
//           //Home logeado
//           <Route path="/:id" element={<Home />} />
//           //Gestion de productos
//           <Route path="/productos" element={<PaginaCatalogo />} />
//           //Crear productos
//           <Route path="/post-form" element={<PostForm />} />
//           //Update de productos
//           <Route path="/post-form/:id" element={<PostForm />} />
//           //Gestion de usuarios
//           <Route path="/usuarios" element={<Users />} />
//           //Crear usuario
//           <Route path="/user-form" element={<UserForm />} />
//           //Update usuario
//           <Route path="/user-form/:id" element={<UserForm />} />
//           //Gestion ordenes
//           <Route path="/ordenes" element={<OrderList />} />
//           //Crear orden
//           <Route path="/order-form" element={<OrderForm />} />
//           //Update orden
//           <Route path="/order-form/:id" element={<OrderForm />} />
//           //Error 404
//           <Route path="*" element={<Error404 />} />
//         </Routes>
//         <Footer></Footer>
//       </div>
//     </>
//   );
// }

// export default App;
