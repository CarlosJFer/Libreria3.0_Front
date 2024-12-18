import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder, updateOrder } from "../redux/orderSlice";
import axios from "axios";
import { Card, Button, Container, Form } from "react-bootstrap";
import { AuthContext } from "./AuthContext";

const OrderForm = () => {
  const { id } = useParams();
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const existingOrder = orders.find((order) => order._id === id);

  const [inputs, setInputs] = useState({
    userId: user ? user._id : "",
    estado: "Pendiente",
    metodoPago: "Débito",
    items: [
      {
        productId: "",
        cantidad: 1,
        precio: 0.0,
      },
    ],
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (existingOrder) {
      setInputs(existingOrder);
      setTotal(calculateTotal(existingOrder.items));
    }
  }, [existingOrder]);

  const handlerChange = (e) => {
    const propiedad = e.target.name;
    const valor = e.target.value;
    setInputs({
      ...inputs,
      [propiedad]: valor,
    });
  };

  const handlerItemChange = (index, propiedad, valor) => {
    const items = [...inputs.items];
    items[index] = {
      ...items[index],
      [propiedad]: parseFloat(valor) || 0,
    };
    setInputs({
      ...inputs,
      items,
    });
    setTotal(calculateTotal(items));
  };

  const calculateTotal = (items) => {
    return items
      .reduce((sum, item) => sum + parseFloat(item.precio) * item.cantidad, 0)
      .toFixed(2);
  };

  const handlerClick = async (e) => {
    e.preventDefault();
    try {
      const fecha = new Date().toISOString();
      const total = calculateTotal(inputs.items);
      const orderData = { ...inputs, fecha, total };

      if (id) {
        const response = await axios.put(
          `https://libreriaback.onrender.com/api/order/${id}`,
          orderData
        );
        dispatch(updateOrder(response.data));
      } else {
        const response = await axios.post(
          "https://libreriaback.onrender.com/api/order",
          orderData
        );
        dispatch(createOrder(response.data));
      }

      navigate("/orders");
    } catch (error) {
      console.error("Error al guardar la orden:", error);
      alert("Error al guardar la orden");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Container style={{ maxWidth: "800px", marginTop: "2rem" }}>
      <Card className="p-3 mb-4">
        <div className="text-center">
          <h1 className="mb-4">{id ? "Editar Orden" : "Crear Orden"}</h1>
        </div>
        <Form className="p-4 border rounded shadow-sm bg-light">
          <Form.Group className="mb-3" controlId="userId">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              name="userId"
              value={inputs.userId}
              onChange={handlerChange}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="metodoPago">
            <Form.Label>Método de Pago</Form.Label>
            <Form.Select
              name="metodoPago"
              value={inputs.metodoPago}
              onChange={handlerChange}
            >
              <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
              <option value="Débito">Débito</option>
              <option value="Transferencia Bancaria">
                Transferencia Bancaria
              </option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              name="estado"
              value={inputs.estado}
              onChange={handlerChange}
            />
          </Form.Group>

          <h5>Items</h5>
          {inputs.items.map((item, index) => (
            <div key={index} className="border p-2 mb-3">
              <Form.Group className="mb-3" controlId={`productId-${index}`}>
                <Form.Label>Product ID</Form.Label>
                <Form.Control
                  type="text"
                  name="productId"
                  value={item.productId}
                  onChange={(e) =>
                    handlerItemChange(index, "productId", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={`cantidad-${index}`}>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  name="cantidad"
                  value={item.cantidad}
                  onChange={(e) =>
                    handlerItemChange(index, "cantidad", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={`precio-${index}`}>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  value={item.precio}
                  onChange={(e) =>
                    handlerItemChange(index, "precio", e.target.value)
                  }
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Form.Text className="text-muted">
                  Subtotal: ${(item.cantidad * item.precio).toFixed(2)}
                </Form.Text>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" onClick={handlerClick}>
              {id ? "Actualizar Orden" : "Crear Orden"}
            </Button>
          </div>
          <div className="mt-3">
            <h5>Total: ${total}</h5>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default OrderForm;