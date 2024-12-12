// Simulamos los datos del pago
const fecha = new Date().toLocaleDateString();
const monto = "100.00";
const metodoPago = "Tarjeta de crédito";

// Mostramos los datos del pago en la página
document.getElementById("fecha").textContent = fecha;
document.getElementById("monto").textContent = monto;
document.getElementById("metodo-pago").textContent = metodoPago;

// Agregamos un evento al botón para volver a la tienda
document.getElementById("boton-volver").addEventListener("click", () => {
  // Simulamos la redirección a la tienda
alert("Redireccionando a la tienda...");
  // window.location.href = "https://example.com/tienda"; // Descomenta esta línea para redireccionar a una URL real
});