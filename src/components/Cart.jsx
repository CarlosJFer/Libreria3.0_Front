import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { clearCart, removeFromCart, updateQuantity } from "../redux/cartSlice";
import { Link, useParams } from "react-router-dom";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { selectFormattedCartItems } from "../redux/selectors"; // Importar el selector memoizado

// Inicializar Mercado Pago con la clave API desde las variables de entorno
initMercadoPago(process.env.REACT_APP_MERCADO_PAGO_KEY);

function Cart({ isAuthenticated, isAdmin }) {
  const cart = useSelector(selectFormattedCartItems); // Usar el selector memoizado
  const dispatch = useDispatch();
  const [preferenceId, setPreferenceId] = useState(null);

  // Función para crear la preferencia de pago
  const createPreference = async () => {
    const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
    try {
      const response = await axios.post('https://libreria3-0-back.onrender.com/create_preference', {
        items: cart, // Enviar los items con la estructura correcta
        metodoPago: 'Tarjeta de Crédito' // Asegúrate de enviar el método de pago también
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error("Error al crear la preferencia", error);
      throw error;
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    id && setPreferenceId(id);
  };

  const { id } = useParams();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const total = cart.reduce(
    (total, item) => total + item.cantidad * item.precio,
    0
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mt-4 w-80">
      {cart.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          El carrito se encuentra vacío
        </div>
      ) : (
        <div className="card h-100">
          <div className="card-header bg-dark text-white text-center">
            <h5 className="mb-0">Carrito 🛒</h5>
          </div>
          <div className="card-body d-flex flex-column">
            <div className="table-responsive flex-grow-1">
              <table className="table table-striped table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.productId}>
                      <td>{item.titulo}</td>
                      <td>${item.precio.toFixed(2)}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          min="1"
                          onChange={(e) =>
                            handleUpdateQuantity(
                              item.productId,
                              parseInt(e.target.value)
                            )
                          }
                          value={item.cantidad}
                        />
                      </td>
                      <td>${(item.cantidad * item.precio).toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => handleRemove(item.productId)}
                          className="btn btn-danger btn-sm"
                        >
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center text-center mt-3">
              <p className="h5 mb-0 text-center">Total: $ {total.toFixed(2)}</p>
            </div>

            <div className="mt-3">
              <button
                onClick={handleClearCart}
                className="btn btn-outline-dark"
              >
                Vaciar
              </button>
              <Link className="btn btn-success m-2">Comprar</Link>
              <div>
                <button onClick={handleBuy} className="btn btn-primary">Pagar</button>
                {
                  preferenceId && (
                    <Wallet
                    initialization={{
                      preferenceId : preferenceId,
                      redirectMode : 'blank',
                    }}
                    />
                  )
                }
              </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Cart;