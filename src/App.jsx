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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-blue-500">
        <header className="bg-blue-900 text-white">
          <div className="container mx-auto flex justify-between items-center py-4">
            <div className="text-2xl font-bold">
              <span className="text-yellow-500"> LIBRERIA </span>3.0
            </div>
            <nav className="space-x-4">
              <a href="#" className="hover:underline">
                LIBROS
              </a>
              <a href="#" className="hover:underline">
                MÚSICA
              </a>
              <a href="#" className="hover:underline">
                PELICULAS
              </a>
              <a href="#" className="hover:underline">
                PASATIEMPOS
              </a>
            </nav>
            <div>
              <input
                type="text"
                placeholder="Buscar productos aquí..."
                className="p-2 rounded"
              />
              <button className="bg-blue-700 p-2 rounded text-white">
                Buscar
              </button>
            </div>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <section className="mb-8">
            <img
              src="https://placehold.co/1200x400"
              alt="Promo Vinilos"
              className="w-full"
            />
          </section>
          <section className="flex mb-8">
            <div className="w-3/4">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">RECOMENDADOS</h2>
                <div className="space-x-4">
                  <button className="hover:underline">NOVEDADES</button>
                  <button className="hover:underline">MÁS VENDIDOS</button>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4">
                {[
                  {
                    title: "VICTORIA",
                    author: "SANCHEZ, ANGELA",
                    price: "$29.900,00",
                    img: "https://placehold.co/150x200",
                  },
                  {
                    title: "HEAVENBREAKER",
                    author: "WATT, SARA",
                    price: "$29.000,00",
                    img: "https://placehold.co/150x200",
                  },
                  {
                    title: "LA CASA NEVILLE 3",
                    author: "BONELLI, FLORENCIA",
                    price: "$29.900,00",
                    img: "https://placehold.co/150x200",
                  },
                  {
                    title: "NUESTRA DESQUICIADA HISTORIA DE AMOR",
                    author: "NELSON, JANDY",
                    price: "$35.900,00",
                    img: "https://placehold.co/150x200",
                  },
                  {
                    title: "MALA LECHE",
                    author: "MARTINEZ, SOLE",
                    price: "$31.990,00",
                    img: "https://placehold.co/150x200",
                  },
                  {
                    title: "KARINA",
                    author: "DE MAS, VICTORIA",
                    price: "$24.990,00",
                    img: "https://placehold.co/150x200",
                  },
                ].map((book, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={book.img}
                      alt={book.title}
                      className="w-full mb-2"
                    />
                    <h3 className="text-sm font-bold">{book.title}</h3>
                    <p className="text-xs">{book.author}</p>
                    <p className="text-red-600 font-bold">{book.price}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/4 pl-4">
              <h2 className="text-xl font-bold mb-4">DESTACADOS DEL MES</h2>
              <div className="bg-white p-4 shadow">
                <img
                  src="https://placehold.co/150x200"
                  alt="La Casa Neville 3"
                  className="w-full mb-4"
                />
                <h3 className="text-sm font-bold">LA CASA NEVILLE 3</h3>
                <p className="text-xs">BONELLI, FLORENCIA</p>
                <p className="text-red-600 font-bold mb-4">$29.900,00</p>
                <button className="bg-blue-700 text-white p-2 rounded w-full">
                  COMPRAR
                </button>
              </div>
            </div>
          </section>
          <section className="flex mb-8">
            <aside className="w-1/4 pr-4">
              <h2 className="text-xl font-bold mb-4">CATEGORÍAS</h2>
              <ul className="space-y-2">
                {[
                  "Libros",
                  "Guías de Turismo",
                  "Música",
                  "Películas",
                  "Agendas y Cuadernos",
                  "Juguetes",
                  "Juegos de Mesa",
                  "Papelería",
                  "Revistas",
                ].map((category, index) => (
                  <li key={index} className="hover:underline">
                    {category}
                  </li>
                ))}
              </ul>
              <h2 className="text-xl font-bold mt-8 mb-4">NOVEDADES</h2>
              <ul className="space-y-2">
                {[
                  "Libros Ficción",
                  "Libros No Ficción",
                  "Libros Infantiles",
                  "Música",
                  "Películas",
                  "Pasatiempos",
                ].map((novelty, index) => (
                  <li key={index} className="hover:underline">
                    {novelty}
                  </li>
                ))}
              </ul>
              <h2 className="text-xl font-bold mt-8 mb-4">MÁS VENDIDOS</h2>
              <ul className="space-y-2">
                {[
                  "Libros Ficción",
                  "Libros No Ficción",
                  "Libros Infantiles",
                  "Música",
                  "Películas",
                  "Pasatiempos",
                ].map((bestseller, index) => (
                  <li key={index} className="hover:underline">
                    {bestseller}
                  </li>
                ))}
              </ul>
            </aside>
            <div className="w-3/4">
              <h2 className="text-xl font-bold mb-4">PROMOCIONES</h2>
              <div className="bg-blue-900 text-white p-4 mb-8">
                <div className="flex space-x-4">
                  <img
                    src="https://placehold.co/150x200"
                    alt="Promo 1"
                    className="w-1/4"
                  />
                  <img
                    src="https://placehold.co/150x200"
                    alt="Promo 2"
                    className="w-1/4"
                  />
                  <img
                    src="https://placehold.co/150x200"
                    alt="Promo 3"
                    className="w-1/4"
                  />
                  <div className="w-1/4">
                    <h3 className="text-lg font-bold mb-2">
                      STAR WARS: LA HISTORIA VISUAL AÑO A AÑO
                    </h3>
                    <p className="text-sm mb-4">
                      Descuento especial! Compra con 10% de descuento por tiempo
                      limitado.
                    </p>
                    <p className="text-sm mb-4">
                      Licencia oficial de Star Wars, este libro es una guía
                      visual completa de la saga.
                    </p>
                    <p className="text-lg font-bold mb-4">
                      Antes: <span className="line-through">$49.990,00</span>{" "}
                      Ahora: $39.990,00
                    </p>
                    <button className="bg-yellow-500 text-blue-900 p-2 rounded w-full">
                      COMPRAR
                    </button>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-4">LOS MÁS BUSCADOS</h2>
              <div className="grid grid-cols-6 gap-4">
                {[
                  {
                    title: "Este dolor no es mío",
                    img: "https://placehold.co/150x200",
                  },
                  {
                    title: "La felicidad",
                    img: "https://placehold.co/150x200",
                  },
                  { title: "Libro 3", img: "https://placehold.co/150x200" },
                  {
                    title: "La Casa Neville 3",
                    img: "https://placehold.co/150x200",
                  },
                  { title: "Libro 5", img: "https://placehold.co/150x200" },
                  { title: "Libro 6", img: "https://placehold.co/150x200" },
                  { title: "Libro 7", img: "https://placehold.co/150x200" },
                  { title: "Libro 8", img: "https://placehold.co/150x200" },
                  { title: "Libro 9", img: "https://placehold.co/150x200" },
                  { title: "Libro 10", img: "https://placehold.co/150x200" },
                  { title: "Libro 11", img: "https://placehold.co/150x200" },
                  { title: "Libro 12", img: "https://placehold.co/150x200" },
                ].map((book, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={book.img}
                      alt={book.title}
                      className="w-full mb-2"
                    />
                    <h3 className="text-sm font-bold">{book.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
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
        <Route path="/productos" element={<Productos />} />
        <Route path="/componente2" element={<Componente2 />}>
          <Route index element={<Componente />} />
        </Route>
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

      {/*<div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <div>
        <header className="bg-blue-900 text-white">
          <div className="container mx-auto flex justify-between items-center py-4">
            <div className="text-2xl font-bold">
              <span className="text-yellow-500">LIBRE RIA </span>3.0
            </div>
            <nav className="space-x-4">
              <a href="#" className="hover:underline">
                LIBROS
              </a>
              <a href="#" className="hover:underline">
                MÚSICA
              </a>
              <a href="#" className="hover:underline">
                PELICULAS
              </a>
              <a href="#" className="hover:underline">
                PASATIEMPOS
              </a>
            </nav>
            <div>
              <input
                type="text"
                placeholder="Buscar productos aquí..."
                className="p-2 rounded"
              />
              <button className="bg-blue-700 p-2 rounded text-white">
                Buscar
              </button>
            </div>
          </div>
        </header>
        <main className="container mx-auto mt-4">
          <div className="flex">
            {/* <div className="w-3/4">
              <img
                src="https://placehold.co/800x300"
                alt="Promo Vinilos - regala la mejor música, al mejor precio!"
                className="w-full"
              />
            </div> */}
            {/* <div className="w-1/4 pl-4">
              <div className="bg-white p-4 shadow">
                <h2 className="text-xl font-bold mb-4">DESTACADOS DEL MES</h2>
                <div className="mb-4">
                  <img
                    src="https://placehold.co/150x200"
                    alt="La Casa Nivelle 3"
                    className="w-full"
                  />
                  <h3 className="text-lg font-bold">LA CASA NIVELLE 3</h3>
                  <p className="text-red-600 font-bold">$29.900,00</p>
                  <button className="bg-blue-700 text-white p-2 rounded mt-2">
                    COMPRAR
                  </button>
                </div>
                <div>
                  <img
                    src="https://placehold.co/150x200"
                    alt="Other Book"
                    className="w-full"
                  />
                </div>
              </div>
            </div> */}
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">RECOMENDADOS</h2>
              <div className="space-x-4">
                <button className="bg-gray-200 p-2 rounded">
                  RECOMENDADOS
                </button>
                <button className="bg-gray-200 p-2 rounded">NOVEDADES</button>
                <button className="bg-gray-200 p-2 rounded">
                  MÁS VENDIDOS
                </button>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 mt-4">
              <div className="bg-white p-4 shadow">
                <img
                  src="https://placehold.co/150x200"
                  alt="Victoria"
                  className="w-full"
                />
                <h3 className="text-lg font-bold">VICTORIA</h3>
                <p className="text-red-600 font-bold">$29.900,00</p>
              </div>
              <div className="bg-white p-4 shadow">
                <img
                  src="https://placehold.co/150x200"
                  alt="Heavenbreaker"
                  className="w-full"
                />
                <h3 className="text-lg font-bold">HEAVENBREAKER</h3>
                <p className="text-red-600 font-bold">$29.000,00</p>
              </div>
              <div className="bg-white p-4 shadow">
                <img
                  src="https://placehold.co/150x200"
                  alt="La Casa Nivelle 3"
                  className="w-full"
                />
                <h3 className="text-lg font-bold">LA CASA NIVELLE 3</h3>
                <p className="text-red-600 font-bold">$29.900,00</p>
              </div>
              <div className="bg-white p-4 shadow">
                <img
                  src="https://placehold.co/150x200"
                  alt="Nuestra Desquiciada Historia de Amor"
                  className="w-full"
                />
                <h3 className="text-lg font-bold">
                  NUESTRA DESQUICIADA HISTORIA DE AMOR
                </h3>
                <p className="text-red-600 font-bold">$35.900,00</p>
              </div>
              <div className="bg-white p-4 shadow">
                <img
                  src="https://placehold.co/150x200"
                  alt="Mala Leche"
                  className="w-full"
                />
                <h3 className="text-lg font-bold">MALA LECHE</h3>
                <p className="text-red-600 font-bold">$31.990,00</p>
              </div>
              <div className="bg-white p-4 shadow">
                <img
                  src="https://placehold.co/150x200"
                  alt="Karina"
                  className="w-full"
                />
                <h3 className="text-lg font-bold">KARINA</h3>
                <p className="text-red-600 font-bold">$24.990,00</p>
              </div>
            </div>
          </div>
          <div className="flex mt-8">
            <div className="w-1/4">
              <div className="bg-white p-4 shadow mb-4">
                <h2 className="text-xl font-bold mb-4">CATEGORÍAS</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Libros
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Guías de Turismo
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Música
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Películas
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Agendas y Cuadernos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Juguetes
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Juegos de Mesa
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Papelería
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Regalos
                    </a>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-4 shadow mb-4">
                <h2 className="text-xl font-bold mb-4">NOVEDADES</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Libros Ficción
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Libros No Ficción
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Libros Infantiles
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Música
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Películas
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Pasatiempos
                    </a>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-4 shadow">
                <h2 className="text-xl font-bold mb-4">MÁS VENDIDOS</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Libros Ficción
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Libros No Ficción
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Libros Infantiles
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Música
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Películas
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Pasatiempos
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-3/4 pl-4">
              <div className="bg-white p-4 shadow mb-8">
                <h2 className="text-xl font-bold mb-4">PROMOCIONES</h2>
                <div className="flex space-x-4">
                  <div className="w-1/4">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Promo 1"
                      className="w-full"
                    />
                  </div>
                  <div className="w-1/4">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Promo 2"
                      className="w-full"
                    />
                  </div>
                  <div className="w-1/4">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Promo 3"
                      className="w-full"
                    />
                  </div>
                  <div className="w-1/4">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Promo 4"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 shadow">
                <h2 className="text-xl font-bold mb-4">LOS MÁS BUSCADOS</h2>
                <div className="grid grid-cols-6 gap-4">
                  <div className="bg-white p-4 shadow">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Book 1"
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white p-4 shadow">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Book 2"
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white p-4 shadow">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Book 3"
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white p-4 shadow">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Book 4"
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white p-4 shadow">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Book 5"
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white p-4 shadow">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Book 6"
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white p-4 shadow">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Book 7"
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white p-4 shadow">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Book 8"
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white p-4 shadow">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Book 9"
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white p-4 shadow">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Book 10"
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white p-4 shadow">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Book 11"
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white p-4 shadow">
                    <img
                      src="https://placehold.co/150x200"
                      alt="Book 12"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
