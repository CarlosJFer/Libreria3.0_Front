import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getOrders, deleteOrder } from "../redux/orderSlice";
import { useEffect, useState } from "react";

function OrderList() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios("https://libreriaback.onrender.com/api/order")
      .then((res) => dispatch(getOrders(res.data)))
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handlerDelete = (_id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta orden?")) {
      axios
        .delete(`https://libreriaback.onrender.com/api/order/${_id}`)
        .then(() => {
          dispatch(deleteOrder(_id));
        })
        .catch((err) => {
          console.error(err);
          alert("Error al eliminar la orden del servidor.");
        });
    }
  };

  const handlerEdit = (order) => {
    navigate(`/order-form/${order._id}`);
  };

  const filteredOrders = orders.filter((order) =>
    order.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid p-4 mt-5">
      <div className="card shadow">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center ">
          <h2 className="mb-0 text-center">Gestión de Órdenes</h2>{" "}
          {/* Centramos el título */}
          <Link to="/order-form" className="btn btn-light">
            <i className="fas fa-plus me-2"></i>Nueva Orden
          </Link>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 offset-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar órdenes por nombre o descripción"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-gray">
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Método de pago</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th>User ID</th> {/* Añadimos la columna User ID */}
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      {" "}
                      {/* Actualizamos el colspan */}
                      No se encontraron órdenes
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.fecha}</td>
                      <td>{order.metodoPago}</td>
                      <td>{order.estado}</td>
                      <td>{order.total.$numberDecimal}</td>
                      <td>{order.userId}</td>{" "}
                      {/* Añadimos el userId en la fila */}
                      <td className="text-center">
                        <div className="btn-group" role="group">
                          <button
                            onClick={() => handlerEdit(order)}
                            className="btn btn-sm btn-outline-primary"
                            title="Editar"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handlerDelete(order._id)}
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer text-muted">
          Total de órdenes: {filteredOrders.length}
        </div>
      </div>
    </div>
  );
}

export default OrderList;