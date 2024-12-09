import React from "react";
import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
const productos = [
  { id: 1, title: "Cien años de soledad" },
  { id: 2, title: "Don Quijote de la Mancha" },
  { id: 3, title: "El Principito" },
  { id: 4, title: "Crónica de una muerte anunciada" },
  { id: 5, title: "1984" },
];

function Detalle() {
  const { id } = useParams();

  console.log(id);
  const producto = productos.find((p) => p.id === parseInt(id));
  console.log(producto);
  return (
    <div>
      <p>DETALLE</p>
      <p>Titulo: {producto.title}</p>
    </div>
  );
}

export default Detalle;
