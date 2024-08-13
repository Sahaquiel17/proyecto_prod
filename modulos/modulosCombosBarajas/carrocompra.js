document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const productTableBody = document.getElementById('product-table-body');
    const cart = document.getElementById('cart');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout');
    const searchInput = document.getElementById('inputBusqueda');

    let cartItems = [];
    let total = 0;
    let combos = [];

    // Cargar los combos desde el JSON
    fetch('combos.json')
        .then(response => response.json())
        .then(data => {
            combos = data.combos;
            displayCombos(combos);
        });

    // Mostrar los combos en tarjetas
    function displayCombos(combos) {
        productList.innerHTML = '';
        combos.forEach(combo => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${combo.foto}" class="card-img-top" alt="${combo.nombre}">
                    <div class="card-body">
                        <center><h3 class="card-title">${combo.nombre}</h3></center>
                        <p class="card-text">Descripcion: Incluye... <br>
                        ${combo.descripcion1}<br>
                        ${combo.descripcion2}<br>
                        ${combo.descripcion3}</p>
                        <p class="card-text">Precio: $${combo.precio.toFixed(2)}</p>
                        <p class="card-text">Estatus: ${combo.estatus}</p>
                        <center><button class="btn btn-danger" onclick="addToCart('${combo.nombre}', '${combo.foto}', ${combo.precio})">Agregar al carrito</button></center>
                    </div>
                </div>
            `;
            productList.appendChild(card);
        });
    }

    // Función para agregar un combo al carrito
    window.addToCart = function (nombre, foto, precio) {
        // Agregar el combo al carrito
        cartItems.push({ nombre, foto, precio });
        total += precio;

        // Actualizar el carrito
        updateCart();

        // Actualizar la tabla
        updateTable();
    };

    // Función para actualizar el carrito
    function updateCart() {
        cart.innerHTML = '';
        cartItems.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
            cart.appendChild(div);
        });
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Función para actualizar la tabla
    function updateTable() {
        productTableBody.innerHTML = '';
        cartItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.foto}" alt="${item.nombre}" style="width: 100px;"></td>
                <td>${item.nombre}</td>
                <td>Disponible</td>
                <td>$${item.precio.toFixed(2)}</td>
                <td><button class="btn btn-danger" onclick="removeFromCart('${item.nombre}')">Eliminar</button></td>
            `;
            productTableBody.appendChild(row);
        });
    }

    // Función para eliminar un combo del carrito
    window.removeFromCart = function (nombre) {
        cartItems = cartItems.filter(item => item.nombre !== nombre);
        total = cartItems.reduce((acc, item) => acc + item.precio, 0);

        updateCart();
        updateTable();
    };

    // Función para manejar la compra
    checkoutButton.addEventListener('click', function () {
        alert('Compra realizada. Total: $' + total.toFixed(2));
        cartItems = [];
        total = 0;
        updateCart();
        updateTable();
    });

    // Función de búsqueda
   
});
function search() {
     var num_cols, display, input, filter, table_body, p, h3,div, i, txtValue;
    num_cols = 3;
    input = document.getElementById("inputBusqueda");
    filter = input.value.toUpperCase();
    table_body = document.getElementById("product-list");
    div = table_body.getElementsByTagName("div");

    for (i = 0; i < div.length; i++) {
        display = "none";
        for (j = 0; j < num_cols; j++) {
            p = div[i].getElementsByTagName("p")[j];
            h3 = div[i].getElementsByTagName("h3")[j];
            if (p) {
                txtValue = p.textContent || p.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    display = "";
                }
            }
             if (h3) {
                txtValue = h3.textContent || h3.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    display = "";
                }
            }
        }
        div[i].style.display = display;
      
    }
}