import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Productos() {
  // const [productos, SetProductos] = useState([]);
  // console.log(productos);
  // fetch("https://jsonplaceholder.typicode.com/posts")
  //   .then((response) => response.json())
  //   .then((data) => SetProductos(data));
  const productos = [
    { id: 1, title: "Cien años de soledad" },
    { id: 2, title: "Don Quijote de la Mancha" },
    { id: 3, title: "El Principito" },
    { id: 4, title: "Crónica de una muerte anunciada" },
    { id: 5, title: "1984" },
  ];
  return (
    <div>
      <p>PRODUCTOS</p>
      {productos.map((producto) => (
        <div className="card" key={producto.id}>
          <p>Producto nro {producto.id}</p>
          <Link key={producto.id} to={`/detalle/${producto.id}`}>
            {producto.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Productos;
