import React from "react";
import CarouselItem from "./CarouselItem";
import "../styles/carousel.css";

const groupBooks = (books, groupSize) => {
  const grouped = [];
  for (let i = 0; i < books.length; i += groupSize) {
    grouped.push(books.slice(i, i + groupSize));
  }
  return grouped;
};

const Carousel = ({ books }) => {
  const groupedBooks = groupBooks(books, 3);

  return (
    <>
      <div
        id="bookCarousel"
        className="carousel slide w-100 p-2 border border-secondary border-1  mb-2 bg-dark rounded"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-inner">
          {groupedBooks.map((group, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="row">
                {group.map((book) => (
                  <div className="col-4" key={book.ISBN}>
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
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#bookCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousel;
