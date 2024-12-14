import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder, updateOrder } from "../redux/orderSlice";
import { getProducts } from "../redux/productsSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";

function OrderForm() {
  const [orderData, setOrderData] = useState({
    fecha: "",
    estado: "Pendiente",
    metodoPago: "",
    items: [],
    total: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
    setOrderData((prevState) => ({
      ...prevState,
      fecha: currentDate,
    }));

    if (id) {
      axios
        .get(`http://localhost:3000/api/order/${id}`)
        .then((res) => {
          setOrderData({
            ...res.data,
            fecha: new Date(res.data.fecha).toISOString().split("T")[0], // Asegurarse de que la fecha esté en el formato correcto
          });
          dispatch(getProducts());
        })
        .catch((err) => console.error(err));
    } else {
      axios("http://localhost:3000/api/products")
        .then((res) => dispatch(getProducts(res.data)))
        .catch((err) => console.error(err));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (products.length > 0 && orderData.items.length > 0) {
      setOrderData((prevState) => ({
        ...prevState,
        total: calculateTotal(prevState.items),
      }));
    }
  }, [products, orderData.items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleItemChange = (productId) => {
    setOrderData((prevState) => {
      const items = prevState.items.includes(productId)
        ? prevState.items.filter((item) => item !== productId)
        : [...prevState.items, productId];
      return {
        ...prevState,
        items,
        total: calculateTotal(items),
      };
    });
  };

  const calculateTotal = (items) => {
    return items
      .reduce((acc, itemId) => {
        const product = products.find((p) => p._id === itemId);
        return acc + (product ? parseFloat(product.precio) : 0);
      }, 0)
      .toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await axios.put(
          `http://localhost:3000/api/order/${id}`,
          orderData
        );
        dispatch(updateOrder(response.data));
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/order",
          orderData
        );
        dispatch(createOrder(response.data));
      }
      navigate("/ordenes");
    } catch (error) {
      console.error("Error al guardar orden:", error);
      alert("Error al guardar la orden");
    }
  };

  const handleCancel = () => {
    navigate("/ordenes");
  };

  // Filtrar productos por término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación de productos
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center mb-0">
                {id ? "Editar Orden" : "Crear Orden"}
              </h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fecha"
                    value={orderData.fecha}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select
                    className="form-control"
                    name="estado"
                    value={orderData.estado}
                    onChange={handleChange}
                    required
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Aceptado">Aceptado</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Método de Pago</label>
                  <select
                    className="form-control"
                    name="metodoPago"
                    value={orderData.metodoPago}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar Método de Pago</option>
                    <option value="Tarjeta de Crédito">
                      Tarjeta de Crédito
                    </option>
                    <option value="Débito">Débito</option>
                    <option value="Transferencia Bancaria">
                      Transferencia Bancaria
                    </option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Items</label>
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    Seleccionar Productos
                  </Button>
                  <ul className="list-group mt-2">
                    {orderData.items.map((itemId) => {
                      const product = products.find((p) => p._id === itemId);
                      return product ? (
                        <li key={itemId} className="list-group-item">
                          {product.titulo} - ${product.precio}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
                <div className="mb-3">
                  <label className="form-label">Total</label>
                  <input
                    type="number"
                    className="form-control"
                    name="total"
                    value={orderData.total}
                    readOnly
                    step="0.01"
                    placeholder="Total de la orden"
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {id ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Productos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar productos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="list-group">
            {currentProducts.map((product) => (
              <li key={product._id} className="list-group-item">
                <input
                  type="checkbox"
                  checked={orderData.items.includes(product._id)}
                  onChange={() => handleItemChange(product._id)}
                />{" "}
                {product.titulo} - ${product.precio}
              </li>
            ))}
          </ul>
          <Pagination className="mt-3">
            {[...Array(totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => setCurrentPage(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderForm;
