// import { Component, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home";
import Error404 from "./components/Error404";
import { Routes, Route } from "react-router-dom";
import Componente from "./components/Componente";
import Componente2 from "./components/Componente2";
// import Productos from "./components/Productos";
import Detalle from "./components/Detalle";
import Users from "./components/Users";
import Posts from "./components/Posts";
import PostForm from "./components/PostForm";
import Products from "./components/Products";
import NavBar from "./components/NavBar";
// import Carousel from "./components/Carousel";
// import PaginaCatalogo from "./components/PaginaCatalogo";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Home />} />
        <Route path="/users" element={<Users />} />{" "}
        <Route path="/posts" element={<Posts />} />{" "}
        <Route path="/post-form/:id" element={<PostForm />} />
        <Route path="/post-form" element={<PostForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/componente2" element={<Componente2 />}>
          <Route index element={<Componente />} />
        </Route>
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
