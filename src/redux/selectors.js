// redux/selectors.js
import { createSelector } from 'reselect';

// Selector simple que toma el estado del carrito
const selectCartItems = (state) => state.cart;

// Selector memoizado que formatea los items del carrito
export const selectFormattedCartItems = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.map(item => ({
    productId: item.id,
    cantidad: item.quantity,
    precio: item.precio,
    titulo: item.titulo
  }))
);
