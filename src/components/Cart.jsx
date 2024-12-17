import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { clearCart, removeFromCart, updateQuantity } from "../redux/cartSlice";
import { Link, useParams, useLocation } from "react-router-dom";

function Cart({ isAuthenticated, isAdmin }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

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
    dispatch(clearCart());
  };

  const isCartPage = location.pathname === `/cart/${id}`;

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
                    <tr key={item.id}>
                      <td>{item.titulo}</td>
                      <td>${item.precio.toFixed(2)}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          min="1"
                          onChange={(e) =>
                            handleUpdateQuantity(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          value={item.quantity}
                        />
                      </td>
                      <td>${(item.quantity * item.precio).toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="btn btn-outline-danger "
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
              {isCartPage ? (
                <Link className="btn btn-success m-2">Comprar</Link>
              ) : (
                <Link to={`/cart/${id}`} className="btn btn-primary m-2">
                  Ir al carrito
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
