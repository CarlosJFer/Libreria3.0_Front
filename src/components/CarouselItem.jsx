import React from "react";

const CarouselItem = ({ book }) => {
  return (
    <div className="card">
      <img src={book.imgPortada} className="card-img-top" alt={book.titulo} />
      <div className="card-body">
        <h5 className="card-title">{book.titulo}</h5>
        <p className="card-text">Autor: {book.autor}</p>
        <p className="card-text">Género: {book.genero}</p>
        <p className="card-text">Precio: ${book.precio}</p>
      </div>
    </div>
  );
};

export default CarouselItem;
