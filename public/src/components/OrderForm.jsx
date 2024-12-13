import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder, updateOrder } from "../redux/orderSlice";

function OrderForm() {
  const [orderData, setOrderData] = useState({
    name: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/orders/${id}`)
        .then((res) => setOrderData(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await axios.put(
          `http://localhost:3000/api/orders/${id}`,
          orderData
        );
        dispatch(updateOrder(response.data));
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/orders",
          orderData
        );
        dispatch(createOrder(response.data));
      }
      navigate("/");
    } catch (error) {
      console.error("Error al guardar orden:", error);
      alert("Error al guardar la orden");
    }
  };

  const handleCancel = () => {
    navigate("/ordenes");
  };

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
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={orderData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa el nombre de la orden"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={orderData.description}
                    onChange={handleChange}
                    required
                    placeholder="Descripción de la orden"
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
    </div>
  );
}

export default OrderForm;
