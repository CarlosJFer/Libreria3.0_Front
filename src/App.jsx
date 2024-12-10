import { Component, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home";
import Error404 from "./components/Error404";
import { Route, Router, Routes, Link, NavLink } from "react-router-dom";
import Componente from "./components/Componente";
import Componente2 from "./components/Componente2";
import Productos from "./components/Productos";
import Detalle from "./components/Detalle";
import Users from "./components/Users";
import Posts from "./components/Posts";
import PostForm from "./components/PostForm";
import Products from "./components/Products";
import NavBar from "./components/NavBar";
import Carousel from "./components/Carousel";
import PaginaCatalogo from "./components/PaginaCatalogo";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "En la punta del mapa",
      author: "Comino, Sandra",
      cover: "path/to/cover1.jpg",
      price: "$9,000.00",
    },
    {
      id: 2,
      title: "Yoga para niños",
      author: "Maleh, Mariela",
      cover: "path/to/cover2.jpg",
      price: "$22,900.00",
    },
    {
      id: 3,
      title: "Integrar el círculo",
      author: "Oyhanarte, Rosario",
      cover: "path/to/cover3.jpg",
      price: "$29,000.00",
    },
    {
      id: 4,
      title: "Romper el círculo",
      author: "Hoover, Colleen",
      cover: "path/to/cover4.jpg",
      price: "$18,900.00",
    },
    {
      id: 5,
      title: "La hora azul",
      author: "Hawkins, Paula",
      cover: "path/to/cover5.jpg",
      price: "$32,900.00",
    },
    {
      id: 6,
      title: "Historias inconscientes",
      author: "Rolón, Gabriel",
      cover: "path/to/cover6.jpg",
      price: "$33,800.00",
    },
  ]);
  return (
    <>
      <NavBar></NavBar>
      <Carousel books={books} />

      <PaginaCatalogo />
      <Footer></Footer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />{" "}
        <Route path="/posts" element={<Posts />} />{" "}
        <Route path="/post-form/:id" element={<PostForm />} />
        <Route path="/post-form" element={<PostForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/componente2" element={<Componente2 />}>
          <Route index element={<Componente />} />
        </Route>
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
