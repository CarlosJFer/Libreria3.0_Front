import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { createOrder } from "../redux/orderSlice";
import axios from "axios";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { AuthContext } from "./AuthContext";

const OrderFormUser = () => {
  const location = useLocation();
  const { id } = useParams();
  const { product } = location.state || {};
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    estado: "Pendiente",
    metodoPago: "Débito",
    items: [
      {
        productId: product ? product._id : "",
        cantidad: 1,
        precio: product ? product.precio : 0.0,
      },
    ],
  });

  const handlerChange = (e) => {
    const propiedad = e.target.name;
    const valor = e.target.value;
    setInputs({
      ...inputs,
      [propiedad]: valor,
    });
  };

  const handlerClick = async (e) => {
    e.preventDefault();
    try {
      if (inputs.items[0].productId) {
        const fecha = new Date().toISOString(); // Calcula la fecha actual
        const total =
          parseFloat(inputs.items[0].precio) * inputs.items[0].cantidad; // Calcula el total
        const orderData = { ...inputs, fecha, total };
        const response = await axios.post(
          "http://localhost:3000/api/order",
          orderData
        );
        dispatch(createOrder(response.data));
        //navigate("/");
        navigate(`/${id}`);
      } else {
        alert("Error: Producto no encontrado.");
      }
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
      {product ? (
        <Card className="p-3 mb-4">
          {" "}
          <h1 className="mb-4">Detalle del Producto</h1>
          <Row>
            <Col md={4}>
              <Card.Img
                variant="top"
                src={product.imgPortada}
                alt={product.titulo}
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
            <Col md={8}>
              <Card.Body className="text-left">
                <Card.Title>{product.titulo}</Card.Title>
                <Card.Text>
                  <strong>Autor:</strong> {product.autor}
                </Card.Text>
                <Card.Text>
                  <strong>Editorial:</strong> {product.editorial}
                </Card.Text>
                <Card.Text>
                  <strong>Género:</strong> {product.genero}
                </Card.Text>
                <Card.Text>
                  <strong>Descripción:</strong> {product.descripcion}
                </Card.Text>
                <Card.Text>
                  <strong>Precio:</strong> ${product.precio}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
          <Form className="p-4 border rounded shadow-sm bg-light">
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

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" onClick={handlerClick}>
                Crear Orden
              </Button>
            </div>
          </Form>
        </Card>
      ) : (
        <p>No se encontró información del producto.</p>
      )}
    </Container>
  );
};

export default OrderFormUser;
