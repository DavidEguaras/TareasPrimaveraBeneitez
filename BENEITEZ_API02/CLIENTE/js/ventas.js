document.addEventListener("DOMContentLoaded", function() {
    const marcaSelect = document.getElementById("marcaSelect");
    const concesionarioSelect = document.getElementById("concesionarioSelect");

    // Al cargar la página, obtener y mostrar las opciones de marca
    fetch(url + "/marcas")
        .then(response => response.json())
        .then(data => {
            data.forEach(marca => {
                marcaSelect.innerHTML += `<option value="${marca.id}">${marca.nombre}</option>`;
            });

            // Simular un cambio de selección para cargar automáticamente los concesionarios
            marcaSelect.dispatchEvent(new Event("change"));
        })
        .catch(error => console.error("Error al obtener las marcas:", error));

    // Cuando se selecciona una marca, cargar y mostrar opciones de concesionario
    marcaSelect.addEventListener("change", function() {
        const marcaID = this.value;
        fetch(url + '/concesionarios/marca/' + marcaID)
            .then(response => response.json())
            .then(data => {
                concesionarioSelect.innerHTML = ""; // Limpiar opciones anteriores
                data.forEach(concesionario => {
                    concesionarioSelect.innerHTML += `<option value="${concesionario.id}">${concesionario.nombre}</option>`;
                });
                // Habilitar el campo de concesionario después de seleccionar la marca
                concesionarioSelect.disabled = false;

                // Seleccionar automáticamente el primer concesionario
                if (data.length > 0) {
                    concesionarioSelect.selectedIndex = 0;
                }
            })
            .catch(error => console.error("Error al obtener los concesionarios:", error));
    });

    //AQUI SE MANEJA EL POST DE UNA VENTA
    document.getElementById("ventaForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch(url + "/ventas", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al registrar la venta");
            }
        })
        .then(datosObjeto => {
            document.getElementById('nuevaVentaPOST').innerHTML = `<li>VENTA CON ID: ${datosObjeto.id}: ${document.getElementById('cantidadInput').innerText} unidades vendidas de la MARCA: ${document.getElementById('marcaSelect').value}`;
            alert("Venta registrada con éxito!");
            document.getElementById("ventaForm").reset();
        })
        .catch(error => {
            console.error("Error al registrar la venta:", error); 
            alert("Error al registrar la venta. Por favor, inténtalo de nuevo.");
        });
    });
    
});