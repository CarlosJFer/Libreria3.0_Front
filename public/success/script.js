// Obtener orderId de la URL
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

console.log('Order ID:', orderId);

if (orderId) {
    console.log('Fetching order details from:', `https://libreriaback.onrender.com/api/orders/${orderId}`);
    
    fetch(`https://libreriaback.onrender.com/api/orders/${orderId}`)
        .then(response => {
            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers));
            
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de la orden recibidos:', data);
            const downloadUrls = data.downloadUrls || []; 
            const downloadLinksContainer = document.getElementById('download-links');
            downloadLinksContainer.innerHTML = ''; 

            if (downloadUrls.length > 0) {
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
                const noLinksMessage = document.createElement('p');
                noLinksMessage.textContent = 'No se encontraron enlaces de descarga.';
                downloadLinksContainer.appendChild(noLinksMessage);
            }
        })
        .catch(error => {
            console.error('Error obteniendo los enlaces de descarga:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Error: ${error.message}`;
            document.getElementById('download-links').appendChild(errorMessage);
        });
}

// Agregar un evento al botón para volver a la tienda
document.getElementById("boton-volver").addEventListener("click", () => {
    window.location.href = "https://libreria3-0.onrender.com/"; 
});