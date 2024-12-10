import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../redux/productsSlice";
import { useEffect } from "react";

function Products() {
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
    console.log("Edit Product ID:", product._id); // Añade esto para verificar el ID
    navigate(`/post-form/${product._id}`);
  };

  return (
    <div>
      <Link to="/">Volver</Link>
      <h2>Products</h2>
      {products.map((product) => (
        <div className="card" key={product._id} id={product._id}>
          <h3>{product.titulo}</h3>
          <p>{product.genero}</p>
          <button onClick={() => handlerDelete(product._id)} className="delete">
            Borrar
          </button>
          <button onClick={() => handlerEdit(product)} className="edit">
            Editar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
