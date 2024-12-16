import React from "react";
import "../styles/cart.css";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { clearCart, removeFromCart, updateQuantity } from "../redux/cartSlice";
import { Link, useParams } from "react-router-dom";
import * as cartActions from "../redux/cartSlice";

function Cart({ isAuthenticated, isAdmin }) {
  const cart = useSelector((state) => state.cart);
  console.log(cart.map((p) => p));
  const id_user = useParams();
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  const total = cart.reduce(
    (total, item) => total + item.quantity * item.precio,
    0
  );
  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };
  return (
    <>
      {!cart.length ? (
        <>
          <div className="text-center mt-3">
            <h6>El carrito se encuentra vacío</h6>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="card-header rounded bg-light text-dark text-center p-2">
              <h5>Carrito 🛒 </h5>
            </div>
            <div className="card-body justify-content-center w-30">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>~</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí se agregarán los productos del carrito */}
                  <tr>
                    <td>Producto</td>
                    <td>$100</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        disabled={!isAuthenticated || isAdmin}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h5>Total: $100</h5>
              <button
                className="btn btn-primary btn-sm"
                disabled={!isAuthenticated || isAdmin}
              >
                Pagar
              </button>
              <button
                className="btn btn-secondary btn-sm"
                disabled={!isAuthenticated || isAdmin}
              >
                Vaciar carrito
              </button>
            </div>
          </div>
          <div className="cart">
            <h3>Carrito de Compra</h3>
            <div>
              <table className="cartable">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.titulo}</td>
                      <td>${item.precio.toFixed(2)}</td>
                      <td>
                        <input
                          onChange={(e) =>
                            handleUpdateQuantity(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          type="number"
                          value={item.quantity}
                        />
                      </td>
                      <td>${(item.quantity * item.precio).toFixed(2)}</td>
                      <td>
                        <button onClick={() => handleRemove(item.id)}>
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4>Resumen de compra</h4>
            <p>Total: $ {total.toFixed(2)}</p>
            <Link to={`/${id_user}`}>
              <button>Seguir comprando</button>
            </Link>

            <button onClick={handleClearCart} className="button">
              Vaciar el carrito
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
