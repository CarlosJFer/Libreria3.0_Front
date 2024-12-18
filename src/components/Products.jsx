import "../styles/products.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProducts, deleteProduct } from "../redux/productsSlice";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { addCart } from "../redux/cartSlice";
import { Modal, Button } from "react-bootstrap";

function Products({ selectedGenres, searchQuery }) {
  const { isAuthenticated, user, isAdmin } = useContext(AuthContext);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios("http://localhost:3000/api/products")
      .then((res) => dispatch(getProducts(res.data)))
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handlerDelete = (_id) => {
    axios
      .delete(`http://localhost:3000/api/products/${_id}`)
      .then(() => {
        dispatch(deleteProduct(_id));
      })
      .catch((err) => {
        console.error(err);
        alert("Error al eliminar el producto del servidor.");
      });
  };

  const handlerEdit = (product) => {
    navigate(`/post-form/${product._id}`);
  };

  const { id } = useParams();
  const handlerOrder = (product) => {
    id
      ? navigate(`/order-form/${id}`, { state: { product } })
      : navigate("/login");
  };

  const handleAddCart = (product) => {
    dispatch(
      addCart({
        id: product._id,
        imgPortada: product.imgPortada,
        titulo: product.titulo,
        precio: product.precio,
        quantity: 0,
      })
    );
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Filtrar productos según géneros seleccionados y consulta de búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesGenre = selectedGenres.length
      ? selectedGenres.includes(product.genero)
      : true;
    const query = searchQuery.toString().toLowerCase();
    const matchesSearchQuery =
      product.titulo.toLowerCase().includes(query) ||
      product.autor.toLowerCase().includes(query);
    return matchesGenre && matchesSearchQuery;
  });

  // Agrupar productos en filas de tres
  const groupProductsInRows = (products) => {
    const rows = [];
    for (let i = 0; i < products.length; i += 3) {
      rows.push(products.slice(i, i + 3));
    }
    return rows;
  };

  const productRows = groupProductsInRows(filteredProducts);

  return (
    <div className="container p-2 m-2">
      {productRows.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((product) => (
            <div
              className="col-md-4 d-flex align-items-stretch"
              key={product._id}
            >
              <div className="card my-3 w-100 product-card">
                <img
                  // src={
                  //   product.imgPortada
                  // }
                  src={
                    product.imgPortada ||
                    "https://marketplace.canva.com/EAFZMFdpwVE/1/0/1131w/canva-portada-de-revista-de-ciencia-elegante-moderno-azul-y-amarillo-IgOJHth1QBk.jpg"
                  }
                  alt="Portada"
                  className="card-img-top img-fluid"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold mb-3">{product.titulo}</h5>
                  <div className="mb-auto text-start">
                    <h6 className="card-subtitle text-muted">
                      Autor: {product.autor}
                    </h6>
                    <p className="card-text">Género: {product.genero}</p>
                    <p className="card-text fw-bold  ">
                      Precio: ${product.precio}
                    </p>
                  </div>
                  <div className="d-flex justify-content-end">
                    {isAdmin ? (
                      <>
                        <button
                          onClick={() => handlerDelete(product._id)}
                          className="btn btn-outline-danger me-2"
                        >
                          Borrar
                        </button>
                        <button
                          onClick={() => handlerEdit(product)}
                          className="btn btn-outline-primary"
                        >
                          Editar
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="d-flex w-100 justify-content-center">
                          <button
                            onClick={() => handleShowModal(product)}
                            className="btn btn-outline-dark m-2"
                          >
                            Ver
                          </button>
                          {isAuthenticated && user ? (
                            <button
                              onClick={() => handleAddCart(product)}
                              className="btn btn-success m-2"
                            >
                              Agregar
                            </button>
                          ) : (
                            <Link to={"/login"} className="btn btn-success m-2">
                              Agregar
                            </Link>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <img
                src={
                  selectedProduct.imgPortada ||
                  "https://marketplace.canva.com/EAFZMFdpwVE/1/0/1131w/canva-portada-de-revista-de-ciencia-elegante-moderno-azul-y-amarillo-IgOJHth1QBk.jpg"
                }
                alt="Portada"
                className="img-fluid me-3"
                style={{ width: "150px" }}
              />
              <div>
                <p>
                  <strong>ISBN:</strong> {selectedProduct.ISBN}
                </p>
                <p>
                  <strong>Autor:</strong> {selectedProduct.autor}
                </p>
                <p>
                  <strong>Editorial:</strong> {selectedProduct.editorial}
                </p>
                <p>
                  <strong>Género:</strong> {selectedProduct.genero}
                </p>
                <p>
                  <strong>Descripción:</strong> {selectedProduct.descripcion}
                </p>
                <p>
                  <strong>Precio:</strong> ${selectedProduct.precio}
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
                  handleAddCart(selectedProduct);
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
    </div>
  );
}

export default Products;
