//--------------------------------------------PETICIONES POST------------------------------------------------
// Evento para agregar una marca al registro
document.getElementById('postMarcaForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const datosBody = {
        nombreMarca: document.getElementById('nombreMarcaPOST').value,
        cantidad: document.getElementById('cantidadPOST').value
    };

    fetch(url + '/marcas', {
        method: 'POST',
        body: JSON.stringify(datosBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(datosObjeto => {
        // Procesa los datos de la respuesta aquí
        document.getElementById('nuevaMarcaPOST').innerHTML = `<li>ID:${datosObjeto.id} - ${datosObjeto.nombreMarca} - ${datosObjeto.cantidad}</li>`;
        console.log(datosObjeto);
    })
    .catch(error => console.error(error));
});
//--------------------------------------------!PETICIONES POST------------------------------------------------
