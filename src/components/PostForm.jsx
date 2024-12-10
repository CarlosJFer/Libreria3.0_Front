import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { createProduct, updateProduct } from "../redux/productsSlice";
import axios from "axios";

function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const existingProduct = products.find((product) => product._id === id);

  const [inputs, setInputs] = useState({
    ISBN: "",
    titulo: "",
    autor: "",
    editorial: "",
    genero: "",
    descripcion: "",
    imgPortada: "",
    precio: "",
  });

  useEffect(() => {
    if (existingProduct) {
      setInputs(existingProduct);
    }
  }, [existingProduct]);

  const handlerChange = (e) => {
    const propiedad = e.target.name;
    const valor = e.target.value;
    setInputs({
      ...inputs,
      [propiedad]: valor,
    });
  };

  const handlerClick = (e) => {
    e.preventDefault();
    if (inputs) {
      if (id) {
        axios
          .put(`http://localhost:3000/api/products/${id}`, inputs)
          .then((res) => {
            dispatch(updateProduct(res.data));
            navigate("/");
          })
          .catch((err) => console.error(err));
      } else {
        axios
          .post("http://localhost:3000/api/products", inputs)
          .then((res) => {
            dispatch(createProduct(res.data));
            navigate("/");
          })
          .catch((err) => console.error(err));
      }
    }
  };

  return (
    <div>
      <Link to="/">Volver</Link>
      <h2>{id ? "Editar Producto" : "Crear Producto"}</h2>
      <form>
        <input
          onChange={handlerChange}
          name="ISBN"
          value={inputs.ISBN}
          type="text"
          placeholder="ISBN"
        />
        <br />
        <input
          onChange={handlerChange}
          name="titulo"
          value={inputs.titulo}
          type="text"
          placeholder="Título"
        />
        <br />
        <input
          onChange={handlerChange}
          name="autor"
          value={inputs.autor}
          type="text"
          placeholder="Autor"
        />
        <br />
        <input
          onChange={handlerChange}
          name="editorial"
          value={inputs.editorial}
          type="text"
          placeholder="Editorial"
        />
        <br />
        <input
          onChange={handlerChange}
          name="genero"
          value={inputs.genero}
          type="text"
          placeholder="Género"
        />
        <br />
        <input
          onChange={handlerChange}
          name="descripcion"
          value={inputs.descripcion}
          type="text"
          placeholder="Descripción"
        />
        <br />
        <input
          onChange={handlerChange}
          name="imgPortada"
          value={inputs.imgPortada}
          type="text"
          placeholder="Imagen de Portada"
        />
        <br />
        <input
          onChange={handlerChange}
          name="precio"
          value={inputs.precio}
          type="number"
          placeholder="Precio"
        />
        <br />
        <div>
          <button onClick={handlerClick}>
            {id ? "Actualizar Producto" : "Crear Producto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
