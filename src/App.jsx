import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import PaginaCatalogo from "./components/PaginaCatalogo";
import PostForm from "./components/PostForm";
import Users from "./components/Users";
import UserForm from "./components/UserForm";
import OrderList from "./components/OrderList";
import OrderForm from "./components/OrderForm";
import MisLibros from "./components/MisLibros";
import Profile from "./components/profile/Profile"
import Cart from "./components/Cart";

import OrderFormUser from "./components/OrderFormUser";
import "./styles/Footer.css";

/*elementos del footer */


import Acercade from "./components/Acercade";
import PoliticaDePrivacidad from "./components/PoliticaDePrivacidad";



function App() {
  return (
    <>
      <div className="app">
      <Navbar />

        <Routes>
          {/*Home no logeado*/}
          <Route path="/" element={<Home />} />
          {/*Home logeado*/}
          <Route path="/:id" element={<Home />} />
          {/*Mis libros*/}
          <Route path="/mislibros/:id" element={<MisLibros />} />
          {/*Mi perfil*/}
          <Route path="/profile/:id" element={<Profile />} />
          {/*Login*/}
          <Route path="/login" element={<Login />} />
          {/* //Register */}
          <Route path="/register" element={<Register />} />
          {/* //Gestión Productos */}
          <Route path="/productos" element={<PaginaCatalogo />} />
          {/* //Crear productos */}
          <Route path="/post-form" element={<PostForm />} />
          {/* //Update de productos */}
          <Route path="/post-form/:id" element={<PostForm />} />
          {/* //Gestion de usuarios */}
          <Route path="/usuarios" element={<Users />} />
          {/* //Crear usuario */}
          <Route path="/user-form" element={<UserForm />} />
          {/* //Update usuario */}
          <Route path="/user-form/:id" element={<UserForm />} />
          {/* //Gestion ordenes */}
          <Route path="/ordenes" element={<OrderList />} />
          {/* //Crear orden */}
          <Route path="/order-form" element={<OrderForm />} />
          {/* //Update orden */}
          <Route path="/order-form/:id" element={<OrderFormUser />} />
          {/*//Carrito*/}
          <Route path="/cart/:id" element={<Cart />} />

          

          
         
          <Route path="/PoliticaDePrivacidad" element={<PoliticaDePrivacidad />} />
          <Route path="/Acercade" element={<Acercade />} />
           
        </Routes>

        <Footer />
      </div>
      
    </>
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
// //Crear productos
// <Route path="/post-form" element={<PostForm />} />
// //Update de productos
// <Route path="/post-form/:id" element={<PostForm />} />
// //Gestion de usuarios
// <Route path="/usuarios" element={<Users />} />
// //Crear usuario
// <Route path="/user-form" element={<UserForm />} />
// //Update usuario
// <Route path="/user-form/:id" element={<UserForm />} />
// //Gestion ordenes
// <Route path="/ordenes" element={<OrderList />} />
// //Crear orden
// <Route path="/order-form" element={<OrderForm />} />
// //Update orden
// <Route path="/order-form/:id" element={<OrderForm />} />
//           //Error 404
//           <Route path="*" element={<Error404 />} />
//         </Routes>
//         <Footer></Footer>
//       </div>
//     </>
//   );
// }

// export default App;