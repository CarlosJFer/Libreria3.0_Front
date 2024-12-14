import React from "react";

const CarouselItem = ({ book }) => {
  return (
    <div className="card h-100 d-flex flex-row bg-dark text-light">
      <img
        src="./src/assets/Portada.png"
        alt="Portada"
        className="card-img-left img-fluid"
      />
      <div className="card-body text-start">
        <h5 className="card-title">{book.titulo}</h5>

        <p className="card-text">Autor: {book.autor}</p>
        <p className="card-text">Género: {book.genero}</p>
        <p className="card-text">{book.descripcion}</p>
      </div>
    </div>
  );
};

export default CarouselItem;
