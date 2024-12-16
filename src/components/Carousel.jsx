import React, { useState, useContext } from "react";
import CarouselItem from "./CarouselItem";
import "../styles/carousel.css";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AuthContext } from "./AuthContext";
import { addCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const groupBooks = (books, groupSize) => {
  const grouped = [];
  for (let i = 0; i < books.length; i += groupSize) {
    grouped.push(books.slice(i, i + groupSize));
  }
  return grouped;
};

const Carousel = ({ books }) => {
  const groupedBooks = groupBooks(books, 3);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const { isAuthenticated, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleShowModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleAddCart = (book) => {
    dispatch(
      addCart({
        id: book._id,
        imgPortada: book.imgPortada,
        titulo: book.titulo,
        precio: book.precio,
        quantity: 0,
      })
    );
  };

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
                    <CarouselItem
                      book={book}
                      onClick={() => handleShowModal(book)}
                    />
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

      {selectedBook && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedBook.titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <img
                src={
                  selectedBook.imgPortada ||
                  "https://via.placeholder.com/150?text=No+Image"
                }
                alt="Portada"
                className="img-fluid me-3"
                style={{ width: "150px" }}
              />
              <div>
                <p>
                  <strong>ISBN:</strong> {selectedBook.ISBN}
                </p>
                <p>
                  <strong>Autor:</strong> {selectedBook.autor}
                </p>
                <p>
                  <strong>Editorial:</strong> {selectedBook.editorial}
                </p>
                <p>
                  <strong>Género:</strong> {selectedBook.genero}
                </p>
                <p>
                  <strong>Descripción:</strong> {selectedBook.descripcion}
                </p>
                <p>
                  <strong>Precio:</strong> ${selectedBook.precio}
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
            {isAuthenticated && user ? (
              <Button
                variant="success"
                onClick={() => {
                  handleAddCart(selectedBook);
                  handleCloseModal();
                }}
              >
                Agregar al Carrito
              </Button>
            ) : (
              <Link to={"/login"} className="btn btn-secondary">
                Iniciar Sesión
              </Link>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Carousel;
