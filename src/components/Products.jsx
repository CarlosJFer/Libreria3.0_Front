import "../styles/products.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProducts, deleteProduct } from "../redux/productsSlice";
import { useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { addCart } from "../redux/cartSlice";

function Products({ selectedGenres, searchQuery }) {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
                  src="https://marketplace.canva.com/EAFZMFdpwVE/1/0/1131w/canva-portada-de-revista-de-ciencia-elegante-moderno-azul-y-amarillo-IgOJHth1QBk.jpg"
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
                  <div className=" d-flex justify-content-end">
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
                        <button
                          onClick={() => handleAddCart(product)}
                          className="btn btn-primary"
                        >
                          Agregar
                        </button>
                        <button
                          onClick={() => handlerOrder(product)}
                          className="btn btn-success custom-buy-button"
                        >
                          Comprar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Products;
