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
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {id ? "Editar Producto" : "Crear Producto"}
      </h2>
      <form className="p-4 border rounded shadow-sm bg-light">
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="ISBN" className="form-label">
              ISBN
            </label>
            <input
              onChange={handlerChange}
              name="ISBN"
              value={inputs.ISBN}
              type="text"
              className="form-control"
              placeholder="ISBN"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="titulo" className="form-label">
              Título
            </label>
            <input
              onChange={handlerChange}
              name="titulo"
              value={inputs.titulo}
              type="text"
              className="form-control"
              placeholder="Título"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="autor" className="form-label">
              Autor
            </label>
            <input
              onChange={handlerChange}
              name="autor"
              value={inputs.autor}
              type="text"
              className="form-control"
              placeholder="Autor"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="editorial" className="form-label">
              Editorial
            </label>
            <input
              onChange={handlerChange}
              name="editorial"
              value={inputs.editorial}
              type="text"
              className="form-control"
              placeholder="Editorial"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="genero" className="form-label">
              Género
            </label>
            <input
              onChange={handlerChange}
              name="genero"
              value={inputs.genero}
              type="text"
              className="form-control"
              placeholder="Género"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="precio" className="form-label">
              Precio
            </label>
            <input
              onChange={handlerChange}
              name="precio"
              value={inputs.precio}
              type="number"
              className="form-control"
              placeholder="Precio"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            onChange={handlerChange}
            name="descripcion"
            value={inputs.descripcion}
            className="form-control"
            placeholder="Descripción"
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imgPortada" className="form-label">
            Imagen de Portada
          </label>
          <input
            onChange={handlerChange}
            name="imgPortada"
            value={inputs.imgPortada}
            type="text"
            className="form-control"
            placeholder="Imagen de Portada"
          />
        </div>
        <div className="d-flex justify-content-between">
          <button onClick={() => navigate("/")} className="btn btn-secondary">
            Cancelar
          </button>
          <button onClick={handlerClick} className="btn btn-primary">
            {id ? "Actualizar Producto" : "Crear Producto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
