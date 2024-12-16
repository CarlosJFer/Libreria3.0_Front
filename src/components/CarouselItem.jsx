import React from "react";

const CarouselItem = ({ book, onClick }) => {
  return (
    <div
      className="card h-100 d-flex flex-row bg-white text-dark border-0"
      onClick={onClick}
    >
      <img
        src={book.imgPortada || "https://via.placeholder.com/150?text=No+Image"}
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
