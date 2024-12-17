import React from "react";

const CarouselItem = ({ book, onClick }) => {
  return (
    <div
      className="card h-100 d-flex flex-row bg-white text-dark border-0"
      onClick={onClick}
    >
      <div className="col-md-5 p-0">
        <img
          src={
            book.imgPortada ||
            "https://via.placeholder.com/300x400?text=No+Image"
          }
          alt="Portada"
          className="img-fluid w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="col-md-7">
        <div className="card-body text-start">
          <h5 className="card-title">{book.titulo}</h5>
          <p className="card-text">
            <strong>Autor:</strong> {book.autor}
          </p>
          <p className="card-text">
            <strong>Género:</strong> {book.genero}
          </p>
          <p className="card-text text-truncate">{book.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
