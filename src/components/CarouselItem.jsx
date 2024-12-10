import React from "react";
import PropTypes from "prop-types";

const CarouselItem = ({ book }) => {
  return (
    <div className="card">
      <img src={book.cover} className="card-img-top" alt={book.title} />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.author}</p>
        <p className="card-text">{book.price}</p>
        <button className="btn btn-primary">Comprar</button>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarouselItem;
