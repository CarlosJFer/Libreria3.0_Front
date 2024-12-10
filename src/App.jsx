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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        <h4>NAV-LINK</h4>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "") && "link"}
        >
          Home
        </NavLink>
        <NavLink to="/componente2" className="link">
          Componente2
        </NavLink>
        <NavLink to="/productos" className="link">
          Productos
        </NavLink>
        <NavLink to="/detalle" className="link">
          Detalle
        </NavLink>
      </nav>

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
