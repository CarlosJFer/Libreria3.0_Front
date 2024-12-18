
import "../styles/products.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../redux/productsSlice";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
  
import { Modal, Button } from "react-bootstrap";

function MisLibros() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const libros = useSelector((state) => state.products); // Mis libros se almacenan aquí
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios("http://localhost:3000/api/products") // Se realiza consulta de users a la api.
      .then((res) => dispatch(getProducts(res.data)))
      .catch((err) => console.error(err));
  }, [dispatch]);

 
  // };

  const handleShowModal = (libro) => {
    setSelectedLibro(libro);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLibro(null);
  };

  // Filtrar libros por búsqueda
  const filteredLibros = libros.filter((libro) =>
    libro.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container p-4">
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar libros por título"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row">
        {filteredLibros.map((libro) => (
          <div key={libro._id} className="col-md-4 d-flex align-items-stretch">
            <div className="card mb-4 w-100 shadow-sm">
              <img
                src={libro.imgPortada || "https://via.placeholder.com/150"}
                alt={libro.titulo}
                className="card-img-top"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{libro.titulo}</h5>
                <p className="card-text">
                  <strong>Autor:</strong> {libro.autor}
                </p>
                <p className="fw-bold">Precio: ${libro.precio}
                  <hr />
                  Ejemplo de libro adquirido
                </p>
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    onClick={() => handleShowModal(libro)}
                    className="btn btn-outline-dark me-2"
                  >
                    Ver Detalles
                  </button>
                  {isAuthenticated ? (
                    <button
                      onClick={() => handleAddCart(libro)}
                      className="btn btn-success"
                    >
                      Agregar al Carrito
                    </button>
                  ) : (
                    <Link to="/login" className="btn btn-secondary">
                      Iniciar Sesión
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalles */}
      {selectedLibro && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedLibro.titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedLibro.imgPortada || "https://via.placeholder.com/150"}
              alt={selectedLibro.titulo}
              className="img-fluid mb-3"
            />
            <p>
              <strong>Autor:</strong> {selectedLibro.autor}
            </p>
            <p>
              <strong>Género:</strong> {selectedLibro.genero}
            </p>
            <p>
              <strong>Descripción:</strong> {selectedLibro.descripcion}
            </p>
            <p>
              <strong>Precio:</strong> ${selectedLibro.precio}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
            {isAuthenticated && (
              <Button
                variant="success"
                onClick={() => {
                  handleAddCart(selectedLibro);
                  handleCloseModal();
                }}
              >
                Agregar al Carrito
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default MisLibros;