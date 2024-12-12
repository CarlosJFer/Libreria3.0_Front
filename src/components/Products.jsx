import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../redux/productsSlice";
import { useEffect } from "react";

function Products({ selectedGenres, searchQuery }) {
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

  // Normalización de géneros seleccionados
  const normalizedSelectedGenres = selectedGenres.map((genre) =>
    genre.trim().toLowerCase()
  );

  // Filtrar productos según géneros seleccionados y búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesGenre = normalizedSelectedGenres.length
      ? normalizedSelectedGenres.includes(product.genero.trim().toLowerCase())
      : true;
    const matchesSearchQuery =
      product.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.autor.toLowerCase().includes(searchQuery.toLowerCase());
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
      <h2>Products</h2>
      {productRows.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((product) => (
            <div
              className="col-md-4 d-flex align-items-stretch"
              key={product._id}
            >
              <div className="card my-3 w-100" id={product._id}>
                <div className="card-body d-flex flex-column">
                  <p className="card-text fw-bolder">{product.titulo}</p>
                  <p className="card-text">{product.genero}</p>
                  <p className="card-text">${product.precio}</p>
                  <div className="row mt-auto">
                    <button
                      onClick={() => handlerDelete(product._id)}
                      className="btn btn-outline-danger"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => handlerEdit(product)}
                      className="btn btn-outline-primary"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handlerEdit(product)}
                      className="btn btn-success"
                    >
                      Comprar
                    </button>
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
