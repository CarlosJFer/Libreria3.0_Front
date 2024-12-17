// Obtener orderId de la URL
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

if (orderId) {
    fetch(`https://libreria3-0-back.onrender.com/api/orders/${orderId}`)
        .then(response => {
            console.log('Respuesta de la red recibida:', response);
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de la orden recibidos:', data);
            const downloadUrls = data.downloadUrls; // Asumimos que ahora es una lista de URLs
            const downloadLinksContainer = document.getElementById('download-links');
            downloadLinksContainer.innerHTML = ''; // Limpiar cualquier enlace anterior

            if (downloadUrls && downloadUrls.length > 0) {
                downloadUrls.forEach((url, index) => {
                    console.log(`Adding download link ${index + 1}: ${url}`);
                    const downloadLink = document.createElement('a');
                    downloadLink.href = url;
                    downloadLink.textContent = `Descargar Libro ${index + 1}`;
                    downloadLink.target = '_blank';
                    const listItem = document.createElement('li');
                    listItem.appendChild(downloadLink);
                    downloadLinksContainer.appendChild(listItem);
                });
            } else {
                console.error('No hay enlaces de descarga disponibles');
            }
        })
        .catch(error => {
            console.error('Error obteniendo los enlaces de descarga:', error);
        });
}

// Agregar un evento al botón para volver a la tienda
document.getElementById("boton-volver").addEventListener("click", () => {
    window.location.href = "https://libreria3-0.onrender.com/"; // Actualiza esta línea con la URL de tu tienda local
});