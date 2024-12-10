import React from "react";
import CarouselItem from "./CarouselItem";
import "../styles/card.css";
import "../styles/carousel.css";

const groupBooks = (books, groupSize) => {
  const grouped = [];
  for (let i = 0; i < books.length; i += groupSize) {
    grouped.push(books.slice(i, i + groupSize));
  }
  return grouped;
};

const Carousel = ({ books }) => {
  const groupedBooks = groupBooks(books, 3); // Agrupa en lotes de 3 libros

  return (
    <div id="bookCarousel" className="carousel slide fixed-top">
      <div className="carousel-inner">
        {groupedBooks.map((group, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="row">
              {group.map((book) => (
                <div className="col-4" key={book.id}>
                  <CarouselItem book={book} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#bookCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#bookCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
