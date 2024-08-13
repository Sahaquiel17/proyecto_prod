const comboContainer = document.getElementById("combo-container");
const dataPath = "http://localhost:8080/Proyecto1/modulos/modulosCombosBarajas/";
let allCombos = [];

// Cargar y mostrar los combos al cargar la página
fetch(dataPath + "combos.json")
    .then(response => response.json())
    .then(jsondata => {
        allCombos = jsondata.combos; // Guardar todos los combos para búsqueda
        console.log("Datos cargados:", allCombos);
        mostrarCombos(allCombos);
    });

function mostrarCombos(combos) {
    let comboHTML = "";
    combos.forEach(combo => {
        let imgSrc = combo.foto.startsWith('data:image/') ? combo.foto : "img/" + combo.foto;
        comboHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${imgSrc}" class="card-img-top" alt="${combo.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${combo.nombre}</h5>
                        <p class="card-text">Descripcion: Incluye... <br>
                        ${combo.descripcion1}<br>
                        ${combo.descripcion2}<br>
                        ${combo.descripcion3}</p>
                        <p class="card-text">Precio: $${combo.precio}</p>
                        <p class="card-text">Estatus: ${combo.estatus}</p>
                    </div>
                </div>
            </div>`;
    });
    comboContainer.innerHTML = comboHTML;
}

function search() {
    const inputBusqueda = document.getElementById('inputBusqueda').value.toLowerCase();
    const filteredCombos = allCombos.filter(combo => {
        return combo.nombre.toLowerCase().includes(inputBusqueda) ||
               combo.descripcion1.toLowerCase().includes(inputBusqueda) ||
               combo.descripcion2.toLowerCase().includes(inputBusqueda) ||
               combo.descripcion3.toLowerCase().includes(inputBusqueda);
    });
    mostrarCombos(filteredCombos);
}
